import React, { useEffect, useState } from 'react';
import { Calendar, MapPin, Check } from 'lucide-react';
import type { JobFormData } from '../types';
import { fetchEmployerProfile, getCachedProfileData } from '../../company-profile/services/employerService';
import { getStoredUser } from '../../../../services/authService';

interface JobPreviewProps {
  formData?: JobFormData;
  companyName?: string; // pass this in from the real CompanyProfile or let component fetch dynamically
}

const PLACEHOLDER = '—';

const JobPreview: React.FC<JobPreviewProps> = ({ formData, companyName: propCompanyName }) => {
  const [companyName, setCompanyName] = useState<string>(() => {
    if (propCompanyName?.trim()) return propCompanyName.trim();
    const cached = getCachedProfileData();
    if (cached?.profile?.companyName?.trim()) return cached.profile.companyName.trim();
    const user = getStoredUser();
    return user?.fullName || '';
  });

  useEffect(() => {
    if (propCompanyName?.trim()) {
      setCompanyName(propCompanyName.trim());
      return;
    }

    let isMounted = true;
    const loadCompanyProfile = async () => {
      const cached = getCachedProfileData();
      if (cached?.profile?.companyName?.trim() && isMounted) {
        setCompanyName(cached.profile.companyName.trim());
      }

      try {
        const fullProfile = await fetchEmployerProfile();
        if (fullProfile?.profile?.companyName?.trim() && isMounted) {
          setCompanyName(fullProfile.profile.companyName.trim());
        }
      } catch {
        // Fallback to cached or user full name
      }
    };

    loadCompanyProfile();
    return () => {
      isMounted = false;
    };
  }, [propCompanyName]);

  // Show blank ("—") until the employer actually fills each field
  const displayTitle = formData?.title?.trim() || PLACEHOLDER;
  const displayCompanyName = companyName?.trim() || PLACEHOLDER;
  const displayLocation = formData?.location?.trim()
    ? formData.location
    : formData?.isWorkFromHome
    ? 'Work From Home'
    : PLACEHOLDER;
  const displayType = formData?.employmentType || PLACEHOLDER;
  const displayExperience =
    formData?.experience && formData.experience !== 'Select Experience'
      ? formData.experience
      : PLACEHOLDER;
  const displayOpenings = formData?.openings ?? PLACEHOLDER;

  const candidateChecklist = [
    'Job title and description',
    'Role and responsibilities',
    'Requirements and skills',
    'Experience and location',
    'Company information',
  ];

  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">
        <h3 className="text-lg font-bold text-gray-900 mb-1">Job Preview</h3>
        <p className="text-sm text-gray-500 mb-6">
          This is how your job will appear to candidates.
        </p>

        {/* Preview Card */}
        <div className="border border-gray-200 rounded-xl p-4 mb-6 relative">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-brand-light rounded-lg border border-brand-green/20 flex items-center justify-center shrink-0">
              <Calendar className="w-6 h-6 text-brand-green" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">{displayTitle}</h4>
              <p className="text-xs text-gray-600 mt-0.5">{displayCompanyName}</p>
              <div className="flex items-center gap-2 text-[10px] text-gray-500 mt-1">
                <span>{displayLocation}</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span>{displayType}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-gray-500 border-t border-gray-100 pt-3">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {displayExperience}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              Posted just now
            </div>
          </div>
        </div>

        {/* Key Details Summary */}
        <div className="mb-6">
          <h4 className="text-xs font-bold text-gray-900 mb-3">Key Details</h4>
          <div className="space-y-3">
            <div className="flex justify-between text-xs">
              <span className="text-gray-500 flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5" /> Employment Type
              </span>
              <span className="font-medium text-gray-900">{displayType}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500 flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5" /> Experience
              </span>
              <span className="font-medium text-gray-900">{displayExperience}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" /> Location
              </span>
              <span className="font-medium text-gray-900">{displayLocation}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500 flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5" /> Openings
              </span>
              <span className="font-medium text-gray-900">{displayOpenings}</span>
            </div>
          </div>
        </div>

        {/* Checklist */}
        <div>
          <h4 className="text-xs font-bold text-gray-900 mb-3">
            What candidates will see
          </h4>
          <div className="space-y-2">
            {candidateChecklist.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-brand-green" />
                <span className="text-xs text-gray-600">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-100 text-center">
          <p className="text-[10px] text-gray-400">
            Edit details on each step to update the preview.
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobPreview;