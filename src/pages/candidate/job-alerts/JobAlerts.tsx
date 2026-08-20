import React, { useState } from "react";
import {
  ArrowRight,
  Bell,
  BellRing,
  Calculator,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  FileSpreadsheet,
  FileText,
  Filter,
  IndianRupee,
  Lightbulb,
  Mail,
  MapPin,
  MoreVertical,
  PauseCircle,
  Plus,
  Search,
  Send,
  Sparkles,
  TrendingUp,
  UserCheck,
  X,
} from "lucide-react";

export interface JobAlertItem {
  id: string;
  iconType: "calculator" | "chart" | "file" | "folder" | "rupee" | "user";
  iconBg: string;
  iconColor: string;
  name: string;
  keywords: string;
  experience: string;
  location: string;
  frequency: "Daily" | "Weekly";
  lastNotifiedDate: string;
  lastNotifiedTime: string;
  active: boolean;
  type: "Email" | "Push";
}

const initialAlerts: JobAlertItem[] = [
  {
    id: "1",
    iconType: "calculator",
    iconBg: "bg-blue-50 text-blue-700 border border-blue-100",
    iconColor: "text-blue-700",
    name: "Accountant in Mumbai",
    keywords: "Accountant, Finance, Tally",
    experience: "2-5 Years",
    location: "Mumbai, Maharashtra",
    frequency: "Daily",
    lastNotifiedDate: "20 May 2025",
    lastNotifiedTime: "09:15 AM",
    active: true,
    type: "Email",
  },
  {
    id: "2",
    iconType: "chart",
    iconBg: "bg-emerald-50 text-emerald-700 border border-emerald-100",
    iconColor: "text-emerald-700",
    name: "Tax Executive in Pune",
    keywords: "Tax, GST, TDS",
    experience: "1-3 Years",
    location: "Pune, Maharashtra",
    frequency: "Daily",
    lastNotifiedDate: "20 May 2025",
    lastNotifiedTime: "08:30 AM",
    active: true,
    type: "Email",
  },
  {
    id: "3",
    iconType: "file",
    iconBg: "bg-amber-50 text-amber-700 border border-amber-100",
    iconColor: "text-amber-700",
    name: "Audit Assistant in Delhi",
    keywords: "Audit, Accounts",
    experience: "0-2 Years",
    location: "Delhi, NCR",
    frequency: "Weekly",
    lastNotifiedDate: "19 May 2025",
    lastNotifiedTime: "11:45 AM",
    active: true,
    type: "Push",
  },
  {
    id: "4",
    iconType: "folder",
    iconBg: "bg-teal-50 text-teal-700 border border-teal-100",
    iconColor: "text-teal-700",
    name: "Junior Accountant",
    keywords: "Junior Accountant, Excel",
    experience: "1-2 Years",
    location: "All India",
    frequency: "Daily",
    lastNotifiedDate: "20 May 2025",
    lastNotifiedTime: "10:05 AM",
    active: true,
    type: "Email",
  },
  {
    id: "5",
    iconType: "rupee",
    iconBg: "bg-rose-50 text-rose-700 border border-rose-100",
    iconColor: "text-rose-700",
    name: "Accounts Payable Executive",
    keywords: "AP, Payable, Invoice",
    experience: "2-4 Years",
    location: "Bangalore, Karnataka",
    frequency: "Weekly",
    lastNotifiedDate: "18 May 2025",
    lastNotifiedTime: "04:20 PM",
    active: false,
    type: "Email",
  },
  {
    id: "6",
    iconType: "user",
    iconBg: "bg-violet-50 text-violet-700 border border-violet-100",
    iconColor: "text-violet-700",
    name: "Finance Manager",
    keywords: "Finance, Manager, Reporting",
    experience: "5+ Years",
    location: "All India",
    frequency: "Daily",
    lastNotifiedDate: "17 May 2025",
    lastNotifiedTime: "09:00 AM",
    active: false,
    type: "Push",
  },
];

interface JobAlertsProps {
  onNavigate?: (page: string) => void;
}

