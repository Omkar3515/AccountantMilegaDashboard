import React from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import type { ResumeSections } from '../types';

interface ResumeStrengthCardProps {
  strengthScore: number;
  sections: ResumeSections;
}

const StrengthChart: React.FC<{ value: number }> = ({ value }) => {
  const color = value >= 80 ? '#098a49' : value >= 50 ? '#f59e0b' : '#e11d48';
  const label = value >= 80 ? 'Good' : value >= 50 ? 'Fair' : 'Needs Work';

  return (
    <div className="relative w-40 h-40 mx-auto">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={[{ value }, { value: 100 - value }]}
            cx="50%"
            cy="50%"
            innerRadius={53}
            outerRadius={67}
            startAngle={90}
            endAngle={-270}
            stroke="none"
          >
            <Cell fill={color} />
            <Cell fill="#e8edf4" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <b className="text-2xl">{value}%</b>
          <p className="text-xs font-semibold mt-1" style={{ color }}>
            {label}
          </p>
        </div>
      </div>
    </div>
  );
};

const ResumeStrengthCard: React.FC<ResumeStrengthCardProps> = ({ strengthScore, sections }) => {
  const rows: [string, boolean, string][] = [
    ['Profile Completeness', sections.personalInfo, 'bg-emerald-600'],
    ['Skills', sections.skills, 'bg-emerald-600'],
    ['Work Experience', sections.experience, 'bg-blue-700'],
    ['Education', sections.education, 'bg-emerald-600'],
    ['Achievements', sections.achievements, 'bg-amber-500'],
  ];

  return (
    <section className="resume-card bg-white border border-slate-200 rounded-xl p-5">
      <h2 className="font-bold">Resume Strength</h2>
      <div className="flex flex-col md:flex-row items-center gap-8 mt-4">
        <div>
          <StrengthChart value={strengthScore} />
          <p className="text-xs text-slate-600 max-w-[190px] text-center mt-2">
            {strengthScore >= 80
              ? "Great! Your profile is strong and ready for employers."
              : "You're almost there! Fill in a few more sections to strengthen your profile."}
          </p>
        </div>
        <div className="flex-1 w-full space-y-4">
          {rows.map(([label, done, color]) => (
            <div key={label} className="grid grid-cols-[135px_1fr_34px] gap-3 items-center text-xs">
              <span className="font-medium">{label}</span>
              <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                <div className={`h-full ${color}`} style={{ width: done ? '100%' : '0%' }} />
              </div>
              <span>{done ? '100%' : '0%'}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResumeStrengthCard;