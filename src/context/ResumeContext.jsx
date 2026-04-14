import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

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

  // Actions
  const startAnalysis = async (resumeText, jobDescription) => {
    setIsGlobalLoading(true);
    
    // Fake latency to show off the cool loading state
    await new Promise(resolve => setTimeout(resolve, 2100));
    
    const newId = `analysis_${Date.now()}`;
    
    const mockResult = {
      id: newId,
      resumeText,
      jobDescription,
      score: Math.floor(Math.random() * 40) + 50, // random 50-90
      breakdown: {
        skills: 65,
        keywords: 80,
        experience: 50,
      },
      missingSkills: ['Kubernetes', 'CI/CD pipelines', 'GraphQL'],
      weakAreas: [
        'Impact metrics in your recent role are missing.',
        'Action verbs are repetitive (used "Responsible for" 4 times).',
        'Summary section focuses too much on objective rather than value offer.'
      ],
      atsWarnings: [
        'Found multiple columns. ATS systems struggle to parse complex layouts.',
        'Missing standard header "EXPERIENCE".'
      ],
      improvedContent: `Here is the AI generated improved content block.\n\n` +
        `Previously you said: "Responsible for managing databases".\n\n` +
        `Improved: "Architected and managed distributed PostgreSQL databases, reducing latency by 40%."`,
      createdAt: new Date().toISOString()
    };

    setData(prev => ({
      ...prev,
      analyses: [...prev.analyses, mockResult]
    }));
    
    setActiveAnalysisId(newId);
    localStorage.setItem(ACTIVE_ANALYSIS_KEY, newId);
    setIsGlobalLoading(false);
    toast.success('Analysis Complete in 2.1s');
    
    return newId; // let the component handle redirect
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
