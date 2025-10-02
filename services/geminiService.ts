import { GoogleGenAI } from "@google/genai";
import type { UserPreferences, WorkoutPlan, NutritionPreferences, NutritionPlan } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

function buildPrompt(preferences: UserPreferences): string {
  const { fitnessLevel, primaryGoal, sport, daysPerWeek, sessionDuration, equipment, healthConditions } = preferences;

  const goalMap = {
    weight_loss: "Weight Loss",
    muscle_gain: "Muscle Gain",
    general_fitness: "General Fitness",
    sports_performance: "Sports Performance"
  };

  const equipmentMap = {
    none: "No equipment (bodyweight exercises only)",
    basic: "Basic home equipment (dumbbells, resistance bands, pull-up bar)",
    full_gym: "A fully equipped gym"
  };

  let prompt = `
    You are a world-class AI fitness coach specializing in creating personalized workout plans for Indian users.
    Generate a comprehensive, one-week workout plan based on the following user profile.
    The plan should be realistic, effective, and safe.

    **User Profile:**
    - **Fitness Level:** ${fitnessLevel}
    - **Primary Goal:** ${goalMap[primaryGoal]}
    - **Workout Days Per Week:** ${daysPerWeek}
    - **Session Duration:** Approximately ${sessionDuration} minutes per session
    - **Available Equipment:** ${equipmentMap[equipment]}
  `;

  if (primaryGoal === 'sports_performance' && sport !== 'none') {
    prompt += `- **Specific Sport:** ${sport}. The plan must include sport-specific drills and conditioning exercises relevant to ${sport} in the Indian context.\n`;
  }

  if (healthConditions && healthConditions.trim() !== "") {
    prompt += `- **Health Conditions / Injuries:** "${healthConditions}". You MUST consider these limitations and suggest safe exercises or modifications. Avoid exercises that could worsen these conditions.\n`;
  } else {
    prompt += `- **Health Conditions / Injuries:** None specified.\n`;
  }
  
  prompt += `
    **Instructions for the Plan:**
    1.  **Structure:** Create a detailed plan for the ${daysPerWeek} workout days. Include rest days.
    2.  **Content:** For each workout day, specify the focus (e.g., 'Full Body Strength', 'Cricket Agility Drills', 'Cardio & Core').
    3.  **Exercises:** List specific exercises with clear instructions on sets, reps (or duration for timed exercises), and rest periods between sets.
    4.  **Variety:** Include a mix of strength training, cardio, and flexibility/mobility work as appropriate for the user's goal.
    5.  **Indian Context:** Where applicable, suggest warm-ups, cool-downs, and exercises that are culturally relevant or popular in India (e.g., incorporating elements of yoga for flexibility).
    6.  **Video Query:** For each exercise, provide a simple and effective YouTube search query in a "videoQuery" field (e.g., "how to do a proper squat", "dumbbell bicep curl technique"). This will be used to find a demonstration video.
    7.  **Notes:** Add a "note" field for exercises if there's a specific technique tip or safety precaution, especially considering the user's health conditions or fitness level.
    8.  **Tone:** Be encouraging, motivating, and professional.

    Return the plan ONLY in the specified JSON format. Do not include any introductory text, comments, or markdown formatting outside of the JSON structure.
    The JSON object MUST have the following structure:
    {
      "planTitle": "string",
      "description": "string",
      "weeklySchedule": [
        {
          "day": "string",
          "focus": "string",
          "exercises": [
            {
              "name": "string",
              "sets": "string",
              "reps": "string",
              "rest": "string",
              "note": "string (optional)",
              "videoQuery": "string"
            }
          ]
        }
      ]
    }
  `;
  return prompt;
}

export const generateWorkoutPlan = async (preferences: UserPreferences): Promise<WorkoutPlan> => {
  const prompt = buildPrompt(preferences);

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        temperature: 0.7,
      },
    });

    let jsonText = response.text.trim();
    
    const jsonMatch = jsonText.match(/```(?:json)?\s*([\s\S]+?)\s*```/);
    if (jsonMatch && jsonMatch[1]) {
      jsonText = jsonMatch[1];
    }

    const parsedPlan: WorkoutPlan = JSON.parse(jsonText);
    return parsedPlan;

  } catch (error) {
    console.error("Error generating workout plan:", error);
    throw new Error("Failed to communicate with the AI model.");
  }
};

