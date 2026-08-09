import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html, Float, PerspectiveCamera, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { Volume2, Sparkles, Eye, Info, CheckCircle2, RotateCcw } from 'lucide-react';
import { ANATOMICAL_STRUCTURES } from '../data/anatomy';
import { AnatomicalStructure } from '../types';
import { playComplexCochlearFrequency } from '../utils/audioSynth';

interface Ear3DCanvasProps {
  activeStructure: AnatomicalStructure;
  onSelectStructure: (structure: AnatomicalStructure) => void;
  highlightedLessonId?: string;
  showLabels?: boolean;
  xrayMode?: boolean;
  autoRotate?: boolean;
}

// 3D Model Component for Structure Parts
interface StructureMeshProps {
  structure: AnatomicalStructure;
  isSelected: boolean;
  isHighlightedByLesson: boolean;
  onSelect: (structure: AnatomicalStructure) => void;
  showLabel: boolean;
  xrayMode: boolean;
}

const StructureMesh: React.FC<StructureMeshProps> = ({
  structure,
  isSelected,
  isHighlightedByLesson,
  onSelect,
  showLabel,
  xrayMode,
}) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState(false);

  // Animate pulse when selected or highlighted by lesson
  useFrame((state, delta) => {
    if (meshRef.current) {
      if (isSelected || isHighlightedByLesson) {
        const t = state.clock.getElapsedTime();
        const scalePulse = 1 + Math.sin(t * 4) * 0.05;
        meshRef.current.scale.set(scalePulse, scalePulse, scalePulse);
        
        if (meshRef.current.material instanceof THREE.MeshStandardMaterial) {
          meshRef.current.material.emissiveIntensity = 0.5 + Math.sin(t * 5) * 0.3;
        }
      } else {
        meshRef.current.scale.set(1, 1, 1);
        if (meshRef.current.material instanceof THREE.MeshStandardMaterial) {
          meshRef.current.material.emissiveIntensity = hovered ? 0.3 : 0.05;
        }
      }
    }
  });

  // Color mapping based on structure region & state
  const getBaseColor = () => {
    if (isSelected) return '#06b6d4'; // Cyan highlight
    if (isHighlightedByLesson) return '#f59e0b'; // Amber lesson highlight
    if (hovered) return '#38bdf8';

    switch (structure.region) {
      case 'outer':
        return '#f472b6'; // Pinna / Ear canal skin tone pink/rose
      case 'middle':
        return '#fbbf24'; // Ossicles / Eardrum amber/gold
      case 'inner':
        return '#10b981'; // Cochlea emerald
      case 'neural':
        return '#ec4899'; // Nerve magenta/pink
      default:
        return '#9ca3af';
    }
  };

  const baseColor = getBaseColor();

  // Create customized 3D Geometries for each structure
  const renderGeometry = () => {
    switch (structure.id) {
      case 'pinna':
        // Curved helix auricle shape
        return <torusGeometry args={[1.8, 0.4, 16, 32, Math.PI * 1.2]} />;
      case 'ear_canal':
        // Curved auditory canal cylinder
        return <cylinderGeometry args={[0.35, 0.3, 2.2, 24]} />;
      case 'eardrum':
        // Conical membrane disk
        return <coneGeometry args={[0.6, 0.2, 32]} />;
      case 'malleus':
        // Hammer handle shape
        return <cylinderGeometry args={[0.1, 0.05, 1.1, 16]} />;
      case 'incus':
        // Anvil body shape
        return <boxGeometry args={[0.3, 0.4, 0.3]} />;
      case 'stapes':
        // Stirrup arch shape
        return <torusGeometry args={[0.2, 0.06, 12, 16]} />;
      case 'cochlea':
        // Spiral tube helix
        return <torusKnotGeometry args={[0.7, 0.22, 64, 16, 2, 3]} />;
      case 'semicircular_canals':
        // 3 semicircular arches
        return (
          <group>
            <torusGeometry args={[0.7, 0.08, 12, 24, Math.PI * 1.3]} />
          </group>
        );
      case 'auditory_nerve':
        // Branching nerve bundle cylinder
        return <cylinderGeometry args={[0.15, 0.25, 2.5, 16]} />;
      default:
        return <sphereGeometry args={[0.5, 32, 32]} />;
    }
  };

  // Convert position array to Vector3
  const position = new THREE.Vector3(...structure.position3D);

  return (
    <group ref={groupRef} position={position}>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(structure);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
        }}
      >
        {renderGeometry()}
        <meshStandardMaterial
          color={baseColor}
          emissive={isSelected ? '#06b6d4' : isHighlightedByLesson ? '#f59e0b' : '#0284c7'}
          emissiveIntensity={isSelected ? 0.6 : 0.1}
          roughness={0.3}
          metalness={0.2}
          wireframe={xrayMode}
          transparent={xrayMode || structure.region === 'outer'}
          opacity={xrayMode ? 0.4 : structure.region === 'outer' ? 0.75 : 1}
        />
      </mesh>

      {/* 3D Label Annotation overlay */}
      {(showLabel || isSelected || isHighlightedByLesson) && (
        <Html
          position={[0, 0.8, 0]}
          center
          distanceFactor={10}
          className="pointer-events-none select-none z-10"
        >
          <div
            className={`px-2.5 py-1 rounded-xl text-[10px] font-mono font-bold whitespace-nowrap shadow-lg transition-all border flex items-center gap-1.5 ${
              isSelected
                ? 'bg-cyan-500 text-zinc-950 border-cyan-300 scale-110'
                : isHighlightedByLesson
                ? 'bg-amber-500 text-zinc-950 border-amber-300 animate-bounce'
                : 'bg-zinc-900/90 text-zinc-200 border-zinc-700 backdrop-blur-md'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>{structure.name}</span>
          </div>
        </Html>
      )}
    </group>
  );
};

// Temporal Bone Shell Representation (Subtle semi-transparent bone framework)
const BoneFramework: React.FC<{ xrayMode: boolean }> = ({ xrayMode }) => {
  return (
    <mesh position={[0.5, 0, -0.5]}>
      <boxGeometry args={[7, 4, 3]} />
      <meshStandardMaterial
        color="#3f3f46"
        wireframe={true}
        transparent={true}
        opacity={xrayMode ? 0.25 : 0.08}
      />
    </mesh>
  );
};

// Scene Controller component to animate camera zoom on selected structure
const SceneCameraTarget: React.FC<{ selectedPos?: [number, number, number] }> = ({
  selectedPos,
}) => {
  const { camera } = useThree();

  useEffect(() => {
    if (selectedPos) {
      // Smooth camera transition toward target
      const targetPos = new THREE.Vector3(
        selectedPos[0] * 0.8,
        selectedPos[1] * 0.8 + 1,
        selectedPos[2] + 4
      );
      camera.position.lerp(targetPos, 0.5);
    }
  }, [selectedPos, camera]);

  return null;
};

export const Ear3DCanvas: React.FC<Ear3DCanvasProps> = ({
  activeStructure,
  onSelectStructure,
  highlightedLessonId,
  showLabels = true,
  xrayMode = false,
  autoRotate = false,
}) => {
  const controlsRef = useRef<any>(null);

  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <div className="relative w-full aspect-[16/10] bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 rounded-3xl border border-zinc-800 overflow-hidden shadow-2xl">
      {/* Three.js Canvas */}
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 1, 6]} fov={45} />
        
        {/* Lighting setup for medical high clarity */}
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#06b6d4" />
        <spotLight position={[0, 5, 5]} intensity={1.2} color="#ffffff" angle={0.5} />

        {/* Temporal Bone outline */}
        <BoneFramework xrayMode={xrayMode} />

        {/* All Anatomical 3D Meshes */}
        {ANATOMICAL_STRUCTURES.map((struct) => (
          <StructureMesh
            key={struct.id}
            structure={struct}
            isSelected={activeStructure.id === struct.id}
            isHighlightedByLesson={highlightedLessonId === struct.id}
            onSelect={(s) => {
              onSelectStructure(s);
              if (s.id === 'cochlea') {
                playComplexCochlearFrequency(1000, 800);
              }
            }}
            showLabel={showLabels}
            xrayMode={xrayMode}
          />
        ))}

        {/* Floor Contact Shadow */}
        <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2} far={4} />

        {/* Camera Control */}
        <OrbitControls
          ref={controlsRef}
          enableRotate={true}
          enableZoom={true}
          enablePan={true}
          autoRotate={autoRotate}
          autoRotateSpeed={1.2}
          minDistance={2}
          maxDistance={12}
        />

        <SceneCameraTarget selectedPos={activeStructure.position3D} />
      </Canvas>

      {/* Control Overlay Buttons */}
      <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
        <button
          onClick={handleResetCamera}
          className="p-2.5 rounded-2xl bg-zinc-900/80 hover:bg-zinc-800 text-white border border-zinc-700/80 backdrop-blur-md transition-all shadow-lg text-xs font-bold flex items-center gap-1.5"
          title="Reset Camera View"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset View</span>
        </button>
      </div>

      {/* Bottom Medical 3D Instructions */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between px-4 py-2 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 backdrop-blur-md text-[11px] text-zinc-400 z-10 font-mono">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-cyan-400">
            <Eye className="w-3.5 h-3.5" /> 3D Orbit & Pan
          </span>
          <span className="hidden sm:inline">• Left Click + Drag to rotate</span>
          <span className="hidden sm:inline">• Scroll to zoom</span>
        </div>
        <div className="text-emerald-400 font-bold flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" /> R3F WebGL Render
        </div>
      </div>
    </div>
  );
};
