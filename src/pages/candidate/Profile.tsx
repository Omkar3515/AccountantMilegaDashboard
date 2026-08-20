import React, { useEffect, useState, useRef } from "react";
import {
  ArrowRight,
  Award,
  BriefcaseBusiness,
  CalendarDays,
  Camera,
  CheckCircle2,
  CircleUserRound,
  Clock3,
  Edit3,
  FileText,
  GraduationCap,
  Heart,
  Languages,
  Loader2,
  Mail,
  MapPin,
  Plus,
  ShieldCheck,
  Sparkles,
  Target,
  Trash2,
  User,
  X,
  Cake,
  FileCheck2,
  Upload,
  Download,
  ExternalLink,
  Eye,
  Paperclip,
} from "lucide-react";
import {
  getCandidateProfileApi,
  updateCandidateProfileApi,
  getAccountantSkillSuggestionsApi,
  addCandidateSkillsApi,
  deleteCandidateSkillApi,
  addCandidateExperienceApi,
  updateCandidateExperienceApi,
  deleteCandidateExperienceApi,
  addCandidateEducationApi,
  updateCandidateEducationApi,
  deleteCandidateEducationApi,
  addCandidateCertificationApi,
  deleteCandidateCertificationApi,
  addCandidateAchievementApi,
  deleteCandidateAchievementApi,
  updateCandidatePreferencesApi,
  uploadCandidateAvatarApi,
  uploadCandidateDocumentApi,
  deleteCandidateDocumentApi,
} from "../../services/candidateService";
import type {
  CandidateProfileData,
  CandidateUser,
  CandidateSkill,
  CandidateExperience,
  CandidateEducation,
  CandidateCertification,
  CandidateAchievement,
  CandidatePreference,
  CandidateDocument,
} from "../../services/candidateService";

