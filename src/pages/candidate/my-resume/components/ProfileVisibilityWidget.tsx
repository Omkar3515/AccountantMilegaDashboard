import React from 'react';
import { Eye } from 'lucide-react';

interface ProfileVisibilityWidgetProps {
  isPublic: boolean;
  onToggle: () => void;
}

const ProfileVisibilityWidget: React.FC<ProfileVisibilityWidgetProps> = ({
  isPublic,
  onToggle,
}) => {
  return (
    <section className="resume-card bg-white border border-slate-200 rounded-xl p-5">
      <h2 className="font-bold text-sm">
        <Eye className="w-4 h-4 inline text-blue-700 mr-3" />
        Profile Visibility
      </h2>
      <div className="flex justify-between items-center mt-5 text-xs text-slate-600">
        {isPublic ? 'Your resume is visible to employers.' : 'Your resume is hidden from employers.'}
        <button
          onClick={onToggle}
          className={`w-11 h-6 rounded-full p-1 transition-colors ${
            isPublic ? 'bg-emerald-600' : 'bg-slate-300'
          }`}
        >
          <span
            className={`block w-4 h-4 rounded-full bg-white transition-transform ${
              isPublic ? 'ml-auto' : ''
            }`}
          />
        </button>
      </div>
      {!isPublic && (
        <div className="mt-5 p-3 bg-blue-50 text-xs rounded-lg">
          Make your profile public to increase your chances of getting hired.
        </div>
      )}
    </section>
  );
};

export default ProfileVisibilityWidget;