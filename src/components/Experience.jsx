import { useTexture, Environment } from "@react-three/drei";
import * as THREE from "three";
import { Avatarclj } from "./Avatarclj";
import { VanDoors } from "./Van-With-Rear-Door";
import { Background } from "./Background";
import { editable as e } from "@theatre/r3f";

function Experience() {
  return (
    <>
      {/* <ambientLight intensity={Math.PI / 2} /> */}
      <e.group theatreKey="World">
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
        <e.group theatreKey="Van">
          <VanDoors scale={0.05} />
          <Avatarclj
            rotation-y={Math.PI}
            rotation-x={Math.PI / 2}
            rotation-z={Math.PI}
            scale={4.5}
            position={[-0.4, 3.7, 4.8]}
          />
        </e.group>
        <Background />
        <e.pointLight
          theatreKey="SunLight"
          position={[100, 20, -10]}
          decay={0}
          color="#FFC300"
          intensity={Math.PI * 0.4}
        />
      </e.group>
    </>
  );
}

export default Experience;
