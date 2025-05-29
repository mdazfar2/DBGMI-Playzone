import React from 'react';
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

function App() {
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
            <Route path="/register/:tournamentId" element={<RegistrationPage />} />
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
