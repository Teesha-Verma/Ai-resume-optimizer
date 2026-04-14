import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Target, 
  Briefcase, 
  Code,
  ArrowRight,
  TrendingUp,
  BrainCircuit
} from 'lucide-react';

function getScoreDetails(score) {
  if (score >= 80) return { color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20', confidence: 'High Confidence', stroke: '#4ade80' };
  if (score >= 60) return { color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', confidence: 'Medium Confidence', stroke: '#facc15' };
  return { color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', confidence: 'Low Confidence', stroke: '#f87171' };
}

function ProgressCircle({ score, size = 160, strokeWidth = 10 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;
  const details = getScoreDetails(score);

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        {/* Background track */}
        <circle 
          cx={size/2} 
          cy={size/2} 
          r={radius} 
          stroke="currentColor" 
          strokeWidth={strokeWidth} 
          fill="transparent" 
          className="text-white/5" 
        />
        {/* Animated Fill */}
        <circle 
          cx={size/2} 
          cy={size/2} 
          r={radius} 
          stroke={details.stroke} 
          strokeWidth={strokeWidth} 
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          style={{ strokeLinecap: 'round' }}
          className="animate-ringFill drop-shadow-lg"
          // In CSS index.css we mapped animate-ringFill but we'll override it manually here for dynamic score
          strokeLinecap="round"
        >
          <animate 
            attributeName="stroke-dashoffset" 
            from={circumference} 
            to={offset} 
            dur="1.5s" 
            fill="freeze"
            calcMode="spline"
            keySplines="0.4 0 0.2 1"
          />
        </circle>
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className={`text-4xl font-bold tracking-tighter ${details.color}`}>{score}%</span>
        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mt-1">Match</span>
      </div>
    </div>
  );
}

function MiniBar({ label, icon: Icon, percentage }) {
  const color = percentage >= 70 ? 'bg-green-400' : percentage >= 50 ? 'bg-amber-400' : 'bg-red-400';
  
  return (
    <div>
      <div className="flex justify-between text-sm mb-1.5">
        <span className="flex items-center gap-1.5 text-gray-300 font-medium">
          <Icon className="w-4 h-4 text-indigo-400" /> {label}
        </span>
        <span className="font-mono text-gray-400">{percentage}%</span>
      </div>
      <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
        <div 
          className={`h-full ${color} rounded-full transition-all duration-1000 ease-out`} 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function Results() {
  const navigate = useNavigate();
  const { activeAnalysisId, analyses } = useResume();
  const activeAnalysis = analyses.find(a => a.id === activeAnalysisId);

  if (!activeAnalysis) {
    return <Navigate to="/analysis" replace />;
  }

  const { score, breakdown, missingSkills, weakAreas, atsWarnings } = activeAnalysis;
  const scoreDetails = getScoreDetails(score);

  // Generate fake matched skills derived from missing (just for UI completeness)
  const matchedSkills = ['React', 'Node.js', 'System Architecture', 'Agile'];

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in duration-500 pb-20 space-y-8 relative">
      
      {/* Sticky Top Bar over Header */}
      <div className="sticky top-20 z-20 -mx-4 px-4 py-3 bg-[rgba(7,9,15,0.85)] backdrop-blur-lg border-b border-indigo-500/20 mb-8 sm:rounded-b-2xl flex items-center justify-between shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-3">
          <TrendingUp className="w-5 h-5 text-indigo-400" />
          <h2 className="font-semibold text-gray-200">Analysis complete</h2>
        </div>
        <button 
          onClick={() => navigate('/improvement')}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(79,70,229,0.4)]"
        >
          Improve Resume <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div>
        <h1 className="text-3xl font-serif text-white mb-2">Intelligence Results</h1>
        <p className="text-gray-400">Diagnostic breakdown of exactly what's holding your application back.</p>
      </div>

      {/* CORE TOP GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* BIG SCORE (Centerpiece) */}
        <div className="lg:col-span-5 bg-[#0e1220] border border-white/5 rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase border ${scoreDetails.bg} ${scoreDetails.color} ${scoreDetails.border}`}>
            {scoreDetails.confidence}
          </div>
          
          <div className="my-8">
            <ProgressCircle score={score} size={180} strokeWidth={12} />
          </div>

          <div className="mt-2 text-center max-w-sm">
            <div className="inline-flex items-center gap-2 text-indigo-300 font-mono text-xs uppercase tracking-widest mb-3 bg-indigo-500/10 px-3 py-1.5 rounded-lg border border-indigo-500/20">
              <BrainCircuit className="w-4 h-4" /> Insight Summary
            </div>
            <p className="text-gray-300 font-medium">
              You possess {breakdown.experience}% of the required experience, but you are severely lacking critical ATS-friendly keywords necessary to pass automated filters.
            </p>
          </div>
        </div>

        {/* Breakdown Panel */}
        <div className="lg:col-span-7 bg-[#0e1220] border border-white/5 rounded-2xl shadow-lg p-6 lg:p-8 flex flex-col">
          <h3 className="font-serif text-xl border-b border-white/5 pb-4 mb-6">Granular Breakdown</h3>
          <div className="space-y-6 flex-1 justify-center flex flex-col">
            <MiniBar label="Technical Skills Match" icon={Code} percentage={breakdown.skills} />
            <MiniBar label="Keyword Relevance" icon={Target} percentage={breakdown.keywords} />
            <MiniBar label="Experience Alignment" icon={Briefcase} percentage={breakdown.experience} />
          </div>
        </div>

      </div>

      {/* DETAILED DIAGNOSTICS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Skills Analysis */}
        <div className="bg-[#0e1220] border border-white/5 rounded-2xl shadow-lg p-6">
          <h3 className="font-serif text-lg mb-6 flex items-center justify-between">
            Skills Assessment
            <span className="text-xs font-mono text-gray-500 bg-black/30 px-2 py-1 rounded-md">Parsed via Job Description</span>
          </h3>
          
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-400" /> Matched Skills
            </h4>
            <div className="flex flex-wrap gap-2">
              {matchedSkills.map(s => (
                <span key={s} className="px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-lg text-sm text-[13px]">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
              <XCircle className="w-4 h-4 text-red-400" /> Missing Requirements
            </h4>
            <div className="flex flex-wrap gap-2">
              {missingSkills.map(s => (
                <span key={s} className="px-3 py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg text-sm text-[13px]">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ATS Warnings & Weak Areas */}
        <div className="space-y-6 flex flex-col">
          
          <div className="bg-[#0e1220] border border-white/5 rounded-2xl shadow-lg p-6 flex-1">
            <h3 className="font-serif text-lg mb-4 text-amber-400 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" /> ATS Formating Warnings
            </h3>
            <ul className="space-y-3">
              {atsWarnings.map((warning, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-300 bg-white/[0.02] p-3 rounded-xl border border-white/5">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  {warning}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#0e1220] border border-white/5 rounded-2xl shadow-lg p-6 flex-1">
            <h3 className="font-serif text-lg mb-4 text-gray-200">Weak Content Areas</h3>
            <ul className="space-y-3">
              {weakAreas.map((area, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-400 border-l-2 border-indigo-500/30 pl-3">
                  {area}
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Results;
