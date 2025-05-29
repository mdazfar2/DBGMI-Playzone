import React from 'react';
import { useParams } from 'react-router-dom';
import RegistrationForm from '../components/registration/RegistrationForm';
import TournamentsList from '../components/tournaments/TournamentsList';

const RegistrationPage = () => {
  const { tournamentId } = useParams();

  return (
    <div className="pt-16">
      {tournamentId ? (
        <RegistrationForm />
      ) : (
        <TournamentsList />
      )}
    </div>
  );
};

export default RegistrationPage;