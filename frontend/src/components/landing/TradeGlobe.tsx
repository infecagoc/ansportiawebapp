'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const GOLD = '#A88B58';
const GOLD_LIGHT = '#c9b487';
const MAROON = '#9a1a30';
const CREAM = '#E8E1D6';

function latLngToVec3(lat: number, lng: number, r: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

const HUBS: Array<[number, number, string]> = [
  [27.7, 85.3, 'Kathmandu'],
  [39.9, 116.4, 'Beijing'],
  [31.2, 121.5, 'Shanghai'],
  [22.3, 114.2, 'Hong Kong'],
  [28.6, 77.2, 'Delhi'],
  [1.35, 103.8, 'Singapore'],
];

const ROUTES: Array<[number, number]> = [
  [0, 1],
  [0, 2],
  [0, 3],
  [4, 0],
  [1, 5],
  [2, 3],
];

const R = 2;

/** Static gold arc line for each trade route — the "art". */
function Arc({ curve }: { curve: THREE.QuadraticBezierCurve3 }) {
  const line = useMemo(() => {
    const geom = new THREE.BufferGeometry().setFromPoints(curve.getPoints(48));
    const mat = new THREE.LineBasicMaterial({
      color: GOLD,
      transparent: true,
      opacity: 0.45,
    });
    return new THREE.Line(geom, mat);
  }, [curve]);
  return <primitive object={line} />;
}

/** Dot that launches from one hub, arcs up, and drops onto another. */
function Travelers({ curves }: { curves: THREE.QuadraticBezierCurve3[] }) {
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    curves.forEach((c, i) => {
      const mesh = refs.current[i];
      if (!mesh) return;
      const p = (t * 0.16 + i / curves.length) % 1;
      mesh.position.copy(c.getPoint(p));
      const fade = Math.sin(p * Math.PI);
      mesh.scale.setScalar(0.4 + fade);
      (mesh.material as THREE.MeshBasicMaterial).opacity = 0.2 + fade * 0.8;
    });
  });
  return (
    <>
      {curves.map((_, i) => (
        <mesh key={i} ref={(el) => { refs.current[i] = el; }}>
          <sphereGeometry args={[0.05, 12, 12]} />
          <meshBasicMaterial color={CREAM} transparent opacity={0.9} />
        </mesh>
      ))}
    </>
  );
}

function GlobeScene() {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.05;
  });

  const hubs = useMemo(
    () => HUBS.map(([lat, lng]) => latLngToVec3(lat, lng, R)),
    []
  );

  const points = useMemo(() => {
    const count = 2200;
    const positions = new Float32Array(count * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = golden * i;
      positions[i * 3] = Math.cos(theta) * radius * R;
      positions[i * 3 + 1] = y * R;
      positions[i * 3 + 2] = Math.sin(theta) * radius * R;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return g;
  }, []);

  const curves = useMemo(
    () =>
      ROUTES.map(([a, b]) => {
        const start = hubs[a];
        const end = hubs[b];
        const mid = start
          .clone()
          .add(end)
          .multiplyScalar(0.5)
          .normalize()
          .multiplyScalar(R + 1);
        return new THREE.QuadraticBezierCurve3(start, mid, end);
      }),
    [hubs]
  );

  return (
    <group ref={group}>
      {/* Solid core so the back doesn't show through */}
      <mesh>
        <sphereGeometry args={[R * 0.985, 48, 48]} />
        <meshStandardMaterial color="#0A171C" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Dotted surface */}
      <points geometry={points}>
        <pointsMaterial
          color={GOLD}
          size={0.022}
          sizeAttenuation
          transparent
          opacity={0.6}
          depthWrite={false}
        />
      </points>

      {/* Wireframe latitude/longitude shell */}
      <mesh>
        <sphereGeometry args={[R * 1.002, 24, 24]} />
        <meshBasicMaterial color={GOLD} wireframe transparent opacity={0.08} />
      </mesh>

      {/* Trade-route arcs (art) + traveling dots */}
      {curves.map((c, i) => (
        <Arc key={i} curve={c} />
      ))}
      <Travelers curves={curves} />

      {/* Hub markers */}
      {hubs.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshBasicMaterial color={GOLD_LIGHT} />
        </mesh>
      ))}
    </group>
  );
}

export default function TradeGlobe() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.8} />
      <pointLight position={[5, 3, 5]} intensity={1.1} color={GOLD_LIGHT} />
      <pointLight position={[-5, -2, -4]} intensity={0.5} color={MAROON} />
      <GlobeScene />
      {/* Interactive: drag to rotate, no zoom/pan */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.5}
        autoRotate={false}
      />
    </Canvas>
  );
}
