import { ReactLenis } from "lenis/react";

import Blinds from "./Blinds";
import Header from "./Header";

function App() {
  return (
    <>
      <ReactLenis root />
      <div className="min-h-screen">
        <Header heading={"Blinds Reveal Scroll"} githubLink={"#"} />
        <Blinds />
      </div>
    </>
  );
}

export default App;
