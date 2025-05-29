import React, { useState } from 'react';
import { Users, Trophy, DollarSign, Calendar, EyeOff, Eye, X, ChevronLeft, ChevronDown, ChevronUp } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import { upcomingTournaments, pastTournaments } from '../../data/tournaments';
import { formatCurrency } from '../../utils/helpers';

// Enhanced mock data for all tournament modes
const mockTeams = {
  // Solo Tournament (ID 3 - DBGMI Solo Royale)
  3: [
    {
      teamId: 'player1',
      teamName: 'SpeedZone',
      registeredBy: 'Azfar Alam',
      registrationFee: 50,
      players: ['Azfar Alam']
    },
    {
      teamId: 'player2',
      teamName: 'DeadlyDuo',
      registeredBy: 'Imran',
      registrationFee: 50,
      players: ['Imran']
    },
    {
      teamId: 'player3',
      teamName: 'GOGO',
      registeredBy: 'Salman',
      registrationFee: 50,
      players: ['Salman']
    },
    {
      teamId: 'player4',
      teamName: 'Cn/GodYT',
      registeredBy: 'Sharif Imam',
      registrationFee: 50,
      players: ['Sharif Imam']
    }
  ],
  
  // Duo Tournament (ID 2 - DBGMI Duo Clash)
  2: [
    {
      teamId: 'team1',
      teamName: 'Dynamic Duo',
      registeredBy: 'Alex Green',
      registrationFee: 100,
      players: [
        'DuoxAlexkiller(IGL)',
        'whiteTiger'
      ]
    },
    {
      teamId: 'team2',
      teamName: 'Bang Bros',
      registeredBy: 'Rahim Khan',
      registrationFee: 100,
      players: [
        'bang.rahim (IGL)',
        'bang.karim'
      ]
    },
    {
      teamId: 'team3',
      teamName: 'No Mercy',
      registeredBy: 'Sakib Hasan',
      registrationFee: 100,
      players: [
        'DarkyKill (IGL)',
        'DadxPro'
      ]
    }
  ],
  
  // Squad Tournament (ID 1 - DBGMI Squad Showdown)
  1: [
    {
      teamId: 'team1',
      teamName: 'CYNO',
      registeredBy: 'Azfar Alam ',
      registrationFee: 200,
      players: [
        'Cn/Azfar (IGL)',
        'Cn/Cyno',
        'Cn/GOGO',
        'Cn/Zafar'
      ]
    },
    {
      teamId: 'team2',
      teamName: 'TIGERS',
      registeredBy: 'Imran Khan ',
      registrationFee: 200,
      players: [
        'TGRxIMRAN (IGL)',
        'TGRxRAHUL',
        'TGRxSHADOW',
        'TGRxVIPER'
      ]
    },
    {
      teamId: 'team3',
      teamName: 'WOLVES',
      registeredBy: 'Sharif Imam',
      registrationFee: 200,
      players: [
        'WVSxSHARIF (IGL)',
        'WVSxHUNTER',
        'WVSxBLAZE',
        'WVSxGHOST'
      ]
    },
    {
      teamId: 'team4',
      teamName: 'EAGLES',
      registeredBy: 'Mohammad Ali',
      registrationFee: 200,
      players: [
        'EGLxALI (IGL)',
        'EGLxSTRIKER',
        'EGLxPHOENIX',
        'EGLxFALCON'
      ]
    }
  ]
};

