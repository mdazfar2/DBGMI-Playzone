import React, { useEffect, useState } from 'react';
import { calculateTimeRemaining } from '../../utils/helpers';

const Countdown = ({ date, time, onComplete }) => {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining(date, time));

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeRemaining = calculateTimeRemaining(date, time);
      setTimeRemaining(newTimeRemaining);

      if (newTimeRemaining.isExpired && onComplete) {
        onComplete();
        clearInterval(interval);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [date, time, onComplete]);

  if (timeRemaining.isExpired) {
    return (
      <div className="text-center text-red-500 font-semibold">
        Tournament has started!
      </div>
    );
  }

  return (
    <div className="flex justify-center space-x-4 text-center">
      <div className="flex flex-col">
        <div className="bg-gray-800 text-yellow-500 text-xl md:text-2xl font-bold px-3 py-2 rounded-md">
          {timeRemaining.days}
        </div>
        <span className="text-xs mt-1 text-gray-400">Days</span>
      </div>
      <div className="flex flex-col">
        <div className="bg-gray-800 text-yellow-500 text-xl md:text-2xl font-bold px-3 py-2 rounded-md">
          {timeRemaining.hours}
        </div>
        <span className="text-xs mt-1 text-gray-400">Hours</span>
      </div>
      <div className="flex flex-col">
        <div className="bg-gray-800 text-yellow-500 text-xl md:text-2xl font-bold px-3 py-2 rounded-md">
          {timeRemaining.minutes}
        </div>
        <span className="text-xs mt-1 text-gray-400">Mins</span>
      </div>
    </div>
  );
};

export default Countdown;
