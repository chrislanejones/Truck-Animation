import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export const Background = () => {
  const texture = useTexture("textures/Road-Asphalt.jpg");

  texture.repeat.set(10, 10);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  const map = useTexture("textures/Euro-Urban-Street.jpg");
  return (
    <>
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
    </>
  );
};
