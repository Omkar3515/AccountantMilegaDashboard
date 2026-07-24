import { Bell, BriefcaseBusiness, FileText, Heart, HelpCircle, LayoutDashboard, LogOut, Mail, Search, Settings, UserRound, Video } from "lucide-react";

interface CandidateSidebarProps { currentPage: string; onPageChange: (page: string) => void; }

const CandidateSidebar = ({ currentPage, onPageChange }: CandidateSidebarProps) => {
  const items = [
    ["dashboard", "Dashboard", LayoutDashboard], ["find-jobs", "Find Jobs", Search], ["applications", "My Applications", BriefcaseBusiness], ["alerts", "Job Alerts", Bell],
    ["resume", "My Resume", FileText], ["profile", "Profile", UserRound], ["saved", "Saved Jobs", Heart], ["messages", "Messages", Mail, "2"], ["calls", "Interview Calls", Video], ["settings", "Settings", Settings], ["support", "Help & Support", HelpCircle],
  ] as const;
  return <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen fixed left-0 top-0 overflow-y-auto hidden md:flex z-20">
    <button onClick={() => onPageChange("dashboard")} className="p-7 text-left text-[20px] font-bold tracking-[-1px]">
        <span className="text-blue-700">Accountant</span><span className="text-emerald-700">Milega</span>
        <span className="text-sm text-slate-900 tracking-[-.5px]">.com</span></button>
    <nav className="flex-1 px-3 space-y-1">
          {items.map(([id, label, Icon, badge]) => { const active = currentPage === id; 
            return <button key={id} onClick={() => onPageChange(id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors ${active ? "bg-blue-700 text-white shadow-sm shadow-blue-200" : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"}`}>
                    <span className="flex items-center gap-4"><Icon className={`w-5 h-5 ${active ? "text-white" : "text-slate-500"}`} />
                      {label}</span>{badge && <span className="bg-blue-700 text-white text-[10px] min-w-5 h-5 px-1 grid place-items-center rounded-full">
                        {badge}</span>}</button>; })}</nav>
    <div className="p-4 border-t border-slate-100">
        <button className="w-full flex items-center gap-4 px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg"><LogOut className="w-5 h-5" />
        Logout</button></div>
  </aside>;
};
export default CandidateSidebar;
