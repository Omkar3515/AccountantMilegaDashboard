import React, { useState } from "react";
import {
    Search,
    UserRound,
    Briefcase,
    Bell,
    Calendar,
    FileText,
    ShieldCheck,
    CreditCard,
    MoreHorizontal,
    ChevronRight,
    MessageSquare,
    Mail,
    Phone,
    Clock,
    Users,
    PlayCircle,
    BookOpen,
    AlertTriangle,
    MessageSquarePlus,
    HelpCircle,
    ArrowRight,
    Check
} from "lucide-react";

interface HelpandSupportProps {
    onNavigate?: (page: string) => void;
}

const helpTopics = [
    {
        id: "account",
        title: "Account & Profile",
        desc: "Manage your account, profile settings and verification.",
        icon: UserRound,
        iconBg: "bg-blue-50 text-blue-700",
    },
    {
        id: "applications",
        title: "Applications",
        desc: "Learn about job applications and application status.",
        icon: Briefcase,
        iconBg: "bg-emerald-50 text-emerald-700",
    },
    {
        id: "jobs",
        title: "Jobs & Alerts",
        desc: "Find jobs, set up alerts and manage your preferences.",
        icon: Bell,
        iconBg: "bg-amber-50 text-amber-700",
    },
    {
        id: "interviews",
        title: "Interviews",
        desc: "Schedule, reschedule and manage your interview calls.",
        icon: Calendar,
        iconBg: "bg-indigo-50 text-indigo-700",
    },
    {
        id: "resume",
        title: "Resume & Profile",
        desc: "Build, update and optimize your resume and profile.",
        icon: FileText,
        iconBg: "bg-rose-50 text-rose-700",
    },
    {
        id: "privacy",
        title: "Privacy & Security",
        desc: "Learn about your data privacy and account security.",
        icon: ShieldCheck,
        iconBg: "bg-violet-50 text-violet-700",
    },
    {
        id: "payments",
        title: "Payments",
        desc: "Refunds, transactions and subscription related help.",
        icon: CreditCard,
        iconBg: "bg-cyan-50 text-cyan-700",
    },
    {
        id: "other",
        title: "Other Topics",
        desc: "Explore other common questions and concerns.",
        icon: MoreHorizontal,
        iconBg: "bg-slate-100 text-slate-700",
    },
];

const popularArticles = [
    {
        id: 1,
        title: "How can I update my profile information?",
        answer: "To update your profile information, navigate to Profile settings from your Dashboard menu. Click 'Edit Profile' and make your changes, then save."
    },
    {
        id: 2,
        title: "How do I track my job application status?",
        answer: "You can track all your applied jobs under the 'My Applications' tab. Statuses are updated in real-time as employers review your profile."
    },
    {
        id: 3,
        title: "How can I reset my password?",
        answer: "Go to Settings > Change Password, or click 'Forgot Password' on the login screen to receive a reset link on your registered email."
    },
    {
        id: 4,
        title: "How do I set up job alerts?",
        answer: "Visit 'Job Alerts' tab from the sidebar. Click 'Create Alert', enter your preferred job role, location, and salary, and save to receive instant updates."
    },
    {
        id: 5,
        title: "How can I schedule an interview call?",
        answer: "When an employer invites you for an interview, you'll receive a notification and an update under 'Interview Calls' where you can confirm or request a reschedule."
    },
];

