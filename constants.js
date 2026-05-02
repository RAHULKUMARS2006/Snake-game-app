// src/hooks/useGameLoop.js
// ============================================================
// Core game loop: manages state, tick timing, and input queue
// ============================================================

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  DIRECTION,
  OPPOSITE,
  GAME_STATE,
  INITIAL_SPEED,
  SPEED_INCREMENT,
  SPEED_INCREASE_EVERY,
  MIN_SPEED,
  SCORE_PER_FOOD,
} from '../utils/constants';
import { createInitialSnake, generateFood, moveSnake } from '../utils/gameLogic';

const useGameLoop = ({ onEat, onDie, updateHighScore }) => {
  // ── State ──────────────────────────────────────────────────
  const [gameState, setGameState] = useState(GAME_STATE.SPLASH);
  const [snake, setSnake]         = useState(createInitialSnake);
  const [food, setFood]           = useState({ row: 5, col: 5 });
  const [direction, setDirection] = useState(DIRECTION.RIGHT);
  const [score, setScore]         = useState(0);
  const [speed, setSpeed]         = useState(INITIAL_SPEED);

  // ── Refs (avoid stale closures inside setInterval) ─────────
  const snakeRef    = useRef(snake);
  const foodRef     = useRef(food);
  const dirRef      = useRef(direction);
  const scoreRef    = useRef(score);
  const speedRef    = useRef(speed);
  const gameStateRef = useRef(gameState);
  const pendingDir  = useRef(null); // queued direction change

  // Keep refs in sync with state
  useEffect(() => { snakeRef.current    = snake;     }, [snake]);
  useEffect(() => { foodRef.current     = food;      }, [food]);
  useEffect(() => { dirRef.current      = direction; }, [direction]);
  useEffect(() => { scoreRef.current    = score;     }, [score]);
  useEffect(() => { speedRef.current    = speed;     }, [speed]);
  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);

  // ── Direction input ────────────────────────────────────────
  const changeDirection = useCallback((newDir) => {
    if (gameStateRef.current !== GAME_STATE.RUNNING) return;
    // Prevent reversing into yourself
    if (OPPOSITE[newDir] === dirRef.current) return;
    pendingDir.current = newDir;
  }, []);

  // ── Game tick ──────────────────────────────────────────────
  const tick = useCallback(() => {
    // Consume queued direction
    const currentDir = pendingDir.current ?? dirRef.current;
    pendingDir.current = null;

    if (currentDir !== dirRef.current) {
      dirRef.current = currentDir;
      setDirection(currentDir);
    }

    const { snake: newSnake, ate, dead } = moveSnake(
      snakeRef.current,
      currentDir,
      foodRef.current,
    );

    if (dead) {
      // Trigger haptic / sound callbacks
      onDie?.();
      updateHighScore?.(scoreRef.current);
      setGameState(GAME_STATE.GAME_OVER);
      return;
    }

    setSnake(newSnake);

    if (ate) {
      onEat?.();
      const newFood = generateFood(newSnake);
      setFood(newFood);

      const newScore = scoreRef.current + SCORE_PER_FOOD;
      setScore(newScore);

      // Increase speed every N food items
      const foodEaten = Math.floor(newScore / SCORE_PER_FOOD);
      if (foodEaten % SPEED_INCREASE_EVERY === 0) {
        const newSpeed = Math.max(MIN_SPEED, speedRef.current - SPEED_INCREMENT);
        setSpeed(newSpeed);
      }
    }
  }, [onEat, onDie, updateHighScore]);

  // ── Interval management ────────────────────────────────────
  const intervalRef = useRef(null);

  const startInterval = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(tick, speedRef.current);
  }, [tick]);

  // Restart interval when speed changes (while running)
  useEffect(() => {
    if (gameState === GAME_STATE.RUNNING) {
      startInterval();
    }
    return () => clearInterval(intervalRef.current);
  }, [speed, gameState, startInterval]);

  // ── Public controls ────────────────────────────────────────
  const startGame = useCallback(() => {
    const initial = createInitialSnake();
    const initialFood = generateFood(initial);
    setSnake(initial);
    setFood(initialFood);
    setDirection(DIRECTION.RIGHT);
    setScore(0);
    setSpeed(INITIAL_SPEED);
    pendingDir.current = null;
    setGameState(GAME_STATE.RUNNING);
  }, []);

  const pauseGame = useCallback(() => {
    if (gameStateRef.current === GAME_STATE.RUNNING) {
      clearInterval(intervalRef.current);
      setGameState(GAME_STATE.PAUSED);
    }
  }, []);

  const resumeGame = useCallback(() => {
    if (gameStateRef.current === GAME_STATE.PAUSED) {
      setGameState(GAME_STATE.RUNNING);
    }
  }, []);

  const restartGame = useCallback(() => {
    clearInterval(intervalRef.current);
    startGame();
  }, [startGame]);

  return {
    gameState,
    snake,
    food,
    direction,
    score,
    speed,
    changeDirection,
    startGame,
    pauseGame,
    resumeGame,
    restartGame,
  };
};

export default useGameLoop;
