import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, Textarea } from '../components/ui/Input';
import { TimerProgress } from '../components/report/TimerProgress';
import { PhotoUploader } from '../components/report/PhotoUploader';
import { VoiceInputButton } from '../components/report/VoiceInputButton';
import { CategoryPicker } from '../components/report/CategoryPicker';
import { LocationPickerMap } from '../components/report/LocationPickerMap';
import { ReportSuccessView } from '../components/report/ReportSuccessView';
import { ReportCategory, LocationCoords, Report } from '../types/report';
import { useReportStore } from '../store/useReportStore';
import { ArrowLeft, ArrowRight, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ReportPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addReport } = useReportStore();

  // Wizard step: 1 (Evidence & Description), 2 (Category), 3 (Location)
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedReport, setSubmittedReport] = useState<Report | null>(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [category, setCategory] = useState<ReportCategory | undefined>(undefined);
  const [location, setLocation] = useState<LocationCoords>({
    lat: 12.9756,
    lng: 77.6067,
    address: 'MG Road Metro Station Pillar 124, Ward 111',
  });
  const [citizenName, setCitizenName] = useState('Rahul Verma');
  const [citizenPhone, setCitizenPhone] = useState('+91 98450 12345');

  // AI Hook Suggestion (Phase 2 ready: keyword inference)
  const [suggestedCategory, setSuggestedCategory] = useState<ReportCategory | undefined>(undefined);

  // Inline Validation Errors
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
    category?: string;
    location?: string;
  }>({});

  // Initialize category from URL query if present (e.g., from Home category pill)
  useEffect(() => {
    const queryCat = searchParams.get('category') as ReportCategory;
    if (queryCat) {
      setCategory(queryCat);
    }
  }, [searchParams]);

  // Keyword auto-suggestion hook (lightweight precursor to full Phase 2 AI analyzer)
  useEffect(() => {
    const combined = `${title} ${description}`.toLowerCase();
    if (combined.match(/waterlog|flood|ponding|water depth|submerge/)) {
      setSuggestedCategory('Waterlogging');
    } else if (combined.match(/pothole|crater|asphalt|tarmac|road damage/)) {
      setSuggestedCategory('Road Damage');
    } else if (combined.match(/garbage|waste|trash|dump|stench|rubbish|bin/)) {
      setSuggestedCategory('Waste/Garbage');
    } else if (combined.match(/wire|shock|spark|streetlight|dark|pole|lamp/)) {
      setSuggestedCategory('Streetlight');
    } else if (combined.match(/pipe|burst|leak|water supply|drinking water|tap/)) {
      setSuggestedCategory('Water Supply');
    } else if (combined.match(/drain|sewer|manhole|sludge|blackwater|gutter/)) {
      setSuggestedCategory('Drainage');
    }
  }, [title, description]);

  // Handle Voice Input Transcript append
  const handleVoiceTranscript = (text: string) => {
    setDescription((prev) => (prev ? `${prev} ${text}` : text));
    if (!title) {
      // Set title as the first sentence
      setTitle(text.length > 50 ? `${text.slice(0, 47)}...` : text);
    }
  };

  // Step 1 Validation
  const validateStep1 = () => {
    const errs: typeof errors = {};
    if (!title.trim()) {
      errs.title = 'Please provide a short headline for the issue.';
    }
    if (!description.trim() || description.trim().length < 10) {
      errs.description = 'Please describe the problem with at least 10 characters.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Step 2 Validation
  const validateStep2 = () => {
    const errs: typeof errors = {};
    if (!category) {
      errs.category = 'Please choose a category to ensure correct department routing.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Step 3 Validation
  const validateStep3 = () => {
    const errs: typeof errors = {};
    if (!location.address.trim()) {
      errs.location = 'Please verify or search the location address.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!validateStep1()) return;
      // Auto-select suggested category if user hasn't chosen one yet
      if (suggestedCategory && !category) {
        setCategory(suggestedCategory);
      }
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (currentStep === 2) {
      if (!validateStep2()) return;
      setCurrentStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!validateStep3()) return;

    setIsSubmitting(true);

    // Simulate rapid municipal API registration (800ms)
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Baseline priority heuristics for Phase 1 (Phase 2 will plug full AI model)
    const text = `${title} ${description}`.toLowerCase();
    let priority: 'Critical' | 'High' | 'Medium' | 'Low' = 'Medium';
    let score = 55;
    const reasons: string[] = ['Standard citizen complaint logged in civic intake queue'];

    if (text.match(/wire|spark|accident|flood|pipe burst|open manhole|hazard|submerged/)) {
      priority = 'Critical';
      score = 92;
      reasons.push('High hazard keywords flagged in incident report description');
      reasons.push('Pedestrian or vehicular risk prioritized for immediate safety check');
    } else if (category === 'Waterlogging' || category === 'Road Damage') {
      priority = 'High';
      score = 75;
      reasons.push('Infrastructure failure with potential commuter delay impact');
    }

    const created = addReport({
      title,
      description,
      aiSummary: `Citizen report: ${title}. Flagged for field verification.`,
      category: category || 'Other',
      aiCategory: suggestedCategory || category || 'Other',
      aiCategoryConfidence: 0.94,
      imageUrl,
      location,
      ward: 'Ward 111 - Shantala Nagar',
      priority,
      priorityScore: score,
      priorityReasons: reasons,
      status: 'Submitted',
      citizenName,
      citizenPhone,
    });

    setIsSubmitting(false);
    setSubmittedReport(created);
  };

  const handleReset = () => {
    setTitle('');
    setDescription('');
    setImageUrl(undefined);
    setCategory(undefined);
    setSuggestedCategory(undefined);
    setErrors({});
    setCurrentStep(1);
    setSubmittedReport(null);
  };

  // If successfully submitted, display celebratory success view
  if (submittedReport) {
    return <ReportSuccessView report={submittedReport} onReset={handleReset} />;
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-4 sm:py-6">
      {/* 60-second Timer & Step Indicator */}
      <TimerProgress
        currentStep={currentStep}
        totalSteps={3}
        isCompleted={false}
      />

      {/* Main Wizard Form Container */}
      <Card className="p-5 sm:p-7 border-slate-100 shadow-md">
        <form onSubmit={(e) => e.preventDefault()}>
          <AnimatePresence mode="wait">
            {/* STEP 1: EVIDENCE & DESCRIPTION */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                    Step 1: What happened?
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Snap a photo and tell us what needs fixing.
                  </p>
                </div>

                {/* Photo Uploader with Camera Capture */}
                <PhotoUploader
                  imageUrl={imageUrl}
                  onImageChange={setImageUrl}
                />

                {/* Issue Headline */}
                <Input
                  label="Headline / Title"
                  placeholder="e.g., Deep pothole causing skids near bus stop"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (errors.title) setErrors((prev) => ({ ...prev, title: undefined }));
                  }}
                  error={errors.title}
                />

                {/* Description with Voice Dictation */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-700 tracking-wide uppercase">
                      Problem Details
                    </label>
                    <VoiceInputButton onTranscript={handleVoiceTranscript} />
                  </div>
                  <Textarea
                    rows={3}
                    placeholder="Describe the hazard, water depth, traffic blockage, or urgent danger..."
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                      if (errors.description)
                        setErrors((prev) => ({ ...prev, description: undefined }));
                    }}
                    error={errors.description}
                  />
                </div>

                {/* Contact info for citizen updates */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <Input
                    label="Your Name"
                    placeholder="Citizen name"
                    value={citizenName}
                    onChange={(e) => setCitizenName(e.target.value)}
                  />
                  <Input
                    label="Mobile for SMS"
                    placeholder="+91..."
                    value={citizenPhone}
                    onChange={(e) => setCitizenPhone(e.target.value)}
                  />
                </div>

                {/* Next Step CTA */}
                <div className="pt-3">
                  <Button
                    type="button"
                    size="lg"
                    onClick={handleNext}
                    className="w-full font-bold shadow-md"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Next: Choose Category
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: CATEGORY PICKER */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                    Step 2: Choose Category
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Select the department or service area that handles this issue.
                  </p>
                </div>

                <CategoryPicker
                  selectedCategory={category}
                  onSelectCategory={(cat) => {
                    setCategory(cat);
                    if (errors.category) setErrors((prev) => ({ ...prev, category: undefined }));
                  }}
                  suggestedCategory={suggestedCategory}
                  error={errors.category}
                />

                {/* Back & Next Navigation */}
                <div className="flex gap-3 pt-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={handleBack}
                    leftIcon={<ArrowLeft className="w-4 h-4" />}
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    size="lg"
                    onClick={handleNext}
                    className="flex-1 font-bold shadow-md"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Next: Pin Location
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: LOCATION PICKER & CONFIRMATION */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                    Step 3: Confirm Location
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Pin the exact spot on the map so municipal field crews can locate it quickly.
                  </p>
                </div>

                <LocationPickerMap
                  location={location}
                  onChangeLocation={(newLoc) => {
                    setLocation(newLoc);
                    if (errors.location) setErrors((prev) => ({ ...prev, location: undefined }));
                  }}
                  error={errors.location}
                />

                {/* Review Brief before Submit */}
                <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/60 text-xs space-y-1">
                  <div className="flex justify-between text-slate-500">
                    <span>Issue:</span>
                    <span className="font-bold text-slate-800 truncate max-w-[200px]">{title}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Category:</span>
                    <span className="font-bold text-brand-700">{category}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Evidence:</span>
                    <span className="font-semibold text-slate-700">{imageUrl ? 'Photo attached' : 'Text only'}</span>
                  </div>
                </div>

                {/* Submit Actions */}
                <div className="flex gap-3 pt-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={handleBack}
                    leftIcon={<ArrowLeft className="w-4 h-4" />}
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    size="lg"
                    onClick={() => handleSubmit()}
                    isLoading={isSubmitting}
                    className="flex-1 font-bold shadow-md bg-brand-700 hover:bg-brand-800"
                    rightIcon={<Send className="w-4 h-4" />}
                  >
                    Submit Report
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </Card>
    </div>
  );
};

