import { useEffect, useState } from "react";
import { ArrowRight, Bell, Bookmark, BriefcaseBusiness, CalendarDays, CheckCircle2, ChevronDown, ChevronRight, Crown, FileText, LayoutDashboard, MapPin, Menu, Search, Send, UserRound, View } from "lucide-react";
import CandidateSidebar from "../../components/layout/CandidateSidebar";
import Profile from "./Profile";
import FindJobs from "./FindJobs";
import Resume from "./Resume";

const stats = [
    ["12", "Applications", "Total Applied", BriefcaseBusiness, "text-blue-700", "bg-blue-100"], ["3", "Shortlisted", "Moving Forward", CheckCircle2, "text-emerald-600", "bg-emerald-100"], ["2", "Interviews", "Upcoming", CalendarDays, "text-violet-600", "bg-violet-100"], ["8", "Saved Jobs", "Bookmarked", Bookmark, "text-amber-500", "bg-amber-100"],
] as const;
const jobs = [["CA", "Accountant", "Sharma & Co. Chartered Accountants", "Mumbai, Maharashtra", "2-4 Yrs", "₹3 - 5 LPA", "2h ago", "bg-blue-700"], ["FinTax", "Junior Accountant", "Fintax Solutions Pvt. Ltd.", "Pune, Maharashtra", "1-3 Yrs", "₹2.4 - 3.6 LPA", "5h ago", "bg-emerald-50 text-emerald-700"], ["SK", "Accounts Executive", "SK Enterprises", "Nagpur, Maharashtra", "2-5 Yrs", "₹3 - 4.5 LPA", "1d ago", "bg-amber-500"]] as const;

const CandidateDashboard = () => {
    const [page, setPage] = useState("dashboard");
    const isDashboard = page === "dashboard";
    return <div className="flex min-h-screen bg-[#f8fafc] font-sans text-slate-900"><CandidateSidebar currentPage={page} onPageChange={setPage} /><main className="flex-1 md:ml-64 min-w-0"><header className="h-16 bg-white border-b border-slate-200 px-5 md:px-7 flex justify-between items-center"><Menu className="w-6 h-6 text-slate-600" /><div className="flex items-center gap-5"><button className="relative"><Bell className="w-5 h-5 text-slate-600" /><span className="absolute -top-2 -right-2 w-4 h-4 text-[9px] grid place-items-center rounded-full bg-blue-700 text-white">3</span></button><div className="h-7 w-px bg-slate-200" /><div className="flex items-center gap-2"><div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-blue-200 text-white grid place-items-center font-bold">RS</div><div className="hidden sm:block"><p className="text-sm font-bold">Rahul Sharma</p><p className="text-xs text-slate-500">Candidate</p></div><ChevronDown className="w-4 h-4 text-slate-500" /></div></div></header>
        <div className="p-5 md:p-7">{isDashboard ? <DashboardContent /> : page === "profile" ? <Profile /> : page === "find-jobs" ? <FindJobs /> : page === "resume" ? <Resume /> : <div className="min-h-[70vh] grid place-items-center text-slate-500"><div className="text-center"><LayoutDashboard className="w-10 h-10 mx-auto mb-3 text-blue-600" /><p className="font-semibold text-slate-700">{page.replace("-", " ")}</p><p className="text-sm mt-1">This page is ready for its content.</p></div></div>}</div>
    </main></div>;
};

