import { Report, ReportCategory, Priority, AIAnalysisResult, AIDuplicateMatch } from '../types/report';
import { calculateDistanceMeters } from '../utils/cn';

interface AnalyzeParams {
  title: string;
  description: string;
  category?: ReportCategory;
  location: { lat: number; lng: number; address: string };
  existingReports: Report[];
}

export async function analyzeReportWithAI(params: {
  title: string;
  description: string;
  userCategory?: ReportCategory;
  location: { lat: number; lng: number; address: string };
  existingReports: Report[];
}): Promise<AIAnalysisResult> {
  // Simulate AI network & inference latency (900ms - 1300ms)
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const text = `${params.title} ${params.description}`.toLowerCase();

  // 1. Keyword-based Categorization
  let inferredCategory: ReportCategory = params.userCategory || 'Other';
  let confidence = 0.88;

  if (text.match(/waterlog|flood|ponding|submerged|water depth|drown|waist-high|rainwater/)) {
    inferredCategory = 'Waterlogging';
    confidence = 0.97;
  } else if (text.match(/pothole|crater|asphalt|tarmac|road damage|manhole sunken|speed bump|rebar|tar/)) {
    inferredCategory = 'Road Damage';
    confidence = 0.98;
  } else if (text.match(/garbage|waste|trash|dump|stench|rubbish|bin|plastic|rotting|smell|dumpster/)) {
    inferredCategory = 'Waste/Garbage';
    confidence = 0.96;
  } else if (text.match(/wire|shock|spark|electroc|streetlight|dark|pole|lamp|light|blackout/)) {
    inferredCategory = 'Streetlight';
    confidence = 0.99;
  } else if (text.match(/pipe|burst|leak|water supply|drinking water|tap|muddy water|bwssb|pressure/)) {
    inferredCategory = 'Water Supply';
    confidence = 0.95;
  } else if (text.match(/drain|sewer|manhole|sludge|blackwater|gutter|culvert|overflow|sewage/)) {
    inferredCategory = 'Drainage';
    confidence = 0.94;
  }

  // If user selected category explicitly, respect it if confidence is low, otherwise suggest inferred
  const finalCategory = params.userCategory || inferredCategory;

  // 2. Generate One-Line AI Summary
  let summary = '';
  if (finalCategory === 'Waterlogging') {
    summary = 'Severe water accumulation impeding vehicle & pedestrian transit corridor.';
  } else if (finalCategory === 'Road Damage') {
    summary = 'Dangerous pavement deformation & structural road hazard posing accident threat.';
  } else if (finalCategory === 'Streetlight') {
    summary = 'Critical illumination loss or electrical hazard compromising commuter safety.';
  } else if (finalCategory === 'Waste/Garbage') {
    summary = 'Sanitary risk and urban obstruction from uncollected decomposing solid waste.';
  } else if (finalCategory === 'Water Supply') {
    summary = 'Disruption to essential municipal drinking water delivery and pipeline integrity.';
  } else if (finalCategory === 'Drainage') {
    summary = 'Storm sewer overflow and contaminated wastewater backflow hazard.';
  } else {
    summary = 'Civic infrastructure anomaly flagged for field inspection and prioritization.';
  }

  // 3. Duplicate Detection (<250m and similar category or keywords)
  let duplicateMatch: AIDuplicateMatch | undefined = undefined;
  let highestSim = 0;

  for (const existing of params.existingReports) {
    if (existing.status === 'Resolved') continue;

    const dist = calculateDistanceMeters(
      params.location.lat,
      params.location.lng,
      existing.location.lat,
      existing.location.lng
    );

    // Look for nearby reports within 200m
    if (dist <= 250) {
      const sameCategory = existing.category === finalCategory;
      const existingText = `${existing.title} ${existing.description}`.toLowerCase();
      
      // Compute simple word overlap similarity
      const wordsNew = new Set(text.split(/\s+/).filter(w => w.length > 3));
      const wordsExisting = new Set(existingText.split(/\s+/).filter(w => w.length > 3));
      let overlap = 0;
      wordsNew.forEach(w => {
        if (wordsExisting.has(w)) overlap++;
      });

      let similarityScore = sameCategory ? 60 : 20;
      if (wordsNew.size > 0) {
        similarityScore += Math.round((overlap / wordsNew.size) * 35);
      }
      if (dist < 50) similarityScore += 15;
      else if (dist < 100) similarityScore += 10;

      similarityScore = Math.min(99, similarityScore);

      if (similarityScore > 65 && similarityScore > highestSim) {
        highestSim = similarityScore;
        const reasons: string[] = [
          `Located only ${dist}m away from report #${existing.id}`,
          sameCategory ? `Matching category: ${finalCategory}` : 'Shared infrastructure zone',
          overlap > 1 ? 'Similar issue description keywords detected' : 'Adjacent geo-coordinates cluster'
        ];

        duplicateMatch = {
          existingReport: existing,
          similarityScore,
          distanceMeters: dist,
          matchReasons: reasons
        };
      }
    }
  }

  // 4. Priority Scoring & Explainability Engine
  let score = 40; // baseline
  const reasons: string[] = [];

  // Critical hazard keywords
  if (text.match(/spark|live wire|shock|electroc|fire|burning|toxic|smoke/)) {
    score += 40;
    reasons.push('High-voltage / fire electrocution hazard detected');
  }
  if (text.match(/accident|crash|fall|pedestrian slip|injury|casualty|ambulance/)) {
    score += 30;
    reasons.push('Active vehicular accident or pedestrian injury reported');
  }
  if (text.match(/school|hospital|clinic|kindergarten|elderly|children/)) {
    score += 25;
    reasons.push('Sensitive civic zone: near school, hospital, or high-pedestrian hub');
  }
  if (text.match(/open manhole|missing cover|sinkhole|10-foot|deep/)) {
    score += 35;
    reasons.push('Unguarded fatal fall hazard / deep subterranean void');
  }
  if (text.match(/metro|arterial|highway|main road|junction|traffic jam|gridlock/)) {
    score += 20;
    reasons.push('Major transit artery with high ripple-effect congestion');
  }
  if (text.match(/drinking water|contamination|brown water|vomiting|epidemic/)) {
    score += 35;
    reasons.push('Public health contamination risk in drinking water grid');
  }

  // If duplicate found, boost score
  if (duplicateMatch) {
    const existingCount = duplicateMatch.existingReport.duplicateCount + 1;
    score += Math.min(25, existingCount * 4);
    reasons.push(`Consolidated issue: reported ${existingCount} times recently in this zone`);
  }

  // Category specific baseline adjustments
  if (finalCategory === 'Waterlogging' && text.includes('submerged')) {
    score += 15;
    reasons.push('Submerged roadway creating hydroplaning risk');
  }

  // Default reason if empty
  if (reasons.length === 0) {
    reasons.push('Standard municipal maintenance queue evaluation');
    if (finalCategory === 'Road Damage') reasons.push('Pavement wear requiring asphalt maintenance');
    if (finalCategory === 'Waste/Garbage') reasons.push('Sanitation clearance scheduled for route');
    if (finalCategory === 'Streetlight') reasons.push('Illumination repair scheduled');
  }

  score = Math.min(99, Math.max(15, score));

  let priority: Priority = 'Low';
  if (score >= 85) priority = 'Critical';
  else if (score >= 65) priority = 'High';
  else if (score >= 40) priority = 'Medium';

  return {
    category: finalCategory,
    categoryConfidence: confidence,
    summary,
    priority,
    priorityScore: score,
    priorityReasons: reasons,
    duplicateMatch
  };
}

