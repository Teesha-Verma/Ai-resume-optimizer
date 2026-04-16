/**
 * Service Layer — Rejection Analysis
 *
 * All business logic for rejection post-mortem lives here.
 * API calls are attempted first; mock fallback ensures the app never breaks.
 */

import { analyzeRejection } from '../api/rejection';

// ── Mock data pools (moved from RejectionAnalysis.jsx) ──────────
const MISSING_KW_POOL = [
  ['Cloud Infrastructure (AWS/GCP)', 'GraphQL Integration', 'System Architecture Design'],
  ['Distributed Systems', 'Kubernetes Orchestration', 'Event‑Driven Architecture'],
  ['Data Engineering', 'Apache Kafka', 'Stream Processing'],
];

const WEAK_SECTIONS_POOL = [
  [
    'Summary section is too generic and lacks quantitative impact metrics.',
    'The most recent role description fails to articulate leadership capability despite the Senior title.'
  ],
  [
    'No quantifiable achievements in the last two positions.',
    'Skills section uses vague terms like "proficient" without evidence.'
  ],
];

const EXP_GAP_POOL = [
  ['The JD heavily relied on enterprise-scale data migration experience, which your resume only briefly touches upon in a single bullet point.'],
  ['The role requires 3+ years of ML ops experience, but your resume shows only project-level exposure.'],
];

const FMT_ISSUES_POOL = [
  [
    'Non-standard section headers detected ("Things I Did" instead of "Experience").',
    'Complex two-column layout likely broke the ATS parser resulting in missing work history.'
  ],
  [
    'Detected graphics/icons that will be ignored by ATS parsers.',
    'Inconsistent date formatting across experience entries.'
  ],
];

// ── Helpers ─────────────────────────────────────────────────────
function pickRandom(pool) {
  return pool[Math.floor(Math.random() * pool.length)];
}

// ── Mock Rejection Generator ────────────────────────────────────
export const generateMockRejection = () => {
  return {
    missingKeywords: pickRandom(MISSING_KW_POOL),
    weakSections: pickRandom(WEAK_SECTIONS_POOL),
    experienceGap: pickRandom(EXP_GAP_POOL),
    formattingIssues: pickRandom(FMT_ISSUES_POOL),
  };
};

// ── Main Entry Point — API-first with safe fallback ─────────────
export const runRejectionAnalysis = async (payload) => {
  try {
    const result = await analyzeRejection(payload);
    return result;
  } catch (err) {
    console.warn('API unavailable – using local mock rejection analysis:', err.message);

    try {
      // Fake latency to show loading state
      await new Promise(resolve => setTimeout(resolve, 2000));
      return generateMockRejection();
    } catch (fallbackErr) {
      console.error('Mock also failed:', fallbackErr);
      throw new Error('Rejection analysis completely failed');
    }
  }
};
