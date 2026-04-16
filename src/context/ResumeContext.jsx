import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { runAnalysis } from '../services/analysisService';
import { generateVersionMeta } from '../services/improvementService';

const ResumeContext = createContext();

const DATA_VERSION = 'v1';
const STORAGE_KEY = 'aijo_resume_data';
const ACTIVE_ANALYSIS_KEY = 'aijo_active_analysis_id';

const DEFAULT_STATE = {
  analyses: [],
  versions: []
};

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

  // ── startAnalysis: delegates to service layer, context only stores result ──
  const startAnalysis = async (resumeText, jobDescription) => {
    setIsGlobalLoading(true);

    try {
      const result = await runAnalysis(resumeText, jobDescription);

      setData(prev => ({
        ...prev,
        analyses: [...prev.analyses, result]
      }));

      const finalId = result.id;
      setActiveAnalysisId(finalId);
      localStorage.setItem(ACTIVE_ANALYSIS_KEY, finalId);
      toast.success('Analysis Complete');

      return finalId; // let the component handle redirect
    } catch (err) {
      toast.error(err?.message || 'Analysis failed completely');
      throw err;
    } finally {
      setIsGlobalLoading(false);
    }
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
      score: generateVersionMeta(activeAnalysis?.score),
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
