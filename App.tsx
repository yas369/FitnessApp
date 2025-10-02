import React, { useState, useCallback, useEffect } from 'react';
import type { UserPreferences, WorkoutPlan, NutritionPreferences, NutritionPlan } from './types';
import { generateWorkoutPlan, generateNutritionPlan } from './services/geminiService';
import { savePlan, loadPlan, clearPlan } from './services/cacheService';
import Header from './components/Header';
import WorkoutForm from './components/WorkoutForm';
import WorkoutPlanDisplay from './components/WorkoutPlanDisplay';
import Loader from './components/Loader';
import Footer from './components/Footer';
import TechniqueAnalyzer from './components/TechniqueAnalyzer';
import NutritionGuide from './components/NutritionGuide';
import BottomNavBar from './components/BottomNavBar';
import Dashboard from './components/Dashboard';
import OfflineBanner from './components/OfflineBanner';
import InstallPWA from './components/InstallPWA';

const useOfflineStatus = () => {
    const [isOffline, setIsOffline] = useState(!navigator.onLine);

    useEffect(() => {
        const handleOffline = () => setIsOffline(true);
        const handleOnline = () => setIsOffline(false);

        window.addEventListener('offline', handleOffline);
        window.addEventListener('online', handleOnline);

        return () => {
            window.removeEventListener('offline', handleOffline);
            window.removeEventListener('online', handleOnline);
        };
    }, []);

    return isOffline;
};

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<'planner' | 'analyzer' | 'nutrition' | 'dashboard'>('planner');
  const [workoutPreferences, setWorkoutPreferences] = useState<UserPreferences | null>(null);
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null);
  const [nutritionPreferences, setNutritionPreferences] = useState<NutritionPreferences | null>(null);
  const [nutritionPlan, setNutritionPlan] = useState<NutritionPlan | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const isOffline = useOfflineStatus();

  useEffect(() => {
    // On initial load, try to load cached plans
    const cachedWorkout = loadPlan<WorkoutPlan>('workoutPlan');
    const cachedWorkoutPrefs = loadPlan<UserPreferences>('workoutPreferences');
    if (cachedWorkout && cachedWorkoutPrefs) {
      setWorkoutPlan(cachedWorkout);
      setWorkoutPreferences(cachedWorkoutPrefs);
    }
    
    const cachedNutrition = loadPlan<NutritionPlan>('nutritionPlan');
    const cachedNutritionPrefs = loadPlan<NutritionPreferences>('nutritionPreferences');
    if (cachedNutrition && cachedNutritionPrefs) {
      setNutritionPlan(cachedNutrition);
      setNutritionPreferences(cachedNutritionPrefs);
    }
  }, []);

  const handleWorkoutSubmit = useCallback(async (data: UserPreferences) => {
    setIsLoading(true);
    setError(null);
    setWorkoutPlan(null);
    try {
      const plan = await generateWorkoutPlan(data);
      setWorkoutPreferences(data);
      setWorkoutPlan(plan);
      savePlan('workoutPlan', plan);
      savePlan('workoutPreferences', data);
    } catch (err) {
      console.error(err);
      setError('Failed to generate workout plan. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const handleNutritionSubmit = useCallback(async (data: NutritionPreferences) => {
    setIsLoading(true);
    setError(null);
    setNutritionPlan(null);
    try {
      const plan = await generateNutritionPlan(data);
      setNutritionPreferences(data);
      setNutritionPlan(plan);
      savePlan('nutritionPlan', plan);
      savePlan('nutritionPreferences', data);
    } catch (err) {
      console.error(err);
      setError('Failed to generate nutrition plan. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleWorkoutReset = useCallback(() => {
    setWorkoutPlan(null);
    setWorkoutPreferences(null);
    setError(null);
    clearPlan('workoutPlan');
    clearPlan('workoutPreferences');
  }, []);
  
  const handleNutritionReset = useCallback(() => {
    setNutritionPlan(null);
    setNutritionPreferences(null);
    setError(null);
    clearPlan('nutritionPlan');
    clearPlan('nutritionPreferences');
  }, []);

  const renderView = () => {
    switch(activeView) {
      case 'planner':
        if (isLoading) return <Loader />;
        if (error) return (
          <div role="alert" className="text-center p-8 bg-red-900/20 border border-red-500 rounded-lg">
            <p className="text-red-300 text-lg">{error}</p>
            <button
              onClick={handleWorkoutReset}
              className="mt-4 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white font-semibold transition-colors"
            >
              Try Again
            </button>
          </div>
        );
        if (workoutPlan && workoutPreferences) {
          return <WorkoutPlanDisplay plan={workoutPlan} preferences={workoutPreferences} onReset={handleWorkoutReset} />;
        }
        return <WorkoutForm onSubmit={handleWorkoutSubmit} isLoading={isLoading} isOffline={isOffline} />;
      
      case 'analyzer':
        return <TechniqueAnalyzer isOffline={isOffline} />;
      
      case 'nutrition':
        return <NutritionGuide 
          preferences={nutritionPreferences}
          plan={nutritionPlan}
          isLoading={isLoading}
          error={error}
          isOffline={isOffline}
          onSubmit={handleNutritionSubmit}
          onReset={handleNutritionReset}
        />;

      case 'dashboard':
        return <Dashboard isOffline={isOffline} />;
        
      default:
        return null;
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 pb-32">
        <OfflineBanner isOffline={isOffline} />
        <div key={activeView} className="animate-view-change">
          {renderView()}
        </div>
      </main>
      <Footer />
      <InstallPWA />
      <BottomNavBar activeView={activeView} onNavigate={setActiveView} />
      <style>{`
          @keyframes view-change-fade-in {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
          }
          .animate-view-change {
              animation: view-change-fade-in 0.5s ease-out forwards;
          }
      `}</style>
    </div>
  );
};

export default App;