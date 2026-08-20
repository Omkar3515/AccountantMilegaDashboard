import { useState, useEffect, useCallback } from 'react';
import { getPublishedJobs } from '../services/findJobsService';
import type { PublicJob } from '../types';

const PAGE_SIZE = 10;

export const useFindJobs = () => {
  const [jobs, setJobs] = useState<PublicJob[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Search bar inputs (edited freely, applied only on "Search Jobs" click)
  const [searchInput, setSearchInput] = useState('');
  const [locationInput, setLocationInput] = useState('');

  // Applied filters (what's actually sent to the backend)
  const [appliedSearch, setAppliedSearch] = useState('');
  const [appliedLocation, setAppliedLocation] = useState('');
  const [employmentType, setEmploymentType] = useState(''); // '' = All Job Types
  const [experience, setExperience] = useState(''); // '' = Any
  const [salaryMin, setSalaryMin] = useState<number | undefined>(undefined);
  const [salaryMax, setSalaryMax] = useState<number | undefined>(undefined);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const [currentPage, setCurrentPage] = useState(1);

  const fetchJobs = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);

    const result = await getPublishedJobs({
      search: appliedSearch || undefined,
      location: appliedLocation || undefined,
      employmentType: employmentType || undefined,
      experience: experience || undefined,
      salaryMin,
      salaryMax,
      skills: selectedSkills.length > 0 ? selectedSkills : undefined,
      page: currentPage,
      limit: PAGE_SIZE,
    });

    if (result.success && result.data) {
      setJobs(result.data);
      setTotalCount(result.pagination?.totalCount || result.data.length);
      setTotalPages(result.pagination?.totalPages || 1);
    } else {
      setErrorMessage(result.message || 'Failed to load jobs');
    }
    setIsLoading(false);
  }, [appliedSearch, appliedLocation, employmentType, experience, salaryMin, salaryMax, selectedSkills, currentPage]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleSearch = () => {
    setAppliedSearch(searchInput);
    setAppliedLocation(locationInput);
    setCurrentPage(1);
  };

  const handlePopularSearchClick = (term: string) => {
    setSearchInput(term);
    setAppliedSearch(term);
    setCurrentPage(1);
  };

  const handleEmploymentTypeChange = (type: string) => {
    setEmploymentType(type);
    setCurrentPage(1);
  };

  const handleExperienceChange = (value: string) => {
    setExperience(value);
    setCurrentPage(1);
  };

  const handleSalaryRangeChange = (min: number | undefined, max: number | undefined) => {
    setSalaryMin(min);
    setSalaryMax(max);
    setCurrentPage(1);
  };

  const handleLocationDropdownChange = (value: string) => {
    setLocationInput(value);
    setAppliedLocation(value);
    setCurrentPage(1);
  };

  const handleToggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setEmploymentType('');
    setExperience('');
    setSalaryMin(undefined);
    setSalaryMax(undefined);
    setSelectedSkills([]);
    setLocationInput('');
    setAppliedLocation('');
    setCurrentPage(1);
  };

  return {
    jobs,
    totalCount,
    totalPages,
    currentPage,
    setCurrentPage,
    isLoading,
    errorMessage,

    searchInput,
    setSearchInput,
    locationInput,
    setLocationInput,
    handleSearch,
    handlePopularSearchClick,

    employmentType,
    handleEmploymentTypeChange,
    experience,
    handleExperienceChange,
    salaryMin,
    salaryMax,
    handleSalaryRangeChange,
    handleLocationDropdownChange,
    selectedSkills,
    handleToggleSkill,
    handleClearFilters,
  };
};