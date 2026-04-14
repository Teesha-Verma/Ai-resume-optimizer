import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { UploadCloud, FileText, X, AlertCircle, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

function NewAnalysis() {
  const navigate = useNavigate();
  const { startAnalysis, isGlobalLoading } = useResume();
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // STEP 5: local loading

  // File Handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      validateAndSetFile(droppedFile);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (selectedFile) => {
    // Ensure it's a PDF for realism
    if (selectedFile.type !== 'application/pdf') {
      toast.error('Invalid file format. Please upload a PDF.');
      return;
    }
    // STEP 11: file size guard
    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error('File too large. Maximum size is 5 MB.');
      return;
    }
    setFile(selectedFile);
  };

  const submitAnalysis = async (e) => {
    e.preventDefault();

    // STEP 11: rapid‑click prevention
    if (isSubmitting || isGlobalLoading) return;

    // STEP 11: strict validation
    if (!file) {
      toast.error('Please upload your resume PDF first.');
      return;
    }
    if (!jobDescription || jobDescription.trim().length === 0) {
      toast.error('Job Description is required.');
      return;
    }
    if (jobDescription.trim().length < 50) {
      toast.error('Please provide a more detailed Job Description (minimum 50 characters).');
      return;
    }

    // Since we don't have a real PDF parser, we pass a mock text representation
    const mockExtractedText = `Extracted Text from ${file.name}`;

    setIsSubmitting(true); // STEP 5: local loading ON
    
    try {
      // STEP 3: try API → fallback is handled inside startAnalysis
      await startAnalysis(mockExtractedText, jobDescription);
      navigate('/results');
    } catch (err) {
      // STEP 4: error handling
      console.error('Analysis Failed', err);
      toast.error(err?.message || 'An error occurred during analysis.');
    } finally {
      setIsSubmitting(false); // STEP 5: local loading OFF
    }
  };

  const isBusy = isSubmitting || isGlobalLoading;

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in duration-500 space-y-6">
      
      <div>
        <h1 className="text-3xl font-serif text-white mb-2">New Analysis Suite</h1>
        <p className="text-gray-400">Lock in your constraints and initiate a full spectrum analysis.</p>
      </div>

      <form onSubmit={submitAnalysis} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Left Column: Upload */}
          <div className="bg-[#0e1220] border border-white/5 p-6 rounded-2xl shadow-lg flex flex-col h-full">
            <h2 className="text-lg font-semibold text-white mb-4">1. Target Resume</h2>
            
            {!file ? (
              <div 
                className={`flex-1 border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-8 transition-colors ${
                  isDragging ? 'border-indigo-500 bg-indigo-500/5' : 'border-white/10 hover:border-white/20 hover:bg-white/[0.02]'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 text-indigo-400">
                  <UploadCloud className="w-8 h-8" />
                </div>
                <p className="text-gray-200 font-medium mb-1">Drag and drop your resume</p>
                <p className="text-gray-500 text-sm mb-6">Supported formats: PDF (Max 5MB)</p>
                
                <button 
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-6 py-2.5 bg-white/10 hover:bg-white/15 text-white text-sm font-medium rounded-lg transition-colors"
                  disabled={isBusy}
                >
                  Browse Files
                </button>
                <input 
                  type="file" 
                  accept="application/pdf"
                  className="hidden" 
                  ref={fileInputRef}
                  onChange={handleFileChange} 
                />
              </div>
            ) : (
              <div className="flex-1 bg-white/[0.02] border border-white/5 rounded-xl p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-gray-200 font-medium truncate max-w-[200px] sm:max-w-[250px]">{file.name}</p>
                    <p className="text-gray-500 text-sm">{(file.size / 1024 / 1024).toFixed(2)} MB • PDF</p>
                  </div>
                </div>
                <button 
                  type="button"
                  onClick={() => setFile(null)}
                  className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  disabled={isBusy}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}

            <div className="mt-4 flex items-start gap-2 text-sm text-gray-500">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0 text-amber-500/70" />
              <p>Ensure your resume is text-selectable for highest accuracy. Image-based PDFs may fail parsing.</p>
            </div>
          </div>

          {/* Right Column: Job Description */}
          <div className="bg-[#0e1220] border border-white/5 p-6 rounded-2xl shadow-lg flex flex-col h-full">
            <h2 className="text-lg font-semibold text-white mb-4">2. Job Description</h2>
            <div className="flex-1 flex flex-col">
              <textarea 
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the complete job description here... (e.g. Responsibilities, Requirements, Tech Stack)"
                className="flex-1 bg-black/20 border border-white/10 rounded-xl p-4 text-gray-200 placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 resize-none w-full"
                disabled={isBusy}
              />
              <div className={`text-xs mt-2 text-right ${jobDescription.length < 50 && jobDescription.length > 0 ? 'text-amber-500' : 'text-gray-500'}`}>
                {jobDescription.length} chars (aim for at least 300)
              </div>
            </div>
          </div>

        </div>

        {/* Action Footer */}
        <div className="flex justify-end pt-4">
          <button 
            type="submit"
            disabled={isBusy}
            className={`px-8 py-4 font-semibold rounded-xl text-lg transition-all flex items-center gap-2 ${
              isBusy
                ? 'bg-indigo-500/20 text-indigo-400/50 cursor-not-allowed border border-indigo-500/10'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)]'
            }`}
          >
            <Sparkles className="w-5 h-5" />
            {isSubmitting ? 'Processing...' : isGlobalLoading ? 'Initializing Analysis...' : 'Run Analysis'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewAnalysis;
