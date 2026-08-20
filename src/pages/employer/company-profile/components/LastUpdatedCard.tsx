import React from 'react';
import { Calendar } from 'lucide-react';

interface LastUpdatedCardProps {
  date?: string;
}

const LastUpdatedCard: React.FC<LastUpdatedCardProps> = ({ date = "20 May 2025" }) => {
  return (
    <div className="bg-brand-light rounded-2xl border border-brand-green/10 p-4 flex items-start gap-3">
      <Calendar className="w-5 h-5 text-brand-green mt-0.5" />
      <div>
        <p className="text-xs text-gray-500">Profile last updated on</p>
        <p className="text-sm font-bold text-gray-900 mt-0.5">{date}</p>
      </div>
    </div>
  );
};

export default LastUpdatedCard;