export default function HelpandSupport({ onNavigate }: HelpandSupportProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeArticle, setActiveArticle] = useState<number | null>(null);

    const handlePopularSearch = (term: string) => {
        setSearchQuery(term);
    };

    return (
        <div className="candidate-help-support max-w-[1240px] mx-auto space-y-6">
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
                    <span className="text-slate-600 font-medium">Help & Support</span>
                </p>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">Help & Support</h1>
                <p className="text-sm text-slate-500 mt-1">
                    We're here to help you find answers and solve any issues.
                </p>
            </div>

            {/* Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_340px] gap-6 items-start">
                
                {/* ── Main Content Area (Left) ── */}
                <div className="space-y-6">
                    {/* Search Bar Section */}
                    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
                        <div className="relative">
                            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search for help articles..."
                                className="w-full pl-12 pr-4 py-3 text-sm rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-700/20 focus:border-blue-700 focus:bg-white transition-all"
                            />
                        </div>

                        <div className="flex items-center gap-2 flex-wrap text-xs text-slate-500">
                            <span className="font-semibold text-slate-600">Popular searches:</span>
                            {["Applications", "Profile", "Resume", "Interviews", "Alerts"].map((term) => (
                                <button
                                    key={term}
                                    onClick={() => handlePopularSearch(term)}
                                    className="bg-slate-100 hover:bg-blue-50 hover:text-blue-700 border border-slate-200 text-slate-700 px-3 py-1 rounded-full font-medium transition-colors"
                                >
                                    {term}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Help Topics Grid */}
                    <div>
                        <h2 className="text-base font-bold text-slate-900 mb-4">Help Topics</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                            {helpTopics.map((topic) => {
                                const Icon = topic.icon;
                                return (
                                    <div
                                        key={topic.id}
                                        className="bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md rounded-xl p-5 flex flex-col justify-between text-center transition-all cursor-pointer group"
                                    >
                                        <div className="space-y-3">
                                            <div className={`w-12 h-12 mx-auto rounded-full grid place-items-center ${topic.iconBg}`}>
                                                <Icon className="w-6 h-6" />
                                            </div>
                                            <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                                                {topic.title}
                                            </h3>
                                            <p className="text-xs text-slate-500 leading-relaxed">
                                                {topic.desc}
                                            </p>
                                        </div>
                                        <div className="mt-4 pt-3 border-t border-slate-100 text-blue-700 grid place-items-center">
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Popular Articles Accordion */}
                    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-base font-bold text-slate-900">Popular Articles</h2>
                            <button className="text-xs font-semibold text-blue-700 hover:underline flex items-center gap-1">
                                View All Articles <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                        </div>

                        <div className="divide-y divide-slate-100">
                            {popularArticles.map((article) => {
                                const isOpen = activeArticle === article.id;
                                return (
                                    <div key={article.id} className="py-3">
                                        <button
                                            onClick={() => setActiveArticle(isOpen ? null : article.id)}
                                            className="w-full flex items-center justify-between text-left hover:text-blue-700 transition-colors py-1"
                                        >
                                            <div className="flex items-center gap-3 min-w-0 pr-4">
                                                <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                                                <span className="text-xs font-semibold text-slate-900 hover:text-blue-700">
                                                    {article.title}
                                                </span>
                                            </div>
                                            <ChevronRight
                                                className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                                                    isOpen ? "rotate-90 text-blue-700" : ""
                                                }`}
                                            />
                                        </button>
                                        {isOpen && (
                                            <div className="mt-2.5 ml-7 text-xs text-slate-600 bg-blue-50/50 p-3.5 rounded-lg border border-blue-100/80 leading-relaxed">
                                                {article.answer}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* ── Right Sidebar (Widgets) ── */}
                <div className="space-y-6">
                    {/* Widget 1: Contact Support */}
                    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
                        <div>
                            <h2 className="text-sm font-bold text-slate-900">Contact Support</h2>
                            <p className="text-xs text-slate-500 mt-1">
                                Can't find what you're looking for? Our support team is ready to help.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <button className="w-full border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 rounded-xl p-3.5 flex items-center justify-between text-left transition-all group">
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 grid place-items-center shrink-0">
                                        <MessageSquare className="w-4.5 h-4.5" />
                                    </div>
                                    <div className="truncate">
                                        <div className="flex items-center gap-2">
                                            <p className="text-xs font-bold text-slate-900 group-hover:text-blue-700">Live Chat</p>
                                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700">
                                                Online
                                            </span>
                                        </div>
                                        <p className="text-[11px] text-slate-500 truncate mt-0.5">Chat with our support team</p>
                                    </div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-700 shrink-0" />
                            </button>

                            <button className="w-full border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 rounded-xl p-3.5 flex items-center justify-between text-left transition-all group">
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 grid place-items-center shrink-0">
                                        <Mail className="w-4.5 h-4.5" />
                                    </div>
                                    <div className="truncate">
                                        <p className="text-xs font-bold text-slate-900 group-hover:text-blue-700">Email Support</p>
                                        <p className="text-[11px] text-slate-500 truncate mt-0.5">support@accountantmilega.com</p>
                                    </div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-700 shrink-0" />
                            </button>

                            <button className="w-full border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 rounded-xl p-3.5 flex items-center justify-between text-left transition-all group">
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 grid place-items-center shrink-0">
                                        <Phone className="w-4.5 h-4.5" />
                                    </div>
                                    <div className="truncate">
                                        <p className="text-xs font-bold text-slate-900 group-hover:text-blue-700">Call Us</p>
                                        <p className="text-[11px] text-slate-500 truncate mt-0.5">+91 98765 43210</p>
                                        <p className="text-[10px] text-slate-400 mt-0.5">Mon - Sat, 9:00 AM - 6:00 PM</p>
                                    </div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-700 shrink-0" />
                            </button>
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                            <span className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5 text-slate-400" />
                                Average response time
                            </span>
                            <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                2-4 hours
                            </span>
                        </div>
                    </div>

                    {/* Widget 2: Quick Links */}
                    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
                        <h2 className="text-sm font-bold text-slate-900">Quick Links</h2>

                        <div className="space-y-3">
                            <button className="w-full flex items-center justify-between text-left hover:bg-slate-50 p-2 rounded-lg transition-colors group">
                                <div className="flex items-center gap-3 min-w-0">
                                    <Users className="w-4 h-4 text-slate-500 group-hover:text-blue-700 shrink-0" />
                                    <div className="truncate">
                                        <p className="text-xs font-bold text-slate-900 group-hover:text-blue-700">Community Forum</p>
                                        <p className="text-[11px] text-slate-500 truncate">Connect with other job seekers</p>
                                    </div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-700 shrink-0" />
                            </button>

                            <button className="w-full flex items-center justify-between text-left hover:bg-slate-50 p-2 rounded-lg transition-colors group">
                                <div className="flex items-center gap-3 min-w-0">
                                    <PlayCircle className="w-4 h-4 text-slate-500 group-hover:text-blue-700 shrink-0" />
                                    <div className="truncate">
                                        <p className="text-xs font-bold text-slate-900 group-hover:text-blue-700">Video Tutorials</p>
                                        <p className="text-[11px] text-slate-500 truncate">Watch step-by-step guides</p>
                                    </div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-700 shrink-0" />
                            </button>

                            <button className="w-full flex items-center justify-between text-left hover:bg-slate-50 p-2 rounded-lg transition-colors group">
                                <div className="flex items-center gap-3 min-w-0">
                                    <BookOpen className="w-4 h-4 text-slate-500 group-hover:text-blue-700 shrink-0" />
                                    <div className="truncate">
                                        <p className="text-xs font-bold text-slate-900 group-hover:text-blue-700">Career Resources</p>
                                        <p className="text-[11px] text-slate-500 truncate">Tips, advice and career guidance</p>
                                    </div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-700 shrink-0" />
                            </button>

                            <button className="w-full flex items-center justify-between text-left hover:bg-slate-50 p-2 rounded-lg transition-colors group">
                                <div className="flex items-center gap-3 min-w-0">
                                    <AlertTriangle className="w-4 h-4 text-slate-500 group-hover:text-blue-700 shrink-0" />
                                    <div className="truncate">
                                        <p className="text-xs font-bold text-slate-900 group-hover:text-blue-700">Report an Issue</p>
                                        <p className="text-[11px] text-slate-500 truncate">Let us know about an issue</p>
                                    </div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-700 shrink-0" />
                            </button>
                        </div>
                    </div>

                    {/* Widget 3: We value your feedback! */}
                    <div className="bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 rounded-xl p-5 shadow-sm space-y-3">
                        <h2 className="text-sm font-bold text-emerald-800">We value your feedback!</h2>
                        <p className="text-xs text-slate-600 leading-relaxed">
                            Help us improve by sharing your experience with us.
                        </p>
                        <button className="w-full border border-emerald-600 text-emerald-700 hover:bg-emerald-50 rounded-lg py-2 text-xs font-semibold flex items-center justify-center gap-2 transition-colors">
                            <MessageSquarePlus className="w-4 h-4" />
                            Give Feedback
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
