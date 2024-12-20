/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { extend, useFrame } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import { PivotControls, useGLTF } from "@react-three/drei";
import { editable as e } from "@theatre/r3f";

export function Van(props) {
  const { nodes, materials } = useGLTF("/VanWithLogo.glb");
  const meshRef = useRef();
  const [direction, setDirection] = useState(-1);
  const speedFactor = 350;

  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.1}>
        <group ref={meshRef}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["Passangerside-window"].geometry}
            material={materials.Glass}
            position={[6.595, 0, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["Driverside-Window"].geometry}
            material={materials.Glass}
            position={[-5.566, 0, 0]}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cabin.geometry}
          material={materials.Body}
          position={[-15.173, -22.287, -32.034]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Left-Front-Tire"].geometry}
          material={materials.Tire}
          position={[467.957, 0.686, -1.675]}
          rotation={[0, 0, -0.241]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Left-Rear-Tire"].geometry}
          material={materials.Tire}
          position={[-0.123, -0.986, 4.199]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Lights.geometry}
          material={materials.Glass}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Nub-on-Top"].geometry}
          material={materials.Body}
        />
        <group
          position={[230, 2660.285, 1160]}
          rotation={[Math.PI * -120, 0, 0]}
        >
          <e.group theatreKey="Left Rear Door">
            <mesh
              castShadow
              receiveShadow
              geometry={nodes["Rear-Door-Left"].geometry}
              material={materials.Body}
              rotation={[0, 0, -18.81]}
            />
          </e.group>
        </group>
        <group
          position={[-1440.79, 2652.726, 933.315]}
          rotation={[Math.PI * -120, 0, 0]}
        >
          <e.group theatreKey="Right Rear Door">
            <mesh
              castShadow
              receiveShadow
              geometry={nodes["Rear-Door-Right"].geometry}
              material={materials.Body}
              rotation={[0, 0, 18.83]}
            />
          </e.group>
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Right-Front-Tire"].geometry}
          material={materials.Tire}
          position={[395.856, -404.648, -2.489]}
          rotation={[0, 0, -0.247]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Right-Rear-Tire"].geometry}
          material={materials.Tire}
          position={[-0.157, -6.316, -14.98]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Van-Front001"].geometry}
          material={materials["Body.004"]}
          position={[0.259, 5.12, -2.522]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Van-Rear"].geometry}
          material={materials.Body}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Windshield.geometry}
          material={materials.Glass}
          material-transparent={true}
          material-opacity={0.5}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/VanWithLogo.glb");
