import React, { useState } from 'react';
import TournamentCard from '../home/TournamentCard';
import { upcomingTournaments, pastTournaments } from '../../data/tournaments';

const TournamentsList = () => {
  const [showPast, setShowPast] = useState(false);
  const [filterMode, setFilterMode] = useState('all');
  
  // Combine and filter tournaments based on selected filters
  const tournaments = showPast ? pastTournaments : upcomingTournaments;
  const filteredTournaments = filterMode === 'all'
    ? tournaments
    : tournaments.filter(t => t.mode.toLowerCase() === filterMode);
  
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            {showPast ? 'Past Tournaments' : 'Upcoming Tournaments'}
          </h1>
          
          <div className="flex space-x-4">
            {/* Tournament type filter */}
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <button
                className={`px-3 py-1 text-sm ${filterMode === 'all' ? 'bg-yellow-500 text-black' : 'text-gray-300'}`}
                onClick={() => setFilterMode('all')}
              >
                All
              </button>
              <button
                className={`px-3 py-1 text-sm ${filterMode === 'solo' ? 'bg-yellow-500 text-black' : 'text-gray-300'}`}
                onClick={() => setFilterMode('solo')}
              >
                Solo
              </button>
              <button
                className={`px-3 py-1 text-sm ${filterMode === 'duo' ? 'bg-yellow-500 text-black' : 'text-gray-300'}`}
                onClick={() => setFilterMode('duo')}
              >
                Duo
              </button>
              <button
                className={`px-3 py-1 text-sm ${filterMode === 'squad' ? 'bg-yellow-500 text-black' : 'text-gray-300'}`}
                onClick={() => setFilterMode('squad')}
              >
                Squad
              </button>
            </div>
            
            {/* Past/Upcoming toggle */}
            <button
              className="px-3 py-1 text-sm bg-gray-800 rounded-lg text-gray-300 hover:bg-gray-700"
              onClick={() => setShowPast(!showPast)}
            >
              {showPast ? 'Show Upcoming' : 'Show Past'}
            </button>
          </div>
        </div>
        
        {filteredTournaments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTournaments.map((tournament) => (
              <TournamentCard
                key={tournament.id}
                tournament={tournament}
                showCountdown={!showPast}
              />
            ))}
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <p className="text-gray-400">
              No {filterMode !== 'all' ? filterMode + ' ' : ''}tournaments found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TournamentsList;
