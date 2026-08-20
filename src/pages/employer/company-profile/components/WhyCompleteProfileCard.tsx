import React from 'react';
import { Users, Shield, Star, Award } from 'lucide-react';

const WhyCompleteProfileCard: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <h3 className="text-sm font-bold text-gray-900 mb-4">Why Complete Your Profile?</h3>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
            <Users className="w-4 h-4 text-blue-500" />
          </div>
          <span className="text-xs text-gray-700">Get 3X more quality applications</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
            <Shield className="w-4 h-4 text-blue-500" />
          </div>
          <span className="text-xs text-gray-700">Build trust with candidates</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
            <Star className="w-4 h-4 text-blue-500" />
          </div>
          <span className="text-xs text-gray-700">Showcase your brand</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
            <Award className="w-4 h-4 text-blue-500" />
          </div>
          <span className="text-xs text-gray-700">Stand out from competitors</span>
        </div>
      </div>
    </div>
  );
};

export default WhyCompleteProfileCard;
