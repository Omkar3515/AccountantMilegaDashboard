import { useEffect, useState } from "react";
import { ArrowRight, Award, BriefcaseBusiness, CalendarDays, Camera, CheckCircle2, CircleUserRound, Clock3, Mail, MapPin, Target } from "lucide-react";
import { FileText, Cake, GraduationCap, User, Heart, Languages, ShieldCheck, Edit3 } from "lucide-react";

const InfoRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-center gap-3">
    <span className="flex items-center justify-center w-7 h-7 rounded-md bg-blue-50 text-blue-700 shrink-0">
      {icon}
    </span>
    <div className="flex items-center justify-between flex-1 min-w-0">
      <span className="font-medium text-slate-700">{label}</span>
      <span className="text-slate-500 text-right">{value}</span>
    </div>
  </div>
);
const ProfileCounter = () => {
  const [value, setValue] = useState(0);
      useEffect(() => { let frame = 0; const start = performance.now(); 
        const tick = (now: number) => { const p = Math.min((now - start) / 800, 1); setValue(Math.round(90 * (1 - (1 - p) ** 3))); 
           if (p < 1) frame = requestAnimationFrame(tick); }; 
            frame = requestAnimationFrame(tick); return () => cancelAnimationFrame(frame); }, []);
  return <div className="profile-progress"><span>{value}%</span></div>;
};

const Profile = () => <div className="profile-page max-w-[1220px] mx-auto space-y-5">
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div><h1 className="text-2xl font-bold">My Profile</h1>
         <p className="text-sm text-slate-500 mt-1">View and manage your personal and professional information.</p></div>
         <button className="border border-blue-600 text-blue-700 rounded-lg px-6 py-2.5 font-semibold text-sm">
          <Edit3 className="w-4 h-4 inline mr-2" />Edit Profile</button>
  </div>

  <div className="grid grid-cols-1 xl:grid-cols-[1.85fr_.82fr] gap-5">
    <div className="space-y-5">  
      <section className="profile-card bg-white border border-slate-200 rounded-xl p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="relative"><img src="https://i.pravatar.cc/160?img=12" className="w-28 h-28 rounded-full object-cover ring-4 ring-blue-50" alt="Rahul Sharma" />
         <button className="absolute bottom-0 right-0 bg-white border border-blue-100 text-blue-700 rounded-full p-2 shadow">
           <Camera className="w-4 h-4" /></button></div>
        <div className="flex-1 text-center md:text-left">
          <div className="flex gap-3 justify-center md:justify-start items-center">
            <h2 className="text-xl font-bold">Rahul Sharma</h2><span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-2 py-1 rounded-full">
               <CheckCircle2 className="w-3 h-3 inline mr-1" />Verified</span></div>
               <p className="text-sm text-slate-600 mt-2">Experienced Accountant</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-x-5 gap-y-2 text-xs text-slate-500 mt-4">
            <span><MapPin className="w-3.5 h-3.5 inline mr-1" />Mumbai, Maharashtra</span><span>☎ 98765 43210</span>
            <span><Mail className="w-3.5 h-3.5 inline mr-1" />rahul.sharma@email.com</span></div>
            <p className="text-xs font-medium mt-5">Profile Visibility <span className="ml-2 text-emerald-700 bg-emerald-100 px-2 py-1 rounded-full">◉ Public</span></p></div>
            <div className="text-center"><ProfileCounter />
             <p className="text-xs font-semibold mt-2">Profile Complete</p><button className="text-xs text-blue-700 font-semibold mt-3">Complete Profile <ArrowRight className="w-3 h-3 inline" /></button></div>
      </section>
  
  <div className="flex overflow-x-auto border-b border-slate-200 gap-7 px-3"><button className="profile-tab-active whitespace-nowrap py-3 text-sm font-semibold">About Me</button>
       {["Experience","Education","Skills","Certifications","Achievements","Preferences"].map(x => 
           <button key={x} className="whitespace-nowrap py-3 text-sm text-slate-500">{x}</button>)}
  </div>
     
     <section className="profile-card bg-white border border-slate-200 rounded-xl p-5">
  <div className="h-[3px] w-10 bg-blue-600 rounded-full mb-3" />

  <h2 className="flex items-center gap-2 font-bold text-sm">
    <span className="flex items-center justify-center w-6 h-6 rounded-md bg-blue-50 text-blue-700">
      <FileText className="w-3.5 h-3.5" />
    </span>
    Professional Summary
  </h2>

  <p className="text-sm text-slate-600 leading-6 mt-4">
    I am a detail-oriented and motivated accounting professional with over 4
    years of experience in bookkeeping, taxation, financial reporting, and
    compliance. Skilled in Tally, GST, Excel and bank reconciliations. Seeking
    an opportunity to contribute my expertise in a growth-oriented
    organization.
  </p>

  <div className="border-t border-slate-100 mt-4 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-xs">
    <InfoRow icon={<Cake className="w-3.5 h-3.5" />} label="Date of Birth" value="15 March 1995" />
    <InfoRow icon={<GraduationCap className="w-3.5 h-3.5" />} label="Qualification" value="B.Com, CA Intermediate" />
    <InfoRow icon={<User className="w-3.5 h-3.5" />} label="Gender" value="Male" />
    <InfoRow icon={<Heart className="w-3.5 h-3.5" />} label="Marital Status" value="Single" />
    <InfoRow icon={<Languages className="w-3.5 h-3.5" />} label="Languages Known" value="English, Hindi, Marathi" />
    <InfoRow icon={<ShieldCheck className="w-3.5 h-3.5" />} label="Work Authorization" value="Indian Citizen" />
  </div>

  <button className="flex items-center gap-2 mx-auto mt-5 text-xs font-semibold text-blue-700">
    <Edit3 className="w-3 h-3" />
    Edit About Me
  </button>
