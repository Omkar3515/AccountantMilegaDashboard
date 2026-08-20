import { getAuthToken } from '../../../../services/authService';
import { getCachedProfileData, saveCachedProfileData } from './companyProfileApi';

const API_BASE_URL = 'http://localhost:5000/api/employer';

export interface SocialLinkData {
  website: string;
  linkedin: string;
  twitter: string;
  facebook: string;
  instagram: string;
}

export const saveSocialLinks = async (
  social: SocialLinkData
): Promise<SocialLinkData> => {
  const token = getAuthToken();
  if (token) {
    try {
      await fetch(`${API_BASE_URL}/social-links`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(social),
      });
    } catch {
      // Fall back to local update
    }
  }

  const current = getCachedProfileData();
  const updated = {
    ...current,
    socialLinks: social,
  };
  saveCachedProfileData(updated);
  return social;
};
