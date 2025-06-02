import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import JobCard from '../components/JobCard'
import JobFilters from '../components/JobFilters'
import ProfileCard from '../components/ProfileCard'
import { motion, AnimatePresence } from 'framer-motion'
import useDebounce from '../hooks/useDebounce'
import { BsSearch, BsX, BsArrowRepeat } from 'react-icons/bs'
import { FiFilter } from 'react-icons/fi'
import { RiMoneyDollarCircleLine, RiBriefcaseLine } from 'react-icons/ri'
import { TbMoodEmpty } from 'react-icons/tb'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
    icon: <RiBriefcaseLine className="mr-2" />
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
    icon: <RiBriefcaseLine className="mr-2" />
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
    icon: <RiBriefcaseLine className="mr-2" />
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
    icon: <RiBriefcaseLine className="mr-2" />
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
    icon: <RiMoneyDollarCircleLine className="mr-2" />
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
    icon: <RiMoneyDollarCircleLine className="mr-2" />
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
    icon: <RiMoneyDollarCircleLine className="mr-2" />
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
    icon: <RiMoneyDollarCircleLine className="mr-2" />
  },
]

const Jobs = () => {
  const { authToken } = useAuth()
  const [jobs, setJobs] = useState([])
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [searchTerm, setSearchTerm] = useState('')
  const [employmentTypes, setEmploymentTypes] = useState([])
  const [salaryRange, setSalaryRange] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setApiStatus(apiStatusConstants.inProgress)
        
        let url = 'https://apis.ccbp.in/jobs'
        const params = new URLSearchParams()

        if (employmentTypes.length > 0) {
          params.append('employment_type', employmentTypes.join(','))
        }

        if (salaryRange) {
          params.append('minimum_package', salaryRange)
        }

        if (debouncedSearchTerm) {
          params.append('search', debouncedSearchTerm)
        }

        if (params.toString()) {
          url += `?${params.toString()}`
        }

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        
        const transformedJobs = data.jobs.map(job => ({
          id: job.id,
          title: job.title,
          company_logo_url: job.company_logo_url,
          employment_type: job.employment_type,
          job_description: job.job_description,
          location: job.location,
          package_per_annum: job.package_per_annum,
          rating: job.rating,
          skills: job.skills || []
        }))

        setJobs(transformedJobs)
        setApiStatus(apiStatusConstants.success)
      } catch (err) {
        console.error('Error fetching jobs:', err)
        setApiStatus(apiStatusConstants.failure)
      }
    }

    fetchJobs()
  }, [authToken, debouncedSearchTerm, employmentTypes, salaryRange])

  const toggleEmploymentType = (type) => {
    setEmploymentTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
  }

  const handleRetry = () => {
    setApiStatus(apiStatusConstants.initial)
  }

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setApiStatus(apiStatusConstants.initial)
    }
  }

  const clearSearch = () => {
    setSearchTerm('')
    setApiStatus(apiStatusConstants.initial)
  }

  const renderLoadingView = () => (
    <div className="flex items-center justify-center min-h-[60vh]">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="relative rounded-full h-20 w-20"
      >
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.2, y: 0 }}
            animate={{
              opacity: [0.2, 1, 0.2],
              y: [0, -10, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 0.1,
              delay: i * 0.1
            }}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
            style={{
              left: '50%',
              top: '10%',
              transform: `rotate(${i * 45}deg) translate(0, -30px)`
            }}
          />
        ))}
      </motion.div>
    </div>
  )

  const renderFailureView = () => (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center"
    >
      <div className="relative mb-8">
        <div className="w-40 h-40 bg-gradient-to-r from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 rounded-full flex items-center justify-center">
          <div className="w-32 h-32 bg-gradient-to-r from-red-200 to-red-300 dark:from-red-800/40 dark:to-red-700/40 rounded-full flex items-center justify-center">
            <div className="w-24 h-24 bg-gradient-to-r from-red-300 to-red-400 dark:from-red-700/50 dark:to-red-600/50 rounded-full flex items-center justify-center">
              <BsX className="text-red-500 dark:text-red-400 text-5xl" />
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
        Oops! Something Went Wrong
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6 text-center max-w-md">
        We couldn't fetch the jobs. Please check your connection and try again.
      </p>
      <motion.button
        onClick={handleRetry}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium py-2 px-6 rounded-full shadow-lg flex items-center"
      >
        <BsArrowRepeat className="mr-2" />
        Try Again
      </motion.button>
    </motion.div>
  )

  const renderNoJobsView = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-12"
    >
      <div className="relative inline-block mb-6">
        <TbMoodEmpty className="text-6xl text-gray-400 mx-auto" />
        <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-800 rounded-full opacity-30 blur-sm"></div>
      </div>
      <h3 className="text-2xl font-medium text-gray-700 dark:text-gray-300 mb-3">
        No Jobs Found
      </h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
        We couldn't find any jobs matching your criteria. Try adjusting your filters or search terms.
      </p>
      <motion.button
        onClick={() => {
          setSearchTerm('')
          setEmploymentTypes([])
          setSalaryRange('')
          setApiStatus(apiStatusConstants.initial)
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-6 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-800 text-blue-600 dark:text-blue-400 font-medium py-2 px-6 rounded-full shadow-sm"
      >
        Reset Filters
      </motion.button>
    </motion.div>
  )

  const renderJobsList = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid gap-6"
    >
      {jobs.map((job, index) => (
        <JobCard 
          key={job.id} 
          job={job} 
          delay={index * 0.1}
        />
      ))}
    </motion.div>
  )

  const renderSuccessView = () => (
    <div className="lg:w-3/4">
      <div className="mb-6 lg:hidden">
        <motion.button
          onClick={() => setShowFilters(!showFilters)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-full flex items-center justify-center shadow-lg"
        >
          <FiFilter className="h-5 w-5 mr-2" />
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </motion.button>
      </div>
      
      <div className="mb-8 relative group">
        <motion.div 
          className="relative"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors">
            <BsSearch className="h-5 w-5" />
          </div>
          <input
            type="text"
            placeholder="Search by company, role, or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
            className="w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white shadow-sm transition-all group-hover:shadow-md"
          />
          {searchTerm && (
            <motion.button
              type="button"
              onClick={clearSearch}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              aria-label="Clear search"
            >
              <BsX className="h-6 w-6" />
            </motion.button>
          )}
        </motion.div>
      </div>
      
      {jobs.length === 0 ? renderNoJobsView() : renderJobsList()}
    </div>
  )

  const renderJobs = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      case apiStatusConstants.success:
        return renderSuccessView()
      case apiStatusConstants.failure:
        return renderFailureView()
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col lg:flex-row gap-8"
      >
        <div className="lg:w-1/4">
          <div className="lg:sticky lg:top-12 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ProfileCard />
            </motion.div>
            
            <AnimatePresence>
              {(showFilters || window.innerWidth >= 1024) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <JobFilters
                    employmentTypes={employmentTypes}
                    salaryRange={salaryRange}
                    toggleEmploymentType={toggleEmploymentType}
                    setSalaryRange={setSalaryRange}
                    showFilters={showFilters}
                    setShowFilters={setShowFilters}
                    employmentTypesList={employmentTypesList}
                    salaryRangesList={salaryRangesList}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        {renderJobs()}
      </motion.div>
    </div>
  )
}

export default Jobs