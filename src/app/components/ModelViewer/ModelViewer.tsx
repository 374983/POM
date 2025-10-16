"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, Html } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";


function LoadedModel({ modelName }: { modelName: string }) {
  const groupRef = useRef<THREE.Group>(new THREE.Group());

  useEffect(() => {
    const mtlLoader = new MTLLoader();
    mtlLoader.load(`/models/${modelName}.mtl`, (materials) => {
      materials.preload();

      const objLoader = new OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.load(`/models/${modelName}.obj`, (object) => {
        object.scale.set(1, 1, 1);
        object.rotation.x = -Math.PI / 2;
        groupRef.current.clear(); 
        groupRef.current.add(object);
      });
    });
  }, [modelName]);

  return <group ref={groupRef} />;
}


function CameraDebuggerR3F() {
  const { camera } = useThree();
  const [position, setPosition] = useState([0, 0, 0]);

  useFrame(() => {
    setPosition(camera.position.toArray());
  });

  return (
    <group>
      <Html position={[0, 0, 0]}>
        <div
          style={{
            background: "rgba(0,0,0,0.6)",
            color: "white",
            padding: "8px",
            borderRadius: "8px",
            fontSize: "12px",
          }}
        >
          <div>Camera Position:</div>
          <div>
            x: {position[0].toFixed(2)} <br />
            y: {position[1].toFixed(2)} <br />
            z: {position[2].toFixed(2)}
          </div>
        </div>
      </Html>
    </group>
  );
}

export default function ModelViewer({ modelName }: { modelName: string }) {
  return (
    <Canvas camera={{ position: [200, 50, 270], fov: 50 }} frameloop="demand">
      <ambientLight intensity={1.2} />
      
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <Suspense fallback={null}>
        <LoadedModel modelName={modelName} />
        <Environment preset="studio" />
      </Suspense>
      <OrbitControls enablePan={true} enableDamping={false} />
      {/* <CameraDebuggerR3F /> */}
    </Canvas>
  );
}