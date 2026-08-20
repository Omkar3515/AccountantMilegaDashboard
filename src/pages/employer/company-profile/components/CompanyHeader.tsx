import React from 'react';
import { Eye, Edit3, PlusCircle } from 'lucide-react';

interface CompanyHeaderProps {
  isProfileCreated?: boolean;
  onOpenForm: () => void;
}

const CompanyHeader: React.FC<CompanyHeaderProps> = ({
  isProfileCreated = false,
  onOpenForm,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-2">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Company Profile</h2>
        <p className="text-sm text-gray-500">Manage your company information and hiring preferences.</p>
      </div>
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 bg-white rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 shadow-sm transition-colors">
          <Eye className="w-4 h-4 text-gray-500" />
          View Company Page
        </button>
        <button
          onClick={onOpenForm}
          className="flex items-center gap-2 px-4 py-2 bg-brand-green text-white rounded-lg text-sm font-bold hover:bg-brand-green/90 shadow-sm shadow-brand-green/20 transition-colors"
        >
          {isProfileCreated ? (
            <>
              <Edit3 className="w-4 h-4" />
              Edit Profile
            </>
          ) : (
            <>
              <PlusCircle className="w-4 h-4" />
              Create Company Profile
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CompanyHeader;
