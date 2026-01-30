import { ReactLenis } from "lenis/react";

import Blinds from "./Blinds";
import Header from "./Header";

function App() {
  return (
    <>
      <ReactLenis root />
      <div className="min-h-screen">
        <Header
          heading={"Blinds Reveal Scroll"}
          githubLink={
            "https://github.com/SirajAhmed7/blinds-reveal-scroll-animation"
          }
        />
        <Blinds />
      </div>
    </>
  );
}

export default App;
