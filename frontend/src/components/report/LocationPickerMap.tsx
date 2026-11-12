import React, { useState, useEffect, useRef, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Navigation, Search, SlidersHorizontal, Check } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';
import { LocationCoords } from '../../types/report';

interface LocationPickerMapProps {
  location: LocationCoords;
  onChangeLocation: (location: LocationCoords) => void;
  error?: string;
}

// Preset popular demonstration areas in Bengaluru
const QUICK_PRESETS = [
  { name: 'MG Road Metro', lat: 12.9756, lng: 77.6067, address: 'MG Road Metro Station, Ward 111 (Shantala Nagar)' },
  { name: '100ft Indiranagar', lat: 12.9784, lng: 77.6408, address: '100 Feet Rd, near 12th Main, Indiranagar (Ward 80)' },
  { name: 'Koramangala 5th Blk', lat: 12.9348, lng: 77.6218, address: 'Jyoti Nivas College Rd, 5th Block Koramangala' },
  { name: 'HSR Layout 27th Main', lat: 12.9116, lng: 77.6389, address: '27th Main Rd, Sector 1, HSR Layout' },
  { name: 'Whitefield ITPL', lat: 12.9865, lng: 77.7315, address: 'ITPL Main Gate, Whitefield Main Road' },
  { name: 'Malleshwaram 8th Cross', lat: 12.9982, lng: 77.5714, address: '8th Cross Market Road, Malleshwaram' },
];

