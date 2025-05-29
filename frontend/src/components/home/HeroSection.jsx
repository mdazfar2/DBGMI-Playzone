import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-black overflow-hidden">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ 
          backgroundImage: 'url("https://images.pexels.com/photos/596750/pexels-photo-596750.jpeg")',
          filter: 'brightness(0.4)'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            <span className="block">DBGMI</span>
            <span className="block text-yellow-500 mt-2">TOURNAMENT</span>
          </h1>
          <p className="mt-6 max-w-lg mx-auto text-xl text-gray-300 sm:max-w-3xl">
            Battle, Conquer, Dominate. Join Daudnagar's premier BGMI tournaments and compete for glory and prizes!
          </p>
          <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
            <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
              <Button 
                variant="primary"
                size="lg"
                onClick={() => navigate('/register')}
              >
                Register Now
              </Button>
              <Button 
                variant="outline"
                size="lg"
                onClick={() => navigate('/tournaments')}
              >
                View Tournaments
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Animated bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-500 animate-pulse" />
    </div>
  );
};

export default HeroSection;
