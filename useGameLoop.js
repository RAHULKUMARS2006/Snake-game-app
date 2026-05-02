// src/components/DirectionPad.js
// ============================================================
// On-screen D-Pad for controlling snake direction
// ============================================================

import React, { memo, useCallback } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { DIRECTION, COLORS } from '../utils/constants';

const PAD_SIZE = 70;
const ARROW_SIZE = 60;

// Arrow symbol for each direction
const ARROW_ICON = {
  [DIRECTION.UP]:    '▲',
  [DIRECTION.DOWN]:  '▼',
  [DIRECTION.LEFT]:  '◀',
  [DIRECTION.RIGHT]: '▶',
};

// ── Single Arrow Button ─────────────────────────────────────────
const ArrowBtn = memo(({ dir, onPress, style }) => {
  const handlePress = useCallback(() => onPress(dir), [dir, onPress]);

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={handlePress}
      style={[styles.arrowBtn, style]}
    >
      <Text style={styles.arrowIcon}>{ARROW_ICON[dir]}</Text>
    </TouchableOpacity>
  );
});

// ── D-Pad Layout ───────────────────────────────────────────────
const DirectionPad = ({ onDirectionChange }) => {
  return (
    <View style={styles.container}>
      {/* Up */}
      <View style={styles.row}>
        <ArrowBtn dir={DIRECTION.UP} onPress={onDirectionChange} />
      </View>

      {/* Left | Center | Right */}
      <View style={styles.row}>
        <ArrowBtn dir={DIRECTION.LEFT} onPress={onDirectionChange} />
        <View style={styles.center} />
        <ArrowBtn dir={DIRECTION.RIGHT} onPress={onDirectionChange} />
      </View>

      {/* Down */}
      <View style={styles.row}>
        <ArrowBtn dir={DIRECTION.DOWN} onPress={onDirectionChange} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowBtn: {
    width: ARROW_SIZE,
    height: ARROW_SIZE,
    margin: 4,
    borderRadius: 14,
    backgroundColor: COLORS.BTN_PRIMARY,
    borderWidth: 1.5,
    borderColor: COLORS.BTN_BORDER,
    alignItems: 'center',
    justifyContent: 'center',
    // Subtle glow
    shadowColor: COLORS.BTN_ACCENT,
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
  },
  arrowIcon: {
    color: COLORS.BTN_ACCENT,
    fontSize: 22,
    fontWeight: 'bold',
  },
  center: {
    width: ARROW_SIZE,
    height: ARROW_SIZE,
    margin: 4,
  },
});

export default memo(DirectionPad);
