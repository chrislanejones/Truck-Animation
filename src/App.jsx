import { Canvas, useFrame } from "@react-three/fiber";
import "./App.css";
import Experience from "./components/Experience";
import React, { useRef, useState } from "react";
import { Perf } from "r3f-perf";
import { getProject } from "@theatre/core";
import { SheetProvider } from "@theatre/r3f";
import { PerspectiveCamera } from "@theatre/r3f";
import { ScrollControls, Scroll, useScroll } from '@react-three/drei';






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
      <ScrollControls pages={3} damping={4}>
        <Scroll>
        <SheetProvider sheet={mainSheet}>
          <PerspectiveCamera
            position={[5, 5, 10]}
            rotation={[0, 0, 0]}
            fov={30}
            near={1}
            makeDefault
            theatreKey="Camera"
          />

          <Experience />
        </SheetProvider>
        </ScrollControls>
        </Scroll>
      </Canvas>
                {/* <Perf /> */}
    </>
  );
}


const Content = () => {
  const scroll = useScroll();

  return (
    <>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      <mesh position={[0, -2, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="blue" />
      </mesh>
      <mesh position={[0, -4, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="green" />
      </mesh>
    </>
  );
};

export default App;
