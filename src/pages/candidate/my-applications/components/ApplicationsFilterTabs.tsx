import React from 'react';

type TabKey = 'All' | 'Applied' | 'Interview' | 'Offered' | 'Rejected';

interface ApplicationsFilterTabsProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  tabCounts: Record<TabKey, number>;
}

const TABS: TabKey[] = ['All', 'Applied', 'Interview', 'Offered', 'Rejected'];

const ApplicationsFilterTabs: React.FC<ApplicationsFilterTabsProps> = ({
  activeTab,
  onTabChange,
  tabCounts,
}) => {
  return (
    <div className="flex items-center gap-6 border-b border-slate-200 mt-6 text-xs sm:text-sm font-medium">
      {TABS.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`pb-3 relative transition-colors ${
            activeTab === tab
              ? 'text-blue-700 font-bold border-b-2 border-blue-700'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          {tab} ({tabCounts[tab]})
        </button>
      ))}
    </div>
  );
};

export default ApplicationsFilterTabs;