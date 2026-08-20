import React from 'react';
import { Shield, CheckCircle2, FileText, Mail, Phone, Edit3 } from 'lucide-react';
import type { VerificationData } from '../services/employerService';

interface VerificationProps {
  verification: VerificationData | null;
  onEdit?: () => void;
}

const Verification: React.FC<VerificationProps> = ({ verification, onEdit }) => {
  const pan = verification?.panNumber || '-';
  const gst = verification?.gstNumber || '-';
  const reg = verification?.registrationNumber || '-';
  const email = verification?.contactEmail || '-';
  const phone = verification?.contactPhone || '-';
  const status = verification?.status || 'Pending Verification';

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Shield className="w-5 h-5 text-gray-400" /> Verification Status & Details
        </h3>
        {onEdit && (
          <button
            onClick={onEdit}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" /> Edit Verification
          </button>
        )}
      </div>

      <div className="p-4 rounded-xl border border-brand-green/20 bg-brand-light flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="w-6 h-6 text-brand-green" />
          <div>
            <h4 className="text-sm font-bold text-gray-900">Verification Status</h4>
            <p className="text-xs text-gray-600">{status}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-xs">
        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          <span className="text-gray-500 flex items-center gap-2">
            <FileText className="w-3.5 h-3.5 text-gray-400" /> PAN Number
          </span>
          <span className="font-semibold text-gray-900">{pan}</span>
        </div>

        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          <span className="text-gray-500 flex items-center gap-2">
            <FileText className="w-3.5 h-3.5 text-gray-400" /> GST Number
          </span>
          <span className="font-semibold text-gray-900">{gst}</span>
        </div>

        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          <span className="text-gray-500 flex items-center gap-2">
            <FileText className="w-3.5 h-3.5 text-gray-400" /> Registration Number
          </span>
          <span className="font-semibold text-gray-900">{reg}</span>
        </div>

        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          <span className="text-gray-500 flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-gray-400" /> Contact Email
          </span>
          <span className="font-semibold text-gray-900">{email}</span>
        </div>

        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          <span className="text-gray-500 flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-gray-400" /> Contact Phone
          </span>
          <span className="font-semibold text-gray-900">{phone}</span>
        </div>
      </div>
    </div>
  );
};

export default Verification;
