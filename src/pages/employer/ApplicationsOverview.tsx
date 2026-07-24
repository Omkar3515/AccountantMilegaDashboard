import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { ChevronDown, ArrowRight } from 'lucide-react';

const data = [
  { name: '14 May', value: 12 },
  { name: '15 May', value: 30 },
  { name: '16 May', value: 60 },
  { name: '17 May', value: 38 },
  { name: '18 May', value: 45 },
  { name: '19 May', value: 25 },
  { name: '20 May', value: 46 },
];

const ApplicationsOverview = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm col-span-1 lg:col-span-2">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Applications Overview</h3>
        <div className="flex items-center gap-4">
          <a href="#" className="text-sm font-semibold text-brand-green flex items-center gap-1 hover:underline">
            View All Applications <ArrowRight className="w-4 h-4" />
          </a>
          <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
            Last 7 Days <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#008b46" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#008b46" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} ticks={[0, 15, 30, 45, 60]} />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Area type="monotone" dataKey="value" stroke="#008b46" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" dot={{ r: 4, fill: '#008b46', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ApplicationsOverview;
