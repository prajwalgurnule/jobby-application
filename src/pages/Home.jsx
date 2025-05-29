// src/pages/Home.jsx
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FiSearch, FiBriefcase, FiAward, FiDollarSign } from 'react-icons/fi'

const Home = () => {
  const { authToken } = useAuth()

  const features = [
    {
      icon: <FiBriefcase className="w-6 h-6" />,
      title: "Diverse Opportunities",
      description: "Explore thousands of job listings across various industries and experience levels.",
      color: "text-blue-500",
      bg: "bg-blue-100 dark:bg-blue-900"
    },
    {
      icon: <FiAward className="w-6 h-6" />,
      title: "Verified Companies",
      description: "Connect with trusted employers and verified job postings for a secure job search experience.",
      color: "text-green-500",
      bg: "bg-green-100 dark:bg-green-900"
    },
    {
      icon: <FiDollarSign className="w-6 h-6" />,
      title: "Salary Insights",
      description: "Get accurate salary information and compensation details for various roles and locations.",
      color: "text-purple-500",
      bg: "bg-purple-100 dark:bg-purple-900"
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="flex-grow flex items-center py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-white mb-6">
              Find The Job That <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">Fits Your Life</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Millions of people are searching for jobs, salary information, and company reviews. 
              Discover opportunities that match your skills and aspirations.
            </p>
          </motion.div>

          {/* Search Box */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto mb-16"
          >
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for jobs, companies, or keywords..."
                className="block w-full pl-10 pr-12 py-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 dark:text-white"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                  Search
                </button>
              </div>
            </div>
          </motion.div> */}

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center mb-20"
          >
            <Link
              to={authToken ? "/jobs" : "/login"}
              className="relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <span className="relative z-10 text-lg">
                {authToken ? "Browse Jobs" : "Get Started"}
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="absolute inset-0 bg-white opacity-10 group-hover:opacity-0 transition-opacity duration-300"></span>
            </Link>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className={`${feature.bg} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <div className={feature.color}>
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Home