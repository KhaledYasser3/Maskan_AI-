import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { CompareProvider } from './context/CompareContext';
import { ToastProvider } from './context/ToastContext';
import { ToastContainer } from './components/ui/Toast';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Core Student & Public Pages
import { HomePage } from './features/home/HomePage';
import { ExplorePage } from './features/explore/ExplorePage';
import { PropertyDetailsPage } from './features/details/PropertyDetailsPage';
import { ComparePage } from './features/compare/ComparePage';

// AI Intelligence & Interaction Pages
import { LeaseAnalyzerPage } from './features/lease-analyzer/LeaseAnalyzerPage';
import { AIMatchPage } from './features/ai-match/AIMatchPage';
import { MessagesPage } from './features/messages/MessagesPage';
import { ViewingsPage } from './features/viewings/ViewingsPage';

// Auth & Dashboard Portals
import { LoginPage } from './features/auth/LoginPage';
import { RegisterPage } from './features/auth/RegisterPage';
import { OwnerDashboardPage } from './features/owner-dashboard/OwnerDashboardPage';
import { AdminDashboardPage } from './features/admin-dashboard/AdminDashboardPage';

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <FavoritesProvider>
          <CompareProvider>
            <BrowserRouter>
              <div className="min-h-screen bg-surface flex flex-col justify-between antialiased">
                <Navbar />

                <main className="w-full pt-20 flex-1">
                  <Routes>
                    {/* Public & Student Exploration */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/explore" element={<ExplorePage />} />
                    <Route path="/properties/:id" element={<PropertyDetailsPage />} />
                    <Route path="/compare" element={<ComparePage />} />
                    
                    {/* AI Tools & Student Interactions */}
                    <Route path="/lease-analyzer" element={<LeaseAnalyzerPage />} />
                    <Route path="/ai-match" element={<AIMatchPage />} />
                    <Route path="/messages" element={<MessagesPage />} />
                    <Route path="/viewings" element={<ViewingsPage />} />

                    {/* Authentication */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    {/* Role-Based Portals */}
                    <Route path="/owner" element={<OwnerDashboardPage />} />
                    <Route path="/admin" element={<AdminDashboardPage />} />

                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </main>

                <Footer />
                <ToastContainer />
              </div>
            </BrowserRouter>
          </CompareProvider>
        </FavoritesProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
