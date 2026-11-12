export type Priority = 'Critical' | 'High' | 'Medium' | 'Low';

export type ReportCategory = 
  | 'Waterlogging'
  | 'Road Damage'
  | 'Waste/Garbage'
  | 'Streetlight'
  | 'Water Supply'
  | 'Drainage'
  | 'Other';

export type ReportStatus = 
  | 'Submitted'
  | 'Verified'
  | 'Assigned'
  | 'In Progress'
  | 'Resolved';

export interface LocationCoords {
  lat: number;
  lng: number;
  address: string;
}

export interface StatusUpdate {
  status: ReportStatus;
  timestamp: string;
  note?: string;
  actor?: string;
}

export interface Report {
  id: string;
  title: string;
  description: string;
  aiSummary: string;
  category: ReportCategory;
  aiCategory?: ReportCategory;
  aiCategoryConfidence?: number;
  imageUrl?: string;
  location: LocationCoords;
  ward: string;
  priority: Priority;
  priorityScore: number; // 0-100
  priorityReasons: string[]; // Explainability reasons
  duplicateOf?: string; // id of master report if merged
  duplicateCount: number; // count of duplicate reports consolidated
  status: ReportStatus;
  statusHistory: StatusUpdate[];
  assignedDepartment?: string;
  assignedTeam?: string;
  createdAt: string;
  updatedAt: string;
  citizenName?: string;
  citizenPhone?: string;
}

export interface HotspotArea {
  id: string;
  ward: string;
  name: string;
  center: [number, number];
  reportCount: number;
  criticalCount: number;
  severityScore: number;
  topCategory: ReportCategory;
  recurringPattern?: string;
}

export interface AIDuplicateMatch {
  existingReport: Report;
  similarityScore: number; // 0-100%
  distanceMeters: number;
  matchReasons: string[];
}

export interface AIAnalysisResult {
  category: ReportCategory;
  categoryConfidence: number;
  summary: string;
  priority: Priority;
  priorityScore: number;
  priorityReasons: string[];
  duplicateMatch?: AIDuplicateMatch;
}

export type UserRole = 'citizen' | 'authority';

