import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import TournamentCard from './TournamentCard';
import { upcomingTournaments } from '../../data/tournaments';

const UpcomingTournaments = () => {
  // Display only first 3 tournaments
  const displayedTournaments = upcomingTournaments.slice(0, 3);
  
  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Upcoming Tournaments
          </h2>
          <Link
            to="/tournaments"
            className="text-yellow-500 hover:text-yellow-400 flex items-center font-medium"
          >
            View All <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedTournaments.map((tournament) => (
            <TournamentCard
              key={tournament.id}
              tournament={tournament}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingTournaments;
