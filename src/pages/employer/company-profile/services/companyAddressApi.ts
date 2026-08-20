import { getAuthToken } from '../../../../services/authService';
import { getCachedProfileData, saveCachedProfileData } from './companyProfileApi';

const API_BASE_URL = 'http://localhost:5000/api/employer';

export interface CompanyAddressData {
  registeredAddress: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export const saveCompanyAddress = async (
  addressData: CompanyAddressData
): Promise<CompanyAddressData> => {
  const token = getAuthToken();
  if (token) {
    try {
      await fetch(`${API_BASE_URL}/address`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addressData),
      });
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
