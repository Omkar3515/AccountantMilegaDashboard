import { useState } from 'react';
import { 
  Bookmark, 
  Eye, 
  Clock, 
  Trash2, 
  Search, 
  Filter, 
  MoreVertical, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Headphones,
  Bell
} from 'lucide-react';

const stats = [
  { label: 'Total Saved', value: '15', sub: 'All time', icon: Bookmark, color: 'text-[#087A37]', bg: 'bg-[#087A37]/10' },
  { label: 'Viewed', value: '9', sub: '60%', icon: Eye, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  { label: 'Applied', value: '3', sub: '20%', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-100' },
  { label: 'Removed', value: '3', sub: '20%', icon: Trash2, color: 'text-red-500', bg: 'bg-red-100' },
];

const jobs = [
  { id: 1, initial: 'SA', title: 'Senior Accountant', company: 'ABC Enterprises Pvt. Ltd.', exp: '3-5 Years', location: 'Mumbai, MH', type: 'Full Time', savedOn: '20 May 2025', initialColor: 'bg-[#087A37]/10 text-[#087A37]' },
  { id: 2, initial: 'TA', title: 'Tax Associate', company: 'NGK & Co.', exp: '1-3 Years', location: 'Pune, MH', type: 'Full Time', savedOn: '18 May 2025', initialColor: 'bg-emerald-100 text-emerald-700' },
  { id: 3, initial: 'IA', title: 'Internal Auditor', company: 'Deloitte India', exp: '2-4 Years', location: 'Bangalore, KA', type: 'Full Time', savedOn: '15 May 2025', initialColor: 'bg-amber-100 text-amber-700' },
  { id: 4, initial: 'JR', title: 'Junior Accountant', company: 'XYZ Financial Services', exp: '0-2 Years', location: 'Delhi, DL', type: 'Full Time', savedOn: '12 May 2025', initialColor: 'bg-blue-100 text-blue-700' },
  { id: 5, initial: 'CA', title: 'CA Articleship', company: 'Sharma & Associates', exp: '0-1 Year', location: 'Mumbai, MH', type: 'Internship', savedOn: '10 May 2025', initialColor: 'bg-purple-100 text-purple-700', typeBg: 'bg-emerald-100 text-emerald-700' },
  { id: 6, initial: 'FM', title: 'Finance Manager', company: 'Global Fin Corp', exp: '6-10 Years', location: 'Hyderabad, TG', type: 'Full Time', savedOn: '08 May 2025', initialColor: 'bg-[#087A37]/10 text-[#087A37]' },
];

export default function EmployerSavedJobs() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 pb-8 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <p className="text-sm text-gray-500 mb-2">
          <span className="hover:text-[#087A37] cursor-pointer">Dashboard</span>{" "}
          <span className="mx-1">›</span>
          <span className="text-gray-900 font-medium">Saved Jobs</span>
        </p>
        <h1 className="text-2xl font-bold text-gray-900">Saved Jobs</h1>
        <p className="text-sm text-gray-500 mt-1">Jobs you've saved for later reference.</p>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center shrink-0`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <div className="flex items-end gap-2 mt-1">
                  <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                  <span className="text-xs text-gray-500 mb-1">{stat.sub}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6 items-start">
        {/* Left Column: Jobs Table */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          {/* Search and Filters */}
          <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search saved jobs by title, company or keyword..." 
                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#087A37]/20 focus:border-[#087A37] transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <select className="border border-gray-200 rounded-lg px-3 py-2 text-xs font-medium text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#087A37]/20 transition-all">
                <option>All Locations</option>
              </select>
              <select className="border border-gray-200 rounded-lg px-3 py-2 text-xs font-medium text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#087A37]/20 transition-all">
                <option>All Employment Types</option>
              </select>
              <button className="flex items-center gap-2 px-4 py-2 border border-[#087A37] text-[#087A37] hover:bg-[#087A37]/5 rounded-lg text-xs font-semibold transition-all">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>
          </div>

          {/* Jobs Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/50">
                  <th className="py-3.5 px-4 text-xs font-bold text-gray-900">Job Details</th>
                  <th className="py-3.5 px-4 text-xs font-bold text-gray-900">Location</th>
                  <th className="py-3.5 px-4 text-xs font-bold text-gray-900">Employment Type</th>
                  <th className="py-3.5 px-4 text-xs font-bold text-gray-900">Saved On</th>
                  <th className="py-3.5 px-4 text-xs font-bold text-gray-900 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs ${job.initialColor}`}>
                          {job.initial}
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-gray-900">{job.title}</div>
                          <div className="text-xs text-gray-500 mt-0.5">
                            {job.company} • Exp: {job.exp}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-xs text-gray-600">{job.location}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${job.typeBg || 'bg-[#087A37]/10 text-[#087A37]'}`}>
                        {job.type}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-xs text-gray-500">{job.savedOn}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center gap-3 text-gray-400">
                        <button className="hover:text-[#087A37] transition-colors p-1" title="View"><Eye className="w-4 h-4" /></button>
                        <button className="hover:text-[#087A37] transition-colors p-1" title="Open Link"><ExternalLink className="w-4 h-4" /></button>
                        <button className="hover:text-red-500 transition-colors p-1" title="Remove"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
            <div>Showing 1 to 6 of 15 saved jobs</div>
            <div className="flex items-center gap-1.5">
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-gray-400">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#087A37] text-white font-bold shadow-sm shadow-[#087A37]/20">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors font-medium">2</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors font-medium">3</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-gray-600">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar Column */}
        <div className="space-y-6">
          {/* Chart Widget */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-6">Saved Jobs Overview</h3>
            
            <div className="flex items-center justify-between gap-4">
              {/* Donut Chart */}
              <div className="relative w-24 h-24 shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle className="text-gray-100 stroke-current" strokeWidth="12" cx="50" cy="50" r="40" fill="transparent" />
                  {/* Full Time - 66.7% */}
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#087A37" strokeWidth="12" strokeLinecap="round" strokeDasharray={`${251.2 * 0.667} ${251.2}`} strokeDashoffset="0" />
                  {/* Part Time - 13.3% */}
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#10B981" strokeWidth="12" strokeLinecap="round" strokeDasharray={`${251.2 * 0.133} ${251.2}`} strokeDashoffset={-(251.2 * 0.667)} />
                  {/* Internship - 13.3% */}
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#F97316" strokeWidth="12" strokeLinecap="round" strokeDasharray={`${251.2 * 0.133} ${251.2}`} strokeDashoffset={-(251.2 * (0.667 + 0.133))} />
                  {/* Contract - 6.7% */}
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#EF4444" strokeWidth="12" strokeLinecap="round" strokeDasharray={`${251.2 * 0.067} ${251.2}`} strokeDashoffset={-(251.2 * (0.667 + 0.133 + 0.133))} />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white m-3 rounded-full">
                  <span className="text-xl font-bold text-gray-900">15</span>
                  <span className="text-[9px] font-semibold text-gray-500">Total</span>
                </div>
              </div>

              {/* Legend */}
              <div className="space-y-2.5 w-full">
                {[
                  { label: 'Full Time', value: '10 (66.7%)', color: 'bg-[#087A37]' },
                  { label: 'Part Time', value: '2 (13.3%)', color: 'bg-[#10B981]' },
                  { label: 'Internship', value: '2 (13.3%)', color: 'bg-[#F97316]' },
                  { label: 'Contract', value: '1 (6.7%)', color: 'bg-[#EF4444]' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${item.color}`}></span>
                      <span className="text-gray-700 font-medium">{item.label}</span>
                    </div>
                    <span className="font-semibold text-gray-900">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Why Save Jobs Widget */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4">Why Save Jobs?</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-9 h-9 shrink-0 rounded-lg bg-[#087A37]/10 text-[#087A37] flex items-center justify-center">
                  <Bookmark className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-xs">Review later</h4>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">Save interesting jobs and review them when it's convenient.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-9 h-9 shrink-0 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <Eye className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-xs">Compare easily</h4>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">Compare job roles, requirements, and companies side by side.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-9 h-9 shrink-0 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
                  <Bell className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-xs">Never miss</h4>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">Come back and apply when you're ready.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Need Help Widget */}
          <div className="bg-[#087A37]/5 border border-[#087A37]/10 rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-[#087A37]/10 flex items-center justify-center">
                <Headphones className="w-5 h-5 text-[#087A37]" />
              </div>
              <h3 className="font-bold text-gray-900">Need Help?</h3>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed mb-4">
              Learn more about saving jobs and managing your preferences.
            </p>
            <button className="text-[#087A37] font-semibold text-xs flex items-center gap-1.5 hover:gap-2 transition-all">
              Visit Help Center <span className="text-lg leading-none mt-[-2px]">→</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}