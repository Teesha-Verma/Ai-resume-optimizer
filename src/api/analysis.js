/**
 * API Layer — Analysis
 * 
 * All backend calls for resume analysis go through here.
 * When a real backend is connected, only these functions need updating.
 * The rest of the app consumes them as async interfaces.
 */

const API_BASE = import.meta.env.VITE_API_BASE || '/api';

/**
 * Submit a resume + job description for analysis.
 * @param {{ resumeText: string, jobDescription: string }} payload
 * @returns {Promise<object>} Analysis result from backend
 */
export const analyzeResume = async (payload) => {
  const res = await fetch(`${API_BASE}/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.message || `Analysis failed (${res.status})`);
  }

  return res.json();
};

/**
 * Fetch a previously completed analysis by ID.
 * @param {string} analysisId
 * @returns {Promise<object>}
 */
export const getAnalysis = async (analysisId) => {
  const res = await fetch(`${API_BASE}/analyze/${analysisId}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch analysis (${res.status})`);
  }

  return res.json();
};
