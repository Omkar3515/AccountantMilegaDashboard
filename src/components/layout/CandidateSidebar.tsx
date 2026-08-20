import { Bell, BellRing, Bookmark, BriefcaseBusiness, CalendarCheck, Crown, FileText, FolderArchive, Headphones, Heart, HelpCircle, LayoutDashboard, LogOut, Mail, MessageSquare, Search, Settings, ShieldCheck, UserRound, Video } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CandidateSidebarProps { currentPage: string; onPageChange: (page: string) => void; }

const CandidateSidebar = ({ currentPage, onPageChange }: CandidateSidebarProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/login");
  };

  const items = [
    ["dashboard", "Dashboard", LayoutDashboard], ["find-jobs", "Find Jobs", Search], ["applications", "My Applications", BriefcaseBusiness], ["alerts", "Job Alerts", Bell],
    ["resume", "My Resume", FileText], ["profile", "Profile", UserRound], ["saved", "Saved Jobs", Heart], ["messages", "Messages", Mail, "2"], ["calls", "Interview Calls", Video], ["settings", "Settings", Settings], ["support", "Help & Support", HelpCircle],
  ] as const;

  return <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen fixed left-0 top-0 overflow-y-auto hidden md:flex z-20">
    <button onClick={() => onPageChange("dashboard")} className="p-7 text-left text-[20px] font-bold tracking-[-1px]">
      <span className="text-blue-700">Accountant</span><span className="text-emerald-700">Milega</span>
      <span className="text-sm text-slate-900 tracking-[-.5px]">.com</span></button>
    <nav className="flex-1 px-3 space-y-1">
      {items.map(([id, label, Icon, badge]) => {
        const active = currentPage === id;
        return <button key={id} onClick={() => onPageChange(id)}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors ${active ? "bg-blue-700 text-white shadow-sm shadow-blue-200" : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"}`}>
          <span className="flex items-center gap-4"><Icon className={`w-5 h-5 ${active ? "text-white" : "text-slate-500"}`} />
            {label}</span>{badge && <span className="bg-blue-700 text-white text-[10px] min-w-5 h-5 px-1 grid place-items-center rounded-full">
              {badge}</span>}</button>;
      })}</nav>
    {currentPage === "saved" && (
      <div className="mx-3 my-3 p-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100/60 border border-blue-100 rounded-xl text-center shadow-sm relative">
        <div className="w-10 h-10 mx-auto rounded-xl bg-blue-700 text-white grid place-items-center mb-2.5 shadow-md shadow-blue-200">
          <FolderArchive className="w-5 h-5" />
        </div>
        <h4 className="text-xs font-bold text-slate-900">Your saved opportunities</h4>
        <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
          Save jobs you&apos;re interested in and apply anytime.
        </p>
        <button
          onClick={() => onPageChange("find-jobs")}
          className="mt-3 w-full bg-blue-700 hover:bg-blue-800 text-white rounded-lg py-2 text-xs font-semibold transition-colors shadow-sm"
        >
          Browse More Jobs
        </button>
      </div>
    )}
    {currentPage === "alerts" && (
      <div className="mx-3 my-3 p-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100/60 border border-blue-100 rounded-xl text-center shadow-sm relative">
        <div className="w-10 h-10 mx-auto rounded-xl bg-blue-700 text-white grid place-items-center mb-2.5 shadow-md shadow-blue-200">
          <BellRing className="w-5 h-5" />
        </div>
        <h4 className="text-xs font-bold text-slate-900">Never miss an opportunity</h4>
        <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
          Create smart job alerts and get notified about the right jobs.
        </p>
        <button
          onClick={() => onPageChange("alerts")}
          className="mt-3 w-full bg-blue-700 hover:bg-blue-800 text-white rounded-lg py-2 text-xs font-semibold transition-colors shadow-sm"
        >
          Create New Alert
        </button>
      </div>
    )}
    {currentPage === "calls" && (
      <div className="mx-3 my-3 p-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100/60 border border-blue-100 rounded-xl text-center shadow-sm relative">
        <div className="w-10 h-10 mx-auto rounded-xl bg-blue-700 text-white grid place-items-center mb-2.5 shadow-md shadow-blue-200">
          <CalendarCheck className="w-5 h-5" />
        </div>
        <h4 className="text-xs font-bold text-slate-900">Stay interview ready!</h4>
        <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
          View your upcoming interviews and get notified on time.
        </p>
        <button
          onClick={() => onPageChange("find-jobs")}
          className="mt-3 w-full bg-blue-700 hover:bg-blue-800 text-white rounded-lg py-2 text-xs font-semibold transition-colors shadow-sm"
        >
          Browse Jobs
        </button>
      </div>
    )}
    {currentPage === "applications" && (
      <div className="mx-3 my-3 p-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100/60 border border-blue-100 rounded-xl text-center shadow-sm relative">
        <div className="w-10 h-10 mx-auto rounded-xl bg-blue-700 text-white grid place-items-center mb-2.5 shadow-md shadow-blue-200">
          <Crown className="w-5 h-5" />
        </div>
        <h4 className="text-xs font-bold text-slate-900">Get better opportunities</h4>
        <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
          Complete your profile and increase your chances of getting hired.
        </p>
        <button
          onClick={() => onPageChange("profile")}
          className="mt-3 w-full bg-blue-700 hover:bg-blue-800 text-white rounded-lg py-2 text-xs font-semibold transition-colors shadow-sm"
        >
          Complete Profile
        </button>
        <div className="mt-3 pt-3 border-t border-blue-100/80 text-[10px] text-slate-500 font-semibold flex items-center justify-between">
          <span>80% Completed</span>
          <div className="w-16 h-1.5 bg-blue-100 rounded-full overflow-hidden">
            <div className="w-[80%] h-full bg-blue-700 rounded-full" />
          </div>
        </div>
      </div>
    )}
    {currentPage === "messages" && (
      <div className="mx-3 my-3 p-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100/60 border border-blue-100 rounded-xl text-center shadow-sm relative">
        <div className="w-10 h-10 mx-auto rounded-xl bg-blue-700 text-white grid place-items-center mb-2.5 shadow-md shadow-blue-200">
          <MessageSquare className="w-5 h-5" />
        </div>
        <h4 className="text-xs font-bold text-slate-900">Stay connected</h4>
        <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
          Communicate with employers and get updates on your applications.
        </p>
        <button
          onClick={() => onPageChange("find-jobs")}
          className="mt-3 w-full bg-blue-700 hover:bg-blue-800 text-white rounded-lg py-2 text-xs font-semibold transition-colors shadow-sm"
        >
          Browse Jobs
        </button>
      </div>
    )}
    {currentPage === "settings" && (
      <div className="mx-3 my-3 p-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100/60 border border-blue-100 rounded-xl text-center shadow-sm relative">
        <div className="w-10 h-10 mx-auto rounded-xl bg-blue-700 text-white grid place-items-center mb-2.5 shadow-md shadow-blue-200">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <h4 className="text-xs font-bold text-slate-900">Secure Your Account</h4>
        <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
          Enable 2-Step Verification to keep your account safe.
        </p>
        <button
          onClick={() => onPageChange("settings")}
          className="mt-3 w-full bg-blue-700 hover:bg-blue-800 text-white rounded-lg py-2 text-xs font-semibold transition-colors shadow-sm"
        >
          Enable Now
        </button>
      </div>
    )}
    {currentPage === "support" && (
      <div className="mx-3 my-3 p-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100/60 border border-blue-100 rounded-xl text-center shadow-sm relative">
        <div className="w-10 h-10 mx-auto rounded-xl bg-blue-700 text-white grid place-items-center mb-2.5 shadow-md shadow-blue-200">
          <Headphones className="w-5 h-5" />
        </div>
        <h4 className="text-xs font-bold text-slate-900">Need immediate help?</h4>
        <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
          Our support team is here to help you 24/7.
        </p>
        <button
          onClick={() => onPageChange("support")}
          className="mt-3 w-full bg-blue-700 hover:bg-blue-800 text-white rounded-lg py-2 text-xs font-semibold transition-colors shadow-sm"
        >
          Contact Support
        </button>
      </div>
    )}
    <div className="p-4 border-t border-slate-100">
      <button
        onClick={handleLogout}
        className="w-full flex items-center gap-4 px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg"
      >
        <LogOut className="w-5 h-5" />
        Logout
      </button>
    </div>
  </aside>;
};

export default CandidateSidebar;