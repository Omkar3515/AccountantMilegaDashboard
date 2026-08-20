
import {
    Search,
    Bell,
    ChevronDown,
    ChevronRight,
    ChevronLeft,
    Plus,
    BellRing,
    Pencil,
    MoreVertical,
    Filter,
    CheckCircle2,
    PauseCircle,
    StopCircle,
    Funnel,
    Headphones,
} from "lucide-react";

const alerts = [
    {
        title: "Senior Accountant",
        location: "Mumbai, MH",
        type: "Full Time",
        exp: "Exp: 3-6 Years",
        role: "Senior Accountant",
        department: "Accounts & Finance",
        status: "Active",
        date: "20 May 2025",
        icon: "purple",
    },
    {
        title: "Tax Associate",
        location: "Pune, MH",
        type: "Full Time",
        exp: "Exp: 1-3 Years",
        role: "Tax Associate",
        department: "Taxation",
        status: "Active",
        date: "18 May 2025",
        icon: "green",
    },
    {
        title: "Internal Auditor",
        location: "Bangalore, KA",
        type: "Full Time",
        exp: "Exp: 2-4 Years",
        role: "Internal Auditor",
        department: "Audit",
        status: "Paused",
        date: "10 May 2025",
        icon: "orange",
    },
    {
        title: "Junior Accountant",
        location: "Delhi, DL",
        type: "Full Time",
        exp: "Exp: 0-2 Years",
        role: "Junior Accountant",
        department: "Accounts & Finance",
        status: "Active",
        date: "05 May 2025",
        icon: "red",
    },
    {
        title: "CA Articleship",
        location: "Mumbai, MH",
        type: "Internship",
        exp: "Exp: 0-1 Years",
        role: "CA Articleship",
        department: "Accounts & Finance",
        status: "Expired",
        date: "28 Apr 2025",
        icon: "blue",
    },
    {
        title: "Finance Manager",
        location: "Hyderabad, TG",
        type: "Full Time",
        exp: "Exp: 6-10 Years",
        role: "Finance Manager",
        department: "Finance",
        status: "Active",
        date: "15 Apr 2025",
        icon: "purple",
    },
];

