import React, { useState } from "react";
import {
    Calendar,
    Plus,
    CalendarDays,
    CheckCircle2,
    XCircle,
    SlidersHorizontal,
    Video,
    Phone,
    Eye,
    MoreVertical,
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    Clock,
    FileText,
    Settings,
    Headphones,
    Star,
    ArrowUpRight
} from "lucide-react";

interface InterviewSchedularProps {
    onNavigate?: (page: string) => void;
}

const mockInterviews = [
    {
        id: 1,
        candidateName: "Rahul Verma",
        rating: "4.5",
        candidateRole: "Senior Accountant",
        jobRole: "Senior Accountant",
        department: "Accounts & Finance",
        dateTime: "21 May 2025",
        timeSlot: "11:00 AM - 11:30 AM",
        type: "Video Interview",
        interviewerInitials: "AS",
        interviewerName: "Amit Sharma",
        interviewerTitle: "HR Manager",
        status: "Confirmed",
        tab: "Upcoming",
    },
    {
        id: 2,
        candidateName: "Priya Singh",
        rating: "4.2",
        candidateRole: "Tax Associate",
        jobRole: "Tax Associate",
        department: "Taxation",
        dateTime: "21 May 2025",
        timeSlot: "03:00 PM - 03:30 PM",
        type: "Telephonic",
        interviewerInitials: "RK",
        interviewerName: "Ritika Kapoor",
        interviewerTitle: "Recruiter",
        status: "Confirmed",
        tab: "Upcoming",
    },
    {
        id: 3,
        candidateName: "Amit Kumar",
        rating: "4.0",
        candidateRole: "Internal Auditor",
        jobRole: "Internal Auditor",
        department: "Audit",
        dateTime: "22 May 2025",
        timeSlot: "10:00 AM - 10:45 AM",
        type: "Video Interview",
        interviewerInitials: "VJ",
        interviewerName: "Vikram Joshi",
        interviewerTitle: "Finance Manager",
        status: "Rescheduled",
        tab: "Upcoming",
    },
    {
        id: 4,
        candidateName: "Sneha Patil",
        rating: "3.8",
        candidateRole: "Junior Accountant",
        jobRole: "Junior Accountant",
        department: "Accounts & Finance",
        dateTime: "22 May 2025",
        timeSlot: "02:00 PM - 02:30 PM",
        type: "Telephonic",
        interviewerInitials: "AS",
        interviewerName: "Amit Sharma",
        interviewerTitle: "HR Manager",
        status: "Confirmed",
        tab: "Upcoming",
    },
    {
        id: 5,
        candidateName: "Rohit Mehta",
        rating: "4.7",
        candidateRole: "Finance Manager",
        jobRole: "Finance Manager",
        department: "Finance",
        dateTime: "23 May 2025",
        timeSlot: "11:30 AM - 12:15 PM",
        type: "Video Interview",
        interviewerInitials: "RK",
        interviewerName: "Ritika Kapoor",
        interviewerTitle: "Recruiter",
        status: "Confirmed",
        tab: "Upcoming",
    },
    {
        id: 6,
        candidateName: "Neha Sharma",
        rating: "4.1",
        candidateRole: "CA Articleship",
        jobRole: "CA Articleship",
        department: "Accounts & Finance",
        dateTime: "24 May 2025",
        timeSlot: "04:00 PM - 04:30 PM",
        type: "Telephonic",
        interviewerInitials: "VJ",
        interviewerName: "Vikram Joshi",
        interviewerTitle: "Finance Manager",
        status: "Cancelled",
        tab: "Cancelled",
    },
    {
        id: 7,
        candidateName: "Karan Gupta",
        rating: "3.6",
        candidateRole: "Accountant",
        jobRole: "Accountant",
        department: "Accounts & Finance",
        dateTime: "26 May 2025",
        timeSlot: "10:30 AM - 11:00 AM",
        type: "Video Interview",
        interviewerInitials: "AS",
        interviewerName: "Amit Sharma",
        interviewerTitle: "HR Manager",
        status: "Confirmed",
        tab: "Upcoming",
    },
];

