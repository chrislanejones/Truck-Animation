import { Canvas, useFrame } from "@react-three/fiber";
import "./App.css";
import Experience from "./components/Experience";
import * as THREE from "three";
import React, { useRef } from "react";
import { PerspectiveCamera } from "@react-three/drei";
import { Leva, useControls } from "leva";

function CameraControls() {
  const cameraRef = useRef();

  // Define Leva controls
  const { positionX, positionY, positionZ, fov } = useControls({
    positionX: { value: 0, min: -10, max: 20, step: 0.1 },
    positionY: { value: 5, min: -10, max: 20, step: 0.1 },
    positionZ: { value: 10, min: -10, max: 20, step: 0.1 },
    fov: { value: 75, min: 10, max: 120, step: 1 },
    near: { value: 0.1, min: 0.1, max: 0.9, step: 0.1 },
  });

  // Update camera properties on each frame
  useFrame(() => {
    if (cameraRef.current) {
      cameraRef.current.position.set(positionX, positionY, positionZ);
      cameraRef.current.fov = fov;
      cameraRef.current.updateProjectionMatrix();
    }
  });

  return <PerspectiveCamera ref={cameraRef} makeDefault />;
}

function App() {
  return (
    <Canvas>
      <CameraControls />
      <Experience />
    </Canvas>
  );
}

export default App;
