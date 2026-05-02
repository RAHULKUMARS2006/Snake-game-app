// App.js
// ============================================================
// Root component: manages splash → game navigation
// ============================================================

import React, { useState, useCallback } from 'react';
import { StatusBar } from 'react-native';
import SplashScreen from './src/screens/SplashScreen';
import GameScreen   from './src/screens/GameScreen';
import { COLORS }   from './src/utils/constants';

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  const handleStart = useCallback(() => {
    setShowSplash(false);
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.BG} />
      {showSplash ? (
        <SplashScreen onStart={handleStart} />
      ) : (
        <GameScreen />
      )}
    </>
  );
};

export default App;
