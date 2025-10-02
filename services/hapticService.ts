/**
 * Triggers haptic feedback on supported devices.
 * @param pattern A vibration pattern. Can be a single value or an array of values.
 * e.g., 50 for a short buzz, [100, 30, 100] for a more complex pattern.
 */
export const triggerHapticFeedback = (pattern: number | number[] = 50): void => {
  if ('vibrate' in navigator) {
    try {
      // Use a light vibration by default for most interactions
      const defaultPattern = [30];
      navigator.vibrate(pattern === 50 ? defaultPattern : pattern);
    } catch (error) {
      console.warn("Haptic feedback failed:", error);
    }
  }
};
