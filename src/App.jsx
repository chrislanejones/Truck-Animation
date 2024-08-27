import { Canvas, useFrame } from "@react-three/fiber";
import "./App.css";
import Experience from "./components/Experience";
import React, { useRef, useState } from "react";
import { Perf } from "r3f-perf";
import { getProject } from "@theatre/core";
import { SheetProvider } from "@theatre/r3f";

const demoSheet = getProject("vanproject").sheet("van");

import studio from "@theatre/studio";

studio.initialize();

function App() {
  return (
    <>
      <Canvas camera={{ position: [16, 9, 12], fov: 70 }}>
        <SheetProvider sheet={van}>
          {/* <Perf /> */}
          <Experience />
        </SheetProvider>
      </Canvas>
    </>
  );
}

export default App;
