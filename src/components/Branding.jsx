import { Decal } from "@react-three/drei";
import React from "react";

const Branding = () => {
  return (
    <>
      <mesh>
        <sphereGeometry />
        <meshBasicMaterial />
        <Decal
          debug // Makes "bounding box" of the decal visible
          position={[0, 0, 0]} // Position of the decal
          rotation={[0, 0, 0]} // Rotation of the decal (can be a vector or a degree in radians)
          scale={1} // Scale of the decal
        >
          <meshBasicMaterial
            polygonOffset
            polygonOffsetFactor={-1} // The material should take precedence over the original
          />
        </Decal>
      </mesh>
    </>
  );
};

export default Branding;
