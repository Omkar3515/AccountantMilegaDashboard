import { getAuthToken } from '../../../../services/authService';
import { getCachedProfileData, saveCachedProfileData } from './companyProfileApi';

const API_BASE_URL = 'http://localhost:5000/api/employer';

export interface VerificationData {
  panNumber: string;
  gstNumber: string;
  registrationNumber: string;
  contactEmail: string;
  contactPhone: string;
  status: string;
  isVerified?: boolean;
}

export const saveVerification = async (
  verification: VerificationData
): Promise<VerificationData> => {
  const token = getAuthToken();
  if (token) {
    try {
      await fetch(`${API_BASE_URL}/verification`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(verification),
      });
    } catch {
      // Fall back to local update
    }
  }

  const current = getCachedProfileData();
  const updated = {
    ...current,
    verification: verification,
  };
  saveCachedProfileData(updated);
  return verification;
};
