import React from 'react';

interface CompanyTabsProps {
  tabs: string[];
  activeTabIndex?: number;
  onTabChange?: (index: number) => void;
}

const CompanyTabs: React.FC<CompanyTabsProps> = ({ tabs, activeTabIndex = 0, onTabChange }) => {
  return (
    <div className="border-b border-gray-200 overflow-x-auto">
      <div className="flex items-center gap-8 min-w-max px-2">
        {tabs.map((tab, idx) => (
          <button
            key={tab}
            onClick={() => onTabChange?.(idx)}
            className={`py-3 text-sm font-semibold border-b-2 transition-colors ${
              idx === activeTabIndex 
                ? 'border-brand-green text-brand-green' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CompanyTabs;
