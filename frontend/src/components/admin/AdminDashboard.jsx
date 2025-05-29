import React, { useState } from 'react';
import { Users, Trophy, DollarSign, Calendar, EyeOff, Eye } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import { upcomingTournaments, pastTournaments } from '../../data/tournaments';
import { formatCurrency } from '../../utils/helpers';

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

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid credentials. Try admin/admin123');
    }
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
                    <div className="text-sm font-medium text-white">{tournament.name}</div>
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
