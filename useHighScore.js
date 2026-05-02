// src/components/GameBoard.js
// ============================================================
// Renders the grid, snake, and food using absolute positioning
// ============================================================

import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  CELL_SIZE,
  BOARD_WIDTH,
  BOARD_HEIGHT,
  COLORS,
  COLS,
  ROWS,
} from '../utils/constants';

// ── Snake Segment ──────────────────────────────────────────────
const SnakeSegment = memo(({ row, col, isHead, isLast }) => {
  const bgColor = isHead
    ? COLORS.SNAKE_HEAD
    : isLast
    ? COLORS.SNAKE_TAIL
    : COLORS.SNAKE_BODY;

  const borderRadius = isHead ? CELL_SIZE / 2 : CELL_SIZE / 4;

  return (
    <View
      style={[
        styles.cell,
        {
          top: row * CELL_SIZE,
          left: col * CELL_SIZE,
          backgroundColor: bgColor,
          borderRadius,
          // Neon glow simulation via shadow (iOS) and elevation (Android)
          shadowColor: COLORS.SNAKE_OUTLINE,
          shadowOpacity: isHead ? 0.9 : 0.4,
          shadowRadius: isHead ? 6 : 3,
          shadowOffset: { width: 0, height: 0 },
          elevation: isHead ? 8 : 3,
        },
      ]}
    />
  );
});

// ── Food ───────────────────────────────────────────────────────
const Food = memo(({ row, col }) => (
  <View style={[styles.cell, styles.foodOuter, { top: row * CELL_SIZE, left: col * CELL_SIZE }]}>
    {/* Outer glow ring */}
    <View style={styles.foodGlow} />
    {/* Main red dot */}
    <View style={styles.foodCore} />
    {/* Shine highlight */}
    <View style={styles.foodShine} />
  </View>
));

// ── Grid Lines (subtle background grid) ───────────────────────
const GridLines = memo(() => {
  const cols = [];
  const rows = [];

  for (let c = 0; c <= COLS; c++) {
    cols.push(
      <View
        key={`col-${c}`}
        style={[styles.gridLine, { left: c * CELL_SIZE, top: 0, width: 1, height: BOARD_HEIGHT }]}
      />,
    );
  }
  for (let r = 0; r <= ROWS; r++) {
    rows.push(
      <View
        key={`row-${r}`}
        style={[styles.gridLine, { top: r * CELL_SIZE, left: 0, height: 1, width: BOARD_WIDTH }]}
      />,
    );
  }

  return (
    <>
      {cols}
      {rows}
    </>
  );
});

// ── Main Board ─────────────────────────────────────────────────
const GameBoard = ({ snake, food }) => {
  return (
    <View style={styles.board}>
      <GridLines />

      {/* Food */}
      <Food row={food.row} col={food.col} />

      {/* Snake segments */}
      {snake.map((segment, index) => (
        <SnakeSegment
          key={`seg-${index}`}
          row={segment.row}
          col={segment.col}
          isHead={index === 0}
          isLast={index === snake.length - 1}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    width: BOARD_WIDTH,
    height: BOARD_HEIGHT,
    backgroundColor: COLORS.BOARD_BG,
    borderWidth: 2,
    borderColor: COLORS.BOARD_BORDER,
    borderRadius: 4,
    overflow: 'hidden',
    position: 'relative',
  },
  cell: {
    position: 'absolute',
    width: CELL_SIZE - 1,
    height: CELL_SIZE - 1,
    margin: 0.5,
  },
  gridLine: {
    position: 'absolute',
    backgroundColor: COLORS.GRID_LINE,
  },
  foodOuter: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  foodGlow: {
    position: 'absolute',
    width: CELL_SIZE - 1,
    height: CELL_SIZE - 1,
    borderRadius: (CELL_SIZE - 1) / 2,
    backgroundColor: COLORS.FOOD,
    opacity: 0.3,
  },
  foodCore: {
    width: CELL_SIZE * 0.65,
    height: CELL_SIZE * 0.65,
    borderRadius: (CELL_SIZE * 0.65) / 2,
    backgroundColor: COLORS.FOOD,
    shadowColor: COLORS.FOOD,
    shadowOpacity: 0.9,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8,
  },
  foodShine: {
    position: 'absolute',
    top: CELL_SIZE * 0.12,
    left: CELL_SIZE * 0.15,
    width: CELL_SIZE * 0.2,
    height: CELL_SIZE * 0.2,
    borderRadius: CELL_SIZE * 0.1,
    backgroundColor: COLORS.FOOD_SHINE,
    opacity: 0.8,
  },
});

export default memo(GameBoard);
