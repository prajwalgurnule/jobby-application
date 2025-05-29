// src/pages/Jobs.jsx
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import JobCard from '../components/JobCard'
import JobFilters from '../components/JobFilters'
import ProfileCard from '../components/ProfileCard'
import { motion } from 'framer-motion'
import useDebounce from '../hooks/useDebounce'
import Cookies from 'js-cookie'
import { BsSearch } from 'react-icons/bs'

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
        
        // Transform the API data to match our component's expectations
        const transformedJobs = data.jobs.map(job => ({
          id: job.id,
          title: job.title,
          company_logo_url: job.company_logo_url,
          employment_type: job.employment_type,
          job_description: job.job_description,
          location: job.location,
          package_per_annum: job.package_per_annum,
          rating: job.rating,
          skills: job.skills || [] // Ensure skills is always an array
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

  const renderLoadingView = () => (
    <div className="flex items-center justify-center min-h-screen" data-testid="loader">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  )

  const renderFailureView = () => (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="w-64 mb-4"
      />
      <h1 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
        Oops! Something Went Wrong
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-4 text-center">
        We cannot seem to fetch the jobs. Please try again.
      </p>
      <button
        onClick={handleRetry}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
        data-testid="button"
      >
        Retry
      </button>
    </div>
  )

  const renderNoJobsView = () => (
    <div className="text-center py-12">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="w-48 mx-auto mb-4"
      />
      <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
        No Jobs Found
      </h3>
      <p className="text-gray-500 dark:text-gray-400">
        We could not find any jobs. Try other filters.
      </p>
    </div>
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
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
          <button
            type="button"
            onClick={() => setApiStatus(apiStatusConstants.initial)}
            className="absolute right-2 top-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            data-testid="searchButton"
          >
            <BsSearch className="h-5 w-5" />
          </button>
        </div>
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
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/4">
          <div className="lg:sticky lg:top-4 space-y-6">
            <ProfileCard />
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
          </div>
        </div>
        {renderJobs()}
      </div>
    </div>
  )
}

export default Jobs