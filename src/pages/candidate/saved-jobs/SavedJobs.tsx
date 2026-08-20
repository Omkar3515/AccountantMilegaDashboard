import React, { useState } from "react";
import {
    ArrowRight,
    BadgeCheck,
    Bookmark,
    BriefcaseBusiness,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Filter,
    Lightbulb,
    MapPin,
    MoreVertical,
    Search,
    Star,
    Trash2,
} from "lucide-react";

export interface SavedJobItem {
    id: string;
    initials: string;
    title: string;
    company: string;
    verified: boolean;
    color: string;
    tags: string[];
    type: "Full Time" | "Part Time" | "Contract" | "Internship";
    location: string;
    salary: string;
    savedOnDate: string;
    savedOnTime: string;
    status: "Not Applied" | "Applied" | "Expired";
}

const initialSavedJobs: SavedJobItem[] = [
    {
        id: "1",
        initials: "CA",
        title: "Senior Accountant",
        company: "Sharma & Co. Chartered Accountants",
        verified: true,
        color: "bg-blue-700 text-white",
        tags: ["Tally", "GST", "Excel", "Bank Reconciliation"],
        type: "Full Time",
        location: "Mumbai, Maharashtra",
        salary: "₹4 - 6 LPA",
        savedOnDate: "20 May 2025",
        savedOnTime: "09:45 AM",
        status: "Applied",
    },
    {
        id: "2",
        initials: "FinTax",
        title: "Tax Executive",
        company: "Fintax Solutions Pvt. Ltd.",
        verified: true,
        color: "bg-emerald-50 text-emerald-700 border border-emerald-200",
        tags: ["GST", "TDS", "Excel"],
        type: "Full Time",
        location: "Pune, Maharashtra",
        salary: "₹2.4 - 3.6 LPA",
        savedOnDate: "19 May 2025",
        savedOnTime: "04:20 PM",
        status: "Not Applied",
    },
    {
        id: "3",
        initials: "SK",
        title: "Accounts Executive",
        company: "SK Enterprises",
        verified: true,
        color: "bg-amber-500 text-white",
        tags: ["Tally Prime", "MIS", "Excel"],
        type: "Full Time",
        location: "Nagpur, Maharashtra",
        salary: "₹3 - 4.5 LPA",
        savedOnDate: "18 May 2025",
        savedOnTime: "11:30 AM",
        status: "Applied",
    },
    {
        id: "4",
        initials: "AG",
        title: "Junior Accountant",
        company: "AG Financial Services",
        verified: true,
        color: "bg-violet-50 text-violet-700 border border-violet-200",
        tags: ["Excel", "TDS", "Bank Rec"],
        type: "Full Time",
        location: "Nashik, Maharashtra",
        salary: "₹2 - 3 LPA",
        savedOnDate: "17 May 2025",
        savedOnTime: "02:15 PM",
        status: "Not Applied",
    },
    {
        id: "5",
        initials: "KG",
        title: "Audit Assistant",
        company: "Khandelwal & Associates",
        verified: true,
        color: "bg-rose-500 text-white",
        tags: ["Audit", "Tally", "Excel"],
        type: "Full Time",
        location: "Mumbai, Maharashtra",
        salary: "₹2.5 - 3.5 LPA",
        savedOnDate: "16 May 2025",
        savedOnTime: "09:05 AM",
        status: "Not Applied",
    },
    {
        id: "6",
        initials: "RB",
        title: "Accounts Payable Executive",
        company: "RB Associates",
        verified: true,
        color: "bg-teal-500 text-white",
        tags: ["AP", "Excel", "Invoice"],
        type: "Contract",
        location: "Aurangabad, Maharashtra",
        salary: "₹2 - 3 LPA",
        savedOnDate: "15 May 2025",
        savedOnTime: "10:10 AM",
        status: "Not Applied",
    },
];

interface SavedJobsProps {
    onNavigate?: (page: string) => void;
}

