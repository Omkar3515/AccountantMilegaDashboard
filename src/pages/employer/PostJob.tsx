import { Calendar, Eye, ChevronDown, MapPin, Check, Bold, Italic, Underline, List, ListOrdered, AlignLeft, AlignCenter, AlignRight, Link2, Minus, Plus } from 'lucide-react';

const PostJob = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-2">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Post a New Job
          </h2>
          <p className="text-sm text-gray-500">Fill in the details to post your job and start receiving applications.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 bg-white rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 shadow-sm transition-colors">
            <Calendar className="w-4 h-4 text-gray-500" />
            Save as Draft
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-brand-green text-white rounded-lg text-sm font-bold hover:bg-brand-green/90 shadow-sm shadow-brand-green/20 transition-colors">
            <Eye className="w-4 h-4" />
            Preview Job
          </button>
        </div>
      </div>

      {/* Stepper */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6 overflow-x-auto">
        <div className="flex items-center justify-between min-w-[700px]">
          {[
            { step: 1, label: 'Job Details', active: true },
            { step: 2, label: 'Salary & Benefits', active: false },
            { step: 3, label: 'Skills & Requirements', active: false },
            { step: 4, label: 'Additional Information', active: false },
            { step: 5, label: 'Review & Publish', active: false },
          ].map((item, index) => (
            <div key={item.step} className="flex flex-col items-center flex-1 relative">
              {/* Line connector */}
              {index !== 0 && (
                <div className={`absolute top-4 -left-[50%] w-full h-[2px] ${item.active ? 'bg-brand-green' : 'bg-gray-200'} -z-10`}></div>
              )}
              
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold bg-white border-2 mb-2 ${
                item.active ? 'border-brand-green text-brand-green' : 'border-gray-200 text-gray-400'
              }`}>
                {item.step}
              </div>
              <span className={`text-xs font-semibold ${item.active ? 'text-brand-green' : 'text-gray-500'}`}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Form Area */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900">Job Details</h3>
            <p className="text-sm text-gray-500">Provide basic information about the job opening.</p>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Job Title */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Job Title <span className="text-red-500">*</span></label>
                <div className="relative">
                  <input type="text" placeholder="e.g. Senior Accountant" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all" />
                  <span className="absolute right-3 top-3 text-xs text-gray-400">0/100</span>
                </div>
              </div>

              {/* Job Role */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Job Role / Designation <span className="text-red-500">*</span></label>
                <div className="relative">
                  <select className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green bg-white text-gray-500">
                    <option>e.g. Senior Accountant</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-3 pointer-events-none" />
                </div>
              </div>

              {/* Department */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Department</label>
                <div className="relative">
                  <select className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green bg-white text-gray-500">
                    <option>Select Department</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-3 pointer-events-none" />
                </div>
              </div>

              {/* Employment Type */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Employment Type <span className="text-red-500">*</span></label>
                <div className="flex flex-wrap items-center gap-4 h-[42px]">
                  {['Full Time', 'Part Time', 'Contract', 'Internship'].map((type, idx) => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer group">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${idx === 0 ? 'border-brand-green' : 'border-gray-300 group-hover:border-brand-green'}`}>
                        {idx === 0 && <div className="w-2 h-2 rounded-full bg-brand-green"></div>}
                      </div>
                      <span className="text-sm text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Experience Required */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Experience Required <span className="text-red-500">*</span></label>
                <div className="relative">
                  <select className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green bg-white text-gray-500">
                    <option>Select Experience</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-3 pointer-events-none" />
                </div>
              </div>

              {/* Notice Period */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Notice Period <span className="text-red-500">*</span></label>
                <div className="relative">
                  <select className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green bg-white text-gray-500">
                    <option>Select Notice Period</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-3 pointer-events-none" />
                </div>
              </div>

              {/* Number of Openings */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Number of Openings <span className="text-red-500">*</span></label>
                <div className="flex items-center w-full border border-gray-200 rounded-lg overflow-hidden h-[42px]">
                  <button className="px-4 text-gray-500 hover:bg-gray-50 h-full border-r border-gray-200"><Minus className="w-4 h-4" /></button>
                  <input type="text" value="1" readOnly className="flex-1 text-center text-sm font-medium focus:outline-none" />
                  <button className="px-4 text-gray-500 hover:bg-gray-50 h-full border-l border-gray-200"><Plus className="w-4 h-4" /></button>
                </div>
              </div>

              {/* Job Location */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Job Location <span className="text-red-500">*</span></label>
                <div className="relative mb-2">
                  <input type="text" placeholder="Enter city or select location" className="w-full border border-gray-200 rounded-lg pl-4 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all" />
                  <MapPin className="w-4 h-4 text-gray-400 absolute right-4 top-3 pointer-events-none" />
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <div className="w-4 h-4 rounded border border-gray-300"></div>
                  <span className="text-sm text-gray-600">Work From Home</span>
                </label>
              </div>
            </div>

            {/* Job Description */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">Job Description <span className="text-red-500">*</span></label>
              <div className="border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-brand-green/20 focus-within:border-brand-green transition-all">
                {/* Toolbar */}
                <div className="flex items-center gap-1 p-2 border-b border-gray-200 bg-gray-50 flex-wrap">
                  <select className="text-sm bg-transparent border-none focus:outline-none text-gray-700 mr-2 cursor-pointer">
                    <option>Normal</option>
                  </select>
                  <div className="w-px h-4 bg-gray-300 mx-1"></div>
                  <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded"><Bold className="w-4 h-4" /></button>
                  <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded"><Italic className="w-4 h-4" /></button>
                  <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded"><Underline className="w-4 h-4" /></button>
                  <div className="w-px h-4 bg-gray-300 mx-1"></div>
                  <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded"><List className="w-4 h-4" /></button>
                  <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded"><ListOrdered className="w-4 h-4" /></button>
                  <div className="w-px h-4 bg-gray-300 mx-1"></div>
                  <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded"><AlignLeft className="w-4 h-4" /></button>
                  <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded"><AlignCenter className="w-4 h-4" /></button>
                  <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded"><AlignRight className="w-4 h-4" /></button>
                  <div className="w-px h-4 bg-gray-300 mx-1"></div>
                  <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded"><Link2 className="w-4 h-4" /></button>
                </div>
                {/* Textarea */}
                <div className="relative">
                  <textarea 
                    placeholder="Write a detailed description about the role, responsibilities and expectations..." 
                    className="w-full h-32 p-4 text-sm focus:outline-none resize-y"
                  ></textarea>
                  <span className="absolute right-3 bottom-3 text-xs text-gray-400">0/5000</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button className="px-6 py-2.5 bg-brand-green text-white rounded-lg font-bold hover:bg-brand-green/90 shadow-sm shadow-brand-green/20 transition-all">
                Save & Continue
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Preview */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Job Preview</h3>
            <p className="text-sm text-gray-500 mb-6">This is how your job will appear to candidates.</p>

            {/* Preview Card */}
            <div className="border border-gray-200 rounded-xl p-4 mb-6 relative">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-brand-light rounded-lg border border-brand-green/20 flex items-center justify-center shrink-0">
                  <Calendar className="w-6 h-6 text-brand-green" /> {/* Using Calendar as a placeholder icon for Briefcase since Briefcase was used elsewhere or we can just use an icon */}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Senior Accountant</h4>
                  <p className="text-xs text-gray-600 mt-0.5">MS & Associates</p>
                  <div className="flex items-center gap-2 text-[10px] text-gray-500 mt-1">
                    <span>Mumbai, Maharashtra</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span>Full Time</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-[10px] text-gray-500 border-t border-gray-100 pt-3">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  4-6 Yrs Experience
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Posted just now
                </div>
              </div>
            </div>

            {/* Key Details Summary */}
            <div className="mb-6">
              <h4 className="text-xs font-bold text-gray-900 mb-3">Key Details</h4>
              <div className="space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500 flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> Employment Type</span>
                  <span className="font-medium text-gray-900">Full Time</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500 flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> Experience</span>
                  <span className="font-medium text-gray-900">4 - 6 Years</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500 flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> Location</span>
                  <span className="font-medium text-gray-900">Mumbai, Maharashtra</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500 flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> Openings</span>
                  <span className="font-medium text-gray-900">1</span>
                </div>
              </div>
            </div>

            {/* Checklist */}
            <div>
              <h4 className="text-xs font-bold text-gray-900 mb-3">What candidates will see</h4>
              <div className="space-y-2">
                {[
                  'Job title and description',
                  'Role and responsibilities',
                  'Requirements and skills',
                  'Experience and location',
                  'Company information'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-brand-green" />
                    <span className="text-xs text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-8 pt-4 border-t border-gray-100 text-center">
              <p className="text-[10px] text-gray-400">Edit details on each step to update the preview.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PostJob;
