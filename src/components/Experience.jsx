import {
  OrbitControls,
  MeshReflectorMaterial,
  useGLTF,
  PerspectiveCamera,
  useTexture,
  Environment,
} from "@react-three/drei";
import * as THREE from "three";
import { Van } from "./Van";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Avatarclj } from "./Avatarclj";
import { VanDoors } from "./Van-With-Rear-Door";
import { Background } from "./Background";
import { editable as e } from "@theatre/r3f";
import { getProject, types } from "@theatre/core";

function Experience() {
  const texture = useTexture("textures/Road-Asphalt.jpg");

  texture.repeat.set(10, 10);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  const VanControl = sheet.object("Box", {
    rotation: types.compound({
      xR: types.number(0, { range: [-Math.PI, Math.PI] }),
      yR: types.number(0, { range: [-Math.PI, Math.PI] }),
      zR: types.number(0, { range: [-Math.PI, Math.PI] }),
    }),
    position: types.compound({
      x: types.number(0, { nudgeMultiplier: 0.1 }),
      y: types.number(0, { nudgeMultiplier: 0.1 }),
      z: types.number(0, { nudgeMultiplier: 0.1 }),
    }),
    scale: types.compound({
      xS: types.number(1, { nudgeMultiplier: 0.1 }),
      yS: types.number(1, { nudgeMultiplier: 0.1 }),
      zS: types.number(1, { nudgeMultiplier: 0.1 }),
    }),
  });

  return (
    <>
      <OrbitControls />
      {/* <ambientLight intensity={Math.PI / 2} /> */}
      <Environment
        background={true}
        preset={"park"}
        backgroundRotation={[0, Math.PI / 3, 0]}
        environmentIntensity={0}
      />
      {/* <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      /> */}
      {/* <Van scale={0.05} /> */}
      <VanDoors scale={0.05} />
      <Avatarclj
        rotation-y={Math.PI}
        rotation-x={Math.PI / 2}
        rotation-z={Math.PI}
        scale={4.5}
        position={[-0.4, 3.7, 4.8]}
      />
      <mesh position={[0, -0.2, 0]} rotation-x={-Math.PI / 2}>
        <boxGeometry args={[200, 210]} />
        <meshStandardMaterial
          map={texture}
          color="darkgray"
          emissive="black"
          emissiveIntensity={0.9}
        />
        {/* <MeshReflectorMaterial
          color="#414141"
          resolution={1024}
          mixStrength={3}
          roughness={0.6}
        /> */}
      </mesh>
      <e.pointLight
        theatreKey="SunLight"
        position={[100, 20, -10]}
        decay={0}
        color="#FFC300"
        intensity={Math.PI * 0.5}
      />
    </>
  );
}

export default Experience;
