import { getAuthToken } from '../../../../services/authService';
import { getCachedProfileData, saveCachedProfileData } from './companyProfileApi';

const API_BASE_URL = 'http://localhost:5000/api/employer';

export interface TeamMemberData {
  _id?: string;
  id?: string;
  name: string;
  designation: string;
  email: string;
  phone: string;
  role: string;
}

export const addTeamMember = async (
  memberData: TeamMemberData
): Promise<TeamMemberData> => {
  const token = getAuthToken();
  if (token) {
    try {
      const response = await fetch(`${API_BASE_URL}/team-members`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(memberData),
      });
      if (response.ok) {
        const json = await response.json();
        if (json.success && json.data) {
          memberData = json.data;
        }
      }
    } catch (err) {
      console.error('Add Team Member API error:', err);
    }
  }

  if (!memberData._id && !memberData.id) {
    memberData.id = Date.now().toString();
  }

  const current = getCachedProfileData();
  const updated = {
    ...current,
    teamMembers: [memberData, ...(current.teamMembers || [])],
  };
  saveCachedProfileData(updated);
  return memberData;
};

export const deleteTeamMember = async (id: string): Promise<boolean> => {
  const token = getAuthToken();
  if (token) {
    try {
      const response = await fetch(`${API_BASE_URL}/team-members/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        console.error('Delete Team Member API failed with status:', response.status);
      }
    } catch (err) {
      console.error('Delete Team Member API error:', err);
    }
  }

  // Always update local cache to remove the member immediately
  const current = getCachedProfileData();
  const updated = {
    ...current,
    teamMembers: (current.teamMembers || []).filter(
      (m: any) => m._id !== id && m.id !== id
    ),
  };
  saveCachedProfileData(updated);
  return true;
};

export const saveTeamMembers = async (
  members: TeamMemberData[]
): Promise<TeamMemberData[]> => {
  const token = getAuthToken();
  const savedMembers: TeamMemberData[] = [];

  if (token) {
    try {
      for (const m of members) {
        if (!m._id) {
          const response = await fetch(`${API_BASE_URL}/team-members`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(m),
          });
          if (response.ok) {
            const json = await response.json();
            if (json.success && json.data) {
              savedMembers.push(json.data);
            } else {
              savedMembers.push(m);
            }
          } else {
            savedMembers.push(m);
          }
        } else {
          savedMembers.push(m);
        }
      }
    } catch (err) {
      console.error('Save Team Members API error:', err);
    }
  } else {
    savedMembers.push(...members);
  }

  const finalMembers = savedMembers.length > 0 ? savedMembers : members;

  const current = getCachedProfileData();
  const updated = {
    ...current,
    teamMembers: finalMembers,
  };
  saveCachedProfileData(updated);
  return finalMembers;
};
