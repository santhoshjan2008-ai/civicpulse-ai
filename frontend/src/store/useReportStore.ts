import { create } from 'zustand';
import { Report, ReportStatus, Priority, ReportCategory, HotspotArea, UserRole } from '../types/report';
import { INITIAL_REPORTS } from '../mocks/reports';
import { HOTSPOT_AREAS } from '../mocks/hotspots';

interface FilterState {
  category: string;
  priority: string;
  status: string;
  ward: string;
  searchQuery: string;
}

interface ReportStore {
  reports: Report[];
  hotspots: HotspotArea[];
  activeRole: UserRole;
  selectedReport: Report | null;
  filters: FilterState;
  myReportIds: string[]; // Track reports created in this session by user

  // Actions
  setActiveRole: (role: UserRole) => void;
  setSelectedReport: (report: Report | null) => void;
  setFilters: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;
  
  addReport: (report: Omit<Report, 'id' | 'createdAt' | 'updatedAt' | 'duplicateCount' | 'statusHistory'>) => Report;
  mergeReportInto: (masterId: string, newReportData: { citizenName?: string; note?: string }) => void;
  updateReportStatus: (id: string, status: ReportStatus, note?: string, actor?: string) => void;
  assignReport: (id: string, department: string, team?: string) => void;
  resetToMockData: () => void;
  
  getFilteredReports: () => Report[];
  getReportById: (id: string) => Report | undefined;
}

const STORAGE_KEY = 'civicpulse_reports_v1';
const MY_REPORTS_KEY = 'civicpulse_my_reports';

function loadInitialReports(): Report[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Failed to parse saved reports from localStorage', e);
  }
  return INITIAL_REPORTS;
}

function loadMyReportIds(): string[] {
  try {
    const saved = localStorage.getItem(MY_REPORTS_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    // ignore
  }
  return ['REP-2026-0101']; // default seed so citizen has 1 to track
}

const initialFilters: FilterState = {
  category: 'ALL',
  priority: 'ALL',
  status: 'ALL',
  ward: 'ALL',
  searchQuery: '',
};

export const useReportStore = create<ReportStore>((set, get) => ({
  reports: loadInitialReports(),
  hotspots: HOTSPOT_AREAS,
  activeRole: 'citizen',
  selectedReport: null,
  filters: initialFilters,
  myReportIds: loadMyReportIds(),

  setActiveRole: (role) => set({ activeRole: role }),
  setSelectedReport: (report) => set({ selectedReport: report }),

  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),

  resetFilters: () => set({ filters: initialFilters }),

  addReport: (newReportData) => {
    const now = new Date().toISOString();
    const newId = `REP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newReport: Report = {
      ...newReportData,
      id: newId,
      duplicateCount: 0,
      status: 'Submitted',
      statusHistory: [
        {
          status: 'Submitted',
          timestamp: now,
          note: 'Initial report submitted via CivicPulse mobile capture',
          actor: newReportData.citizenName || 'Citizen'
        }
      ],
      createdAt: now,
      updatedAt: now,
    };

    set((state) => {
      const updatedReports = [newReport, ...state.reports];
      const updatedMyIds = [newId, ...state.myReportIds];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReports));
      localStorage.setItem(MY_REPORTS_KEY, JSON.stringify(updatedMyIds));
      return {
        reports: updatedReports,
        myReportIds: updatedMyIds,
      };
    });

    return newReport;
  },

  mergeReportInto: (masterId: string, newReportData) => {
    const now = new Date().toISOString();
    set((state) => {
      const updatedReports = state.reports.map((r) => {
        if (r.id === masterId) {
          const newDuplicateCount = r.duplicateCount + 1;
          const newScore = Math.min(99, r.priorityScore + 6);
          const newPriority: Priority = newScore >= 85 ? 'Critical' : newScore >= 65 ? 'High' : r.priority;
          const newReasons = Array.from(new Set([
            ...r.priorityReasons,
            `Additional citizen endorsement logged (${newDuplicateCount} total)`
          ]));

          return {
            ...r,
            duplicateCount: newDuplicateCount,
            priorityScore: newScore,
            priority: newPriority,
            priorityReasons: newReasons,
            updatedAt: now,
            statusHistory: [
              ...r.statusHistory,
              {
                status: r.status,
                timestamp: now,
                note: `Merged duplicate report from citizen (${newReportData.note || 'Confirmed same issue'})`,
                actor: newReportData.citizenName || 'Citizen'
              }
            ]
          };
        }
        return r;
      });

      const updatedMyIds = Array.from(new Set([...state.myReportIds, masterId]));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReports));
      localStorage.setItem(MY_REPORTS_KEY, JSON.stringify(updatedMyIds));

      return {
        reports: updatedReports,
        myReportIds: updatedMyIds
      };
    });
  },

  updateReportStatus: (id: string, status: ReportStatus, note?: string, actor?: string) => {
    const now = new Date().toISOString();
    set((state) => {
      const updatedReports = state.reports.map((r) => {
        if (r.id === id) {
          return {
            ...r,
            status,
            updatedAt: now,
            statusHistory: [
              ...r.statusHistory,
              {
                status,
                timestamp: now,
                note: note || `Status updated to ${status}`,
                actor: actor || 'Municipal Authority'
              }
            ]
          };
        }
        return r;
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReports));
      return { reports: updatedReports };
    });
  },

  assignReport: (id: string, department: string, team?: string) => {
    const now = new Date().toISOString();
    set((state) => {
      const updatedReports = state.reports.map((r) => {
        if (r.id === id) {
          return {
            ...r,
            status: 'Assigned' as ReportStatus,
            assignedDepartment: department,
            assignedTeam: team || r.assignedTeam,
            updatedAt: now,
            statusHistory: [
              ...r.statusHistory,
              {
                status: 'Assigned' as ReportStatus,
                timestamp: now,
                note: `Dispatched to ${department}${team ? ` (${team})` : ''}`,
                actor: 'Control Room Coordinator'
              }
            ]
          };
        }
        return r;
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReports));
      return { reports: updatedReports };
    });
  },

  resetToMockData: () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(MY_REPORTS_KEY);
    set({
      reports: INITIAL_REPORTS,
      myReportIds: ['REP-2026-0101'],
      filters: initialFilters,
    });
  },

  getFilteredReports: () => {
    const { reports, filters } = get();
    return reports.filter((report) => {
      if (filters.category !== 'ALL' && report.category !== filters.category) {
        return false;
      }
      if (filters.priority !== 'ALL' && report.priority !== filters.priority) {
        return false;
      }
      if (filters.status !== 'ALL' && report.status !== filters.status) {
        return false;
      }
      if (filters.ward !== 'ALL' && !report.ward.includes(filters.ward)) {
        return false;
      }
      if (filters.searchQuery.trim() !== '') {
        const q = filters.searchQuery.toLowerCase();
        const matchesTitle = report.title.toLowerCase().includes(q);
        const matchesDesc = report.description.toLowerCase().includes(q);
        const matchesAddress = report.location.address.toLowerCase().includes(q);
        const matchesId = report.id.toLowerCase().includes(q);
        const matchesCat = report.category.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesAddress && !matchesId && !matchesCat) {
          return false;
        }
      }
      return true;
    });
  },

  getReportById: (id: string) => {
    return get().reports.find((r) => r.id === id);
  }
}));

