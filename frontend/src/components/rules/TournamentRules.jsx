import React from 'react';
import { Check, AlertTriangle, Award, Shield, Users } from 'lucide-react';
import Card from '../common/Card';

// Tournament general rules
const generalRules = [
  'Only mobile devices are allowed. No emulators, triggers, or other accessories.',
  'Players must be online 15 minutes before the tournament starts.',
  'In-game reporting for any violations is mandatory.',
  'The decision of tournament organizers is final and binding.',
  'Players must have a stable internet connection.',
  'Entry fees are non-refundable once paid.',
  'Tournament details (room ID and password) will be shared 15 minutes before the start.',
  'Players must use their registered IGN during the tournament.',
];

// Specific rules based on mode
const modeRules = {
  solo: [
    'No teaming up with other players.',
    'Players must not share their location with others.',
    'Spectating is not allowed after elimination.',
    'Stream sniping is strictly prohibited.',
  ],
  squad: [
    'Team size must not exceed 4 players.',
    'Only registered team members can participate.',
    'Team leader is responsible for all communications.',
    'Substitutions are not allowed once registration is closed.',
  ],
};

// Prohibited actions
const prohibitedActions = [
  'Using hacks, mods, or unauthorized third-party applications.',
  'Exploiting bugs or glitches in the game.',
  'Teaming up with players outside your squad (in squad mode).',
  'Unsportsmanlike behavior or abusive language.',
  'Sharing room ID/password with non-participants.',
  'Intentionally disconnecting to avoid elimination.',
];

// Prize distribution policy
const prizePolicy = [
  'Prizes will be distributed within 24 hours of tournament completion.',
  'Winners must provide correct payment details for prize transfer.',
  'All prizes are subject to verification of player identity.',
  'Taxes and fees, if applicable, will be deducted from prize amounts.',
  'Unclaimed prizes after 7 days will be forfeited.',
];

const TournamentRules = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-8">
        Tournament Rules & Guidelines
      </h1>
      
      <div className="space-y-8">
        {/* General Rules */}
        <Card>
          <div className="p-4 border-b border-gray-800 bg-gradient-to-r from-gray-900 to-gray-800 flex items-center">
            <Shield size={20} className="text-yellow-500 mr-2" />
            <h2 className="font-bold text-lg text-white">General Rules</h2>
          </div>
          
          <div className="p-6">
            <ul className="space-y-3">
              {generalRules.map((rule, index) => (
                <li key={index} className="flex items-start">
                  <Check size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
        
        {/* Mode-Specific Rules */}
        <Card>
          <div className="p-4 border-b border-gray-800 bg-gradient-to-r from-gray-900 to-gray-800 flex items-center">
            <Users size={20} className="text-yellow-500 mr-2" />
            <h2 className="font-bold text-lg text-white">Mode-Specific Rules</h2>
          </div>
          
          <div className="p-6">
            <div className="mb-6">
              <h3 className="font-medium text-white mb-3">Solo Mode</h3>
              <ul className="space-y-2">
                {modeRules.solo.map((rule, index) => (
                  <li key={index} className="flex items-start">
                    <Check size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-white mb-3">Squad Mode</h3>
              <ul className="space-y-2">
                {modeRules.squad.map((rule, index) => (
                  <li key={index} className="flex items-start">
                    <Check size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
        
        {/* Prohibited Actions */}
        <Card>
          <div className="p-4 border-b border-gray-800 bg-gradient-to-r from-gray-900 to-gray-800 flex items-center">
            <AlertTriangle size={20} className="text-red-500 mr-2" />
            <h2 className="font-bold text-lg text-white">Prohibited Actions</h2>
          </div>
          
          <div className="p-6">
            <p className="text-sm text-gray-400 mb-4">
              The following actions are strictly prohibited and may result in disqualification without refund:
            </p>
            
            <ul className="space-y-3">
              {prohibitedActions.map((action, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-red-500 mr-2 mt-0.5 font-bold">×</span>
                  <span className="text-gray-300">{action}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
        
        {/* Prize Distribution */}
        <Card>
          <div className="p-4 border-b border-gray-800 bg-gradient-to-r from-gray-900 to-gray-800 flex items-center">
            <Award size={20} className="text-yellow-500 mr-2" />
            <h2 className="font-bold text-lg text-white">Prize Distribution Policy</h2>
          </div>
          
          <div className="p-6">
            <ul className="space-y-3">
              {prizePolicy.map((policy, index) => (
                <li key={index} className="flex items-start">
                  <Check size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">{policy}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-6 p-4 bg-gray-800 rounded-lg">
              <h3 className="font-medium text-white mb-3">Typical Prize Distribution</h3>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">1st Place</span>
                  <span className="text-yellow-500 font-bold">70% of Prize Pool</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">2nd Place</span>
                  <span className="text-gray-200 font-bold">20% of Prize Pool</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">3rd Place</span>
                  <span className="text-gray-200 font-bold">10% of Prize Pool</span>
                </div>
              </div>
              
              <p className="text-xs text-gray-400 mt-3">
                * Actual prize distribution may vary by tournament. Check specific tournament details for exact prize breakdown.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TournamentRules;
