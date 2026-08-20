import { useState, useEffect } from 'react';
import { getPublishedJobById } from '../services/findJobsService';
import type { PublicJob } from '../types';

export const useJobDetail = (jobId?: string) => {
  const [job, setJob] = useState<PublicJob | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!jobId) {
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    setIsLoading(true);
    setErrorMessage(null);

    getPublishedJobById(jobId).then((result) => {
      if (!isMounted) return;
      if (result.success && result.data) {
        setJob(result.data);
      } else {
        setErrorMessage(result.message || 'Job not found or no longer available');
      }
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [jobId]);

  return { job, isLoading, errorMessage };
};