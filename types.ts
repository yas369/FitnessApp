export interface UserPreferences {
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  primaryGoal: 'weight_loss' | 'muscle_gain' | 'general_fitness' | 'sports_performance';
  sport: 'none' | 'cricket' | 'badminton' | 'football' | 'kabaddi';
  daysPerWeek: number;
  sessionDuration: number;
  equipment: 'none' | 'basic' | 'full_gym';
  healthConditions: string;
}

export interface Exercise {
  name: string;
  sets: string;
  reps: string;
  rest: string;
  note?: string;
  videoQuery: string;
}

export interface DailyWorkout {
  day: string;
  focus: string;
  exercises: Exercise[];
}

export interface WorkoutPlan {
  planTitle: string;
  description: string;
  weeklySchedule: DailyWorkout[];
}

export interface NutritionPreferences {
  dietaryPreference: 'vegetarian' | 'non-vegetarian' | 'vegan' | 'eggetarian';
  primaryGoal: 'weight_loss' | 'muscle_gain' | 'maintenance';
  allergies: string;
  mealsPerDay: number;
  cuisine: 'north_indian' | 'south_indian' | 'mixed';
}

export interface Meal {
  name: string; // e.g., "Breakfast"
  items: string[];
  calories: string; // "Approx. 400-500 kcal"
  note?: string;
}

export interface DailyMealPlan {
  day: string; // e.g., "Monday"
  meals: Meal[];
  dailyTotalCalories: string;
}

export interface NutritionPlan {
  planTitle: string;
  description: string;
  weeklyMealPlan: DailyMealPlan[];
}

// New types for Wearable Dashboard
export interface WearableData {
    steps: {
        current: number;
        goal: number;
    };
    heartRate: {
        resting: number;
        current: number;
    };
    sleep: {
        hours: number;
        quality: number; // as a percentage
    };
    calories: {
        active: number;
        goal: number;
    };
}