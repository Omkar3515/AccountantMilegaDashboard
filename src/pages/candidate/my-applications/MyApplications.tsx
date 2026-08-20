import React from 'react';
import { Download } from 'lucide-react';
import ApplicationsFilterTabs from './components/ApplicationsFilterTabs';
import ApplicationsSearchBar from './components/ApplicationsSearchBar';
import ApplicationsTable from './components/ApplicationsTable';
import ApplicationDetailModal from './components/ApplicationDetailModal';
import { useMyApplications } from './hooks/useMyApplications';

interface MyApplicationsProps {
  onNavigate?: (page: string, params?: Record<string, unknown>) => void;
}

const MyApplications: React.FC<MyApplicationsProps> = ({ onNavigate }) => {
  const {
    applications,
    isLoading,
    errorMessage,
    tabCounts,
    activeTab,
    setActiveTab,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    selectedApp,
    setSelectedApp,
    handleDownloadReport,
    handleWithdraw,
  } = useMyApplications();

  return (
    <div className="my-applications-page max-w-[1220px] mx-auto font-sans text-slate-900">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-4">
        <button
          onClick={() => onNavigate && onNavigate('dashboard')}
          className="hover:text-blue-700 transition-colors"
        >
          Dashboard
        </button>
        <span>&gt;</span>
        <span className="text-slate-900 font-semibold">My Applications</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">My Applications</h1>
          <p className="text-sm text-slate-500 mt-1">
            Track the status of your job applications and see employer updates.
          </p>
        </div>
        <button
          onClick={handleDownloadReport}
          className="border border-blue-700 text-blue-700 hover:bg-blue-50 bg-white rounded-lg px-4 py-2.5 text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors shadow-sm"
        >
          <Download className="w-4 h-4 text-blue-700" />
          Download Applications
        </button>
      </div>

      <ApplicationsFilterTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabCounts={tabCounts}
      />

      <ApplicationsSearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {errorMessage && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl px-4 py-3 mt-4">
          {errorMessage}
        </div>
      )}

      {isLoading ? (
        <div className="bg-white border border-slate-200 rounded-xl p-10 text-center text-slate-400 text-sm mt-4">
          Loading applications...
        </div>
      ) : (
        <ApplicationsTable applications={applications} onViewDetails={setSelectedApp} />
      )}

      {selectedApp && (
        <ApplicationDetailModal
          application={selectedApp}
          onClose={() => setSelectedApp(null)}
          onWithdraw={handleWithdraw}
        />
      )}
    </div>
  );
};

export default MyApplications;