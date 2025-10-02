
const PREFIX = 'aiFitnessCoach-';

export const savePlan = <T>(key: string, data: T): void => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(`${PREFIX}${key}`, serializedData);
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

export const loadPlan = <T>(key:string): T | null => {
  try {
    const serializedData = localStorage.getItem(`${PREFIX}${key}`);
    if (serializedData === null) {
      return null;
    }
    return JSON.parse(serializedData) as T;
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error);
    return null;
  }
};

export const clearPlan = (key: string): void => {
  try {
    localStorage.removeItem(`${PREFIX}${key}`);
  } catch (error) {
    console.error(`Error clearing ${key} from localStorage:`, error);
  }
};
