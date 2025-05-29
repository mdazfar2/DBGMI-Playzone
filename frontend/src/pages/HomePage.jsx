import React from 'react';
import HeroSection from '../components/home/HeroSection';
import UpcomingTournaments from '../components/home/UpcomingTournaments';
import HowItWorks from '../components/home/HowItWorks';
import PastWinners from '../components/home/PastWinners';

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <UpcomingTournaments />
      <HowItWorks />
      <PastWinners />
    </>
  );
};

export default HomePage;
