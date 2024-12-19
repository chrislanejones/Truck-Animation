import { Canvas } from "@react-three/fiber";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { getProject } from "@theatre/core";
import { PerspectiveCamera, SheetProvider, editable as e } from "@theatre/r3f";
import Experience from "./components/Experience";
import "./App.css";
import studio from "@theatre/studio";
import extension from "@theatre/r3f/dist/extension";
import { UI } from "./components/UI";

import projectState from "./assets/VanProject.theatre-project-state-IX.json";

export const isProd = import.meta.env.MODE === "production";

if (!isProd) {
  studio.initialize();
  studio.extend(extension);
}

const project = getProject(
  "VanProject",
  isProd ? { state: projectState } : undefined
);

const mainSheet = project.sheet("Main");

const CubeLoader = () => (
  <mesh>
    <boxGeometry />
    <meshNormalMaterial />
  </mesh>
);

const transitions = {
  Start: [0, 2],
  Middle: [2, 4],
  End: [4, 8],
};

function App() {
  const cameraTargetRef = useRef();
  const [currentScreen, setCurrentScreen] = useState("Intro");
  const [targetScreen, setTargetScreen] = useState("Start");
  const isSetup = useRef(false);
  const previousScreen = useRef(currentScreen);

  const handleScreenTransition = async (from, to) => {
    const fromRange = transitions[from];
    const toRange = transitions[to];

    if (!fromRange || !toRange) {
      console.warn(`Invalid transition: ${from} -> ${to}`);
      return;
    }

    // Determine if we need to play forward or backward
    const playForward = fromRange[0] < toRange[0];
    const range = playForward
      ? [fromRange[0], toRange[1]]
      : [toRange[0], fromRange[1]];

    await mainSheet.sequence.play({
      range,
      direction: playForward ? "normal" : "reverse",
      rate: 1,
    });
  };

  useEffect(() => {
    let isMounted = true;

    project.ready.then(() => {
      if (!isMounted) return;

      if (currentScreen === targetScreen) return;
      if (isSetup.current && currentScreen === "Intro") return;

      isSetup.current = true;

      if (currentScreen === "Intro") {
        // Initial setup
        mainSheet.sequence
          .play({
            range: transitions[targetScreen],
            direction: "normal",
            rate: 1,
          })
          .then(() => {
            if (isMounted) {
              setCurrentScreen(targetScreen);
            }
          });
      } else {
        // Handle transitions between screens
        handleScreenTransition(currentScreen, targetScreen).then(() => {
          if (isMounted) {
            setCurrentScreen(targetScreen);
          }
        });
      }
    });

    return () => {
      isMounted = false;
    };
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
    </>
  );
}

export default App;
