import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import TournamentsPage from './pages/TournamentsPage';
import TournamentDetailsPage from './pages/TournamentDetailsPage';
import RegistrationPage from './pages/RegistrationPage';
import RegistrationSuccessPage from './pages/RegistrationSuccessPage';
import RulesPage from './pages/RulesPage';
import LeaderboardPage from './pages/LeaderboardPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import RegistrationForm from './components/registration/RegistrationForm';
import LoadingScreen from './components/common/LoadingScreen';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-900 text-white">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tournaments" element={<TournamentsPage />} />
            <Route path="/tournaments/:id" element={<TournamentDetailsPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/register/:tournamentId" element={<RegistrationForm />} />
            <Route path="/registration-success" element={<RegistrationSuccessPage />} />
            <Route path="/rules" element={<RulesPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;