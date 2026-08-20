import React from 'react';
import { MapPin, Edit3 } from 'lucide-react';
import map from '../../../../assets/map.png.png';
import type { CompanyAddressData } from '../services/employerService';

interface CompanyAddressCardProps {
  address: CompanyAddressData | null;
  onEdit?: () => void;
}

const CompanyAddressCard: React.FC<CompanyAddressCardProps> = ({ address, onEdit }) => {
  const addressLine = address?.registeredAddress || '-';
  const cityState = [address?.city, address?.state, address?.pincode].filter(Boolean).join(', ') || '-';
  const country = address?.country || '-';

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-gray-400" /> Company Address
        </h3>
        {onEdit && (
          <button
            onClick={onEdit}
            className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" /> Edit Address
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div>
          <h4 className="text-sm font-bold text-gray-900 mb-2">Registered Address</h4>
          {addressLine === '-' && cityState === '-' ? (
            <p className="text-sm text-gray-400 italic">No address provided yet.</p>
          ) : (
            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
              {addressLine !== '-' && <>{addressLine}<br /></>}
              {cityState !== '-' && <>{cityState}<br /></>}
              {country !== '-' && <>{country}</>}
            </p>
          )}
        </div>
        <div className="h-32 rounded-xl border border-gray-200 overflow-hidden">
          <img src={map} alt="Office Location" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default CompanyAddressCard;
