import { Home, Briefcase, FileText, Users, Calendar, MessageSquare, Building2, CreditCard, Receipt, Settings, HelpCircle, LogOut, Plus, Headset, BellRing, Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  unreadMessagesCount?: number;
}

const EmployerSidebar = ({ currentPage, onPageChange, unreadMessagesCount = 4 }: SidebarProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('role');
    navigate('/login');
  };

  const navItems = [
    { id: 'dashboard', name: 'Dashboard', icon: Home, count: null },
    { id: 'post-job', name: 'Post a Job', icon: Briefcase, count: null },
    { id: 'manage-jobs', name: 'Manage Jobs', icon: FileText, count: null },
    { id: 'applications', name: 'Applications', icon: MessageSquare, count: 24 },
    { id: 'candidate-db', name: 'Candidate Database', icon: Users, count: null },
    { id: 'shortlisted', name: 'Shortlisted Candidates', icon: Users, count: null },
    { id: 'interview-scheduler', name: 'Interview Scheduler', icon: Calendar, count: null },
    { id: 'messages', name: 'Messages', icon: MessageSquare, count: unreadMessagesCount },
    { id: 'job-alerts', name: 'Job Alerts', icon: BellRing, count: null },
    { id: 'saved-jobs', name: 'Saved Jobs', icon: Bookmark, count: null },
    { id: 'company-profile', name: 'Company Profile', icon: Building2, count: null },
    { id: 'billing', name: 'Subscription & Billing', icon: CreditCard, count: null },
    { id: 'invoices', name: 'Invoices', icon: Receipt, count: null },
    { id: 'settings', name: 'Settings', icon: Settings, count: null },
    { id: 'support', name: 'Help & Support', icon: HelpCircle, count: null },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen fixed left-0 top-0 overflow-y-auto hidden md:flex font-sans">
      <div className="p-6">
        {/* In Blue Green theme */}
        <h1 className="text-xl font-bold flex items-center gap-0 cursor-pointer" onClick={() => onPageChange('dashboard')}>
          <span className="text-blue-700">Accountant</span><span className="text-brand-green">Milega</span><span className="text-gray-900 text-sm mt-1">.com</span>
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                ? 'bg-brand-green text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                {item.name}
              </div>
              {item.count && (
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-semibold ${isActive ? 'bg-white text-brand-green' : 'bg-brand-green text-white'
                    }`}
                >
                  {item.count}
                </span>
              )}
            </button>
          );
        })}

        <div className="pt-4 mt-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </nav>

      {currentPage === 'manage-jobs' && (
        <div className="p-4 mt-auto">
          <div className="bg-brand-light rounded-xl p-4 border border-brand-green/20 text-center shadow-sm relative">
            <div className="w-10 h-10 mx-auto rounded-xl bg-brand-green text-white grid place-items-center mb-2.5 shadow-md shadow-brand-green/20">
              <Briefcase className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-gray-900">Post a new job</h4>
            <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
              Reach the right candidates faster.
            </p>
            <button
              onClick={() => onPageChange("post-job")}
              className="mt-3 w-full bg-brand-green hover:bg-brand-green/90 text-white rounded-lg py-2 text-xs font-bold transition-colors shadow-sm shadow-brand-green/20 flex items-center justify-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Post New Job
            </button>
          </div>
        </div>
      )}
      {currentPage === 'interview-scheduler' && (
        <div className="p-4 mt-auto">
          <div className="bg-brand-light rounded-xl p-4 border border-brand-green/20 text-center shadow-sm relative">
            <div className="w-10 h-10 mx-auto rounded-xl bg-brand-green text-white grid place-items-center mb-2.5 shadow-md shadow-brand-green/20">
              <Calendar className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-gray-900">Schedule interviews with ease</h4>
            <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
              Organize, manage and never miss an important interview.
            </p>
            <button
              onClick={() => onPageChange("interview-scheduler")}
              className="mt-3 w-full bg-brand-green hover:bg-brand-green/90 text-white rounded-lg py-2 text-xs font-bold transition-colors shadow-sm shadow-brand-green/20"
            >
              Schedule Interview
            </button>
          </div>
        </div>
      )}
      {currentPage === 'messages' && (
        <div className="p-4 mt-auto">
          <div className="bg-brand-light rounded-xl p-4 border border-brand-green/20 text-center shadow-sm relative">
            <div className="w-10 h-10 mx-auto rounded-xl bg-brand-green text-white grid place-items-center mb-2.5 shadow-md shadow-brand-green/20">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-gray-900">Communicate better.</h4>
            <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
              Quick replies and updates help you hire faster.
            </p>
            <button
              onClick={() => onPageChange("billing")}
              className="mt-3 w-full bg-brand-green hover:bg-brand-green/90 text-white rounded-lg py-2 text-xs font-bold transition-colors shadow-sm shadow-brand-green/20"
            >
              Upgrade Plan
            </button>
          </div>
        </div>
      )}
      {currentPage === 'settings' && (
        <div className="p-4 mt-auto">
          <div className="bg-brand-light rounded-xl p-4 border border-brand-green/20 text-center shadow-sm relative">
            <div className="w-10 h-10 mx-auto rounded-xl bg-brand-green text-white grid place-items-center mb-2.5 shadow-md shadow-brand-green/20">
              <Settings className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-gray-900">Customize your account</h4>
            <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
              Update your preferences and manage your account settings.
            </p>
            <button
              onClick={() => onPageChange("settings")}
              className="mt-3 w-full bg-brand-green hover:bg-brand-green/90 text-white rounded-lg py-2 text-xs font-bold transition-colors shadow-sm shadow-brand-green/20"
            >
              Explore Settings
            </button>
          </div>
        </div>
      )}
      {currentPage === 'support' && (
        <div className="p-4 mt-auto">
          <div className="bg-brand-light rounded-xl p-4 border border-brand-green/20 text-center shadow-sm relative">
            <div className="w-10 h-10 mx-auto rounded-xl bg-brand-green text-white grid place-items-center mb-2.5 shadow-md shadow-brand-green/20">
              <Headset className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-gray-900">Need priority support?</h4>
            <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
              Upgrade to Premium Plan for faster assistance.
            </p>
            <button
              onClick={() => onPageChange("billing")}
              className="mt-3 w-full bg-brand-green hover:bg-brand-green/90 text-white rounded-lg py-2 text-xs font-bold transition-colors shadow-sm shadow-brand-green/20"
            >
              Upgrade Now
            </button>
          </div>
        </div>
      )}
      {currentPage === 'job-alerts' && (
        <div className="p-4 mt-auto">
          <div className="bg-brand-light rounded-xl p-4 border border-brand-green/20 text-center shadow-sm relative">
            <div className="w-10 h-10 mx-auto rounded-xl bg-brand-green text-white grid place-items-center mb-2.5 shadow-md shadow-brand-green/20">
              <BellRing className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-gray-900">Never miss the right candidate!</h4>
            <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
              Create alerts and get notified when new candidates match your requirements.
            </p>
            <button
              onClick={() => onPageChange("job-alerts")}
              className="mt-3 w-full bg-brand-green hover:bg-brand-green/90 text-white rounded-lg py-2 text-xs font-bold transition-colors shadow-sm shadow-brand-green/20"
            >
              Create New Alert
            </button>
          </div>
        </div>
      )}
      {currentPage === 'saved-jobs' && (
        <div className="p-4 mt-auto">
          <div className="bg-brand-light rounded-xl p-4 border border-brand-green/20 text-center shadow-sm relative">
            <div className="w-10 h-10 mx-auto rounded-xl bg-brand-green text-white grid place-items-center mb-2.5 shadow-md shadow-brand-green/20">
              <Bookmark className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-gray-900">Save jobs. Hire better.</h4>
            <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
              Save relevant job posts and review them later.
            </p>
            <button
              onClick={() => onPageChange("saved-jobs")}
              className="mt-3 w-full bg-brand-green hover:bg-brand-green/90 text-white rounded-lg py-2 text-xs font-bold transition-colors shadow-sm shadow-brand-green/20"
            >
              Explore Jobs
            </button>
          </div>
        </div>
      )}
      {currentPage !== 'manage-jobs' && currentPage !== 'interview-scheduler' && currentPage !== 'messages' && currentPage !== 'job-alerts' && currentPage !== 'saved-jobs' && currentPage !== 'settings' && currentPage !== 'support' && (
        <div className="p-4 mt-auto">
          <div className="bg-brand-light rounded-xl p-4 border border-brand-green/20">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="bg-brand-green/10 p-1.5 rounded-md">
                  <Building2 className="w-4 h-4 text-brand-green" />
                </div>
                <span className="font-semibold text-gray-900 text-sm">Business Plan</span>
              </div>
              <span className="text-[10px] font-bold text-brand-green bg-white px-2 py-0.5 rounded border border-brand-green/20">Active</span>
            </div>
            <p className="text-xs text-gray-500 text-center mb-1">Valid Till</p>
            <p className="text-sm font-bold text-gray-900 text-center mb-3">26 May 2026</p>
            <button className="w-full bg-white text-brand-green border border-brand-green/30 font-semibold py-1.5 rounded-lg text-sm hover:bg-brand-light transition-colors shadow-sm">
              Upgrade Plan
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};

export default EmployerSidebar;