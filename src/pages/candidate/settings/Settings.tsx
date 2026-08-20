import React, { useState } from "react";
import {
    UserRound,
    Lock,
    Bell,
    ShieldCheck,
    Mail,
    Briefcase,
    KeyRound,
    Trash2,
    Edit3,
    Camera,
    CheckCircle2,
    ChevronRight,
    Headphones,
    Globe,
    Shield,
    Smartphone
} from "lucide-react";

// Brand SVG components (lucide-react removed social brand icons in recent releases)
const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.05c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
    </svg>
);

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
);

interface SettingsProps {
    onNavigate?: (page: string) => void;
}

export default function Settings({ onNavigate }: SettingsProps) {
    const [activeTab, setActiveTab] = useState("profile");
    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        fullName: "Rahul Sharma",
        email: "rahul.sharma@gmail.com",
        phone: "+91 98765 43210",
        location: "Mumbai, Maharashtra, India",
        designation: "Senior Accountant",
        experience: "4+ Years",
        about: "Detail-oriented and results-driven Accountant with 4+ years of experience in handling financial records, GST compliance, taxation and bank reconciliation. Proficient in Tally, Excel and financial reporting.",
        linkedin: "https://linkedin.com/in/rahulsharma",
        twitter: "https://twitter.com/rahulsharma",
        portfolio: "https://portfolio.rahulsharma.com",
        github: "https://github.com/rahulsharma"
    });

    const menuItems = [
        { id: "profile", label: "Profile Information", icon: UserRound },
        { id: "security", label: "Account & Security", icon: Lock },
        { id: "notifications", label: "Notification Preferences", icon: Bell },
        { id: "privacy", label: "Privacy Settings", icon: ShieldCheck },
        { id: "email", label: "Email Preferences", icon: Mail },
        { id: "applications", label: "Application Preferences", icon: Briefcase },
        { id: "password", label: "Change Password", icon: KeyRound },
        { id: "delete", label: "Delete Account", icon: Trash2, isDanger: true },
    ];

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        setIsEditing(false);
    };

    return (
        <div className="candidate-settings max-w-[1240px] mx-auto space-y-6">
            {/* Breadcrumb & Header */}
            <div>
                <p className="text-sm text-slate-500 mb-2">
                    <button
                        onClick={() => onNavigate && onNavigate("dashboard")}
                        className="hover:text-blue-700 hover:underline transition-colors"
                    >
                        Dashboard
                    </button>
                    <span className="mx-1.5">›</span>
                    <span className="text-slate-600 font-medium">Settings</span>
                </p>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">Settings</h1>
                <p className="text-sm text-slate-500 mt-1">
                    Manage your account preferences and application settings.
                </p>
            </div>

            {/* Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_300px] xl:grid-cols-[260px_1fr_320px] gap-6 items-start">
                
                {/* ── Column 1: Settings Menu ── */}
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                    <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 mb-3">
                        Settings Menu
                    </h2>
                    <nav className="space-y-1">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeTab === item.id;
                            if (item.isDanger) {
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id)}
                                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                                            isActive
                                                ? "bg-red-50 text-red-600 font-semibold"
                                                : "text-red-500 hover:bg-red-50/80"
                                        }`}
                                    >
                                        <span className="flex items-center gap-3">
                                            <Icon className="w-4.5 h-4.5 text-red-500" />
                                            {item.label}
                                        </span>
                                        <ChevronRight className="w-4 h-4 text-red-400" />
                                    </button>
                                );
                            }

                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                                        isActive
                                            ? "bg-blue-50 text-blue-700 font-semibold border-l-4 border-blue-700 rounded-l-none pl-2.5"
                                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                    }`}
                                >
                                    <span className="flex items-center gap-3">
                                        <Icon className={`w-4.5 h-4.5 ${isActive ? "text-blue-700" : "text-slate-400"}`} />
                                        {item.label}
                                    </span>
                                    <ChevronRight className={`w-4 h-4 ${isActive ? "text-blue-700" : "text-slate-300"}`} />
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* ── Column 2: Main Panel ── */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
                    {/* Panel Header */}
                    <div className="flex items-start justify-between pb-5 border-b border-slate-100">
                        <div>
                            <h2 className="text-lg font-bold text-slate-900">Profile Information</h2>
                            <p className="text-xs text-slate-500 mt-1">Update your personal details and information.</p>
                        </div>
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="border border-blue-600 text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                        >
                            <Edit3 className="w-3.5 h-3.5" />
                            {isEditing ? "View Details" : "Edit Profile"}
                        </button>
                    </div>

                    {/* Avatar & Personal Details */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                        <div className="relative shrink-0">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-slate-800 to-blue-900 text-white grid place-items-center text-2xl font-bold border-4 border-white shadow-md">
                                RS
                            </div>
                            <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-blue-700 hover:bg-blue-800 text-white grid place-items-center shadow-md transition-all">
                                <Camera className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-1">Full Name</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={formData.fullName}
                                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-700/20 focus:border-blue-700"
                                    />
                                ) : (
                                    <p className="text-sm font-bold text-slate-900">{formData.fullName}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-1">Email Address</label>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange("email", e.target.value)}
                                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-700/20 focus:border-blue-700"
                                    />
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm font-bold text-slate-900">{formData.email}</p>
                                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                                            Verified
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-1">Phone Number</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={formData.phone}
                                        onChange={(e) => handleInputChange("phone", e.target.value)}
                                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-700/20 focus:border-blue-700"
                                    />
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm font-bold text-slate-900">{formData.phone}</p>
                                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                                            Verified
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-1">Current Location</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={formData.location}
                                        onChange={(e) => handleInputChange("location", e.target.value)}
                                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-700/20 focus:border-blue-700"
                                    />
                                ) : (
                                    <p className="text-sm font-bold text-slate-900">{formData.location}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-1">Current Designation</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={formData.designation}
                                        onChange={(e) => handleInputChange("designation", e.target.value)}
                                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-700/20 focus:border-blue-700"
                                    />
                                ) : (
                                    <p className="text-sm font-bold text-slate-900">{formData.designation}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-1">Total Experience</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={formData.experience}
                                        onChange={(e) => handleInputChange("experience", e.target.value)}
                                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-700/20 focus:border-blue-700"
                                    />
                                ) : (
                                    <p className="text-sm font-bold text-slate-900">{formData.experience}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Key Skills */}
                    <div className="pt-4 border-t border-slate-100">
                        <label className="block text-xs font-bold text-slate-700 mb-2">Key Skills</label>
                        <div className="flex flex-wrap gap-2">
                            {["Tally", "GST", "Excel", "Accounting", "Bank Reconciliation", "+3"].map((skill, idx) => (
                                <span
                                    key={idx}
                                    className="bg-slate-100 border border-slate-200 text-slate-700 text-xs px-3 py-1 rounded-md font-medium"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* About Me */}
                    <div className="pt-4 border-t border-slate-100">
                        <label className="block text-xs font-bold text-slate-700 mb-1">About Me</label>
                        {isEditing ? (
                            <textarea
                                rows={3}
                                value={formData.about}
                                onChange={(e) => handleInputChange("about", e.target.value)}
                                className="w-full p-3 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-700/20 focus:border-blue-700"
                            />
                        ) : (
                            <p className="text-xs text-slate-600 leading-relaxed">{formData.about}</p>
                        )}
                    </div>

                    {/* Social Links (Optional) */}
                    <div className="pt-5 border-t border-slate-100">
                        <h3 className="text-sm font-bold text-slate-900">Social Links (Optional)</h3>
                        <p className="text-xs text-slate-500 mb-4">Add your professional social profiles</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5">
                                <LinkedinIcon className="w-5 h-5 text-[#0A66C2] shrink-0" />
                                <input
                                    type="text"
                                    value={formData.linkedin}
                                    onChange={(e) => handleInputChange("linkedin", e.target.value)}
                                    placeholder="https://linkedin.com/in/username"
                                    className="w-full bg-transparent text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
                                />
                            </div>

                            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5">
                                <TwitterIcon className="w-5 h-5 text-[#1DA1F2] shrink-0" />
                                <input
                                    type="text"
                                    value={formData.twitter}
                                    onChange={(e) => handleInputChange("twitter", e.target.value)}
                                    placeholder="https://twitter.com/username"
                                    className="w-full bg-transparent text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
                                />
                            </div>

                            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5">
                                <Globe className="w-5 h-5 text-blue-600 shrink-0" />
                                <input
                                    type="text"
                                    value={formData.portfolio}
                                    onChange={(e) => handleInputChange("portfolio", e.target.value)}
                                    placeholder="https://portfolio.com"
                                    className="w-full bg-transparent text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
                                />
                            </div>

                            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5">
                                <GithubIcon className="w-5 h-5 text-slate-800 shrink-0" />
                                <input
                                    type="text"
                                    value={formData.github}
                                    onChange={(e) => handleInputChange("github", e.target.value)}
                                    placeholder="https://github.com/username"
                                    className="w-full bg-transparent text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                        <button
                            onClick={handleSave}
                            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs px-6 py-2.5 rounded-lg shadow-sm transition-colors"
                        >
                            Save Changes
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs px-6 py-2.5 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </div>

                {/* ── Column 3: Right Sidebar Widgets ── */}
                <div className="space-y-6">
                    {/* Widget 1: Account Completion */}
                    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm text-center">
                        <h3 className="text-sm font-bold text-slate-900 text-left mb-4">Account Completion</h3>

                        {/* Circular Meter */}
                        <div className="relative w-28 h-28 mx-auto mb-3 grid place-items-center">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                <path
                                    className="text-slate-100"
                                    strokeWidth="3.5"
                                    stroke="currentColor"
                                    fill="none"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                                <path
                                    className="text-blue-700"
                                    strokeDasharray="85, 100"
                                    strokeWidth="3.5"
                                    strokeLinecap="round"
                                    stroke="currentColor"
                                    fill="none"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                            </svg>
                            <div className="absolute flex flex-col items-center">
                                <span className="text-xl font-extrabold text-slate-900">85%</span>
                                <span className="text-[10px] font-semibold text-slate-400">Completed</span>
                            </div>
                        </div>

                        <p className="text-xs text-slate-600 mb-4 font-medium">Great! Your profile is almost complete.</p>

                        <div className="space-y-2 text-left text-xs mb-5">
                            <div className="flex items-center justify-between">
                                <span className="flex items-center gap-2 text-slate-700 font-medium">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Personal Information
                                </span>
                                <span className="font-bold text-slate-900">100%</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="flex items-center gap-2 text-slate-700 font-medium">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Work Experience
                                </span>
                                <span className="font-bold text-slate-900">100%</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="flex items-center gap-2 text-slate-700 font-medium">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Skills
                                </span>
                                <span className="font-bold text-slate-900">100%</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="flex items-center gap-2 text-slate-700 font-medium">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Education
                                </span>
                                <span className="font-bold text-slate-900">80%</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="flex items-center gap-2 text-slate-700 font-medium">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Resume
                                </span>
                                <span className="font-bold text-slate-900">100%</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="flex items-center gap-2 text-slate-700 font-medium">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Profile Photo
                                </span>
                                <span className="font-bold text-slate-900">100%</span>
                            </div>
                        </div>

                        <button
                            onClick={() => onNavigate && onNavigate("profile")}
                            className="w-full bg-blue-700 hover:bg-blue-800 text-white rounded-lg py-2.5 text-xs font-semibold transition-colors shadow-sm"
                        >
                            Improve Profile
                        </button>
                    </div>

                    {/* Widget 2: Account Security */}
                    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                        <h3 className="text-sm font-bold text-slate-900 mb-4">Account Security</h3>

                        <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-3.5 flex items-start gap-3 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white grid place-items-center shrink-0">
                                <Shield className="w-4.5 h-4.5" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-emerald-900">Your account is secure</p>
                                <p className="text-[11px] text-emerald-700 mt-0.5">Last login: 24 May 2025, 09:30 AM</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <button className="w-full flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg text-left transition-colors">
                                <div className="flex items-center gap-3 min-w-0">
                                    <Lock className="w-4 h-4 text-slate-500 shrink-0" />
                                    <div className="truncate">
                                        <p className="text-xs font-bold text-slate-900">Password</p>
                                        <p className="text-[11px] text-slate-500 truncate">Updated 2 months ago</p>
                                    </div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                            </button>

                            <button className="w-full flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg text-left transition-colors">
                                <div className="flex items-center gap-3 min-w-0">
                                    <ShieldCheck className="w-4 h-4 text-slate-500 shrink-0" />
                                    <div className="truncate">
                                        <p className="text-xs font-bold text-slate-900">2-Step Verification</p>
                                        <p className="text-[11px] text-emerald-600 font-semibold truncate">Enabled</p>
                                    </div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                            </button>

                            <button className="w-full flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg text-left transition-colors">
                                <div className="flex items-center gap-3 min-w-0">
                                    <Smartphone className="w-4 h-4 text-slate-500 shrink-0" />
                                    <div className="truncate">
                                        <p className="text-xs font-bold text-slate-900">Active Sessions</p>
                                        <p className="text-[11px] text-slate-500 truncate">3 active sessions</p>
                                    </div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                            </button>
                        </div>
                    </div>

                    {/* Widget 3: Need Help? */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50/60 border border-blue-100 rounded-xl p-5 shadow-sm">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-blue-700 text-white grid place-items-center shrink-0">
                                <Headphones className="w-4 h-4" />
                            </div>
                            <h3 className="text-sm font-bold text-slate-900">Need Help?</h3>
                        </div>
                        <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                            Need help with your account settings?
                        </p>
                        <button
                            onClick={() => onNavigate && onNavigate("support")}
                            className="text-xs font-semibold text-blue-700 hover:text-blue-800 flex items-center gap-1 hover:underline"
                        >
                            Visit Help Center <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
