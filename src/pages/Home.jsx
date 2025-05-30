// src/pages/Home.jsx
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { 
  FiSearch, FiBriefcase, FiAward, FiDollarSign, FiMapPin, FiClock, FiUsers, FiCode, FiBarChart2, FiHeart, FiShoppingBag, FiLayers, FiStar } from 'react-icons/fi'

const Home = () => {
  const { authToken } = useAuth()

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
        when: "beforeChildren"
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        duration: 0.8 
      } 
    }
  }

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
    },
    {
      icon: <FiUsers className="w-6 h-6" />,
      title: "Career Guidance",
      description: "Personalized career advice and mentorship from industry experts.",
      color: "text-orange-500",
      bg: "bg-orange-100 dark:bg-orange-900"
    }
  ]

  const jobCategories = [
    { name: 'Software Development', jobs: '120K+ Jobs', icon: <FiCode className="w-5 h-5" /> },
    { name: 'Data Science', jobs: '85K+ Jobs', icon: <FiBarChart2 className="w-5 h-5" /> },
    { name: 'Design', jobs: '45K+ Jobs', icon: <FiLayers className="w-5 h-5" /> },
  ]

  const testimonials = [
    {
      quote: "Found my dream job within two weeks of using this platform! The interface is intuitive and job recommendations were spot on.",
      name: "Sarah Johnson",
      role: "Senior UX Designer at TechCorp",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      quote: "As a recruiter, I've been able to find quality candidates much faster than with other platforms. Highly recommended!",
      name: "Michael Chen",
      role: "Talent Acquisition at InnovateCo",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      quote: "The salary insights helped me negotiate a 20% higher offer than I expected. This service pays for itself!",
      name: "David Rodriguez",
      role: "Data Scientist at AnalyticsPro",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/men/75.jpg"
    }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://assets.ccbp.in/frontend/react-js/home-lg-bg.png')] bg-cover bg-center bg-no-repeat transform scale-110">
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 dark:from-black/70 dark:to-black/50"></div>
        </div>

        <div className="container mx-auto px-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-white max-w-2xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Find The Job That <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Fits Your Life</span>
            </h1>
            
            <p className="text-lg md:text-xl mb-8 leading-relaxed">
              Millions of people are searching for jobs, salary information, and company reviews. 
              Discover opportunities that match your skills and aspirations.
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to={authToken ? "/jobs" : "/login"}
                className="relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <span className="relative z-10 text-lg flex items-center">
                  {authToken ? "Browse Jobs" : "Get Started"}
                  <motion.span 
                    className="ml-2"
                    animate={{
                      x: [0, 5, 0],
                      transition: {
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "loop"
                      }
                    }}
                  >
                    →
                  </motion.span>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
              
             
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          animate={{
            y: [0, 10, 0],
            transition: {
              duration: 2,
              repeat: Infinity,
              repeatType: "loop"
            }
          }}
        >
          <span className="text-white mb-2 text-sm">Scroll Down</span>
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
            <motion.div 
              className="w-1 h-2 bg-white rounded-full"
              animate={{
                y: [0, 6, 0],
                opacity: [1, 0.5, 1],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop"
                }
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Stats Section */}
      <div className="py-16 px-4 bg-blue-50 dark:bg-gray-800">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">Choose Us?</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We connect talented professionals with top companies worldwide
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { number: "10M+", text: "Active Job Seekers", color: "from-blue-500 to-indigo-500" },
              { number: "500K+", text: "Companies Hiring", color: "from-purple-500 to-pink-500" },
              { number: "2M+", text: "Jobs Available", color: "from-green-500 to-teal-500" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -5 }}
                className="text-center p-6 bg-white dark:bg-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
              >
                <h3 className={`text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r ${stat.color}`}>
                  {stat.number}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg">{stat.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">Key Features</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need to find your perfect career match
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -10,
                  scale: 1.03,
                  transition: { duration: 0.3 }
                }}
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

      {/* Job Categories Section */}
      <div className="py-16 px-4 bg-blue-50 dark:bg-gray-800">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Popular <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">Job Categories</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Browse jobs in the most in-demand categories
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {jobCategories.map((category, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                }}
                className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 flex items-start"
              >
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg mr-4">
                  <div className="text-blue-600 dark:text-blue-400">
                    {category.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1 text-gray-800 dark:text-white">{category.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-3">{category.jobs}</p>
                  <Link 
                    to="/jobs" 
                    className="text-blue-600 dark:text-blue-400 font-medium text-sm hover:underline inline-flex items-center group"
                  >
                    Browse Jobs 
                    <motion.span 
                      className="ml-1"
                      animate={{
                        x: [0, 4, 0],
                        transition: {
                          duration: 1.5,
                          repeat: Infinity,
                          repeatType: "loop"
                        }
                      }}
                    >
                      →
                    </motion.span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">Users Say</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Success stories from professionals who found their dream jobs
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 relative"
              >
                 {/* <div className="absolute -top-4 -left-4 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
                   <FaQuoteLeft className="w-5 h-5" /
                </div>> */}
                
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-blue-500"
                  />
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">{testimonial.name}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="text-yellow-400 mb-4 flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6 italic relative pl-4 border-l-2 border-blue-500">
                  "{testimonial.quote}"
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="py-16 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-gray-800 dark:to-gray-800 relative overflow-hidden">
        {/* Animated background elements */}
        
        
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Take the <span className="text-yellow-300">Next Step</span> in Your Career?
            </h2>
            <p className="text-white text-xl mb-8">
              Join millions of professionals who found their perfect job match with us.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={authToken ? "/jobs" : "/login"}
                className="inline-block bg-white py-3 px-8 text-blue-600 font-medium rounded-lg shadow-md hover:bg-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                {authToken ? "Browse Jobs" : "Get Started Now"}
              </Link>
              
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Home