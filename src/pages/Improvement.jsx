import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
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

function Improvement() {
  const navigate = useNavigate();
  const { activeAnalysisId, analyses, saveImprovementVersion } = useResume();
  const activeAnalysis = analyses.find(a => a.id === activeAnalysisId);

  // We enforce guard but mock up some diff blocks for the UI
  const [blocks, setBlocks] = useState([]);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  useEffect(() => {
    if (activeAnalysis && blocks.length === 0) {
      // Mock diffing blocks for demonstration since we don't have a real structural AI diff parser backend 
      // In a real app the AI backend returns these segmented blocks
      setBlocks([
        {
          id: 1,
          type: 'summary',
          original: 'Responsible for managing databases and helping the team with deployments.',
          improved: 'Architected and managed distributed PostgreSQL databases, accelerating deployment times by 40%.',
          status: 'pending' // 'pending', 'accepted', 'rejected'
        },
        {
          id: 2,
          type: 'experience',
          original: 'Used React to build the frontend. It was good.',
          improved: 'Spearheaded frontend development utilizing React and Redux, delivering a scalable UI architecture to 10,000+ DAU.',
          status: 'pending'
        },
        {
          id: 3,
          type: 'skills',
          original: 'Skills: JS, HTML, CSS, Git, Docker maybe',
          improved: 'Technical Skills: JavaScript (ES6+), HTML5, CSS3, Git Version Control, Docker Containerization',
          status: 'pending'
        }
      ]);
    }
  }, [activeAnalysis, blocks.length]);

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

  const handleSave = () => {
    const changesMade = blocks.filter(b => b.status === 'accepted').length;
    
    // Simulate merge
    const finalContent = blocks.map(b => {
      // Manual edits supersede, but here we just do accepted -> improved, else original
      if (b.status === 'accepted') return b.improved;
      return b.original;
    }).join('\n\n');

    saveImprovementVersion(finalContent, changesMade);
    navigate('/versions');
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
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(79,70,229,0.3)]"
          >
            <Save className="w-4 h-4" /> Save Version
          </button>
        </div>
      </div>

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

    </div>
  );
}

// Simple icon
function SparkleDiffIcon() {
  return <SplitSquareHorizontal className="w-4 h-4" />
}

export default Improvement;
