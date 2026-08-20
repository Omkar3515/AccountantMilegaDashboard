import { getAuthToken } from '../../../../services/authService';
import { getCachedProfileData, saveCachedProfileData } from './companyProfileApi';

const API_BASE_URL = 'http://localhost:5000/api/employer';

export interface CompanyAddressData {
  registeredAddress?: string;
  city?: string;
  state?: string;
  pincode?: string;
  country?: string;
  latitude?: number | null;   // <- New
  longitude?: number | null;  // <- New
}

export const saveCompanyAddress = async (
  addressData: CompanyAddressData
): Promise<CompanyAddressData> => {
  const token = getAuthToken();
  if (token) {
    try {
      const response = await fetch(`${API_BASE_URL}/address`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addressData),
      });
      if (response.ok) {
        const json = await response.json();
        if (json.success && json.data) {
          addressData = json.data;
        }
      }
    } catch {
      // Fall back to local update
    }
  }

  const current = getCachedProfileData();
  const updated = {
    ...current,
    address: addressData,
  };
  saveCachedProfileData(updated);
  return addressData;
};
