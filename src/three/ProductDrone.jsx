import { Suspense, useMemo } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { PerspectiveCamera, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { isWebGLAvailable } from "./webgl.js";

const MODEL_PATH = "/models/aeron-x1.glb";

function Model() {
  const { scene } = useGLTF(MODEL_PATH);
  const normalized = useMemo(() => {
    const clone = scene.clone(true);
    const bounds = new THREE.Box3().setFromObject(clone);
    const size = bounds.getSize(new THREE.Vector3());
    const center = bounds.getCenter(new THREE.Vector3());
    const scale = 3.35 / (Math.max(size.x, size.y, size.z) || 1);
    clone.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
    clone.scale.setScalar(scale);
    clone.traverse((child) => {
      if (!child.isMesh) return;
      child.castShadow = false;
      child.receiveShadow = false;
      if (child.material?.map) child.material.map.anisotropy = 4;
      if (child.material?.normalMap) child.material.normalMap.anisotropy = 4;
    });
    return clone;
  }, [scene]);
  return <primitive object={normalized} />;
}

const CAMERA_FOV = 35;
const BASE_DISTANCE = 6.4;
// Half of the model's on-screen width (normalized model × 1.12 group scale) plus margin.
const FRAMED_HALF_WIDTH = 2.25;

// Pull the camera back on narrow (portrait) canvases so the propellers aren't clipped.
function FitCamera() {
  const width = useThree((state) => state.size.width);
  const height = useThree((state) => state.size.height);
  const aspect = width / height || 1;
  const halfFov = THREE.MathUtils.degToRad(CAMERA_FOV / 2);
  const distance = Math.max(
    BASE_DISTANCE,
    FRAMED_HALF_WIDTH / (Math.tan(halfFov) * aspect),
  );
  return (
    <PerspectiveCamera
      makeDefault
      fov={CAMERA_FOV}
      position={[0, 0.15, distance]}
    />
  );
}

function ProductDrone() {
  if (!isWebGLAvailable()) {
    return (
      <div
        className="product-drone product-drone--fallback"
        aria-label="X650 static product presentation"
      >
        <span>X650 / STATIC VIEW</span>
      </div>
    );
  }

  return (
    <div className="product-drone" aria-label="X650 product presentation">
      <Canvas
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.outputColorSpace = THREE.SRGBColorSpace;
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1;
        }}
      >
        <FitCamera />
        <ambientLight intensity={1.45} />
        <directionalLight
          position={[3, 4, 5]}
          intensity={2.7}
          color="#eef2f2"
        />
        <directionalLight
          position={[-4, 2, -3]}
          intensity={1.1}
          color="#9ba9ad"
        />
        <group rotation={[0.04, -0.34, 0]} position={[0, 0, 0]} scale={1.12}>
          <Suspense fallback={null}>
            <Model />
          </Suspense>
        </group>
      </Canvas>
    </div>
  );
}

useGLTF.preload(MODEL_PATH);
export default ProductDrone;
