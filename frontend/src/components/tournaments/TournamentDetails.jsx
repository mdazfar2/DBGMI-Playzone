import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, MapPin, Calendar, Clock, Trophy, AlertCircle, CheckCircle } from 'lucide-react';
import Button from '../common/Button';
import Card from '../common/Card';
import Countdown from '../home/Countdown';
import { getTournamentById } from '../../data/tournaments';
import { getResultsByTournamentId } from '../../data/winners';
import { formatCurrency, formatDate, formatTime } from '../../utils/helpers';

const TournamentDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [tournament, setTournament] = useState(undefined);
  const [results, setResults] = useState(undefined);
  
  useEffect(() => {
    if (id) {
      const tournamentData = getTournamentById(id);
      if (tournamentData) {
        setTournament(tournamentData);
        
        // Check if tournament has results
        const tournamentResults = getResultsByTournamentId(id);
        if (tournamentResults) {
          setResults(tournamentResults);
        }
      } else {
        // Tournament not found, redirect to tournaments page
        navigate('/tournaments');
      }
    }
  }, [id, navigate]);
  
  if (!tournament) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-white">Loading...</p>
      </div>
    );
  }
  
  const isPastTournament = new Date(tournament.date) < new Date();
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <button 
          onClick={() => navigate('/tournaments')}
          className="flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Tournaments
        </button>
      </div>
      
      <Card>
        <div className="p-6 border-b border-gray-800 bg-gradient-to-r from-gray-900 to-gray-800">
          <h2 className="font-bold text-2xl text-white">{tournament.name}</h2>
          
          {!isPastTournament && (
            <div className="mt-4">
              <p className="text-sm text-gray-400 mb-2">Tournament begins in:</p>
              <Countdown date={tournament.date} time={tournament.time} />
            </div>
          )}
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tournament details */}
            <div>
              <h3 className="font-bold text-lg text-white mb-4">Tournament Details</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin size={18} className="text-yellow-500 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-400">Map</p>
                    <p className="text-white">{tournament.map}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Users size={18} className="text-yellow-500 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-400">Mode</p>
                    <p className="text-white">{tournament.mode}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Calendar size={18} className="text-yellow-500 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-400">Date</p>
                    <p className="text-white">{formatDate(tournament.date)}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock size={18} className="text-yellow-500 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-400">Time</p>
                    <p className="text-white">{formatTime(tournament.time)}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Trophy size={18} className="text-yellow-500 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-400">Prize Pool</p>
                    <div className="space-y-1 mt-1">
                      {tournament.prizePools.map((prize) => (
                        <div key={prize.position} className="flex justify-between text-white">
                          <span>Position #{prize.position}</span>
                          <span className="font-bold">{formatCurrency(prize.amount)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {!isPastTournament && tournament.isRegistrationOpen && (
                <div className="mt-6">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Slots Available</span>
                    <span className="text-gray-300">
                      {tournament.slots - tournament.registeredPlayers}/{tournament.slots}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                    <div 
                      className="bg-yellow-500 h-2 rounded-full" 
                      style={{ width: `${(tournament.registeredPlayers / tournament.slots) * 100}%` }}
                    />
                  </div>
                  
                  <Button
                    variant="primary"
                    fullWidth
                    onClick={() => navigate(`/register/${tournament.id}`)}
                    disabled={tournament.registeredPlayers >= tournament.slots}
                  >
                    {tournament.registeredPlayers >= tournament.slots 
                      ? 'Tournament Full' 
                      : 'Register Now'}
                  </Button>
                </div>
              )}
            </div>
            
            {/* Rules and info */}
            <div>
              <h3 className="font-bold text-lg text-white mb-4">Rules & Information</h3>
              
              <div className="bg-gray-800 rounded-lg p-4 mb-6">
                <ul className="space-y-2">
                  {tournament.rules.map((rule, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex items-start p-3 border border-gray-700 rounded-md bg-gray-800 bg-opacity-50">
                <AlertCircle size={16} className="text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-400">
                  Players must join the room 15 minutes before the match starts. Entry fees are non-refundable
                  if you miss the tournament.
                </p>
              </div>
              
              {/* Tournament results if available */}
              {results && (
                <div className="mt-6">
                  <h3 className="font-bold text-lg text-white mb-4">Tournament Results</h3>
                  
                  <div className="space-y-3">
                    {results.winners.map((winner) => (
                      <div
                        key={winner.position}
                        className="p-3 rounded-lg bg-gray-800 flex items-center"
                      >
                        <div className={`mr-3 ${
                          winner.position === 1 ? 'text-yellow-500' :
                          winner.position === 2 ? 'text-gray-300' :
                          winner.position === 3 ? 'text-yellow-700' : 'text-gray-500'
                        }`}>
                          <Trophy size={20} />
                        </div>
                        
                        <div className="flex-grow">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium text-white">
                                {winner.position === 1 && '🏆 '}
                                {winner.playerOrTeamName}
                              </p>
                              <p className="text-xs text-gray-400">
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
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TournamentDetails;
