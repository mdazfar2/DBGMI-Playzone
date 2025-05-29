import React, { useState } from 'react';
import { Trophy, Search, ArrowUpDown } from 'lucide-react';
import Card from '../common/Card';
import { tournamentResults } from '../../data/winners';
import { formatCurrency } from '../../utils/helpers';

// Combine all winners from all tournaments for a global leaderboard
const getAllWinners = () => {
  let allWinners = [];

  tournamentResults.forEach(result => {
    result.winners.forEach(winner => {
      const existingWinner = allWinners.find(w => w.playerOrTeamId === winner.playerOrTeamId);

      if (existingWinner) {
        existingWinner.totalPrize += winner.prizeWon;
        existingWinner.totalKills += winner.kills;
        existingWinner.tournaments += 1;

        if (winner.position < existingWinner.bestPosition) {
          existingWinner.bestPosition = winner.position;
        }
      } else {
        allWinners.push({
          playerOrTeamId: winner.playerOrTeamId,
          playerOrTeamName: winner.playerOrTeamName,
          totalPrize: winner.prizeWon,
          totalKills: winner.kills,
          tournaments: 1,
          bestPosition: winner.position,
        });
      }
    });
  });

  return allWinners;
};

const LeaderboardTable = () => {
  const [sortBy, setSortBy] = useState('totalPrize');
  const [sortOrder, setSortOrder] = useState('desc');
  const [searchQuery, setSearchQuery] = useState('');

  const allWinners = getAllWinners();

  const filteredWinners = allWinners.filter(winner =>
    winner.playerOrTeamName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedWinners = [...filteredWinners].sort((a, b) => {
    let comparison = 0;

    if (sortBy === 'playerOrTeamName') {
      comparison = a.playerOrTeamName.localeCompare(b.playerOrTeamName);
    } else {
      comparison = a[sortBy] < b[sortBy] ? -1 : 1;
    }

    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const getSortIcon = (column) => {
    if (sortBy !== column) return null;

    return (
      <ArrowUpDown
        size={14}
        className={`inline ml-1 transform ${sortOrder === 'asc' ? 'rotate-180' : ''}`}
      />
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-8">
        Leaderboard
      </h1>

      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search player or team..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-10 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-yellow-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-800 border-b border-gray-700">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Rank
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('playerOrTeamName')}
                >
                  Player/Team {getSortIcon('playerOrTeamName')}
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('totalPrize')}
                >
                  Total Winnings {getSortIcon('totalPrize')}
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('bestPosition')}
                >
                  Best Position {getSortIcon('bestPosition')}
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('totalKills')}
                >
                  Total Kills {getSortIcon('totalKills')}
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('tournaments')}
                >
                  Tournaments {getSortIcon('tournaments')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {sortedWinners.map((winner, index) => (
                <tr key={winner.playerOrTeamId} className="hover:bg-gray-800">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-white">
                        {index === 0 && <Trophy size={16} className="text-yellow-500 inline mr-1" />}
                        {index + 1}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">{winner.playerOrTeamName}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-yellow-500">{formatCurrency(winner.totalPrize)}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${
                      winner.bestPosition === 1 ? 'text-yellow-500' :
                      winner.bestPosition === 2 ? 'text-gray-300' :
                      winner.bestPosition === 3 ? 'text-yellow-700' : 'text-gray-400'
                    }`}>
                      #{winner.bestPosition}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">{winner.totalKills}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">{winner.tournaments}</div>
                  </td>
                </tr>
              ))}

              {sortedWinners.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-4 py-8 text-center text-gray-400">
                    No results found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default LeaderboardTable;
