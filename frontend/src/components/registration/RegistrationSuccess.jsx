import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, CalendarClock, Home } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';

const RegistrationSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state || {};

  // If no state is passed, provide default values
  const tournamentName = state.tournamentName || 'the tournament';
  const playerName = state.playerName || 'Player';

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Card>
        <div className="p-6 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-green-900 bg-opacity-30 flex items-center justify-center mb-6">
            <CheckCircle size={32} className="text-green-500" />
          </div>

          <h2 className="text-2xl font-bold text-white mb-2">
            Registration Successful!
          </h2>

          <p className="text-gray-400 mb-6">
            Congratulations {playerName}! You have successfully registered for {tournamentName}.
          </p>

          <div className="bg-gray-800 p-4 rounded-lg mb-6 w-full">
            <h3 className="font-medium text-white mb-3 flex items-center">
              <CalendarClock size={18} className="text-yellow-500 mr-2" />
              What's Next?
            </h3>

            <ul className="text-gray-400 text-sm space-y-2 text-left">
              <li className="flex">
                <span className="mr-2">1.</span>
                <span>You will receive the tournament details on your homepage of the website.</span>
              </li>
              <li className="flex">
                <span className="mr-2">2.</span>
                <span>Room ID and password will be shared 15 minutes before the match.</span>
              </li>
              <li className="flex">
                <span className="mr-2">3.</span>
                <span>Join our Discord/WhatsApp group for updates and announcements.</span>
              </li>
              <li className="flex">
                <span className="mr-2">4.</span>
                <span>Be online at least 15 minutes before the tournament starts.</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3 w-full">
            <Button
              variant="primary"
              onClick={() => navigate('/')}
              fullWidth
            >
              <Home size={16} className="mr-2" />
              Back to Home
            </Button>
          </div>

          <p className="mt-6 text-sm text-gray-500">
            For any queries, please contact tournament organizer on WhatsApp.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default RegistrationSuccess;