const SavedJobs: React.FC<SavedJobsProps> = ({ onNavigate }) => {
    const [jobList, setJobList] = useState<SavedJobItem[]>(initialSavedJobs);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All Categories");
    const [sortBy, setSortBy] = useState("Recently Saved");

    const filteredJobs = jobList.filter((job) => {
        const matchesSearch =
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.company.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch;
    });

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedIds(filteredJobs.map((j) => j.id));
        } else {
            setSelectedIds([]);
        }
    };

    const handleSelectOne = (id: string) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter((item) => item !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    const handleRemoveSelected = () => {
        if (selectedIds.length === 0) return;
        setJobList(jobList.filter((j) => !selectedIds.includes(j.id)));
        setSelectedIds([]);
    };

    const handleClearAll = () => {
        setJobList([]);
        setSelectedIds([]);
    };

    const handleRemoveSingle = (id: string) => {
        setJobList(jobList.filter((j) => j.id !== id));
        setSelectedIds(selectedIds.filter((item) => item !== id));
    };

    const totalSaved = jobList.length;
    const appliedCount = jobList.filter((j) => j.status === "Applied").length;
    const notAppliedCount = jobList.filter((j) => j.status === "Not Applied").length;
    const expiredCount = jobList.filter((j) => j.status === "Expired").length;

    const isAllSelected =
        filteredJobs.length > 0 && selectedIds.length === filteredJobs.length;

    return (
        <div className="saved-jobs-page max-w-[1220px] mx-auto font-sans text-slate-900">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-4">
                <button
                    onClick={() => onNavigate && onNavigate("dashboard")}
                    className="hover:text-blue-700 transition-colors"
                >
                    Dashboard
                </button>
                <span>&gt;</span>
                <span className="text-slate-900 font-semibold">Saved Jobs</span>
            </div>

            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        Saved Jobs
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Jobs you have saved for later. Review and apply when you&apos;re ready.
                    </p>
                </div>
                <div>
                    <button
                        onClick={handleRemoveSelected}
                        disabled={selectedIds.length === 0}
                        className={`border rounded-lg px-4 py-2 text-xs font-semibold flex items-center gap-2 transition-colors ${selectedIds.length > 0
                            ? "border-red-200 text-red-600 hover:bg-red-50 bg-white shadow-sm"
                            : "border-slate-200 text-slate-400 bg-slate-50 cursor-not-allowed"
                            }`}
                    >
                        <Trash2 className="w-4 h-4" />
                        Remove Selected {selectedIds.length > 0 && `(${selectedIds.length})`}
                    </button>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_295px] gap-7 mt-6">
                {/* Left Column: Filter Bar & Job List */}
                <div>
                    {/* Search & Filter Bar */}
                    <section className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_auto] gap-3">
                            <div className="border border-slate-200 rounded-lg px-3 py-2.5 text-sm flex items-center gap-2 text-slate-600 bg-white focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                                <Search className="w-4 h-4 text-slate-400 shrink-0" />
                                <input
                                    type="text"
                                    placeholder="Search saved jobs by title or company..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-transparent outline-none text-slate-800 placeholder-slate-400 text-xs sm:text-sm"
                                />
                            </div>

                            <div className="relative">
                                <select
                                    value={categoryFilter}
                                    onChange={(e) => setCategoryFilter(e.target.value)}
                                    className="w-full appearance-none border border-slate-200 rounded-lg px-3 py-2.5 text-xs sm:text-sm text-slate-700 bg-white focus:outline-none focus:border-blue-500 pr-8 font-medium cursor-pointer"
                                >
                                    <option>All Categories</option>
                                    <option>Accounting</option>
                                    <option>Taxation</option>
                                    <option>Audit</option>
                                    <option>Finance</option>
                                </select>
                                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>

                            <div className="relative">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full appearance-none border border-slate-200 rounded-lg px-3 py-2.5 text-xs sm:text-sm text-slate-700 bg-white focus:outline-none focus:border-blue-500 pr-8 font-medium cursor-pointer"
                                >
                                    <option>Sort by: Recently Saved</option>
                                    <option>Sort by: Salary (High to Low)</option>
                                    <option>Sort by: Title (A-Z)</option>
                                </select>
                                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>

                            <button className="border border-slate-200 rounded-lg px-4 py-2.5 text-xs sm:text-sm text-slate-700 font-semibold flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors">
                                <Filter className="w-4 h-4 text-slate-500" />
                                Filters
                            </button>
                        </div>
                    </section>

                    {/* Jobs Table Container */}
                    <section className="bg-white border border-slate-200 rounded-xl overflow-hidden mt-4 shadow-sm">
                        <div className="w-full">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        <th className="py-3 px-2.5 w-8 text-center">
                                            <input
                                                type="checkbox"
                                                checked={isAllSelected}
                                                onChange={handleSelectAll}
                                                className="w-4 h-4 accent-blue-700 rounded border-slate-300 cursor-pointer"
                                            />
                                        </th>
                                        <th className="py-3 px-3 font-semibold">Job Details</th>
                                        <th className="py-3 px-2.5 font-semibold">Job Type</th>
                                        <th className="py-3 px-2.5 font-semibold">Location</th>
                                        <th className="py-3 px-2.5 font-semibold">Salary</th>
                                        <th className="py-3 px-2.5 font-semibold">Saved On</th>
                                        <th className="py-3 px-2.5 font-semibold text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-xs">
                                    {filteredJobs.length > 0 ? (
                                        filteredJobs.map((job) => {
                                            const isSelected = selectedIds.includes(job.id);
                                            return (
                                                <tr
                                                    key={job.id}
                                                    className={`hover:bg-slate-50/60 transition-colors ${isSelected ? "bg-blue-50/30" : ""
                                                        }`}
                                                >
                                                    {/* Checkbox */}
                                                    <td className="py-3.5 px-2.5 text-center align-middle">
                                                        <input
                                                            type="checkbox"
                                                            checked={isSelected}
                                                            onChange={() => handleSelectOne(job.id)}
                                                            className="w-4 h-4 accent-blue-700 rounded border-slate-300 cursor-pointer"
                                                        />
                                                    </td>

                                                    {/* Job Details */}
                                                    <td className="py-3.5 px-3 align-middle">
                                                        <div className="flex items-center gap-2.5">
                                                            <div
                                                                className={`w-10 h-10 rounded-lg grid place-items-center font-bold text-xs shrink-0 ${job.color}`}
                                                            >
                                                                {job.initials}
                                                            </div>
                                                            <div className="min-w-0">
                                                                <div className="flex items-center gap-1">
                                                                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                                                                        {job.title}
                                                                    </h3>
                                                                    {job.verified && (
                                                                        <BadgeCheck className="w-3.5 h-3.5 text-blue-600 shrink-0 inline" />
                                                                    )}
                                                                </div>
                                                                <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                                                                    {job.company}
                                                                </p>
                                                                <div className="flex flex-wrap gap-1 mt-1.5">
                                                                    {job.tags.map((tag) => (
                                                                        <span
                                                                            key={tag}
                                                                            className="border border-slate-200 bg-slate-50 rounded px-1.5 py-0.5 text-[9px] text-slate-600 font-medium"
                                                                        >
                                                                            {tag}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    {/* Job Type */}
                                                    <td className="py-3.5 px-2.5 align-middle whitespace-nowrap">
                                                        <span
                                                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${job.type === "Contract"
                                                                ? "bg-blue-50 text-blue-700 border border-blue-100"
                                                                : "bg-emerald-50 text-emerald-700 border border-emerald-100"
                                                                }`}
                                                        >
                                                            {job.type}
                                                        </span>
                                                    </td>

                                                    {/* Location */}
                                                    <td className="py-3.5 px-2.5 align-middle whitespace-nowrap text-slate-600">
                                                        <div className="flex items-center gap-1 text-[11px]">
                                                            <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                                                            <span>{job.location}</span>
                                                        </div>
                                                    </td>

                                                    {/* Salary */}
                                                    <td className="py-3.5 px-2.5 align-middle whitespace-nowrap font-semibold text-slate-800 text-[11px]">
                                                        {job.salary}
                                                    </td>

                                                    {/* Saved On */}
                                                    <td className="py-3.5 px-2.5 align-middle whitespace-nowrap">
                                                        <p className="text-slate-700 font-medium text-[11px]">{job.savedOnDate}</p>
                                                        <p className="text-[10px] text-slate-400 mt-0.5">
                                                            {job.savedOnTime}
                                                        </p>
                                                    </td>

                                                    {/* Action */}
                                                    <td className="py-3.5 px-2.5 align-middle text-center whitespace-nowrap">
                                                        <div className="flex items-center justify-center gap-1.5">
                                                            <button
                                                                onClick={() => onNavigate && onNavigate("find-jobs")}
                                                                className="border border-blue-700 text-blue-700 hover:bg-blue-50 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors"
                                                            >
                                                                Apply Now
                                                            </button>
                                                            <button
                                                                onClick={() => handleRemoveSingle(job.id)}
                                                                title="Remove saved job"
                                                                className="text-slate-400 hover:text-red-500 p-1 rounded-lg hover:bg-slate-100 transition-colors"
                                                            >
                                                                <MoreVertical className="w-3.5 h-3.5" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan={7} className="py-12 text-center text-slate-500">
                                                <div className="max-w-xs mx-auto text-center">
                                                    <Bookmark className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                                                    <p className="font-semibold text-slate-700">No saved jobs found</p>
                                                    <p className="text-xs text-slate-400 mt-1">
                                                        Save jobs while browsing to review them here anytime.
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Footer */}
                        <div className="flex flex-col sm:flex-row justify-between items-center px-5 py-4 border-t border-slate-100 gap-3 text-xs text-slate-500">
                            <p>
                                Showing {filteredJobs.length > 0 ? 1 : 0} to {filteredJobs.length} of{" "}
                                {jobList.length} saved jobs
                            </p>
                            <div className="flex items-center gap-1.5">
                                <button
                                    disabled
                                    className="w-7 h-7 rounded-lg border border-slate-200 text-slate-300 grid place-items-center cursor-not-allowed"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                <button className="w-7 h-7 rounded-lg bg-blue-700 text-white font-bold grid place-items-center shadow-sm">
                                    1
                                </button>
                                <button
                                    disabled
                                    className="w-7 h-7 rounded-lg border border-slate-200 text-slate-300 grid place-items-center cursor-not-allowed"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right Column: Widgets */}
                <aside className="space-y-5">
                    {/* Saved Jobs Summary Card */}
                    <section className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 grid place-items-center shrink-0">
                                <Star className="w-4 h-4" />
                            </div>
                            <h2 className="font-bold text-sm text-slate-900">
                                Saved Jobs Summary
                            </h2>
                        </div>

                        <div className="mt-4 text-center sm:text-left">
                            <p className="text-3xl font-extrabold text-slate-900">{totalSaved}</p>
                            <p className="text-xs text-slate-500 font-medium mt-0.5">
                                Total Saved Jobs
                            </p>
                        </div>

                        <div className="mt-5 space-y-2.5 text-xs font-medium border-t border-slate-100 pt-4">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                                    <span className="text-slate-600">Applied</span>
                                </div>
                                <span className="font-bold text-slate-800">{appliedCount}</span>
                            </div>

                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                                    <span className="text-slate-600">Not Applied</span>
                                </div>
                                <span className="font-bold text-slate-800">{notAppliedCount}</span>
                            </div>

                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                                    <span className="text-slate-600">Expired</span>
                                </div>
                                <span className="font-bold text-slate-800">{expiredCount}</span>
                            </div>
                        </div>
                    </section>

                    {/* Quick Actions Card */}
                    <section className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                        <h2 className="font-bold text-sm text-slate-900 mb-4">Quick Actions</h2>
                        <div className="space-y-2.5">
                            <button
                                onClick={() => onNavigate && onNavigate("applications")}
                                className="w-full border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 text-slate-700 text-xs font-semibold rounded-xl p-3 flex items-center gap-3 transition-colors text-left"
                            >
                                <Bookmark className="w-4 h-4 text-blue-700 shrink-0" />
                                <span>View Applied Jobs</span>
                            </button>

                            <button
                                onClick={() => onNavigate && onNavigate("find-jobs")}
                                className="w-full border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 text-slate-700 text-xs font-semibold rounded-xl p-3 flex items-center gap-3 transition-colors text-left"
                            >
                                <BriefcaseBusiness className="w-4 h-4 text-blue-700 shrink-0" />
                                <span>View All Jobs</span>
                            </button>

                            <button
                                onClick={handleClearAll}
                                className="w-full border border-red-100 hover:border-red-200 bg-red-50/30 hover:bg-red-50 text-red-600 text-xs font-semibold rounded-xl p-3 flex items-center gap-3 transition-colors text-left"
                            >
                                <Trash2 className="w-4 h-4 text-red-500 shrink-0" />
                                <span>Clear All Saved Jobs</span>
                            </button>
                        </div>
                    </section>

                    {/* Pro Tip Card */}
                    <section className="bg-gradient-to-br from-blue-50 via-indigo-50/50 to-white border border-blue-100 rounded-xl p-5 shadow-sm">
                        <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
                            <Lightbulb className="w-4 h-4 text-blue-700 shrink-0" />
                            <span>Pro Tip</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                            Review your saved jobs regularly and apply early to increase your chances of getting hired.
                        </p>
                        <button
                            onClick={() => onNavigate && onNavigate("find-jobs")}
                            className="text-blue-700 hover:text-blue-800 text-xs font-bold mt-4 flex items-center gap-1.5 transition-colors"
                        >
                            Browse More Jobs <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                    </section>
                </aside>
            </div>
        </div>
    );
};

export default SavedJobs;
