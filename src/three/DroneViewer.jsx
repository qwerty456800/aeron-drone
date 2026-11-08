import {
  Component,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { isWebGLAvailable } from "./webgl.js";

const MODEL_PATH = "/models/aeron-x1.glb";

function DroneModel({ onReady }) {
  const { scene } = useGLTF(MODEL_PATH);
  const group = useRef();
  const { gl } = useThree();
  const maxAnisotropy = gl.capabilities.getMaxAnisotropy();

  const model = useMemo(() => {
    const clone = scene.clone(true);
    const bounds = new THREE.Box3().setFromObject(clone);
    const size = bounds.getSize(new THREE.Vector3());
    const center = bounds.getCenter(new THREE.Vector3());
    const largestDimension = Math.max(size.x, size.y, size.z) || 1;
    const scale = 3.35 / largestDimension;

    clone.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
    clone.scale.setScalar(scale);
    clone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.material?.map && (child.material.map.anisotropy = maxAnisotropy);
        child.material?.normalMap &&
          (child.material.normalMap.anisotropy = maxAnisotropy);
        child.material?.roughnessMap &&
          (child.material.roughnessMap.anisotropy = maxAnisotropy);
      }
    });

    return clone;
  }, [maxAnisotropy, scene]);

  useEffect(() => {
    onReady?.();
  }, [onReady]);

  useFrame((state, delta) => {
    if (!group.current) return;

    group.current.position.y = THREE.MathUtils.damp(
      group.current.position.y,
      Math.sin(state.clock.elapsedTime * 0.45) * 0.035,
      2,
      delta,
    );
  });

  return (
    <group ref={group} rotation={[0.04, -0.28, 0]}>
      <primitive object={model} />
    </group>
  );
}

class ViewerErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    void error;
  }

  render() {
    return this.state.hasError ? null : this.props.children;
  }
}

const DEFAULT_CAMERA_POSITION = new THREE.Vector3(0, 0.25, 6.6);
const DEFAULT_TARGET = new THREE.Vector3(0, 0, 0);

function DroneScene({ onReady }) {
  const controls = useRef();
  const resetTimer = useRef();
  const returnState = useRef({
    active: false,
    elapsed: 0,
    startPosition: new THREE.Vector3(),
    startTarget: new THREE.Vector3(),
  });
  const { camera } = useThree();

  useEffect(() => () => window.clearTimeout(resetTimer.current), []);

  const cancelReturn = () => {
    window.clearTimeout(resetTimer.current);
    returnState.current.active = false;
  };

  const scheduleReturn = () => {
    window.clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(() => {
      if (!controls.current) return;
      returnState.current = {
        active: true,
        elapsed: 0,
        startPosition: camera.position.clone(),
        startTarget: controls.current.target.clone(),
      };
    }, 1000);
  };

  useFrame((_, delta) => {
    const state = returnState.current;
    if (!state.active || !controls.current) return;

    state.elapsed += delta;
    const progress = Math.min(state.elapsed / 1.5, 1);
    const eased = 1 - (1 - progress) ** 3;
    camera.position.lerpVectors(
      state.startPosition,
      DEFAULT_CAMERA_POSITION,
      eased,
    );
    controls.current.target.lerpVectors(
      state.startTarget,
      DEFAULT_TARGET,
      eased,
    );
    controls.current.update();

    if (progress >= 1) state.active = false;
  });

  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight position={[3, 4, 5]} intensity={2.4} color="#eef2f2" />
      <spotLight
        position={[-4, 2, 4]}
        intensity={18}
        angle={0.4}
        penumbra={1}
        distance={12}
        color="#cbd6d8"
      />
      <directionalLight
        position={[0, -2, -3]}
        intensity={0.8}
        color="#77858a"
      />
      <pointLight
        position={[0, 1.5, -3]}
        intensity={1.4}
        distance={8}
        color="#dce3e3"
      />
      <Suspense fallback={null}>
        <DroneModel onReady={onReady} />
      </Suspense>
      <OrbitControls
        ref={controls}
        enableDamping
        dampingFactor={0.08}
        enableZoom={false}
        enablePan={false}
        minPolarAngle={1.1}
        maxPolarAngle={2}
        target={[0, 0, 0]}
        onStart={cancelReturn}
        onEnd={scheduleReturn}
      />
    </>
  );
}

function DroneViewer() {
  const [ready, setReady] = useState(false);
  const handleReady = useMemo(() => () => setReady(true), []);

  if (!isWebGLAvailable()) {
    return (
      <div
        className="drone-canvas drone-canvas--fallback"
        aria-label="X650 static technical view"
      >
        <span> X650 / STATIC VIEW </span>
      </div>
    );
  }

  return (
    <div
      className="drone-canvas"
      aria-label="Interactive X650 3D visualization"
    >
      <ViewerErrorBoundary>
        <Canvas
          camera={{ fov: 35, position: [0, 0.25, 6.6] }}
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
          <DroneScene onReady={handleReady} />
        </Canvas>
      </ViewerErrorBoundary>
      {!ready && (
        <span className="model-loading" aria-hidden="true">
          Initializing model
        </span>
      )}
    </div>
  );
}

useGLTF.preload(MODEL_PATH);

export default DroneViewer;