export default function InterviewSchedular({ onNavigate }: InterviewSchedularProps) {
    const [activeTab, setActiveTab] = useState("Upcoming");

    const filteredInterviews = mockInterviews.filter((item) => {
        if (activeTab === "Upcoming") return item.status === "Confirmed" || item.status === "Rescheduled";
        if (activeTab === "Completed") return item.status === "Completed";
        if (activeTab === "Cancelled") return item.status === "Cancelled";
        return true;
    });

    return (
        <div className="interview-scheduler max-w-7xl mx-auto space-y-6 font-sans">
            {/* Breadcrumb & Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <p className="text-sm text-gray-500 mb-1">
                        <button
                            onClick={() => onNavigate && onNavigate("dashboard")}
                            className="hover:text-brand-green hover:underline transition-colors"
                        >
                            Dashboard
                        </button>
                        <span className="mx-1.5">›</span>
                        <span className="text-gray-700 font-medium">Interview Scheduler</span>
                    </p>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Interview Scheduler</h1>
                    <p className="text-sm text-gray-500 mt-0.5">
                        Schedule and manage interviews with your shortlisted candidates.
                    </p>
                </div>

                <button
                    onClick={() => onNavigate && onNavigate("post-job")}
                    className="bg-brand-green text-white font-bold text-sm px-4 py-2.5 rounded-lg shadow-sm shadow-brand-green/20 flex items-center gap-2 hover:bg-brand-green/90 transition-colors shrink-0"
                >
                    <Plus className="w-4 h-4" /> Schedule New Interview
                </button>
            </div>

            {/* 4 Summary Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Total Interviews */}
                <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-xs font-semibold text-gray-500">Total Interviews</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">18</p>
                        <p className="text-xs font-medium text-gray-400 mt-1">All time</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 grid place-items-center shrink-0">
                        <Calendar className="w-6 h-6" />
                    </div>
                </div>

                {/* Upcoming */}
                <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-xs font-semibold text-gray-500">Upcoming</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">7</p>
                        <p className="text-xs font-semibold text-brand-green mt-1">38.9%</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-brand-light text-brand-green grid place-items-center shrink-0">
                        <CalendarDays className="w-6 h-6" />
                    </div>
                </div>

                {/* Completed */}
                <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-xs font-semibold text-gray-500">Completed</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">9</p>
                        <p className="text-xs font-semibold text-amber-600 mt-1">50%</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 grid place-items-center shrink-0">
                        <CheckCircle2 className="w-6 h-6" />
                    </div>
                </div>

                {/* Cancelled */}
                <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-xs font-semibold text-gray-500">Cancelled</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">2</p>
                        <p className="text-xs font-semibold text-rose-600 mt-1">11.1%</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 grid place-items-center shrink-0">
                        <XCircle className="w-6 h-6" />
                    </div>
                </div>
            </div>

            {/* Layout Grid: Left (Tabs & Table) & Right (Widgets) */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px] gap-6 items-start">
                
                {/* Left Side: Tabs & Table */}
                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                    {/* Header Controls: Tabs + Date Range Filter */}
                    <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-6 border-b sm:border-b-0 border-gray-100 w-full sm:w-auto">
                            {[
                                { name: "Upcoming", count: 7 },
                                { name: "Completed", count: 9 },
                                { name: "Cancelled", count: 2 },
                            ].map((t) => {
                                const isActive = activeTab === t.name;
                                return (
                                    <button
                                        key={t.name}
                                        onClick={() => setActiveTab(t.name)}
                                        className={`pb-2.5 text-xs font-bold transition-all relative ${
                                            isActive
                                                ? "text-brand-green border-b-2 border-brand-green"
                                                : "text-gray-500 hover:text-gray-900"
                                        }`}
                                    >
                                        {t.name} ({t.count})
                                    </button>
                                );
                            })}
                        </div>

                        <div className="flex items-center gap-2.5 w-full sm:w-auto">
                            <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold border border-gray-200 rounded-lg text-gray-700 bg-white hover:bg-gray-50">
                                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                20 May - 27 May 2025
                                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                            </button>
                            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border border-gray-200 rounded-lg text-gray-700 bg-white hover:bg-gray-50">
                                <SlidersHorizontal className="w-3.5 h-3.5 text-gray-400" />
                                Filter
                            </button>
                        </div>
                    </div>

                    {/* Interviews Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/80 border-b border-gray-100 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                                    <th className="py-3.5 px-4">Candidate</th>
                                    <th className="py-3.5 px-4">Job Role</th>
                                    <th className="py-3.5 px-4">Date & Time</th>
                                    <th className="py-3.5 px-4">Interview Type</th>
                                    <th className="py-3.5 px-4">Interviewer</th>
                                    <th className="py-3.5 px-4 text-center">Status</th>
                                    <th className="py-3.5 px-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-xs">
                                {filteredInterviews.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="text-center py-8 text-gray-400">
                                            No interviews found under {activeTab}.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredInterviews.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50/70 transition-colors">
                                            {/* Candidate Info */}
                                            <td className="py-3.5 px-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-700 grid place-items-center font-bold text-xs shrink-0 border border-purple-200">
                                                        {item.candidateName.split(" ").map(n => n[0]).join("")}
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-1.5">
                                                            <p className="font-bold text-gray-900 hover:text-brand-green cursor-pointer">
                                                                {item.candidateName}
                                                            </p>
                                                            <span className="flex items-center text-[10px] text-amber-500 font-semibold">
                                                                <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400 mr-0.5" />
                                                                {item.rating}
                                                            </span>
                                                        </div>
                                                        <p className="text-[11px] text-gray-500 mt-0.5">{item.candidateRole}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Job Role */}
                                            <td className="py-3.5 px-4">
                                                <p className="font-bold text-gray-900">{item.jobRole}</p>
                                                <p className="text-[11px] text-gray-500 mt-0.5">{item.department}</p>
                                            </td>

                                            {/* Date & Time */}
                                            <td className="py-3.5 px-4">
                                                <p className="font-bold text-gray-900">{item.dateTime}</p>
                                                <p className="text-[11px] text-gray-500 mt-0.5">{item.timeSlot}</p>
                                            </td>

                                            {/* Interview Type */}
                                            <td className="py-3.5 px-4">
                                                {item.type === "Video Interview" ? (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-100">
                                                        <Video className="w-3.5 h-3.5" /> Video Interview
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                                                        <Phone className="w-3.5 h-3.5" /> Telephonic
                                                    </span>
                                                )}
                                            </td>

                                            {/* Interviewer */}
                                            <td className="py-3.5 px-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 font-bold text-[10px] grid place-items-center shrink-0">
                                                        {item.interviewerInitials}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-gray-900 leading-tight">{item.interviewerName}</p>
                                                        <p className="text-[10px] text-gray-400">{item.interviewerTitle}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Status */}
                                            <td className="py-3.5 px-4 text-center">
                                                {item.status === "Confirmed" && (
                                                    <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                                        Confirmed
                                                    </span>
                                                )}
                                                {item.status === "Rescheduled" && (
                                                    <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                                                        Rescheduled
                                                    </span>
                                                )}
                                                {item.status === "Cancelled" && (
                                                    <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                                                        Cancelled
                                                    </span>
                                                )}
                                            </td>

                                            {/* Actions */}
                                            <td className="py-3.5 px-4 text-right">
                                                <div className="flex items-center justify-end gap-1 text-gray-400">
                                                    <button className="p-1.5 hover:bg-brand-light hover:text-brand-green rounded-lg transition-colors">
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                    <button className="p-1.5 hover:bg-brand-light hover:text-brand-green rounded-lg transition-colors">
                                                        <MoreVertical className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Footer */}
                    <div className="p-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
                        <p>Showing 1 to {filteredInterviews.length} of {filteredInterviews.length} interviews</p>

                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                                <button className="w-7 h-7 rounded border border-gray-200 grid place-items-center text-gray-400 hover:bg-gray-50">
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                <button className="w-7 h-7 rounded border border-brand-green bg-brand-light text-brand-green font-bold grid place-items-center">
                                    1
                                </button>
                                <button className="w-7 h-7 rounded border border-gray-200 grid place-items-center text-gray-700 hover:bg-gray-50">
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>

                            <select className="border border-gray-200 rounded px-2 py-1 text-xs bg-white text-gray-700 font-medium">
                                <option>10 / page</option>
                                <option>20 / page</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Right Side: Widgets */}
                <div className="space-y-6">
                    {/* Widget 1: Interviews Overview */}
                    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4">
                        <h2 className="text-sm font-bold text-gray-900">Interviews Overview</h2>

                        {/* Circular Donut Diagram */}
                        <div className="relative w-32 h-32 mx-auto my-2 grid place-items-center">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                <path
                                    className="text-emerald-500"
                                    strokeDasharray="50, 100"
                                    strokeWidth="4"
                                    stroke="currentColor"
                                    fill="none"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                                <path
                                    className="text-brand-green"
                                    strokeDasharray="38.9, 100"
                                    strokeDashoffset="-50"
                                    strokeWidth="4"
                                    stroke="currentColor"
                                    fill="none"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                                <path
                                    className="text-rose-500"
                                    strokeDasharray="11.1, 100"
                                    strokeDashoffset="-88.9"
                                    strokeWidth="4"
                                    stroke="currentColor"
                                    fill="none"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                            </svg>
                            <div className="absolute flex flex-col items-center">
                                <span className="text-xl font-extrabold text-gray-900">18</span>
                                <span className="text-[10px] font-semibold text-gray-400">Total</span>
                            </div>
                        </div>

                        <div className="space-y-2 text-xs pt-2 border-t border-gray-100">
                            <div className="flex items-center justify-between">
                                <span className="flex items-center gap-2 text-gray-600 font-medium">
                                    <span className="w-2.5 h-2.5 rounded-full bg-brand-green inline-block" /> Upcoming
                                </span>
                                <span className="font-bold text-gray-900">7 (38.9%)</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="flex items-center gap-2 text-gray-600 font-medium">
                                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Completed
                                </span>
                                <span className="font-bold text-gray-900">9 (50%)</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="flex items-center gap-2 text-gray-600 font-medium">
                                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" /> Cancelled
                                </span>
                                <span className="font-bold text-gray-900">2 (11.1%)</span>
                            </div>
                        </div>
                    </div>

                    {/* Widget 2: Calendar Widget */}
                    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-bold text-gray-900">Calendar</h2>
                            <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                                <ChevronLeft className="w-4 h-4 cursor-pointer hover:text-brand-green" />
                                <span>May 2025</span>
                                <ChevronRight className="w-4 h-4 cursor-pointer hover:text-brand-green" />
                            </div>
                        </div>

                        {/* Month Grid */}
                        <div className="text-center text-xs">
                            <div className="grid grid-cols-7 gap-1 font-semibold text-gray-400 text-[10px] mb-2">
                                <span>Sun</span>
                                <span>Mon</span>
                                <span>Tue</span>
                                <span>Wed</span>
                                <span>Thu</span>
                                <span>Fri</span>
                                <span>Sat</span>
                            </div>
                            <div className="grid grid-cols-7 gap-1.5 font-medium text-gray-700 text-xs">
                                <span className="text-gray-300 py-1">27</span>
                                <span className="text-gray-300 py-1">28</span>
                                <span className="text-gray-300 py-1">29</span>
                                <span className="text-gray-300 py-1">30</span>
                                <span className="py-1">1</span>
                                <span className="py-1">2</span>
                                <span className="py-1">3</span>
                                <span className="py-1">4</span>
                                <span className="py-1">5</span>
                                <span className="py-1">6</span>
                                <span className="py-1">7</span>
                                <span className="py-1">8</span>
                                <span className="py-1">9</span>
                                <span className="py-1">10</span>
                                <span className="py-1">11</span>
                                <span className="py-1">12</span>
                                <span className="py-1">13</span>
                                <span className="py-1">14</span>
                                <span className="py-1">15</span>
                                <span className="py-1">16</span>
                                <span className="py-1">17</span>
                                <span className="py-1">18</span>
                                <span className="py-1">19</span>
                                <span className="bg-brand-green text-white font-bold rounded-lg py-1 shadow-sm">20</span>
                                <span className="bg-brand-green text-white font-bold rounded-lg py-1 shadow-sm">21</span>
                                <span className="bg-brand-green text-white font-bold rounded-lg py-1 shadow-sm">22</span>
                                <span className="bg-brand-green text-white font-bold rounded-lg py-1 shadow-sm">23</span>
                                <span className="bg-brand-green text-white font-bold rounded-lg py-1 shadow-sm">24</span>
                                <span className="py-1">25</span>
                                <span className="bg-brand-green text-white font-bold rounded-lg py-1 shadow-sm">26</span>
                                <span className="py-1">27</span>
                                <span className="py-1">28</span>
                                <span className="py-1">29</span>
                                <span className="py-1">30</span>
                                <span className="py-1">31</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-[11px] text-gray-500 pt-2 border-t border-gray-100">
                            <span className="w-2 h-2 rounded-full bg-brand-green inline-block" /> Has Interviews
                        </div>
                    </div>

                    {/* Widget 3: Quick Actions */}
                    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4">
                        <h2 className="text-sm font-bold text-gray-900">Quick Actions</h2>

                        <div className="space-y-3">
                            <button className="w-full flex items-center justify-between text-left hover:bg-gray-50 p-2 rounded-lg transition-colors group">
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="w-8 h-8 rounded-lg bg-brand-light text-brand-green grid place-items-center shrink-0">
                                        <Calendar className="w-4 h-4" />
                                    </div>
                                    <div className="truncate">
                                        <p className="text-xs font-bold text-gray-900 group-hover:text-brand-green">Schedule New Interview</p>
                                        <p className="text-[10px] text-gray-500 truncate">Add a new interview for a candidate</p>
                                    </div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-brand-green shrink-0" />
                            </button>

                            <button className="w-full flex items-center justify-between text-left hover:bg-gray-50 p-2 rounded-lg transition-colors group">
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 grid place-items-center shrink-0">
                                        <FileText className="w-4 h-4" />
                                    </div>
                                    <div className="truncate">
                                        <p className="text-xs font-bold text-gray-900 group-hover:text-brand-green">View Interview Templates</p>
                                        <p className="text-[10px] text-gray-500 truncate">Use pre-defined interview templates</p>
                                    </div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-brand-green shrink-0" />
                            </button>

                            <button className="w-full flex items-center justify-between text-left hover:bg-gray-50 p-2 rounded-lg transition-colors group">
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 grid place-items-center shrink-0">
                                        <Settings className="w-4 h-4" />
                                    </div>
                                    <div className="truncate">
                                        <p className="text-xs font-bold text-gray-900 group-hover:text-brand-green">Interview Settings</p>
                                        <p className="text-[10px] text-gray-500 truncate">Manage availability & preferences</p>
                                    </div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-brand-green shrink-0" />
                            </button>
                        </div>
                    </div>

                    {/* Widget 4: Need Help? */}
                    <div className="bg-gradient-to-br from-brand-light to-white border border-brand-green/20 rounded-2xl p-5 shadow-sm space-y-3">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-brand-green text-white grid place-items-center shrink-0 shadow-sm shadow-brand-green/20">
                                <Headphones className="w-4.5 h-4.5" />
                            </div>
                            <h2 className="text-sm font-bold text-gray-900">Need Help?</h2>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">
                            Learn how to schedule and manage interviews effectively.
                        </p>
                        <button className="text-xs font-semibold text-brand-green hover:underline flex items-center gap-1">
                            Visit Help Center <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
