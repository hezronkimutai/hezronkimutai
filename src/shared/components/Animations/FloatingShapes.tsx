import React, { useEffect, useState } from 'react';

interface Shape {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  speed: number;
  type: 'circle' | 'square' | 'triangle' | 'hexagon';
  color: string;
  opacity: number;
}

const FloatingShapes: React.FC = () => {
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Initialize shapes
    const initialShapes: Shape[] = [];
    const shapeTypes: Array<'circle' | 'square' | 'triangle' | 'hexagon'> = ['circle', 'square', 'triangle', 'hexagon'];
    const colors = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];

    for (let i = 0; i < 15; i++) {
      initialShapes.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 60 + 20,
        rotation: Math.random() * 360,
        speed: Math.random() * 0.5 + 0.1,
        type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.15 + 0.05
      });
    }

    setShapes(initialShapes);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getShapeElement = (shape: Shape) => {
    const transform = `translate(${shape.x + Math.sin(scrollY * 0.001 + shape.id) * 20}px, ${shape.y + Math.cos(scrollY * 0.001 + shape.id) * 15}px) rotate(${shape.rotation + scrollY * shape.speed}deg)`;
    
    const baseStyle = {
      position: 'absolute' as const,
      width: `${shape.size}px`,
      height: `${shape.size}px`,
      transform,
      opacity: shape.opacity,
      transition: 'all 0.3s ease-out',
      pointerEvents: 'none' as const,
    };

    switch (shape.type) {
      case 'circle':
        return (
          <div
            key={shape.id}
            style={{
              ...baseStyle,
              borderRadius: '50%',
              background: `linear-gradient(45deg, ${shape.color}, ${shape.color}80)`,
              boxShadow: `0 0 20px ${shape.color}40`,
            }}
          />
        );
      
      case 'square':
        return (
          <div
            key={shape.id}
            style={{
              ...baseStyle,
              background: `linear-gradient(45deg, ${shape.color}, ${shape.color}80)`,
              boxShadow: `0 0 20px ${shape.color}40`,
              borderRadius: '8px',
            }}
          />
        );
      
      case 'triangle':
        return (
          <div
            key={shape.id}
            style={{
              ...baseStyle,
              width: 0,
              height: 0,
              borderLeft: `${shape.size / 2}px solid transparent`,
              borderRight: `${shape.size / 2}px solid transparent`,
              borderBottom: `${shape.size}px solid ${shape.color}`,
              filter: `drop-shadow(0 0 10px ${shape.color}40)`,
            }}
          />
        );
      
      case 'hexagon':
        return (
          <div
            key={shape.id}
            style={{
              ...baseStyle,
              background: `linear-gradient(45deg, ${shape.color}, ${shape.color}80)`,
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              filter: `drop-shadow(0 0 15px ${shape.color}40)`,
            }}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 2 }}>
      {shapes.map(shape => getShapeElement(shape))}
      
      {/* Additional animated elements */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-ping" />
      <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-blue-400 rounded-full animate-pulse" />
      <div className="absolute top-1/2 left-1/6 w-3 h-3 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
      
      {/* Floating code symbols */}
      <div className="absolute top-1/3 right-1/4 text-purple-400/20 text-2xl font-mono animate-float">{'{ }'}</div>
      <div className="absolute bottom-1/3 left-1/3 text-blue-400/20 text-xl font-mono animate-float" style={{ animationDelay: '1s' }}>{'< />'}</div>
      <div className="absolute top-2/3 right-1/6 text-green-400/20 text-lg font-mono animate-float" style={{ animationDelay: '2s' }}>{'( )'}</div>
      <div className="absolute top-1/6 left-2/3 text-yellow-400/20 text-xl font-mono animate-float" style={{ animationDelay: '3s' }}>{'[ ]'}</div>
    </div>
  );
};

export default FloatingShapes;