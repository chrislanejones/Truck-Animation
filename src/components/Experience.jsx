import { OrbitControls, MeshReflectorMaterial } from "@react-three/drei";
import { Van } from "./Van";

function Experience() {
  return (
    <>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <OrbitControls />
      <Van scale={0.1} />
      <mesh position={[0, 0, 0]} rotation-x={-Math.PI / 2}>
        <circleGeometry args={[190, 190]} />
        <MeshReflectorMaterial
          color="#414141"
          resolution={1024}
          mixStrength={3}
          roughness={0.6}
        />
      </mesh>
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
