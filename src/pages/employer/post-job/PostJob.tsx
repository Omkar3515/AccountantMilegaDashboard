import React from 'react';
import CreateJobForm from './CreateJobForm';
import { usePostJob } from './hooks/usePostJob';

interface PostJobProps {
  mode?: 'create' | 'edit';
  jobId?: string;
}

const PostJob: React.FC<PostJobProps> = ({ mode = 'create', jobId }) => {
  const { initialData, isLoading } = usePostJob(mode, jobId);

  if (mode === 'edit' && isLoading) {
    return (
      <div className="max-w-7xl mx-auto py-16 text-center text-gray-400 text-sm">
        Loading job details...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500 font-sans">
      <CreateJobForm mode={mode} initialData={initialData} />
    </div>
  );
};

export default PostJob;