import { ReactLenis } from "lenis/react";

import Blinds from "./Blinds";

function App() {
  return (
    <>
      <ReactLenis root />
      <div className="min-h-screen">
        <Blinds />
      </div>
    </>
  );
}

export default App;
