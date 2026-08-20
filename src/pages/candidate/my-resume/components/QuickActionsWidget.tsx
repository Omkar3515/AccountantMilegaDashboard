import React from 'react';
import { Download, Edit3, Share2, Star, Trash2 } from 'lucide-react';

interface QuickActionsWidgetProps {
  hasResume: boolean;
  onEditProfile: () => void;
  onDownload: () => void;
  onDelete: () => void;
}

const QuickActionsWidget: React.FC<QuickActionsWidgetProps> = ({
  hasResume,
  onEditProfile,
  onDownload,
  onDelete,
}) => {
  const actions: [any, string, string, () => void][] = [
    [Edit3, 'Edit Profile', 'Update skills, experience', onEditProfile],
    [Star, 'Add Skills', 'Update your skills', onEditProfile],
    [Download, 'Download PDF', 'Save your resume', onDownload],
    [Share2, 'Share Resume', 'Share with others', onDownload],
  ];

  const handleDeleteClick = () => {
    if (window.confirm('Are you sure you want to delete your resume? This cannot be undone.')) {
      onDelete();
    }
  };

  return (
    <section className="resume-card bg-white border border-slate-200 rounded-xl p-5">
      <h2 className="font-bold">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-3 mt-5">
        {actions.map(([Icon, title, sub, onClick]) => (
          <button
            key={title}
            onClick={onClick}
            className="text-left bg-slate-50 border border-slate-100 rounded-lg p-3"
          >
            <Icon className="w-5 h-5 text-blue-700" />
            <p className="text-xs font-semibold mt-2">{title}</p>
            <p className="text-[10px] text-slate-500 mt-1">{sub}</p>
          </button>
        ))}
      </div>
      {hasResume && (
        <button
          onClick={handleDeleteClick}
          className="w-full mt-5 text-left bg-red-50 border border-red-100 text-red-600 rounded-lg p-3 text-sm font-semibold hover:bg-red-100 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Trash2 className="w-4 h-4 flex-shrink-0" />
            <div>
              <div>Delete Resume</div>
              <p className="text-[10px] font-normal mt-1 text-red-500">Remove current resume</p>
            </div>
          </div>
        </button>
      )}
    </section>
  );
};

export default QuickActionsWidget;