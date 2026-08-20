import { getAuthToken } from '../../../../services/authService';
import { getCachedProfileData, saveCachedProfileData } from './companyProfileApi';

const API_BASE_URL = 'http://localhost:5000/api/employer';

export interface HiringPreferenceData {
  preferredRoles: string[];
  workModes: string[];
  experienceRange: string;
  noticePeriod: string;
  primaryLocations: string[];
}

export const saveHiringPreferences = async (
  prefs: HiringPreferenceData
): Promise<HiringPreferenceData> => {
  const token = getAuthToken();
  if (token) {
    try {
      await fetch(`${API_BASE_URL}/hiring-preferences`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(prefs),
      });
    } catch {
      // Fall back to local update
    }
  }

  const current = getCachedProfileData();
  const updated = {
    ...current,
    hiringPreferences: prefs,
  };
  saveCachedProfileData(updated);
  return prefs;
};
