import { ArrowRight } from 'lucide-react';

const applicants = [
  { name: 'Rahul Sharma', role: 'Accountant', roleColor: 'text-brand-green', time: '2 hrs ago', status: 'New', img: 'https://i.pravatar.cc/150?u=a042581f4e29026024d' },
  { name: 'Neha Patil', role: 'Senior Accountant', roleColor: 'text-brand-green', time: '4 hrs ago', status: 'New', img: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
  { name: 'Amit Verma', role: 'Tax Executive', roleColor: 'text-brand-green', time: '6 hrs ago', status: 'New', img: 'https://i.pravatar.cc/150?u=a048581f4e29026701d' },
  { name: 'Pooja Singh', role: 'Junior Accountant', roleColor: 'text-brand-green', time: '1 day ago', status: 'New', img: 'https://i.pravatar.cc/150?u=a04258a2462d826712d' },
];

const RecentApplications = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col">
      <div className="p-5 flex items-center justify-between border-b border-gray-50">
        <h3 className="text-lg font-bold text-gray-900">Recent Applications</h3>
        <a href="#" className="text-sm font-semibold text-brand-green flex items-center gap-1 hover:underline">
          View All <ArrowRight className="w-4 h-4" />
        </a>
      </div>
      
      <div className="p-3 flex-1 flex flex-col justify-between">
        <div className="space-y-1">
          {applicants.map((applicant, index) => (
            <div key={index} className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <img src={applicant.img} alt={applicant.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-bold text-gray-900">{applicant.name}</p>
                  <p className="text-xs text-gray-500">Applied for: <span className={applicant.roleColor}>{applicant.role}</span></p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400 mb-1">{applicant.time}</p>
                {applicant.status === 'New' && (
                  <span className="text-[10px] font-bold text-brand-green bg-brand-light px-2 py-0.5 rounded border border-brand-green/20">
                    New
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="pt-3 mt-2 border-t border-gray-50 text-center">
          <a href="#" className="text-sm font-semibold text-brand-green flex items-center justify-center gap-1 hover:underline">
            View All Applications <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default RecentApplications;
