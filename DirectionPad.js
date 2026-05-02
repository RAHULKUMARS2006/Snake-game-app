// src/components/GameOverOverlay.js
// ============================================================
// Semi-transparent overlay shown when the snake dies
// ============================================================

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { COLORS } from '../utils/constants';

const GameOverOverlay = ({ score, highScore, onRestart, isNewHigh }) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale   = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 350, useNativeDriver: true }),
      Animated.spring(scale,   { toValue: 1, friction: 5,  useNativeDriver: true }),
    ]).start();
  }, [opacity, scale]);

  return (
    <Animated.View style={[styles.overlay, { opacity }]}>
      <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
        {/* Skull icon */}
        <Text style={styles.icon}>💀</Text>

        <Text style={styles.title}>GAME OVER</Text>

        {/* New high score badge */}
        {isNewHigh && (
          <View style={styles.newHighBadge}>
            <Text style={styles.newHighText}>✨ NEW HIGH SCORE ✨</Text>
          </View>
        )}

        {/* Score row */}
        <View style={styles.scoreRow}>
          <View style={styles.scoreBlock}>
            <Text style={styles.scoreLabel}>SCORE</Text>
            <Text style={styles.scoreValue}>{score}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.scoreBlock}>
            <Text style={styles.scoreLabel}>BEST</Text>
            <Text style={[styles.scoreValue, { color: COLORS.TEXT_ACCENT }]}>{highScore}</Text>
          </View>
        </View>

        {/* Restart button */}
        <TouchableOpacity style={styles.restartBtn} onPress={onRestart} activeOpacity={0.75}>
          <Text style={styles.restartText}>↺  PLAY AGAIN</Text>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.OVERLAY_BG,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  card: {
    backgroundColor: '#0F0F20',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: COLORS.BTN_BORDER,
    paddingVertical: 32,
    paddingHorizontal: 40,
    alignItems: 'center',
    width: '82%',
    shadowColor: COLORS.FOOD,
    shadowOpacity: 0.3,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
    elevation: 12,
  },
  icon: {
    fontSize: 48,
    marginBottom: 8,
  },
  title: {
    color: COLORS.FOOD,
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: 6,
    fontFamily: 'monospace',
    marginBottom: 16,
    textShadowColor: COLORS.FOOD,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },
  newHighBadge: {
    backgroundColor: 'rgba(57,255,20,0.12)',
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.TEXT_ACCENT,
  },
  newHighText: {
    color: COLORS.TEXT_ACCENT,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    fontFamily: 'monospace',
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
    width: '100%',
  },
  scoreBlock: {
    flex: 1,
    alignItems: 'center',
  },
  divider: {
    width: 1,
    height: 50,
    backgroundColor: COLORS.BTN_BORDER,
  },
  scoreLabel: {
    color: COLORS.TEXT_DIM,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 4,
    fontFamily: 'monospace',
  },
  scoreValue: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: 30,
    fontWeight: '800',
    fontFamily: 'monospace',
  },
  restartBtn: {
    backgroundColor: COLORS.FOOD,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 50,
    width: '100%',
    alignItems: 'center',
    shadowColor: COLORS.FOOD,
    shadowOpacity: 0.6,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8,
  },
  restartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 3,
    fontFamily: 'monospace',
  },
});

export default GameOverOverlay;
