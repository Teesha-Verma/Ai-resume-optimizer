import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { useAuth } from '../context/AuthContext';
import { 
  FileText, 
  BarChart2, 
  Trophy,
  ArrowRight,
  Clock,
  Sparkles
} from 'lucide-react';

// Helper to format relative time
function timeAgo(dateString) {
  if (!dateString) return '';
  const now = new Date();
  const past = new Date(dateString);
  const diffInSeconds = Math.floor((now - past) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
}

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { analyses, setActiveAnalysisId } = useResume();

  const totalAnalyses = analyses.length;
  const avgScore = totalAnalyses 
    ? Math.round(analyses.reduce((acc, curr) => acc + curr.score, 0) / totalAnalyses) 
    : 0;
  const bestScore = totalAnalyses
    ? Math.max(...analyses.map(a => a.score))
    : 0;

  const handleRowClick = (id) => {
    setActiveAnalysisId(id);
    navigate('/results');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-serif text-white mb-2">Welcome back, {user?.name?.split(' ')[0] || 'User'}</h1>
        <p className="text-gray-400">Here's what's happening with your resume optimization.</p>
      </div>

      {/* Stats Cluster */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0e1220] border border-white/5 p-6 rounded-2xl shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <FileText className="w-16 h-16 text-indigo-400" />
          </div>
          <p className="text-sm font-mono tracking-widest text-gray-400 mb-1 uppercase">Total Analyses</p>
          <p className="text-4xl font-bold text-white">{totalAnalyses}</p>
        </div>
        
        <div className="bg-[#0e1220] border border-white/5 p-6 rounded-2xl shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <BarChart2 className="w-16 h-16 text-indigo-400" />
          </div>
          <p className="text-sm font-mono tracking-widest text-gray-400 mb-1 uppercase">Avg Match Score</p>
          <p className="text-4xl font-bold text-white">{avgScore ? `${avgScore}%` : '--'}</p>
        </div>
        
        <div className="bg-[#0e1220] border border-white/5 p-6 rounded-2xl shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Trophy className="w-16 h-16 text-amber-400" />
          </div>
          <p className="text-sm font-mono tracking-widest text-gray-400 mb-1 uppercase">Best Score</p>
          <p className="text-4xl font-bold text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.3)]">{bestScore ? `${bestScore}%` : '--'}</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-[#0e1220] border border-white/5 rounded-2xl shadow-lg overflow-hidden flex flex-col">
        <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
          {totalAnalyses > 0 && (
            <button 
              onClick={() => navigate('/analysis')}
              className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1"
            >
              New Analysis <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {totalAnalyses === 0 ? (
          /* Empty State */
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center mb-6">
              <Sparkles className="w-10 h-10 text-indigo-400" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">No analyses yet</h3>
            <p className="text-gray-400 max-w-md mb-8">
              Upload your resume and a target job description to get a detailed breakdown of your gaps and instant AI improvements.
            </p>
            <button 
              onClick={() => navigate('/analysis')}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] flex items-center gap-2"
            >
              Start New Analysis <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* Populated Table */
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-xs font-mono tracking-widest text-gray-500 uppercase">
                  <th className="px-6 py-4 font-semibold">Match Setup</th>
                  <th className="px-6 py-4 font-semibold">Status / Time</th>
                  <th className="px-6 py-4 font-semibold text-right">Match Score</th>
                  <th className="px-6 py-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[...analyses].reverse().map((analysis, i) => (
                  <tr 
                    key={analysis.id} 
                    onClick={() => handleRowClick(analysis.id)}
                    className="hover:bg-white/[0.02] transition-colors cursor-pointer group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                          <FileText className="w-5 h-5 text-indigo-400" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-200">Analysis #{analyses.length - i}</p>
                          <p className="text-sm text-gray-500 truncate max-w-[200px] sm:max-w-[300px]">
                            {analysis.jobDescription.substring(0, 40)}...
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Clock className="w-4 h-4 text-gray-500" />
                        {timeAgo(analysis.createdAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 font-medium">
                        {analysis.score}%
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-gray-400 group-hover:text-indigo-400 transition-colors p-2">
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}

export default Dashboard;
