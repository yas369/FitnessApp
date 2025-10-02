import type { WearableData } from '../types';

// Helper to generate a random integer within a range
const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Simulates fetching data from a connected wearable device.
 * In a real application, this would involve API calls to services like
 * Google Fit, Apple HealthKit, Fitbit, or Garmin.
 */
export const fetchWearableData = (): Promise<WearableData> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      const data: WearableData = {
        steps: {
          current: getRandomInt(3000, 12000),
          goal: 10000,
        },
        heartRate: {
          resting: getRandomInt(55, 75),
          current: getRandomInt(60, 110),
        },
        sleep: {
          hours: parseFloat((Math.random() * (9 - 5) + 5).toFixed(1)),
          quality: getRandomInt(70, 95),
        },
        calories: {
          active: getRandomInt(200, 800),
          goal: 500,
        },
      };
      resolve(data);
    }, 1500); // 1.5 second delay
  });
};