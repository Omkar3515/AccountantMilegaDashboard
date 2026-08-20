import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ArrowRight } from 'lucide-react';
import { getMyJobs } from './post-job/services/jobService';

interface JobStatusChartProps {
  onNavigate?: (page: string) => void;
}

const JobStatusChart: React.FC<JobStatusChartProps> = ({ onNavigate }) => {
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    let isMounted = true;
    const fetchJobs = async () => {
      try {
        const res = await getMyJobs();
        if (res.success && res.data && isMounted) {
          setJobs(res.data);
        }
      } catch {
        // Fallback
      }
    };

    fetchJobs();
    return () => {
      isMounted = false;
    };
  }, []);

  const totalJobs = jobs.length;
  const activeCount = jobs.filter((j) => j.status === 'published').length;
  const draftCount = jobs.filter((j) => j.status === 'draft' || j.status === 'pending_approval').length;
  const pausedCount = jobs.filter((j) => j.status === 'paused').length;
  const closedCount = jobs.filter((j) => j.status === 'closed').length;

  const data = [
    { name: 'Active Jobs', value: activeCount, color: '#10b981' },
    { name: 'Draft Jobs', value: draftCount, color: '#3b82f6' },
    { name: 'Paused Jobs', value: pausedCount, color: '#f59e0b' },
    { name: 'Closed Jobs', value: closedCount, color: '#ef4444' },
  ];

  const pieData = totalJobs === 0 ? [{ name: 'No Jobs', value: 1, color: '#e5e7eb' }] : data;

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm col-span-1">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-lg font-bold text-gray-900">Job Status</h3>
        <button
          type="button"
          onClick={() => onNavigate && onNavigate('manage-jobs')}
          className="text-sm font-semibold text-brand-green flex items-center gap-1 hover:underline cursor-pointer"
        >
          View All Jobs <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative w-36 h-36">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={totalJobs === 0 ? 0 : 2}
                dataKey="value"
                stroke="none"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-gray-900">{totalJobs}</span>
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
