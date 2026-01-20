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
      </div>
    </div>
  );
}

export default Blinds;
