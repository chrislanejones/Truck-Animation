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
      {/* <ambientLight intensity={Math.PI / 2} /> */}
      <Environment
        background={true}
        preset={"park"}
        backgroundRotation={[0, Math.PI / 3, 0]}
        environmentIntensity={0}
      />
      <e.group theatreKey="World">
        {/* <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      /> */}
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
        <e.pointLight
          theatreKey="SunLight"
          position={[100, 20, -10]}
          decay={0}
          color="#FFC300"
          intensity={Math.PI * 0.3}
        />
      </e.group>
    </>
  );
}

export default Experience;
