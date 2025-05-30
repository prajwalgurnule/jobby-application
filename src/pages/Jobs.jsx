// src/pages/Jobs.jsx
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import JobCard from '../components/JobCard'
import JobFilters from '../components/JobFilters'
import ProfileCard from '../components/ProfileCard'
import { motion, AnimatePresence } from 'framer-motion'
import useDebounce from '../hooks/useDebounce'
import Cookies from 'js-cookie'
import { BsSearch, BsX } from 'react-icons/bs'
import { FiFilter } from 'react-icons/fi'

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
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
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
            Authorization: `Bearer ${authToken || Cookies.get('jwt_token')}`,
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
    <div className="flex items-center justify-center min-h-screen" data-testid="loader">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"
      ></motion.div>
    </div>
  )

  const renderFailureView = () => (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="flex flex-col items-center justify-center min-h-screen p-4"
    >
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="w-64 mb-6"
      />
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
        Oops! Something Went Wrong
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6 text-center max-w-md">
        We cannot seem to fetch the jobs. Please try again.
      </p>
      <motion.button
        onClick={handleRetry}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md shadow-md"
        data-testid="button"
      >
        Retry
      </motion.button>
    </motion.div>
  )

  const renderNoJobsView = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-12"
    >
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="w-48 mx-auto mb-6"
      />
      <h3 className="text-2xl font-medium text-gray-700 dark:text-gray-300 mb-3">
        No Jobs Found
      </h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
        We could not find any jobs matching your criteria. Try adjusting your filters or search terms.
      </p>
    </motion.div>
  )

  const renderJobsList = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid gap-6"
    >
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
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
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md flex items-center justify-center shadow-md"
        >
          <FiFilter className="h-5 w-5 mr-2" />
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </motion.button>
      </div>
      <div className="mb-8">
        <motion.div 
          className="relative"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <BsSearch className="h-5 w-5" />
          </div>
          <input
            type="text"
            placeholder="Search by company, role, or keyword"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
            className="w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white shadow-sm"
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
      <div className="flex flex-col lg:flex-row gap-8">
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
      </div>
    </div>
  )
}

export default Jobs