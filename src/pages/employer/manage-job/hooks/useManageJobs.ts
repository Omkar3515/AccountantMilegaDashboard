import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  getMyJobs,
  pauseJob as pauseJobApi,
  resumeJob as resumeJobApi,
  closeJob as closeJobApi,
  deleteJob as deleteJobApi,
} from '../../post-job/services/jobService'; // adjust relative path to your actual post-job folder
import type { ManagedJob, JobStatus } from '../types';

const PAGE_SIZE = 5;

export const useManageJobs = () => {
  const [jobs, setJobs] = useState<ManagedJob[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | JobStatus>('All');
  const [deptFilter, setDeptFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const fetchJobs = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);
    const result = await getMyJobs();
    if (result.success && result.data) {
      setJobs(result.data as unknown as ManagedJob[]);
    } else {
      setErrorMessage(result.message || 'Failed to load jobs');
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesQuery =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (job.department || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (job.location || '').toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'All' || job.status === statusFilter;
      const matchesDept = deptFilter === 'All' || job.department === deptFilter;

      return matchesQuery && matchesStatus && matchesDept;
    });
  }, [jobs, searchQuery, statusFilter, deptFilter]);

  const paginatedJobs = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredJobs.slice(start, start + PAGE_SIZE);
  }, [filteredJobs, currentPage]);

  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / PAGE_SIZE));

  // Counts for the 4 stat cards — derived from the FULL job list (not filtered)
  const stats = useMemo(() => {
    return {
      total: jobs.length,
      active: jobs.filter((j) => j.status === 'published').length,
      paused: jobs.filter((j) => j.status === 'paused').length,
      closed: jobs.filter((j) => j.status === 'closed').length,
    };
  }, [jobs]);

  const runAction = async (
    id: string,
    apiCall: (id: string) => Promise<{ success: boolean; message?: string }>
  ) => {
    setActionLoadingId(id);
    const result = await apiCall(id);
    if (result.success) {
      await fetchJobs(); // refresh list after a successful action
    } else {
      setErrorMessage(result.message || 'Action failed');
    }
    setActionLoadingId(null);
  };

  const handlePause = (id: string) => runAction(id, pauseJobApi);
  const handleResume = (id: string) => runAction(id, resumeJobApi);
  const handleClose = (id: string) => runAction(id, closeJobApi);
  const handleDelete = (id: string) => runAction(id, deleteJobApi);

  return {
    jobs: paginatedJobs,
    totalFilteredCount: filteredJobs.length,
    totalJobsCount: jobs.length,
    isLoading,
    errorMessage,
    stats,

    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    deptFilter,
    setDeptFilter,

    currentPage,
    setCurrentPage,
    totalPages,

    actionLoadingId,
    handlePause,
    handleResume,
    handleClose,
    handleDelete,
    refetch: fetchJobs,
  };
};