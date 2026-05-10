"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

void main() {
  vec2 uv = vUv;
  vec2 centered = uv - 0.5;
  centered.x *= uResolution.x / max(uResolution.y, 1.0);

  float field = 0.0;
  field += noise(uv * 2.2 + vec2(uTime * 0.018, -uTime * 0.012)) * 0.45;
  field += noise(uv * 6.5 + vec2(-uTime * 0.011, uTime * 0.016)) * 0.24;

  float vignette = smoothstep(0.82, 0.08, length(centered));
  float beam = smoothstep(0.74, 0.0, abs(centered.x + centered.y * 0.22));
  float particle = step(0.987, noise(uv * 150.0 + uTime * 0.02)) * 0.16;

  vec3 navy = vec3(0.039, 0.055, 0.102);
  vec3 gold = vec3(0.788, 0.663, 0.38);
  vec3 color = navy * (field * 0.42 + beam * 0.1) + gold * particle;

  gl_FragColor = vec4(color, vignette * 0.9);
}
`;

function FogPlane() {
  const material = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) }
    }),
    []
  );

  useFrame(({ clock, size }) => {
    if (!material.current) {
      return;
    }

    material.current.uniforms.uTime.value = clock.elapsedTime;
    material.current.uniforms.uResolution.value.set(size.width, size.height);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

export default function HeroShader() {
  return (
    <Canvas
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 1], fov: 45 }}
    >
      <FogPlane />
    </Canvas>
  );
}
