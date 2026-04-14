import React, { useState, useEffect, useMemo } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { getImprovementSuggestions } from '../api/improvement';
import { 
  Save, 
  RotateCcw, 
  Eye, 
  Check, 
  X,
  ArrowRight,
  SplitSquareHorizontal
} from 'lucide-react';
import toast from 'react-hot-toast';

// ── STEP 12: Extra mock block variants for realism ───────────
const MOCK_BLOCKS_POOL = [
  [
    {
      id: 1, type: 'summary',
      original: 'Responsible for managing databases and helping the team with deployments.',
      improved: 'Architected and managed distributed PostgreSQL databases, accelerating deployment times by 40%.',
      status: 'pending'
    },
    {
      id: 2, type: 'experience',
      original: 'Used React to build the frontend. It was good.',
      improved: 'Spearheaded frontend development utilizing React and Redux, delivering a scalable UI architecture to 10,000+ DAU.',
      status: 'pending'
    },
    {
      id: 3, type: 'skills',
      original: 'Skills: JS, HTML, CSS, Git, Docker maybe',
      improved: 'Technical Skills: JavaScript (ES6+), HTML5, CSS3, Git Version Control, Docker Containerization',
      status: 'pending'
    }
  ],
  [
    {
      id: 1, type: 'summary',
      original: 'I am a motivated software engineer looking for new opportunities.',
      improved: 'Results-driven full-stack engineer with 4+ years delivering high-throughput APIs and responsive web applications serving 50K+ users.',
      status: 'pending'
    },
    {
      id: 2, type: 'experience',
      original: 'Worked on backend services in my previous company.',
      improved: 'Designed and optimized RESTful microservices handling 2M+ daily requests with 99.9% uptime across AWS infrastructure.',
      status: 'pending'
    },
    {
      id: 3, type: 'skills',
      original: 'Python, SQL, some cloud stuff',
      improved: 'Core: Python 3.x, PostgreSQL, Redis | Cloud: AWS (EC2, Lambda, S3), Terraform | Tools: GitHub Actions, Datadog',
      status: 'pending'
    }
  ],
];
function pickRandom(pool) { return pool[Math.floor(Math.random() * pool.length)]; }
// ──────────────────────────────────────────────────────────────

