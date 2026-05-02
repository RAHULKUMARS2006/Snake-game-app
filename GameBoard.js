// src/components/ScoreBoard.js
// ============================================================
// Displays current score, high score, and game speed level
// ============================================================

import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, INITIAL_SPEED, MIN_SPEED } from '../utils/constants';

const ScoreBoard = ({ score, highScore, speed }) => {
  // Compute a visual "level" from speed
  const maxLevels = Math.ceil((INITIAL_SPEED - MIN_SPEED) / 5);
  const currentLevel = Math.ceil((INITIAL_SPEED - speed) / 5) + 1;

  return (
    <View style={styles.container}>
      {/* Current score */}
      <View style={styles.block}>
        <Text style={styles.label}>SCORE</Text>
        <Text style={styles.value}>{score}</Text>
      </View>

      {/* Level indicator */}
      <View style={styles.block}>
        <Text style={styles.label}>LEVEL</Text>
        <Text style={[styles.value, styles.levelValue]}>{currentLevel}</Text>
      </View>

      {/* High score */}
      <View style={styles.block}>
        <Text style={styles.label}>BEST</Text>
        <Text style={[styles.value, styles.bestValue]}>{highScore}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.SCORE_BG,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.BTN_BORDER,
    width: '100%',
  },
  block: {
    alignItems: 'center',
    flex: 1,
  },
  label: {
    color: COLORS.TEXT_DIM,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 2,
    fontFamily: 'monospace',
  },
  value: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: 22,
    fontWeight: '800',
    fontFamily: 'monospace',
  },
  levelValue: {
    color: '#00BFFF',
  },
  bestValue: {
    color: COLORS.TEXT_ACCENT,
  },
});

export default memo(ScoreBoard);
