import React from 'react';
import { Briefcase, MapPin, Clock, Award, Edit3 } from 'lucide-react';
import type { HiringPreferenceData } from '../services/employerService';

interface HiringPreferencesProps {
  preferences: HiringPreferenceData | null;
  onEdit?: () => void;
}

const HiringPreferences: React.FC<HiringPreferencesProps> = ({ preferences, onEdit }) => {
  const roles = preferences?.preferredRoles || [];
  const modes = preferences?.workModes || [];
  const locations = preferences?.primaryLocations || [];
  const experience = preferences?.experienceRange || '-';
  const noticePeriod = preferences?.noticePeriod || '-';

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-gray-400" /> Hiring Preferences
        </h3>
        {onEdit && (
          <button
            onClick={onEdit}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" /> Edit Preferences
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Preferred Roles</h4>
          {roles.length === 0 ? (
            <p className="text-sm text-gray-400 italic">-</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {roles.map((role, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-brand-light text-brand-green border border-brand-green/20 rounded-lg text-xs font-semibold"
                >
                  {role}
                </span>
              ))}
            </div>
          )}
        </div>

        <div>
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Work Modes</h4>
          {modes.length === 0 ? (
            <p className="text-sm text-gray-400 italic">-</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {modes.map((mode, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-blue-50 text-blue-600 border border-blue-100 rounded-lg text-xs font-semibold"
                >
                  {mode}
                </span>
              ))}
            </div>
          )}
        </div>

        <div>
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Target Experience</h4>
          <p className="text-sm font-semibold text-gray-900 flex items-center gap-2">
            <Award className="w-4 h-4 text-gray-400" /> {experience}
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Expected Notice Period</h4>
          <p className="text-sm font-semibold text-gray-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-400" /> {noticePeriod}
          </p>
        </div>

        <div className="md:col-span-2">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Primary Hiring Locations</h4>
          {locations.length === 0 ? (
            <p className="text-sm text-gray-400 italic">-</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {locations.map((loc, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-semibold flex items-center gap-1"
                >
                  <MapPin className="w-3 h-3 text-gray-400" /> {loc}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HiringPreferences;
