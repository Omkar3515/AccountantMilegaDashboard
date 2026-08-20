import { getAuthToken } from '../../../../services/authService';

const API_BASE_URL = 'http://localhost:5000/api/employer';
const STORAGE_KEY = 'employer_profile_data_cache';

export interface CompanyProfileData {
  companyName: string;
  tagline: string;
  industry: string;
  companySize: string;
  companyType: string;
  establishmentYear: string;
  panNumber: string;
  registrationNumber: string;
  gstNumber: string;
  website: string;
  location: string;
  description: string;
  logoUrl?: string;
  bannerUrl?: string;
  isVerified?: boolean;
  isCompleted?: boolean;
}

export interface FullEmployerProfileResponse {
  profile: CompanyProfileData | null;
  address: any;
  teamMembers: any[];
  hiringPreferences: any;
  socialLinks: any;
  verification: any;
}

export const getCachedProfileData = (): FullEmployerProfileResponse => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return (
      data
        ? JSON.parse(data)
        : {
            profile: null,
            address: null,
            teamMembers: [],
            hiringPreferences: null,
            socialLinks: null,
            verification: null,
          }
    );
  } catch {
    return {
      profile: null,
      address: null,
      teamMembers: [],
      hiringPreferences: null,
      socialLinks: null,
      verification: null,
    };
  }
};

export const saveCachedProfileData = (data: FullEmployerProfileResponse) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save to localStorage', e);
  }
};

export const fetchEmployerProfile = async (): Promise<FullEmployerProfileResponse> => {
  const token = getAuthToken();
  if (!token) {
    return getCachedProfileData();
  }

  try {
    const response = await fetch(`${API_BASE_URL}/profile/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const json = await response.json();
      if (json.success && json.data) {
        const fetched: FullEmployerProfileResponse = {
          profile: json.data.profile,
          address: json.data.address,
          teamMembers: json.data.teamMembers || [],
          hiringPreferences: json.data.hiringPreferences,
          socialLinks: json.data.socialLinks,
          verification: json.data.verification,
        };
        saveCachedProfileData(fetched);
        return fetched;
      }
    }
  } catch {
    // Silently fall back to cache when backend is offline
  }

  return getCachedProfileData();
};

export const saveCompanyProfile = async (
  profileData: CompanyProfileData
): Promise<CompanyProfileData> => {
  const token = getAuthToken();
  if (token) {
    try {
      const response = await fetch(`${API_BASE_URL}/profile`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });
      if (response.ok) {
        const json = await response.json();
        if (json.success && json.data) {
          profileData = json.data;
        }
      }
    } catch {
      // Fall back to local update
    }
  }

  const current = getCachedProfileData();
  const updated: FullEmployerProfileResponse = {
    ...current,
    profile: { ...profileData, isCompleted: true },
  };
  saveCachedProfileData(updated);
  return profileData;
};
