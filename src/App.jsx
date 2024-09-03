import { Canvas, useFrame } from "@react-three/fiber";
import "./App.css";
import Experience from "./components/Experience";
import React, { useRef, useState } from "react";
import { Perf } from "r3f-perf";
import { getProject } from "@theatre/core";
import { SheetProvider } from "@theatre/r3f";
import { PerspectiveCamera } from "@theatre/r3f";

import studio from "@theatre/studio";
import extension from "@theatre/r3f/dist/extension";

studio.initialize();
studio.extend(extension);

const project = getProject("VanProject");
const mainSheet = project.sheet("Main");

function App() {
  return (
    <>
      <Canvas
        camera={{ position: [10, 9, 12], fov: 60, near: 1 }}
        shadows
        gl={{ preserveDrawingBuffer: true }}
      >
        <SheetProvider sheet={mainSheet}>
          <Experience />
        </SheetProvider>
      </Canvas>
      {/* <Perf /> */}
    </>
  );
}

export default App;
