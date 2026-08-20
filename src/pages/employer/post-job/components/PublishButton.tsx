import React from 'react';
import { Eye } from 'lucide-react';

interface PublishButtonProps {
  onClick?: () => void;
  isLoading?: boolean;
  label?: string;
}

const PublishButton: React.FC<PublishButtonProps> = ({
  onClick,
  isLoading,
  label = 'Preview Job',
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isLoading}
      className="flex items-center gap-2 px-4 py-2 bg-brand-green text-white rounded-lg text-sm font-bold hover:bg-brand-green/90 shadow-sm shadow-brand-green/20 transition-colors disabled:opacity-50"
    >
      <Eye className="w-4 h-4" />
      {isLoading ? 'Processing...' : label}
    </button>
  );
};

export default PublishButton;
