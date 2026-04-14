import React, { useState, useMemo } from 'react';
import { useResume } from '../context/ResumeContext';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { 
  History, 
  ArrowUpRight, 
  ArrowRight,
  Eye,
  Star,
  CheckCircle2
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cx(...inputs) { return twMerge(clsx(inputs)); }

// Format date short
function formatDate(isoString) {
  const d = new Date(isoString);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function Versions() {
  const { versions } = useResume();
  const [selectedVersion, setSelectedVersion] = useState(null);

  // 1. Data Integrity: Sort by date ASC for chart
  const sortedVersions = useMemo(() => {
    return [...versions].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }, [versions]);

  // Derived metrics
  const bestVersion = useMemo(() => {
    if (!versions.length) return null;
    return [...versions].sort((a, b) => b.score - a.score)[0];
  }, [versions]);

  const latestVersion = sortedVersions[sortedVersions.length - 1];

  const chartData = sortedVersions.map((v, i) => ({
    name: `V${i + 1}`,
    score: v.score,
    date: formatDate(v.createdAt)
  }));

  // Render Empty State
  if (versions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-in fade-in">
        <div className="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center mb-6">
          <History className="w-10 h-10 text-indigo-400" />
        </div>
        <h2 className="text-2xl font-serif text-white mb-2">No Saved Versions</h2>
        <p className="text-gray-400 max-w-md">
          Head over to the Improvement Studio to generate and save your first optimized resume iteration.
        </p>
      </div>
    );
  }

  // Detail View
  if (selectedVersion) {
    return (
      <div className="max-w-4xl mx-auto animate-in slide-in-from-right-4 duration-300">
        <button 
          onClick={() => setSelectedVersion(null)}
          className="text-indigo-400 hover:text-indigo-300 font-medium mb-6 flex items-center gap-2 group"
        >
          <ArrowRight className="w-4 h-4 rotate-180 transition-transform group-hover:-translate-x-1" />
          Back to Timeline
        </button>
        
        <div className="bg-[#0e1220] border border-white/5 rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-between border-b border-white/5 pb-6 mb-6">
            <div>
              <h2 className="text-2xl font-serif text-white flex items-center gap-3">
                {selectedVersion.versionId.split('_')[1]}
                {bestVersion?.versionId === selectedVersion.versionId && (
                  <span className="px-2.5 py-0.5 rounded-md bg-amber-500/10 text-amber-400 text-xs font-mono tracking-widest border border-amber-500/20 flex items-center gap-1">
                    <Star className="w-3 h-3" /> BEST
                  </span>
                )}
              </h2>
              <p className="text-gray-500 text-sm mt-1">{formatDate(selectedVersion.createdAt)}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-400">{selectedVersion.score}%</div>
              <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mt-1">Final Score</div>
            </div>
          </div>
          
          <div className="prose prose-invert max-w-none">
            <h3 className="text-lg font-medium text-gray-300 mb-4 flex items-center gap-2">
               <CheckCircle2 className="w-5 h-5 text-indigo-400" /> Final Optimized Payload
            </h3>
            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-xl whitespace-pre-wrap leading-relaxed text-gray-300 font-sans shadow-inner">
              {selectedVersion.content}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Dashboard View
  return (
    <div className="max-w-6xl mx-auto animate-in fade-in duration-500 space-y-8">
      
      <div>
        <h1 className="text-3xl font-serif text-white mb-2">Version Tracking</h1>
        <p className="text-gray-400">Monitor your empirical improvement across analysis iterations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* CHART SECTION */}
        <div className="lg:col-span-2 bg-[#0e1220] border border-white/5 rounded-2xl shadow-lg p-6">
          <h2 className="font-serif text-lg text-white mb-6">Progression Curve</h2>
          
          {chartData.length === 1 ? (
            <div className="h-[300px] flex items-center justify-center border-2 border-dashed border-white/5 rounded-xl bg-white/[0.01]">
              <p className="text-gray-500 text-sm">Save at least 2 versions to map your timeline.</p>
            </div>
          ) : (
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="rgba(255,255,255,0.2)" 
                    fontSize={12} 
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="rgba(255,255,255,0.2)" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    domain={['dataMin - 5', 'dataMax + 5']}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0e1220', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                    itemStyle={{ color: '#4ade80' }}
                    labelStyle={{ color: '#9ca3af', marginBottom: '4px' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#6366f1" 
                    strokeWidth={3}
                    dot={{ r: 4, fill: '#0e1220', stroke: '#6366f1', strokeWidth: 2 }}
                    activeDot={{ r: 6, fill: '#6366f1', stroke: '#fff', strokeWidth: 2 }}
                    animationDuration={1500}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* METRICS / STATS */}
        <div className="flex flex-col gap-6">
          <div className="bg-[#0e1220] border border-indigo-500/20 rounded-2xl shadow-[0_0_20px_rgba(79,70,229,0.1)] p-6 flex-1 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Star className="w-24 h-24 text-indigo-400" />
            </div>
            <p className="text-sm font-mono tracking-widest text-indigo-400 mb-2 uppercase flex items-center gap-2">
              <Star className="w-4 h-4" /> Personal Best
            </p>
            <p className="text-5xl font-bold text-white mb-2">{bestVersion.score}%</p>
            <p className="text-xs text-gray-500">Achieved on {formatDate(bestVersion.createdAt)}</p>
          </div>
          
          <div className="bg-[#0e1220] border border-white/5 rounded-2xl shadow-lg p-6 flex-1 flex flex-col justify-center">
            <p className="text-sm font-mono tracking-widest text-gray-400 mb-2 uppercase">Total Iterations</p>
            <p className="text-4xl font-bold text-gray-200">{versions.length}</p>
          </div>
        </div>

      </div>

      {/* VERSION TABLE */}
      <div className="bg-[#0e1220] border border-white/5 rounded-2xl shadow-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-white/5">
          <h2 className="text-lg font-semibold text-white">Version History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-xs font-mono tracking-widest text-gray-500 uppercase bg-black/20">
                <th className="px-6 py-4 font-semibold">Snapshot</th>
                <th className="px-6 py-4 font-semibold">Status / Tag</th>
                <th className="px-6 py-4 font-semibold text-right">Match Target</th>
                <th className="px-6 py-4 font-semibold text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[...sortedVersions].reverse().map((version, index) => {
                const isBest = version.versionId === bestVersion.versionId;
                const isLatest = version.versionId === latestVersion.versionId;
                
                // Calculate simple mock delta against an older version just for UI realism if available
                const olderVersion = sortedVersions[sortedVersions.length - 2 - index];
                const delta = olderVersion ? version.score - olderVersion.score : 0;

                return (
                  <tr key={version.versionId} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex flex-col items-center justify-center shrink-0">
                          <span className="text-[10px] text-indigo-400 font-mono leading-none mb-0.5">V</span>
                          <span className="text-sm text-indigo-300 font-bold leading-none">{sortedVersions.length - index}</span>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400 flex items-center gap-2">
                             {formatDate(version.createdAt)}
                          </p>
                          <p className="font-mono text-[10px] text-gray-600 tracking-wider hidden sm:block mt-0.5">
                            ID: {version.versionId.substring(0, 15)}...
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        {isLatest && (
                          <span className="px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 text-[10px] font-mono tracking-widest border border-indigo-500/20 uppercase">
                            Latest
                          </span>
                        )}
                        {isBest && (
                          <span className="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 text-[10px] font-mono tracking-widest border border-amber-500/20 uppercase flex items-center gap-1">
                            <Star className="w-3 h-3" /> Best
                          </span>
                        )}
                        {!isLatest && !isBest && (
                          <span className="text-gray-500 text-sm italic">Archived</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-lg font-bold text-gray-200">{version.score}%</span>
                        {delta !== 0 && (
                          <span className={cx(
                            "text-xs font-mono font-medium flex items-center gap-0.5",
                            delta > 0 ? "text-green-400" : "text-red-400"
                          )}>
                            {delta > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowUpRight className="w-3 h-3 rotate-180" />}
                            {Math.abs(delta)}%
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button 
                        onClick={() => setSelectedVersion(version)}
                        className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-colors inline-flex items-center gap-2 text-sm font-medium border border-white/5"
                      >
                        <Eye className="w-4 h-4 text-indigo-400" /> Detail
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default Versions;
