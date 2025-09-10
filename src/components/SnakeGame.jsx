import { useEffect, useRef, useState, useCallback } from "react";

const GRID_SIZE = 20;
const CANVAS_SIZE = 400;
const INITIAL_SNAKE = [{ x: 200, y: 200 }];
const INITIAL_FOOD = { x: 100, y: 100 };

export default function SnakeGame() {
  const canvasRef = useRef(null);
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [direction, setDirection] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const generateFood = useCallback(() => {
    const x = Math.floor(Math.random() * (CANVAS_SIZE / GRID_SIZE)) * GRID_SIZE;
    const y = Math.floor(Math.random() * (CANVAS_SIZE / GRID_SIZE)) * GRID_SIZE;
    return { x, y };
  }, []);

  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setFood(generateFood());
    setDirection({ x: 0, y: 0 });
    setScore(0);
    setGameOver(false);
    setGameStarted(false);
  }, [generateFood]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!gameStarted && !gameOver) {
        setGameStarted(true);
        setDirection({ x: GRID_SIZE, y: 0 });
        return;
      }

      if (gameOver && e.key === " ") {
        resetGame();
        return;
      }

      switch (e.key) {
        case "ArrowUp":
          if (direction.y === 0) setDirection({ x: 0, y: -GRID_SIZE });
          break;
        case "ArrowDown":
          if (direction.y === 0) setDirection({ x: 0, y: GRID_SIZE });
          break;
        case "ArrowLeft":
          if (direction.x === 0) setDirection({ x: -GRID_SIZE, y: 0 });
          break;
        case "ArrowRight":
          if (direction.x === 0) setDirection({ x: GRID_SIZE, y: 0 });
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [direction, gameStarted, gameOver, resetGame]);

  // Game loop
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const gameLoop = setInterval(() => {
      setSnake((currentSnake) => {
        const newSnake = [...currentSnake];
        const head = { ...newSnake[0] };
        head.x += direction.x;
        head.y += direction.y;

        // Check wall collision
        if (head.x < 0 || head.x >= CANVAS_SIZE || head.y < 0 || head.y >= CANVAS_SIZE) {
          setGameOver(true);
          return currentSnake;
        }

        // Check self collision
        if (newSnake.some((segment) => segment.x === head.x && segment.y === head.y)) {
          setGameOver(true);
          return currentSnake;
        }

        newSnake.unshift(head);

        // Check food collision
        if (head.x === food.x && head.y === food.y) {
          setScore((prev) => prev + 10);
          setFood(generateFood());
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 150);

    return () => clearInterval(gameLoop);
  }, [direction, food, gameStarted, gameOver, generateFood]);

  // Draw game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Draw snake
    ctx.fillStyle = "#0f0";
    snake.forEach((segment) => {
      ctx.fillRect(segment.x, segment.y, GRID_SIZE - 2, GRID_SIZE - 2);
    });

    // Draw food
    ctx.fillStyle = "#f00";
    ctx.fillRect(food.x, food.y, GRID_SIZE - 2, GRID_SIZE - 2);
  }, [snake, food]);

  return (
    <div className="flex flex-col items-center p-4 bg-gray-900 text-white rounded-lg">
      <div className="mb-4 text-xl font-bold">Score: {score}</div>
      
      <canvas
        ref={canvasRef}
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        className="border-2 border-gray-600 bg-black"
      />
      
      <div className="mt-4 text-center">
        {!gameStarted && !gameOver && (
          <p className="text-sm text-gray-300">Press any arrow key to start!</p>
        )}
        {gameStarted && !gameOver && (
          <p className="text-sm text-gray-300">Use arrow keys to move</p>
        )}
        {gameOver && (
          <div>
            <p className="text-lg font-bold text-red-400">Game Over!</p>
            <p className="text-sm text-gray-300">Press SPACE to restart</p>
          </div>
        )}
      </div>
    </div>
  );
}
