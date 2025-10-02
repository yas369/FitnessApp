
import React, { useState, useRef, useCallback } from 'react';
import { analyzeExerciseTechnique } from '../services/geminiService';
import CameraIcon from './icons/CameraIcon';
import SparklesIcon from './icons/SparklesIcon';
import OfflineIcon from './icons/OfflineIcon';

const EXERCISES = [
  { key: 'squat', label: 'Squat' },
  { key: 'push_up', label: 'Push-up' },
  { key: 'deadlift', label: 'Deadlift' },
  { key: 'plank', label: 'Plank' },
  { key: 'lunges', label: 'Lunges' },
];

interface TechniqueAnalyzerProps {
  isOffline: boolean;
}

const TechniqueAnalyzer: React.FC<TechniqueAnalyzerProps> = ({ isOffline }) => {
  const [selectedExercise, setSelectedExercise] = useState<string>(EXERCISES[0].key);
  const [isCameraOn, setIsCameraOn] = useState<boolean>(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraOn(false);
  }, []);

  const handleStartCamera = useCallback(async () => {
    setError(null);
    if (isCameraOn) {
      stopCamera();
      return;
    }

    let stream: MediaStream | null = null;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
      });
    } catch (err) {
      console.warn("Could not get user-facing camera, trying any camera...", err);
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
      } catch (finalErr) {
        console.error("Error accessing camera:", finalErr);
        const error = finalErr as Error;

        let errorMessage = "Could not access the camera. Please ensure you have granted permission and no other application is using it.";
        if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
          errorMessage = "No camera found on this device. Please connect a camera and try again.";
        } else if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
          errorMessage = "Camera access was denied. Please grant permission in your browser settings to use this feature.";
        }
        
        setError(errorMessage);
        return;
      }
    }
    
    if (stream) {
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraOn(true);
    }
  }, [isCameraOn, stopCamera]);


  const handleCapture = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setCapturedImage(dataUrl);
        stopCamera();
      }
    }
  }, [stopCamera]);

  const handleAnalyze = async () => {
    if (!capturedImage) return;
    setIsLoading(true);
    setError(null);
    setAnalysis(null);
    try {
      const result = await analyzeExerciseTechnique(capturedImage, selectedExercise);
      setAnalysis(result);
    } catch (err) {
      console.error(err);
      setError("Failed to analyze technique. The AI model could not be reached.");
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    stopCamera();
    setCapturedImage(null);
    setAnalysis(null);
    setIsLoading(false);
    setError(null);
  };
  
  const renderContent = () => {
    if (isOffline) {
      return (
        <div className="text-center p-8 space-y-4 flex flex-col items-center">
            <OfflineIcon className="w-16 h-16 text-indigo-400/50" />
            <h3 className="text-2xl font-bold text-white">Feature Unavailable Offline</h3>
            <p className="text-slate-400 max-w-md">The Technique Analyzer requires an active internet connection to communicate with the AI coach. Please reconnect to use this feature.</p>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div role="status" className="text-center p-8">
            <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-indigo-400 mx-auto"></div>
            <h3 className="text-xl font-bold text-white mt-4">Analyzing Your Form...</h3>
            <p className="text-slate-400">The AI is reviewing your technique to provide feedback.</p>
        </div>
      )
    }

    if (error) {
       return (
        <div role="alert" className="text-center p-8 bg-red-900/20 border border-red-500 rounded-lg">
          <p className="text-red-300">{error}</p>
          <button onClick={reset} className="mt-4 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white font-semibold transition-colors">
            Try Again
          </button>
        </div>
       );
    }

    if (analysis) {
        return (
            <section aria-labelledby="analysis-heading">
                <h3 id="analysis-heading" className="text-2xl font-bold text-white mb-4">Technique Analysis</h3>
                <div className="bg-slate-700/50 p-6 rounded-lg whitespace-pre-wrap text-slate-300 leading-relaxed font-mono custom-scrollbar overflow-x-auto" dangerouslySetInnerHTML={{ __html: analysis.replace(/### (.*?)\n/g, '<h4 class="text-lg font-bold text-white mt-4 mb-2">$1</h4>').replace(/\n/g, '<br />') }}>
                </div>
                <div className="text-center mt-6">
                    <button onClick={reset} className="text-white bg-indigo-600 hover:bg-indigo-700 font-bold rounded-lg text-lg px-8 py-3 text-center transition-all duration-300">
                        Analyze Another Exercise
                    </button>
                </div>
            </section>
        );
    }
    
    if (capturedImage) {
        return (
            <div className="flex flex-col items-center space-y-4">
                <img src={capturedImage} alt={`Still image of your ${EXERCISES.find(e => e.key === selectedExercise)?.label || 'exercise'} form, ready for analysis.`} className="rounded-lg max-w-full md:max-w-md shadow-lg" />
                <div className="flex space-x-4">
                    <button onClick={() => setCapturedImage(null)} className="px-6 py-2 bg-slate-600 hover:bg-slate-700 rounded-md text-white font-semibold transition-colors">
                        Retake
                    </button>
                    <button onClick={handleAnalyze} className="flex items-center space-x-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white font-semibold transition-colors">
                        <SparklesIcon className="w-5 h-5" />
                        <span>Analyze Form</span>
                    </button>
                </div>
            </div>
        );
    }
    
    if (isCameraOn) {
        return (
            <div className="flex flex-col items-center space-y-4">
                <p className="text-slate-300 text-center">Position yourself, hold the pose, and capture your form.</p>
                <video ref={videoRef} autoPlay playsInline aria-label="Live camera feed for capturing your exercise pose" className="rounded-lg w-full max-w-md shadow-lg transform -scale-x-100"></video>
                <div className="flex space-x-4">
                    <button onClick={handleStartCamera} className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-md text-white font-semibold transition-colors">
                        Stop Camera
                    </button>
                    <button onClick={handleCapture} className="flex items-center space-x-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white font-semibold transition-colors">
                        <CameraIcon className="w-5 h-5" />
                        <span>Capture</span>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="text-center space-y-6">
            <div className="mx-auto bg-slate-700/50 w-20 h-20 rounded-2xl flex items-center justify-center border-2 border-indigo-500/30">
                <CameraIcon className="w-10 h-10 text-indigo-400" />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Get Instant Feedback</h2>
            <p className="mt-2 text-slate-400 text-lg max-w-2xl mx-auto">Select an exercise, enable your camera, and let our AI coach help you improve.</p>
            <div className="max-w-sm mx-auto">
                <label htmlFor="exercise" className="block text-sm font-medium text-slate-300 mb-2">Select Exercise</label>
                <select 
                    id="exercise" 
                    value={selectedExercise}
                    onChange={(e) => setSelectedExercise(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                >
                    {EXERCISES.map(ex => <option key={ex.key} value={ex.key}>{ex.label}</option>)}
                </select>
            </div>
            <button onClick={handleStartCamera} className="flex items-center space-x-2 mx-auto text-white bg-indigo-600 hover:bg-indigo-700 font-bold rounded-lg text-lg px-8 py-3.5 text-center transition-all duration-300">
                <CameraIcon className="w-6 h-6" />
                <span>Start Camera</span>
            </button>
        </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-slate-800/50 rounded-2xl shadow-lg p-6 md:p-10 border border-slate-700">
        {renderContent()}
        <canvas ref={canvasRef} className="hidden"></canvas>
    </div>
  );
};

export default TechniqueAnalyzer;
