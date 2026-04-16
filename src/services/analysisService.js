/**
 * Service Layer — Analysis
 *
 * All business logic for resume analysis lives here.
 * API calls are attempted first; mock fallback ensures the app never breaks.
 */

import { analyzeResume } from '../api/analysis';

// ── Data-realism pools (moved from ResumeContext) ──────────────
const MISSING_SKILLS_POOL = [
  ['Kubernetes', 'CI/CD pipelines', 'GraphQL'],
  ['Docker', 'Terraform', 'Microservices'],
  ['AWS Lambda', 'Redis', 'gRPC'],
  ['TypeScript', 'Jest', 'Cypress'],
  ['Python', 'Machine Learning', 'Data Pipelines'],
  ['System Design', 'API Gateway', 'OAuth 2.0'],
];

const WEAK_AREAS_POOL = [
  [
    'Impact metrics in your recent role are missing.',
    'Action verbs are repetitive (used "Responsible for" 4 times).',
    'Summary section focuses too much on objective rather than value offer.'
  ],
  [
    'Quantifiable achievements are absent from the last two positions.',
    'Too many generic phrases like "team player" and "hard worker".',
    'Education section is placed above experience despite 5+ years of work history.'
  ],
  [
    'No mention of cross-functional collaboration despite senior-level roles.',
    'Bullet points exceed 2 lines, reducing scannability.',
    'Skills section uses a paragraph format instead of a scannable list.'
  ],
];

const ATS_WARNINGS_POOL = [
  [
    'Found multiple columns. ATS systems struggle to parse complex layouts.',
    'Missing standard header "EXPERIENCE".'
  ],
  [
    'Detected tables in your resume. Most ATS parsers cannot read table cells.',
    'Non-standard date format detected. Use "MMM YYYY" for consistency.'
  ],
  [
    'Header/footer content detected — ATS systems typically skip these areas.',
    'File contains images or icons that will be ignored by automated parsers.'
  ],
];

// ── Helpers ─────────────────────────────────────────────────────
function pickRandom(pool) {
  return pool[Math.floor(Math.random() * pool.length)];
}

export function deriveConfidence(score) {
  if (score >= 75) return 'HIGH';
  if (score >= 55) return 'MEDIUM';
  return 'LOW';
}

// ── Mock Analysis Generator (existing logic preserved) ──────────
export const generateMockAnalysis = (resumeText, jobDescription) => {
  const score = Math.floor(Math.random() * 41) + 50; // 50-90

  return {
    id: `analysis_${Date.now()}`,
    resumeText,
    jobDescription,
    score,
    confidence: deriveConfidence(score),
    breakdown: {
      skills: Math.floor(Math.random() * 31) + 50,     // 50-80
      keywords: Math.floor(Math.random() * 31) + 55,   // 55-85
      experience: Math.floor(Math.random() * 36) + 35   // 35-70
    },
    missingSkills: pickRandom(MISSING_SKILLS_POOL),
    weakAreas: pickRandom(WEAK_AREAS_POOL),
    atsWarnings: pickRandom(ATS_WARNINGS_POOL),
    improvedContent:
      `Here is the AI generated improved content block.\n\n` +
      `Previously you said: "Responsible for managing databases".\n\n` +
      `Improved: "Architected and managed distributed PostgreSQL databases, reducing latency by 40%."`,
    createdAt: new Date().toISOString()
  };
};

// ── Main Entry Point — API-first with safe fallback ─────────────
export const runAnalysis = async (resumeText, jobDescription) => {
  try {
    // Timeout protection: abort after 8 seconds
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const apiResult = await analyzeResume(
      { resumeText, jobDescription },
      { signal: controller.signal }
    );

    clearTimeout(timeout);

    // Normalise API result to expected shape
    return {
      id: apiResult.id || `analysis_${Date.now()}`,
      resumeText,
      jobDescription,
      score: apiResult.score,
      confidence: apiResult.confidence || deriveConfidence(apiResult.score),
      breakdown: apiResult.breakdown,
      missingSkills: apiResult.missingSkills,
      weakAreas: apiResult.weakAreas,
      atsWarnings: apiResult.atsWarnings,
      improvedContent: apiResult.improvedContent,
      createdAt: apiResult.createdAt || new Date().toISOString()
    };
  } catch (err) {
    // ── Fallback to mock (backward-compatible) ──
    console.warn('API unavailable – using local mock analysis:', err.message);

    try {
      // Fake latency to show the loading state
      await new Promise(resolve => setTimeout(resolve, 2100));
      return generateMockAnalysis(resumeText, jobDescription);
    } catch (fallbackErr) {
      console.error('Mock also failed:', fallbackErr);
      throw new Error('Analysis completely failed');
    }
  }
};