// Admin Mock Data
const adminStats = {
  totalPlayers: 345,
  totalTournaments: upcomingTournaments.length + pastTournaments.length,
  totalPrizePool: [...upcomingTournaments, ...pastTournaments].reduce(
    (total, tournament) =>
      total + tournament.prizePools.reduce((sum, prize) => sum + prize.amount, 0),
    0
  ),
  upcomingTournaments: upcomingTournaments.length,
};

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [expandedTeams, setExpandedTeams] = useState({});
  const [showStartMatchModal, setShowStartMatchModal] = useState(false);
  const [roomDetails, setRoomDetails] = useState({
    roomId: '',
    password: ''
  });
  const [showToast, setShowToast] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid credentials. Try admin/admin123');
    }
  };

  const handleTournamentClick = (tournament) => {
    setSelectedTournament(tournament);
    setExpandedTeams({});
  };

  const toggleTeamExpansion = (teamId) => {
    setExpandedTeams(prev => ({
      ...prev,
      [teamId]: !prev[teamId]
    }));
  };

  const handleBackToDashboard = () => {
    setSelectedTournament(null);
    setExpandedTeams({});
  };

  const handleStartMatch = () => {
    setShowStartMatchModal(true);
  };

  const handleRoomDetailsChange = (e) => {
    const { name, value } = e.target;
    setRoomDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleShareAndStart = () => {
    setShowStartMatchModal(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
    setRoomDetails({ roomId: '', password: '' });
  };

  const calculateTotalEarnings = (tournamentId) => {
    const teams = mockTeams[tournamentId] || [];
    return teams.reduce((total, team) => total + team.registrationFee, 0);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="max-w-md w-full">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Admin Login</h2>

            {error && (
              <div className="mb-4 p-3 bg-red-900 bg-opacity-30 border border-red-800 rounded-md text-red-400 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-yellow-500"
                    placeholder="Enter your username"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-yellow-500"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-2.5 text-gray-400"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <Button type="submit" variant="primary" fullWidth>
                    Login
                  </Button>
                </div>
              </div>
            </form>

            <p className="mt-4 text-xs text-gray-500 text-center">
              This is a simulated admin panel. Use username "admin" and password "admin123" to login.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  // Tournament Detail View
  if (selectedTournament) {
    const teams = mockTeams[selectedTournament.id] || [];
    const totalEarnings = calculateTotalEarnings(selectedTournament.id);
    const isSoloMode = selectedTournament.mode === 'Solo';

    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Start Match Modal */}
        {showStartMatchModal && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <Card className="max-w-md w-full relative">
              <button 
                onClick={() => setShowStartMatchModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Start Tournament Match</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="roomId" className="block text-sm font-medium text-gray-300 mb-1">
                      Room ID
                    </label>
                    <input
                      type="text"
                      id="roomId"
                      name="roomId"
                      value={roomDetails.roomId}
                      onChange={handleRoomDetailsChange}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-yellow-500"
                      placeholder="Enter Room ID"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                      Room Password
                    </label>
                    <input
                      type="text"
                      id="password"
                      name="password"
                      value={roomDetails.password}
                      onChange={handleRoomDetailsChange}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-yellow-500"
                      placeholder="Enter Room Password"
                    />
                  </div>
                  <div className="pt-4">
                    <Button 
                      variant="primary" 
                      fullWidth 
                      onClick={handleShareAndStart}
                      disabled={!roomDetails.roomId || !roomDetails.password}
                    >
                      Share and Start
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Toast Notification */}
        {showToast && (
          <div className="fixed bottom-4 right-4 z-50">
            <div className="bg-green-900 border border-green-800 text-green-200 px-6 py-3 rounded-lg shadow-lg flex items-center">
              <Trophy size={20} className="mr-2" />
              <span>Room details shared successfully! Tournament has started.</span>
            </div>
          </div>
        )}

        <div className="flex items-center mb-6">
          <Button variant="secondary" onClick={handleBackToDashboard} className="mr-4">
            <ChevronLeft size={18} className="mr-1" /> Back to Dashboard
          </Button>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">{selectedTournament.name}</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-900 bg-opacity-30 mr-4">
                <Users size={24} className="text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total {isSoloMode ? 'Players' : 'Teams'}</p>
                <p className="text-2xl font-bold text-white">{teams.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-900 bg-opacity-30 mr-4">
                <DollarSign size={24} className="text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Earnings</p>
                <p className="text-2xl font-bold text-white">{formatCurrency(totalEarnings)}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-yellow-900 bg-opacity-30 mr-4">
                <Calendar size={24} className="text-yellow-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Date & Time</p>
                <p className="text-2xl font-bold text-white">
                  {new Date(selectedTournament.date).toLocaleDateString('en-IN')} at {selectedTournament.time}
                </p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="mb-8">
          <div className="p-4 border-b border-gray-800 bg-gradient-to-r from-gray-900 to-gray-800 flex justify-between items-center">
            <h2 className="font-bold text-lg text-white">
              Registered {isSoloMode ? 'Players' : 'Teams'}
            </h2>
            <div className="flex space-x-2">
              <Button variant="primary" size="sm" onClick={handleStartMatch}>
                Start the Match
              </Button>
              <Button variant="secondary" size="sm">
                Export Data
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-800">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    {isSoloMode ? 'Player Name' : 'Team Name'}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Registered By
                  </th>
                  {!isSoloMode && (
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Players
                    </th>
                  )}
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {teams.length > 0 ? (
                  teams.map((team) => (
                    <React.Fragment key={team.teamId}>
                      <tr className="hover:bg-gray-800">
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-yellow-400">
                            {team.teamName}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-300">{team.registeredBy}</div>
                        </td>
                        {!isSoloMode && (
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-300">
                              {team.players.length} player{team.players.length !== 1 ? 's' : ''}
                            </div>
                          </td>
                        )}
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            {!isSoloMode && (
                              <Button 
                                variant="secondary" 
                                size="sm" 
                                onClick={() => toggleTeamExpansion(team.teamId)}
                              >
                                {expandedTeams[team.teamId] ? (
                                  <>
                                    <ChevronUp size={16} className="mr-1" /> Hide
                                  </>
                                ) : (
                                  <>
                                    <ChevronDown size={16} className="mr-1" /> Show
                                  </>
                                )}
                              </Button>
                            )}
                            <Button variant="danger" size="sm">
                              Remove
                            </Button>
                          </div>
                        </td>
                      </tr>
                      {!isSoloMode && expandedTeams[team.teamId] && (
                        <tr>
                          <td colSpan={isSoloMode ? 3 : 4} className="px-4 py-2 bg-gray-900">
                            <div className="pl-6 pr-2 py-3">
                              <h4 className="text-sm font-medium text-white mb-2">Team Members:</h4>
                              <ul className="space-y-2">
                                {team.players.map((player, index) => (
                                  <li key={index} className="flex items-center p-2 bg-gray-800 rounded">
                                    <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center mr-3">
                                      <span className="text-xs font-medium text-gray-300">{index + 1}</span>
                                    </div>
                                    <span className="text-sm text-gray-300">{player}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan={isSoloMode ? 3 : 4} className="px-4 py-4 text-center text-gray-400">
                      No {isSoloMode ? 'players' : 'teams'} registered yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    );
  }

  // Main Dashboard View
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Admin Dashboard</h1>
        <Button variant="secondary" onClick={() => setIsAuthenticated(false)}>
          Logout
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-900 bg-opacity-30 mr-4">
              <Users size={24} className="text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Players</p>
              <p className="text-2xl font-bold text-white">{adminStats.totalPlayers}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-900 bg-opacity-30 mr-4">
              <Trophy size={24} className="text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Tournaments</p>
              <p className="text-2xl font-bold text-white">{adminStats.totalTournaments}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-yellow-900 bg-opacity-30 mr-4">
              <DollarSign size={24} className="text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Prize Pool</p>
              <p className="text-2xl font-bold text-white">{formatCurrency(adminStats.totalPrizePool)}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-purple-900 bg-opacity-30 mr-4">
              <Calendar size={24} className="text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Upcoming Tournaments</p>
              <p className="text-2xl font-bold text-white">{adminStats.upcomingTournaments}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Upcoming Tournaments Management */}
      <Card className="mb-8">
        <div className="p-4 border-b border-gray-800 bg-gradient-to-r from-gray-900 to-gray-800 flex justify-between items-center">
          <h2 className="font-bold text-lg text-white">Manage Upcoming Tournaments</h2>
          <Button variant="primary" size="sm">
            Add Tournament
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-800">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Tournament
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Mode
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Registration
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {upcomingTournaments.map((tournament) => (
                <tr key={tournament.id} className="hover:bg-gray-800">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div 
                      className="text-sm font-medium text-yellow-400 hover:text-yellow-300 cursor-pointer"
                      onClick={() => handleTournamentClick(tournament)}
                    >
                      {tournament.name}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">
                      {new Date(tournament.date).toLocaleDateString('en-IN')} at {tournament.time}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">{tournament.mode}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        tournament.isRegistrationOpen
                          ? 'bg-green-900 text-green-400'
                          : 'bg-red-900 text-red-400'
                      }`}
                    >
                      {tournament.isRegistrationOpen ? 'Open' : 'Closed'}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <Button variant="secondary" size="sm">
                        Edit
                      </Button>
                      <Button variant="danger" size="sm">
                        Cancel
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Recent Registrations */}
      <Card>
        <div className="p-4 border-b border-gray-800 bg-gradient-to-r from-gray-900 to-gray-800">
          <h2 className="font-bold text-lg text-white">Recent Registrations</h2>
        </div>

        <div className="p-6">
          <p className="text-gray-400 text-center">
            This is a mock admin dashboard. In a real implementation, this would show recent registrations
            and payment confirmations.
          </p>

          <div className="mt-6 bg-gray-800 p-4 rounded-lg text-sm text-gray-400">
            <p className="mb-4">In a complete backend implementation, this admin panel would include:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Real-time registration data</li>
              <li>Payment verification system</li>
              <li>Tournament creation and management</li>
              <li>Player database with search and filter</li>
              <li>Results recording and leaderboard management</li>
              <li>Notification system to alert players</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboard;