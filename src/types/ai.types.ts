export interface NaturalLanguageExtractRequest {
  text: string;
}

export interface ExtractedCriteria {
  city?: string;
  universityArea?: string;
  neighborhood?: string;
  minRent?: number;
  maxRent?: number;
  bedrooms?: number;
  minStudents?: number;
  maxStudents?: number;
  furnished?: boolean;
  maxWalkingMinutes?: number;
  amenities?: string[];
  rawSummary?: string;
}

export interface MatchScoreRequest {
  listingId: string;
  studentProfile?: {
    university?: string;
    maxBudget?: number;
    preferredBedrooms?: number;
    requiredAmenities?: string[];
    maxWalkingMinutes?: number;
  };
  criteria?: Record<string, any>;
}

export interface MatchScoreResponse {
  score: number; // 0 to 100
  confidence: number; // 0 to 1
  explanation: string;
  breakdown?: {
    budgetMatch: number;
    distanceMatch: number;
    amenitiesMatch: number;
    cohortFit: number;
  };
  pros?: string[];
  cons?: string[];
}

export type RiskSeverity = 'HIGH' | 'MEDIUM' | 'LOW' | 'FAIR';

export interface ClauseFinding {
  type: string;
  severity: RiskSeverity;
  title: string;
  text: string;
  explanation: string;
  recommendation: string;
  clauseIndex?: number;
}

export interface LeaseAnalyzeRequest {
  documentStorageKey?: string;
  text?: string;
  listingId?: string;
}

export interface LeaseAnalyzeResponse {
  riskScore: number; // 0 (safest) to 100 (highest risk)
  riskLevel: 'LOW_RISK' | 'MODERATE_RISK' | 'HIGH_RISK';
  summary: string;
  findings: ClauseFinding[];
  clauses?: Array<{
    title: string;
    originalText: string;
    analysis: string;
    isFlagged: boolean;
  }>;
  modelName?: string;
  modelVersion?: string;
}