function Improvement() {
  const navigate = useNavigate();
  const { activeAnalysisId, analyses, saveImprovementVersion } = useResume();
  const activeAnalysis = analyses.find(a => a.id === activeAnalysisId);

  const [blocks, setBlocks] = useState([]);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isLoadingBlocks, setIsLoadingBlocks] = useState(false); // STEP 5: local loading
  const [isSaving, setIsSaving] = useState(false);               // STEP 5 + 11: rapid-click

  useEffect(() => {
    if (!activeAnalysis || blocks.length > 0) return;

    let cancelled = false;

    const fetchBlocks = async () => {
      setIsLoadingBlocks(true);
      try {
        // STEP 4: try real API
        const data = await getImprovementSuggestions({
          analysisId: activeAnalysisId,
          resumeText: activeAnalysis.resumeText
        });
        if (!cancelled && data.blocks) {
          setBlocks(data.blocks.map(b => ({ ...b, status: b.status || 'pending' })));
        }
      } catch (_apiErr) {
        // ── Fallback: mock blocks (backward-compatible) ──
        console.warn('API unavailable – using local mock improvement blocks:', _apiErr.message);
        if (!cancelled) {
          setBlocks(pickRandom(MOCK_BLOCKS_POOL).map(b => ({ ...b })));
        }
      } finally {
        if (!cancelled) setIsLoadingBlocks(false);
      }
    };

    fetchBlocks();
    return () => { cancelled = true; };
  }, [activeAnalysis, activeAnalysisId, blocks.length]);

  // STEP 7: guard — redirect when no active analysis
  if (!activeAnalysis) {
    return <Navigate to="/analysis" replace />;
  }

  const handleAction = (id, action) => {
    setBlocks(prev => prev.map(b => b.id === id ? { ...b, status: action } : b));
  };

  const handleReset = () => {
    setBlocks(prev => prev.map(b => ({ ...b, status: 'pending' })));
    toast.success('Changes reset to pending.');
  };

  // STEP 9: selectedChanges derived state
  const selectedChanges = useMemo(() => blocks.filter(b => b.status === 'accepted'), [blocks]);
  const pendingCount = useMemo(() => blocks.filter(b => b.status === 'pending').length, [blocks]);

  const handleSave = async () => {
    // STEP 11: rapid-click prevention
    if (isSaving) return;

    // STEP 11: edge case — nothing accepted
    if (selectedChanges.length === 0) {
      toast.error('Accept at least one suggestion before saving.');
      return;
    }

    setIsSaving(true);
    try {
      // Simulate merge
      const finalContent = blocks.map(b => {
        if (b.status === 'accepted') return b.improved;
        return b.original;
      }).join('\n\n');

      saveImprovementVersion(finalContent, selectedChanges.length);
      navigate('/versions');
    } catch (err) {
      console.error('Save failed:', err);
      toast.error(err?.message || 'Failed to save version.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in duration-500 pb-20 space-y-6">

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <h1 className="text-3xl font-serif text-white mb-2">Interactive Studio</h1>
          <p className="text-gray-400">Review AI suggestions. Accept what you like, discard the rest.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={handleReset}
            className="p-2.5 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg transition-colors border border-white/5"
            title="Reset Changes"
            disabled={isSaving}
          >
            <RotateCcw className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors border flex items-center gap-2 ${
              isPreviewMode 
                ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/50 shadow-[0_0_15px_rgba(79,70,229,0.2)]' 
                : 'bg-white/5 hover:bg-white/10 text-gray-300 border-white/5'
            }`}
          >
            <Eye className="w-4 h-4" /> {isPreviewMode ? 'Editing Mode' : 'Preview Final'}
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving || selectedChanges.length === 0}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(79,70,229,0.3)]"
          >
            <Save className="w-4 h-4" /> {isSaving ? 'Saving...' : `Save Version (${selectedChanges.length})`}
          </button>
        </div>
      </div>

      {/* STEP 9: Selection summary bar */}
      {blocks.length > 0 && (
        <div className="flex items-center gap-4 text-xs font-mono tracking-widest uppercase text-gray-500">
          <span className="text-green-400">{selectedChanges.length} accepted</span>
          <span className="text-gray-600">•</span>
          <span className="text-red-400">{blocks.filter(b => b.status === 'rejected').length} rejected</span>
          <span className="text-gray-600">•</span>
          <span className="text-amber-400">{pendingCount} pending</span>
        </div>
      )}

      {/* Loading state for blocks */}
      {isLoadingBlocks ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 rounded-full border-3 border-indigo-500/20 border-t-indigo-500 animate-spin"></div>
          <span className="ml-3 text-gray-400 text-sm">Loading suggestions...</span>
        </div>
      ) : (
        <div className="bg-[#0e1220] border border-white/5 rounded-2xl shadow-lg overflow-hidden flex flex-col">
          {/* Header Grid Labels */}
          {!isPreviewMode && (
            <div className="grid grid-cols-2 bg-black/40 border-b border-white/5 px-6 py-3">
              <h3 className="font-mono text-xs uppercase tracking-widest text-red-400 flex items-center gap-2">
                 Original
              </h3>
              <h3 className="font-mono text-xs uppercase tracking-widest text-green-400 flex items-center gap-2 border-l border-white/5 pl-6">
                <SparkleDiffIcon /> AI Suggestion
              </h3>
            </div>
          )}

          {/* Content Area */}
          <div className="divide-y divide-white/5">
            {blocks.map((block) => (
              <div key={block.id} className="relative z-0 group hover:bg-white/[0.01] transition-colors">
                {isPreviewMode ? (
                  // PREVIEW MODE
                  <div className="p-8">
                    <div className="text-xs font-mono text-gray-600 mb-2 uppercase">{block.type}</div>
                    <p className="text-gray-200 text-lg leading-relaxed">
                      {block.status === 'accepted' ? block.improved : block.original}
                    </p>
                  </div>
                ) : (
                  // SPLIT MODE
                  <div className="grid grid-cols-1 lg:grid-cols-2 relative">
                    
                    {/* Action Overlay (Visible on hover between cols) */}
                    <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleAction(block.id, 'accepted')}
                        className={`p-2 rounded-full border transition-all shadow-lg ${
                          block.status === 'accepted' 
                            ? 'bg-green-500 text-black border-transparent' 
                            : 'bg-[#141828] text-gray-400 border-white/10 hover:border-green-500 hover:text-green-500'
                        }`}
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleAction(block.id, 'rejected')}
                        className={`p-2 rounded-full border transition-all shadow-lg ${
                          block.status === 'rejected' 
                            ? 'bg-red-500 text-white border-transparent' 
                            : 'bg-[#141828] text-gray-400 border-white/10 hover:border-red-500 hover:text-red-500'
                        }`}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Left: Original */}
                    <div className={`p-6 md:p-8 lg:pr-12 ${block.status === 'accepted' ? 'opacity-40 grayscale' : ''}`}>
                      <div className="text-[10px] font-mono text-gray-600 mb-3 uppercase">{block.type}</div>
                      <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10 text-red-200/80 leading-relaxed font-sans line-through decoration-red-500/30">
                        {block.original}
                      </div>
                    </div>

                    {/* Right: Improved */}
                    <div className={`p-6 md:p-8 lg:pl-12 lg:border-l border-white/5 ${block.status === 'rejected' ? 'opacity-40 grayscale' : ''}`}>
                      <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/10 text-green-100 leading-relaxed font-sans shadow-[inset_0_0_20px_rgba(34,197,94,0.02)]">
                        {block.improved}
                      </div>
                      {/* Status badge */}
                      <div className="mt-4 flex justify-end">
                         {block.status === 'accepted' && <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-400 bg-green-500/10 px-2 py-1 rounded border border-green-500/20"><Check className="w-3 h-3"/> Accepted</span>}
                         {block.status === 'rejected' && <span className="inline-flex items-center gap-1.5 text-xs font-medium text-red-400 bg-red-500/10 px-2 py-1 rounded border border-red-500/20"><X className="w-3 h-3"/> Rejected</span>}
                         {block.status === 'pending' && <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-500 bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20">Pending Decision</span>}
                      </div>
                    </div>

                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

// Simple icon
function SparkleDiffIcon() {
  return <SplitSquareHorizontal className="w-4 h-4" />
}

export default Improvement;
