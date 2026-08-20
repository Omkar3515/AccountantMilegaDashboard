import api from "../utils/api";

export interface CandidateUser {
  _id: string;
  fullName: string;
  email: string;
  mobile: string;
  role: string;
}

export interface CandidateProfileData {
  _id: string;
  userId: string;
  headline: string;
  about: string;
  gender: string;
  dob: string;
  qualification: string;
  maritalStatus: string;
  languages: string[];
  workAuthorization: string;
  location: string;
  totalExperienceYears: number;
  currentSalary: string;
  expectedSalary: string;
  noticePeriod: string;
  availability: string;
  isPublic: boolean;
  avatar: string;
  documents?: Array<{
    _id?: string;
    title: string;
    fileName: string;
    fileUrl: string;
    status: string;
  }>;
}

export interface CandidateSkill {
  _id: string;
  userId: string;
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  yearsOfExperience: number;
}

export interface CandidateExperience {
  _id: string;
  userId: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
}

export interface CandidateEducation {
  _id: string;
  userId: string;
  degree: string;
  fieldOfStudy: string;
  institution: string;
  startYear: string;
  endYear: string;
  grade: string;
}

export interface CandidateCertification {
  _id: string;
  userId: string;
  title: string;
  issuingOrganization: string;
  issueDate: string;
  credentialId: string;
}

export interface CandidateAchievement {
  _id: string;
  userId: string;
  title: string;
  organization?: string;
  date?: string;
  description?: string;
}

export interface CandidatePreference {
  _id: string;
  userId: string;
  preferredJobRoles: string[];
  preferredLocations: string[];
  employmentType: string;
  expectedSalary: string;
  noticePeriod: string;
  availability: string;
}

export interface CompleteProfileResponse {
  success: boolean;
  data: {
    user: CandidateUser;
    profile: CandidateProfileData;
    skills: CandidateSkill[];
    experiences: CandidateExperience[];
    educations: CandidateEducation[];
    certifications: CandidateCertification[];
    achievements: CandidateAchievement[];
    preferences: CandidatePreference;
  };
}

export const getCandidateProfileApi = async (): Promise<CompleteProfileResponse> => {
  const response = await api.get<CompleteProfileResponse>("/candidate/profile/me");
  return response.data;
};

export const updateCandidateProfileApi = async (data: Partial<CandidateProfileData> & { fullName?: string }) => {
  const response = await api.put("/candidate/profile", data);
  return response.data;
};

export const getAccountantSkillSuggestionsApi = async () => {
  const response = await api.get<{ success: boolean; data: string[] }>("/candidate/skills/suggestions");
  return response.data;
};

export const addCandidateSkillsApi = async (skills: string[] | Partial<CandidateSkill>) => {
  const payload = Array.isArray(skills) ? { skills } : skills;
  const response = await api.post("/candidate/skills", payload);
  return response.data;
};

export const deleteCandidateSkillApi = async (id: string) => {
  const response = await api.delete(`/candidate/skills/${id}`);
  return response.data;
};

export const addCandidateExperienceApi = async (data: Partial<CandidateExperience>) => {
  const response = await api.post("/candidate/experiences", data);
  return response.data;
};

export const updateCandidateExperienceApi = async (id: string, data: Partial<CandidateExperience>) => {
  const response = await api.put(`/candidate/experiences/${id}`, data);
  return response.data;
};

export const deleteCandidateExperienceApi = async (id: string) => {
  const response = await api.delete(`/candidate/experiences/${id}`);
  return response.data;
};

export const addCandidateEducationApi = async (data: Partial<CandidateEducation>) => {
  const response = await api.post("/candidate/educations", data);
  return response.data;
};

export const updateCandidateEducationApi = async (id: string, data: Partial<CandidateEducation>) => {
  const response = await api.put(`/candidate/educations/${id}`, data);
  return response.data;
};

export const deleteCandidateEducationApi = async (id: string) => {
  const response = await api.delete(`/candidate/educations/${id}`);
  return response.data;
};

export const addCandidateCertificationApi = async (data: Partial<CandidateCertification>) => {
  const response = await api.post("/candidate/certifications", data);
  return response.data;
};

export const deleteCandidateCertificationApi = async (id: string) => {
  const response = await api.delete(`/candidate/certifications/${id}`);
  return response.data;
};

export const updateCandidatePreferencesApi = async (data: Partial<CandidatePreference>) => {
  const response = await api.put("/candidate/preferences", data);
  return response.data;
};

export const addCandidateAchievementApi = async (data: Partial<CandidateAchievement>) => {
  const response = await api.post("/candidate/achievements", data);
  return response.data;
};

export const deleteCandidateAchievementApi = async (id: string) => {
  const response = await api.delete(`/candidate/achievements/${id}`);
  return response.data;
};
