import { useState, useEffect, useCallback } from 'react';
import {
  getResumeSummary,
  uploadResume as uploadResumeApi,
  deleteResume as deleteResumeApi,
  toggleVisibility as toggleVisibilityApi,
} from '../services/resumeService';
import type { ResumeSummary } from '../types';

export const useResume = () => {
  const [summary, setSummary] = useState<ResumeSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchSummary = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);
    const result = await getResumeSummary();
    if (result.success && result.data) {
      setSummary(result.data as ResumeSummary);
    } else {
      setErrorMessage(result.message || 'Failed to load resume');
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    setErrorMessage(null);
    const result = await uploadResumeApi(file);
    if (result.success) {
      await fetchSummary();
    } else {
      setErrorMessage(result.message || 'Failed to upload resume');
    }
    setIsUploading(false);
    return result;
  };

  const handleDelete = async () => {
    const result = await deleteResumeApi();
    if (result.success) {
      await fetchSummary();
    } else {
      setErrorMessage(result.message || 'Failed to delete resume');
    }
    return result;
  };

  const handleToggleVisibility = async () => {
    if (!summary) return;
    const newValue = !summary.isPublic;
    // optimistic update
    setSummary({ ...summary, isPublic: newValue });
    const result = await toggleVisibilityApi(newValue);
    if (!result.success) {
      // revert on failure
      setSummary({ ...summary, isPublic: !newValue });
      setErrorMessage(result.message || 'Failed to update visibility');
    }
  };

  return {
    summary,
    isLoading,
    isUploading,
    errorMessage,
    handleUpload,
    handleDelete,
    handleToggleVisibility,
    refetch: fetchSummary,
  };
};