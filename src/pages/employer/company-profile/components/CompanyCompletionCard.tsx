import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Check, Circle } from 'lucide-react';
import type { CompletionStepItem } from '../types/companyProfile';

interface CompanyCompletionCardProps {
  completionSteps: CompletionStepItem[];
  percentage?: number;
  onStepClick?: (stepLabel: string) => void;
}

const CompanyCompletionCard: React.FC<CompanyCompletionCardProps> = ({
  completionSteps,
  percentage = 0,
  onStepClick,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <h3 className="text-sm font-bold text-gray-900 mb-6">Company Completion</h3>

      <div className="flex items-center gap-4 mb-8">
        <div className="relative w-24 h-24 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={[{ value: percentage }, { value: Math.max(0, 100 - percentage) }]}
                cx="50%"
                cy="50%"
                innerRadius={35}
                outerRadius={45}
                stroke="none"
                startAngle={90}
                endAngle={-270}
              >
                <Cell fill="#008b46" />
                <Cell fill="#f3f4f6" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold text-gray-900 leading-none">{percentage}%</span>
            <span className="text-[8px] text-gray-500 font-medium mt-1">Completed</span>
          </div>
        </div>
        <p className="text-xs text-gray-600 leading-relaxed">
          {percentage === 100
            ? 'Awesome! Your company profile is 100% complete and looks professional.'
            : 'Complete remaining steps to increase trust and attract top candidate applications.'}
        </p>
      </div>

      <div className="space-y-3">
        {completionSteps.map((step, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {step.type === 'done' ? (
                <Check className="w-4 h-4 text-brand-green" />
              ) : step.type === 'add' ? (
                <div className="w-4 h-4 rounded-full bg-brand-green flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                </div>
              ) : (
                <Circle className="w-4 h-4 text-gray-300" />
              )}
              <span className="text-xs text-gray-700">{step.label}</span>
            </div>
            <span
              onClick={() => onStepClick?.(step.label)}
              className={`text-xs font-semibold ${
                step.type === 'done'
                  ? 'text-brand-green font-bold'
                  : 'text-blue-500 cursor-pointer hover:underline'
              }`}
            >
              {step.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyCompletionCard;
