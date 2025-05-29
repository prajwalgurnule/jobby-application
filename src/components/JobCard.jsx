// src/components/JobCard.jsx
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const JobCard = ({ job }) => {
  // Safely destructure with default values
  const {
    id,
    title = 'No title available',
    company_logo_url,
    employment_type = 'Not specified',
    job_description = 'No description available',
    location = 'Location not specified',
    package_per_annum = 'Salary not specified',
    rating,
    skills = []
  } = job

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <Link to={`/jobs/${id}`} className="block p-6">
        <div className="flex items-start space-x-4 mb-4">
          {company_logo_url && (
            <img
              src={company_logo_url}
              alt="company logo"
              className="w-12 h-12 object-contain"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/48'
              }}
            />
          )}
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">
              {title}
            </h3>
            {rating && (
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 text-yellow-500 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-gray-600 dark:text-gray-300">{rating}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 mb-4">
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            {location}
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            {employment_type}
          </div>
        </div>

        <div className="mb-4">
          <p className="text-gray-600 dark:text-gray-300 font-semibold">
            Package: <span className="text-blue-600 dark:text-blue-400">{package_per_annum}</span>
          </p>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {job_description}
        </p>

        {/* <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Skills:
          </h4>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-xs font-medium"
              >
                {skill.name || `Skill ${index + 1}`}
              </span>
            ))}
            {skills.length === 0 && (
              <span className="text-gray-500 dark:text-gray-400 text-xs">
                No skills specified
              </span>
            )}
          </div>
        </div> */}
      </Link>
    </motion.div>
  )
}

export default JobCard