const iconColors = {
    purple: {
        bg: "bg-purple-50",
        text: "text-purple-600",
    },
    green: {
        bg: "bg-green-50",
        text: "text-green-600",
    },
    orange: {
        bg: "bg-orange-50",
        text: "text-orange-500",
    },
    red: {
        bg: "bg-red-50",
        text: "text-red-500",
    },
    blue: {
        bg: "bg-blue-50",
        text: "text-blue-500",
    },
};
function StatCard({
    icon: Icon,
    title,
    value,
    bottom,
    type = "purple",
}: {
    icon: React.ElementType;
    title: string;
    value: string;
    bottom: string;
    type?: "purple" | "green" | "orange" | "red";
}) {
    const styles = {
        purple: {
            bg: "bg-purple-50",
            text: "text-purple-600",
        },
        green: {
            bg: "bg-green-50",
            text: "text-green-600",
        },
        orange: {
            bg: "bg-orange-50",
            text: "text-orange-500",
        },
        red: {
            bg: "bg-red-50",
            text: "text-red-500",
        },
    };

    return (
        <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-4">
                <div
                    className={`w-12 h-12 rounded-xl ${styles[type].bg} flex items-center justify-center`}
                >
                    <Icon size={24} className={styles[type].text} strokeWidth={1.8} />
                </div>

                <div>
                    <p className="text-[12px] text-slate-600 mb-1">{title}</p>
                    <h3 className="text-[24px] font-bold text-slate-900 leading-none">
                        {value}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-2">{bottom}</p>
                </div>
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const classes: Record<string, string> = {
        Active: "bg-green-50 text-green-600",
        Paused: "bg-orange-50 text-orange-500",
        Expired: "bg-red-50 text-red-500",
    };

    return (
        <span
            className={`inline-flex px-3 py-1 rounded-md text-[11px] font-medium ${classes[status] || "bg-slate-50 text-slate-600"}`}
        >
            {status}
        </span>
    );
}

function AlertIcon({ color }: { color: string }) {
    const style = iconColors[color as keyof typeof iconColors] || iconColors.purple;

    return (
        <div
            className={`w-10 h-10 rounded-xl ${style.bg} flex items-center justify-center shrink-0`}
        >
            <BellRing size={19} className={style.text} strokeWidth={1.8} />
        </div>
    );
}

function DonutChart() {
    return (
        <div className="flex items-center justify-between gap-4">
            {/* Donut Chart */}
            <div className="relative w-24 h-24 shrink-0">
                <svg
                    className="w-full h-full -rotate-90"
                    viewBox="0 0 100 100"
                >
                    {/* Background */}
                    <circle
                        className="text-gray-100 stroke-current"
                        strokeWidth="12"
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                    />

                    {/* Active - Green - 75% */}
                    <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke="#10B981"
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeDasharray={`${251.2 * 0.75} ${251.2}`}
                        strokeDashoffset="0"
                    />

                    {/* Paused - Orange - 12.5% */}
                    <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke="#F97316"
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeDasharray={`${251.2 * 0.125} ${251.2}`}
                        strokeDashoffset={-(251.2 * 0.75)}
                    />

                    {/* Expired - Red - 12.5% */}
                    <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke="#EF4444"
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeDasharray={`${251.2 * 0.125} ${251.2}`}
                        strokeDashoffset={-(251.2 * (0.75 + 0.125))}
                    />
                </svg>

                {/* Center */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white m-3 rounded-full">
                    <span className="text-xl font-bold text-gray-900">8</span>
                    <span className="text-[9px] font-semibold text-gray-500">
                        Total
                    </span>
                </div>
            </div>

            {/* Legend */}
            <div className="space-y-3 w-full">
                {/* Active */}
                <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></span>
                        <span className="text-gray-700 font-medium">Active</span>
                    </div>
                    <div className="flex gap-2">
                        <span className="font-semibold text-gray-900">6</span>
                        <span className="text-gray-400 w-10 text-right">(75.0%)</span>
                    </div>
                </div>

                {/* Paused */}
                <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#F97316]"></span>
                        <span className="text-gray-700 font-medium">Paused</span>
                    </div>
                    <div className="flex gap-2">
                        <span className="font-semibold text-gray-900">1</span>
                        <span className="text-gray-400 w-10 text-right">(12.5%)</span>
                    </div>
                </div>

                {/* Expired */}
                <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]"></span>
                        <span className="text-gray-700 font-medium">Expired</span>
                    </div>
                    <div className="flex gap-2">
                        <span className="font-semibold text-gray-900">1</span>
                        <span className="text-gray-400 w-10 text-right">(12.5%)</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function QuickTip({ icon: Icon, iconStyle, title, text }: { icon: React.ElementType; iconStyle: string; title: string; text: string }) {
    return (
        <div className="flex gap-4 group cursor-pointer">
            <div
                className={`w-11 h-11 rounded-xl ${iconStyle} flex items-center justify-center shrink-0`}
            >
                <Icon size={21} strokeWidth={1.8} />
            </div>

            <div className="flex-1">
                <div className="flex items-center justify-between">
                    <h4 className="text-[12px] font-semibold text-slate-800">
                        {title}
                    </h4>
                    <ChevronRight
                        size={15}
                        className="text-slate-400 group-hover:text-purple-600"
                    />
                </div>

                <p className="text-[11px] leading-5 text-slate-500 mt-1">
                    {text}
                </p>
            </div>
        </div>
    );
}

export default function JobAlerts() {
    return (
        <div className="max-w-[1400px] mx-auto space-y-6 pb-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <p className="text-sm text-gray-500 mb-2">
                        <span className="hover:text-[#087A37] cursor-pointer">Dashboard</span>{" "}
                        <span className="mx-1">›</span>
                        <span className="text-gray-900 font-medium">Job Alerts</span>
                    </p>
                    <h1 className="text-2xl font-bold text-gray-900">Job Alerts</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Create job alerts and get notified when new candidates match your requirements.
                    </p>
                </div>
                <button className="flex items-center gap-2 bg-[#087A37] hover:bg-[#06632c] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm shadow-[#087A37]/20">
                    <Plus className="w-4 h-4" /> Create New Alert
                </button>
            </div>

            {/* Top Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    icon={BellRing}
                    title="Total Alerts"
                    value="8"
                    bottom="All time"
                    type="purple"
                />
                <StatCard
                    icon={CheckCircle2}
                    title="Active Alerts"
                    value="6"
                    bottom="75%"
                    type="green"
                />
                <StatCard
                    icon={PauseCircle}
                    title="Paused Alerts"
                    value="1"
                    bottom="12.5%"
                    type="orange"
                />
                <StatCard
                    icon={StopCircle}
                    title="Expired Alerts"
                    value="1"
                    bottom="12.5%"
                    type="red"
                />
            </div>

            {/* Main Content Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6 items-start">
                {/* Left Column: Table Card */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                    {/* Filters */}
                    <div className="p-4 flex flex-col sm:flex-row gap-3 border-b border-gray-200">
                        {/* Search */}
                        <div className="relative flex-1">
                            <Search
                                size={16}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                            <input
                                placeholder="Search alerts by title or keyword..."
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#087A37]/20 focus:border-[#087A37]"
                            />
                        </div>

                        {/* Status */}
                        <button className="h-10 border border-gray-200 rounded-lg px-3 flex items-center justify-between text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                            <span>All Status</span>
                            <ChevronDown size={14} className="ml-2 text-gray-400" />
                        </button>

                        {/* Department */}
                        <button className="h-10 border border-gray-200 rounded-lg px-3 flex items-center justify-between text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                            <span>All Departments</span>
                            <ChevronDown size={14} className="ml-2 text-gray-400" />
                        </button>

                        {/* Filter */}
                        <button className="h-10 px-4 border border-[#087A37] text-[#087A37] hover:bg-[#087A37]/5 rounded-lg flex items-center gap-2 text-xs font-semibold transition-colors">
                            <Filter size={15} />
                            Filter
                        </button>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-50/50">
                                    <th className="px-4 py-3.5 text-xs font-bold text-gray-900">
                                        Alert Details
                                    </th>
                                    <th className="px-3 py-3.5 text-xs font-bold text-gray-900">
                                        Target Role
                                    </th>
                                    <th className="px-3 py-3.5 text-xs font-bold text-gray-900">
                                        Department
                                    </th>
                                    <th className="px-3 py-3.5 text-xs font-bold text-gray-900">
                                        Status
                                    </th>
                                    <th className="px-3 py-3.5 text-xs font-bold text-gray-900 whitespace-nowrap">
                                        Created On
                                    </th>
                                    <th className="text-center px-3 py-3.5 text-xs font-bold text-gray-900">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">
                                {alerts.map((alert, index) => (
                                    <tr
                                        key={index}
                                        className="hover:bg-gray-50/80 transition-colors"
                                    >
                                        {/* Alert Details */}
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-3">
                                                <AlertIcon color={alert.icon} />
                                                <div>
                                                    <h4 className="text-sm font-bold text-gray-900">
                                                        {alert.title}
                                                    </h4>
                                                    <div className="flex items-center gap-2 mt-0.5 text-xs text-gray-500">
                                                        <span>{alert.location}</span>
                                                        <span>•</span>
                                                        <span>{alert.type}</span>
                                                    </div>
                                                    <p className="text-[11px] text-gray-400 mt-0.5">
                                                        {alert.exp}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Role */}
                                        <td className="px-3 py-4">
                                            <span className="text-xs font-medium text-gray-700">
                                                {alert.role}
                                            </span>
                                        </td>

                                        {/* Department */}
                                        <td className="px-3 py-4">
                                            <span className="text-xs font-medium text-gray-700">
                                                {alert.department}
                                            </span>
                                        </td>

                                        {/* Status */}
                                        <td className="px-3 py-4">
                                            <StatusBadge status={alert.status} />
                                        </td>

                                        {/* Date */}
                                        <td className="px-3 py-4 whitespace-nowrap">
                                            <span className="text-xs text-gray-500">
                                                {alert.date}
                                            </span>
                                        </td>

                                        {/* Actions */}
                                        <td className="px-3 py-4">
                                            <div className="flex items-center justify-center gap-3">
                                                <button className="text-gray-400 hover:text-[#087A37] transition-colors p-1">
                                                    <Pencil size={15} />
                                                </button>
                                                <button className="text-gray-400 hover:text-gray-600 transition-colors p-1">
                                                    <MoreVertical size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
                        <p className="text-xs text-gray-500">
                            Showing 1 to 6 of 8 alerts
                        </p>

                        <div className="flex items-center gap-1.5">
                            <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors">
                                <ChevronLeft size={15} />
                            </button>
                            <button className="w-8 h-8 rounded-lg bg-[#087A37] text-white text-xs font-bold shadow-sm shadow-[#087A37]/20">
                                1
                            </button>
                            <button className="w-8 h-8 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                                2
                            </button>
                            <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors">
                                <ChevronRight size={15} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar Column */}
                <div className="space-y-6">
                    {/* Alerts Overview */}
                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                        <h3 className="font-bold text-gray-900 mb-6">
                            Alerts Overview
                        </h3>
                        <DonutChart />
                    </div>

                    {/* Quick Tips */}
                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
                        <h3 className="font-bold text-gray-900 mb-4">
                            Quick Tips
                        </h3>
                        <div className="space-y-4">
                            <QuickTip
                                icon={BellRing}
                                iconStyle="bg-[#087A37]/10 text-[#087A37]"
                                title="Be specific with keywords"
                                text="Use specific skills, roles and locations for better candidate matches."
                            />
                            <QuickTip
                                icon={Funnel}
                                iconStyle="bg-emerald-100 text-emerald-600"
                                title="Update alerts regularly"
                                text="Review and update your alerts to keep getting relevant candidates."
                            />
                            <QuickTip
                                icon={Bell}
                                iconStyle="bg-amber-100 text-amber-600"
                                title="Check your notifications"
                                text="Enable email notifications to never miss a suitable candidate."
                            />
                        </div>

                        <button className="mt-5 text-[#087A37] text-xs font-semibold hover:underline flex items-center gap-1">
                            View All Tips <span className="text-lg leading-none mt-[-2px]">→</span>
                        </button>
                    </div>

                    {/* Need Help */}
                    <div className="bg-[#087A37]/5 border border-[#087A37]/10 rounded-xl shadow-sm p-6">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-lg bg-[#087A37]/10 flex items-center justify-center">
                                <Headphones className="w-5 h-5 text-[#087A37]" />
                            </div>
                            <h3 className="font-bold text-gray-900">Need Help?</h3>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed mb-4">
                            Learn more about job alerts and how to get the best matches.
                        </p>
                        <button className="text-[#087A37] font-semibold text-xs flex items-center gap-1.5 hover:gap-2 transition-all">
                            Visit Help Center <span className="text-lg leading-none mt-[-2px]">→</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}