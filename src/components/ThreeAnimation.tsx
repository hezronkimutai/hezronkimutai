import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ThreeAnimationProps {
  section?: 'hero' | 'skills' | 'experience' | 'projects' | 'contact';
}

const ThreeAnimation: React.FC<ThreeAnimationProps> = ({ section = 'hero' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);

    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;

    // Create particle system for background
    const createParticleSystem = () => {
      const particleCount = 1000;
      const particles = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const sizes = new Float32Array(particleCount);

      const colorPalette = [
        new THREE.Color('#8b5cf6'), // Purple
        new THREE.Color('#06b6d4'), // Cyan
        new THREE.Color('#10b981'), // Emerald
        new THREE.Color('#f59e0b'), // Amber
        new THREE.Color('#ef4444'), // Red
      ];

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Position
        positions[i3] = (Math.random() - 0.5) * 200;
        positions[i3 + 1] = (Math.random() - 0.5) * 200;
        positions[i3 + 2] = (Math.random() - 0.5) * 200;

        // Color
        const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;

        // Size
        sizes[i] = Math.random() * 3 + 1;
      }

      particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      const particleMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          pixelRatio: { value: Math.min(window.devicePixelRatio, 2) }
        },
        vertexShader: `
          attribute float size;
          attribute vec3 color;
          varying vec3 vColor;
          uniform float time;
          
          void main() {
            vColor = color;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            
            // Add floating animation
            mvPosition.y += sin(time + position.x * 0.01) * 10.0;
            mvPosition.x += cos(time + position.z * 0.01) * 5.0;
            
            gl_PointSize = size * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          
          void main() {
            float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
            float strength = 0.05 / distanceToCenter - 0.1;
            
            gl_FragColor = vec4(vColor, strength);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        vertexColors: true
      });

      return new THREE.Points(particles, particleMaterial);
    };

    // Create main geometric shapes based on section
    const createMainGeometry = () => {
      const group = new THREE.Group();

      switch (section) {
        case 'hero':
          // DNA Helix representing code structure
          const helixGroup = new THREE.Group();
          for (let i = 0; i < 100; i++) {
            const angle = (i / 100) * Math.PI * 8;
            const y = (i - 50) * 0.5;
            
            // First strand
            const sphere1 = new THREE.Mesh(
              new THREE.SphereGeometry(0.3, 8, 8),
              new THREE.MeshPhongMaterial({ 
                color: '#8b5cf6',
                emissive: '#4c1d95',
                transparent: true,
                opacity: 0.8
              })
            );
            sphere1.position.set(Math.cos(angle) * 3, y, Math.sin(angle) * 3);
            
            // Second strand
            const sphere2 = new THREE.Mesh(
              new THREE.SphereGeometry(0.3, 8, 8),
              new THREE.MeshPhongMaterial({ 
                color: '#06b6d4',
                emissive: '#0e7490',
                transparent: true,
                opacity: 0.8
              })
            );
            sphere2.position.set(Math.cos(angle + Math.PI) * 3, y, Math.sin(angle + Math.PI) * 3);
            
            helixGroup.add(sphere1, sphere2);
            
            // Connect strands
            if (i % 10 === 0) {
              const connector = new THREE.Mesh(
                new THREE.CylinderGeometry(0.05, 0.05, 6),
                new THREE.MeshPhongMaterial({ 
                  color: '#10b981',
                  transparent: true,
                  opacity: 0.6
                })
              );
              connector.position.set(0, y, 0);
              connector.rotation.z = Math.PI / 2;
              helixGroup.add(connector);
            }
          }
          group.add(helixGroup);
          break;

        case 'skills':
          // Interconnected nodes representing tech stack
          const nodeCount = 20;
          const nodes = [];
          for (let i = 0; i < nodeCount; i++) {
            const node = new THREE.Mesh(
              new THREE.IcosahedronGeometry(1, 1),
              new THREE.MeshPhongMaterial({
                color: new THREE.Color().setHSL(i / nodeCount, 0.8, 0.6),
                transparent: true,
                opacity: 0.7
              })
            );
            
            const radius = 15;
            const phi = Math.acos(-1 + (2 * i) / nodeCount);
            const theta = Math.sqrt(nodeCount * Math.PI) * phi;
            
            node.position.setFromSphericalCoords(radius, phi, theta);
            nodes.push(node);
            group.add(node);
          }
          
          // Connect nodes with lines
          for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
              if (nodes[i].position.distanceTo(nodes[j].position) < 12) {
                const geometry = new THREE.BufferGeometry().setFromPoints([
                  nodes[i].position,
                  nodes[j].position
                ]);
                const line = new THREE.Line(
                  geometry,
                  new THREE.LineBasicMaterial({ 
                    color: '#8b5cf6',
                    transparent: true,
                    opacity: 0.3
                  })
                );
                group.add(line);
              }
            }
          }
          break;

        case 'projects':
          // Floating code blocks
          const codeBlocks = [];
          for (let i = 0; i < 15; i++) {
            const block = new THREE.Mesh(
              new THREE.BoxGeometry(
                Math.random() * 3 + 1,
                Math.random() * 2 + 0.5,
                Math.random() * 1 + 0.2
              ),
              new THREE.MeshPhongMaterial({
                color: new THREE.Color().setHSL(Math.random(), 0.7, 0.6),
                transparent: true,
                opacity: 0.8
              })
            );
            
            block.position.set(
              (Math.random() - 0.5) * 30,
              (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 30
            );
            
            block.rotation.set(
              Math.random() * Math.PI,
              Math.random() * Math.PI,
              Math.random() * Math.PI
            );
            
            codeBlocks.push(block);
            group.add(block);
          }
          break;

        default:
          // Default geometric pattern
          const torus = new THREE.Mesh(
            new THREE.TorusKnotGeometry(8, 2, 100, 16),
            new THREE.MeshPhongMaterial({
              color: '#8b5cf6',
              emissive: '#4c1d95',
              wireframe: true,
              transparent: true,
              opacity: 0.7
            })
          );
          group.add(torus);
      }

      return group;
    };

    const particleSystem = createParticleSystem();
    const mainGeometry = createMainGeometry();
    
    scene.add(particleSystem);
    scene.add(mainGeometry);

    // Enhanced lighting system
    const ambientLight = new THREE.AmbientLight('#ffffff', 0.3);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight('#8b5cf6', 1);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const pointLight1 = new THREE.PointLight('#06b6d4', 0.8, 50);
    pointLight1.position.set(-20, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight('#10b981', 0.8, 50);
    pointLight2.position.set(20, -10, -10);
    scene.add(pointLight2);

    // Position camera
    camera.position.set(0, 0, 40);

    // Animation variables
    let time = 0;
    const clock = new THREE.Clock();

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      time = clock.getElapsedTime();
      
      // Update particle system
      if (particleSystem.material.uniforms) {
        particleSystem.material.uniforms.time.value = time;
      }

      // Animate main geometry based on section
      if (section === 'hero') {
        mainGeometry.rotation.y = time * 0.1;
        mainGeometry.children[0].rotation.x = time * 0.05;
      } else if (section === 'skills') {
        mainGeometry.rotation.y = time * 0.05;
        mainGeometry.children.forEach((child, index) => {
          if (child instanceof THREE.Mesh) {
            child.rotation.x = time * 0.1 + index * 0.1;
            child.rotation.y = time * 0.15 + index * 0.05;
          }
        });
      } else if (section === 'projects') {
        mainGeometry.children.forEach((child, index) => {
          if (child instanceof THREE.Mesh) {
            child.rotation.x += 0.01 + index * 0.001;
            child.rotation.y += 0.005 + index * 0.0005;
            child.position.y += Math.sin(time + index) * 0.01;
          }
        });
      } else {
        mainGeometry.rotation.x = time * 0.01;
        mainGeometry.rotation.y = time * 0.02;
      }

      // Mouse interaction
      const targetX = (mousePosition.x - 0.5) * 0.1;
      const targetY = (mousePosition.y - 0.5) * 0.1;
      
      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (-targetY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      // Animate lights
      pointLight1.position.x = Math.sin(time * 0.5) * 20;
      pointLight1.position.z = Math.cos(time * 0.5) * 20;
      
      pointLight2.position.x = Math.cos(time * 0.3) * 25;
      pointLight2.position.z = Math.sin(time * 0.3) * 25;

      renderer.render(scene, camera);
    };

    animate();

    // Mouse move handler
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: event.clientX / window.innerWidth,
        y: event.clientY / window.innerHeight
      });
    };

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [section, mousePosition.x, mousePosition.y]);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: '100%', 
        height: '100%',
        background: 'transparent',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  );
};

export default ThreeAnimation;