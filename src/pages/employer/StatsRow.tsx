import { Briefcase, Users, UserCheck, Calendar, CheckCircle } from 'lucide-react';

const StatsRow = () => {
  const stats = [
    { title: 'Jobs Posted', value: '12', subtitle: 'Active Jobs', subtitleColor: 'text-brand-green', icon: Briefcase, iconColor: 'text-brand-green', iconBg: 'bg-brand-light', borderColor: 'border-brand-green/20' },
    { title: 'Applications', value: '248', subtitle: 'Total Received', subtitleColor: 'text-blue-500', icon: Users, iconColor: 'text-blue-500', iconBg: 'bg-blue-50', borderColor: 'border-blue-100' },
    { title: 'Shortlisted', value: '36', subtitle: 'Good Matches', subtitleColor: 'text-purple-500', icon: UserCheck, iconColor: 'text-purple-500', iconBg: 'bg-purple-50', borderColor: 'border-purple-100' },
    { title: 'Interviews', value: '18', subtitle: 'This Month', subtitleColor: 'text-orange-500', icon: Calendar, iconColor: 'text-orange-500', iconBg: 'bg-orange-50', borderColor: 'border-orange-100' },
    { title: 'Hired', value: '5', subtitle: 'This Month', subtitleColor: 'text-brand-green', icon: CheckCircle, iconColor: 'text-brand-green', iconBg: 'bg-brand-light', borderColor: 'border-brand-green/20' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className={`bg-white p-5 rounded-2xl border ${stat.borderColor} shadow-sm flex items-center gap-4`}>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.iconBg}`}>
              <Icon className={`w-6 h-6 ${stat.iconColor}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 leading-tight">{stat.value}</p>
              <p className="text-sm text-gray-600 mb-0.5">{stat.title}</p>
              <p className={`text-xs font-medium ${stat.subtitleColor}`}>{stat.subtitle}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsRow;