// Helper to create sleek custom Pin Icon using Leaflet DivIcon
const createCustomMarkerIcon = () => {
  return L.divIcon({
    className: 'custom-civic-marker',
    html: `
      <div style="position: relative; width: 36px; height: 36px; transform: translate(-50%, -100%);">
        <div style="position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 14px; height: 6px; background: rgba(15, 23, 42, 0.25); border-radius: 50%; filter: blur(1px);"></div>
        <div style="position: relative; width: 36px; height: 36px; background: #0D5C54; border: 3px solid #ffffff; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); box-shadow: 0 4px 14px rgba(13, 92, 84, 0.4); display: flex; align-items: center; justify-content: center;">
          <div style="transform: rotate(45deg); width: 10px; height: 10px; background: #ffffff; border-radius: 50%;"></div>
        </div>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
  });
};

// Map controller component to pan to new coordinates smoothly
function MapPanController({ coords }: { coords: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(coords, map.getZoom(), { duration: 0.8 });
  }, [coords, map]);
  return null;
}

// Draggable Marker Component
function DraggableMarker({
  position,
  onDragEnd,
}: {
  position: [number, number];
  onDragEnd: (lat: number, lng: number) => void;
}) {
  const markerRef = useRef<L.Marker>(null);
  const icon = useMemo(() => createCustomMarkerIcon(), []);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const latLng = marker.getLatLng();
          onDragEnd(latLng.lat, latLng.lng);
        }
      },
    }),
    [onDragEnd]
  );

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
      icon={icon}
    />
  );
}

// Click on map to reposition pin
function MapClickHandler({ onClick }: { onClick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export const LocationPickerMap: React.FC<LocationPickerMapProps> = ({
  location,
  onChangeLocation,
  error,
}) => {
  const [showManualCoords, setShowManualCoords] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [searchQuery, setSearchQuery] = useState(location.address || '');

  // Keep search input in sync if location address changes externally
  useEffect(() => {
    setSearchQuery(location.address);
  }, [location.address]);

  const handleDragOrClick = (lat: number, lng: number) => {
    // Generate approximate address or retain current address with updated coordinates
    const roundedLat = parseFloat(lat.toFixed(5));
    const roundedLng = parseFloat(lng.toFixed(5));
    onChangeLocation({
      lat: roundedLat,
      lng: roundedLng,
      address: location.address || `Pinned at ${roundedLat}, ${roundedLng}`,
    });
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false);
        const lat = parseFloat(position.coords.latitude.toFixed(5));
        const lng = parseFloat(position.coords.longitude.toFixed(5));
        onChangeLocation({
          lat,
          lng,
          address: 'Current GPS Location (Citizen device)',
        });
      },
      (err) => {
        setIsLocating(false);
        // Fallback to central Bengaluru
        console.warn('Geolocation failed or permission denied, using default', err);
        onChangeLocation({
          lat: 12.9716,
          lng: 77.5946,
          address: 'Cubbon Park Road, Central Bengaluru',
        });
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  };

  const handleSelectPreset = (preset: typeof QUICK_PRESETS[0]) => {
    onChangeLocation({
      lat: preset.lat,
      lng: preset.lng,
      address: preset.address,
    });
    setSearchQuery(preset.address);
  };

  const handleManualCoordChange = (field: 'lat' | 'lng', val: string) => {
    const num = parseFloat(val);
    if (!isNaN(num)) {
      onChangeLocation({
        ...location,
        [field]: num,
      });
    }
  };

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-700 tracking-wide uppercase">
          Incident Location
        </label>
        <span className="text-[11px] text-slate-500 font-medium">
          Drag pin or tap map to adjust
        </span>
      </div>

      {/* Address Search Bar & GPS Button */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1">
          <Input
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              onChangeLocation({
                ...location,
                address: e.target.value,
              });
            }}
            placeholder="Search street name, landmark, or ward..."
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>
        <Button
          type="button"
          variant="secondary"
          onClick={handleUseCurrentLocation}
          isLoading={isLocating}
          leftIcon={<Navigation className="w-4 h-4 text-brand-700" />}
          className="shrink-0 text-xs py-3"
        >
          My Location
        </Button>
      </div>

      {/* Quick Location Chips for rapid mobile reporting / demo */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-[10px] font-bold text-slate-400 shrink-0 uppercase tracking-wider">
          Presets:
        </span>
        {QUICK_PRESETS.map((preset) => (
          <button
            key={preset.name}
            type="button"
            onClick={() => handleSelectPreset(preset)}
            className={cn(
              'text-[11px] px-2.5 py-1 rounded-xl whitespace-nowrap font-medium transition-all shrink-0 border cursor-pointer',
              Math.abs(location.lat - preset.lat) < 0.001 && Math.abs(location.lng - preset.lng) < 0.001
                ? 'bg-brand-700 text-white border-brand-800 shadow-sm'
                : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200'
            )}
          >
            {preset.name}
          </button>
        ))}
      </div>

      {/* Interactive Map Box */}
      <div
        className={cn(
          'relative w-full h-64 sm:h-72 rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm bg-slate-100',
          error && 'border-rose-300 ring-2 ring-rose-500/20'
        )}
      >
        <MapContainer
          center={[location.lat, location.lng]}
          zoom={15}
          scrollWheelZoom={false}
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <DraggableMarker
            position={[location.lat, location.lng]}
            onDragEnd={handleDragOrClick}
          />
          <MapClickHandler onClick={handleDragOrClick} />
          <MapPanController coords={[location.lat, location.lng]} />
        </MapContainer>

        {/* Floating coordinate badge overlay */}
        <div className="absolute bottom-3 left-3 z-[1000] bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-slate-200/80 text-[11px] text-slate-700 font-mono shadow-md flex items-center gap-1.5 pointer-events-none">
          <MapPin className="w-3.5 h-3.5 text-brand-700" />
          <span>{location.lat.toFixed(4)}, {location.lng.toFixed(4)}</span>
        </div>
      </div>

      {/* Manual Coordinates Toggle */}
      <div className="pt-1">
        <button
          type="button"
          onClick={() => setShowManualCoords(!showManualCoords)}
          className="text-xs text-slate-500 hover:text-slate-800 font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>{showManualCoords ? 'Hide manual coordinates' : 'Enter GPS coordinates manually'}</span>
        </button>

        {showManualCoords && (
          <div className="grid grid-cols-2 gap-3 mt-2.5 p-3.5 bg-slate-50 rounded-2xl border border-slate-200/60">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                Latitude (N)
              </label>
              <input
                type="number"
                step="any"
                value={location.lat}
                onChange={(e) => handleManualCoordChange('lat', e.target.value)}
                className="w-full bg-white rounded-xl border border-slate-200 px-3 py-2 text-xs font-mono font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-brand-500"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                Longitude (E)
              </label>
              <input
                type="number"
                step="any"
                value={location.lng}
                onChange={(e) => handleManualCoordChange('lng', e.target.value)}
                className="w-full bg-white rounded-xl border border-slate-200 px-3 py-2 text-xs font-mono font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-brand-500"
              />
            </div>
          </div>
        )}
      </div>

      {error && <p className="text-xs text-rose-500 font-medium pl-1">{error}</p>}
    </div>
  );
};

