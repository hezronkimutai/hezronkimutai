import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ThreeAnimationProps {
  section?: 'hero' | 'skills' | 'experience' | 'projects' | 'contact';
}

interface ChessPiece {
  mesh: THREE.Mesh;
  type: 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn';
  color: 'white' | 'black';
  startPosition: THREE.Vector3;
  targetPosition: THREE.Vector3;
  animationProgress: number;
  animationSpeed: number;
  isMoving: boolean;
}

const ThreeAnimation: React.FC<ThreeAnimationProps> = ({ section = 'hero' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const chessPiecesRef = useRef<ChessPiece[]>([]);

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

    // Create chess board
    const createChessBoard = () => {
      const boardGroup = new THREE.Group();
      const boardSize = 40;
      const squareSize = boardSize / 8;

      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
          const isWhite = (row + col) % 2 === 0;
          const squareGeometry = new THREE.BoxGeometry(squareSize, 0.2, squareSize);
          const squareMaterial = new THREE.MeshPhongMaterial({
            color: isWhite ? '#f0d9b5' : '#b58863',
            transparent: true,
            opacity: 0.3
          });
          
          const square = new THREE.Mesh(squareGeometry, squareMaterial);
          square.position.set(
            (col - 3.5) * squareSize,
            -0.1,
            (row - 3.5) * squareSize
          );
          square.receiveShadow = true;
          boardGroup.add(square);
        }
      }

      return boardGroup;
    };

    // Create chess piece geometries
    const createPieceGeometry = (type: string): THREE.BufferGeometry => {
      switch (type) {
        case 'king':
          return new THREE.ConeGeometry(1.2, 3, 8);
        case 'queen':
          return new THREE.ConeGeometry(1, 2.8, 8);
        case 'rook':
          return new THREE.BoxGeometry(1.5, 2.5, 1.5);
        case 'bishop':
          return new THREE.ConeGeometry(0.8, 2.5, 6);
        case 'knight':
          return new THREE.BoxGeometry(1, 2, 1.2);
        case 'pawn':
          return new THREE.SphereGeometry(0.6, 8, 8);
        default:
          return new THREE.SphereGeometry(0.5, 8, 8);
      }
    };

    // Create chess pieces
    const createChessPieces = (): ChessPiece[] => {
      const pieces: ChessPiece[] = [];
      const boardSize = 40;
      const squareSize = boardSize / 8;
      
      const pieceTypes = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
      
      // Create pieces for both colors
      ['white', 'black'].forEach((color, colorIndex) => {
        const baseRow = colorIndex === 0 ? 0 : 7;
        const pawnRow = colorIndex === 0 ? 1 : 6;
        
        // Create back row pieces
        pieceTypes.forEach((type, col) => {
          const geometry = createPieceGeometry(type);
          const material = new THREE.MeshPhongMaterial({
            color: color === 'white' ? '#ffffff' : '#333333',
            emissive: color === 'white' ? '#111111' : '#000000',
            transparent: true,
            opacity: 0.8
          });
          
          const mesh = new THREE.Mesh(geometry, material);
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          
          const startPos = new THREE.Vector3(
            (col - 3.5) * squareSize,
            1.5,
            (baseRow - 3.5) * squareSize
          );
          
          mesh.position.copy(startPos);
          scene.add(mesh);
          
          pieces.push({
            mesh,
            type: type as ChessPiece['type'],
            color: color as ChessPiece['color'],
            startPosition: startPos.clone(),
            targetPosition: startPos.clone(),
            animationProgress: 0,
            animationSpeed: 0.02 + Math.random() * 0.01,
            isMoving: false
          });
        });
        
        // Create pawns
        for (let col = 0; col < 8; col++) {
          const geometry = createPieceGeometry('pawn');
          const material = new THREE.MeshPhongMaterial({
            color: color === 'white' ? '#ffffff' : '#333333',
            emissive: color === 'white' ? '#111111' : '#000000',
            transparent: true,
            opacity: 0.8
          });
          
          const mesh = new THREE.Mesh(geometry, material);
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          
          const startPos = new THREE.Vector3(
            (col - 3.5) * squareSize,
            1.5,
            (pawnRow - 3.5) * squareSize
          );
          
          mesh.position.copy(startPos);
          scene.add(mesh);
          
          pieces.push({
            mesh,
            type: 'pawn',
            color: color as ChessPiece['color'],
            startPosition: startPos.clone(),
            targetPosition: startPos.clone(),
            animationProgress: 0,
            animationSpeed: 0.02 + Math.random() * 0.01,
            isMoving: false
          });
        }
      });
      
      return pieces;
    };

    // Function to initiate a random piece move
    const initiateRandomMove = (pieces: ChessPiece[]) => {
      const availablePieces = pieces.filter(piece => !piece.isMoving);
      if (availablePieces.length === 0) return;
      
      const randomPiece = availablePieces[Math.floor(Math.random() * availablePieces.length)];
      const boardSize = 40;
      const squareSize = boardSize / 8;
      
      // Generate a random valid-looking chess move
      const currentCol = Math.round((randomPiece.mesh.position.x + 3.5 * squareSize) / squareSize);
      const currentRow = Math.round((randomPiece.mesh.position.z + 3.5 * squareSize) / squareSize);
      
      let newCol = currentCol;
      let newRow = currentRow;
      
      // Generate move based on piece type
      switch (randomPiece.type) {
        case 'pawn':
          newRow += randomPiece.color === 'white' ? 1 : -1;
          break;
        case 'rook':
          if (Math.random() > 0.5) {
            newCol += Math.floor(Math.random() * 4) - 2;
          } else {
            newRow += Math.floor(Math.random() * 4) - 2;
          }
          break;
        case 'bishop':
          const diagonal = Math.floor(Math.random() * 3) + 1;
          newCol += Math.random() > 0.5 ? diagonal : -diagonal;
          newRow += Math.random() > 0.5 ? diagonal : -diagonal;
          break;
        case 'knight':
          const knightMoves = [[2,1], [2,-1], [-2,1], [-2,-1], [1,2], [1,-2], [-1,2], [-1,-2]];
          const move = knightMoves[Math.floor(Math.random() * knightMoves.length)];
          newCol += move[0];
          newRow += move[1];
          break;
        default:
          newCol += Math.floor(Math.random() * 3) - 1;
          newRow += Math.floor(Math.random() * 3) - 1;
      }
      
      // Ensure the move is within board bounds
      newCol = Math.max(0, Math.min(7, newCol));
      newRow = Math.max(0, Math.min(7, newRow));
      
      // Set target position
      randomPiece.targetPosition.set(
        (newCol - 3.5) * squareSize,
        1.5,
        (newRow - 3.5) * squareSize
      );
      
      randomPiece.isMoving = true;
      randomPiece.animationProgress = 0;
    };

    const chessBoard = createChessBoard();
    const chessPieces = createChessPieces();
    chessPiecesRef.current = chessPieces;
    
    scene.add(chessBoard);

    // Enhanced lighting system
    const ambientLight = new THREE.AmbientLight('#ffffff', 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight('#ffffff', 0.8);
    directionalLight.position.set(20, 30, 20);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const pointLight1 = new THREE.PointLight('#8b5cf6', 0.6, 100);
    pointLight1.position.set(-30, 20, 30);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight('#06b6d4', 0.6, 100);
    pointLight2.position.set(30, 20, -30);
    scene.add(pointLight2);

    // Position camera
    camera.position.set(30, 25, 30);
    camera.lookAt(0, 0, 0);

    // Animation variables
    let time = 0;
    const clock = new THREE.Clock();
    let lastMoveTime = 0;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      time = clock.getElapsedTime();
      
      // Initiate random moves every 2-4 seconds
      if (time - lastMoveTime > 2 + Math.random() * 2) {
        initiateRandomMove(chessPiecesRef.current);
        lastMoveTime = time;
      }
      
      // Animate chess pieces
      chessPiecesRef.current.forEach(piece => {
        if (piece.isMoving) {
          piece.animationProgress += piece.animationSpeed;
          
          if (piece.animationProgress >= 1) {
            // Move completed
            piece.mesh.position.copy(piece.targetPosition);
            piece.startPosition.copy(piece.targetPosition);
            piece.isMoving = false;
            piece.animationProgress = 0;
          } else {
            // Smooth interpolation with easing
            const t = piece.animationProgress;
            const easedT = t * t * (3.0 - 2.0 * t); // Smoothstep easing
            
            // Add arc to the movement
            const currentPos = piece.startPosition.clone().lerp(piece.targetPosition, easedT);
            currentPos.y += Math.sin(easedT * Math.PI) * 3; // Arc height
            
            piece.mesh.position.copy(currentPos);
            
            // Add rotation during movement
            piece.mesh.rotation.y = easedT * Math.PI * 2;
          }
        }
        
        // Subtle idle animation
        if (!piece.isMoving) {
          piece.mesh.position.y = piece.startPosition.y + Math.sin(time * 2 + piece.mesh.id) * 0.1;
          piece.mesh.rotation.y = Math.sin(time * 0.5 + piece.mesh.id) * 0.1;
        }
      });

      // Rotate the entire board slowly
      chessBoard.rotation.y = Math.sin(time * 0.1) * 0.1;

      // Mouse interaction
      const targetX = (mousePosition.x - 0.5) * 10;
      const targetY = (mousePosition.y - 0.5) * 10;
      
      camera.position.x += (30 + targetX - camera.position.x) * 0.05;
      camera.position.y += (25 + targetY - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      // Animate lights
      pointLight1.position.x = Math.sin(time * 0.3) * 40;
      pointLight1.position.z = Math.cos(time * 0.3) * 40;
      
      pointLight2.position.x = Math.cos(time * 0.4) * 35;
      pointLight2.position.z = Math.sin(time * 0.4) * 35;

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
      
      // Dispose of geometries and materials
      chessPiecesRef.current.forEach(piece => {
        piece.mesh.geometry.dispose();
        (piece.mesh.material as THREE.Material).dispose();
      });
      
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
