import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CreditCard, AlertCircle, UserPlus, Users, X } from 'lucide-react';
import Button from '../common/Button';
import Card from '../common/Card';
import { getTournamentById } from '../../data/tournaments';
import { isValidBgmiUid, isValidIndianPhoneNumber, formatCurrency } from '../../utils/helpers';
import PaymentSimulator from './PaymentSimulator';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const { tournamentId } = useParams();
  const [tournament, setTournament] = useState(undefined);
  const [showPayment, setShowPayment] = useState(false);
  const [errors, setErrors] = useState({});
  const [teamMemberErrors, setTeamMemberErrors] = useState({});
  
  const [formData, setFormData] = useState({
    playerName: '',
    teamName: '',
    bgmiUID: '',
    contactNumber: '',
    email: '',
    paymentMethod: 'UPI',
    teamMembers: [],
  });
  
  useEffect(() => {
    if (tournamentId) {
      const tournamentData = getTournamentById(tournamentId);
      if (tournamentData) {
        setTournament(tournamentData);
        
        // Initialize team members array based on tournament mode
        if (tournamentData.mode === 'Duo') {
          setFormData(prev => ({ ...prev, teamMembers: [{ name: '', bgmiUID: '' }] }));
        } else if (tournamentData.mode === 'Squad') {
          setFormData(prev => ({ ...prev, teamMembers: Array(3).fill({ name: '', bgmiUID: '' }) }));
        }
      } else {
        navigate('/tournaments');
      }
    }
  }, [tournamentId, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleTeamMemberChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.map((member, i) => 
        i === index ? { ...member, [field]: value } : member
      ),
    }));
    
    if (teamMemberErrors[index]?.[field]) {
      setTeamMemberErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[index][field];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const newTeamMemberErrors = {};
    
    // Required fields
    if (!formData.playerName.trim()) {
      newErrors.playerName = 'Player name is required';
    }
    
    if ((tournament?.mode === 'Squad' || tournament?.mode === 'Duo') && !formData.teamName.trim()) {
      newErrors.teamName = 'Team name is required';
    }
    
    if (!formData.bgmiUID.trim()) {
      newErrors.bgmiUID = 'BGMI UID is required';
    } else if (!isValidBgmiUid(formData.bgmiUID)) {
      newErrors.bgmiUID = 'Invalid BGMI UID format (10-12 digits)';
    }

    // Validate team members
    if (tournament?.mode !== 'Solo') {
      formData.teamMembers.forEach((member, index) => {
        const memberErrors = {};
        
        if (!member.name.trim()) {
          memberErrors.name = 'Team member name is required';
        }
        
        if (!member.bgmiUID.trim()) {
          memberErrors.bgmiUID = 'BGMI UID is required';
        } else if (!isValidBgmiUid(member.bgmiUID)) {
          memberErrors.bgmiUID = 'Invalid BGMI UID format';
        }
        
        if (Object.keys(memberErrors).length > 0) {
          newTeamMemberErrors[index] = memberErrors;
        }
      });
    }
    
    setErrors(newErrors);
    setTeamMemberErrors(newTeamMemberErrors);
    
    return Object.keys(newErrors).length === 0 && Object.keys(newTeamMemberErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setShowPayment(true);
    }
  };

  const handlePaymentSuccess = () => {
    navigate('/registration-success', {
      state: { 
        tournamentName: tournament?.name,
        playerName: formData.playerName,
      }
    });
  };

  const handleBack = () => {
    setShowPayment(false);
  };

  if (!tournament) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  if (showPayment) {
    return (
      <PaymentSimulator
        tournament={tournament}
        playerName={formData.playerName}
        paymentMethod={formData.paymentMethod}
        onBack={handleBack}
        onSuccess={handlePaymentSuccess}
      />
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Move the Back to Tournaments button further down */}
      <div className="mb-16 mt-16" style={{ position: 'relative', zIndex: 20 }}>
        <button 
          onClick={() => navigate('/tournaments')}
          className="flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Tournaments
        </button>
      </div>
      
      <Card>
        <div className="p-4 border-b border-gray-800 bg-gradient-to-r from-gray-900 to-gray-800">
          <h2 className="font-bold text-xl text-white">Register for Tournament</h2>
          <p className="text-gray-400 text-sm mt-1">{tournament.name}</p>
        </div>
        
        <div className="p-6">
          {/* Tournament summary */}
          <div className="mb-6 p-4 bg-gray-800 rounded-lg">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-gray-400">Mode</p>
                <p className="text-white font-medium">{tournament.mode}</p>
              </div>
              <div>
                <p className="text-gray-400">Map</p>
                <p className="text-white font-medium">{tournament.map}</p>
              </div>
              <div>
                <p className="text-gray-400">Date & Time</p>
                <p className="text-white font-medium">
                  {new Date(tournament.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} 
                  {' at '}
                  {tournament.time}
                </p>
              </div>
              <div>
                <p className="text-gray-400">Entry Fee</p>
                <p className="text-white font-bold">{formatCurrency(tournament.entryFee)}</p>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* IGL/Player Information */}
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center mb-4">
                  <Users size={20} className="text-yellow-500 mr-2" />
                  <h3 className="text-white font-medium">
                    {tournament.mode === 'Solo' ? 'Player Information' : 'In-Game Leader (IGL) Information'}
                  </h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="playerName" className="block text-sm font-medium text-gray-300 mb-1">
                      {tournament.mode === 'Solo' ? 'Player Name / IGN' : 'IGL Name / IGN'} *
                    </label>
                    <input
                      type="text"
                      id="playerName"
                      name="playerName"
                      value={formData.playerName}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 bg-gray-700 border ${
                        errors.playerName ? 'border-red-500' : 'border-gray-600'
                      } rounded-md text-white focus:outline-none focus:ring-1 focus:ring-yellow-500`}
                      placeholder="Your in-game name"
                    />
                    {errors.playerName && (
                      <p className="mt-1 text-sm text-red-500">{errors.playerName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="bgmiUID" className="block text-sm font-medium text-gray-300 mb-1">
                      BGMI UID *
                    </label>
                    <input
                      type="text"
                      id="bgmiUID"
                      name="bgmiUID"
                      value={formData.bgmiUID}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 bg-gray-700 border ${
                        errors.bgmiUID ? 'border-red-500' : 'border-gray-600'
                      } rounded-md text-white focus:outline-none focus:ring-1 focus:ring-yellow-500`}
                      placeholder="Your 10-12 digit BGMI UID"
                    />
                    {errors.bgmiUID && (
                      <p className="mt-1 text-sm text-red-500">{errors.bgmiUID}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Team Information (for Duo/Squad) */}
              {tournament.mode !== 'Solo' && (
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-center mb-4">
                    <UserPlus size={20} className="text-yellow-500 mr-2" />
                    <h3 className="text-white font-medium">Team Information</h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="teamName" className="block text-sm font-medium text-gray-300 mb-1">
                        Team Name *
                      </label>
                      <input
                        type="text"
                        id="teamName"
                        name="teamName"
                        value={formData.teamName}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 bg-gray-700 border ${
                          errors.teamName ? 'border-red-500' : 'border-gray-600'
                        } rounded-md text-white focus:outline-none focus:ring-1 focus:ring-yellow-500`}
                        placeholder="Your team name (e.g., GodLike, Soul Team)"
                      />
                      {errors.teamName && (
                        <p className="mt-1 text-sm text-red-500">{errors.teamName}</p>
                      )}
                    </div>

                    <div className="space-y-4">
                      {formData.teamMembers.map((member, index) => (
                        <div key={index} className="p-3 bg-gray-600 rounded-lg">
                          <h4 className="text-sm font-medium text-gray-300 mb-3">
                            Team Member #{index + 2}
                          </h4>
                          
                          <div className="space-y-3">
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">
                                Player Name / IGN *
                              </label>
                              <input
                                type="text"
                                value={member.name}
                                onChange={(e) => handleTeamMemberChange(index, 'name', e.target.value)}
                                className={`w-full px-3 py-2 bg-gray-600 border ${
                                  teamMemberErrors[index]?.name ? 'border-red-500' : 'border-gray-600'
                                } rounded-md text-white focus:outline-none focus:ring-1 focus:ring-yellow-500`}
                                placeholder="Team member's in-game name"
                              />
                              {teamMemberErrors[index]?.name && (
                                <p className="mt-1 text-sm text-red-500">{teamMemberErrors[index].name}</p>
                              )}
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">
                                BGMI UID *
                              </label>
                              <input
                                type="text"
                                value={member.bgmiUID}
                                onChange={(e) => handleTeamMemberChange(index, 'bgmiUID', e.target.value)}
                                className={`w-full px-3 py-2 bg-gray-600 border ${
                                  teamMemberErrors[index]?.bgmiUID ? 'border-red-500' : 'border-gray-600'
                                } rounded-md text-white focus:outline-none focus:ring-1 focus:ring-yellow-500`}
                                placeholder="Team member's BGMI UID"
                              />
                              {teamMemberErrors[index]?.bgmiUID && (
                                <p className="mt-1 text-sm text-red-500">{teamMemberErrors[index].bgmiUID}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Payment Method */}
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-white font-medium mb-4">Payment Method</h3>
                
                <div>
                  <select
                    id="paymentMethod"
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-yellow-500"
                  >
                    <option value="UPI">UPI</option>
                    <option value="PayTM">PayTM</option>
                    <option value="Razorpay">Razorpay</option>
                  </select>
                </div>
              </div>
              
              {/* Important Notes */}
              <div className="flex items-start p-3 border border-yellow-500 rounded-md bg-yellow-500 bg-opacity-10">
                <AlertCircle size={16} className="text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-yellow-500">
                  <strong>Note:</strong> If the in-game name does not match while joining the room, you will be removed. 
                  Please ensure that the name matches exactly with your BGMI name.
                </p>
              </div>
              
              <div className="pt-4">
                <Button type="submit" variant="primary" fullWidth>
                  <CreditCard size={16} className="mr-2" />
                  Proceed to Payment
                </Button>
              </div>
              
              <div className="flex items-start mt-4 text-sm text-gray-400 p-3 border border-gray-700 rounded-md bg-gray-800 bg-opacity-50">
                <AlertCircle size={16} className="text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                <p>
                  By registering, you agree to the tournament rules and understand that entry fees are non-refundable 
                  if you miss the tournament.
                </p>
              </div>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default RegistrationForm;