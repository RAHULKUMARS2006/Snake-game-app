// src/hooks/useSound.js
// ============================================================
// Haptic feedback wrapper (sound via react-native-sound is
// optional – gracefully degrades if the lib isn't linked).
// ============================================================

import { useCallback } from 'react';
import { Platform } from 'react-native';

// Haptic feedback – graceful fallback if not installed
let ReactNativeHapticFeedback;
try {
  ReactNativeHapticFeedback = require('react-native-haptic-feedback').default;
} catch (_) {
  ReactNativeHapticFeedback = null;
}

const triggerHaptic = (type) => {
  if (!ReactNativeHapticFeedback) return;
  const options = { enableVibrateFallback: true, ignoreAndroidSystemSettings: false };
  try {
    ReactNativeHapticFeedback.trigger(type, options);
  } catch (_) {}
};

const useSound = () => {
  // Light tick when eating food
  const playEat = useCallback(() => {
    if (Platform.OS === 'ios') {
      triggerHaptic('impactLight');
    } else {
      triggerHaptic('virtualKey');
    }
  }, []);

  // Strong pulse on game over
  const playDie = useCallback(() => {
    if (Platform.OS === 'ios') {
      triggerHaptic('notificationError');
    } else {
      triggerHaptic('longPress');
    }
  }, []);

  return { playEat, playDie };
};

export default useSound;
