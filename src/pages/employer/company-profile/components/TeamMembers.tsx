import React from 'react';
import { Users, Mail, Phone, Shield, Edit3, PlusCircle } from 'lucide-react';
import type { TeamMemberData } from '../services/employerService';

interface TeamMembersProps {
  members: TeamMemberData[];
  onEdit?: () => void;
}

const TeamMembers: React.FC<TeamMembersProps> = ({ members, onEdit }) => {
  const uniqueMembers = (members || []).filter((member, index, self) =>
    index === self.findIndex((m) =>
      (m._id && m._id === member._id) ||
      (m.id && member.id && m.id === member.id) ||
      (m.name.trim().toLowerCase() === member.name.trim().toLowerCase() &&
        m.designation.trim().toLowerCase() === member.designation.trim().toLowerCase())
    )
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Users className="w-5 h-5 text-gray-400" /> Team Members ({uniqueMembers.length})
        </h3>
        {onEdit && (
          <button
            onClick={onEdit}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            {uniqueMembers.length === 0 ? <PlusCircle className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5" />}
            {uniqueMembers.length === 0 ? 'Add Team Member' : 'Manage Team'}
          </button>
        )}
      </div>

      {uniqueMembers.length === 0 ? (
        <div className="text-center py-8 text-gray-500 border border-dashed border-gray-200 rounded-xl">
          <Users className="w-8 h-8 text-gray-300 mx-auto mb-2" />
          <p className="text-sm font-semibold">No team members added yet</p>
          <p className="text-xs text-gray-400 mt-1">Add key leaders and hiring managers in your firm</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {uniqueMembers.map((member, idx) => (
            <div
              key={member._id || member.id || idx}
              className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-brand-light text-brand-green font-bold flex items-center justify-center shrink-0 text-base border border-brand-green/20">
                {member.name.substring(0, 2).toUpperCase()}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-gray-900">{member.name}</h4>
                  <span className="text-[10px] font-semibold text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-200">
                    {member.role || 'Member'}
                  </span>
                </div>
                <p className="text-xs text-gray-600 font-medium">{member.designation || '-'}</p>
                <div className="pt-2 text-[11px] text-gray-500 space-y-1">
                  {member.email && (
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-3 h-3 text-gray-400" /> {member.email}
                    </div>
                  )}
                  {member.phone && (
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3 h-3 text-gray-400" /> {member.phone}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamMembers;
