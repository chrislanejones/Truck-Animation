import { Canvas } from "@react-three/fiber";
import React, { Suspense, useEffect, useRef } from "react";
import { Perf } from "r3f-perf";
import { getProject } from "@theatre/core";
import { PerspectiveCamera, SheetProvider, editable as e } from "@theatre/r3f";
import "./App.css";
import Experience from "./components/Experience";

import studio from "@theatre/studio";
import extension from "@theatre/r3f/dist/extension";

studio.initialize();
studio.extend(extension);

const project = getProject("VanProject");
const mainSheet = project.sheet("Main");

const transitions = {
   Start: [0, 2],
   Middle: [2, 4],
   End: [4, 8]
}

useEffect(() => {
  project.ready.then(() => {
    if (currentScreen === targetScreen)
  })
})

const CubeLoader = () => {
  return (
    <mesh>
      <boxGeometry />
      <meshNormalMaterial />
    </mesh>
  );
};

function App() {
  const cameraTargetRef = useRef();
  return (
    <>
      <Canvas
        camera={{ position: [0, 0, 0], fov: 80, near: 1 }}
        shadows
        gl={{ preserveDrawingBuffer: true }}
      >
        <Suspense fallback={<CubeLoader />}>
          <SheetProvider sheet={mainSheet}>
            <PerspectiveCamera
              position={[14, 10, 35]}
              fov={30}
              near={1}
              makeDefault
              theatreKey="Camera"
              lookAt={cameraTargetRef}
            />
            <e.mesh
              position={[0, 6, 8]}
              rotation={[0, 0, 0]}
              theatreKey="Camera Target"
              visible="editor"
              ref={cameraTargetRef}
            >
              <octahedronGeometry args={[0.1, 0]} />
              <meshPhongMaterial color="yellow" />
            </e.mesh>

            <Experience />
          </SheetProvider>
        </Suspense>
      </Canvas>
      {/* <Perf /> */}
    </>
  );
}

export default App;
