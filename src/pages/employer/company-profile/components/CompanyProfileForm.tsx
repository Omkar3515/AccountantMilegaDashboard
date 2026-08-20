import React, { useState } from 'react';
import { X, Save, Plus, Trash2, Building2, MapPin, Users, Briefcase, Globe, Shield } from 'lucide-react';
import type {
  CompanyProfileData,
  CompanyAddressData,
  TeamMemberData,
  HiringPreferenceData,
  SocialLinkData,
  VerificationData,
} from '../services/employerService';
import { deleteTeamMember } from '../services/employerService';

interface CompanyProfileFormProps {
  initialProfile: CompanyProfileData | null;
  initialAddress: CompanyAddressData | null;
  initialTeamMembers: TeamMemberData[];
  initialHiringPreferences: HiringPreferenceData | null;
  initialSocialLinks: SocialLinkData | null;
  initialVerification: VerificationData | null;
  activeTabName?: string;
  onSave: (data: {
    profile: CompanyProfileData;
    address: CompanyAddressData;
    teamMembers: TeamMemberData[];
    hiringPreferences: HiringPreferenceData;
    socialLinks: SocialLinkData;
    verification: VerificationData;
  }) => Promise<void> | void;
  onClose: () => void;
}

const CompanyProfileForm: React.FC<CompanyProfileFormProps> = ({
  initialProfile,
  initialAddress,
  initialTeamMembers,
  initialHiringPreferences,
  initialSocialLinks,
  initialVerification,
  activeTabName = 'Company Information',
  onSave,
  onClose,
}) => {
  const getTabKey = (tab: string) => {
    if (tab.includes('Address')) return 'address';
    if (tab.includes('Team')) return 'team';
    if (tab.includes('Hiring')) return 'hiring';
    if (tab.includes('Social')) return 'social';
    if (tab.includes('Verification')) return 'verification';
    return 'basic';
  };

  const [activeFormTab, setActiveFormTab] = useState<'basic' | 'address' | 'team' | 'hiring' | 'social' | 'verification'>(
    getTabKey(activeTabName)
  );

  // State
  const [profile, setProfile] = useState<CompanyProfileData>({
    companyName: initialProfile?.companyName || '',
    tagline: initialProfile?.tagline || '',
    industry: initialProfile?.industry || '',
    companySize: initialProfile?.companySize || '',
    companyType: initialProfile?.companyType || '',
    establishmentYear: initialProfile?.establishmentYear || '',
    panNumber: initialProfile?.panNumber || '',
    registrationNumber: initialProfile?.registrationNumber || '',
    gstNumber: initialProfile?.gstNumber || '',
    website: initialProfile?.website || '',
    location: initialProfile?.location || '',
    description: initialProfile?.description || '',
    logoUrl: initialProfile?.logoUrl || '',
    bannerUrl: initialProfile?.bannerUrl || '',
  });

  const [address, setAddress] = useState<CompanyAddressData>({
    registeredAddress: initialAddress?.registeredAddress || '',
    city: initialAddress?.city || '',
    state: initialAddress?.state || '',
    pincode: initialAddress?.pincode || '',
    country: initialAddress?.country || 'India',
  });

  const [teamMembers, setTeamMembers] = useState<TeamMemberData[]>(initialTeamMembers || []);
  const [newMember, setNewMember] = useState<TeamMemberData>({
    name: '',
    designation: '',
    email: '',
    phone: '',
    role: 'Member',
  });

  const [hiring, setHiring] = useState<HiringPreferenceData>({
    preferredRoles: initialHiringPreferences?.preferredRoles || [],
    workModes: initialHiringPreferences?.workModes || [],
    experienceRange: initialHiringPreferences?.experienceRange || '',
    noticePeriod: initialHiringPreferences?.noticePeriod || '',
    primaryLocations: initialHiringPreferences?.primaryLocations || [],
  });

  const [rolesInput, setRolesInput] = useState(
    (initialHiringPreferences?.preferredRoles || []).join(', ')
  );
  const [locationsInput, setLocationsInput] = useState(
    (initialHiringPreferences?.primaryLocations || []).join(', ')
  );

  const [social, setSocial] = useState<SocialLinkData>({
    website: initialSocialLinks?.website || '',
    linkedin: initialSocialLinks?.linkedin || '',
    twitter: initialSocialLinks?.twitter || '',
    facebook: initialSocialLinks?.facebook || '',
    instagram: initialSocialLinks?.instagram || '',
  });

  const [verification, setVerification] = useState<VerificationData>({
    panNumber: initialVerification?.panNumber || '',
    gstNumber: initialVerification?.gstNumber || '',
    registrationNumber: initialVerification?.registrationNumber || '',
    contactEmail: initialVerification?.contactEmail || '',
    contactPhone: initialVerification?.contactPhone || '',
    status: initialVerification?.status || 'Pending Verification',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddTeamMember = () => {
    if (!newMember.name.trim()) return;
    const exists = teamMembers.some(
      (m) =>
        m.name.trim().toLowerCase() === newMember.name.trim().toLowerCase() &&
        (m.email.trim().toLowerCase() === newMember.email.trim().toLowerCase() ||
          m.designation.trim().toLowerCase() === newMember.designation.trim().toLowerCase())
    );
    if (!exists) {
      setTeamMembers([...teamMembers, { ...newMember, id: Date.now().toString() }]);
    }
    setNewMember({ name: '', designation: '', email: '', phone: '', role: 'Member' });
  };

  const handleRemoveTeamMember = async (index: number) => {
    const member = teamMembers[index];
    const memberId = member._id || member.id;
    // If member has a DB _id, call API to delete from backend
    if (member._id) {
      try {
        await deleteTeamMember(member._id);
      } catch (err) {
        console.error('Failed to delete team member from backend:', err);
      }
    }
    // Remove from local state regardless
    setTeamMembers((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleWorkMode = (mode: string) => {
    setHiring((prev) => {
      const exists = prev.workModes.includes(mode);
      return {
        ...prev,
        workModes: exists
          ? prev.workModes.filter((m) => m !== mode)
          : [...prev.workModes, mode],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formattedHiring: HiringPreferenceData = {
      ...hiring,
      preferredRoles: rolesInput
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      primaryLocations: locationsInput
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    };

    const finalMembers = [...teamMembers];
    if (newMember.name.trim()) {
      const exists = finalMembers.some(
        (m) =>
          m.name.trim().toLowerCase() === newMember.name.trim().toLowerCase() &&
          (m.email.trim().toLowerCase() === newMember.email.trim().toLowerCase() ||
            m.designation.trim().toLowerCase() === newMember.designation.trim().toLowerCase())
      );
      if (!exists) {
        finalMembers.push({ ...newMember, id: Date.now().toString() });
      }
    }

    const finalProfile: CompanyProfileData = {
      ...profile,
      panNumber: verification.panNumber || profile.panNumber,
      registrationNumber: verification.registrationNumber || profile.registrationNumber,
      gstNumber: verification.gstNumber || profile.gstNumber,
    };

    try {
      await onSave({
        profile: finalProfile,
        address,
        teamMembers: finalMembers,
        hiringPreferences: formattedHiring,
        socialLinks: social,
        verification,
      });
      onClose();
    } catch (err) {
      console.error('Error submitting company profile form:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4 overflow-y-auto font-sans">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Company Profile Form</h3>
            <p className="text-xs text-gray-500">Fill in your company details to display on your public profile</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection inside Form */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-gray-200 overflow-x-auto bg-white text-xs font-semibold">
          {[
            { id: 'basic', label: 'Basic Info', icon: Building2 },
            { id: 'address', label: 'Company Address', icon: MapPin },
            { id: 'team', label: 'Team Members', icon: Users },
            { id: 'hiring', label: 'Hiring Preferences', icon: Briefcase },
            { id: 'social', label: 'Social & Links', icon: Globe },
            { id: 'verification', label: 'Verification', icon: Shield },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeFormTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFormTab(tab.id as any)}
                className={`flex items-center gap-1.5 py-2.5 px-3 border-b-2 transition-colors whitespace-nowrap ${
                  isActive
                    ? 'border-brand-green text-brand-green font-bold'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: BASIC INFO */}
          {activeFormTab === 'basic' && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-gray-900 border-b pb-2">Basic Company Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={profile.companyName}
                    onChange={(e) => setProfile({ ...profile, companyName: e.target.value })}
                    placeholder="e.g. MS & Associates"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Tagline / Subtitle</label>
                  <input
                    type="text"
                    value={profile.tagline}
                    onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
                    placeholder="e.g. Chartered Accountants"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Industry</label>
                  <input
                    type="text"
                    value={profile.industry}
                    onChange={(e) => setProfile({ ...profile, industry: e.target.value })}
                    placeholder="e.g. Accounting / Financial Services"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Company Size</label>
                  <select
                    value={profile.companySize}
                    onChange={(e) => setProfile({ ...profile, companySize: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-green"
                  >
                    <option value="">Select size</option>
                    <option value="1-10 Employees">1-10 Employees</option>
                    <option value="11-50 Employees">11-50 Employees</option>
                    <option value="51-200 Employees">51-200 Employees</option>
                    <option value="201-500 Employees">201-500 Employees</option>
                    <option value="500+ Employees">500+ Employees</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Company Type</label>
                  <input
                    type="text"
                    value={profile.companyType}
                    onChange={(e) => setProfile({ ...profile, companyType: e.target.value })}
                    placeholder="e.g. Private Partnership Firm"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Year of Establishment</label>
                  <input
                    type="text"
                    value={profile.establishmentYear}
                    onChange={(e) => setProfile({ ...profile, establishmentYear: e.target.value })}
                    placeholder="e.g. 2015"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Location / Headquarter</label>
                  <input
                    type="text"
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    placeholder="e.g. Mumbai, Maharashtra, India"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Website URL</label>
                  <input
                    type="text"
                    value={profile.website}
                    onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                    placeholder="www.msassociates.com"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-green"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Company Description</label>
                <textarea
                  rows={4}
                  value={profile.description}
                  onChange={(e) => setProfile({ ...profile, description: e.target.value })}
                  placeholder="Provide a brief overview of your company..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-green"
                />
              </div>
            </div>
          )}

          {/* TAB 2: ADDRESS */}
          {activeFormTab === 'address' && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-gray-900 border-b pb-2">Company Registered Address</h4>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Registered Address Line</label>
                <textarea
                  rows={3}
                  value={address.registeredAddress}
                  onChange={(e) => setAddress({ ...address, registeredAddress: e.target.value })}
                  placeholder="Office No., Building name, Street, Area..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-green"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    placeholder="e.g. Mumbai"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">State</label>
                  <input
                    type="text"
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    placeholder="e.g. Maharashtra"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Pincode</label>
                  <input
                    type="text"
                    value={address.pincode}
                    onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                    placeholder="400069"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-green"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TEAM MEMBERS */}
          {activeFormTab === 'team' && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-gray-900 border-b pb-2">Add & Manage Team Members</h4>

              {/* Add New Team Member Box */}
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-3">
                <h5 className="text-xs font-bold text-gray-800">Add New Member</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={newMember.name}
                    onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                    placeholder="Full Name *"
                    className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs bg-white focus:outline-none focus:border-brand-green"
                  />
                  <input
                    type="text"
                    value={newMember.designation}
                    onChange={(e) => setNewMember({ ...newMember, designation: e.target.value })}
                    placeholder="Designation (e.g. Senior Partner)"
                    className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs bg-white focus:outline-none focus:border-brand-green"
                  />
                  <input
                    type="email"
                    value={newMember.email}
                    onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                    placeholder="Email Address"
                    className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs bg-white focus:outline-none focus:border-brand-green"
                  />
                  <input
                    type="text"
                    value={newMember.phone}
                    onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                    placeholder="Phone Number"
                    className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs bg-white focus:outline-none focus:border-brand-green"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddTeamMember}
                  className="flex items-center gap-1 px-3 py-1.5 bg-brand-green text-white rounded-lg text-xs font-bold hover:bg-brand-green/90 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Member
                </button>
              </div>

              {/* Team Members List */}
              <div className="space-y-2 pt-2">
                <h5 className="text-xs font-bold text-gray-700">Team Members List ({teamMembers.length})</h5>
                {teamMembers.length === 0 ? (
                  <p className="text-xs text-gray-400 italic">No team members added yet.</p>
                ) : (
                  teamMembers.map((member, idx) => (
                    <div
                      key={member.id || member._id || idx}
                      className="flex items-center justify-between p-3 border border-gray-100 bg-white rounded-lg shadow-sm"
                    >
                      <div>
                        <p className="text-xs font-bold text-gray-900">{member.name}</p>
                        <p className="text-[10px] text-gray-500">
                          {member.designation || 'No designation'} • {member.email || 'No email'}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveTeamMember(idx)}
                        className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 4: HIRING PREFERENCES */}
          {activeFormTab === 'hiring' && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-gray-900 border-b pb-2">Company Hiring Preferences</h4>
              
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Preferred Job Roles (comma separated)
                </label>
                <input
                  type="text"
                  value={rolesInput}
                  onChange={(e) => setRolesInput(e.target.value)}
                  placeholder="e.g. Senior Accountant, Tax Consultant, Audit Manager"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-green"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">Work Modes Offered</label>
                <div className="flex flex-wrap gap-4 text-xs font-medium text-gray-700">
                  {['Full-time', 'Part-time', 'Work From Home', 'Hybrid', 'Contract'].map((mode) => (
                    <label key={mode} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hiring.workModes.includes(mode)}
                        onChange={() => toggleWorkMode(mode)}
                        className="rounded border-gray-300 text-brand-green focus:ring-brand-green"
                      />
                      {mode}
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Target Experience Range</label>
                  <input
                    type="text"
                    value={hiring.experienceRange}
                    onChange={(e) => setHiring({ ...hiring, experienceRange: e.target.value })}
                    placeholder="e.g. 2 - 5 Years"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Expected Notice Period</label>
                  <input
                    type="text"
                    value={hiring.noticePeriod}
                    onChange={(e) => setHiring({ ...hiring, noticePeriod: e.target.value })}
                    placeholder="e.g. 15 to 30 Days"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-green"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Primary Hiring Locations (comma separated)
                </label>
                <input
                  type="text"
                  value={locationsInput}
                  onChange={(e) => setLocationsInput(e.target.value)}
                  placeholder="e.g. Mumbai, Pune, Remote"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-green"
                />
              </div>
            </div>
          )}

          {/* TAB 5: SOCIAL LINKS */}
          {activeFormTab === 'social' && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-gray-900 border-b pb-2">Social & Online Presence Links</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Website URL</label>
                  <input
                    type="text"
                    value={social.website}
                    onChange={(e) => setSocial({ ...social, website: e.target.value })}
                    placeholder="https://www.msassociates.com"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">LinkedIn Profile</label>
                  <input
                    type="text"
                    value={social.linkedin}
                    onChange={(e) => setSocial({ ...social, linkedin: e.target.value })}
                    placeholder="https://linkedin.com/company/msassociates"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Twitter / X Handle</label>
                  <input
                    type="text"
                    value={social.twitter}
                    onChange={(e) => setSocial({ ...social, twitter: e.target.value })}
                    placeholder="https://twitter.com/msassociates"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Facebook Page</label>
                  <input
                    type="text"
                    value={social.facebook}
                    onChange={(e) => setSocial({ ...social, facebook: e.target.value })}
                    placeholder="https://facebook.com/msassociates"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Instagram Handle</label>
                  <input
                    type="text"
                    value={social.instagram}
                    onChange={(e) => setSocial({ ...social, instagram: e.target.value })}
                    placeholder="https://instagram.com/msassociates"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-green"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: VERIFICATION */}
          {activeFormTab === 'verification' && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-gray-900 border-b pb-2">Business Verification Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Company PAN Number</label>
                  <input
                    type="text"
                    value={verification.panNumber}
                    onChange={(e) => setVerification({ ...verification, panNumber: e.target.value })}
                    placeholder="AAAFM1234A"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">GST Number</label>
                  <input
                    type="text"
                    value={verification.gstNumber}
                    onChange={(e) => setVerification({ ...verification, gstNumber: e.target.value })}
                    placeholder="27AAAFM1234A1Z5"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Business Registration Number</label>
                  <input
                    type="text"
                    value={verification.registrationNumber}
                    onChange={(e) =>
                      setVerification({ ...verification, registrationNumber: e.target.value })
                    }
                    placeholder="1234567890"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Official Contact Email</label>
                  <input
                    type="email"
                    value={verification.contactEmail}
                    onChange={(e) => setVerification({ ...verification, contactEmail: e.target.value })}
                    placeholder="contact@msassociates.com"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Official Contact Phone</label>
                  <input
                    type="tel"
                    value={verification.contactPhone}
                    onChange={(e) => setVerification({ ...verification, contactPhone: e.target.value })}
                    placeholder="+91 9876543210"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-green"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Form Actions Footer */}
          <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-5 py-2 bg-brand-green text-white rounded-lg text-xs font-bold hover:bg-brand-green/90 shadow-sm transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {isSubmitting ? 'Saving Information...' : 'Save Profile Information'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyProfileForm;
