// @ts-nocheck -- icon/data tuples are rendered dynamically in the presentational resume sections.
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { Award, CheckCircle2, Download, Edit3, Eye, FileText, Lightbulb, MoreVertical, Share2, Sparkles, Star, UploadCloud, UserRound } from "lucide-react";

const StrengthChart = () => {
  const value = 82;
  return <div className="relative w-40 h-40 mx-auto">
    <ResponsiveContainer width="100%" height="100%"><PieChart>
        <Pie data={[{ value }, { value: 100 - value }]} cx="50%" cy="50%" innerRadius={53} outerRadius={67} startAngle={90} endAngle={-270} stroke="none">
            <Cell fill="#098a49" /><Cell fill="#e8edf4" /></Pie></PieChart></ResponsiveContainer>
            <div className="absolute inset-0 grid place-items-center text-center">
                <div><b className="text-2xl">{value}%</b>
                <p className="text-xs text-emerald-700 font-semibold mt-1">Good</p></div>
        </div></div>;
};
const Resume = () => <div className="resume-page max-w-[1220px] mx-auto">
    <div className="flex flex-col md:flex-row justify-between gap-4">
        <div><h1 className="text-2xl font-bold">My Resume</h1><p className="text-sm text-slate-500 mt-1">Manage your resume and increase your chances of getting hired.</p></div>
        <div className="flex gap-3"><button className="border border-blue-500 text-blue-700 rounded-lg px-5 py-3 text-sm font-semibold"><Eye className="w-4 h-4 inline mr-2" />Preview Resume</button>
        <button className="bg-blue-700 text-white rounded-lg px-5 py-3 text-sm font-semibold">
         <UploadCloud className="w-4 h-4 inline mr-2" />Upload New Resume</button></div></div>
         <div className="grid grid-cols-1 xl:grid-cols-[1.8fr_.95fr] gap-5 mt-7">
            <div className="space-y-5">
            <section className="resume-card bg-white border border-slate-200 rounded-xl p-5">
                <div className="flex gap-5 items-start"><div className="flex-1"><h2 className="font-bold">Current Resume <span className="ml-3 text-xs text-emerald-700 bg-emerald-100 rounded-full px-3 py-1">Active</span></h2>
                <div className="flex flex-col sm:flex-row gap-5 mt-5 items-center">
                    <div className="w-19 h-20 rounded-xl bg-blue-50 text-red-500 grid place-items-center">
                        <FileText className="w-9 h-9" /><span className="text-[10px] font-bold -mt-5">PDF</span></div>
                        <div className="flex-1"><p className="font-semibold text-sm">Rahul_Sharma_Resume.pdf</p>
                        <p className="text-xs text-slate-500 mt-3">Uploaded on 20 May 2025　•　245 KB</p></div>
                        <div className="flex gap-2"><button className="border border-slate-200 rounded-lg px-4 py-2 text-sm">
                            <Eye className="w-4 h-4 inline mr-2" />Preview</button><button className="border border-slate-200 rounded-lg px-4 py-2 text-sm">
                                <Download className="w-4 h-4 inline mr-2" />Download</button><MoreVertical className="mt-2" /></div></div></div></div>
                                <div className="mt-5 p-4 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-medium">
                                    <CheckCircle2 className="w-4 h-4 inline mr-2" />Your resume is active and visible to employers.<button className="float-right text-blue-700 font-semibold">
                                        <Edit3 className="w-3 h-3 inline mr-1" />Update Resume</button></div></section>
            <section className="resume-card bg-white border border-slate-200 rounded-xl p-5">
                <h2 className="font-bold">Resume Strength</h2>
                <div className="flex flex-col md:flex-row items-center gap-8 mt-4">
                     <div><StrengthChart /><p className="text-xs text-slate-600 max-w-[190px] text-center mt-2">You're almost there! An visible a few areas to make your profile stronger.</p></div>
                     <div className="flex-1 w-full space-y-4">{[["Profile Completeness",90,"bg-emerald-600"],
                                  ["Skills",80,"bg-emerald-600"],["Work Experience",75,"bg-blue-700"],
                                  ["Education",100,"bg-emerald-600"],["Achievements",60,"bg-amber-500"]].map(([label,progress,color]) => <div key={String(label)}
                                   className="grid grid-cols-[135px_1fr_34px] gap-3 items-center text-xs"><span className="font-medium">{label}</span>
                                   <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                                    <div className={`h-full ${color}`} style={{ width: `${progress}%` }} /></div>
                                    <span>{progress}%</span></div>)}</div></div></section>
            <section className="resume-card bg-white border border-slate-200 rounded-xl p-5">
                <h2 className="font-bold">Resume Sections</h2>
                  <div className="mt-3">{[[UserRound,"Personal Information","Rahul Sharma, rahulsharma@email.com, 9876543210"],
                                      [FileText,"Professional Summary","Experienced Accountant with 4+ years in bookkeeping, taxation..."],
                                         [Award,"Work Experience","3 Experiences Added"],[Sparkles,"Education","B.Com, CA Intermediate"],
                                         [Star,"Skills","Tally, GST, Excel, Taxation, Bank Reconciliation"]].map(([Icon,title,detail]) => 
                  <div className="flex items-center gap-4 py-3 border-b last:border-0 border-slate-100" key={String(title)}>
                    <div className="w-9 h-9 bg-blue-50 text-blue-700 rounded-lg grid place-items-center">
                        <Icon className="w-5 h-5" /></div>
                    <div className="flex-1">
                        <p className="text-sm font-semibold">{title}</p>
                        <p className="text-xs text-slate-500 mt-1">{detail}</p>
                      </div><span className="text-xs text-emerald-700 font-medium"><CheckCircle2 className="w-3 h-3 inline mr-1" />Completed</span>
                      <button className="border border-slate-200 rounded-lg px-4 py-2 text-xs">Edit</button></div>)}</div></section></div>
         <aside className="space-y-5">
             <section className="resume-card bg-white border border-slate-200 rounded-xl p-5">
                        <h2 className="font-bold"><Lightbulb className="w-5 h-5 inline text-amber-500 mr-2" />Resume Tips <span className="float-right bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded">Good</span></h2>
                        {[["Add more skills to get better job matches",true],["Add a professional summary",true],["Your resume can be more specific",false],["Add achievements to stand out",false]].map(([text,good]) => <p key={String(text)} className="text-xs text-slate-600 mt-5">
                            <span className={good ? "text-emerald-600" : "text-orange-500"}>{good ? "✓" : "⚠"}</span><span className="ml-3">{text}</span></p>)}<button className="text-xs text-blue-700 font-semibold mt-6">Improve My Resume　→</button></section>
            <section className="resume-card bg-white border border-slate-200 rounded-xl p-5"><h2 className="font-bold text-sm"><Eye className="w-4 h-4 inline text-blue-700 mr-3" />Profile Visibility</h2>
              <div className="flex justify-between items-center mt-5 text-xs text-slate-600">Your resume is visible to employers.<span className="w-11 h-6 rounded-full bg-emerald-600 p-1">
                   <span className="block w-4 h-4 rounded-full bg-white ml-auto" /></span></div>
              <div className="mt-5 p-3 bg-blue-50 text-xs rounded-lg">Make your profile public to increase your chances of getting hired.</div>
                <button className="text-xs text-blue-700 font-semibold mt-5">Manage Visibility Settings　→</button></section>
            <section className="resume-card bg-white border border-slate-200 rounded-xl p-5"><h2 className="font-bold">Quick Actions</h2>
               <div className="grid grid-cols-2 gap-3 mt-5">{[[Edit3,"Improve Resume","Get AI suggestions"],[Star,"Add Skills","Update your skills"],
                   [Download,"Download PDF","Save as PDF file"],[Share2,"Share Resume","Share with others"]].map(([Icon,title,sub]) => <button key={String(title)} className="text-left bg-slate-50 border border-slate-100 rounded-lg p-3">
                     <Icon className="w-5 h-5 text-blue-700" /><p className="text-xs font-semibold mt-2">{title}</p><p className="text-[10px] text-slate-500 mt-1">{sub}</p></button>)}</div>
                      <button className="w-full mt-5 text-left bg-red-50 border border-red-100 text-red-600 rounded-lg p-3 text-sm font-semibold">⌫　Delete Resume<p className="text-[10px] font-normal ml-6 mt-1">Remove current resume</p></button>
            </section>
        </aside>
        
    </div>
    </div>;
export default Resume;
