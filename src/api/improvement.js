/**
 * API Layer — Improvement
 * 
 * All backend calls for resume improvement / diff generation go through here.
 */

const API_BASE = import.meta.env.VITE_API_BASE || '/api';

/**
 * Request AI improvement suggestions for an analysis.
 * @param {{ analysisId: string, resumeText: string }} payload
 * @returns {Promise<{ blocks: Array<{ id: number, type: string, original: string, improved: string }> }>}
 */
export const getImprovementSuggestions = async (payload) => {
  const res = await fetch(`${API_BASE}/improve`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.message || `Improvement request failed (${res.status})`);
  }

  return res.json();
};

/**
 * Save a finalized improvement version.
 * @param {{ analysisId: string, content: string, changesMade: number }} payload
 * @returns {Promise<object>}
 */
export const saveImprovement = async (payload) => {
  const res = await fetch(`${API_BASE}/improve/save`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Failed to save improvement (${res.status})`);
  }

  return res.json();
};
