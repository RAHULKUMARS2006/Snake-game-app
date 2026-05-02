// src/hooks/useHighScore.js
// ============================================================
// Persists the high score to AsyncStorage
// ============================================================

import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HIGH_SCORE_KEY } from '../utils/constants';

const useHighScore = () => {
  const [highScore, setHighScore] = useState(0);

  // Load saved high score on mount
  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(HIGH_SCORE_KEY);
        if (saved !== null) {
          setHighScore(parseInt(saved, 10));
        }
      } catch (e) {
        console.warn('Failed to load high score:', e);
      }
    })();
  }, []);

  // Save a new high score if it beats the current one
  const updateHighScore = useCallback(async (score) => {
    if (score > highScore) {
      setHighScore(score);
      try {
        await AsyncStorage.setItem(HIGH_SCORE_KEY, String(score));
      } catch (e) {
        console.warn('Failed to save high score:', e);
      }
    }
  }, [highScore]);

  return { highScore, updateHighScore };
};

export default useHighScore;