const JobAlerts: React.FC<JobAlertsProps> = ({ onNavigate }) => {
  const [alerts, setAlerts] = useState<JobAlertItem[]>(initialAlerts);
  const [activeTab, setActiveTab] = useState<"All" | "Email" | "Push">("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [sortBy, setSortBy] = useState("Recent");
  const [showModal, setShowModal] = useState(false);

  // New alert form state
  const [newAlertName, setNewAlertName] = useState("");
  const [newKeywords, setNewKeywords] = useState("");
  const [newLocation, setNewLocation] = useState("Mumbai, Maharashtra");
  const [newFrequency, setNewFrequency] = useState<"Daily" | "Weekly">("Daily");
  const [newType, setNewType] = useState<"Email" | "Push">("Email");

  const filteredAlerts = alerts.filter((item) => {
    const matchesTab =
      activeTab === "All" ? true : item.type === activeTab;
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.keywords.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleToggleStatus = (id: string) => {
    setAlerts(
      alerts.map((item) =>
        item.id === id ? { ...item, active: !item.active } : item
      )
    );
  };

  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAlertName.trim()) return;

    const newAlert: JobAlertItem = {
      id: Date.now().toString(),
      iconType: "calculator",
      iconBg: "bg-blue-50 text-blue-700 border border-blue-100",
      iconColor: "text-blue-700",
      name: newAlertName,
      keywords: newKeywords || "Accountant, Tax",
      experience: "1-3 Years",
      location: newLocation,
      frequency: newFrequency,
      lastNotifiedDate: "Just Now",
      lastNotifiedTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      active: true,
      type: newType,
    };

    setAlerts([newAlert, ...alerts]);
    setShowModal(false);
    setNewAlertName("");
    setNewKeywords("");
  };

  const totalAlerts = alerts.length;
  const activeAlertsCount = alerts.filter((a) => a.active).length;
  const pausedAlertsCount = alerts.filter((a) => !a.active).length;
  const emailAlertsCount = alerts.filter((a) => a.type === "Email").length;
  const pushAlertsCount = alerts.filter((a) => a.type === "Push").length;

  const renderIcon = (type: JobAlertItem["iconType"]) => {
    switch (type) {
      case "calculator":
        return <Calculator className="w-5 h-5" />;
      case "chart":
        return <TrendingUp className="w-5 h-5" />;
      case "file":
        return <FileText className="w-5 h-5" />;
      case "folder":
        return <FileSpreadsheet className="w-5 h-5" />;
      case "rupee":
        return <IndianRupee className="w-5 h-5" />;
      case "user":
        return <UserCheck className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  return (
    <div className="job-alerts-page max-w-[1220px] mx-auto font-sans text-slate-900">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-4">
        <button
          onClick={() => onNavigate && onNavigate("dashboard")}
          className="hover:text-blue-700 transition-colors"
        >
          Dashboard
        </button>
        <span>&gt;</span>
        <span className="text-slate-900 font-semibold">Job Alerts</span>
      </div>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Job Alerts
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Create and manage job alerts to get notified about relevant opportunities.
          </p>
        </div>
        <div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-700 hover:bg-blue-800 text-white rounded-lg px-4 py-2.5 text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors shadow-sm shadow-blue-200"
          >
            <Plus className="w-4 h-4" />
            Create New Alert
          </button>
        </div>
      </div>

      {/* Tabs Filter */}
      <div className="flex items-center gap-6 border-b border-slate-200 mt-6 text-xs sm:text-sm font-medium">
        <button
          onClick={() => setActiveTab("All")}
          className={`pb-3 relative transition-colors ${
            activeTab === "All"
              ? "text-blue-700 font-bold border-b-2 border-blue-700"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          All Alerts ({totalAlerts})
        </button>
        <button
          onClick={() => setActiveTab("Email")}
          className={`pb-3 relative transition-colors ${
            activeTab === "Email"
              ? "text-blue-700 font-bold border-b-2 border-blue-700"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          Email Alerts ({emailAlertsCount})
        </button>
        <button
          onClick={() => setActiveTab("Push")}
          className={`pb-3 relative transition-colors ${
            activeTab === "Push"
              ? "text-blue-700 font-bold border-b-2 border-blue-700"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          Push Alerts ({pushAlertsCount})
        </button>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_295px] gap-6 mt-6">
        {/* Left Column: Search Filter & Alerts Table */}
        <div className="min-w-0">
          {/* Search & Filter Bar */}
          <section className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_auto] gap-3">
              <div className="border border-slate-200 rounded-lg px-3 py-2.5 text-sm flex items-center gap-2 text-slate-600 bg-white focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                <Search className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Search alerts by name or keywords..."
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
                  <option>Sort by: Recent</option>
                  <option>Sort by: Name (A-Z)</option>
                  <option>Sort by: Frequency</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              <button className="border border-slate-200 rounded-lg px-4 py-2.5 text-xs sm:text-sm text-slate-700 font-semibold flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors">
                <Filter className="w-4 h-4 text-slate-500" />
                Filters
              </button>
            </div>
          </section>

          {/* Job Alerts Table Container */}
          <section className="bg-white border border-slate-200 rounded-xl overflow-hidden mt-4 shadow-sm">
            <div className="w-full">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-3 px-3.5 font-semibold">Alert Name & Keywords</th>
                    <th className="py-3 px-2.5 font-semibold">Location</th>
                    <th className="py-3 px-2.5 font-semibold">Frequency</th>
                    <th className="py-3 px-2.5 font-semibold">Last Notified</th>
                    <th className="py-3 px-2.5 font-semibold text-center">Status</th>
                    <th className="py-3 px-2.5 font-semibold text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredAlerts.length > 0 ? (
                    filteredAlerts.map((alertItem) => (
                      <tr
                        key={alertItem.id}
                        className="hover:bg-slate-50/60 transition-colors"
                      >
                        {/* Alert Name & Keywords */}
                        <td className="py-3.5 px-3.5 align-middle">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-lg grid place-items-center shrink-0 ${alertItem.iconBg}`}
                            >
                              {renderIcon(alertItem.iconType)}
                            </div>
                            <div className="min-w-0">
                              <h3 className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                                {alertItem.name}
                              </h3>
                              <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                                <span className="text-slate-600 font-semibold">Keywords:</span> {alertItem.keywords}
                              </p>
                              <p className="text-[10px] text-slate-400 mt-0.5">
                                Experience: {alertItem.experience}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Location */}
                        <td className="py-3.5 px-2.5 align-middle whitespace-nowrap text-slate-600">
                          <p className="text-[11px] font-medium text-slate-700">{alertItem.location}</p>
                        </td>

                        {/* Frequency */}
                        <td className="py-3.5 px-2.5 align-middle whitespace-nowrap text-slate-600">
                          <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-700">
                            <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>{alertItem.frequency}</span>
                          </div>
                        </td>

                        {/* Last Notified */}
                        <td className="py-3.5 px-2.5 align-middle whitespace-nowrap">
                          <p className="text-slate-700 font-medium text-[11px]">
                            {alertItem.lastNotifiedDate}
                          </p>
                          <p className="text-[10px] text-slate-400 mt-0.5">
                            {alertItem.lastNotifiedTime}
                          </p>
                        </td>

                        {/* Status Toggle */}
                        <td className="py-3.5 px-2.5 align-middle text-center whitespace-nowrap">
                          <button
                            onClick={() => handleToggleStatus(alertItem.id)}
                            className="inline-flex items-center gap-2 cursor-pointer focus:outline-none"
                          >
                            <div
                              className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-200 ease-in-out ${
                                alertItem.active ? "bg-emerald-600" : "bg-slate-300"
                              }`}
                            >
                              <div
                                className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                                  alertItem.active ? "translate-x-4" : "translate-x-0"
                                }`}
                              />
                            </div>
                            <span
                              className={`text-[11px] font-semibold ${
                                alertItem.active ? "text-emerald-700" : "text-slate-500"
                              }`}
                            >
                              {alertItem.active ? "Active" : "Paused"}
                            </span>
                          </button>
                        </td>

                        {/* Action Menu */}
                        <td className="py-3.5 px-2.5 align-middle text-center whitespace-nowrap">
                          <button
                            title="More options"
                            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-500">
                        <div className="max-w-xs mx-auto text-center">
                          <BellRing className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                          <p className="font-semibold text-slate-700">No job alerts found</p>
                          <p className="text-xs text-slate-400 mt-1">
                            Create a new job alert to get instant notifications.
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
                Showing {filteredAlerts.length > 0 ? 1 : 0} to {filteredAlerts.length} of{" "}
                {alerts.length} alerts
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
        <aside className="w-full space-y-5 min-w-0">
          {/* Alerts Summary Card */}
          <section className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h2 className="font-bold text-sm text-slate-900 mb-4">Alerts Summary</h2>

            <div className="space-y-3.5 text-xs font-medium">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 grid place-items-center border border-emerald-100">
                    <Bell className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-slate-700">Total Alerts</span>
                </div>
                <span className="font-bold text-slate-900 text-sm">{totalAlerts}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 grid place-items-center border border-emerald-100">
                    <Send className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-slate-700">Active Alerts</span>
                </div>
                <span className="font-bold text-slate-900 text-sm">{activeAlertsCount}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-amber-50 text-amber-600 grid place-items-center border border-amber-100">
                    <PauseCircle className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-slate-700">Paused Alerts</span>
                </div>
                <span className="font-bold text-slate-900 text-sm">{pausedAlertsCount}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-violet-50 text-violet-600 grid place-items-center border border-violet-100">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-slate-700">Email Alerts</span>
                </div>
                <span className="font-bold text-slate-900 text-sm">{emailAlertsCount}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 grid place-items-center border border-blue-100">
                    <BellRing className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-slate-700">Push Alerts</span>
                </div>
                <span className="font-bold text-slate-900 text-sm">{pushAlertsCount}</span>
              </div>
            </div>
          </section>

          {/* Quick Tips Card */}
          <section className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm mb-3">
              <Lightbulb className="w-4 h-4 text-blue-700 shrink-0" />
              <span>Quick Tips</span>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Create specific alerts with relevant keywords and locations.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Use filters to refine your job alerts.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>You will receive email/push notifications when new jobs match your criteria.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>You can pause or edit alerts anytime.</span>
              </li>
            </ul>
          </section>

          {/* Get Instant Job Updates Card */}
          <section className="bg-gradient-to-br from-blue-50 via-indigo-50/50 to-white border border-blue-100 rounded-xl p-5 shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-blue-700 text-white grid place-items-center mb-3 shadow-md shadow-blue-200">
              <Mail className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">Get instant job updates</h3>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              Enable push notifications to never miss an opportunity.
            </p>
            <button className="text-blue-700 hover:text-blue-800 text-xs font-bold mt-4 flex items-center gap-1.5 transition-colors">
              Enable Now <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </section>
        </aside>
      </div>

      {/* Modal: Create New Alert */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-6 relative animate-in fade-in zoom-in duration-150">
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 grid place-items-center">
                <BellRing className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900">Create New Job Alert</h3>
                <p className="text-xs text-slate-500">Set alert preferences for new job matches</p>
              </div>
            </div>

            <form onSubmit={handleCreateAlert} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Alert Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior Accountant in Mumbai"
                  value={newAlertName}
                  onChange={(e) => setNewAlertName(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Keywords
                </label>
                <input
                  type="text"
                  placeholder="e.g. Tally, GST, Income Tax"
                  value={newKeywords}
                  onChange={(e) => setNewKeywords(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Frequency
                  </label>
                  <select
                    value={newFrequency}
                    onChange={(e) => setNewFrequency(e.target.value as any)}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-800 outline-none focus:border-blue-500"
                  >
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Notification Type
                  </label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-800 outline-none focus:border-blue-500"
                  >
                    <option value="Email">Email</option>
                    <option value="Push">Push</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 border border-slate-200 text-slate-700 rounded-lg py-2 text-xs font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-700 hover:bg-blue-800 text-white rounded-lg py-2 text-xs font-semibold shadow-sm"
                >
                  Save Alert
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobAlerts;
