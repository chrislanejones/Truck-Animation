import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import { getProject } from "@theatre/core";
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

// Lazy load the 3D scene to split the bundle
const Scene = lazy(() => import("./components/Scene").then(module => ({ default: module.Scene })));

const LoadingScreen = () => (
  <div style={{ 
    position: 'fixed', 
    top: 0, 
    left: 0, 
    width: '100%', 
    height: '100%', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    background: '#000',
    color: '#fff'
  }}>
    <div>Loading 3D Scene...</div>
  </div>
);

const transitions = {
  Start: [0, 2],
  Middle: [2, 4],
  End: [4, 8],
};

function App() {
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
      <Suspense fallback={<LoadingScreen />}>
        <Scene mainSheet={mainSheet} />
      </Suspense>
    </>
  );
}

export default App;
