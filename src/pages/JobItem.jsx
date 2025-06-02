import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'
import SimilarJobCard from '../components/SimilarJobCard'
import { FiArrowLeft, FiExternalLink, FiStar, FiBriefcase, FiMapPin, FiDollarSign, FiClock } from 'react-icons/fi'
import { RiSuitcaseLine } from 'react-icons/ri'
import { TbCertificate } from 'react-icons/tb'
import { FaMoneyBillWave, FaMapMarkerAlt } from "react-icons/fa";

const JobItem = () => {
  const { id } = useParams()
  const { authToken } = useAuth()
  const [job, setJob] = useState(null)
  const [similarJobs, setSimilarJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('description')

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true)
        const response = await fetch(`https://apis.ccbp.in/jobs/${id}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })

        if (!response.ok) {
          throw new Error('Failed to fetch job details')
        }

        const data = await response.json()
        setJob(data.job_details)
        setSimilarJobs(data.similar_jobs)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchJobDetails()
  }, [id, authToken])

  const isInternship = job?.employment_type?.toLowerCase() === 'internship'

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header Skeleton */}
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
          </div>
          
          {/* Main Card Skeleton */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 animate-pulse">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Left Side */}
              <div className="md:w-1/4 space-y-2">
                <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                </div>
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-full"></div>
              </div>
              
              {/* Right Side */}
              <div className="md:w-3/4 space-y-6">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-20 bg-gray-100 dark:bg-gray-700 rounded-lg"></div>
                  ))}
                </div>
                <div className="space-y-3">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-l-4 border-red-500 p-4 rounded-lg shadow-sm"
          >
            <h3 className="text-lg font-medium text-red-800 dark:text-red-200 mb-2">
              Error loading job details
            </h3>
            <p className="text-red-600 dark:text-red-300">{error}</p>
            <Link
              to="/jobs"
              className="mt-4 inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              <FiArrowLeft className="mr-2" />
              Back to Jobs
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  if (!job) return null

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto space-y-8"
      >
        {/* Back Button */}
        <motion.div
          whileHover={{ x: -3 }}
          className="inline-block"
        >
          <Link
            to="/jobs"
            className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors group"
          >
            <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Jobs
          </Link>
        </motion.div>

        {/* Main Job Card */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700"
        >
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Company Info Sidebar */}
              <div className="md:w-1/3">
                <div className="sticky top-13 space-y-6">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex justify-center mb-4">
                      <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl opacity-0 group-hover:opacity-20 blur transition duration-300"></div>
                        <img
                          src={job.company_logo_url}
                          alt={job.company_name}
                          className="relative h-24 w-24 object-contain rounded-lg bg-white p-2"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/96?text=Company'
                          }}
                        />
                      </div>
                    </div>
                    <h2 className="text-xl font-bold text-center text-gray-800 dark:text-white">
                      {job.title}
                    </h2>
                    <div className="flex justify-center items-center mt-2">    
                      <span className="text-gray-600 dark:text-gray-300 mr-1 font-medium">
                        Rating : {job.rating}
                      </span>
                      <FiStar className="text-yellow-400 " />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <a
                      href={job.apply_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all"
                    >
                      <FiExternalLink className="mr-2" />
                      Apply Now
                    </a>
                  </div>

                  <div className="bg-blue-50/50 dark:bg-gray-700/50 p-4 rounded-xl border border-blue-100 dark:border-gray-600">
    <h3 className="font-semibold text-blue-800 dark:text-blue-100 text-lg mb-4 flex items-center gap-2">
      Job Highlights
    </h3>
    <ul className="space-y-3">
      <li className="flex items-start gap-3">
        <RiSuitcaseLine className="text-indigo-500 dark:text-indigo-300 mt-1" />
        <span className="text-gray-700 dark:text-gray-200">
          <strong>Employment Type:</strong> {job.employment_type} Position
        </span>
      </li>
      <li className="flex items-start gap-3">
        <TbCertificate className="text-purple-500 dark:text-purple-300 mt-1" />
        <span className="text-gray-700 dark:text-gray-200">
          <strong>Experience Required:</strong> {isInternship ? '0-1 Years' : '2-4 Years'}
        </span>
      </li>
      {!isInternship && (
        <li className="flex items-start gap-3">
          <FaMoneyBillWave className="text-green-500 dark:text-green-300 mt-1" />
          <span className="text-gray-700 dark:text-gray-200">
            <strong>Package:</strong> {job.package_per_annum}
          </span>
        </li>
      )}
      <li className="flex items-start gap-3">
        <FaMapMarkerAlt className="text-pink-500 dark:text-pink-300 mt-1" />
        <span className="text-gray-700 dark:text-gray-200">
          <strong>Location:</strong> {job.location}
        </span>
      </li>
    </ul>
  </div>
                </div>
              </div>

              {/* Job Details */}
              <div className="md:w-3/4">
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                    {job.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-3 text-gray-600 dark:text-gray-300">
                    <span className="flex items-center">
                      <FiBriefcase className="mr-1.5 text-blue-500" />
                      {job.employment_type}
                    </span>
                    <span className="flex items-center">
                      <FiMapPin className="mr-1.5 text-blue-500" />
                      {job.location}
                    </span>
                    {!isInternship && (
                      <span className="flex items-center">
                        <FiDollarSign className="mr-1.5 text-green-500" />
                        {job.package_per_annum}
                      </span>
                    )}
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-800 p-4 rounded-xl border border-blue-100 dark:border-gray-600">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg mr-3">
                        <RiSuitcaseLine className="text-blue-500 dark:text-blue-400 text-xl" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Experience</p>
                        <p className="font-medium text-gray-700 dark:text-gray-200">
                          {isInternship ? '0-1 Years' : '2-4 Years'}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-700 dark:to-gray-800 p-4 rounded-xl border border-purple-100 dark:border-gray-600">
                    <div className="flex items-center">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg mr-3">
                        <FiClock className="text-purple-500 dark:text-purple-400 text-xl" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Type</p>
                        <p className="font-medium text-gray-700 dark:text-gray-200">
                          {job.employment_type}
                        </p>
                      </div>
                    </div>
                  </div>
                  {!isInternship && (
                    <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-700 dark:to-gray-800 p-4 rounded-xl border border-green-100 dark:border-gray-600">
                      <div className="flex items-center">
                        <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg mr-3">
                          <FiDollarSign className="text-green-500 dark:text-green-400 text-xl" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Package</p>
                          <p className="font-medium text-gray-700 dark:text-gray-200">
                            {job.package_per_annum}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-gray-700 dark:to-gray-800 p-4 rounded-xl border border-amber-100 dark:border-gray-600">
                    <div className="flex items-center">
                      <div className="p-2 bg-amber-100 dark:bg-amber-900/50 rounded-lg mr-3">
                        <TbCertificate className="text-amber-500 dark:text-amber-400 text-xl" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Level</p>
                        <p className="font-medium text-gray-700 dark:text-gray-200">
                          {isInternship ? 'Entry Level' : 'Mid-Senior'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
                  <nav className="flex space-x-8">
                    <button
                      onClick={() => setActiveTab('description')}
                      className={`py-3 px-1 font-medium text-sm border-b-2 transition-colors ${activeTab === 'description' ? 'border-blue-500 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`}
                    >
                      Description
                    </button>
                    <button
                      onClick={() => setActiveTab('skills')}
                      className={`py-3 px-1 font-medium text-sm border-b-2 transition-colors ${activeTab === 'skills' ? 'border-blue-500 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`}
                    >
                      Skills
                    </button>
                    <button
                      onClick={() => setActiveTab('culture')}
                      className={`py-3 px-1 font-medium text-sm border-b-2 transition-colors ${activeTab === 'culture' ? 'border-blue-500 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`}
                    >
                      Company Culture
                    </button>
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="mb-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {activeTab === 'description' && (
                        <div className="prose dark:prose-invert max-w-none">
                          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                            About the Role
                          </h3>
                          <div className="flex flex-col md:flex-row gap-6 bg-blue-50/50 dark:bg-gray-700/50 p-4 rounded-xl border border-blue-100 dark:border-gray-600">
                          <div className="text-gray-700 dark:text-gray-300 mb-4" dangerouslySetInnerHTML={{ __html: job.job_description }} />
                        </div>
                        </div>
                      )}

                      {activeTab === 'skills' && (
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                            Skills Required
                          </h3>
                          <div className="flex flex-wrap gap-3">
                            {job.skills.map((skill, index) => (
                              <motion.div
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                className="flex items-center bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 px-4 py-2 rounded-lg shadow-sm transition-colors"
                              >
                                <img
                                  src={skill.image_url}
                                  alt={skill.name}
                                  className="h-6 w-6 mr-2"
                                  onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/24?text=Skill'
                                  }}
                                />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                  {skill.name}
                                </span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}

                      {activeTab === 'culture' && (
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                            Life at Company
                          </h3>
                          <div className="flex flex-col md:flex-row gap-6 bg-blue-50/50 dark:bg-gray-700/50 p-4 rounded-xl border border-blue-100 dark:border-gray-600">
                            <div className="md:w-2/3">
                              <p className="text-gray-700 dark:text-gray-300 mb-4">
                                {job.life_at_company.description}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {['Flexible Hours', 'Team Events', 'Learning Budget', 'Health Benefits'].map((item, i) => (
                                  <span key={i} className="bg-yellow-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm text-gray-700 dark:text-gray-300">
                                    {item}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="md:w-1/3">
                              <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="overflow-hidden rounded-lg shadow-md"
                              >
                                <img
                                  src={job.life_at_company.image_url}
                                  alt="Life at Company"
                                  className="w-full h-48 object-cover"
                                  onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/300x200?text=Company+Culture'
                                  }}
                                />
                              </motion.div>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-gray-800 dark:to-gray-800/50 p-6 rounded-xl border border-blue-100 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                    Ready to apply?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {isInternship 
                      ? "This internship opportunity won't last long. Apply now to kickstart your career!"
                      : "This position is in high demand. Submit your application today to avoid missing out!"}
                  </p>
                  <a
                    href={job.apply_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all"
                  >
                    <FiExternalLink className="mr-2" />
                    Apply Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Similar Jobs */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            Similar {isInternship ? 'Internships' : 'Jobs'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarJobs.map((job) => (
              <SimilarJobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default JobItem