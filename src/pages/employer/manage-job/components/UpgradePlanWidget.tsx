import React from 'react';
import { Crown } from 'lucide-react';

interface UpgradePlanWidgetProps {
  onUpgradeClick?: () => void;
}

const UpgradePlanWidget: React.FC<UpgradePlanWidgetProps> = ({ onUpgradeClick }) => {
  return (
    <div className="bg-[#F6F5EF] border border-brand-green/20 rounded-2xl p-5 shadow-sm space-y-3">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-[#F5E7BD] text-[#F5AB0F] grid place-items-center shrink-0">
          <Crown className="w-4.5 h-4.5" />
        </div>
        <h2 className="text-sm font-bold text-gray-900">Increase visibility</h2>
      </div>
      <p className="text-xs text-gray-600 leading-relaxed">
        Upgrade your plan to feature your jobs and get more qualified applicants.
      </p>
      <button
        onClick={onUpgradeClick}
        className="w-full bg-brand-green text-white font-bold text-sm py-2.5 rounded-lg shadow-sm shadow-brand-green/20 hover:bg-brand-green/90 transition-all"
      >
        Upgrade Plan
      </button>
    </div>
  );
};

export default UpgradePlanWidget;