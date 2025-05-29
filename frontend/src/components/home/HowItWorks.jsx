import React from 'react';
import { UserPlus, CreditCard, Gamepad2, Trophy } from 'lucide-react';

const steps = [
  {
    icon: <UserPlus size={32} className="text-yellow-500" />,
    title: 'Register',
    description: 'Sign up for a tournament by providing your BGMI details.',
  },
  {
    icon: <CreditCard size={32} className="text-yellow-500" />,
    title: 'Pay Entry Fee',
    description: 'Secure your spot by paying the entry fee via UPI, PayTM, or Razorpay.',
  },
  {
    icon: <Gamepad2 size={32} className="text-yellow-500" />,
    title: 'Play',
    description: 'Join the tournament room with the provided ID and password.',
  },
  {
    icon: <Trophy size={32} className="text-yellow-500" />,
    title: 'Win Prizes',
    description: 'Compete to win cash prizes and be recognized as a champion.',
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            How It Works
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Join our BGMI tournaments in a few simple steps and compete for the championship
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="bg-gray-800 rounded-lg p-6 text-center relative overflow-hidden"
            >
              {/* Step number */}
              <div className="absolute -top-6 -right-6 bg-gray-700 rounded-full w-16 h-16 flex items-center justify-center opacity-20">
                <span className="text-3xl font-bold text-white">{index + 1}</span>
              </div>
              
              {/* Icon */}
              <div className="flex justify-center mb-4">
                {step.icon}
              </div>
              
              {/* Content */}
              <h3 className="text-lg font-bold text-white mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
