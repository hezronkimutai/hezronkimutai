# Chess Animation Component

## Overview
The ChessAnimation component creates an interactive 3D chess board background with animated pieces that make realistic chess moves. This replaces the previous abstract geometric animation with a more engaging and thematic 3D scene.

## Features

### 🏁 **Chess Board**
- 8x8 checkerboard pattern with traditional colors
- Semi-transparent squares for subtle background effect
- Proper scale and perspective

### ♟️ **Chess Pieces**
- **All 6 piece types**: King, Queen, Rook, Bishop, Knight, Pawn
- **Both colors**: White and Black pieces
- **Proper positioning**: Standard chess starting positions
- **Unique geometries**: Each piece type has distinct 3D shape
  - King: Large cone (tallest piece)
  - Queen: Medium cone
  - Rook: Rectangular tower
  - Bishop: Pointed cone
  - Knight: Rectangular (simplified horse shape)
  - Pawn: Sphere (smallest piece)

### 🎬 **Animation System**
- **Automatic moves**: Pieces automatically make moves every 2-4 seconds
- **Realistic movement patterns**: Each piece follows its chess movement rules
  - Pawns move forward
  - Rooks move horizontally/vertically
  - Bishops move diagonally
  - Knights make L-shaped moves
  - King/Queen move in multiple directions
- **Smooth interpolation**: Pieces glide smoothly between positions
- **Arc movement**: Pieces follow an arc path during moves (not just linear)
- **Rotation effects**: Pieces rotate during movement for visual appeal
- **Idle animation**: Subtle floating and rotation when not moving

### 🎨 **Visual Effects**
- **Proper lighting**: Ambient, directional, and point lights
- **Shadows**: Pieces cast shadows on the board
- **Material effects**: Semi-transparent pieces with emissive properties
- **Mouse interaction**: Camera follows mouse movement subtly
- **Dynamic lighting**: Colored point lights that move around the scene

### 🎯 **Performance Optimizations**
- **Efficient geometry**: Simple but recognizable piece shapes
- **Smart animation**: Only animates pieces that are moving
- **Proper cleanup**: Disposes of resources when component unmounts
- **Responsive**: Adapts to window resizing

## Technical Implementation

### Component Structure
```typescript
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
```

### Key Functions
- `createChessBoard()`: Creates the 8x8 board with alternating square colors
- `createPieceGeometry()`: Returns appropriate 3D geometry for each piece type
- `createChessPieces()`: Sets up all 32 pieces in starting positions
- `initiateRandomMove()`: Triggers a random piece to make a chess-appropriate move

### Animation Loop
1. **Movement Selection**: Randomly selects a piece that's not currently moving
2. **Move Generation**: Calculates a valid move based on piece type and current position
3. **Smooth Animation**: Uses easing functions for natural movement
4. **Arc Trajectory**: Pieces follow a curved path during moves
5. **Completion Handling**: Updates piece position and resets animation state

## Integration

The component integrates with the existing `StrategicBackground` component and responds to section changes, though the chess animation remains consistent across all sections for thematic coherence.

## Usage

```tsx
import ChessAnimation from './ChessAnimation';

<ChessAnimation section={currentSection} />
```

The animation automatically starts and requires no additional configuration. It runs continuously in the background, creating an engaging and sophisticated visual experience that reinforces themes of strategy, planning, and intelligent problem-solving - perfect for a software developer's portfolio.

## Performance Notes

- Uses WebGL acceleration through Three.js
- Optimized for smooth 60fps animation
- Gracefully handles WebGL context failures in test environments
- Memory efficient with proper resource disposal
- Responsive to different screen sizes and device pixel ratios
