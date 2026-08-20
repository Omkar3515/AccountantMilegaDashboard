import React from 'react';
import { Lightbulb } from 'lucide-react';
import type { ResumeSections } from '../types';

interface ResumeTipsWidgetProps {
  sections: ResumeSections;
  strengthScore: number;
}

const ResumeTipsWidget: React.FC<ResumeTipsWidgetProps> = ({ sections, strengthScore }) => {
  const tips: [string, boolean][] = [
    [
      sections.skills
        ? 'You have a good number of skills added'
        : 'Add at least 3 skills to get better job matches',
      sections.skills,
    ],
    [
      sections.summary
        ? 'Professional summary looks good'
        : 'Add a professional summary to stand out',
      sections.summary,
    ],
    [
      sections.experience
        ? 'Work experience added'
        : 'Add your work experience for credibility',
      sections.experience,
    ],
    [
      sections.achievements
        ? 'Achievements added'
        : 'Add achievements to stand out from other candidates',
      sections.achievements,
    ],
  ];

  const badgeLabel = strengthScore >= 80 ? 'Good' : strengthScore >= 50 ? 'Fair' : 'Needs Work';

  return (
    <section className="resume-card bg-white border border-slate-200 rounded-xl p-5">
      <h2 className="font-bold">
        <Lightbulb className="w-5 h-5 inline text-amber-500 mr-2" />
        Resume Tips{' '}
        <span className="float-right bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded">
          {badgeLabel}
        </span>
      </h2>
      {tips.map(([text, good]) => (
        <p key={text} className="text-xs text-slate-600 mt-5">
          <span className={good ? 'text-emerald-600' : 'text-orange-500'}>{good ? '✓' : '⚠'}</span>
          <span className="ml-3">{text}</span>
        </p>
      ))}
    </section>
  );
};

export default ResumeTipsWidget;