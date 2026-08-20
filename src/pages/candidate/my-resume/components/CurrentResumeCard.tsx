import React from 'react';
import { AlertCircle, CheckCircle2, Download, Eye, FileText, MoreVertical } from 'lucide-react';
import type { ResumeSummary } from '../types';
import { downloadFile } from '../../../../utils/download';

interface CurrentResumeCardProps {
    summary: ResumeSummary | null;
    onDelete: () => void;
}

const formatFileSize = (bytes: number): string => {
    if (!bytes) return '0 KB';
    const kb = bytes / 1024;
    return kb < 1024 ? `${Math.round(kb)} KB` : `${(kb / 1024).toFixed(1)} MB`;
};

const formatDate = (dateStr: string | null): string => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
};

const CurrentResumeCard: React.FC<CurrentResumeCardProps> = ({ summary, onDelete }) => {
    const hasResume = Boolean(summary?.resumeUrl);
    const isPublic = summary?.isPublic ?? false;

    const handleDeleteClick = () => {
        if (window.confirm('Are you sure you want to delete your resume? This cannot be undone.')) {
            onDelete();
        }
    };

    return (
        <section className="resume-card bg-white border border-slate-200 rounded-xl p-5">
            {hasResume ? (
                <>
                    <h2 className="font-bold">
                        Current Resume{' '}
                        <span
                            className={`ml-3 text-xs rounded-full px-3 py-1 font-medium ${isPublic
                                    ? 'text-emerald-700 bg-emerald-100'
                                    : 'text-amber-700 bg-amber-100'
                                }`}
                        >
                            {isPublic ? 'Active' : 'Inactive'}
                        </span>
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-5 mt-5 items-center">
                        <div className="w-19 h-20 rounded-xl bg-blue-50 text-red-500 grid place-items-center">
                            <FileText className="w-9 h-9" />
                            <span className="text-[10px] font-bold -mt-5">PDF</span>
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold text-sm">{summary!.resumeFileName}</p>
                            <p className="text-xs text-slate-500 mt-3">
                                Uploaded on {formatDate(summary!.resumeUploadedAt)} • {formatFileSize(summary!.resumeFileSize)}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <a
                                href={summary!.resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="border border-slate-200 rounded-lg px-4 py-2 text-sm flex items-center"
                            >
                                <Eye className="w-4 h-4 mr-2" /> Preview
                            </a>
                            <button
                                type="button"
                                onClick={() => downloadFile(summary!.resumeUrl, summary!.resumeFileName)}
                                className="border border-slate-200 rounded-lg px-4 py-2 text-sm flex items-center hover:bg-slate-50 transition-colors"
                            >
                                <Download className="w-4 h-4 mr-2" /> Download
                            </button>
                            <button onClick={handleDeleteClick} title="Delete Resume" className="p-2 text-slate-400 hover:text-rose-600">
                                <MoreVertical className="mt-1" />
                            </button>
                        </div>
                    </div>
                    {isPublic ? (
                        <div className="mt-5 p-4 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-medium">
                            <CheckCircle2 className="w-4 h-4 inline mr-2" />
                            Your resume is active and visible to employers.
                        </div>
                    ) : (
                        <div className="mt-5 p-4 bg-amber-50 text-amber-800 rounded-lg text-xs font-medium">
                            <AlertCircle className="w-4 h-4 inline mr-2" />
                            Your resume is inactive and hidden from employers.
                        </div>
                    )}
                </>
            ) : (
                <div className="p-8 border-2 border-dashed border-slate-200 rounded-xl text-center">
                    <FileText className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-slate-700">No resume uploaded yet</p>
                    <p className="text-xs text-slate-400 mt-1">
                        Upload a PDF or Word document to get started.
                    </p>
                </div>
            )}
        </section>
    );
};

export default CurrentResumeCard;