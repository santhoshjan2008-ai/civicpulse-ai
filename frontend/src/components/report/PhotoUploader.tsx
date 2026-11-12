import React, { useRef } from 'react';
import { Camera, Upload, Trash2, Image as ImageIcon, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';

interface PhotoUploaderProps {
  imageUrl?: string;
  onImageChange: (url: string | undefined) => void;
  error?: string;
}

const DEMO_PHOTOS = [
  {
    label: 'Flooded Metro',
    url: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?w=800&auto=format&fit=crop&q=80',
    category: 'Waterlogging',
  },
  {
    label: 'Deep Road Crater',
    url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop&q=80',
    category: 'Road Damage',
  },
  {
    label: 'Overflowing Trash',
    url: 'https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?w=800&auto=format&fit=crop&q=80',
    category: 'Waste/Garbage',
  },
  {
    label: 'Exposed Cable Pole',
    url: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&auto=format&fit=crop&q=80',
    category: 'Streetlight',
  },
];

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({
  imageUrl,
  onImageChange,
  error,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onImageChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-700 tracking-wide uppercase">
          Incident Photo / Evidence
        </label>
        <span className="text-[11px] text-brand-700 font-semibold bg-brand-50 px-2 py-0.5 rounded-full">
          AI Vision Ready
        </span>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        capture="environment"
        className="hidden"
      />

      {imageUrl ? (
        <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-slate-900 shadow-inner group aspect-video sm:aspect-[21/9] max-h-56">
          <img
            src={imageUrl}
            alt="Uploaded incident preview"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end justify-between p-3.5">
            <span className="text-white text-xs font-medium flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full">
              <Camera className="w-3.5 h-3.5 text-emerald-400" /> Photo Attached
            </span>
            <Button
              type="button"
              variant="danger"
              size="sm"
              onClick={() => onImageChange(undefined)}
              leftIcon={<Trash2 className="w-3.5 h-3.5" />}
              className="rounded-xl shadow-md"
            >
              Remove
            </Button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            'flex flex-col items-center justify-center p-6 sm:p-8 rounded-3xl border-2 border-dashed transition-all duration-200 cursor-pointer bg-slate-50/70 hover:bg-slate-50 hover:border-brand-400 text-center group',
            error ? 'border-rose-300 bg-rose-50/20' : 'border-slate-200'
          )}
        >
          <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-brand-700 group-hover:scale-110 group-hover:bg-brand-50 transition-all duration-200 mb-3">
            <Camera className="w-7 h-7" />
          </div>
          <p className="text-sm font-bold text-slate-800">
            Snap photo or tap to browse
          </p>
          <p className="text-xs text-slate-400 mt-1 max-w-xs">
            Supports camera direct capture, JPG, PNG or WebP
          </p>

          <div className="mt-4 flex items-center gap-2">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-white text-slate-600 border border-slate-200 group-hover:border-brand-300 shadow-sm">
              <Upload className="w-3.5 h-3.5 inline mr-1 text-brand-600" />
              Upload Photo
            </span>
          </div>
        </div>
      )}

      {error && <p className="text-xs text-rose-500 font-medium pl-1">{error}</p>}

      {/* Demo helper presets for instant testing */}
      <div className="pt-1">
        <div className="flex items-center gap-1.5 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-brand-600" />
          <span className="text-[11px] font-bold text-slate-500">Quick Demo Samples:</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {DEMO_PHOTOS.map((demo) => (
            <button
              key={demo.label}
              type="button"
              onClick={() => onImageChange(demo.url)}
              className="text-[11px] px-2.5 py-1 rounded-xl bg-white hover:bg-brand-50 text-slate-700 hover:text-brand-800 border border-slate-200 hover:border-brand-300 font-medium transition-all shadow-2xs"
            >
              + {demo.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