export const analyzeExerciseTechnique = async (imageDataUrl: string, exerciseName: string): Promise<string> => {
  // The model expects a raw base64 string, not a data URL.
  const base64Data = imageDataUrl.split(',')[1];
  if (!base64Data) {
    throw new Error("Invalid image data URL provided.");
  }

  const prompt = `You are an expert AI fitness coach and biomechanics specialist. Your task is to provide a detailed analysis of a user's exercise form based on the single image provided. The user is performing a ${exerciseName}.

**Your Primary Directive:** Critically compare the user's posture, joint angles, and body alignment against the ideal, professionally accepted form for a ${exerciseName}. Use your extensive knowledge of exercise science, drawing upon correct examples of this pose.

**Feedback Structure:**
Your analysis MUST be structured in the following way, using markdown for formatting:

### Overall Form Rating
Give a numerical score out of 10 to provide a quick assessment (e.g., **7/10**).

### What You're Doing Well
Start with positive reinforcement. Identify 1-2 aspects of the form that are correct to build the user's confidence.
- *Example positive point 1*
- *Example positive point 2*

### Key Areas for Improvement
This is the most critical section. Identify the top 2-3 most important corrections needed. For each point:
- **Observation:** Clearly state what you see in the user's form (e.g., "Your back appears to be rounded").
  - **Correction:** Provide a simple, actionable cue to fix the issue (e.g., "Engage your core and maintain a neutral spine").
  - **Reasoning:** Briefly explain *why* this correction is important (e.g., "...to prevent lower back strain").

### Pro Tip
Offer one expert-level tip to help the user master the exercise.

### Motivational Closing
End with an encouraging statement.

**Important Rules:**
- Do not comment on the user's clothing, appearance, or surroundings. Focus exclusively on exercise form.
- Keep the language clear, concise, and easy for a beginner to understand.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        parts: [
          { text: prompt },
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Data,
            },
          },
        ],
      },
      config: {
        temperature: 0.5,
      },
    });
    
    return response.text;
  } catch (error) {
    console.error("Error analyzing technique:", error);
    throw new Error("Failed to communicate with the AI model for technique analysis.");
  }
};

function buildNutritionPrompt(preferences: NutritionPreferences): string {
    const { dietaryPreference, primaryGoal, allergies, mealsPerDay, cuisine } = preferences;

    const goalMap = {
        weight_loss: "Weight Loss",
        muscle_gain: "Muscle Gain",
        maintenance: "Weight Maintenance"
    };

    const cuisineMap = {
        north_indian: "North Indian",
        south_indian: "South Indian",
        mixed: "A mix of North and South Indian"
    }

    let prompt = `
    You are an expert AI nutritionist specializing in creating personalized meal plans for Indian users.
    Generate a comprehensive, one-week nutrition plan based on the following user profile.
    The plan should be balanced, healthy, and align with the user's goals.

    **User Profile:**
    - **Dietary Preference:** ${dietaryPreference}
    - **Primary Goal:** ${goalMap[primaryGoal]}
    - **Cuisine Preference:** ${cuisineMap[cuisine]}
    - **Meals Per Day:** ${mealsPerDay}
    - **Food Allergies or Dislikes:** "${allergies || 'None specified.'}"

    **Instructions for the Plan:**
    1.  **Structure:** Create a detailed 7-day meal plan.
    2.  **Cuisine:** All meals must be based on ${cuisineMap[cuisine]} cuisine. Use common, accessible Indian ingredients.
    3.  **Meals:** For each day, provide suggestions for ${mealsPerDay} meals (e.g., Breakfast, Lunch, Snack, Dinner).
    4.  **Content:** For each meal, list 2-3 specific food items with approximate, easy-to-understand portion sizes (e.g., "1 bowl," "2 rotis," "100g paneer").
    5.  **Calories:** Provide an approximate calorie count for each meal (e.g., "300-400 kcal") and a total for the day.
    6.  **Goal Alignment:** The meal composition and calorie counts must align with the primary goal of ${goalMap[primaryGoal]}. For muscle gain, ensure adequate protein. For weight loss, maintain a sensible caloric deficit.
    7.  **Health:** Avoid overly oily, sugary, or processed foods. Emphasize whole foods, lean proteins, complex carbs, and vegetables.
    8.  **Notes:** Add a "note" field for meals if there's a specific preparation tip or health benefit (e.g., "Use minimal oil for cooking," "Great source of fiber").
    9.  **Tone:** Be encouraging, positive, and informative.

    Return the plan ONLY in the specified JSON format. Do not include any text or markdown formatting outside of the JSON.
    The JSON object MUST have the following structure:
    {
      "planTitle": "string",
      "description": "string",
      "weeklyMealPlan": [
        {
          "day": "string",
          "dailyTotalCalories": "string",
          "meals": [
            {
              "name": "string",
              "items": ["string"],
              "calories": "string",
              "note": "string (optional)"
            }
          ]
        }
      ]
    }
  `;
  return prompt;
}

export const generateNutritionPlan = async (preferences: NutritionPreferences): Promise<NutritionPlan> => {
  const prompt = buildNutritionPrompt(preferences);
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        temperature: 0.6,
      },
    });
    let jsonText = response.text.trim();
    const jsonMatch = jsonText.match(/```(?:json)?\s*([\s\S]+?)\s*```/);
    if (jsonMatch && jsonMatch[1]) {
      jsonText = jsonMatch[1];
    }
    const parsedPlan: NutritionPlan = JSON.parse(jsonText);
    return parsedPlan;
  } catch (error) {
    console.error("Error generating nutrition plan:", error);
    throw new Error("Failed to communicate with the AI model for nutrition guidance.");
  }
};