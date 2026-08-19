import { useState } from "react";

// Assuming you have these components defined and imported correctly
import HomeScreen from "./HomeScreen/HomeScreen";
import GameScreen from "./GameScreen/GameScreen";
import { Route, Routes } from "react-router-dom";
import ManualScreen from "./ManualScreen/ManualScreen";
import BlankScreen from "./BlankScreen";

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
      <Route path="/manual" element={<ManualScreen />} />
      <Route path="/blank" element={<BlankScreen/>} />
      <Route path="*" element={<HomeScreen onStart={startGame} />} />
    </Routes>
  );
};

export default MainPage;