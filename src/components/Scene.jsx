import { Canvas } from "@react-three/fiber";
import React, { Suspense, useRef } from "react";
import { PerspectiveCamera, SheetProvider, editable as e } from "@theatre/r3f";
import Experience from "./Experience";

const CubeLoader = () => (
  <mesh>
    <boxGeometry />
    <meshNormalMaterial />
  </mesh>
);

export const Scene = ({ mainSheet, isLoading }) => {
  const cameraTargetRef = useRef();

  return (
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
          <Experience isLoading={isLoading} />
        </SheetProvider>
      </Suspense>
    </Canvas>
  );
};