const formatDateForDisplay = (dateStr?: string) => {
  if (!dateStr) return "-";
  if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
    const [year, month, day] = dateStr.split("-");
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${parseInt(day, 10)} ${months[parseInt(month, 10) - 1]} ${year}`;
  }
  return dateStr;
};

const parseMonthAndYear = (dateStr?: string, isEnd = false): { year: number; month: number } => {
  const now = new Date();
  if (!dateStr || dateStr.trim().toLowerCase() === "present" || dateStr.trim().toLowerCase() === "till date") {
    return { year: now.getFullYear(), month: now.getMonth() };
  }

  const str = dateStr.trim();
  const yearMatch = str.match(/\b(19|20)\d{2}\b/);
  const year = yearMatch ? parseInt(yearMatch[0], 10) : 0;

  const monthMap: Record<string, number> = {
    jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
    jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
  };

  const lowerStr = str.toLowerCase();
  const textMonthMatch = lowerStr.match(/(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/);

  let month = isEnd ? 11 : 0;

  if (textMonthMatch) {
    month = monthMap[textMonthMatch[0]];
  } else {
    // Check for numeric month e.g. 06/2020 or 6-2020 or 2020-06
    const slashParts = str.split(/[\/\-\.]/);
    if (slashParts.length >= 2) {
      const p0 = parseInt(slashParts[0], 10);
      const p1 = parseInt(slashParts[1], 10);
      if (p0 >= 1 && p0 <= 12) month = p0 - 1;
      else if (p1 >= 1 && p1 <= 12) month = p1 - 1;
    }
  }

  return { year, month };
};

// Dynamic Total Experience Calculator from candidate work experience entries
const calculateTotalExperience = (exps: CandidateExperience[]): string => {
  if (!exps || exps.length === 0) return "-";

  let totalMonths = 0;

  exps.forEach((exp) => {
    const isExpCurrent = exp.isCurrent === true || exp.endDate?.trim().toLowerCase() === "present";

    const { year: startYear, month: startMonth } = parseMonthAndYear(exp.startDate, false);
    const { year: endYear, month: endMonth } = parseMonthAndYear(isExpCurrent ? "Present" : exp.endDate, true);

    if (startYear > 0 && endYear >= startYear) {
      const months = (endYear - startYear) * 12 + (endMonth - startMonth) + 1;
      if (months > 0) totalMonths += months;
    }
  });

  if (totalMonths <= 0) return "-";

  const years = Math.floor(totalMonths / 12);
  const remMonths = totalMonths % 12;

  if (years > 0 && remMonths > 0) {
    return `${years} Yr ${remMonths} Mo`;
  } else if (years > 0) {
    return `${years}+ Years`;
  } else {
    return `${remMonths} Months`;
  }
};

const InfoRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-center gap-3">
    <span className="flex items-center justify-center w-7 h-7 rounded-md bg-blue-50 text-blue-700 shrink-0">
      {icon}
    </span>
    <div className="flex items-center justify-between flex-1 min-w-0">
      <span className="font-medium text-slate-700">{label}</span>
      <span className={`text-right font-medium ${value && value !== "-" ? "text-slate-800" : "text-slate-400 font-mono"}`}>
        {value || "-"}
      </span>
    </div>
  </div>
);

const ProfileCounter = ({ percent }: { percent: number }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / 800, 1);
      setValue(Math.round(percent * (1 - Math.pow(1 - p, 3))));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [percent]);

  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="relative w-16 h-16 flex items-center justify-center">
      <svg className="w-16 h-16 transform -rotate-90">
        {/* Background Ring */}
        <circle
          cx="32"
          cy="32"
          r={radius}
          stroke="#e2e8f0"
          strokeWidth="4"
          fill="transparent"
        />
        {/* Progress Fill Ring */}
        <circle
          cx="32"
          cy="32"
          r={radius}
          stroke="#1d4ed8"
          strokeWidth="4"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-300 ease-out"
        />
      </svg>
      <span className="absolute font-bold text-blue-700 text-sm">
        {value}%
      </span>
    </div>
  );
};

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("About Me");
  const [user, setUser] = useState<CandidateUser | null>(null);
  const [profile, setProfile] = useState<CandidateProfileData | null>(null);
  const [skills, setSkills] = useState<CandidateSkill[]>([]);
  const [experiences, setExperiences] = useState<CandidateExperience[]>([]);
  const [educations, setEducations] = useState<CandidateEducation[]>([]);
  const [certifications, setCertifications] = useState<CandidateCertification[]>([]);
  const [achievements, setAchievements] = useState<CandidateAchievement[]>([]);
  const [documents, setDocuments] = useState<CandidateDocument[]>([]);
  const [preferences, setPreferences] = useState<CandidatePreference | null>(null);

  // Accountant skill suggestions
  const [skillSuggestions, setSkillSuggestions] = useState<string[]>([]);

  // Avatar Upload State & Ref
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  // Document Upload & Modal State & Ref
  const docFileInputRef = useRef<HTMLInputElement>(null);
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [docPreset, setDocPreset] = useState("Resume");
  const [docCustomTitle, setDocCustomTitle] = useState("");
  const [docFile, setDocFile] = useState<File | null>(null);
  const [uploadingDoc, setUploadingDoc] = useState(false);

  // Modals state
  const [isEditAboutOpen, setIsEditAboutOpen] = useState(false);
  const [isAddSkillOpen, setIsAddSkillOpen] = useState(false);

  // Experience modal state (supports both Add & Edit)
  const [isExpModalOpen, setIsExpModalOpen] = useState(false);
  const [editingExpId, setEditingExpId] = useState<string | null>(null);

  // Education modal state (supports both Add & Edit)
  const [isEduModalOpen, setIsEduModalOpen] = useState(false);
  const [editingEduId, setEditingEduId] = useState<string | null>(null);
  const [uploadingEduDoc, setUploadingEduDoc] = useState(false);

  const [isAddCertOpen, setIsAddCertOpen] = useState(false);
  const [uploadingCertDoc, setUploadingCertDoc] = useState(false);

  const [isAddAchieveOpen, setIsAddAchieveOpen] = useState(false);
  const [uploadingAchieveDoc, setUploadingAchieveDoc] = useState(false);

  const [isEditPrefOpen, setIsEditPrefOpen] = useState(false);

  // Form states
  const [aboutForm, setAboutForm] = useState({
    fullName: "",
    headline: "",
    about: "",
    location: "",
    dob: "",
    qualification: "",
    gender: "",
    maritalStatus: "",
    languages: "",
    workAuthorization: "",
    noticePeriod: "",
    availability: "",
  });

  const [selectedSkillsToAdd, setSelectedSkillsToAdd] = useState<string[]>([]);
  const [customSkillInput, setCustomSkillInput] = useState("");

  const [expForm, setExpForm] = useState({
    role: "",
    company: "",
    location: "Mumbai, Maharashtra",
    startDate: "",
    endDate: "Present",
    isCurrent: true,
    description: "",
  });

  const [eduForm, setEduForm] = useState({
    degree: "",
    fieldOfStudy: "Commerce / Accounting",
    institution: "",
    startYear: "",
    endYear: "",
    grade: "",
    fileUrl: "",
  });

  const [certForm, setCertForm] = useState({
    title: "",
    issuingOrganization: "",
    issueDate: "",
    credentialId: "",
    fileUrl: "",
  });

  const [achieveForm, setAchieveForm] = useState({
    title: "",
    organization: "",
    date: "",
    description: "",
    fileUrl: "",
  });

  const [prefForm, setPrefForm] = useState({
    preferredJobRoles: "",
    preferredLocations: "",
    employmentType: "Full Time",
    expectedSalary: "",
  });

  // Handlers for S3 uploads
  const handleAvatarClick = () => {
    avatarInputRef.current?.click();
  };

  const handleAvatarFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingAvatar(true);
      const formData = new FormData();
      formData.append("avatar", file);
      const res = await uploadCandidateAvatarApi(formData);
      if (res.success && res.data?.avatar) {
        setProfile((prev) => (prev ? { ...prev, avatar: res.data.avatar } : prev));
      }
    } catch (err) {
      console.error("Avatar upload failed:", err);
    } finally {
      setUploadingAvatar(false);
      if (e.target) e.target.value = "";
    }
  };

  const handleUploadDocumentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!docFile) return;
    const titleToUse = docPreset === "Other" ? docCustomTitle.trim() : docPreset;
    if (!titleToUse) return;

    try {
      setUploadingDoc(true);
      const formData = new FormData();
      formData.append("document", docFile);
      formData.append("title", titleToUse);
      const res = await uploadCandidateDocumentApi(formData);
      if (res.success && res.data) {
        setDocuments((prev) => {
          const filtered = prev.filter(
            (d) => d.title.toLowerCase().trim() !== titleToUse.toLowerCase().trim()
          );
          return [...filtered, res.data];
        });
        setDocFile(null);
        setDocCustomTitle("");
        if (docFileInputRef.current) docFileInputRef.current.value = "";
      }
    } catch (err) {
      console.error("Document upload failed:", err);
    } finally {
      setUploadingDoc(false);
    }
  };

  const handleDeleteDocument = async (id: string) => {
    try {
      await deleteCandidateDocumentApi(id);
      setDocuments((prev) => prev.filter((d) => d._id !== id));
    } catch (err) {
      console.error("Document delete failed:", err);
    }
  };

  const handleEduDocumentUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingEduDoc(true);
      const formData = new FormData();
      formData.append("document", file);
      formData.append("title", `Education Certificate - ${eduForm.degree || "Degree"}`);
      const res = await uploadCandidateDocumentApi(formData);
      if (res.success && res.data) {
        setEduForm((prev) => ({ ...prev, fileUrl: res.data.fileUrl }));
        setDocuments((prev) => [...prev, res.data]);
      }
    } catch (err) {
      console.error("Education document upload failed:", err);
    } finally {
      setUploadingEduDoc(false);
    }
  };

  const handleCertDocumentUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingCertDoc(true);
      const formData = new FormData();
      formData.append("document", file);
      formData.append("title", `Certification Document - ${certForm.title || "Cert"}`);
      const res = await uploadCandidateDocumentApi(formData);
      if (res.success && res.data) {
        setCertForm((prev) => ({ ...prev, fileUrl: res.data.fileUrl }));
        setDocuments((prev) => [...prev, res.data]);
      }
    } catch (err) {
      console.error("Certification document upload failed:", err);
    } finally {
      setUploadingCertDoc(false);
    }
  };

  const handleAchieveDocumentUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingAchieveDoc(true);
      const formData = new FormData();
      formData.append("document", file);
      formData.append("title", `Achievement Document - ${achieveForm.title || "Achievement"}`);
      const res = await uploadCandidateDocumentApi(formData);
      if (res.success && res.data) {
        setAchieveForm((prev) => ({ ...prev, fileUrl: res.data.fileUrl }));
        setDocuments((prev) => [...prev, res.data]);
      }
    } catch (err) {
      console.error("Achievement document upload failed:", err);
    } finally {
      setUploadingAchieveDoc(false);
    }
  };

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const res = await getCandidateProfileApi();
      if (res.success && res.data) {
        const profileDoc = res.data.profile;
        const prefObj = res.data.preferences || profileDoc?.preferences || null;
        const skillsArr = res.data.skills || profileDoc?.skills || [];
        const expArr = res.data.experiences || profileDoc?.experiences || [];
        const eduArr = res.data.educations || profileDoc?.educations || [];
        const certArr = res.data.certifications || profileDoc?.certifications || [];
        const achArr = res.data.achievements || profileDoc?.achievements || [];
        const docsArr = profileDoc?.documents || [];

        setUser(res.data.user);
        setProfile(profileDoc);
        setSkills(skillsArr);
        setExperiences(expArr);
        setEducations(eduArr);
        setCertifications(certArr);
        setAchievements(achArr);
        setPreferences(prefObj);
        setDocuments(docsArr);

        // Prepopulate form states
        setAboutForm({
          fullName: res.data.user?.fullName || "",
          headline: profileDoc?.headline || "",
          about: profileDoc?.about || "",
          location: profileDoc?.location || "",
          dob: profileDoc?.dob || "",
          qualification: profileDoc?.qualification || "",
          gender: profileDoc?.gender || "",
          maritalStatus: profileDoc?.maritalStatus || "",
          languages: profileDoc?.languages?.join(", ") || "",
          workAuthorization: profileDoc?.workAuthorization || "",
          noticePeriod: profileDoc?.noticePeriod || prefObj?.noticePeriod || "",
          availability: profileDoc?.availability || prefObj?.availability || "",
        });

        if (prefObj) {
          setPrefForm({
            preferredJobRoles: prefObj.preferredJobRoles?.join(", ") || "",
            preferredLocations: prefObj.preferredLocations?.join(", ") || "",
            employmentType: prefObj.employmentType || "Full Time",
            expectedSalary: prefObj.expectedSalary || profileDoc?.expectedSalary || "",
          });
        }
      }

      const suggestionsRes = await getAccountantSkillSuggestionsApi();
      if (suggestionsRes.success) {
        setSkillSuggestions(suggestionsRes.data);
      }
    } catch (error) {
      console.error("Error loading candidate profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  // Calculate profile completion % based on user-filled fields
  const calculateCompletion = () => {
    let score = 20; // Signup complete
    if (profile?.headline || profile?.about) score += 20;
    if (profile?.dob || profile?.qualification) score += 15;
    if (skills.length > 0) score += 15;
    if (experiences.length > 0) score += 15;
    if (educations.length > 0) score += 15;
    return Math.min(score, 100);
  };

  // Submit Handlers
  const handleSaveAbout = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const languagesArray = aboutForm.languages.split(",").map((s) => s.trim()).filter(Boolean);
      await updateCandidateProfileApi({
        fullName: aboutForm.fullName,
        headline: aboutForm.headline,
        about: aboutForm.about,
        location: aboutForm.location,
        dob: aboutForm.dob,
        qualification: aboutForm.qualification,
        gender: aboutForm.gender,
        maritalStatus: aboutForm.maritalStatus,
        languages: languagesArray,
        workAuthorization: aboutForm.workAuthorization,
        noticePeriod: aboutForm.noticePeriod,
        availability: aboutForm.availability,
      });
      setIsEditAboutOpen(false);
      fetchProfileData();
    } catch (err) {
      console.error("Failed to update profile", err);
    }
  };

  const handleAddSkillTag = (skillName: string) => {
    if (!selectedSkillsToAdd.includes(skillName)) {
      setSelectedSkillsToAdd([...selectedSkillsToAdd, skillName]);
    } else {
      setSelectedSkillsToAdd(selectedSkillsToAdd.filter((s) => s !== skillName));
    }
  };

  const handleSaveSkills = async () => {
    try {
      const skillsToSubmit = [...selectedSkillsToAdd];
      if (customSkillInput.trim() && !skillsToSubmit.includes(customSkillInput.trim())) {
        skillsToSubmit.push(customSkillInput.trim());
      }
      if (skillsToSubmit.length > 0) {
        await addCandidateSkillsApi(skillsToSubmit);
      }
      setSelectedSkillsToAdd([]);
      setCustomSkillInput("");
      setIsAddSkillOpen(false);
      fetchProfileData();
    } catch (err) {
      console.error("Failed to add skills", err);
    }
  };

  const handleDeleteSkill = async (id: string) => {
    try {
      await deleteCandidateSkillApi(id);
      setSkills(skills.filter((s) => s._id !== id));
    } catch (err) {
      console.error("Failed to delete skill", err);
    }
  };

  // Experience handlers (Add & Edit)
  const handleOpenAddExperience = () => {
    setEditingExpId(null);
    setExpForm({
      role: "",
      company: "",
      location: "Mumbai, Maharashtra",
      startDate: "",
      endDate: "Present",
      isCurrent: true,
      description: "",
    });
    setIsExpModalOpen(true);
  };

  const handleOpenEditExperience = (exp: CandidateExperience) => {
    setEditingExpId(exp._id);
    const isCurrentlyWorking = exp.isCurrent ?? (exp.endDate?.toLowerCase() === "present" || !exp.endDate);
    setExpForm({
      role: exp.role || "",
      company: exp.company || "",
      location: exp.location || "Mumbai, Maharashtra",
      startDate: exp.startDate || "",
      endDate: isCurrentlyWorking ? "Present" : exp.endDate || "",
      isCurrent: isCurrentlyWorking,
      description: exp.description || "",
    });
    setIsExpModalOpen(true);
  };

  const handleSaveExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const isCurrentlyWorking = expForm.isCurrent || expForm.endDate.trim().toLowerCase() === "present";
      const payload = {
        role: expForm.role.trim(),
        company: expForm.company.trim(),
        location: expForm.location.trim(),
        startDate: expForm.startDate.trim(),
        endDate: isCurrentlyWorking ? "Present" : expForm.endDate.trim(),
        isCurrent: isCurrentlyWorking,
        description: expForm.description.trim(),
      };

      if (editingExpId) {
        await updateCandidateExperienceApi(editingExpId, payload);
      } else {
        await addCandidateExperienceApi(payload);
      }
      setIsExpModalOpen(false);
      setEditingExpId(null);
      fetchProfileData();
    } catch (err) {
      console.error("Failed to save experience", err);
    }
  };

  const handleDeleteExp = async (id: string) => {
    try {
      await deleteCandidateExperienceApi(id);
      setExperiences(experiences.filter((e) => e._id !== id));
      fetchProfileData();
    } catch (err) {
      console.error("Failed to delete experience", err);
    }
  };

  // Education handlers (Add & Edit)
  const handleOpenAddEducation = () => {
    setEditingEduId(null);
    setEduForm({
      degree: "",
      fieldOfStudy: "Commerce / Accounting",
      institution: "",
      startYear: "",
      endYear: "",
      grade: "",
      fileUrl: "",
    });
    setIsEduModalOpen(true);
  };

  const handleOpenEditEducation = (edu: CandidateEducation) => {
    setEditingEduId(edu._id);
    setEduForm({
      degree: edu.degree || "",
      fieldOfStudy: edu.fieldOfStudy || "Commerce / Accounting",
      institution: edu.institution || "",
      startYear: edu.startYear || "",
      endYear: edu.endYear || "",
      grade: edu.grade || "",
      fileUrl: edu.fileUrl || "",
    });
    setIsEduModalOpen(true);
  };

  const handleSaveEducation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingEduId) {
        await updateCandidateEducationApi(editingEduId, eduForm);
      } else {
        await addCandidateEducationApi(eduForm);
      }
      setIsEduModalOpen(false);
      setEditingEduId(null);
      fetchProfileData();
    } catch (err) {
      console.error("Failed to save education", err);
    }
  };

  const handleDeleteEdu = async (id: string) => {
    try {
      await deleteCandidateEducationApi(id);
      setEducations(educations.filter((e) => e._id !== id));
    } catch (err) {
      console.error("Failed to delete education", err);
    }
  };

  const handleSaveCertification = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addCandidateCertificationApi(certForm);
      setIsAddCertOpen(false);
      setCertForm({
        title: "",
        issuingOrganization: "",
        issueDate: "",
        credentialId: "",
        fileUrl: "",
      });
      fetchProfileData();
    } catch (err) {
      console.error("Failed to add certification", err);
    }
  };

  const handleDeleteCert = async (id: string) => {
    try {
      await deleteCandidateCertificationApi(id);
      setCertifications(certifications.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Failed to delete certification", err);
    }
  };

  const handleSaveAchievement = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addCandidateAchievementApi(achieveForm);
      setIsAddAchieveOpen(false);
      setAchieveForm({
        title: "",
        organization: "",
        date: "",
        description: "",
        fileUrl: "",
      });
      fetchProfileData();
    } catch (err) {
      console.error("Failed to add achievement", err);
    }
  };

  const handleDeleteAchieve = async (id: string) => {
    try {
      await deleteCandidateAchievementApi(id);
      setAchievements(achievements.filter((a) => a._id !== id));
    } catch (err) {
      console.error("Failed to delete achievement", err);
    }
  };

  const handleOpenEditPreferences = () => {
    const currentPref = preferences || profile?.preferences;
    setPrefForm({
      preferredJobRoles: currentPref?.preferredJobRoles?.join(", ") || "",
      preferredLocations: currentPref?.preferredLocations?.join(", ") || "",
      employmentType: currentPref?.employmentType || "Full Time",
      expectedSalary: currentPref?.expectedSalary || profile?.expectedSalary || "",
    });
    setIsEditPrefOpen(true);
  };

  const handleSavePreferences = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const rolesArray = prefForm.preferredJobRoles.split(",").map((s) => s.trim()).filter(Boolean);
      const locsArray = prefForm.preferredLocations.split(",").map((s) => s.trim()).filter(Boolean);

      const res = await updateCandidatePreferencesApi({
        preferredJobRoles: rolesArray,
        preferredLocations: locsArray,
        employmentType: prefForm.employmentType,
        expectedSalary: prefForm.expectedSalary,
      });

      if (res.success && res.data) {
        setPreferences(res.data);
      }

      setIsEditPrefOpen(false);
      fetchProfileData();
    } catch (err) {
      console.error("Failed to update preferences", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        <p className="text-sm font-medium text-slate-600">Loading Candidate Profile...</p>
      </div>
    );
  }

  const completionPct = calculateCompletion();
  const isProfileEmpty = !profile?.about && !profile?.headline && experiences.length === 0 && educations.length === 0;

  // Dynamically calculated total experience from work experience entries
  const computedTotalExp = calculateTotalExperience(experiences);
  const displayExpectedSalary = preferences?.expectedSalary || profile?.expectedSalary || "-";
  const displayNoticePeriod = profile?.noticePeriod || preferences?.noticePeriod || "-";
  const displayAvailability = profile?.availability || preferences?.availability || "-";

  return (
    <div className="profile-page max-w-[1220px] mx-auto space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">My Profile</h1>
          <p className="text-sm text-slate-500 mt-1">
            Build and manage your accountant profile details and career information.
          </p>
        </div>
        <button
          onClick={() => setIsEditAboutOpen(true)}
          className="bg-blue-700 hover:bg-blue-800 text-white shadow-sm rounded-lg px-6 py-2.5 font-semibold text-sm flex items-center justify-center gap-2 transition-all"
        >
          {isProfileEmpty ? <FileCheck2 className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
          {isProfileEmpty ? "Create Profile" : "Edit Profile"}
        </button>
      </div>

      {/* Profile Incomplete Banner if needed */}
      {isProfileEmpty && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white grid place-items-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-sm text-blue-900">Your profile is not created yet!</p>
              <p className="text-xs text-slate-600 mt-0.5">
                Click <strong>"Complete Profile"</strong> below to fill out your details, experience, and accountant skills.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsEditAboutOpen(true)}
            className="bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold px-5 py-2.5 rounded-lg whitespace-nowrap"
          >
            Complete Profile Now
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-[1.85fr_.82fr] gap-5">
        <div className="space-y-5">
          {/* Main Bio Card */}
          <section className="profile-card bg-white border border-slate-200 rounded-xl p-6 flex flex-col md:flex-row items-center md:items-start gap-6 shadow-sm">
            <div className="relative">
              <img
                src={profile?.avatar || "https://i.pravatar.cc/160?img=12"}
                className="w-28 h-28 rounded-full object-cover ring-4 ring-blue-50"
                alt={user?.fullName || "Candidate"}
              />
              <input
                type="file"
                ref={avatarInputRef}
                accept="image/*"
                className="hidden"
                onChange={handleAvatarFileChange}
              />
              <button
                type="button"
                onClick={handleAvatarClick}
                disabled={uploadingAvatar}
                title="Upload Profile Photo to S3"
                className="absolute bottom-0 right-0 bg-white border border-blue-100 text-blue-700 hover:bg-blue-50 rounded-full p-2 shadow transition-all"
              >
                {uploadingAvatar ? (
                  <Loader2 className="w-4 h-4 animate-spin text-blue-700" />
                ) : (
                  <Camera className="w-4 h-4" />
                )}
              </button>
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex gap-3 justify-center md:justify-start items-center">
                <h2 className="text-xl font-bold text-slate-900">{user?.fullName}</h2>
                <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Candidate
                </span>
              </div>
              <p className="text-sm font-medium text-slate-600 mt-1.5">{profile?.headline || "-"}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-x-5 gap-y-2 text-xs text-slate-500 mt-4">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  {profile?.location || "-"}
                </span>
                <span>☎ {user?.mobile || "-"}</span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-blue-600" />
                  {user?.email || "-"}
                </span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2 mt-4 text-xs font-medium">
                <span className="text-slate-600">Profile Visibility:</span>
                <span className="text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full font-semibold">
                  ◉ Public
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <ProfileCounter percent={completionPct} />
              <p className="text-xs font-semibold mt-2 text-slate-700">Profile Complete</p>
              <button
                onClick={() => setIsEditAboutOpen(true)}
                className="text-xs text-blue-700 hover:underline font-semibold mt-2 flex items-center gap-1"
              >
                {isProfileEmpty ? "Create Profile" : "Complete Profile"} <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </section>

          {/* Navigation Tabs */}
          <div className="flex overflow-x-auto border-b border-slate-200 gap-6 px-3 bg-white rounded-t-xl">
            {["About Me", "Experience", "Education", "Skills", "Certifications", "Achievements", "Preferences"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap py-3.5 text-sm font-semibold transition-colors border-b-2 ${activeTab === tab
                      ? "border-blue-600 text-blue-700"
                      : "border-transparent text-slate-500 hover:text-slate-800"
                    }`}
                >
                  {tab}
                </button>
              )
            )}
          </div>

          {/* ABOUT ME TAB */}
          {activeTab === "About Me" && (
            <section className="profile-card bg-white border border-slate-200 rounded-xl p-6 space-y-6 shadow-sm">
              <div>
                <h2 className="flex items-center gap-2 font-bold text-slate-800 text-base">
                  <span className="flex items-center justify-center w-7 h-7 rounded-md bg-blue-50 text-blue-700">
                    <FileText className="w-4 h-4" />
                  </span>
                  Professional Summary
                </h2>
                <div className="mt-3 bg-slate-50 p-4 rounded-lg border border-slate-100">
                  {profile?.about ? (
                    <p className="text-sm text-slate-700 leading-relaxed">{profile.about}</p>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-3 text-center">
                      <p className="text-xs text-slate-400 font-mono">- No summary added yet -</p>
                      <button
                        onClick={() => setIsEditAboutOpen(true)}
                        className="mt-2 text-xs text-blue-700 font-semibold hover:underline"
                      >
                        + Add Professional Summary
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-slate-100 pt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-xs">
                <InfoRow icon={<Cake className="w-3.5 h-3.5" />} label="Date of Birth" value={formatDateForDisplay(profile?.dob)} />
                <InfoRow
                  icon={<GraduationCap className="w-3.5 h-3.5" />}
                  label="Qualification"
                  value={profile?.qualification || ""}
                />
                <InfoRow icon={<User className="w-3.5 h-3.5" />} label="Gender" value={profile?.gender || ""} />
                <InfoRow icon={<Heart className="w-3.5 h-3.5" />} label="Marital Status" value={profile?.maritalStatus || ""} />
                <InfoRow
                  icon={<Languages className="w-3.5 h-3.5" />}
                  label="Languages Known"
                  value={profile?.languages?.join(", ") || ""}
                />
                <InfoRow
                  icon={<ShieldCheck className="w-3.5 h-3.5" />}
                  label="Work Authorization"
                  value={profile?.workAuthorization || ""}
                />
                <InfoRow
                  icon={<CalendarDays className="w-3.5 h-3.5" />}
                  label="Notice Period"
                  value={displayNoticePeriod}
                />
                <InfoRow
                  icon={<Clock3 className="w-3.5 h-3.5" />}
                  label="Availability"
                  value={displayAvailability}
                />
              </div>

              <button
                onClick={() => setIsEditAboutOpen(true)}
                className="flex items-center gap-2 mx-auto text-xs font-semibold text-blue-700 hover:text-blue-800"
              >
                <Edit3 className="w-3.5 h-3.5" /> {isProfileEmpty ? "Create Profile Details" : "Edit Personal Info"}
              </button>
            </section>
          )}

          {/* EXPERIENCE TAB */}
          {(activeTab === "About Me" || activeTab === "Experience") && (
            <section className="profile-card bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-slate-800 text-base flex items-center gap-2">
                  <BriefcaseBusiness className="w-5 h-5 text-blue-700" /> Work Experience
                </h2>
                <button
                  onClick={handleOpenAddExperience}
                  className="text-xs text-blue-700 hover:bg-blue-50 font-semibold border border-blue-200 rounded-lg px-3 py-1.5 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Experience
                </button>
              </div>

              {experiences.length === 0 ? (
                <div className="text-center py-6 bg-slate-50 rounded-lg border border-dashed border-slate-200 p-6">
                  <p className="text-xs text-slate-500 font-medium">No work experience added yet.</p>
                  <button
                    onClick={handleOpenAddExperience}
                    className="mt-3 text-xs bg-blue-700 hover:bg-blue-800 text-white font-semibold px-4 py-2 rounded-lg"
                  >
                    + Add Work Experience
                  </button>
                </div>
              ) : (
                <div className="relative border-l border-dashed border-blue-200 ml-3 mt-5 pl-7 space-y-6">
                  {experiences.map((exp) => (
                    <div key={exp._id} className="relative group">
                      <span className="absolute -left-[35px] top-1 w-3.5 h-3.5 rounded-full bg-blue-700 ring-4 ring-white" />
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-sm text-slate-900">{exp.role}</p>
                          <p className="text-xs text-slate-600 font-medium mt-0.5">{exp.company}</p>
                          <p className="text-xs text-slate-500 mt-2 flex items-center gap-3">
                            <span>
                              <CalendarDays className="w-3 h-3 inline mr-1 text-blue-600" />
                              {exp.startDate} - {exp.endDate}
                            </span>
                            <span>
                              <MapPin className="w-3 h-3 inline mr-1 text-blue-600" />
                              {exp.location}
                            </span>
                          </p>
                          {exp.description && (
                            <p className="text-xs text-slate-600 mt-2 bg-slate-50 p-2.5 rounded border border-slate-100">
                              {exp.description}
                            </p>
                          )}
                        </div>
                        {/* Edit & Delete Actions */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleOpenEditExperience(exp)}
                            className="text-blue-700 hover:bg-blue-50 border border-blue-200 text-xs px-2.5 py-1 rounded font-semibold flex items-center gap-1"
                            title="Edit Experience"
                          >
                            <Edit3 className="w-3 h-3" /> Edit
                          </button>
                          <button
                            onClick={() => handleDeleteExp(exp._id)}
                            className="text-rose-600 hover:bg-rose-50 border border-rose-200 text-xs p-1 rounded"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* EDUCATION TAB */}
          {activeTab === "Education" && (
            <section className="profile-card bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-slate-800 text-base flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-blue-700" /> Education & Qualifications
                </h2>
                <button
                  onClick={handleOpenAddEducation}
                  className="text-xs text-blue-700 hover:bg-blue-50 font-semibold border border-blue-200 rounded-lg px-3 py-1.5 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Education
                </button>
              </div>

              {educations.length === 0 ? (
                <div className="text-center py-6 bg-slate-50 rounded-lg border border-dashed border-slate-200 p-6">
                  <p className="text-xs text-slate-500 font-medium">No education or qualifications added yet.</p>
                  <button
                    onClick={handleOpenAddEducation}
                    className="mt-3 text-xs bg-blue-700 hover:bg-blue-800 text-white font-semibold px-4 py-2 rounded-lg"
                  >
                    + Add Education & Qualification
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {educations.map((edu) => (
                    <div key={edu._id} className="p-4 border border-slate-200 rounded-lg relative group bg-slate-50/50 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold text-sm text-slate-900">{edu.degree}</h3>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleOpenEditEducation(edu)}
                              className="text-blue-700 hover:bg-blue-100 p-1 rounded"
                              title="Edit Education"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteEdu(edu._id)}
                              className="text-rose-600 hover:bg-rose-100 p-1 rounded"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                        <p className="text-xs text-blue-700 font-medium">{edu.fieldOfStudy}</p>
                        <p className="text-xs text-slate-600 mt-1">{edu.institution}</p>
                        {edu.fileUrl && (
                          <a
                            href={edu.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-blue-700 font-semibold hover:underline mt-2 bg-blue-50 px-2.5 py-1 rounded"
                          >
                            <Paperclip className="w-3.5 h-3.5" /> View Certificate
                          </a>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-3 font-mono border-t border-slate-200/60 pt-2">
                        {edu.startYear} - {edu.endYear} {edu.grade ? `| ${edu.grade}` : ""}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* SKILLS TAB */}
          {activeTab === "Skills" && (
            <section className="profile-card bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-slate-800 text-base flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-700" /> Accountant Skills & Competencies
                </h2>
                <button
                  onClick={() => setIsAddSkillOpen(true)}
                  className="text-xs bg-blue-700 text-white hover:bg-blue-800 font-semibold rounded-lg px-3.5 py-1.5 flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" /> Manage / Add Accountant Skills
                </button>
              </div>

              {skills.length === 0 ? (
                <div className="text-center py-6 bg-slate-50 rounded-lg border border-dashed border-slate-200 p-6">
                  <p className="text-xs text-slate-500 font-medium">No accountant skills added yet.</p>
                  <button
                    onClick={() => setIsAddSkillOpen(true)}
                    className="mt-3 text-xs bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg"
                  >
                    Select Accountant Skills
                  </button>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2.5 pt-2">
                  {skills.map((sk) => (
                    <span
                      key={sk._id}
                      className="inline-flex items-center gap-2 bg-blue-50 text-blue-900 border border-blue-200 px-3 py-1.5 rounded-lg text-xs font-semibold group hover:bg-blue-100 transition-colors"
                    >
                      {sk.name}
                      <span className="text-[10px] bg-blue-200/80 text-blue-800 px-1.5 py-0.5 rounded font-normal">
                        {sk.level}
                      </span>
                      <button
                        onClick={() => handleDeleteSkill(sk._id)}
                        className="text-slate-400 hover:text-rose-600 ml-1"
                        title="Remove skill"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* CERTIFICATIONS TAB */}
          {activeTab === "Certifications" && (
            <section className="profile-card bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-slate-800 text-base flex items-center gap-2">
                  <Award className="w-5 h-5 text-blue-700" /> Certifications & Licenses
                </h2>
                <button
                  onClick={() => setIsAddCertOpen(true)}
                  className="text-xs text-blue-700 hover:bg-blue-50 font-semibold border border-blue-200 rounded-lg px-3 py-1.5 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Certification
                </button>
              </div>

              {certifications.length === 0 ? (
                <div className="text-center py-6 bg-slate-50 rounded-lg border border-dashed border-slate-200 p-6">
                  <p className="text-xs text-slate-500 font-medium">No certifications added yet.</p>
                  <button
                    onClick={() => setIsAddCertOpen(true)}
                    className="mt-3 text-xs bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg"
                  >
                    + Add Certification
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {certifications.map((c) => (
                    <div key={c._id} className="p-4 border border-slate-200 rounded-lg flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-sm text-slate-900">{c.title}</h4>
                        <p className="text-xs text-slate-600 mt-0.5">{c.issuingOrganization}</p>
                        {c.credentialId && <p className="text-[11px] text-slate-400 font-mono mt-1">ID: {c.credentialId}</p>}
                        {c.fileUrl && (
                          <a
                            href={c.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-blue-700 font-semibold hover:underline mt-2 bg-blue-50 px-2.5 py-1 rounded"
                          >
                            <Paperclip className="w-3.5 h-3.5" /> View Certificate
                          </a>
                        )}
                      </div>
                      <button onClick={() => handleDeleteCert(c._id)} className="text-rose-600 p-1 hover:bg-rose-50 rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* ACHIEVEMENTS TAB */}
          {activeTab === "Achievements" && (
            <section className="profile-card bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-slate-800 text-base flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" /> Honors, Awards & Achievements
                </h2>
                <button
                  onClick={() => setIsAddAchieveOpen(true)}
                  className="text-xs text-blue-700 hover:bg-blue-50 font-semibold border border-blue-200 rounded-lg px-3 py-1.5 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Achievement
                </button>
              </div>

              {achievements.length === 0 ? (
                <div className="text-center py-6 bg-slate-50 rounded-lg border border-dashed border-slate-200 p-6">
                  <p className="text-xs text-slate-500 font-medium">No honors or achievements added yet.</p>
                  <button
                    onClick={() => setIsAddAchieveOpen(true)}
                    className="mt-3 text-xs bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg"
                  >
                    + Add Achievement
                  </button>
                </div>
              ) : (
                <div className="space-y-3.5">
                  {achievements.map((ach) => (
                    <div key={ach._id} className="p-4 border border-slate-200 rounded-lg flex justify-between items-start bg-slate-50/50">
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                          {ach.title}
                        </h4>
                        {ach.organization && <p className="text-xs text-blue-700 font-medium mt-0.5">{ach.organization}</p>}
                        {ach.date && <p className="text-[11px] text-slate-500 mt-1 font-mono">{ach.date}</p>}
                        {ach.description && <p className="text-xs text-slate-600 mt-2 bg-white p-2.5 rounded border border-slate-100">{ach.description}</p>}
                        {ach.fileUrl && (
                          <a
                            href={ach.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-blue-700 font-semibold hover:underline mt-2 bg-blue-50 px-2.5 py-1 rounded"
                          >
                            <Paperclip className="w-3.5 h-3.5" /> View Document
                          </a>
                        )}
                      </div>
                      <button onClick={() => handleDeleteAchieve(ach._id)} className="text-rose-600 p-1 hover:bg-rose-50 rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* PREFERENCES TAB */}
          {activeTab === "Preferences" && (
            <section className="profile-card bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-slate-800 text-base flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-700" /> Career Preferences
                </h2>
                <button
                  onClick={handleOpenEditPreferences}
                  className="text-xs text-blue-700 hover:bg-blue-50 font-semibold border border-blue-200 rounded-lg px-3 py-1.5 flex items-center gap-1"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Edit Preferences
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-slate-500 font-medium block">Preferred Job Roles:</span>
                  <span className="font-semibold text-slate-800 text-sm mt-1 block">
                    {preferences?.preferredJobRoles?.join(", ") || "-"}
                  </span>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-slate-500 font-medium block">Preferred Locations:</span>
                  <span className="font-semibold text-slate-800 text-sm mt-1 block">
                    {preferences?.preferredLocations?.join(", ") || "-"}
                  </span>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-slate-500 font-medium block">Employment Type:</span>
                  <span className="font-semibold text-slate-800 text-sm mt-1 block">{preferences?.employmentType || "-"}</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-slate-500 font-medium block">Expected Salary:</span>
                  <span className="font-semibold text-slate-800 text-sm mt-1 block">{displayExpectedSalary}</span>
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-5">
          <ProfileSide title="Quick Overview" icon={<CircleUserRound />}>
            <Info icon={<BriefcaseBusiness className="w-3.5 h-3.5" />} label="Total Experience" value={computedTotalExp} />
            <Info icon={<MapPin className="w-3.5 h-3.5" />} label="Current Location" value={profile?.location || "-"} />
            <Info icon={<Target className="w-3.5 h-3.5" />} label="Expected Salary" value={displayExpectedSalary} />
            <Info icon={<CalendarDays className="w-3.5 h-3.5" />} label="Notice Period" value={displayNoticePeriod} />
            <Info icon={<Clock3 className="w-3.5 h-3.5" />} label="Availability" value={displayAvailability} />
            <button
              onClick={() => setIsEditAboutOpen(true)}
              className="text-xs text-blue-700 hover:underline font-semibold mt-2 flex items-center gap-1"
            >
              Edit Personal Info & Overview <ArrowRight className="w-3 h-3" />
            </button>
          </ProfileSide>

          <ProfileSide title="Career Preferences" icon={<Target />} action="Edit" onAction={handleOpenEditPreferences}>
            <Info label="Preferred Job Roles" value={preferences?.preferredJobRoles?.join(", ") || "-"} />
            <Info label="Preferred Locations" value={preferences?.preferredLocations?.join(", ") || "-"} />
            <Info label="Employment Type" value={preferences?.employmentType || "-"} />
            <Info label="Expected Salary" value={displayExpectedSalary} />
          </ProfileSide>

          {/* Documents Section matching reference design */}
          <ProfileSide
            title="Documents"
            icon={<FileText className="w-4 h-4" />}
            action="Manage"
            onAction={() => setIsDocModalOpen(true)}
          >
            {["Resume", "Aadhaar Card", "PAN Card"].map((presetTitle) => {
              const doc = documents.find(
                (d) => d.title.toLowerCase() === presetTitle.toLowerCase()
              );
              const defaultName = `${user?.fullName?.replace(/\s+/g, "_") || "Candidate"}_${presetTitle.replace(/\s+/g, "")}.pdf`;

              return (
                <div
                  key={presetTitle}
                  className="flex items-center gap-3 py-2 border-b last:border-0 border-slate-100"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-900">{presetTitle}</p>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {doc ? doc.fileName : defaultName}
                    </p>
                    {doc?.uploadedAt && (
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        Updated on {formatDateForDisplay(doc.uploadedAt.slice(0, 10))}
                      </p>
                    )}
                  </div>
                  {doc ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <button
                      onClick={() => {
                        setDocPreset(presetTitle);
                        setIsDocModalOpen(true);
                      }}
                      className="text-[11px] font-semibold text-blue-700 hover:bg-blue-50 border border-blue-200 px-2 py-0.5 rounded shrink-0"
                    >
                      + Upload
                    </button>
                  )}
                </div>
              );
            })}

            <button
              onClick={() => setIsDocModalOpen(true)}
              className="w-full text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center justify-start gap-1 pt-2 transition-all"
            >
              View All Documents <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </ProfileSide>
        </aside>
      </div>

      {/* Tip Banner */}
      <section className="profile-card bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-5 flex flex-col sm:flex-row items-center gap-4 shadow-sm">
        <div className="w-12 h-12 rounded-full bg-blue-700 text-white grid place-items-center shrink-0">
          <Award className="w-6 h-6" />
        </div>
        <div className="flex-1 text-center sm:text-left">
          <p className="font-bold text-sm text-blue-900">Profile Tip for Accountants</p>
          <p className="text-xs text-slate-600 mt-1">
            Adding relevant accounting software skills like Tally Prime, GST filing experience, and Advance Excel increases employer callbacks by 3x!
          </p>
        </div>
        <button
          onClick={() => setIsAddSkillOpen(true)}
          className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors"
        >
          Add Accountant Skills Now
        </button>
      </section>

      {/* MODAL: EDIT ABOUT & PERSONAL INFO */}
      {isEditAboutOpen && (
        <Modal title={isProfileEmpty ? "Create Profile Details" : "Edit Profile & Personal Info"} onClose={() => setIsEditAboutOpen(false)}>
          <form onSubmit={handleSaveAbout} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
              <input
                type="text"
                value={aboutForm.fullName}
                onChange={(e) => setAboutForm({ ...aboutForm, fullName: e.target.value })}
                className="w-full text-sm border border-slate-300 rounded-lg p-2.5"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Professional Headline</label>
              <input
                type="text"
                value={aboutForm.headline}
                onChange={(e) => setAboutForm({ ...aboutForm, headline: e.target.value })}
                className="w-full text-sm border border-slate-300 rounded-lg p-2.5"
                placeholder="e.g. Senior Accountant | GST & Tally Specialist"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Professional Summary / About</label>
              <textarea
                rows={3}
                value={aboutForm.about}
                onChange={(e) => setAboutForm({ ...aboutForm, about: e.target.value })}
                className="w-full text-sm border border-slate-300 rounded-lg p-2.5"
                placeholder="Write a brief overview of your accounting experience, skills, and goals..."
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Location</label>
                <input
                  type="text"
                  value={aboutForm.location}
                  onChange={(e) => setAboutForm({ ...aboutForm, location: e.target.value })}
                  className="w-full text-sm border border-slate-300 rounded-lg p-2.5"
                  placeholder="e.g. Mumbai, Maharashtra"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Date of Birth (Select Date)</label>
                <input
                  type="date"
                  value={aboutForm.dob}
                  onChange={(e) => setAboutForm({ ...aboutForm, dob: e.target.value })}
                  className="w-full text-sm border border-slate-300 rounded-lg p-2.5 bg-white text-slate-800 cursor-pointer"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Qualification</label>
                <input
                  type="text"
                  value={aboutForm.qualification}
                  onChange={(e) => setAboutForm({ ...aboutForm, qualification: e.target.value })}
                  className="w-full text-sm border border-slate-300 rounded-lg p-2.5"
                  placeholder="e.g. B.Com, CA Inter"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Work Authorization</label>
                <input
                  type="text"
                  value={aboutForm.workAuthorization}
                  onChange={(e) => setAboutForm({ ...aboutForm, workAuthorization: e.target.value })}
                  className="w-full text-sm border border-slate-300 rounded-lg p-2.5"
                  placeholder="e.g. Indian Citizen"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Notice Period</label>
                <select
                  value={aboutForm.noticePeriod}
                  onChange={(e) => setAboutForm({ ...aboutForm, noticePeriod: e.target.value })}
                  className="w-full text-sm border border-slate-300 rounded-lg p-2.5 bg-white"
                >
                  <option value="">Select Notice Period</option>
                  <option value="Immediate">Immediate</option>
                  <option value="15 Days">15 Days</option>
                  <option value="30 Days">30 Days</option>
                  <option value="60 Days">60 Days</option>
                  <option value="90 Days">90 Days</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Availability</label>
                <select
                  value={aboutForm.availability}
                  onChange={(e) => setAboutForm({ ...aboutForm, availability: e.target.value })}
                  className="w-full text-sm border border-slate-300 rounded-lg p-2.5 bg-white"
                >
                  <option value="">Select Availability</option>
                  <option value="Immediate">Immediate</option>
                  <option value="Within 15 Days">Within 15 Days</option>
                  <option value="Within 1 Month">Within 1 Month</option>
                  <option value="More than 1 Month">More than 1 Month</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Gender</label>
                <select
                  value={aboutForm.gender}
                  onChange={(e) => setAboutForm({ ...aboutForm, gender: e.target.value })}
                  className="w-full text-sm border border-slate-300 rounded-lg p-2.5 bg-white"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Marital Status</label>
                <select
                  value={aboutForm.maritalStatus}
                  onChange={(e) => setAboutForm({ ...aboutForm, maritalStatus: e.target.value })}
                  className="w-full text-sm border border-slate-300 rounded-lg p-2.5 bg-white"
                >
                  <option value="">Select Status</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Languages (comma separated)</label>
              <input
                type="text"
                value={aboutForm.languages}
                onChange={(e) => setAboutForm({ ...aboutForm, languages: e.target.value })}
                className="w-full text-sm border border-slate-300 rounded-lg p-2.5"
                placeholder="e.g. English, Hindi, Marathi"
              />
            </div>
            <div className="flex justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setIsEditAboutOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button type="submit" className="px-5 py-2 text-xs font-semibold bg-blue-700 text-white rounded-lg hover:bg-blue-800">
                Save Profile
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* MODAL: ACCOUNTANT SKILLS MANAGEMENT */}
      {isAddSkillOpen && (
        <Modal title="Manage & Add Accountant Skills" onClose={() => setIsAddSkillOpen(false)}>
          <div className="space-y-4">
            <p className="text-xs text-slate-600">
              Select key accounting software, tax compliance, and finance skills to add to your profile:
            </p>

            {/* Quick Skill Tags Selection */}
            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Recommended Accountant Skills (Click to Select):
              </label>
              <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-1">
                {skillSuggestions.map((sName) => {
                  const isSelected = selectedSkillsToAdd.includes(sName);
                  const isAlreadySaved = skills.some((sk) => sk.name.toLowerCase() === sName.toLowerCase());

                  return (
                    <button
                      key={sName}
                      type="button"
                      disabled={isAlreadySaved}
                      onClick={() => handleAddSkillTag(sName)}
                      className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${isAlreadySaved
                          ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                          : isSelected
                            ? "bg-blue-700 text-white border-blue-700 font-semibold"
                            : "bg-white text-slate-700 border-slate-300 hover:border-blue-500 hover:text-blue-700"
                        }`}
                    >
                      {sName} {isAlreadySaved ? "✓" : isSelected ? "✓" : "+"}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Skill Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Add Custom Skill (if not in list above)</label>
              <input
                type="text"
                placeholder="e.g. Auditing, SAP FI/CO"
                value={customSkillInput}
                onChange={(e) => setCustomSkillInput(e.target.value)}
                className="w-full text-sm border border-slate-300 rounded-lg p-2.5"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setIsAddSkillOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveSkills}
                className="px-5 py-2 text-xs font-semibold bg-blue-700 text-white rounded-lg hover:bg-blue-800"
              >
                Save Selected Skills
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* MODAL: WORK EXPERIENCE (ADD & EDIT) */}
      {isExpModalOpen && (
        <Modal
          title={editingExpId ? "Edit Work Experience" : "Add Work Experience"}
          onClose={() => setIsExpModalOpen(false)}
        >
          <form onSubmit={handleSaveExperience} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Job Designation / Role *</label>
              <input
                type="text"
                placeholder="e.g. Senior Accountant"
                value={expForm.role}
                onChange={(e) => setExpForm({ ...expForm, role: e.target.value })}
                className="w-full text-sm border border-slate-300 rounded-lg p-2.5"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Company / Firm Name *</label>
              <input
                type="text"
                placeholder="e.g. Sharma & Co. CA Firm"
                value={expForm.company}
                onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
                className="w-full text-sm border border-slate-300 rounded-lg p-2.5"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Job Location / City</label>
              <input
                type="text"
                placeholder="e.g. Mumbai, Maharashtra"
                value={expForm.location}
                onChange={(e) => setExpForm({ ...expForm, location: e.target.value })}
                className="w-full text-sm border border-slate-300 rounded-lg p-2.5"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Start Date *</label>
                <input
                  type="text"
                  placeholder="e.g. Jan 2022"
                  value={expForm.startDate}
                  onChange={(e) => setExpForm({ ...expForm, startDate: e.target.value })}
                  className="w-full text-sm border border-slate-300 rounded-lg p-2.5"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">End Date</label>
                <input
                  type="text"
                  placeholder="e.g. Dec 2021 or Present"
                  value={expForm.isCurrent ? "Present" : expForm.endDate}
                  disabled={expForm.isCurrent}
                  onChange={(e) => setExpForm({ ...expForm, endDate: e.target.value })}
                  className={`w-full text-sm border border-slate-300 rounded-lg p-2.5 ${expForm.isCurrent ? "bg-slate-100 text-slate-500 cursor-not-allowed" : "bg-white"}`}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isCurrentCheckbox"
                checked={expForm.isCurrent}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setExpForm({
                    ...expForm,
                    isCurrent: checked,
                    endDate: checked ? "Present" : expForm.endDate === "Present" ? "" : expForm.endDate,
                  });
                }}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
              />
              <label htmlFor="isCurrentCheckbox" className="text-xs font-medium text-slate-700 cursor-pointer">
                I am currently working in this role
              </label>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Description / Key Responsibilities</label>
              <textarea
                rows={3}
                placeholder="Managed Tally accounting, GST return filing, TDS payments..."
                value={expForm.description}
                onChange={(e) => setExpForm({ ...expForm, description: e.target.value })}
                className="w-full text-sm border border-slate-300 rounded-lg p-2.5"
              />
            </div>
            <div className="flex justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setIsExpModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button type="submit" className="px-5 py-2 text-xs font-semibold bg-blue-700 text-white rounded-lg hover:bg-blue-800">
                {editingExpId ? "Save Changes" : "Save Experience"}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* MODAL: EDUCATION (ADD & EDIT) */}
      {isEduModalOpen && (
        <Modal
          title={editingEduId ? "Edit Education & Qualification" : "Add Education & Qualification"}
          onClose={() => setIsEduModalOpen(false)}
        >
          <form onSubmit={handleSaveEducation} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Degree / Qualification *</label>
              <input
                type="text"
                placeholder="e.g. B.Com, M.Com, CA Intermediate"
                value={eduForm.degree}
                onChange={(e) => setEduForm({ ...eduForm, degree: e.target.value })}
                className="w-full text-sm border border-slate-300 rounded-lg p-2.5"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Institution / University *</label>
              <input
                type="text"
                placeholder="e.g. Mumbai University"
                value={eduForm.institution}
                onChange={(e) => setEduForm({ ...eduForm, institution: e.target.value })}
                className="w-full text-sm border border-slate-300 rounded-lg p-2.5"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Start Year</label>
                <input
                  type="text"
                  placeholder="e.g. 2015"
                  value={eduForm.startYear}
                  onChange={(e) => setEduForm({ ...eduForm, startYear: e.target.value })}
                  className="w-full text-sm border border-slate-300 rounded-lg p-2.5"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">End Year</label>
                <input
                  type="text"
                  placeholder="e.g. 2018"
                  value={eduForm.endYear}
                  onChange={(e) => setEduForm({ ...eduForm, endYear: e.target.value })}
                  className="w-full text-sm border border-slate-300 rounded-lg p-2.5"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Grade / Distinction (Optional)</label>
              <input
                type="text"
                placeholder="e.g. First Class Distinction"
                value={eduForm.grade}
                onChange={(e) => setEduForm({ ...eduForm, grade: e.target.value })}
                className="w-full text-sm border border-slate-300 rounded-lg p-2.5"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Attach Degree / Marksheet (S3 Document)</label>
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={handleEduDocumentUpload}
                  className="w-full text-xs border border-slate-300 rounded-lg p-2 bg-white"
                />
                {uploadingEduDoc && <Loader2 className="w-4 h-4 animate-spin text-blue-700 shrink-0" />}
              </div>
              {eduForm.fileUrl && (
                <p className="text-[11px] text-emerald-700 font-medium mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Certificate Attached Successfully
                </p>
              )}
            </div>
            <div className="flex justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setIsEduModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button type="submit" className="px-5 py-2 text-xs font-semibold bg-blue-700 text-white rounded-lg hover:bg-blue-800">
                {editingEduId ? "Save Changes" : "Save Education"}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* MODAL: ADD CERTIFICATION */}
      {isAddCertOpen && (
        <Modal title="Add Certification" onClose={() => setIsAddCertOpen(false)}>
          <form onSubmit={handleSaveCertification} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Certification Title *</label>
              <input
                type="text"
                placeholder="e.g. Tally Certified Professional"
                value={certForm.title}
                onChange={(e) => setCertForm({ ...certForm, title: e.target.value })}
                className="w-full text-sm border border-slate-300 rounded-lg p-2.5"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Issuing Organization *</label>
              <input
                type="text"
                placeholder="e.g. Tally Education Pvt Ltd"
                value={certForm.issuingOrganization}
                onChange={(e) => setCertForm({ ...certForm, issuingOrganization: e.target.value })}
                className="w-full text-sm border border-slate-300 rounded-lg p-2.5"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Attach Certification Document (S3 Upload)</label>
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={handleCertDocumentUpload}
                  className="w-full text-xs border border-slate-300 rounded-lg p-2 bg-white"
                />
                {uploadingCertDoc && <Loader2 className="w-4 h-4 animate-spin text-blue-700 shrink-0" />}
              </div>
              {certForm.fileUrl && (
                <p className="text-[11px] text-emerald-700 font-medium mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Certificate Document Attached
                </p>
              )}
            </div>
            <div className="flex justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setIsAddCertOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button type="submit" className="px-5 py-2 text-xs font-semibold bg-blue-700 text-white rounded-lg hover:bg-blue-800">
                Save Certification
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* MODAL: ADD ACHIEVEMENT */}
      {isAddAchieveOpen && (
        <Modal title="Add Honor & Achievement" onClose={() => setIsAddAchieveOpen(false)}>
          <form onSubmit={handleSaveAchievement} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Achievement / Award Title *</label>
              <input
                type="text"
                placeholder="e.g. Best Accountant Award, Automation Milestone"
                value={achieveForm.title}
                onChange={(e) => setAchieveForm({ ...achieveForm, title: e.target.value })}
                className="w-full text-sm border border-slate-300 rounded-lg p-2.5"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Organization / Issuing Firm</label>
              <input
                type="text"
                placeholder="e.g. Sharma & Co. CA Firm, ICAI"
                value={achieveForm.organization}
                onChange={(e) => setAchieveForm({ ...achieveForm, organization: e.target.value })}
                className="w-full text-sm border border-slate-300 rounded-lg p-2.5"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Year / Date</label>
              <input
                type="text"
                placeholder="e.g. 2023 or Mar 2023"
                value={achieveForm.date}
                onChange={(e) => setAchieveForm({ ...achieveForm, date: e.target.value })}
                className="w-full text-sm border border-slate-300 rounded-lg p-2.5"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Description / Key Highlights</label>
              <textarea
                rows={3}
                placeholder="e.g. Recognized for zero-defect GST return filings and automated Tally ledger reconciliation..."
                value={achieveForm.description}
                onChange={(e) => setAchieveForm({ ...achieveForm, description: e.target.value })}
                className="w-full text-sm border border-slate-300 rounded-lg p-2.5"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Attach Award / Certificate Document (S3 Upload)</label>
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={handleAchieveDocumentUpload}
                  className="w-full text-xs border border-slate-300 rounded-lg p-2 bg-white"
                />
                {uploadingAchieveDoc && <Loader2 className="w-4 h-4 animate-spin text-blue-700 shrink-0" />}
              </div>
              {achieveForm.fileUrl && (
                <p className="text-[11px] text-emerald-700 font-medium mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Achievement Document Attached
                </p>
              )}
            </div>
            <div className="flex justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setIsAddAchieveOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button type="submit" className="px-5 py-2 text-xs font-semibold bg-blue-700 text-white rounded-lg hover:bg-blue-800">
                Save Achievement
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* MODAL: EDIT CAREER PREFERENCES */}
      {isEditPrefOpen && (
        <Modal title="Edit Career Preferences" onClose={() => setIsEditPrefOpen(false)}>
          <form onSubmit={handleSavePreferences} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Job Roles (comma separated)</label>
              <input
                type="text"
                placeholder="e.g. Accountant, Tax Executive, GST Specialist"
                value={prefForm.preferredJobRoles}
                onChange={(e) => setPrefForm({ ...prefForm, preferredJobRoles: e.target.value })}
                className="w-full text-sm border border-slate-300 rounded-lg p-2.5"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Locations (comma separated)</label>
              <input
                type="text"
                placeholder="e.g. Mumbai, Navi Mumbai, Thane"
                value={prefForm.preferredLocations}
                onChange={(e) => setPrefForm({ ...prefForm, preferredLocations: e.target.value })}
                className="w-full text-sm border border-slate-300 rounded-lg p-2.5"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Employment Type</label>
                <select
                  value={prefForm.employmentType}
                  onChange={(e) => setPrefForm({ ...prefForm, employmentType: e.target.value })}
                  className="w-full text-sm border border-slate-300 rounded-lg p-2.5 bg-white"
                >
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Expected Salary</label>
                <input
                  type="text"
                  placeholder="e.g. ₹4 - 5 LPA"
                  value={prefForm.expectedSalary}
                  onChange={(e) => setPrefForm({ ...prefForm, expectedSalary: e.target.value })}
                  className="w-full text-sm border border-slate-300 rounded-lg p-2.5"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setIsEditPrefOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button type="submit" className="px-5 py-2 text-xs font-semibold bg-blue-700 text-white rounded-lg hover:bg-blue-800">
                Save Preferences
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* MODAL: MANAGE & UPLOAD CANDIDATE DOCUMENTS */}
      {isDocModalOpen && (
        <Modal title="Manage Documents (S3 Upload)" onClose={() => setIsDocModalOpen(false)}>
          <div className="space-y-5">
            {/* Document Upload Form */}
            <form onSubmit={handleUploadDocumentSubmit} className="space-y-3 bg-blue-50/60 p-4 rounded-xl border border-blue-100">
              <h4 className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                <Upload className="w-4 h-4 text-blue-700" /> Upload Document to S3 Bucket
              </h4>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Document Type / Preset</label>
                <select
                  value={docPreset}
                  onChange={(e) => setDocPreset(e.target.value)}
                  className="w-full text-xs border border-slate-300 rounded-lg p-2 bg-white text-slate-800"
                >
                  <option value="Resume">Resume</option>
                  <option value="Aadhaar Card">Aadhaar Card</option>
                  <option value="PAN Card">PAN Card</option>
                  <option value="Degree Certificate">Degree / Qualification Certificate</option>
                  <option value="CA Certificate">CA / Professional Certificate</option>
                  <option value="Experience Letter">Experience Letter</option>
                  <option value="Other">Other Custom Document</option>
                </select>
              </div>

              {docPreset === "Other" && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Document Title *</label>
                  <input
                    type="text"
                    placeholder="e.g. GST Practitioner Certificate"
                    value={docCustomTitle}
                    onChange={(e) => setDocCustomTitle(e.target.value)}
                    className="w-full text-xs border border-slate-300 rounded-lg p-2 bg-white"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Select File (PDF, DOCX, JPG, PNG)</label>
                <input
                  type="file"
                  ref={docFileInputRef}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={(e) => setDocFile(e.target.files?.[0] || null)}
                  className="w-full text-xs border border-slate-300 rounded-lg p-1.5 bg-white text-slate-800"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={uploadingDoc || !docFile}
                className="w-full bg-blue-700 hover:bg-blue-800 disabled:bg-slate-300 text-white font-semibold text-xs py-2.5 rounded-lg flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                {uploadingDoc ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" /> Uploading File to S3...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" /> Upload Document
                  </>
                )}
              </button>
            </form>

            {/* List of Uploaded Documents */}
            <div className="space-y-3 pt-1">
              <h4 className="text-xs font-bold text-slate-800 flex items-center justify-between">
                <span>Uploaded Documents</span>
                <span className="text-[11px] font-normal text-slate-500">{documents.length} File(s)</span>
              </h4>

              {documents.length === 0 ? (
                <div className="text-center py-6 bg-slate-50 rounded-lg border border-dashed border-slate-200 p-4">
                  <p className="text-xs text-slate-500 font-medium">No documents uploaded to S3 yet.</p>
                  <p className="text-[11px] text-slate-400 mt-1">Select a file above to start uploading.</p>
                </div>
              ) : (
                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  {documents.map((doc) => (
                    <div
                      key={doc._id}
                      className="flex items-center justify-between p-3 border border-slate-200 rounded-lg bg-white shadow-xs"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-900 truncate">{doc.title}</p>
                          <p className="text-[11px] text-slate-500 truncate">{doc.fileName}</p>
                          {doc.uploadedAt && (
                            <p className="text-[10px] text-slate-400 mt-0.5">
                              Uploaded on {formatDateForDisplay(doc.uploadedAt.slice(0, 10))}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <a
                          href={doc.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-700 hover:bg-blue-50 border border-blue-200 p-1.5 rounded-md flex items-center gap-1 text-xs font-semibold transition-colors"
                          title="View Document"
                        >
                          <Eye className="w-3.5 h-3.5" /> View
                        </a>
                        <button
                          type="button"
                          onClick={() => doc._id && handleDeleteDocument(doc._id)}
                          className="text-rose-600 hover:bg-rose-50 border border-rose-200 p-1.5 rounded-md transition-colors"
                          title="Delete Document"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

const Info = ({ icon, label, value }: { icon?: React.ReactNode; label: string; value: string }) => (
  <div className="flex gap-3 items-start text-xs">
    {icon && <span className="text-slate-400 shrink-0 mt-0.5">{icon}</span>}
    <span className="text-slate-500 flex-1">{label}</span>
    <span className={`font-medium text-right max-w-[140px] truncate ${value && value !== "-" ? "text-slate-800" : "text-slate-400 font-mono"}`}>
      {value || "-"}
    </span>
  </div>
);

const ProfileSide = ({
  title,
  icon,
  action,
  onAction,
  children,
}: {
  title: string;
  icon: React.ReactElement;
  action?: string;
  onAction?: () => void;
  children: React.ReactNode;
}) => (
  <section className="profile-card bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
    <div className="flex justify-between items-center mb-4">
      <h2 className="font-bold text-slate-800 text-sm flex items-center gap-2">
        <span className="text-blue-700">{icon}</span>
        {title}
      </h2>
      {action && (
        <button onClick={onAction} className="text-xs font-semibold text-blue-700 hover:underline">
          {action}
        </button>
      )}
    </div>
    <div className="space-y-3.5">{children}</div>
  </section>
);

const Modal = ({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) => (
  <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
    <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-center p-4 border-b border-slate-200">
        <h3 className="font-bold text-slate-900 text-base">{title}</h3>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-700 p-1 rounded-lg">
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="p-5">{children}</div>
    </div>
  </div>
);

export default Profile;
