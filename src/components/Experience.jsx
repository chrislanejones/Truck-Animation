import { Environment } from "@react-three/drei";
import { editable as e } from "@theatre/r3f";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Van } from "./Van-With-Logo";
import { Avatarclj } from "./Avatarclj";
import Paint from "./Paint";
import { Background } from "./Background";

function Experience({ isLoading }) {
  const vanRoot = useRef();
  const { camera } = useThree();

  // physics state
  const started = useRef(false);
  const velocity = useRef(0);
  const impactDone = useRef(false);

  // ------------------
  // TUNING (MORE BOUNCE)
  // ------------------
  const DROP_HEIGHT = 620; // higher drop
  const SPRING = 140; // harder spring
  const DAMPING = 13; // lower damping = bigger recoil
  const MASS = 1;

  // suspension angles
  const PITCH_MAX = 0.42; // ~24°
  const ROLL_MAX = 0.34; // ~19°

  // camera shake
  const SHAKE_STRENGTH = 0.55;
  const SHAKE_DURATION = 0.22;
  const shakeTime = useRef(0);

  useEffect(() => {
    if (!isLoading) {
      started.current = true;
    }
  }, [isLoading]);

  useFrame((_, delta) => {
    if (!started.current || !vanRoot.current) return;

    // --- vertical spring ---
    const y = vanRoot.current.position.y;
    const force = -SPRING * y;
    const accel = force / MASS;

    velocity.current += accel * delta;
    velocity.current *= Math.exp(-DAMPING * delta);
    vanRoot.current.position.y += velocity.current * delta;

    const compression = Math.min(Math.abs(y) / DROP_HEIGHT, 1);

    // --- SUSPENSION (bigger, slower release) ---
    const pitch = -compression * PITCH_MAX * Math.exp(-compression * 0.7);

    const roll = -compression * ROLL_MAX * Math.exp(-compression * 1.0);

    vanRoot.current.rotation.x = pitch;
    vanRoot.current.rotation.z = roll;

    // --- IMPACT DETECTION ---
    if (!impactDone.current && compression > 0.88) {
      impactDone.current = true;
      shakeTime.current = SHAKE_DURATION;
    }

    // --- CAMERA SHAKE ---
    if (shakeTime.current > 0) {
      shakeTime.current -= delta;
      const s = shakeTime.current / SHAKE_DURATION;

      camera.position.x += (Math.random() - 0.5) * SHAKE_STRENGTH * s;
      camera.position.y += (Math.random() - 0.5) * SHAKE_STRENGTH * s;
      camera.rotation.z += (Math.random() - 0.5) * 0.01 * s;
    }

    // --- FINAL SETTLE (single landing only) ---
    if (Math.abs(y) < 0.015 && Math.abs(velocity.current) < 0.015) {
      vanRoot.current.position.y = 0;
      vanRoot.current.rotation.x = 0;
      vanRoot.current.rotation.z = 0;
      velocity.current = 0;
      started.current = false;
    }
  });

  return (
    <>
      <Environment background preset="park" environmentIntensity={0.3} />

      <e.group theatreKey="World">
        {/* SPAWN HIGH + HEAVILY TILTED */}
        <group
          ref={vanRoot}
          position={[0, DROP_HEIGHT, 0]}
          rotation={[
            -PITCH_MAX * 0.85, // nose DOWN hard
            0,
            -ROLL_MAX * 0.85, // driver side DOWN
          ]}
        >
          <e.group theatreKey="Van">
            <Van scale={0.05} />

            <Avatarclj
              rotation-y={Math.PI}
              rotation-x={Math.PI / 2}
              rotation-z={Math.PI}
              scale={4.5}
              position={[-0.4, 3.7, 4.8]}
            />

            <Paint />
          </e.group>
        </group>

        <Background />

        <e.pointLight
          theatreKey="FillLight"
          position={[-50, 30, 50]}
          intensity={0.5}
        />
      </e.group>
    </>
  );
}

export default Experience;
