import React, { useEffect } from 'react';
import { MapPin, Edit3 } from 'lucide-react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import map from '../../../../assets/map.png.png';
import type { CompanyAddressData } from '../services/employerService';

// Fix Leaflet default marker icon path issue in Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Helper component to force Leaflet to recalculate container size when rendered
const MapResizer: React.FC = () => {
  const leafletMap = useMap();
  useEffect(() => {
    const timer = setTimeout(() => {
      leafletMap.invalidateSize();
    }, 150);
    return () => clearTimeout(timer);
  }, [leafletMap]);
  return null;
};

interface CompanyAddressCardProps {
  address: CompanyAddressData | null;
  onEdit?: () => void;
}

const CompanyAddressCard: React.FC<CompanyAddressCardProps> = ({ address, onEdit }) => {
  const addressLine = address?.registeredAddress || '-';
  const cityState = [address?.city, address?.state, address?.pincode].filter(Boolean).join(', ') || '-';
  const country = address?.country || '-';

  const lat = address?.latitude != null ? Number(address.latitude) : null;
  const lng = address?.longitude != null ? Number(address.longitude) : null;

  const hasCoordinates =
    lat !== null && lng !== null && !isNaN(lat) && !isNaN(lng) && lat !== 0 && lng !== 0;

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

        <div className="h-44 w-full rounded-xl border border-gray-200 overflow-hidden relative z-0 isolate shadow-xs">
          {hasCoordinates && lat !== null && lng !== null ? (
            <MapContainer
              key={`${lat}-${lng}`}
              center={[lat, lng]}
              zoom={15}
              scrollWheelZoom={false}
              dragging={false}
              doubleClickZoom={false}
              zoomControl={false}
              attributionControl={false}
              style={{ height: '100%', width: '100%' }}
            >
              <MapResizer />
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[lat, lng]} />
            </MapContainer>
          ) : (
            <img src={map} alt="Office Location Map" className="w-full h-full object-cover" />
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyAddressCard;