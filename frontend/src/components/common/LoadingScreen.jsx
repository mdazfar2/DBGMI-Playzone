import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2 } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <Gamepad2 size={48} className="text-yellow-500" />
          </div>
          <h1 className="text-3xl font-bold">
            <span className="text-yellow-500">DBGMI</span>
            <span className="text-white ml-2">TOURNAMENT</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1, repeat: Infinity }}
          className="h-1 bg-gradient-to-r from-yellow-500 via-red-500 to-yellow-500 rounded-full"
        />
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-gray-400"
        >
          Loading your battleground...
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingScreen;