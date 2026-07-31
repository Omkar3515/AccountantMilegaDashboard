import { ArrowRight } from 'lucide-react';

const candidates = [
  { name: 'Ankit Tiwari', exp: '4.2 Yrs Exp.', salary: '₹ 4 - 6 LPA', score: '92%', skills: 'Tally, GST, Excel, Bank Reconciliation', img: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
  { name: 'Megha Kulkarni', exp: '3.6 Yrs Exp.', salary: '₹ 3.5 - 5 LPA', score: '88%', skills: 'Tally, Taxation, Excel, MIS Reporting', img: 'https://i.pravatar.cc/150?u=a042581f4e29026703d' },
];

const RecommendedCandidates = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col">
      <div className="p-5 flex items-center justify-between border-b border-gray-50">
        <h3 className="text-lg font-bold text-gray-900">Recommended Candidates</h3>
        <a href="#" className="text-sm font-semibold text-brand-green flex items-center gap-1 hover:underline">
          View All Candidates <ArrowRight className="w-4 h-4" />
        </a>
      </div>
      
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-4">
          {candidates.map((candidate, index) => (
            <div key={index} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
              <img src={candidate.img} alt={candidate.name} className="w-12 h-12 rounded-full object-cover" />
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-bold text-gray-900">{candidate.name}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                      <span>{candidate.exp}</span>
                      <span>{candidate.salary}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-brand-green">{candidate.score}</p>
                    <p className="text-[10px] text-gray-500">Match Score</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2 truncate">
                  {candidate.skills}
                </p>
                <div className="mt-3 text-right">
                  <button className="px-4 py-1 text-xs font-semibold text-brand-green border border-brand-green rounded-lg hover:bg-brand-light transition-colors">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="pt-3 mt-auto border-t border-gray-50 text-center">
          <a href="#" className="text-sm font-semibold text-brand-green flex items-center justify-center gap-1 hover:underline">
            View More Candidates <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default RecommendedCandidates;
