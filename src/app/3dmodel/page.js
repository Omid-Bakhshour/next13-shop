"use client";

import { useEffect, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

function page() {
  const containerRef = useRef();
  const modelPath = "/images/shiba.glb";

  useEffect(() => {
    const container = containerRef.current;

    // Create a scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    // Create a camera
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Create a renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Load the 3D model
    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      (gltf) => {
        const model = gltf.scene;
        scene.add(model);
      },
      undefined,
      (error) => {
        console.error("Error loading 3D model:", error);
      }
    );

    const controls = new OrbitControls(camera, renderer.domElement);

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);

      // required if controls.enableDamping or controls.autoRotate are set to true
      controls.update();

      renderer.render(scene, camera);
    }
    animate();

    return () => {
      // Clean up resources
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);
  return (
    <div className="min-h-[2000px] flex w-full justify-center">
      <div className=" w-[500px] h-[500px] block p-3 border border-gray-400 shadow-lg rounded-lg mt-6 ">
        <div ref={containerRef} className=" relative w-full h-full   " />
      </div>
    </div>
  );
}

export default page;
