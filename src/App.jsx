import { Canvas, useFrame } from "@react-three/fiber";
import "./App.css";
import Experience from "./components/Experience";
import * as THREE from "three";
import React, { useRef } from "react";
import { PerformanceMonitor, PerspectiveCamera } from "@react-three/drei";
import { Leva, useControls } from "leva";

function App() {
  return (
    <Canvas camera={{ position: [16, 9, 12], fov: 70 }}>
      <PerformanceMonitor />
      {/* <CameraControls /> */}
      <Experience />
    </Canvas>
  );
}

export default App;
