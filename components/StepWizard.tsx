import React from 'react';
import { Check } from 'lucide-react';

interface StepWizardProps {
  currentStep: number;
}

const steps = [
  { id: 1, label: 'Hisse Seç' },
  { id: 2, label: 'Yön Belirle' },
  { id: 3, label: 'Vade Seç' },
  { id: 4, label: 'Sonuçlar' },
];

export const StepWizard: React.FC<StepWizardProps> = ({ currentStep }) => {
  return (
    <div className="w-full max-w-4xl mx-auto mb-8 px-4">
      <div className="relative flex justify-between">
        {/* Connection Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 dark:bg-slate-800 -z-10 transform -translate-y-1/2 rounded transition-colors"></div>
        <div 
            className="absolute top-1/2 left-0 h-1 bg-blue-600 -z-10 transform -translate-y-1/2 rounded transition-all duration-500 ease-in-out"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        ></div>

        {steps.map((step) => {
            const isCompleted = step.id < currentStep;
            const isCurrent = step.id === currentStep;

            return (
                <div key={step.id} className="flex flex-col items-center group">
                    <div 
                        className={`
                            w-10 h-10 rounded-full flex items-center justify-center border-4 font-bold transition-all duration-300
                            ${isCompleted ? 'bg-blue-600 border-blue-600 text-white' : ''}
                            ${isCurrent ? 'bg-white dark:bg-slate-900 border-blue-600 text-blue-600 dark:text-blue-500 scale-110 shadow-lg shadow-blue-500/20 dark:shadow-blue-900/50' : ''}
                            ${!isCompleted && !isCurrent ? 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500' : ''}
                        `}
                    >
                        {isCompleted ? <Check size={18} /> : step.id}
                    </div>
                    <span 
                        className={`
                            mt-2 text-xs md:text-sm font-medium transition-colors
                            ${isCurrent ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-500'}
                        `}
                    >
                        {step.label}
                    </span>
                </div>
            );
        })}
      </div>
    </div>
  );
};