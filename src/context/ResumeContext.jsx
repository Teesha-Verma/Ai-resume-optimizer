import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { analyzeResume } from '../api/analysis';

const ResumeContext = createContext();

const DATA_VERSION = 'v1';
const STORAGE_KEY = 'aijo_resume_data';
const ACTIVE_ANALYSIS_KEY = 'aijo_active_analysis_id';

const DEFAULT_STATE = {
  analyses: [],
  versions: []
};

// ── Data‑realism helpers (STEP 12) ─────────────────────────────
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

function pickRandom(pool) {
  return pool[Math.floor(Math.random() * pool.length)];
}

function deriveConfidence(score) {
  if (score >= 75) return 'HIGH';
  if (score >= 55) return 'MEDIUM';
  return 'LOW';
}
// ───────────────────────────────────────────────────────────────

export function ResumeProvider({ children }) {
  const [data, setData] = useState(DEFAULT_STATE);
  const [activeAnalysisId, setActiveAnalysisId] = useState(null);
  const [isGlobalLoading, setIsGlobalLoading] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.version === DATA_VERSION) {
          setData(parsed.data);
          
          const storedActiveId = localStorage.getItem(ACTIVE_ANALYSIS_KEY);
          if (storedActiveId) {
            setActiveAnalysisId(storedActiveId);
          }
        } else {
          // Version mismatch or corruption -> reset
          throw new Error('Data schema version mismatch or corruption');
        }
      }
    } catch (e) {
      console.warn('Resetting local storage state:', e);
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: DATA_VERSION, data: DEFAULT_STATE }));
      setData(DEFAULT_STATE);
    }
  }, []);

  // Save to local storage on data change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: DATA_VERSION, data }));
  }, [data]);

  const activeAnalysis = data.analyses.find(a => a.id === activeAnalysisId) || null;

  useEffect(() => {
    if (activeAnalysisId && !activeAnalysis) {
      setActiveAnalysisId(null);
      localStorage.removeItem(ACTIVE_ANALYSIS_KEY);
    }
  }, [activeAnalysisId, activeAnalysis]);

  // ── STEP 2 + 3 + 8 + 12: startAnalysis with API‑first, mock fallback ──
  const startAnalysis = async (resumeText, jobDescription) => {
    setIsGlobalLoading(true);

    const newId = `analysis_${Date.now()}`;
    let result;

    try {
      // Try real backend first
      const apiResult = await analyzeResume({ resumeText, jobDescription });
      result = {
        id: apiResult.id || newId,
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
    } catch (_apiErr) {
      // ── Fallback to existing mock logic (backward‑compatible) ──
      console.warn('API unavailable – using local mock analysis:', _apiErr.message);

      // Fake latency to show off the cool loading state
      await new Promise(resolve => setTimeout(resolve, 2100));

      const score = Math.floor(Math.random() * 41) + 50; // 50‑90

      result = {
        id: newId,
        resumeText,
        jobDescription,
        score,
        confidence: deriveConfidence(score),           // STEP 8
        breakdown: {
          skills: Math.floor(Math.random() * 31) + 50,   // 50‑80
          keywords: Math.floor(Math.random() * 31) + 55, // 55‑85
          experience: Math.floor(Math.random() * 36) + 35 // 35‑70
        },
        missingSkills: pickRandom(MISSING_SKILLS_POOL),   // STEP 12
        weakAreas: pickRandom(WEAK_AREAS_POOL),
        atsWarnings: pickRandom(ATS_WARNINGS_POOL),
        improvedContent:
          `Here is the AI generated improved content block.\n\n` +
          `Previously you said: "Responsible for managing databases".\n\n` +
          `Improved: "Architected and managed distributed PostgreSQL databases, reducing latency by 40%."`,
        createdAt: new Date().toISOString()
      };
    }

    setData(prev => ({
      ...prev,
      analyses: [...prev.analyses, result]
    }));

    const finalId = result.id;
    setActiveAnalysisId(finalId);
    localStorage.setItem(ACTIVE_ANALYSIS_KEY, finalId);
    setIsGlobalLoading(false);
    toast.success('Analysis Complete');

    return finalId; // let the component handle redirect
  };

  // ── addAnalysis: lets pages push external API results directly ──
  const addAnalysis = (analysisObj) => {
    setData(prev => ({
      ...prev,
      analyses: [...prev.analyses, analysisObj]
    }));
  };

  const saveImprovementVersion = (content, changesMade) => {
    const newVersion = {
      versionId: `v_${Date.now()}`,
      score: (activeAnalysis?.score || 0) + Math.floor(Math.random() * 10) + 5, // mock +5-15% increase
      content,
      changesMade,
      createdAt: new Date().toISOString()
    };
    
    setData(prev => ({
      ...prev,
      versions: [...prev.versions, newVersion]
    }));
    
    toast.success('New version saved successfully!');
  };

  return (
    <ResumeContext.Provider value={{
      analyses: data.analyses,
      versions: data.versions,
      activeAnalysisId,
      activeAnalysis,
      setActiveAnalysisId,
      isGlobalLoading,
      setIsGlobalLoading,
      startAnalysis,
      addAnalysis,
      saveImprovementVersion
    }}>
      {/* Global Loader Overlay */}
      {isGlobalLoading && (
        <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[var(--bg)]/90 backdrop-blur-sm transition-opacity">
          <div className="w-12 h-12 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin mb-4"></div>
          <p className="font-mono text-sm tracking-widest text-[var(--text)] uppercase animate-pulse">Running Analysis...</p>
        </div>
      )}
      
      {children}
    </ResumeContext.Provider>
  );
}

export const useResume = () => useContext(ResumeContext);
