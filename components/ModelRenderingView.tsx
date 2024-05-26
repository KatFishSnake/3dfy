'use client';

import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { Suspense, useRef } from 'react';
import { Loader2 } from 'lucide-react';

type PropTypes = {
	mtl: string;
	obj: string;
	texture: string;
};

const Scene = ({ mtl, obj, texture }: PropTypes) => {
	const meshRef = useRef<THREE.Object3D>(null);

	const materials = useLoader(MTLLoader, mtl, (loader) => {
		const loadingManager = new THREE.LoadingManager();
		loadingManager.setURLModifier((url) => {
			if (url.endsWith('.png') && texture) {
				return texture;
			}
			return url;
		});
		loader.manager = loadingManager;
	});

	const mesh = useLoader(OBJLoader, obj, (loader) => {
		materials.preload();
		loader.setMaterials(materials);
	});

	const radiansX = THREE.MathUtils.degToRad(-90);
	const radiansZ = THREE.MathUtils.degToRad(-90);

	// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
	useFrame(() => {
		if (meshRef.current) {
			meshRef.current.rotation.z += 0.005; // Spinning speed
		}
	});

	return (
		<primitive
			ref={meshRef}
			object={mesh}
			scale={2.5}
			rotation={[radiansX, 0, radiansZ]}
			// @ts-ignore
			// biome-ignore lint/style/noCommaOperator: <explanation>
			position={(0, 0, 0)}
		>
			<ambientLight intensity={2.0} color={'#ffffff'} />
			<pointLight
				position={[0, 10, 0]}
				intensity={2.0}
				color={'#ffffff'}
				distance={100}
				decay={2}
			/>
		</primitive>
	);
};

const ModelRenderingView = (props: PropTypes) => {
	return (
		<Suspense fallback={<Loader2 className="w-1/2 mx-auto my-auto text-white h-1/2 animate-spin" />}>
			<Canvas>
				<Scene {...props} />
				<OrbitControls enableZoom={false} />
				<Environment preset='apartment' background />
			</Canvas>
		</Suspense>
	);
};

export default ModelRenderingView;
