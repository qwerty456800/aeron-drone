import {
  forwardRef,
  Suspense,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { isWebGLAvailable } from "./webgl.js";

const MODEL_PATH = "/models/aeron-x1.glb";
const poses = [
  { rotation: [0.04, -0.3, 0], position: [-0.05, 0, 0], scale: 1.08 },
  { rotation: [-0.18, 0.55, 0], position: [0.02, 0.04, 0], scale: 1 },
  { rotation: [0.12, 1.45, 0], position: [-0.08, -0.02, 0], scale: 1.04 },
  { rotation: [-0.04, 2.45, 0], position: [0.08, 0, -0.18], scale: 0.88 },
];

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
      if (child.material?.roughnessMap)
        child.material.roughnessMap.anisotropy = 4;
    });
    return clone;
  }, [scene]);
  return <primitive object={normalized} />;
}

const TechnologyDrone = forwardRef(function TechnologyDrone(_, ref) {
  const presentation = useRef();
  useImperativeHandle(
    ref,
    () => ({
      setProgress(progress) {
        if (!presentation.current) return;
        const scaled =
          THREE.MathUtils.clamp(progress, 0, 1) * (poses.length - 1);
        const fromIndex = Math.min(Math.floor(scaled), poses.length - 2);
        const amount = scaled - fromIndex;
        const from = poses[fromIndex];
        const to = poses[Math.min(fromIndex + 1, poses.length - 1)];
        presentation.current.rotation.set(
          ...from.rotation.map((value, index) =>
            THREE.MathUtils.lerp(value, to.rotation[index], amount),
          ),
        );
        presentation.current.position.set(
          ...from.position.map((value, index) =>
            THREE.MathUtils.lerp(value, to.position[index], amount),
          ),
        );
        presentation.current.scale.setScalar(
          THREE.MathUtils.lerp(from.scale, to.scale, amount),
        );
      },
    }),
    [],
  );
  if (!isWebGLAvailable()) {
    return (
      <div
        className="technology-drone technology-drone--fallback"
        aria-label="X650 static technical view"
      >
        <div className="technology-drone__fallback-body">
          <span>X650</span>
          <i />
        </div>
        <small>STATIC TECHNICAL VIEW</small>
      </div>
    );
  }

  return (
    <div
      className="technology-drone"
      aria-label="X650 technical development model"
    >
      <Canvas
        camera={{ fov: 34, position: [0, 0.15, 6.4] }}
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
        <ambientLight intensity={1.4} />
        <directionalLight
          position={[3, 4, 5]}
          intensity={2.6}
          color="#eef2f2"
        />
        <directionalLight
          position={[-4, 1, -3]}
          intensity={1.2}
          color="#9ba9ad"
        />
        <group
          ref={presentation}
          rotation={poses[0].rotation}
          position={poses[0].position}
          scale={poses[0].scale}
        >
          <Suspense fallback={null}>
            <Model />
          </Suspense>
        </group>
      </Canvas>
    </div>
  );
});

useGLTF.preload(MODEL_PATH);
export default TechnologyDrone;
