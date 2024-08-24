import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export const Background = () => {
  const map = useTexture("textures/Euro-Urban-Street.jpg");
  return (
    <>
      <mesh>
        <sphereGeometry args={[400, 400, 150]} />
        <meshBasicMaterial side={THREE.BackSide} map={map} toneMapped={false} />
      </mesh>
    </>
  );
};
