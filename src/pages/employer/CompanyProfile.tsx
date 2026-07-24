import { Eye, Edit3, MapPin, Calendar, Users, CheckCircle2, Building2, Briefcase, FileText, Globe, Image as ImageIcon, Circle, Check, Users2, Shield, Star, Award } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const CompanyProfile = () => {
  const tabs = ['Company Information', 'Team Members', 'Hiring Preferences', 'Social & Links', 'Verification'];
  
  const details = [
    { label: 'Industry', value: 'Accounting / Financial Services', icon: Building2 },
    { label: 'Company Size', value: '11-50 Employees', icon: Users2 },
    { label: 'Company Type', value: 'Private Partnership Firm', icon: Briefcase },
    { label: 'Year of Establishment', value: '2015', icon: Calendar },
    { label: 'PAN Number', value: 'AAAFM1234A', icon: FileText },
    { label: 'Registration Number', value: '1234567890', icon: FileText },
    { label: 'GST Number', value: '27AAAFM1234A1Z5', icon: FileText },
    { label: 'Website', value: 'www.msassociates.com', icon: Globe, link: true },
  ];

  const completionSteps = [
    { label: 'Basic Information', status: 'Completed', type: 'done' },
    { label: 'Company Description', status: 'Completed', type: 'done' },
    { label: 'Company Logo', status: 'Completed', type: 'done' },
    { label: 'Company Address', status: 'Completed', type: 'done' },
    { label: 'Team Members', status: 'Completed', type: 'done' },
    { label: 'Social Links', status: 'Add New', type: 'add' },
    { label: 'Company Banner', status: 'Add New', type: 'add' },
    { label: 'Verification', status: 'Verify Now', type: 'verify' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500 pb-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-2">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Company Profile</h2>
          <p className="text-sm text-gray-500">Manage your company information and hiring preferences.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 bg-white rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 shadow-sm transition-colors">
            <Eye className="w-4 h-4 text-gray-500" />
            View Company Page
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-brand-green text-white rounded-lg text-sm font-bold hover:bg-brand-green/90 shadow-sm shadow-brand-green/20 transition-colors">
            <Edit3 className="w-4 h-4" />
            Edit Profile
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 overflow-x-auto">
        <div className="flex items-center gap-8 min-w-max px-2">
          {tabs.map((tab, idx) => (
            <button
              key={tab}
              className={`py-3 text-sm font-semibold border-b-2 transition-colors ${
                idx === 0 
                  ? 'border-brand-green text-brand-green' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Company Information Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-gray-400" /> Company Information
            </h3>
            
            <div className="flex items-start gap-6 mb-8">
              <div className="relative">
                <div className="w-24 h-24 bg-brand-light text-brand-green rounded-xl flex items-center justify-center text-4xl font-bold border border-brand-green/20">
                  MS
                </div>
                <button className="absolute -bottom-2 -right-2 bg-white p-1.5 rounded-full border border-gray-200 text-brand-green shadow-sm hover:bg-gray-50">
                  <ImageIcon className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h4 className="text-xl font-bold text-gray-900">MS & Associates</h4>
                  <span className="flex items-center gap-1 text-[10px] font-bold text-brand-green bg-brand-light px-2 py-0.5 rounded-full border border-brand-green/20">
                    <CheckCircle2 className="w-3 h-3" /> Verified Company
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">Chartered Accountants</p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Mumbai, Maharashtra, India</span>
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Founded in 2015</span>
                  <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> 11-50 Employees</span>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-sm font-bold text-gray-900 mb-2">Company Description</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                MS & Associates is a leading Chartered Accountancy firm providing end-to-end financial, taxation, audit and business advisory services to startups, SMEs and corporates.<br />
                Our mission is to deliver accuracy, integrity and exceptional client service.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
              {details.map((detail, idx) => {
                const Icon = detail.icon;
                return (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-xs text-gray-500">
                      <Icon className="w-3.5 h-3.5" /> {detail.label}
                    </span>
                    {detail.link ? (
                      <a href={`http://${detail.value}`} className="text-xs font-semibold text-brand-green hover:underline">
                        {detail.value}
                      </a>
                    ) : (
                      <span className="text-xs font-medium text-gray-900">{detail.value}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Company Address Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gray-400" /> Company Address
              </h3>
              <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50">
                <Edit3 className="w-3.5 h-3.5" /> Edit Address
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div>
                <h4 className="text-sm font-bold text-gray-900 mb-2">Registered Address</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Office No. 501, 5th Floor, Centrum Business Square,<br />
                  Opp. Andheri Station, Andheri (E),<br />
                  Mumbai - 400069, Maharashtra, India
                </p>
              </div>
              <div className="h-32 bg-gray-100 rounded-xl border border-gray-200 overflow-hidden relative">
                {/* Mock Map Background */}
                <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.4\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")' }}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 bg-brand-green/20 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-brand-green fill-brand-light" />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Company Completion Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-sm font-bold text-gray-900 mb-6">Company Completion</h3>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="relative w-24 h-24 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={[{ value: 85 }, { value: 15 }]} cx="50%" cy="50%" innerRadius={35} outerRadius={45} stroke="none" startAngle={90} endAngle={-270}>
                      <Cell fill="#008b46" />
                      <Cell fill="#f3f4f6" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-bold text-gray-900 leading-none">85%</span>
                  <span className="text-[8px] text-gray-500 font-medium mt-1">Completed</span>
                </div>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Great! Your profile is almost complete. Complete the remaining steps to increase trust and attract better candidates.
              </p>
            </div>

            <div className="space-y-3">
              {completionSteps.map((step, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {step.type === 'done' ? (
                      <Check className="w-4 h-4 text-brand-green" />
                    ) : step.type === 'add' ? (
                      <div className="w-4 h-4 rounded-full bg-brand-green flex items-center justify-center"><div className="w-2 h-2 rounded-full bg-brand-green"></div></div> // Solid dot
                    ) : (
                      <Circle className="w-4 h-4 text-gray-300" />
                    )}
                    <span className="text-xs text-gray-700">{step.label}</span>
                  </div>
                  <span className={`text-xs font-semibold ${
                    step.type === 'done' ? 'text-brand-green' : 'text-blue-500 cursor-pointer hover:underline'
                  }`}>
                    {step.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Why Complete Your Profile */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-sm font-bold text-gray-900 mb-4">Why Complete Your Profile?</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4 text-blue-500" />
                </div>
                <span className="text-xs text-gray-700">Get 3X more quality applications</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4 text-blue-500" />
                </div>
                <span className="text-xs text-gray-700">Build trust with candidates</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                  <Star className="w-4 h-4 text-blue-500" />
                </div>
                <span className="text-xs text-gray-700">Showcase your brand</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4 text-blue-500" />
                </div>
                <span className="text-xs text-gray-700">Stand out from competitors</span>
              </div>
            </div>
          </div>

          {/* Last Updated */}
          <div className="bg-brand-light rounded-2xl border border-brand-green/10 p-4 flex items-start gap-3">
            <Calendar className="w-5 h-5 text-brand-green mt-0.5" />
            <div>
              <p className="text-xs text-gray-500">Profile last updated on</p>
              <p className="text-sm font-bold text-gray-900 mt-0.5">20 May 2025</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
