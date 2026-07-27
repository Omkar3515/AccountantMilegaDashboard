import { Home, Briefcase, FileText, Users, Calendar, MessageSquare, Building2, CreditCard, Receipt, Settings, HelpCircle, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const EmployerSidebar = ({ currentPage, onPageChange }: SidebarProps) => {
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
    { id: 'messages', name: 'Messages', icon: MessageSquare, count: 6 },
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
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
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
                  className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                    isActive ? 'bg-white text-brand-green' : 'bg-brand-green text-white'
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
    </aside>
  );
};

export default EmployerSidebar;