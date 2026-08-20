import React, { useEffect, useState } from 'react';
import CompanyHeader from './components/CompanyHeader';
import CompanyTabs from './components/CompanyTabs';
import CompanyInformationCard from './components/CompanyInformationCard';
import CompanyAddressCard from './components/CompanyAddressCard';
import CompanyCompletionCard from './components/CompanyCompletionCard';
import WhyCompleteProfileCard from './components/WhyCompleteProfileCard';
import LastUpdatedCard from './components/LastUpdatedCard';
import CompanyProfileForm from './components/CompanyProfileForm';
import TeamMembers from './components/TeamMembers';
import HiringPreferences from './components/HiringPreferences';
import SocialLinks from './components/SocialLinks';
import Verification from './components/Verification';
import { COMPANY_TABS } from './data/companyProfileData';
import {
  fetchEmployerProfile,
  saveCompanyProfile,
  saveCompanyAddress,
  saveTeamMembers,
  saveHiringPreferences,
  saveSocialLinks,
  saveVerification,
  type CompanyProfileData,
  type CompanyAddressData,
  type TeamMemberData,
  type HiringPreferenceData,
  type SocialLinkData,
  type VerificationData,
} from './services/employerService';

const CompanyProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  // Profile data states
  const [profile, setProfile] = useState<CompanyProfileData | null>(null);
  const [address, setAddress] = useState<CompanyAddressData | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMemberData[]>([]);
  const [hiringPreferences, setHiringPreferences] = useState<HiringPreferenceData | null>(null);
  const [socialLinks, setSocialLinks] = useState<SocialLinkData | null>(null);
  const [verification, setVerification] = useState<VerificationData | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchEmployerProfile();
      setProfile(data.profile);
      setAddress(data.address);
      setTeamMembers(data.teamMembers || []);
      setHiringPreferences(data.hiringPreferences);
      setSocialLinks(data.socialLinks);
      setVerification(data.verification);
    } catch (err) {
      console.error('Error loading employer profile data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const isProfileCreated = Boolean(profile?.companyName);

  // Dynamic step completion tracking
  const steps = [
    {
      label: 'Basic Information',
      status: profile?.companyName ? 'Completed' : 'Fill Info',
      type: profile?.companyName ? 'done' : 'add',
    },
    {
      label: 'Company Description',
      status: profile?.description ? 'Completed' : 'Add Description',
      type: profile?.description ? 'done' : 'add',
    },
    {
      label: 'Company Address',
      status: address?.registeredAddress ? 'Completed' : 'Add Address',
      type: address?.registeredAddress ? 'done' : 'add',
    },
    {
      label: 'Team Members',
      status: teamMembers.length > 0 ? 'Completed' : 'Add Members',
      type: teamMembers.length > 0 ? 'done' : 'add',
    },
    {
      label: 'Social Links',
      status: socialLinks?.website || socialLinks?.linkedin ? 'Completed' : 'Add Links',
      type: socialLinks?.website || socialLinks?.linkedin ? 'done' : 'add',
    },
    {
      label: 'Verification',
      status: verification?.panNumber ? 'Verified' : 'Verify Now',
      type: verification?.panNumber ? 'done' : 'verify',
    },
  ];

  const completedCount = steps.filter((s) => s.type === 'done').length;
  const completionPercentage = Math.round((completedCount / steps.length) * 100);

  const handleSaveForm = async (formData: {
    profile: CompanyProfileData;
    address: CompanyAddressData;
    teamMembers: TeamMemberData[];
    hiringPreferences: HiringPreferenceData;
    socialLinks: SocialLinkData;
    verification: VerificationData;
  }) => {
    await Promise.all([
      saveCompanyProfile(formData.profile),
      saveCompanyAddress(formData.address),
      saveTeamMembers(formData.teamMembers),
      saveHiringPreferences(formData.hiringPreferences),
      saveSocialLinks(formData.socialLinks),
      saveVerification(formData.verification),
    ]);

    setProfile(formData.profile);
    setAddress(formData.address);
    setTeamMembers(formData.teamMembers);
    setHiringPreferences(formData.hiringPreferences);
    setSocialLinks(formData.socialLinks);
    setVerification(formData.verification);
  };

  const [formTabName, setFormTabName] = useState<string | undefined>(undefined);

  const handleStepClick = (stepLabel: string) => {
    switch (stepLabel) {
      case 'Basic Information':
      case 'Company Description':
        setActiveTab(0);
        setFormTabName('Company Information');
        break;
      case 'Company Address':
        setActiveTab(0);
        setFormTabName('Company Address');
        break;
      case 'Team Members':
        setActiveTab(1);
        setFormTabName('Team Members');
        break;
      case 'Social Links':
        setActiveTab(3);
        setFormTabName('Social & Links');
        break;
      case 'Verification':
        setActiveTab(4);
        setFormTabName('Verification');
        break;
      default:
        setFormTabName(COMPANY_TABS[activeTab]);
        break;
    }
    setIsFormOpen(true);
  };

  const handleOpenFormWithTab = (tabIndex?: number, customTabName?: string) => {
    if (tabIndex !== undefined) {
      setActiveTab(tabIndex);
    }
    setFormTabName(customTabName || (tabIndex !== undefined ? COMPANY_TABS[tabIndex] : COMPANY_TABS[activeTab]));
    setIsFormOpen(true);
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto py-12 text-center text-gray-500 font-sans">
        <p className="text-sm">Loading company profile details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500 pb-10 font-sans">
      {/* Header */}
      <CompanyHeader
        isProfileCreated={isProfileCreated}
        onOpenForm={() => handleOpenFormWithTab(0)}
      />

      {/* Main Tab Bar */}
      <CompanyTabs
        tabs={COMPANY_TABS}
        activeTabIndex={activeTab}
        onTabChange={(index) => {
          setActiveTab(index);
          setFormTabName(COMPANY_TABS[index]);
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Main Content Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* TAB 0: Company Information */}
          {activeTab === 0 && (
            <>
              <CompanyInformationCard
                profile={profile}
                verification={verification}
                onEdit={() => handleOpenFormWithTab(0, 'Company Information')}
              />
              <CompanyAddressCard
                address={address}
                onEdit={() => handleOpenFormWithTab(0, 'Company Address')}
              />
            </>
          )}

          {/* TAB 1: Team Members */}
          {activeTab === 1 && (
            <TeamMembers
              members={teamMembers}
              onEdit={() => handleOpenFormWithTab(1, 'Team Members')}
            />
          )}

          {/* TAB 2: Hiring Preferences */}
          {activeTab === 2 && (
            <HiringPreferences
              preferences={hiringPreferences}
              onEdit={() => handleOpenFormWithTab(2, 'Hiring Preferences')}
            />
          )}

          {/* TAB 3: Social & Links */}
          {activeTab === 3 && (
            <SocialLinks
              social={socialLinks}
              onEdit={() => handleOpenFormWithTab(3, 'Social & Links')}
            />
          )}

          {/* TAB 4: Verification */}
          {activeTab === 4 && (
            <Verification
              verification={verification}
              onEdit={() => handleOpenFormWithTab(4, 'Verification')}
            />
          )}
        </div>

        {/* Right Sidebar Column */}
        <div className="lg:col-span-1 space-y-6">
          {/* Company Completion Card */}
          <CompanyCompletionCard
            completionSteps={steps as any}
            percentage={completionPercentage}
            onStepClick={handleStepClick}
          />

          {/* Why Complete Your Profile */}
          <WhyCompleteProfileCard />

          {/* Last Updated */}
          <LastUpdatedCard date="Today" />
        </div>
      </div>

      {/* Form Modal */}
      {isFormOpen && (
        <CompanyProfileForm
          initialProfile={profile}
          initialAddress={address}
          initialTeamMembers={teamMembers}
          initialHiringPreferences={hiringPreferences}
          initialSocialLinks={socialLinks}
          initialVerification={verification}
          activeTabName={formTabName || COMPANY_TABS[activeTab]}
          onSave={handleSaveForm}
          onClose={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
};

export default CompanyProfile;
