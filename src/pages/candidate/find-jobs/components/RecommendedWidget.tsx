import React from 'react';
import { Sparkles } from 'lucide-react';

// NOTE: Real recommendations need a matching/scoring engine (based on
// candidate skills/preferences vs job requirements) which isn't built
// yet. This shows a clean static placeholder for now.
const RecommendedWidget: React.FC = () => {
  return (
    <section className="find-jobs-card bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 rounded-xl p-5">
      <h2 className="font-bold text-sm text-emerald-800">
        <Sparkles className="w-4 h-4 inline mr-2" />
        Recommended for You
      </h2>
      <p className="text-xs text-slate-500 mt-4">
        Complete your profile to get personalized job recommendations.
      </p>
    </section>
  );
};

export default RecommendedWidget;