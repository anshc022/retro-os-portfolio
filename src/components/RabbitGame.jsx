import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import rabbitImg from "../assets/game/game-bunny.png"; // add your rabbit image
import starImg from "../assets/game/game-carrot.png";     // add your star image

const COLS = 4;
const COL_WIDTH = 80;
const GAME_WIDTH = COLS * COL_WIDTH;

export default function RabbitGame() {
  const [rabbitCol, setRabbitCol] = useState(1); // start at 2nd column
  const [stars, setStars] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const gameRef = useRef(null);

  // Handle arrow key movement
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameOver) return;
      if (e.key === "ArrowLeft") {
        setRabbitCol((prev) => Math.max(0, prev - 1));
      } else if (e.key === "ArrowRight") {
        setRabbitCol((prev) => Math.min(COLS - 1, prev + 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameOver]);

  // Drop stars periodically
  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      const newStar = {
        id: Date.now(),
        col: Math.floor(Math.random() * COLS),
        y: 0,
      };
      setStars((prev) => [...prev, newStar]);
    }, 1000);

    return () => clearInterval(interval);
  }, [gameOver]);

  // Animate stars
  useEffect(() => {
    if (gameOver) return;

    const gravity = setInterval(() => {
      setStars((prevStars) => {
        return prevStars.map((star) => ({ ...star, y: star.y + 20 }));
      });
    }, 300);

    return () => clearInterval(gravity);
  }, [gameOver]);

  // Check collision
  useEffect(() => {
    setStars((prev) => {
      return prev.filter((star) => {
        if (star.y >= 400) {
          if (star.col === rabbitCol) {
            setScore((s) => s + 1);
            return false;
          } else {
            setGameOver(true);
            return false;
          }
        }
        return true;
      });
    });
  }, [stars, rabbitCol]);

  return (
    <div
      ref={gameRef}
      className="w-full max-w-[350px] h-[500px] mx-auto relative border-2 border-gray-500 bg-black overflow-hidden"
    >
      <div className="absolute top-2 right-4 text-white text-xl font-bold z-50">
        Score: {score}
      </div>

      {/* Stars */}
      {stars.map((star) => (
        <motion.img
          key={star.id}
          src={starImg}
          alt="star"
          className="absolute w-8 h-8"
          style={{
            left: `${star.col * COL_WIDTH + COL_WIDTH / 2 - 16}px`,
            top: `${star.y}px`,
          }}
        />
      ))}

      {/* Rabbit */}
      <motion.img
        src={rabbitImg}
        alt="rabbit"
        className="absolute w-14 bottom-2 transition-all duration-200"
        style={{
          left: `${rabbitCol * COL_WIDTH + COL_WIDTH / 2 - 28}px`,
        }}
      />

      {/* Game Over Message */}
      {gameOver && (
        <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center text-white text-2xl font-bold">
          <p>Game Over!</p>
          {/* <p className="text-sm mt-2">Refresh to restart</p> */}
        </div>
      )}
    </div>
  );
}
