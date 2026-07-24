import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ArrowRight } from 'lucide-react';

const data = [
  { name: 'Active Jobs', value: 6, color: '#10b981' }, // green
  { name: 'Draft Jobs', value: 2, color: '#3b82f6' }, // blue
  { name: 'Closed Jobs', value: 3, color: '#f59e0b' }, // orange
  { name: 'Expired Jobs', value: 1, color: '#8b5cf6' }, // purple
];

const JobStatusChart = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm col-span-1">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-lg font-bold text-gray-900">Job Status</h3>
        <a href="#" className="text-sm font-semibold text-brand-green flex items-center gap-1 hover:underline">
          View All Jobs <ArrowRight className="w-4 h-4" />
        </a>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="relative w-36 h-36">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-gray-900">12</span>
            <span className="text-xs text-gray-500 font-medium">Total Jobs</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between w-32">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-gray-700 font-medium">{item.name}</span>
              </div>
              <span className="text-sm font-bold text-gray-900">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobStatusChart;
