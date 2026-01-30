import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import MorphSVGPlugin from "gsap/MorphSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger, MorphSVGPlugin);

function getLinePath(i, blindFlapSize, flapPullingPointX) {
  return `M0,${blindFlapSize * (i + 1)} L${flapPullingPointX},${
    blindFlapSize * (i + 1)
  } L1560,${blindFlapSize * (i + 1)}`;
}

function Blinds() {
  const containerRef = useRef();
  const rectTopPathRef = useRef();
  const rectBottomPathRef = useRef();
  const linePathsRef = useRef([]);

  const blindFlapSize = 48;
  const blindFlapCount = 14;
  const flapPullingPointX1 = 1000;
  const flapPullingPointX2 = 320;
  const separatorBlind = 3;
  const separatorBlindY1 = 120;
  const separatorBlindY2 = 260;

  useGSAP(() => {
    // const mm = gsap.matchMedia();
    // mm.add("(min-width: 1024px)", () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=100%",
        scrub: true,
        pin: true,
      },
    });

    tl.to(linePathsRef.current, {
      morphSVG: (i) => {
        if (i < separatorBlind || i > blindFlapCount - 5)
          return getLinePath(i, blindFlapSize, flapPullingPointX1);

        const y =
          separatorBlindY1 * (1 - (i - separatorBlind) / (blindFlapCount - 8));

        const linePath = `M0,${
          blindFlapSize * (i + 1)
        } L${flapPullingPointX1},${blindFlapSize * (i + 1) + y} L1560,${
          blindFlapSize * (i + 1)
        }`;

        return linePath;
      },
      y: (i) => {
        return i >= separatorBlind ? blindFlapSize : 0;
      },
    });

    tl.to(
      rectBottomPathRef.current,
      {
        morphSVG: `M0,${blindFlapSize * separatorBlind} 
            L${flapPullingPointX1},${
              blindFlapSize * separatorBlind +
              separatorBlindY1 *
                (1 -
                  (separatorBlind - separatorBlind - 1) / (blindFlapCount - 8))
            }
            L1560,${blindFlapSize * separatorBlind} 
            L1560,${blindFlapSize * blindFlapCount} L0,${
              blindFlapSize * blindFlapCount
            } Z`,
        y: blindFlapSize,
      },
      "<",
    );

    tl.to(linePathsRef.current, {
      morphSVG: (i) => {
        if (i < separatorBlind || i > blindFlapCount - 5)
          return getLinePath(i, blindFlapSize, flapPullingPointX1);

        const y =
          separatorBlindY2 * (1 - (i - separatorBlind) / (blindFlapCount - 8));

        const linePath = `M0,${
          blindFlapSize * (i + 1)
        } L${flapPullingPointX2},${blindFlapSize * (i + 1) + y} L1560,${
          blindFlapSize * (i + 1)
        }`;

        return linePath;
      },
    });

    tl.to(
      rectBottomPathRef.current,
      {
        morphSVG: `M0,${blindFlapSize * separatorBlind} 
            L${flapPullingPointX2},${
              blindFlapSize * separatorBlind +
              separatorBlindY2 *
                (1 -
                  (separatorBlind - separatorBlind - 1) / (blindFlapCount - 8))
            }
            L1560,${blindFlapSize * separatorBlind} 
            L1560,${blindFlapSize * blindFlapCount} L0,${
              blindFlapSize * blindFlapCount
            } Z`,
        y: blindFlapSize,
      },
      "<",
    );

    tl.to(linePathsRef.current, {
      morphSVG: (i) => {
        const y =
          i >= separatorBlind ? blindFlapSize * (blindFlapCount - 1) : 0; // -1 because previously did y transform of the blindFlapSize in the first tween

        const pullingX =
          i < separatorBlind || i > blindFlapCount - 5
            ? flapPullingPointX1
            : flapPullingPointX2;

        const linePath = `M0,${y} L${pullingX},${y} L1560,${y}`;

        return linePath;
      },
      y: (i) => {
        return i >= separatorBlind ? blindFlapSize : -blindFlapSize;
      },
    });

    tl.to(
      rectTopPathRef.current,
      {
        morphSVG: `M0,0 L1560,0 L1560,1 L0,1 Z`,
        y: -blindFlapSize,
      },
      "<",
    );

    tl.to(
      rectBottomPathRef.current,
      {
        morphSVG: `M0,${blindFlapSize * (blindFlapCount - 1)} 
            L${flapPullingPointX2},${blindFlapSize * (blindFlapCount - 1)}
            L1560,${blindFlapSize * (blindFlapCount - 1)} 
            L1560,${blindFlapSize * blindFlapCount} L0,${
              blindFlapSize * blindFlapCount
            } Z`,
        y: blindFlapSize,
      },
      "<",
    );
    // });
  });

  return (
    <div ref={containerRef} className="min-h-screen relative">
      <div className="h-screen relative">
        <img
          src="/images/bg.webp"
          alt="Japanese moutains and temples"
          className="absolute top-0 left-0 size-full object-cover"
        />
      </div>

      <div className="absolute top-0 left-0 w-full h-full">
        <svg
          // width="1560"
          // height="96"
          // viewBox="0 0 1560 96"
          viewBox={`0 0 1560 ${blindFlapSize * blindFlapCount}`}
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="size-full pointer-events-none"
        >
          <path
            ref={rectTopPathRef}
            d={`M0,0 L1560,0 L1560,${blindFlapSize * separatorBlind} 
            L0,${blindFlapSize * separatorBlind} Z`}
            fill="oklch(14.1% 0.005 285.823)"
          />

          <path
            ref={rectBottomPathRef}
            d={`M0,${blindFlapSize * separatorBlind} 
            L${flapPullingPointX1},${blindFlapSize * separatorBlind}
            L1560,${blindFlapSize * separatorBlind} 
            L1560,${blindFlapSize * blindFlapCount} L0,${
              blindFlapSize * blindFlapCount
            } Z`}
            fill="oklch(14.1% 0.005 285.823)"
          />

          {new Array(blindFlapCount).fill(1).map((_, i) => (
            <path
              ref={(cur) => {
                if (cur && !linePathsRef.current.includes(cur)) {
                  linePathsRef.current.push(cur);
                }
              }}
              d={getLinePath(i, blindFlapSize, flapPullingPointX1)}
              stroke="oklch(27.4% 0.006 286.033)"
              strokeWidth="1"
              fill="none"
              key={"line-" + i}
            />
          ))}
        </svg>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center justify-center gap-4 px-8 py-2 rounded-full bg-zinc-500/20 backdrop-blur-2xl drop-shadow-2xl">
          <svg
            width="24"
            height="43"
            viewBox="0 0 24 43"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5"
          >
            <path
              d="M12 32C8.8174 32 5.76516 30.7357 3.51472 28.4853C1.26428 26.2348 0 23.1826 0 20L0 12C0 8.8174 1.26428 5.76516 3.51472 3.51472C5.76516 1.26428 8.8174 0 12 0C15.1826 0 18.2348 1.26428 20.4853 3.51472C22.7357 5.76516 24 8.8174 24 12V20C24 23.1826 22.7357 26.2348 20.4853 28.4853C18.2348 30.7357 15.1826 32 12 32ZM12 2C10.6868 2 9.38642 2.25866 8.17317 2.7612C6.95991 3.26375 5.85752 4.00035 4.92893 4.92893C3.05357 6.8043 2 9.34784 2 12V20C2 22.6522 3.05357 25.1957 4.92893 27.0711C6.8043 28.9464 9.34784 30 12 30C14.6522 30 17.1957 28.9464 19.0711 27.0711C20.9464 25.1957 22 22.6522 22 20V12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2Z"
              fill="white"
            />
            <path
              d="M12.0001 42.4101L6.34007 36.7601C6.17624 36.5688 6.09063 36.3227 6.10036 36.071C6.11008 35.8193 6.21441 35.5806 6.3925 35.4025C6.5706 35.2244 6.80934 35.1201 7.06101 35.1104C7.31269 35.1006 7.55876 35.1862 7.75007 35.3501L12.0001 39.5901L16.2401 35.3501C16.4314 35.1862 16.6774 35.1006 16.9291 35.1104C17.1808 35.1201 17.4195 35.2244 17.5976 35.4025C17.7757 35.5806 17.8801 35.8193 17.8898 36.071C17.8995 36.3227 17.8139 36.5688 17.6501 36.7601L12.0001 42.4101Z"
              fill="white"
            />
            <path
              d="M12 13C11.7348 13 11.4804 12.8946 11.2929 12.7071C11.1054 12.5196 11 12.2652 11 12V6C11 5.73478 11.1054 5.48043 11.2929 5.29289C11.4804 5.10536 11.7348 5 12 5C12.2652 5 12.5196 5.10536 12.7071 5.29289C12.8946 5.48043 13 5.73478 13 6V12C13 12.2652 12.8946 12.5196 12.7071 12.7071C12.5196 12.8946 12.2652 13 12 13Z"
              fill="white"
            />
          </svg>
          <p className="text-white text-xl">Scroll to reveal</p>
        </div>
      </div>
    </div>
  );
}

export default Blinds;
