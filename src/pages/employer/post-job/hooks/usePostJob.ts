import { useState, useEffect } from 'react';
import { getJobById } from '../services/jobService';
import type { JobFormData } from '../types';

interface UsePostJobResult {
  initialData: Partial<JobFormData> | undefined;
  isLoading: boolean;
}

// When mode is "edit", fetches the existing job's data by ID so the
// form can be pre-filled. When mode is "create" (or no jobId), does
// nothing and returns immediately.
export const usePostJob = (
  mode: 'create' | 'edit',
  jobId?: string
): UsePostJobResult => {
  const [initialData, setInitialData] = useState<Partial<JobFormData> | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(mode === 'edit' && Boolean(jobId));

  useEffect(() => {
    if (mode !== 'edit' || !jobId) {
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    setIsLoading(true);

    getJobById(jobId).then((data) => {
      if (!isMounted) return;
      if (data) setInitialData(data);
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [mode, jobId]);

  return { initialData, isLoading };
};