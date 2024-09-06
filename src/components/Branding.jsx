import { Decal } from "@react-three/drei";
import React from "react";
import { editable as e } from "@theatre/r3f";

const Branding = () => {
  return (
    <>
      <e.mesh theatreKey="decal">
        <sphereGeometry />
        <meshBasicMaterial />
        <Decal
          debug // Makes "bounding box" of the decal visible
          position={[0, 0.9, 0.75]} rotation={[-0.4, Math.PI, 0]} scale={[0.9, 0.25, 1]}
        >
          <meshBasicMaterial
            polygonOffset
            polygonOffsetFactor={-1} // The material should take precedence over the original
          />
        </Decal>
      </e.mesh>
    </>
  );
};

export default Branding;
