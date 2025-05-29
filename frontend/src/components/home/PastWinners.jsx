import React from 'react';
import { Trophy } from 'lucide-react';
import Card from '../common/Card';
import { tournamentResults } from '../../data/winners';
import { formatDate, formatCurrency } from '../../utils/helpers';

const PastWinners = () => {
  // Get the most recent tournament results
  const recentResults = tournamentResults.slice(0, 1)[0];
  
  if (!recentResults) {
    return null;
  }
  
  return (
    <section className="py-16 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
          Recent Champions
        </h2>
        
        <Card className="overflow-hidden">
          <div className="p-4 border-b border-gray-700 bg-gradient-to-r from-gray-900 to-gray-800">
            <h3 className="font-bold text-xl text-white">{recentResults.tournamentName}</h3>
            <p className="text-gray-400 text-sm mt-1">{formatDate(recentResults.date)}</p>
          </div>
          
          <div className="p-4">
            {recentResults.winners.map((winner) => {
              // Determine what trophy icon to show based on position
              let trophyColor = 'text-gray-500';
              if (winner.position === 1) trophyColor = 'text-yellow-500';
              else if (winner.position === 2) trophyColor = 'text-gray-300';
              else if (winner.position === 3) trophyColor = 'text-yellow-700';
              
              return (
                <div
                  key={`${winner.playerOrTeamId}-${winner.position}`}
                  className="mb-4 last:mb-0 p-3 rounded-lg bg-gray-900 flex items-center"
                >
                  <div className={`mr-3 ${trophyColor}`}>
                    <Trophy size={24} />
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-white">
                          {winner.position === 1 && '🏆 '}
                          {winner.playerOrTeamName}
                        </p>
                        <p className="text-sm text-gray-400">
                          Position: #{winner.position} • Kills: {winner.kills}
                        </p>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-bold text-yellow-500">
                          {formatCurrency(winner.prizeWon)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default PastWinners;
