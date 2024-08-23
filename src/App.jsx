import { Canvas, useFrame } from "@react-three/fiber";
import "./App.css";
import Experience from "./components/Experience";
import React, { useRef, useState } from "react";
import { Perf } from "r3f-perf";

function App() {
  return (
    <>
      <Canvas camera={{ position: [16, 9, 12], fov: 70 }}>
        {/* <Perf /> */}
        <Experience />
      </Canvas>
    </>
  );
}

export default App;
