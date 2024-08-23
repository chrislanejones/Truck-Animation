import {
  OrbitControls,
  MeshReflectorMaterial,
  useGLTF,
  PerspectiveCamera,
} from "@react-three/drei";
import { Physics, RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Avatarclj } from "./Avatarclj";
import { Van } from "./Van";
import { VanDoors } from "./Van-With-Rear-Door";

const Model = ({ url }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
};

function Experience() {
  return (
    <>
      <OrbitControls />
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      {/* <Van scale={0.05} /> */}
      <Physics>
        <Avatarclj
          rotation-y={Math.PI}
          rotation-x={Math.PI / 2}
          rotation-z={Math.PI}
          scale={4.5}
          position={[-0.4, 3.9, 4.8]}
        />
        <RigidBody position={[0, 5, 0]} rotation-x={-Math.PI / 2}>
          <Model url="Van-with-rear-doors.glb" />
        </RigidBody>
        <RigidBody type="fixed">
          <mesh position={[0, 0, 0]} rotation-x={-Math.PI / 2}>
            <circleGeometry args={[190, 190]} />
            <MeshReflectorMaterial
              color="#414141"
              resolution={1024}
              mixStrength={3}
              roughness={0.6}
            />
          </mesh>
        </RigidBody>
      </Physics>
      <pointLight
        position={[100, 20, -10]}
        decay={0}
        color="#FFC300"
        intensity={Math.PI}
      />
    </>
  );
}

export default Experience;
