import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import { getProject } from "@theatre/core";
import "./App.css";
import studio from "@theatre/studio";
import extension from "@theatre/r3f/dist/extension";
import { UI } from "./components/UI";
import Loading from "./components/Loading";
import { useGLTF, useFBX, useTexture } from "@react-three/drei";

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
  useEffect(() => {
    let isMounted = true;

    const loadAssets = async () => {
      const assets = [
        { path: "/VanWithLogo.glb", type: "gltf", name: "Van Model" },
        {
          path: "/models/chrislanejones.glb",
          type: "gltf",
          name: "Character Model",
        },
        {
          path: "/animations/CLJDriving.fbx",
          type: "fbx",
          name: "Character Animation",
        },
        {
          path: "textures/Road-Asphalt.jpg",
          type: "texture",
          name: "Road Texture",
        },
        {
          path: "textures/Euro-Urban-Street.jpg",
          type: "texture",
          name: "Street Texture",
        },
        { path: "images/Ropaint.png", type: "texture", name: "Paint Texture" },
      ];

      let loadedCount = 0;
      const totalAssets = assets.length;

      // Update progress immediately to show 0%
      if (isMounted) {
        onProgress(0);
      }

      for (let i = 0; i < assets.length; i++) {
        const asset = assets[i];

        try {
          console.log(`Loading ${asset.name}...`);

          // Load based on asset type
          if (asset.type === "gltf") {
            await useGLTF.preload(asset.path);
          } else if (asset.type === "fbx") {
            await useFBX.preload(asset.path);
          } else if (asset.type === "texture") {
            await useTexture.preload(asset.path);
          }

          loadedCount++;
          const progress = (loadedCount / totalAssets) * 100;

          console.log(
            `Loaded ${asset.name} - Progress: ${Math.round(progress)}%`
          );

          if (isMounted) {
            onProgress(progress);
          }

          // Small delay to ensure smooth progress visualization
          await new Promise((resolve) => setTimeout(resolve, 100));
        } catch (error) {
          console.warn(`Failed to load ${asset.name}:`, error);
          // Still count as loaded to prevent hanging
          loadedCount++;
          const progress = (loadedCount / totalAssets) * 100;

          if (isMounted) {
            onProgress(progress);
          }
        }
      }

      // Ensure we reach 100% and wait a moment
      if (isMounted) {
        onProgress(100);
        setTimeout(() => {
          if (isMounted) {
            console.log("All assets loaded, starting app...");
            onComplete();
          }
        }, 500);
      }
    };

    loadAssets();

    return () => {
      isMounted = false;
    };
  }, [onProgress, onComplete]);

  return null;
};

// Lazy load the 3D scene
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

  // Handle loading progress - ensure it only goes forward
  const handleLoadingProgress = (progress) => {
    setLoadingProgress((prevProgress) => {
      // Only update if progress is higher to prevent backwards movement
      return Math.max(prevProgress, Math.min(100, progress));
    });
  };

  // Handle loading completion
  const handleLoadingComplete = () => {
    console.log("Loading complete, hiding loading screen");
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
