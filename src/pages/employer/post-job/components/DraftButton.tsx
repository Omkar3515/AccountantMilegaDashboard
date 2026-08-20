import React from 'react';
import { Calendar } from 'lucide-react';

interface DraftButtonProps {
  onClick?: () => void;
  isLoading?: boolean;
}

const DraftButton: React.FC<DraftButtonProps> = ({ onClick, isLoading }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isLoading}
      className="flex items-center gap-2 px-4 py-2 border border-gray-200 bg-white rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 shadow-sm transition-colors disabled:opacity-50"
    >
      <Calendar className="w-4 h-4 text-gray-500" />
      {isLoading ? 'Saving...' : 'Save as Draft'}
    </button>
  );
};

export default DraftButton;
