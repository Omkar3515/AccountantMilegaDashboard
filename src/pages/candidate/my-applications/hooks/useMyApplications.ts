import { useState, useEffect, useCallback, useMemo } from 'react';
import { getMyApplications, withdrawApplication } from '../services/applicationService';
import type { ApplicationItem } from '../types';

type TabKey = 'All' | 'Applied' | 'Interview' | 'Offered' | 'Rejected';

export const useMyApplications = () => {
  const [applications, setApplications] = useState<ApplicationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<TabKey>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('Recent');

  const [selectedApp, setSelectedApp] = useState<ApplicationItem | null>(null);

  const fetchApplications = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);
    const result = await getMyApplications();
    if (result.success && result.data) {
      setApplications(result.data);
    } else {
      setErrorMessage(result.message || 'Failed to load applications');
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const tabCounts = useMemo(() => {
    return {
      All: applications.length,
      Applied: applications.filter((a) => a.status === 'Applied').length,
      Interview: applications.filter(
        (a) => a.status === 'Interview Scheduled' || a.status === 'Shortlisted'
      ).length,
      Offered: applications.filter((a) => a.status === 'Offered').length,
      Rejected: applications.filter((a) => a.status === 'Rejected').length,
    };
  }, [applications]);

  const filteredApps = useMemo(() => {
    let result = applications.filter((app) => {
      let matchesTab = true;
      if (activeTab === 'Applied') matchesTab = app.status === 'Applied';
      if (activeTab === 'Interview')
        matchesTab = app.status === 'Interview Scheduled' || app.status === 'Shortlisted';
      if (activeTab === 'Offered') matchesTab = app.status === 'Offered';
      if (activeTab === 'Rejected') matchesTab = app.status === 'Rejected';

      const matchesSearch =
        app.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.location.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesTab && matchesSearch;
    });

    if (sortBy === 'Title (A-Z)') {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    }
    // 'Recent' is already the default order (backend sorts by createdAt desc)

    return result;
  }, [applications, activeTab, searchTerm, sortBy]);

  const handleDownloadReport = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['Job Title,Company,Location,Salary,Applied Date,Status']
        .concat(
          applications.map(
            (a) =>
              `"${a.title}","${a.company}","${a.location}","${a.salary}","${a.appliedDate}","${a.status}"`
          )
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'My_Job_Applications.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleWithdraw = async (id: string) => {
    const result = await withdrawApplication(id);
    if (result.success) {
      await fetchApplications();
      setSelectedApp(null);
    } else {
      setErrorMessage(result.message || 'Failed to withdraw application');
    }
  };

  return {
    applications: filteredApps,
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
  };
};