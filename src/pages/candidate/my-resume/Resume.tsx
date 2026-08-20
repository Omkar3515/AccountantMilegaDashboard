import React, { useRef } from 'react';
import { Eye, UploadCloud } from 'lucide-react';
import CurrentResumeCard from './components/CurrentResumeCard';
import ResumeStrengthCard from './components/ResumeStrengthCard';
import ResumeSectionsCard from './components/ResumeSectionsCard';
import ResumeTipsWidget from './components/ResumeTipsWidget';
import ProfileVisibilityWidget from './components/ProfileVisibilityWidget';
import QuickActionsWidget from './components/QuickActionsWidget';
import { useResume } from './hooks/useResume';
import { downloadFile } from '../../../utils/download';

interface ResumeProps {
  onNavigate?: (page: string) => void;
}

const Resume: React.FC<ResumeProps> = ({ onNavigate }) => {
  const {
    summary,
    isLoading,
    isUploading,
    errorMessage,
    handleUpload,
    handleDelete,
    handleToggleVisibility,
  } = useResume();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const hasResume = Boolean(summary?.resumeUrl);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
    e.target.value = '';
  };

  if (isLoading) {
    return (
      <div className="max-w-[1220px] mx-auto py-16 text-center text-slate-400 text-sm">
        Loading resume...
      </div>
    );
  }

  return (
    <div className="resume-page max-w-[1220px] mx-auto">
      {/* Header — outside any card, like the original design */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">My Resume</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your resume and increase your chances of getting hired.
          </p>
        </div>
        <div className="flex gap-3">
          {hasResume && (
            <a
              href={summary!.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-blue-500 text-blue-700 rounded-lg px-5 py-3 text-sm font-semibold flex items-center"
            >
              <Eye className="w-4 h-4 mr-2" /> Preview Resume
            </a>
          )}
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="bg-blue-700 text-white rounded-lg px-5 py-3 text-sm font-semibold flex items-center disabled:opacity-60"
          >
            <UploadCloud className="w-4 h-4 mr-2" />
            {isUploading ? 'Uploading...' : hasResume ? 'Upload New Resume' : 'Upload Resume'}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>

      {errorMessage && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl px-4 py-3 mt-4">
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-[1.8fr_.95fr] gap-5 mt-7">
        <div className="space-y-5">
          <CurrentResumeCard summary={summary} onDelete={handleDelete} />

          {summary && (
            <>
              <ResumeStrengthCard
                strengthScore={summary.strengthScore}
                sections={summary.sections}
              />
              <ResumeSectionsCard
                sections={summary.sections}
                onEditSection={() => onNavigate?.('profile')}
              />
            </>
          )}
        </div>

        <aside className="space-y-5">
          {summary && (
            <>
              <ResumeTipsWidget
                sections={summary.sections}
                strengthScore={summary.strengthScore}
              />
              <ProfileVisibilityWidget
                isPublic={summary.isPublic}
                onToggle={handleToggleVisibility}
              />
            </>
          )}
          <QuickActionsWidget
            hasResume={hasResume}
            onEditProfile={() => onNavigate?.('profile')}
            onDownload={() => {
              if (summary?.resumeUrl) {
                downloadFile(summary.resumeUrl, summary.resumeFileName);
              }
            }}
            onDelete={handleDelete}
          />
        </aside>
      </div>
    </div>
  );
};

export default Resume;