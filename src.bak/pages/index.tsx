import { useState } from "react";

// Assuming you have these components defined and imported correctly
import HomeScreen from "./HomeScreen";
import GameScreen from "./GameScreen";
import ResultScreen from "./ResultScreen";
import { Route, Routes } from "react-router-dom";

const MainPage = () => {
  const [gameState, setGameState] = useState<'home' | 'playing' | 'result'>('home');
  const [result, setResult] = useState<'win' | 'lose' | null>(null);

  const startGame = () => setGameState('playing');

  const endGame = (outcome: 'win' | 'lose') => {
    setResult(outcome);
    setGameState('result');
  };

  return (
    <Routes> 
      <Route path="/" element={<HomeScreen onStart={startGame} />} />
      <Route path="/game" element={<GameScreen onEnd={endGame} />} /> 
      <Route path="/result" element={result && <ResultScreen result={result} onRestart={() => setGameState('home')} />} /> 
    </Routes>
  );
};

export default MainPage;
