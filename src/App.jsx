import { Canvas } from "@react-three/fiber";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Perf } from "r3f-perf";
import { getProject } from "@theatre/core";
import { PerspectiveCamera, SheetProvider, editable as e } from "@theatre/r3f";
import Experience from "./components/Experience";

import studio from "@theatre/studio";
import extension from "@theatre/r3f/dist/extension";
import { UI } from "./components/UI";

studio.initialize();
studio.extend(extension);

const project = getProject("VanProject");
const mainSheet = project.sheet("Main");

const CubeLoader = () => {
  return (
    <mesh>
      <boxGeometry />
      <meshNormalMaterial />
    </mesh>
  );
};

const transitions = {
  Start: [0, 2],
  Middle: [2, 4],
  End: [4, 8],
};

function App() {
  const cameraTargetRef = useRef();

  const [currentScreen, setCurrentScreen] = useState("Start");
  const [targetScreen, setTargetScreen] = useState("Start");
  const isSetup = useRef(false);

  useEffect(() => {
    project.ready.then(() => {
      if (currentScreen === targetScreen) {
        return;
      }
      isSetup.current = true;
      const reverse = targetScreen === "Start";
      const transition = transitions[reverse ? currentScreen : targetScreen];
      if (!transition) {
        return;
      }
      mainSheet.sequence
        .play({
          range: transition,
          direction: reverse ? "reverse" : "normal",
          rate: reverse ? 2 : 1,
        })
        .then(() => {
          setCurrentScreen(targetScreen);
        });
    });
  }, [targetScreen]);
  return (
    <>
      <UI
        currentScreen={currentScreen}
        onScreenChange={setTargetScreen}
        isAnimating={currentScreen !== targetScreen}
      />
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