const AnimatedNumber = ({ value }: { value: string }) => {
    const target = Number(value);
    const [count, setCount] = useState(0);
    useEffect(() => {
        let frame = 0;
        const startedAt = performance.now();
        const tick = (now: number) => {
            const progress = Math.min((now - startedAt) / 650, 1);
            setCount(Math.round(target * (1 - (1 - progress) ** 3)));
            if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [target]);
    return <>{count}</>;
};

const DashboardContent = () => <div className="candidate-dashboard max-w-[1220px] mx-auto space-y-6">
    <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div><h1 className="text-2xl font-bold tracking-tight">Welcome back, Rahul! 👋</h1>
             <p className="text-sm text-slate-500 mt-1">Explore jobs and build your career with AccountantMilega</p></div>
       <div className="flex items-center gap-3">
         <div className="bg-white border border-slate-200 rounded-xl px-5 py-3 w-full sm:w-[365px]">
            <div className="flex justify-between text-sm font-semibold"><span>Complete Your Profile</span><span className="text-slate-500">70%</span></div>
         <div className="mt-2 h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="w-[70%] bg-blue-700 h-full rounded-full" /></div></div>
            <button className="bg-white border border-slate-200 rounded-xl px-5 py-4 text-sm font-semibold text-blue-700 whitespace-nowrap">View Profile <ArrowRight className="w-4 h-4 inline ml-2" /></button></div>
    </section>

    <section className="candidate-stats grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
         {stats.map(([value, title, subtitle, Icon, color, bg]) =>
              <div key={title} className="candidate-stat-card bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-4">
                 <div className={`w-16 h-16 rounded-[22px] grid place-items-center ${bg}`}><Icon className={`w-7 h-7 ${color}`} /></div>
                 <div><p className="text-2xl font-bold"><AnimatedNumber value={value} /></p><p className="text-sm font-semibold">{title}</p><p className="text-xs text-slate-500 mt-1">{subtitle}</p></div></div>)}
    </section>

    <section className="grid grid-cols-1 xl:grid-cols-[1.35fr_.95fr] gap-5">
        <div className="bg-white border border-slate-200 rounded-xl p-5">
             <PanelTitle title="Recommended Jobs for You" action="View All Jobs" />
         {jobs.map(([initials, title, company, location, experience, salary, time, color], index) => 
         <div key={title} className={`py-4 flex gap-4 ${index ? "border-t border-slate-100" : ""}`}>
            <div className={`w-12 h-12 rounded-lg grid place-items-center font-bold text-lg shrink-0 ${color} ${color.includes("text") ? "" : "text-white"}`}>{initials}</div>
            <div className="min-w-0 flex-1"><p className="font-bold text-sm">{title}</p><p className="text-sm text-slate-500 mt-1">{company}</p>
                 <div className="flex flex-wrap gap-x-7 gap-y-1 mt-2 text-xs text-slate-500"><span>
                 <MapPin className="w-3 h-3 inline mr-1" />{location}</span><span>{experience}</span><span>{salary}</span></div></div>
            <div className="text-right text-xs text-slate-400 flex flex-col justify-between">
                 <span>{time}</span><Bookmark className="w-4 h-4 self-end text-slate-600" /></div></div>)}
                 <a className="flex justify-center items-center gap-2 text-sm text-blue-700 font-semibold mt-2">View More Jobs <ArrowRight className="w-4 h-4" /></a></div>
                 <div className="bg-white border border-slate-200 rounded-xl p-5"><PanelTitle title="Application Status" action="View All" />
                   {([[Send, "Applied", "Jobs you have applied for", "12", "text-blue-700", "bg-blue-100"], 
                      [CheckCircle2, "Shortlisted", "Jobs where you are shortlisted", "3", "text-emerald-600", "bg-emerald-100"], 
                      [CalendarDays, "Interview", "Jobs with interview scheduled", "2", "text-violet-600", "bg-violet-100"], 
                      ["×", "Rejected", "Jobs not selected", "5", "text-red-500", "bg-red-100"]] as any[]).map(([Icon, title, sub, count, color, bg]) =>
                        <div key={String(title)} className="flex items-center gap-4 py-3">
                        <div className={`w-11 h-11 rounded-full grid place-items-center ${bg}`}>{typeof Icon === "string" ? <span className={`text-xl ${color}`}>{Icon}</span> : <Icon className={`w-5 h-5 ${color}`} />}</div>
                        <div className="flex-1"><p className="font-semibold text-sm">{title}</p><p className="text-xs text-slate-500 mt-1">{sub}</p></div>
                        <b className="text-sm">{count}</b><ChevronRight className="w-4 h-4 text-slate-400" /></div>)}</div>
    </section>

    <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="bg-white border border-slate-200 rounded-xl p-5">
            <div className="flex justify-between"><h2 className="font-bold">Your Resume</h2>
              <span className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-md font-semibold">✓ Active</span></div>
            <div className="flex gap-4 mt-6">
                <div className="w-18 h-20 text-blue-700 bg-blue-50 rounded-xl grid place-items-center">
                <FileText className="w-9 h-9" /></div>
                <p className="text-xs leading-6 text-slate-500">Your resume is active and visible to employers.<br />Last updated on 20 May 2025</p></div>
            <div className="grid grid-cols-2 gap-3 mt-5"><button className="border border-blue-600 text-blue-700 rounded-lg py-2 text-xs font-semibold">
                <View className="w-4 h-4 inline mr-1" />View Resume</button>
               <button className="border border-slate-200 rounded-lg py-2 text-xs font-semibold">✎ Update Resume</button></div>
        </div>
           <div className="bg-white border border-slate-200 rounded-xl p-5">
             <h2 className="font-bold">Recent Activity</h2>{([[Send, "You applied for Accountant at Sharma & Co.", "2 hours ago", "text-blue-600", "bg-blue-100"],
                            [CheckCircle2, "You were shortlisted by Fintax Solutions Pvt. Ltd.", "1 day ago", "text-emerald-600", "bg-emerald-100"],
                            [CalendarDays, "Interview scheduled with SK Enterprises", "2 days ago", "text-violet-600", "bg-violet-100"]] as any[]).map(([Icon, text, time, color, bg]) => <div key={String(text)} className="flex gap-3 mt-5">
                                <div className={`w-7 h-7 grid place-items-center rounded-full shrink-0 ${bg}`}><Icon className={`w-3.5 h-3.5 ${color}`} /></div><div className="text-xs"><p>{text}</p>
                                  <p className="text-slate-400 mt-1">{time}</p></div></div>)}<a className="flex justify-end items-center gap-1 text-xs text-blue-700 font-semibold mt-6">View All Activity <ArrowRight className="w-3 h-3" /></a></div>
                                  <div className="bg-white border border-slate-200 rounded-xl p-5"><h2 className="font-bold">Quick Actions</h2><div className="grid grid-cols-2 gap-3 mt-5">{([[Search, "Find Jobs", "Search & apply jobs", "text-blue-700", "bg-blue-100"], 
                                       [FileText, "Upload Resume", "Update your resume", "text-emerald-600", "bg-emerald-100"], [Bell, "Job Alerts", "Get notified for new jobs", "text-violet-600", "bg-violet-100"],
                                       [UserRound, "Profile Settings", "Manage your profile", "text-blue-700", "bg-blue-100"]] as any[]).map(([Icon, title, sub, color, bg]) => <button key={String(title)} 
                                         className="border border-slate-200 hover:border-blue-300 rounded-xl p-3 flex gap-3 text-left"><div className={`w-9 h-9 rounded-full grid place-items-center shrink-0 ${bg}`}>
                                             <Icon className={`w-5 h-5 ${color}`} /></div><div><p className="text-xs font-bold">{title}</p><p className="text-[10px] text-slate-500 mt-1">{sub}</p></div></button>)}</div></div>
    </section>

    <section className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4">
        <div className="w-11 h-11 rounded-full bg-blue-700 text-white grid place-items-center">
            <Crown className="w-5 h-5" /></div><div className="flex-1 text-center sm:text-left">
                <p className="font-bold text-sm text-blue-700">Stand Out From the Crowd!</p>
                <p className="text-xs text-slate-600 mt-1">Complete your profile and increase your chances of getting hired.</p></div>
                <button className="bg-blue-700 text-white px-7 py-3 rounded-lg text-sm font-semibold">Complete Profile Now <ArrowRight className="w-4 h-4 inline ml-2" /></button>
    </section>
</div>;
const PanelTitle = ({ title, action }: { title: string; action: string }) => <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold">{title}</h2><a className="text-sm font-semibold text-blue-700 flex gap-2 items-center">{action}<ArrowRight className="w-4 h-4" /></a></div>;
export default CandidateDashboard;
