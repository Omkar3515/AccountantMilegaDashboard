import React, { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface FiltersSidebarProps {
  employmentType: string;
  onEmploymentTypeChange: (type: string) => void;
  experience: string;
  onExperienceChange: (value: string) => void;
  salaryMin?: number;
  salaryMax?: number;
  onSalaryRangeChange: (min: number | undefined, max: number | undefined) => void;
  locationValue: string;
  onLocationChange: (value: string) => void;
  selectedSkills: string[];
  onToggleSkill: (skill: string) => void;
  onClearAll: () => void;
}

const JOB_TYPES = [
  { label: 'All Job Types', value: '' },
  { label: 'Full Time', value: 'Full Time' },
  { label: 'Part Time', value: 'Part Time' },
  { label: 'Work From Home', value: 'Work From Home' },
  { label: 'Internship', value: 'Internship' },
];

const EXPERIENCE_OPTIONS = [
  { label: 'Any Experience', value: '' },
  { label: 'Freshers (0 Yrs)', value: 'Freshers (0 Yrs)' },
  { label: '0 - 1 Years', value: '0 - 1 Years' },
  { label: '1 - 3 Years', value: '1 - 3 Years' },
  { label: '3 - 5 Years', value: '3 - 5 Years' },
  { label: '4 - 6 Years', value: '4 - 6 Years' },
  { label: '5+ Years', value: '5+ Years' },
];

const SALARY_RANGES = [
  { label: 'Any Salary', min: undefined, max: undefined },
  { label: '0 - 3 LPA', min: 0, max: 3 },
  { label: '3 - 6 LPA', min: 3, max: 6 },
  { label: '6 - 10 LPA', min: 6, max: 10 },
  { label: '10+ LPA', min: 10, max: undefined },
];

const LOCATION_OPTIONS = [
  { label: 'Any Location', value: '' },
  { label: 'Mumbai, Maharashtra', value: 'Mumbai' },
  { label: 'Pune, Maharashtra', value: 'Pune' },
  { label: 'Nagpur, Maharashtra', value: 'Nagpur' },
  { label: 'Nashik, Maharashtra', value: 'Nashik' },
  { label: 'Aurangabad, Maharashtra', value: 'Aurangabad' },
  { label: 'Work From Home', value: 'Work From Home' },
];

const SKILL_OPTIONS = [
  'Tally Prime',
  'GST Return Filing',
  'Advanced Excel',
  'TDS',
  'Income Tax',
  'Bank Reconciliation',
  'MIS Reporting',
  'Bookkeeping',
];

const FilterTitle = ({ text }: { text: string }) => (
  <p className="text-xs font-semibold mt-5 mb-3">{text}</p>
);

const selectClass =
  'border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 w-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 cursor-pointer';

const FiltersSidebar: React.FC<FiltersSidebarProps> = ({
  employmentType,
  onEmploymentTypeChange,
  experience,
  onExperienceChange,
  salaryMin,
  salaryMax,
  onSalaryRangeChange,
  locationValue,
  onLocationChange,
  selectedSkills,
  onToggleSkill,
  onClearAll,
}) => {
  const [showSkills, setShowSkills] = useState(false);

  const currentSalaryLabel =
    SALARY_RANGES.find((r) => r.min === salaryMin && r.max === salaryMax)?.label || 'Any Salary';

  const handleSalarySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const range = SALARY_RANGES[Number(e.target.value)];
    onSalaryRangeChange(range.min, range.max);
  };

  return (
    <section className="find-jobs-card bg-white border border-slate-200 rounded-xl p-5">
      <div className="flex justify-between">
        <h2 className="font-bold text-sm">Filters</h2>
        <button onClick={onClearAll} className="text-xs text-blue-700">
          Clear All
        </button>
      </div>

      {/* Job Type */}
      <FilterTitle text="Job Type" />
      {JOB_TYPES.map((type) => (
        <label className="block text-sm text-slate-600 mt-3" key={type.value}>
          <input
            type="checkbox"
            checked={employmentType === type.value}
            onChange={() => onEmploymentTypeChange(type.value)}
            className="accent-blue-700 mr-2"
          />
          {type.label}
        </label>
      ))}

      {/* Experience */}
      <FilterTitle text="Experience" />
      <select
        value={experience}
        onChange={(e) => onExperienceChange(e.target.value)}
        className={selectClass}
      >
        {EXPERIENCE_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Salary Range */}
      <FilterTitle text="Salary Range" />
      <select
        value={SALARY_RANGES.findIndex((r) => r.label === currentSalaryLabel)}
        onChange={handleSalarySelect}
        className={selectClass}
      >
        {SALARY_RANGES.map((range, idx) => (
          <option key={range.label} value={idx}>
            {range.label}
          </option>
        ))}
      </select>

      {/* Location */}
      <FilterTitle text="Location" />
      <select
        value={LOCATION_OPTIONS.some((l) => l.value === locationValue) ? locationValue : ''}
        onChange={(e) => onLocationChange(e.target.value)}
        className={selectClass}
      >
        {LOCATION_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Skills (expandable checkbox panel) */}
      <FilterTitle text="Skills" />
      <button
        type="button"
        onClick={() => setShowSkills((prev) => !prev)}
        className={`${selectClass} flex justify-between items-center`}
      >
        {selectedSkills.length > 0 ? `${selectedSkills.length} skill(s) selected` : 'Select Skills'}
        <ChevronDown className={`w-4 h-4 transition-transform ${showSkills ? 'rotate-180' : ''}`} />
      </button>
      {showSkills && (
        <div className="mt-2 border border-slate-200 rounded-lg p-3 space-y-2 max-h-48 overflow-y-auto">
          {SKILL_OPTIONS.map((skill) => {
            const isSelected = selectedSkills.includes(skill);
            return (
              <label key={skill} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => onToggleSkill(skill)}
                  className="accent-blue-700"
                />
                {isSelected && <Check className="w-3 h-3 text-blue-700 -ml-1" />}
                {skill}
              </label>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default FiltersSidebar;