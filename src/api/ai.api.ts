import { apiClient } from './client';
import { ApiResponse } from '../types/common.types';
import {
  ExtractedCriteria,
  LeaseAnalyzeRequest,
  LeaseAnalyzeResponse,
  MatchScoreRequest,
  MatchScoreResponse,
  NaturalLanguageExtractRequest,
} from '../types/ai.types';

export const aiApi = {
  // Extract search filter criteria from free-form natural language text
  async extractRequirements(
    payload: NaturalLanguageExtractRequest
  ): Promise<ApiResponse<ExtractedCriteria>> {
    return apiClient.post('/ai/extract-requirements', payload, {
      timeout: 8000,
    });
  },

  // Calculate AI Match Score between student preferences and a listing
  async getMatchScore(
    payload: MatchScoreRequest
  ): Promise<ApiResponse<MatchScoreResponse>> {
    return apiClient.post('/ai/match-score', payload, {
      timeout: 8000,
    });
  },

  // Analyze lease document draft or text for clauses and risk assessment
  async analyzeLease(
    payload: LeaseAnalyzeRequest
  ): Promise<ApiResponse<LeaseAnalyzeResponse>> {
    return apiClient.post('/ai/lease-analyze', payload, {
      timeout: 10000,
    });
  },
};
