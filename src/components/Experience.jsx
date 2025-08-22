import { useTexture, Environment, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Avatarclj } from "./Avatarclj";
import { Background } from "./Background";
import { editable as e } from "@theatre/r3f";
import Paint from "./Paint";
import { Van } from "./Van-With Logo";
import { useEffect, useState } from "react";

function Experience() {
  const [vanVisible, setVanVisible] = useState(false);
  const [manVisible, setManVisible] = useState(false);
  const [canVisible, setCanVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setVanVisible(true);
    }, 200);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setManVisible(true);
    }, 300);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setCanVisible(true);
    }, 400);
  }, []);

  return (
    <>
      {/* Enhanced ambient lighting for better overall illumination */}
      <ambientLight intensity={0.4} color="#f5f5f5" />

      {/* Environment with slight intensity to contribute to lighting */}
      <Environment
        background={true}
        preset={"park"}
        backgroundRotation={[0, Math.PI / 3, 0]}
        environmentIntensity={0.3}
      />

      <e.group theatreKey="World">
        <e.group theatreKey="Van">
          {vanVisible && <Van scale={0.05} />}
          {manVisible && (
            <Avatarclj
              rotation-y={Math.PI}
              rotation-x={Math.PI / 2}
              rotation-z={Math.PI}
              scale={4.5}
              position={[-0.4, 3.7, 4.8]}
            />
          )}
          {canVisible && <Paint />}
        </e.group>
        <Background />

        {/* Your existing sun light */}
        <e.pointLight
          theatreKey="SunLight"
          position={[100, 20, -10]}
          decay={0}
          color="#FFC300"
          intensity={Math.PI * 0.3}
        />

        {/* Additional subtle fill light to brighten shadows */}
        <e.pointLight
          theatreKey="FillLight"
          position={[-50, 30, 50]}
          decay={2}
          color="#b8d4ff"
          intensity={0.5}
        />
      </e.group>
    </>
  );
}

export default Experience;
