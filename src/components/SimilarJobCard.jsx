// src/components/SimilarJobCard.jsx
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const SimilarJobCard = ({ job }) => {
  // Safely destructure with default values
  const {
    id,
    title = 'No title available',
    company_logo_url,
    company_name = 'Company not specified',
    employment_type = 'Not specified',
    job_description = 'No description available',
    location = 'Location not specified',
    package_per_annum = 'Not disclosed',
    rating,
  } = job

  // Format the package if it exists
  const formattedPackage = package_per_annum && package_per_annum !== 'Not disclosed' 
    ? `${package_per_annum} LPA`
    : package_per_annum

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700"
    >
      <Link to={`/jobs/${id}`} className="block p-6">
        <div className="flex items-start space-x-4 mb-4">
          <img
            src={company_logo_url}
            alt="company logo"
            className="w-12 h-12 object-contain"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/48'
            }}
          />
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">
              {title}
            </h3>
            
            {rating && (
              <div className="flex items-center">
                <span className="text-gray-600 dark:text-gray-300">Rating: {rating}</span>
                <svg
                  className="w-4 h-4 text-yellow-500 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="flex items-center text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              {job.location}
            </span>
            <span className="flex items-center text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              {job.employment_type}
            </span>
          </div>
        </div>
        {/* <div className="mb-4">
          <p className="text-gray-600 dark:text-gray-300 font-semibold text-sm">
            Package: <span className="text-blue-600 dark:text-blue-400">{formattedPackage}</span>
          </p>
        </div> */}

        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Description:
        </h4>
        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
          {job_description}
        </p>
      </Link>
    </motion.div>
  )
}

export default SimilarJobCard