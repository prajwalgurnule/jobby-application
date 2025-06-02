import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { RiMapPinLine, RiCalendarLine, RiMoneyDollarCircleLine } from 'react-icons/ri'
import { FaStar } from 'react-icons/fa'

const JobCard = ({ job, delay = 0 }) => {
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

  const isInternship = employment_type.toLowerCase() === 'internship'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ y: -5 }}
      className="relative group"
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl opacity-0 group-hover:opacity-20 blur transition duration-300"></div>
      
      <Link to={`/jobs/${id}`} className="relative block">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 h-full border border-gray-200 dark:border-gray-700">
          <div className="p-6">
            <div className="flex items-start space-x-4 mb-4">
              {company_logo_url && (
                <div className="relative flex-shrink-0">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg opacity-0 group-hover:opacity-100 blur transition duration-300"></div>
                  <img
                    src={company_logo_url}
                    alt="company logo"
                    className="relative w-12 h-12 object-contain rounded-lg bg-white p-1"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/48?text=Company'
                    }}
                  />
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1 truncate">
                  {title}
                </h3>
                {rating && (
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span className="text-gray-600 dark:text-gray-300 font-medium">{rating}</span>
                  </div>
                )}
              </div>
              
              <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-800 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
                {employment_type}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <RiMapPinLine className="text-blue-500 mr-2" />
                {location}
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <RiCalendarLine className="text-blue-500 mr-2" />
                {employment_type}
              </div>
            </div>

            {!isInternship && (
              <div className="mb-4 flex items-center">
                <RiMoneyDollarCircleLine className="text-green-500 mr-2 text-lg" />
                <span className="text-gray-700 dark:text-gray-200 font-medium">
                  {package_per_annum}
                </span>
              </div>
            )}

            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
              {job_description}
            </p>

            {skills.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Skills:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skills.slice(0, 4).map((skill, index) => (
                    <span
                      key={index}
                      className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-700 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-medium border border-blue-100 dark:border-gray-600"
                    >
                      {skill.name || `Skill ${index + 1}`}
                    </span>
                  ))}
                  {skills.length > 4 && (
                    <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-xs font-medium">
                      +{skills.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default JobCard