import React from "react";
import { motion } from "framer-motion";

function NoPage() {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-center">
      <motion.div
        className="max-w-md p-6 bg-white rounded-lg shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-5xl font-bold mb-4 text-gray-800"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          Oops! 404
        </motion.h1>
        <p className="text-xl mb-6">
          The page you are looking for doesn't exist.
        </p>
        <motion.button
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full hover:scale-105 transition-transform duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => (window.location.href = "/")}
        >
          Go Back to Home
        </motion.button>
      </motion.div>
    </div>
  );
}

export default NoPage;
