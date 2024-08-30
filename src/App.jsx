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
        camera={{ position: [16, 9, 12], fov: 70, near: 1 }}
        shadows
        gl={{ preserveDrawingBuffer: true }}
      >
        <SheetProvider sheet={mainSheet}>
          <PerspectiveCamera
            position={[5, 5, 10]}
            rotation={[0, 0, 0]}
            fov={30}
            near={1}
            makeDefault
            theatreKey="Camera"
          />
          {/* <Perf /> */}
          <Experience />
        </SheetProvider>
      </Canvas>
    </>
  );
}

export default App;
