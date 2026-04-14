import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

import { AuthProvider, useAuth } from './context/AuthContext';
import { ResumeProvider } from './context/ResumeContext';

import ProtectedRoute from './routes/ProtectedRoute';
import DashboardLayout from './components/layout/DashboardLayout';

import Dashboard from './pages/Dashboard';
import NewAnalysis from './pages/NewAnalysis';
import Results from './pages/Results';
import Improvement from './pages/Improvement';
import Versions from './pages/Versions';
import RejectionAnalysis from './pages/RejectionAnalysis';
import CustomCursor from './components/common/CustomCursor';

// Mock component to test logged in redirect
function LoginRedirectProxy({ children }) {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return children;
}

function App() {
  return (
    <AuthProvider>
      <ResumeProvider>
        <CustomCursor />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginRedirectProxy><LandingPage /></LoginRedirectProxy>} />
            <Route path="/login" element={<LoginRedirectProxy><LoginPage /></LoginRedirectProxy>} />
            <Route path="/signup" element={<LoginRedirectProxy><SignupPage /></LoginRedirectProxy>} />
            
            {/* Protected SaaS Routes */}
            <Route element={<ProtectedRoute />}>
              <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/analysis" element={<NewAnalysis />} />
                <Route path="/analysis/new" element={<NewAnalysis />} />
                <Route path="/results" element={<Results />} />
                <Route path="/improvement" element={<Improvement />} />
                <Route path="/versions" element={<Versions />} />
                <Route path="/rejection" element={<RejectionAnalysis />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
        
        {/* Global Toast Notifications */}
        <Toaster 
          position="bottom-right" 
          toastOptions={{
            style: {
              background: '#141828',
              color: '#f0f4ff',
              border: '1px solid rgba(255,255,255,0.1)',
              fontFamily: '"DM Sans", sans-serif'
            },
            success: {
              iconTheme: {
                primary: '#14b8a6',
                secondary: '#141828',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#141828',
              },
            }
          }}
        />
      </ResumeProvider>
    </AuthProvider>
  );
}

export default App;
