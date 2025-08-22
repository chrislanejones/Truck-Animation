import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import { getProject } from "@theatre/core";
import "./App.css";
import studio from "@theatre/studio";
import extension from "@theatre/r3f/dist/extension";
import { UI } from "./components/UI";
import Loading from "./components/Loading";
import { useGLTF, useFBX } from "@react-three/drei";

import projectState from "./assets/VanProject.theatre-project-state-X.json";

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

// Asset Preloader Component
const AssetPreloader = ({ onProgress, onComplete }) => {
  const [loadedAssets, setLoadedAssets] = useState(0);
  const totalAssets = 3; // Van, Avatar model, Avatar animation

  useEffect(() => {
    const loadAssets = async () => {
      const assets = [
        "/VanWithLogo.glb",
        "/models/chrislanejones.glb",
        "/animations/CLJDriving.fbx",
      ];

      for (let i = 0; i < assets.length; i++) {
        try {
          if (assets[i].endsWith(".glb")) {
            await useGLTF.preload(assets[i]);
          } else if (assets[i].endsWith(".fbx")) {
            await useFBX.preload(assets[i]);
          }

          const progress = ((i + 1) / totalAssets) * 100;
          setLoadedAssets(i + 1);
          onProgress(progress);

          // Small delay to show progress
          await new Promise((resolve) => setTimeout(resolve, 200));
        } catch (error) {
          console.warn(`Failed to load asset: ${assets[i]}`, error);
          // Continue loading other assets even if one fails
          const progress = ((i + 1) / totalAssets) * 100;
          onProgress(progress);
        }
      }

      // Small delay before completing
      setTimeout(() => {
        onComplete();
      }, 500);
    };

    loadAssets();
  }, [onProgress, onComplete]);

  return null;
};

// Lazy load the 3D scene to split the bundle
const Scene = lazy(() =>
  import("./components/Scene").then((module) => ({ default: module.Scene }))
);

const LoadingScreen = () => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#000",
      color: "#fff",
    }}
  >
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
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
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

  // Handle loading progress
  const handleLoadingProgress = (progress) => {
    setLoadingProgress(progress);
  };

  // Handle loading completion
  const handleLoadingComplete = () => {
    setIsLoading(false);
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

  // Show loading screen while assets are loading
  if (isLoading) {
    return (
      <>
        <Loading progress={loadingProgress} />
        <AssetPreloader
          onProgress={handleLoadingProgress}
          onComplete={handleLoadingComplete}
        />
      </>
    );
  }

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
