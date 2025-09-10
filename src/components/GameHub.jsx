import { useState } from "react";
import RabbitGame from "./RabbitGame";
import SnakeGame from "./SnakeGame";

export default function GameHub() {
  const [selectedGame, setSelectedGame] = useState(null);

  if (selectedGame === "rabbit") {
    return (
      <div className="p-4">
        <button
          onClick={() => setSelectedGame(null)}
          className="mb-4 px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          ← Back to Games
        </button>
        <RabbitGame />
      </div>
    );
  }

  if (selectedGame === "snake") {
    return (
      <div className="p-4">
        <button
          onClick={() => setSelectedGame(null)}
          className="mb-4 px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          ← Back to Games
        </button>
        <SnakeGame />
      </div>
    );
  }

  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">🎮 Game Arcade</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
        <div
          onClick={() => setSelectedGame("rabbit")}
          className="p-4 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-all"
        >
          <div className="text-4xl mb-2">🐰</div>
          <h3 className="font-bold text-gray-700">Rabbit Catch</h3>
          <p className="text-sm text-gray-600 mt-1">Catch falling carrots!</p>
        </div>
        
        <div
          onClick={() => setSelectedGame("snake")}
          className="p-4 border-2 border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 cursor-pointer transition-all"
        >
          <div className="text-4xl mb-2">🐍</div>
          <h3 className="font-bold text-gray-700">Snake Game</h3>
          <p className="text-sm text-gray-600 mt-1">Classic snake gameplay!</p>
        </div>
      </div>
      
      <div className="mt-6 text-sm text-gray-500">
        Select a game to play
      </div>
    </div>
  );
}
