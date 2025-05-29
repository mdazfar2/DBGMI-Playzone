import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Users, Calendar, Clock } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import { formatDate, formatTime, formatCurrency } from '../../utils/helpers';
import Countdown from './Countdown';

const TournamentCard = ({
  tournament,
  showCountdown = true,
}) => {
  const navigate = useNavigate();
  
  const {
    id,
    name,
    date,
    time,
    map,
    mode,
    entryFee,
    prizePools,
    slots,
    registeredPlayers,
    isRegistrationOpen,
  } = tournament;
  
  const firstPrize = prizePools.find(prize => prize.position === 1)?.amount || 0;
  const registrationFull = registeredPlayers >= slots;
  const availableSlots = slots - registeredPlayers;
  
  const handleRegisterClick = () => {
    navigate(`/register/${id}`);
  };

  const handleViewDetails = () => {
    navigate(`/tournaments/${id}`);
  };
  
  return (
    <Card className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-800 bg-gradient-to-r from-gray-900 to-gray-800">
        <h3 className="font-bold text-xl text-white">{name}</h3>
        
        {showCountdown && (
          <div className="mt-3">
            <p className="text-sm text-gray-400 mb-2">Tournament begins in:</p>
            <Countdown date={date} time={time} />
          </div>
        )}
      </div>
      
      <div className="p-4 flex-grow">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center text-gray-300">
            <MapPin size={16} className="text-yellow-500 mr-2" />
            <span className="text-sm">{map}</span>
          </div>
          
          <div className="flex items-center text-gray-300">
            <Users size={16} className="text-yellow-500 mr-2" />
            <span className="text-sm">{mode}</span>
          </div>
          
          <div className="flex items-center text-gray-300">
            <Calendar size={16} className="text-yellow-500 mr-2" />
            <span className="text-sm">{formatDate(date)}</span>
          </div>
          
          <div className="flex items-center text-gray-300">
            <Clock size={16} className="text-yellow-500 mr-2" />
            <span className="text-sm">{formatTime(time)}</span>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-400">Entry Fee</p>
            <p className="text-lg font-semibold text-white">{formatCurrency(entryFee)}</p>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-gray-400">1st Prize</p>
            <p className="text-lg font-semibold text-yellow-500">{formatCurrency(firstPrize)}</p>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-400">Slots Available</span>
            <span className="text-gray-300">{availableSlots}/{slots}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-yellow-500 h-2 rounded-full" 
              style={{ width: `${(registeredPlayers / slots) * 100}%` }}
            />
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-gray-800 bg-opacity-50">
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="secondary"
            onClick={handleViewDetails}
            fullWidth
          >
            Details
          </Button>
          
          <Button
            variant="primary"
            onClick={handleRegisterClick}
            disabled={!isRegistrationOpen || registrationFull}
            fullWidth
          >
            {!isRegistrationOpen 
              ? 'Closed' 
              : registrationFull 
                ? 'Full' 
                : 'Register'}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TournamentCard;
