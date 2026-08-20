import React from 'react';
import { Building2, Image as ImageIcon, CheckCircle2, MapPin, Calendar, Users, Briefcase, FileText, Globe, Edit3 } from 'lucide-react';
import type { CompanyProfileData, VerificationData } from '../services/employerService';

interface CompanyInformationCardProps {
  profile: CompanyProfileData | null;
  verification?: VerificationData | null;
  onEdit?: () => void;
}

const CompanyInformationCard: React.FC<CompanyInformationCardProps> = ({ profile, verification, onEdit }) => {
  const companyName = profile?.companyName || '-';
  const tagline = profile?.tagline || '-';
  const location = profile?.location || '-';
  const establishmentYear = profile?.establishmentYear ? `Founded in ${profile.establishmentYear}` : '-';
  const companySize = profile?.companySize || '-';
  const description = profile?.description || 'No description provided yet.';

  const details = [
    { label: 'Industry', value: profile?.industry || '-', icon: Building2 },
    { label: 'Company Size', value: profile?.companySize || '-', icon: Users },
    { label: 'Company Type', value: profile?.companyType || '-', icon: Briefcase },
    { label: 'Year of Establishment', value: profile?.establishmentYear || '-', icon: Calendar },
    { label: 'PAN Number', value: verification?.panNumber || profile?.panNumber || '-', icon: FileText },
    { label: 'Registration Number', value: verification?.registrationNumber || profile?.registrationNumber || '-', icon: FileText },
    { label: 'GST Number', value: verification?.gstNumber || profile?.gstNumber || '-', icon: FileText },
    { label: 'Website', value: profile?.website || '-', icon: Globe, link: Boolean(profile?.website) },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 relative">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-gray-400" /> Company Information
        </h3>
        {onEdit && (
          <button
            onClick={onEdit}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" /> Edit
          </button>
        )}
      </div>

      <div className="flex items-start gap-6 mb-8">
        <div className="relative">
          <div className="w-24 h-24 bg-brand-light text-brand-green rounded-xl flex items-center justify-center text-3xl font-bold border border-brand-green/20">
            {companyName !== '-' ? companyName.substring(0, 2).toUpperCase() : 'CP'}
          </div>
          <button className="absolute -bottom-2 -right-2 bg-white p-1.5 rounded-full border border-gray-200 text-brand-green shadow-sm hover:bg-gray-50">
            <ImageIcon className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h4 className="text-xl font-bold text-gray-900">{companyName}</h4>
            {profile?.isVerified && (
              <span className="flex items-center gap-1 text-[10px] font-bold text-brand-green bg-brand-light px-2 py-0.5 rounded-full border border-brand-green/20">
                <CheckCircle2 className="w-3 h-3" /> Verified Company
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 mb-3">{tagline}</p>
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {location}</span>
            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {establishmentYear}</span>
            <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> {companySize}</span>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h4 className="text-sm font-bold text-gray-900 mb-2">Company Description</h4>
        <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
        {details.map((detail, idx) => {
          const Icon = detail.icon;
          return (
            <div key={idx} className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs text-gray-500">
                <Icon className="w-3.5 h-3.5" /> {detail.label}
              </span>
              {detail.link && detail.value !== '-' ? (
                <a
                  href={detail.value.startsWith('http') ? detail.value : `http://${detail.value}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold text-brand-green hover:underline"
                >
                  {detail.value}
                </a>
              ) : (
                <span className="text-xs font-medium text-gray-900">{detail.value}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CompanyInformationCard;
