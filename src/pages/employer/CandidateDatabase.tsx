import { Search, MapPin, ChevronDown, Bookmark, Download, Plus, List, Grid, MoreVertical, SlidersHorizontal, CheckCircle2 } from 'lucide-react';

const CandidateDatabase = () => {
  const candidates = [
    {
      id: 'AM10248', name: 'Rahul Sharma', role: 'Senior Accountant', verified: true, exp: '5.2 Years', loc: 'Mumbai, Maharashtra', sal: '₹ 6.5 LPA', score: '92%', match: 'Excellent Match', scoreColor: 'text-brand-green', img: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
      skills: ['Tally Prime', 'GST', 'Excel', 'Bank Reconciliation', 'TDS', '+3']
    },
    {
      id: 'AM09876', name: 'Neha Patil', role: 'Accountant', verified: true, exp: '3.8 Years', loc: 'Pune, Maharashtra', sal: '₹ 4.8 LPA', score: '88%', match: 'Very Good Match', scoreColor: 'text-brand-green', img: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
      skills: ['Tally ERP 9', 'GST', 'Excel', 'E-Filing', 'MIS Reporting', '+2']
    },
    {
      id: 'AM08765', name: 'Amit Verma', role: 'Junior Accountant', verified: true, exp: '2.6 Years', loc: 'Navi Mumbai, Maharashtra', sal: '₹ 3.6 LPA', score: '76%', match: 'Good Match', scoreColor: 'text-brand-green', img: 'https://i.pravatar.cc/150?u=a048581f4e29026701d',
      skills: ['Tally', 'Excel', 'GST', 'Data Entry', 'MS Office', '+1']
    },
    {
      id: 'AM07531', name: 'Pooja Singh', role: 'Tax Executive', verified: false, exp: '4.1 Years', loc: 'Nagpur, Maharashtra', sal: '₹ 5.2 LPA', score: '74%', match: 'Good Match', scoreColor: 'text-brand-green', img: 'https://i.pravatar.cc/150?u=a04258a2462d826712d', initials: 'PS',
      skills: ['GST', 'Income Tax', 'TDS', 'Excel', 'Return Filing', '+2']
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500 pb-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-2">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Candidate Database</h2>
          <p className="text-sm text-gray-500">Search and connect with the best accounting talent.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 bg-white rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 shadow-sm transition-colors">
            <Bookmark className="w-4 h-4 text-gray-500" /> Save Search
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 bg-white rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 shadow-sm transition-colors">
            <Download className="w-4 h-4 text-gray-500" /> Download Resumes
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-brand-green text-white rounded-lg text-sm font-bold hover:bg-brand-green/90 shadow-sm shadow-brand-green/20 transition-colors">
            <Plus className="w-4 h-4" /> Invite Candidates
          </button>
        </div>
      </div>

      {/* Search Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-sm font-bold text-gray-900 mb-4">Search Candidates</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Keywords</label>
            <div className="relative">
              <input type="text" placeholder="Search by name, skills, etc." className="w-full border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green" />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Experience</label>
            <div className="relative">
              <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm appearance-none focus:outline-none bg-white text-gray-500">
                <option>Select Experience</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-2.5 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Current Location</label>
            <div className="relative">
              <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm appearance-none focus:outline-none bg-white text-gray-500">
                <option>Select Location</option>
              </select>
              <MapPin className="w-4 h-4 text-gray-400 absolute right-3 top-2.5 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Expected Salary</label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm appearance-none focus:outline-none bg-white text-gray-500">
                  <option>Min Salary</option>
                </select>
                <ChevronDown className="w-3 h-3 text-gray-400 absolute right-2 top-3 pointer-events-none" />
              </div>
              <span className="text-gray-400">-</span>
              <div className="relative flex-1">
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm appearance-none focus:outline-none bg-white text-gray-500">
                  <option>Max Salary</option>
                </select>
                <ChevronDown className="w-3 h-3 text-gray-400 absolute right-2 top-3 pointer-events-none" />
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Qualification</label>
            <div className="relative">
              <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm appearance-none focus:outline-none bg-white text-gray-500">
                <option>Select Qualification</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-2.5 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Skills</label>
            <div className="relative">
              <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm appearance-none focus:outline-none bg-white text-gray-500">
                <option>Select Skills</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-2.5 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Availability</label>
            <div className="relative">
              <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm appearance-none focus:outline-none bg-white text-gray-500">
                <option>Select Availability</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-2.5 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Notice Period</label>
            <div className="relative">
              <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm appearance-none focus:outline-none bg-white text-gray-500">
                <option>Select Notice Period</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-2.5 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Employment Type</label>
            <div className="relative">
              <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm appearance-none focus:outline-none bg-white text-gray-500">
                <option>All Types</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-2.5 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Gender</label>
            <div className="relative">
              <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm appearance-none focus:outline-none bg-white text-gray-500">
                <option>All Gender</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-2.5 pointer-events-none" />
            </div>
          </div>
          <div className="lg:col-span-2 flex items-end justify-end gap-4 mt-2 lg:mt-0">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50">
              <SlidersHorizontal className="w-4 h-4" /> More Filters
            </button>
            <button className="text-sm font-semibold text-brand-green hover:underline px-2">
              Clear Filters
            </button>
            <button className="px-6 py-2 bg-brand-green text-white rounded-lg text-sm font-bold hover:bg-brand-green/90 shadow-sm shadow-brand-green/20">
              Search Candidates
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Column - Results */}
        <div className="lg:col-span-3">
          
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-600">Showing 1 - 20 of 1,248 candidates</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <div className="relative">
                  <select className="border border-gray-200 rounded-lg pl-3 pr-8 py-1.5 text-sm appearance-none focus:outline-none bg-white font-medium text-gray-900">
                    <option>Best Match</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2 top-2 pointer-events-none" />
                </div>
              </div>
              <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1">
                <button className="p-1 bg-brand-light text-brand-green rounded"><List className="w-4 h-4" /></button>
                <button className="p-1 text-gray-400 hover:text-gray-600"><Grid className="w-4 h-4" /></button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {candidates.map((candidate, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col md:flex-row gap-6 relative group hover:border-brand-green/30 transition-colors">
                
                {/* Profile Image & Basic Info */}
                <div className="flex items-start gap-4 md:w-64">
                  {candidate.img ? (
                    <img src={candidate.img} alt={candidate.name} className="w-16 h-16 rounded-full object-cover border border-gray-100" />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xl font-bold border border-purple-200">
                      {candidate.initials}
                    </div>
                  )}
                  <div>
                    <h3 className="text-base font-bold text-gray-900 flex items-center gap-1.5">
                      {candidate.name} {candidate.verified && <CheckCircle2 className="w-4 h-4 text-blue-500" />}
                    </h3>
                    <p className="text-sm font-semibold text-brand-green mt-0.5">{candidate.role}</p>
                    <p className="text-xs text-gray-500 mt-1">ID: {candidate.id}</p>
                  </div>
                </div>

                {/* Details (Exp, Loc, Sal) */}
                <div className="flex-1 grid grid-cols-3 gap-4 border-l border-r border-gray-100 px-6">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-gray-700">
                      <Search className="w-4 h-4" /> {/* User icon representation */}
                      <span className="text-sm font-semibold">{candidate.exp}</span>
                    </div>
                    <span className="text-[10px] text-gray-400 ml-5.5">Experience</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-gray-700">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm font-semibold">{candidate.loc.split(',')[0]}</span>
                    </div>
                    <span className="text-[10px] text-gray-400 ml-5.5">Current Location</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-gray-700">
                      <span className="font-bold">₹</span>
                      <span className="text-sm font-semibold">{candidate.sal}</span>
                    </div>
                    <span className="text-[10px] text-gray-400 ml-4">Expected Salary</span>
                  </div>
                </div>

                {/* Score & Actions */}
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-[10px] text-gray-500 flex items-center justify-center gap-1">AI Match Score <span className="w-3 h-3 rounded-full border border-gray-300 flex items-center justify-center text-[8px]">i</span></p>
                    <p className={`text-2xl font-bold ${candidate.scoreColor}`}>{candidate.score}</p>
                    <p className={`text-[10px] font-semibold ${candidate.scoreColor}`}>{candidate.match}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button className="px-4 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 w-24">
                      View Profile
                    </button>
                    <button className="px-4 py-1.5 border border-brand-green text-brand-green rounded-lg text-xs font-semibold hover:bg-brand-light w-24 flex items-center justify-center gap-1.5">
                      <Bookmark className="w-3.5 h-3.5" /> Shortlist
                    </button>
                  </div>
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>

                {/* Skills */}
                <div className="absolute bottom-1 left-[288px] flex items-center gap-2">
                  <span className="text-[10px] text-gray-500 font-medium">Top Skills</span>
                  <div className="flex items-center gap-1.5">
                    {candidate.skills.map((skill, sIdx) => (
                      <span key={sIdx} className="px-2 py-0.5 bg-gray-50 border border-gray-100 rounded text-[10px] text-gray-600 font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6 bg-white p-4 rounded-xl border border-gray-100">
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-400 hover:bg-gray-50">&lt;</button>
              <button className="w-8 h-8 flex items-center justify-center rounded border border-brand-green bg-brand-light text-brand-green font-bold">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50">2</button>
              <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50">3</button>
              <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50">4</button>
              <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50">5</button>
              <span className="px-2 text-gray-400">...</span>
              <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50">63</button>
              <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50">&gt;</button>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Show</span>
              <div className="relative">
                <select className="border border-gray-200 rounded pl-2 pr-6 py-1 appearance-none focus:outline-none bg-white">
                  <option>20</option>
                </select>
                <ChevronDown className="w-3 h-3 text-gray-400 absolute right-1.5 top-2 pointer-events-none" />
              </div>
              <span>per page</span>
            </div>
          </div>

        </div>

        {/* Right Column */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Saved Searches */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-gray-900">Saved Searches</h3>
              <a href="#" className="text-xs font-semibold text-brand-green hover:underline">View All</a>
            </div>
            <div className="space-y-4">
              {[
                { title: 'Senior Accountant - Mumbai', count: '25 Candidates' },
                { title: 'Tally + GST Experts', count: '48 Candidates' },
                { title: 'Pune - 3 to 5 Years', count: '31 Candidates' },
                { title: 'Recently Active', count: '92 Candidates' },
              ].map((search, idx) => (
                <div key={idx} className="flex items-start justify-between pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                  <div>
                    <h4 className="text-xs font-semibold text-gray-900 mb-0.5">{search.title}</h4>
                    <p className="text-[10px] text-gray-500">{search.count}</p>
                  </div>
                  <button className="text-gray-400 hover:text-brand-green">
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Filters */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="text-sm font-bold text-gray-900 mb-4">Quick Filters</h3>
            <div className="space-y-3">
              {[
                { label: 'Active Today', count: '124' },
                { label: 'Updated Resume', count: '356' },
                { label: 'Open to Work', count: '210' },
                { label: 'Immediate Joiners', count: '98' },
                { label: 'Interview Ready', count: '67' },
              ].map((filter, idx) => (
                <label key={idx} className="flex items-center justify-between cursor-pointer group">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full border border-brand-green flex items-center justify-center">
                      <CheckCircle2 className="w-3 h-3 text-brand-green" />
                    </div>
                    <span className="text-xs text-gray-700 group-hover:text-gray-900 transition-colors">{filter.label}</span>
                  </div>
                  <span className="text-[10px] font-semibold text-gray-500 bg-gray-50 px-2 py-0.5 rounded">{filter.count}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Upgrade Banner */}
          <div className="bg-brand-light rounded-2xl border border-brand-green/20 p-5 text-center">
            <div className="w-10 h-10 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-3">
              {/* Crown Icon placeholder */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-green"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/></svg>
            </div>
            <h3 className="text-sm font-bold text-gray-900 mb-2">Upgrade to Access More</h3>
            <p className="text-xs text-gray-600 mb-4 px-2">Get access to unlimited candidate contacts and advanced filters.</p>
            <button className="w-full py-2 bg-brand-green text-white rounded-lg text-sm font-bold hover:bg-brand-green/90 shadow-sm shadow-brand-green/20 transition-all">
              Upgrade Plan
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CandidateDatabase;
