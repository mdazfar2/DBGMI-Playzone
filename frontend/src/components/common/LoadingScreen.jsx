import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Swords, Trophy, Shield } from 'lucide-react';

const LoadingScreen = () => {
  // Animation variants for better control
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: 'mirror'
      }
    }
  };

  const loadingMessages = [
    "Preparing your battleground...",
    "Loading weapons cache...",
    "Fueling up the battle bus...",
    "Assembling your squad...",
    "Almost there, soldier!"
  ];

  return (
    <div className="fixed inset-0 bg-gray-900/95 flex items-center justify-center z-[9999]">
      <motion.div
        className="text-center max-w-md px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Animated game icons circle */}
        <motion.div 
          className="relative mx-auto w-32 h-32 mb-8"
          variants={pulseVariants}
          animate="pulse"
        >
          <motion.div 
            className="absolute inset-0 rounded-full border-4 border-yellow-500/30"
            variants={itemVariants}
          />
          
          <motion.div 
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
            variants={itemVariants}
          >
            <Gamepad2 size={32} className="text-yellow-500" />
          </motion.div>
          
          <motion.div 
            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
            variants={itemVariants}
            transition={{ delay: 0.1 }}
          >
            <Swords size={32} className="text-red-500" />
          </motion.div>
          
          <motion.div 
            className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2"
            variants={itemVariants}
            transition={{ delay: 0.2 }}
          >
            <Trophy size={32} className="text-blue-500" />
          </motion.div>
          
          <motion.div 
            className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2"
            variants={itemVariants}
            transition={{ delay: 0.3 }}
          >
            <Shield size={32} className="text-green-500" />
          </motion.div>
        </motion.div>

        {/* Logo with dynamic text */}
        <motion.div variants={itemVariants} transition={{ delay: 0.4 }}>
          <h1 className="text-4xl font-extrabold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-red-500">
              DBGMI
            </span>
            <span className="text-white ml-2">TOURNAMENT</span>
          </h1>
          <p className="text-gray-400 mt-2">Daudnagar's Premier Battleground</p>
        </motion.div>

        {/* Progress bar with gradient */}
        <motion.div 
          className="mt-8 h-2.5 rounded-full bg-gray-800 overflow-hidden"
          variants={itemVariants}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-yellow-500 via-red-500 to-yellow-500"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              repeatType: 'reverse',
              ease: "easeInOut"
            }}
          />
        </motion.div>

        {/* Dynamic loading message */}
        <motion.div
          className="mt-6 text-gray-400 text-sm"
          variants={itemVariants}
          transition={{ delay: 0.6 }}
          animate={{
            opacity: [0.6, 1, 0.6],
            transition: { duration: 2, repeat: Infinity }
          }}
        >
          {loadingMessages[Math.floor(Math.random() * loadingMessages.length)]}
        </motion.div>

        {/* Mini tip for gamers */}
        {/* <motion.div 
          className="mt-8 text-xs text-gray-500"
          variants={itemVariants}
          transition={{ delay: 0.7 }}
        >
          Pro Tip: Headphones recommended for best experience!
        </motion.div> */}
      </motion.div>
    </div>
  );
};

export default LoadingScreen;