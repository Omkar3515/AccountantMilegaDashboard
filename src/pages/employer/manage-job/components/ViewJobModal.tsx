import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { getJobById } from '../../post-job/services/jobService'; // adjust path to your post-job folder
import JobPreview from '../../post-job/components/JobPreview'; // reusing the existing preview component
import type { JobFormData } from '../../post-job/types';

interface ViewJobModalProps {
  jobId: string;
  onClose: () => void;
}

const ViewJobModal: React.FC<ViewJobModalProps> = ({ jobId, onClose }) => {
  const [job, setJob] = useState<JobFormData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    getJobById(jobId).then((data) => {
      if (isMounted) {
        setJob(data);
        setIsLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [jobId]);

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
          <h2 className="text-lg font-bold text-gray-900">Job Preview</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {isLoading ? (
            <p className="text-center text-sm text-gray-400 py-10">Loading job details...</p>
          ) : job ? (
            <JobPreview formData={job} />
          ) : (
            <p className="text-center text-sm text-rose-500 py-10">Job not found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewJobModal;