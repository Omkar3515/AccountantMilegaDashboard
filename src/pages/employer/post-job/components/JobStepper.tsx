import React from 'react';
import { JOB_STEPS } from '../constants';

interface JobStepperProps {
  currentStep: number;
  onStepClick?: (step: number) => void;
}

const JobStepper: React.FC<JobStepperProps> = ({
  currentStep,
  onStepClick,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 mb-6 overflow-x-auto">
      <div className="flex items-center justify-between min-w-[700px] px-4">
        {JOB_STEPS.map((item, index) => {
          const isActive = item.step === currentStep;
          const isCompleted = item.step < currentStep;

          return (
            <React.Fragment key={item.step}>
              {/* Connector line between steps */}
              {index > 0 && (
                <div
                  className={`flex-1 h-[2px] mx-3 self-start mt-4 transition-colors ${
                    item.step <= currentStep ? 'bg-brand-green' : 'bg-slate-200'
                  }`}
                />
              )}

              <div
                onClick={() => onStepClick?.(item.step)}
                className="flex flex-col items-center cursor-pointer select-none group"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    isActive || isCompleted
                      ? 'bg-brand-green text-white shadow-sm shadow-brand-green/20'
                      : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                  }`}
                >
                  {item.step}
                </div>
                <span
                  className={`text-xs font-semibold mt-2 whitespace-nowrap transition-colors ${
                    isActive
                      ? 'text-brand-green'
                      : isCompleted
                      ? 'text-slate-700'
                      : 'text-slate-500 group-hover:text-slate-700'
                  }`}
                >
                  {item.label}
                </span>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default JobStepper;
