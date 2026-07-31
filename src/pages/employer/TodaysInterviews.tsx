import { ArrowRight } from 'lucide-react';

const interviews = [
  { time: '10:00 AM', name: 'Sandeep Kumar', role: 'Accountant', round: 'Technical Round', status: 'Scheduled', img: 'https://i.pravatar.cc/150?u=a04258a2462d826712d' },
  { time: '11:30 AM', name: 'Priya Deshmukh', role: 'Senior Accountant', round: 'HR Round', status: 'Scheduled', img: 'https://i.pravatar.cc/150?u=a04258114e29026702d' },
  { time: '02:00 PM', name: 'Vikram Joshi', role: 'Tax Executive', round: 'Technical Round', status: 'Scheduled', img: 'https://i.pravatar.cc/150?u=a048581f4e29026701d' },
];

const TodaysInterviews = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col">
      <div className="p-5 flex items-center justify-between border-b border-gray-50">
        <h3 className="text-lg font-bold text-gray-900">Today's Interviews</h3>
        <a href="#" className="text-sm font-semibold text-brand-green flex items-center gap-1 hover:underline">
          View Calendar <ArrowRight className="w-4 h-4" />
        </a>
      </div>
      
      <div className="p-3 flex-1 flex flex-col justify-between">
        <div className="space-y-3 px-2 py-1">
          {interviews.map((interview, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="text-sm font-bold text-brand-green w-12 pt-1 leading-tight">
                {interview.time.split(' ')[0]}<br />
                {interview.time.split(' ')[1]}
              </div>
              <div className="flex-1 flex items-center justify-between bg-gray-50/50 p-2.5 rounded-xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <img src={interview.img} alt={interview.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-bold text-gray-900">{interview.name}</p>
                    <p className="text-xs text-gray-600">{interview.role}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">Interview Round: {interview.round}</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-brand-green bg-brand-light px-2 py-0.5 rounded border border-brand-green/20">
                  {interview.status}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="pt-3 mt-auto border-t border-gray-50 text-center">
          <a href="#" className="text-sm font-semibold text-brand-green flex items-center justify-center gap-1 hover:underline">
            View All Interviews <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TodaysInterviews;
