import { Bookmark, BriefcaseBusiness, ChevronDown, Grid2X2, List, MapPin, Search, Sparkles } from "lucide-react";

const jobs = [
  ["CA", "Accountant", "Sharma & Co. Chartered Accountants", "Mumbai, Maharashtra", "2-4 Yrs", "₹3 - 5 LPA", "2h ago", "bg-blue-700 text-white", ["Tally", "GST", "Excel", "Bank Reconciliation"]],
  ["FinTax", "Junior Accountant", "Fintax Solutions Pvt. Ltd.", "Pune, Maharashtra", "1-3 Yrs", "₹2.4 - 3.6 LPA", "5h ago", "bg-emerald-50 text-emerald-700", ["Tally", "Excel", "GST", "Accounts Payable"]],
  ["SK", "Accounts Executive", "SK Enterprises", "Nagpur, Maharashtra", "2-5 Yrs", "₹3 - 4.5 LPA", "1d ago", "bg-amber-500 text-white", ["Tally", "MIS Reporting", "Excel", "Taxation"]],
  ["AG", "Tax Executive", "AG Financial Services", "Nashik, Maharashtra", "1-2 Yrs", "₹2 - 3 LPA", "1d ago", "bg-violet-50 text-violet-700", ["Income Tax", "TDS", "Excel", "E-Filing"]],
  ["RB", "Accountant (Intern)", "RB Associates", "Aurangabad, Maharashtra", "0-1 Yrs", "₹10,000 - 15,000 / month", "2d ago", "bg-teal-500 text-white", ["Tally", "GST", "Bookkeeping"]],
] as const;

const FindJobs = () => <div className="find-jobs-page max-w-[1220px] mx-auto">
  <div className="grid grid-cols-1 xl:grid-cols-[1fr_295px] gap-7">
    <div><h1 className="text-2xl font-bold">Find Jobs</h1>
        <p className="text-sm text-slate-500 mt-1">Explore the latest accountant jobs and grow your career.</p>
      <section className="find-jobs-card bg-white border border-slate-200 rounded-xl p-4 mt-5">
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr_130px_80px] gap-3">
          <Field icon={<Search />} text="Job title, keywords or company" />
          <Field icon={<MapPin />} text="City, State or Work From Home" />
          <button className="border border-slate-200 rounded-lg px-3 py-3 text-left text-sm flex justify-between items-center">Experience <ChevronDown className="w-4 h-4" /></button>
          <button className="bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-sm font-semibold">Search Jobs</button>
        </div>
          <div className="flex flex-wrap gap-2 mt-4 text-xs items-center">
            <b className="mr-1">Popular Searches:</b>{["Accountant", "Tally", "Tax Executive", "Audit", "CA Articleship", "Finance"].map(x => 
             <button key={x} className="border border-slate-200 rounded-full px-3 py-1.5 text-blue-700 hover:bg-blue-50">{x}</button>)}</div>
      </section>
           <div className="flex flex-wrap justify-between gap-3 items-center mt-5 mb-1">
             <p className="text-sm text-slate-600">Showing 1 – 10 of 246 jobs</p>
              <div className="flex gap-3 items-center"><span className="text-sm">Sort by:</span>
               <button className="border border-slate-200 rounded-lg px-4 py-2 text-sm flex items-center gap-8">Most Relevant 
                 <ChevronDown className="w-4 h-4" /></button>
              <div className="bg-white border border-slate-200 rounded-lg p-1 flex">
                <button className="bg-blue-50 text-blue-700 p-1.5 rounded"><List className="w-4 h-4" /></button>
                <button className="text-slate-500 p-1.5"><Grid2X2 className="w-4 h-4" /></button></div></div></div>
                
      <section className="bg-white border border-slate-200 rounded-xl overflow-hidden mt-1">
          {jobs.map(([initials,title,company,location,experience,salary,time,color,skills]) => 
          <article className="find-job-card flex gap-4 p-5 border-b last:border-0 border-slate-100" key={title}>
            <div className={`w-14 h-14 rounded-lg grid place-items-center text-xl font-bold shrink-0 ${color}`}>{initials}</div>
            <div className="flex-1 min-w-0">
               <div className="flex items-center gap-3">
                 <h2 className="font-bold">{title}</h2>{title === "Accountant" && <span className="bg-emerald-100 text-emerald-700 text-[10px] font-semibold px-2 py-1 rounded-full">New</span>}</div>
                  <p className="text-sm text-slate-600 mt-1">{company}</p>
                <div className="flex flex-wrap gap-x-7 gap-y-1 text-xs text-slate-500 mt-3"><span><MapPin className="w-3 h-3 inline mr-1" />
                   {location}</span><span><BriefcaseBusiness className="w-3 h-3 inline mr-1" />{experience}</span>
                   <span>{salary}</span></div><div className="flex flex-wrap gap-2 mt-3">{skills.map(skill => 
                     <span key={skill} className="border border-slate-200 rounded-md px-2.5 py-1 text-[11px] text-slate-600">{skill}</span>)}</div></div>
                <div className="flex flex-col justify-between items-end"><span className="text-xs text-slate-400 whitespace-nowrap">{time}</span><Bookmark className="w-4 h-4 text-slate-600" />
                 <button className="border border-blue-500 text-blue-700 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap hover:bg-blue-50">View Details</button></div></article>)}
      </section></div>
       <aside className="space-y-5">
          <section className="find-jobs-card bg-white border border-slate-200 rounded-xl p-5">
             <div className="flex justify-between"><h2 className="font-bold text-sm">Filters</h2><button className="text-xs text-blue-700">Clear All</button></div><FilterTitle text="Job Type" />{["All Job Types", "Full Time", "Part Time", "Work From Home", "Internship"].map((x,i) => <label className="block text-sm text-slate-600 mt-3" key={x}><input defaultChecked={i === 0} type="checkbox" className="accent-blue-700 mr-2" />{x}</label>)}{["Experience", "Salary Range", "Location", "Skills"].map(x => <div className="mt-6" key={x}><FilterTitle text={x} /><button className="border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-500 w-full flex justify-between">Select {x}<ChevronDown className="w-4 h-4" /></button></div>)}<button className="w-full border border-blue-700 text-blue-700 rounded-lg py-2.5 text-sm font-semibold mt-5 hover:bg-blue-50">Apply Filters</button></section><section className="find-jobs-card bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 rounded-xl p-5"><h2 className="font-bold text-sm text-emerald-800"><Sparkles className="w-4 h-4 inline mr-2" />Recommended for You</h2><div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 mt-4"><div className="flex gap-3"><div className="bg-blue-700 text-white w-9 h-9 rounded grid place-items-center font-bold">CA</div><div><p className="font-semibold text-sm">Senior Accountant</p><p className="text-xs text-slate-500 mt-1">Khandelwal &amp; Co.</p><p className="text-xs text-slate-500 mt-2">⌖ Mumbai, MH　₹4 - 6 LPA</p></div></div><button className="border border-blue-500 text-blue-700 rounded-lg py-2 text-xs font-semibold w-full mt-4">View Details</button></div><button className="w-full text-blue-700 text-xs font-semibold mt-5">View More Recommendations　→</button></section></aside></div></div>;
const Field = ({ icon, text }: { icon: React.ReactNode; text: string }) => <div className="border border-slate-200 rounded-lg px-3 py-3 text-sm text-slate-400 flex gap-2 items-center">{icon}{text}</div>;
const FilterTitle = ({ text }: { text: string }) => <p className="text-xs font-semibold mt-5 mb-3">{text}</p>;
export default FindJobs;
