export interface ResumeSections {
  personalInfo: boolean;
  summary: boolean;
  experience: boolean;
  education: boolean;
  skills: boolean;
  achievements: boolean;
  experienceCount: number;
  educationCount: number;
  skillsCount: number;
  achievementsCount: number;
}

export interface ResumeSummary {
  resumeUrl: string;
  resumeFileName: string;
  resumeFileSize: number; // bytes
  resumeUploadedAt: string | null;
  isPublic: boolean;
  strengthScore: number; // 0-100
  sections: ResumeSections;
}