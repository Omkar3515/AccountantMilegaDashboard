import { Briefcase, Search, UserPlus, FileText, Calendar, BarChart2 } from 'lucide-react';

const QuickActions = () => {
  const actions = [
    { title: 'Post a New Job', subtitle: 'Create job opening', icon: Briefcase, color: 'text-brand-green', bg: 'bg-brand-light' },
    { title: 'Search Candidates', subtitle: 'Find best matches', icon: Search, color: 'text-blue-500', bg: 'bg-blue-50' },
    { title: 'Invite Candidates', subtitle: 'Send job invitations', icon: UserPlus, color: 'text-purple-500', bg: 'bg-purple-50' },
    { title: 'Applications', subtitle: 'Review applications', icon: FileText, color: 'text-orange-500', bg: 'bg-orange-50', badge: '24' },
    { title: 'Interview Scheduler', subtitle: 'Schedule interviews', icon: Calendar, color: 'text-teal-500', bg: 'bg-teal-50' },
    { title: 'Reports & Analytics', subtitle: 'View hiring reports', icon: BarChart2, color: 'text-pink-500', bg: 'bg-pink-50' },
  ];

  return (
    <div>
      <h3 className="text-lg font-bold text-gray-900 mb-4 px-2">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button key={index} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col items-start gap-3 relative text-left group hover:border-gray-300">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${action.bg}`}>
                <Icon className={`w-5 h-5 ${action.color}`} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 group-hover:text-brand-green transition-colors">{action.title}</p>
                <p className="text-[10px] text-gray-500">{action.subtitle}</p>
              </div>
              {action.badge && (
                <span className="absolute top-4 right-4 bg-brand-green text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {action.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
