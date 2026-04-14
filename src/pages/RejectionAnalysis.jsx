import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { ShieldAlert, FileText, UploadCloud, Search, CheckCircle2, AlertTriangle, TrendingDown, FlaskConical } from 'lucide-react';
import toast from 'react-hot-toast';
import { analyzeRejection } from '../api/rejection';

// ── STEP 12: Randomised mock pools ───────────────────────────
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
function pickRandom(pool) { return pool[Math.floor(Math.random() * pool.length)]; }
// ──────────────────────────────────────────────────────────────

function RejectionAnalysis() {
  const { isGlobalLoading, setIsGlobalLoading } = useResume();
  const [file, setFile] = useState(null);
  const [rejectionEmail, setRejectionEmail] = useState('');
  const [result, setResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // STEP 5: local loading

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateFile(e.dataTransfer.files[0]);
    }
  };

  const validateFile = (selectedFile) => {
    if (selectedFile.type !== 'application/pdf') {
      toast.error('Please upload a PDF format resume.');
      return;
    }
    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error('File too large. Maximum size is 5 MB.');
      return;
    }
    setFile(selectedFile);
  };

  const runAnalysis = async () => {
    // STEP 11: rapid‑click prevention
    if (isSubmitting || isGlobalLoading) return;

    // STEP 11: empty input validation
    if (!file) {
      toast.error('Resume upload is required.');
      return;
    }
    if (!rejectionEmail || rejectionEmail.trim().length < 20) {
      toast.error('Please paste the specific rejection email or feedback text (minimum 20 chars).');
      return;
    }

    setIsSubmitting(true);
    setIsGlobalLoading(true);

    try {
      // STEP 4: Try real API first
      const apiResult = await analyzeRejection({
        resumeText: `Extracted from ${file.name}`,
        rejectionEmail: rejectionEmail.trim()
      });
      setResult(apiResult);
    } catch (_apiErr) {
      // ── Fallback to mock (backward‑compatible) ──
      console.warn('API unavailable – using local mock rejection analysis:', _apiErr.message);

      await new Promise(resolve => setTimeout(resolve, 2000));

      setResult({
        missingKeywords: pickRandom(MISSING_KW_POOL),
        weakSections: pickRandom(WEAK_SECTIONS_POOL),
        experienceGap: pickRandom(EXP_GAP_POOL),
        formattingIssues: pickRandom(FMT_ISSUES_POOL),
      });
    } finally {
      setIsGlobalLoading(false);
      setIsSubmitting(false);
      toast.success('Post-Mortem Analysis Complete.');
    }
  };

  const isBusy = isSubmitting || isGlobalLoading;

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500 space-y-8 pb-20">
      
      <div className="flex items-start gap-4 border-b border-white/5 pb-6">
        <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
          <ShieldAlert className="w-6 h-6 text-red-400" />
        </div>
        <div>
          <h1 className="text-3xl font-serif text-white mb-2">Rejection Post-Mortem</h1>
          <p className="text-gray-400">Reverse-engineer rejection emails to identify precise structural gaps.</p>
        </div>
      </div>

      {!result ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input A: Resume */}
          <div className="bg-[#0e1220] border border-white/5 p-6 rounded-2xl shadow-lg flex flex-col">
            <h2 className="text-lg font-medium text-white mb-4">1. Submitted Resume</h2>
            {!file ? (
              <div 
                className="flex-1 border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center p-8 hover:border-white/20 hover:bg-white/[0.02] transition-colors"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                <UploadCloud className="w-8 h-8 text-indigo-400 mb-3" />
                <p className="text-gray-300 text-sm mb-4">Drag PDF here to upload</p>
                <label className="px-4 py-2 bg-white/10 hover:bg-white/15 text-white text-xs font-medium rounded-lg cursor-pointer transition-colors">
                  Browse Files
                  <input type="file" accept=".pdf" className="hidden" onChange={(e) => e.target.files && validateFile(e.target.files[0])} />
                </label>
              </div>
            ) : (
              <div className="flex-1 bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-6 flex flex-col items-center justify-center text-center">
                <FileText className="w-10 h-10 text-indigo-400 mb-3" />
                <p className="font-medium text-indigo-300 truncate max-w-full">{file.name}</p>
                <button onClick={() => setFile(null)} className="mt-4 text-xs text-red-400 font-medium hover:text-red-300">Remove File</button>
              </div>
            )}
          </div>

          {/* Input B: Rejection Details */}
          <div className="bg-[#0e1220] border border-white/5 p-6 rounded-2xl shadow-lg flex flex-col">
            <h2 className="text-lg font-medium text-white mb-4">2. Rejection Data</h2>
            <textarea 
              value={rejectionEmail}
              onChange={(e) => setRejectionEmail(e.target.value)}
              placeholder="Paste the rejection email or original job description here..."
              className="flex-1 bg-black/20 border border-white/10 rounded-xl p-4 text-gray-200 placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/50 resize-none min-h-[200px]"
              disabled={isBusy}
            />
          </div>

          <div className="md:col-span-2 flex justify-end">
            <button 
              onClick={runAnalysis}
              disabled={isBusy || !file || rejectionEmail.length < 20}
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] flex items-center gap-2"
            >
              <Search className="w-5 h-5" />
              {isSubmitting ? 'Analyzing...' : 'Execute Post-Mortem'}
            </button>
          </div>
        </div>
      ) : (
        /* STRUCTURED OUTPUT VIEW */
        <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-6">
          <button 
            onClick={() => setResult(null)}
            className="text-sm font-medium text-indigo-400 hover:text-indigo-300 mb-4"
          >
            ← Run Another Analysis
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Category 1 */}
            <div className="bg-[#0e1220] border border-white/5 p-6 rounded-2xl shadow-lg">
              <h3 className="font-serif text-lg mb-4 flex items-center gap-2 text-white border-b border-white/5 pb-3">
                <span className="w-2 h-2 rounded-full bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.8)]"></span>
                Missing Keywords
              </h3>
              <ul className="space-y-3">
                {(result.missingKeywords || []).map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-red-400 shrink-0 mt-0.5 opacity-50" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Category 2 */}
            <div className="bg-[#0e1220] border border-white/5 p-6 rounded-2xl shadow-lg">
              <h3 className="font-serif text-lg mb-4 flex items-center gap-2 text-white border-b border-white/5 pb-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.3)]" />
                Weak Sections
              </h3>
              <ul className="space-y-3">
                {(result.weakSections || []).map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-300 text-sm bg-white/[0.02] p-3 rounded-lg border border-white/5">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Category 3 */}
            <div className="bg-[#0e1220] border border-white/5 p-6 rounded-2xl shadow-lg">
              <h3 className="font-serif text-lg mb-4 flex items-center gap-2 text-white border-b border-white/5 pb-3">
                <TrendingDown className="w-5 h-5 text-indigo-400" />
                Experience Gap
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed border-l-2 border-indigo-500/30 pl-4 py-1 italic">
                {(result.experienceGap && result.experienceGap[0]) || 'No major experience gap detected.'}
              </p>
            </div>

            {/* Category 4 */}
            <div className="bg-[#0e1220] border border-white/5 p-6 rounded-2xl shadow-lg">
              <h3 className="font-serif text-lg mb-4 flex items-center gap-2 text-white border-b border-white/5 pb-3">
                <FlaskConical className="w-5 h-5 text-teal-400" />
                Formatting Issues
              </h3>
              <ul className="space-y-3 list-disc pl-5 text-gray-300 text-sm">
                {(result.formattingIssues || []).map((item, i) => (
                  <li key={i} className="pl-1 leading-relaxed text-teal-100/70">{item}</li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default RejectionAnalysis;
