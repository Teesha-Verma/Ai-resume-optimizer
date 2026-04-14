/**
 * API Layer — Rejection Analysis
 * 
 * All backend calls for rejection post-mortem analysis go through here.
 */

const API_BASE = import.meta.env.VITE_API_BASE || '/api';

/**
 * Submit a resume + rejection email for post-mortem analysis.
 * @param {{ resumeText: string, rejectionEmail: string }} payload
 * @returns {Promise<object>} Structured rejection analysis
 */
export const analyzeRejection = async (payload) => {
  const res = await fetch(`${API_BASE}/rejection/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.message || `Rejection analysis failed (${res.status})`);
  }

  return res.json();
};
