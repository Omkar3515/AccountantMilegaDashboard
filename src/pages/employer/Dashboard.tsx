import { useState } from "react";
import { Calendar, Plus } from "lucide-react";
import EmployerSidebar from "../../components/layout/EmployerSidebar";
import Header from "./Header";
import StatsRow from "./StatsRow";
import ApplicationsOverview from "./ApplicationsOverview";
import JobStatusChart from "./JobStatusChart";
import RecentApplications from "./RecentApplications";
import TodaysInterviews from "./TodaysInterviews";
import RecommendedCandidates from "./RecommendedCandidates";
import QuickActions from "./QuickActions";
import PostJob from "./PostJob";
import CompanyProfile from "./CompanyProfile";
import CandidateDatabase from "./CandidateDatabase";

const EmployerDashboard = () => {
    const [currentPage, setCurrentPage] = useState("dashboard");
    const dashboard = (
        <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
                <div><h2 className="text-2xl font-bold text-gray-900 mb-1">Good Morning, MS &amp; Associates! 👋</h2>
                  <p className="text-sm text-gray-500">Here's what's happening with your hiring today.</p></div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 bg-white rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm transition-colors">
                        <Calendar className="w-4 h-4 text-gray-500" />Today, 20 May 2025</button>
                        <button onClick={() => setCurrentPage("post-job")} className="flex items-center gap-2 px-4 py-2 bg-brand-green
                          text-white rounded-lg text-sm font-bold hover:bg-brand-green/90 shadow-sm shadow-brand-green/20 transition-colors">
                            <Plus className="w-4 h-4" />Post a New Job</button></div>
            </div>
            <StatsRow />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6"><ApplicationsOverview /><JobStatusChart /></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><RecentApplications /><TodaysInterviews /><RecommendedCandidates /></div>
            <div className="pt-2"><QuickActions /></div>
        </div>
    );
    const page = currentPage === "dashboard" ? dashboard : currentPage === "post-job" ? <PostJob />
      : currentPage === "company-profile" ? <CompanyProfile /> : currentPage === "candidate-db" ? <CandidateDatabase />
      : <div className="flex items-center justify-center h-full"><p className="text-gray-500">Page under construction</p>
      </div>;
    return <div className="flex min-h-screen bg-[#f8f9fa] font-sans">
        <EmployerSidebar currentPage={currentPage} onPageChange={setCurrentPage} />
        <main className="flex-1 md:ml-64 flex flex-col h-screen overflow-hidden"><Header />
        <div className="flex-1 overflow-y-auto p-4 md:p-8">{page}</div></main></div>;
};

export default EmployerDashboard;
