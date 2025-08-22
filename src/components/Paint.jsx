import { TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";
import { useRef } from "react";

const Paint = () => {
  const texture = useLoader(TextureLoader, "images/Ropaint.png"); // Replace with the path to your texture
  const meshRef = useRef();
  return (
    <>
      <mesh position={[-4, 3, -9]} ref={meshRef}>
        <cylinderGeometry attach="geometry" args={[1, 1, 2, 32]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      <mesh position={[-1.5, 3, -9]} ref={meshRef}>
        <cylinderGeometry attach="geometry" args={[1, 1, 2, 32]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      <mesh position={[0.1, 5, -9]} ref={meshRef}>
        <cylinderGeometry attach="geometry" args={[1, 1, 2, 32]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      <mesh position={[0.1, 5, -9]} ref={meshRef}>
        <cylinderGeometry attach="geometry" args={[1, 1, 2, 32]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      <mesh position={[-3.1, 5, -9.6]} ref={meshRef}>
        <cylinderGeometry attach="geometry" args={[1, 1, 2, 32]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      <mesh position={[-5.6, 5, -9.4]} ref={meshRef}>
        <cylinderGeometry attach="geometry" args={[1, 1, 2, 32]} />
        <meshStandardMaterial map={texture} />
      </mesh>
    </>
  );
};

export default Paint;
