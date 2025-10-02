import React, { useState, useCallback } from 'react';
import type { WearableData } from '../types';
import { fetchWearableData } from '../services/wearableService';
import StepsIcon from './icons/StepsIcon';
import HeartRateIcon from './icons/HeartRateIcon';
import SleepIcon from './icons/SleepIcon';
import FireIcon from './icons/FireIcon';

const StatCard: React.FC<{ label: string, value: string, subValue?: string, icon: React.ReactNode, children?: React.ReactNode }> = ({ label, value, subValue, icon, children }) => (
    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 flex flex-col justify-between h-full">
        <div>
            <div className="flex items-center justify-between text-slate-400">
                <span className="text-sm font-medium">{label}</span>
                <div className="text-indigo-400">{icon}</div>
            </div>
            <p className="text-3xl font-bold text-white mt-2">{value}</p>
            {subValue && <p className="text-sm text-slate-300">{subValue}</p>}
        </div>
        {children && <div className="mt-4">{children}</div>}
    </div>
);

const ProgressBar: React.FC<{ value: number, max: number }> = ({ value, max }) => {
    const percentage = Math.min((value / max) * 100, 100);
    return (
        <div className="w-full bg-slate-700 rounded-full h-2.5">
            <div className="bg-indigo-500 h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
        </div>
    );
};


const Dashboard: React.FC = () => {
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [data, setData] = useState<WearableData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleConnect = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setData(null);
        try {
            const wearableData = await fetchWearableData();
            setData(wearableData);
            setIsConnected(true);
        } catch (err) {
            setError("Could not connect to the wearable service. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleDisconnect = useCallback(() => {
        setIsConnected(false);
        setData(null);
    }, []);

    if (!isConnected) {
        return (
            <div className="max-w-4xl mx-auto bg-slate-800/50 rounded-2xl shadow-lg p-10 border border-slate-700 text-center flex flex-col items-center">
                <h2 className="text-3xl md:text-4xl font-extrabold text-white">Track Your Progress</h2>
                <p className="mt-2 text-slate-400 text-lg max-w-xl mx-auto">Connect your wearable device to automatically sync your daily activity, sleep, and heart rate for a complete overview of your health.</p>
                <button 
                    onClick={handleConnect} 
                    disabled={isLoading}
                    className="mt-8 flex justify-center items-center text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500/50 font-bold rounded-lg text-lg px-8 py-3.5 text-center disabled:bg-indigo-900 disabled:cursor-not-allowed transition-all duration-300"
                >
                    {isLoading ? 'Connecting...' : 'Connect Wearable'}
                </button>
                {error && <p className="text-red-400 mt-4">{error}</p>}
            </div>
        );
    }

    if (isLoading || !data) {
        return (
            <div role="status" aria-live="polite" className="flex flex-col items-center justify-center p-12 text-center space-y-4">
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-indigo-400"></div>
                <h3 className="text-2xl font-bold text-white tracking-wider">Syncing Data...</h3>
                <p className="text-slate-400">Fetching the latest stats from your device.</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl md:text-4xl font-extrabold text-white">Daily Dashboard</h2>
                <button onClick={handleDisconnect} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-md text-sm text-white font-semibold transition-colors">
                    Disconnect
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    label="Steps" 
                    value={data.steps.current.toLocaleString()} 
                    subValue={`Goal: ${data.steps.goal.toLocaleString()}`}
                    icon={<StepsIcon className="w-6 h-6" />}
                >
                    <ProgressBar value={data.steps.current} max={data.steps.goal} />
                </StatCard>
                <StatCard 
                    label="Heart Rate" 
                    value={`${data.heartRate.current} bpm`}
                    subValue={`Resting: ${data.heartRate.resting} bpm`}
                    icon={<HeartRateIcon className="w-6 h-6" />}
                />
                <StatCard 
                    label="Sleep" 
                    value={`${data.sleep.hours} hrs`} 
                    subValue={`Quality: ${data.sleep.quality}%`}
                    icon={<SleepIcon className="w-6 h-6" />}
                />
                <StatCard 
                    label="Active Calories" 
                    value={data.calories.active.toLocaleString()}
                    subValue={`Goal: ${data.calories.goal.toLocaleString()}`}
                    icon={<FireIcon className="w-6 h-6" />}
                >
                    <ProgressBar value={data.calories.active} max={data.calories.goal} />
                </StatCard>
            </div>
        </div>
    );
};

export default Dashboard;