</section>

    <section className="profile-card bg-white border border-slate-200 rounded-xl p-5">
      <div className="flex justify-between">
         <h2 className="font-bold text-sm"><BriefcaseBusiness className="w-4 h-4 inline text-blue-700 mr-3" />Work Experience</h2>
         <button className="text-xs text-blue-700 font-semibold">Edit</button></div>
      <div className="relative border-l border-dashed border-blue-200 ml-2 mt-5 pl-7 space-y-5">
         {[["Accountant","Sharma & Co. Chartered Accountants","Jan 2022 - Present"],["Junior Accountant","FinTax Solutions Pvt. Ltd.","Jun 2020 - Dec 2021"]].map(([role,company,date]) => <div key={role} className="relative">
          <span className="absolute -left-[33px] top-1 w-3 h-3 rounded-full bg-blue-700 ring-4 ring-white" />
          <p className="font-semibold text-sm">{role}</p>
           <p className="text-xs text-slate-600 mt-1">{company}</p><p className="text-xs text-slate-500 mt-2">
            <CalendarDays className="w-3 h-3 inline mr-1" />{date}<MapPin className="w-3 h-3 inline ml-6 mr-1" />Mumbai, Maharashtra</p></div>)}</div>
            <button className="block mx-auto mt-6 text-xs font-semibold text-blue-700">View All Experience <ArrowRight className="w-3 h-3 inline" /></button>
    </section></div>

  <aside className="space-y-5">
    <ProfileSide title="Quick Overview" icon={<CircleUserRound />}>
      <Info icon={<BriefcaseBusiness />} label="Experience" value="4+ Years" />
      <Info icon={<MapPin />} label="Current Location" value="Mumbai, Maharashtra" />
      <Info icon={<Target />} label="Expected Salary" value="₹4 - 5 LPA" />
      <Info icon={<CalendarDays />} label="Notice Period" value="30 Days" />
      <Info icon={<Clock3 />} label="Availability" value="Immediate" />
      <button className="text-xs text-blue-700 font-semibold mt-2">Update Career Preferences <ArrowRight className="w-3 h-3 inline" /></button>
    </ProfileSide>
    <ProfileSide title="Career Preferences" icon={<Target />} action="Edit">
      <Info label="Preferred Job Roles" value="Accountant, Tax Executive" />
      <Info label="Preferred Locations" value="Mumbai, Navi Mumbai, Thane" />
      <Info label="Employment Type" value="Full Time" />
      <Info label="Expected Salary" value="₹4 - 5 LPA" />
      <button className="text-xs text-blue-700 font-semibold mt-2">Edit Preferences <ArrowRight className="w-3 h-3 inline" /></button>
    </ProfileSide>
    <ProfileSide title="Documents" icon={<FileText />} action="Manage">
       {["Resume", "Aadhaar Card", "PAN Card"].map((x, index) => <div key={x} className="flex gap-3 py-3 border-b last:border-0 border-slate-100">
       <div className="w-7 h-7 rounded bg-blue-50 text-blue-700 grid place-items-center">
          <FileText className="w-3.5 h-3.5" /></div>
       <div className="flex-1">
         <p className="text-xs font-semibold">{x}</p>
         <p className="text-[10px] text-slate-500">{index === 0 ? "Rahul_Sharma_Resume.pdf" : `${x}_Rahul_Sharma.pdf`}</p></div>
         <CheckCircle2 className="w-4 h-4 text-emerald-600" /></div>)}
         <button className="text-xs text-blue-700 font-semibold mt-2">View All Documents <ArrowRight className="w-3 h-3 inline" />
         </button>
    </ProfileSide>
  </aside></div>
  <section className="profile-card bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4">
    <div className="w-11 h-11 rounded-full bg-blue-700 text-white grid place-items-center">
      <Award className="w-5 h-5" /></div>
    <div className="flex-1 text-center sm:text-left">
      <p className="font-bold text-sm text-blue-700">Profile Tip</p>
      <p className="text-xs text-slate-600 mt-1">A complete profile increases your chances of getting noticed by employers.</p></div>
      <button className="bg-blue-700 text-white px-7 py-3 rounded-lg text-sm font-semibold">Complete Profile Now <ArrowRight className="w-4 h-4 inline ml-2" /></button>
  </section>
</div>;

const Info = ({ icon, label, value }: { icon?: React.ReactNode; label: string; value: string }) => 
     <div className="flex gap-3 items-start text-xs"><span className="text-slate-500 mt-.5">{icon}</span>
       <span className="text-slate-600 flex-1">{label}</span><span className="text-slate-600 text-right">{value}</span>
     </div>;

const ProfileSide = ({ title, icon, action, children }: { title: string; icon: React.ReactElement; action?: string; children: React.ReactNode }) =>
    <section className="profile-card bg-white border border-slate-200 rounded-xl p-5">
      <div className="flex justify-between items-center mb-5"><h2 className="font-bold text-sm">
        {icon && <span className="inline-block w-5 h-5 align-middle text-blue-700 mr-3">{icon}</span>}
        {title}</h2>{action && <button className="text-xs font-semibold text-blue-700">{action}</button>}
      </div>
      <div className="space-y-4">{children}</div>
    </section>;
export default Profile;
