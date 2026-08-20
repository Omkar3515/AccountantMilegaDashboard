import React from 'react';
import { Award, CheckCircle2, FileText, Sparkles, Star, UserRound } from 'lucide-react';
import type { ResumeSections } from '../types';

interface ResumeSectionsCardProps {
  sections: ResumeSections;
  onEditSection: (section: string) => void;
}

const ResumeSectionsCard: React.FC<ResumeSectionsCardProps> = ({ sections, onEditSection }) => {
  const rows: [any, string, string, boolean, string][] = [
    [
      UserRound,
      'Personal Information',
      sections.personalInfo ? 'Headline and location added' : 'Not added yet',
      sections.personalInfo,
      'profile',
    ],
    [
      FileText,
      'Professional Summary',
      sections.summary ? 'Summary added' : 'Add a short professional summary',
      sections.summary,
      'profile',
    ],
    [
      Award,
      'Work Experience',
      `${sections.experienceCount} Experience${sections.experienceCount === 1 ? '' : 's'} Added`,
      sections.experience,
      'profile',
    ],
    [
      Sparkles,
      'Education',
      `${sections.educationCount} Education entr${sections.educationCount === 1 ? 'y' : 'ies'} Added`,
      sections.education,
      'profile',
    ],
    [
      Star,
      'Skills',
      `${sections.skillsCount} Skill${sections.skillsCount === 1 ? '' : 's'} Added`,
      sections.skills,
      'profile',
    ],
  ];

  return (
    <section className="resume-card bg-white border border-slate-200 rounded-xl p-5">
      <h2 className="font-bold">Resume Sections</h2>
      <div className="mt-3">
        {rows.map(([Icon, title, detail, complete]) => (
          <div
            className="flex items-center gap-4 py-3 border-b last:border-0 border-slate-100"
            key={title}
          >
            <div className="w-9 h-9 bg-blue-50 text-blue-700 rounded-lg grid place-items-center">
              <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">{title}</p>
              <p className="text-xs text-slate-500 mt-1">{detail}</p>
            </div>
            {complete ? (
              <span className="text-xs text-emerald-700 font-medium">
                <CheckCircle2 className="w-3 h-3 inline mr-1" /> Completed
              </span>
            ) : (
              <span className="text-xs text-amber-600 font-medium">Incomplete</span>
            )}
            <button
              onClick={() => onEditSection('profile')}
              className="border border-slate-200 rounded-lg px-4 py-2 text-xs"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ResumeSectionsCard;