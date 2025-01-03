import React from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <div>
      {/* Header */}
      <Header />

      {/* Convincing User to Sign Up */}
      <section className="relative py-16 bg-gradient-to-r from-blue-400 to-purple-600 text-white">
        <div className="container mx-auto text-center">
          <motion.h1
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Join Our Platform Today!
          </motion.h1>
          <motion.p
            className="text-xl mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            Unlock the power of community, assets, and professional
            opportunities.
          </motion.p>
          <motion.button
            className="bg-yellow-500 text-black px-6 py-3 rounded-lg hover:bg-yellow-400"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            Sign Up Now
          </motion.button>
        </div>
      </section>

      {/* Assets Being Used in Multiple Projects */}
      <section className="py-16 bg-gray-50 px-5">
        <div className="container mx-auto text-center">
          <motion.h2
            className="text-3xl font-bold mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3 }}
          >
            Our Assets in Action
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <img
                src="https://via.placeholder.com/300"
                alt="Asset"
                className="w-full h-56 object-cover mb-4 rounded-lg"
              />
              <p className="text-lg font-semibold">Asset Example 1</p>
            </motion.div>
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 1 }}
            >
              <img
                src="https://via.placeholder.com/300"
                alt="Asset"
                className="w-full h-56 object-cover mb-4 rounded-lg"
              />
              <p className="text-lg font-semibold">Asset Example 2</p>
            </motion.div>
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 1 }}
            >
              <img
                src="https://via.placeholder.com/300"
                alt="Asset"
                className="w-full h-56 object-cover mb-4 rounded-lg"
              />
              <p className="text-lg font-semibold">Asset Example 3</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* High Profile Freelancers */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-400 text-white px-5">
        <div className="container mx-auto text-center">
          <motion.h2
            className="text-3xl font-bold mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Meet Our Top Freelancers
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <img
                src="https://via.placeholder.com/150"
                alt="Freelancer"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <p className="font-semibold">John Doe</p>
              <p className="text-gray-600">Graphics Designer</p>
              <p className="mt-2 text-sm text-gray-500">
                "Great work, fast turnaround!"
              </p>
            </motion.div>
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 1 }}
            >
              <img
                src="https://via.placeholder.com/150"
                alt="Freelancer"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <p className="font-semibold">Jane Smith</p>
              <p className="text-gray-600">Web Developer</p>
              <p className="mt-2 text-sm text-gray-500">
                "Amazing quality and support!"
              </p>
            </motion.div>
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 1 }}
            >
              <img
                src="https://via.placeholder.com/150"
                alt="Freelancer"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <p className="font-semibold">Chris Lee</p>
              <p className="text-gray-600">Content Writer</p>
              <p className="mt-2 text-sm text-gray-500">
                "Helped me deliver on time!"
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Games Available on Platform */}
      <section className="py-16 bg-gray-50 px-5">
        <div className="container mx-auto text-center">
          <motion.h2
            className="text-3xl font-bold mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Games Available on Our Platform
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <img
                src="https://via.placeholder.com/300"
                alt="Game"
                className="w-full h-56 object-cover mb-4 rounded-lg"
              />
              <p className="text-lg font-semibold">Game Title 1</p>
            </motion.div>
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 1 }}
            >
              <img
                src="https://via.placeholder.com/300"
                alt="Game"
                className="w-full h-56 object-cover mb-4 rounded-lg"
              />
              <p className="text-lg font-semibold">Game Title 2</p>
            </motion.div>
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 1 }}
            >
              <img
                src="https://via.placeholder.com/300"
                alt="Game"
                className="w-full h-56 object-cover mb-4 rounded-lg"
              />
              <p className="text-lg font-semibold">Game Title 3</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
