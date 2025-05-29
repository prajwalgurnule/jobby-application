// src/components/JobFilters.jsx
import { motion, AnimatePresence } from 'framer-motion'
import { FiFilter, FiBriefcase, FiDollarSign } from 'react-icons/fi'

const JobFilters = ({
  employmentTypes,
  salaryRange,
  toggleEmploymentType,
  setSalaryRange,
  showFilters,
  setShowFilters,
}) => {
  const employmentOptions = [
    { id: 'FULLTIME', label: 'Full Time', icon: <FiBriefcase className="mr-2" /> },
    { id: 'PARTTIME', label: 'Part Time', icon: <FiBriefcase className="mr-2" /> },
    { id: 'FREELANCE', label: 'Freelance', icon: <FiBriefcase className="mr-2" /> },
    { id: 'INTERNSHIP', label: 'Internship', icon: <FiBriefcase className="mr-2" /> },
  ]

  const salaryOptions = [
    { id: '1000000', label: '10 LPA and above', icon: <FiDollarSign className="mr-2" /> },
    { id: '2000000', label: '20 LPA and above', icon: <FiDollarSign className="mr-2" /> },
    { id: '3000000', label: '30 LPA and above', icon: <FiDollarSign className="mr-2" /> },
    { id: '4000000', label: '40 LPA and above', icon: <FiDollarSign className="mr-2" /> },
  ]

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowFilters(!showFilters)}
          className="w-full flex items-center justify-center py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-md"
        >
          <FiFilter className="mr-2" />
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </motion.button>
      </div>

      {/* Mobile Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 my-4 border border-gray-200 dark:border-gray-700">
              <FilterSection
                title="Employment Type"
                options={employmentOptions}
                type="checkbox"
                selected={employmentTypes}
                onChange={toggleEmploymentType}
              />
              <FilterSection
                title="Salary Range"
                options={salaryOptions}
                type="radio"
                selected={salaryRange}
                onChange={setSalaryRange}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Filters */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="hidden lg:block bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center mb-6">
          <FiFilter className="text-blue-500 mr-2 text-xl" />
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Filters</h3>
        </div>
        
        <FilterSection
          title="Employment Type"
          options={employmentOptions}
          type="checkbox"
          selected={employmentTypes}
          onChange={toggleEmploymentType}
        />
        
        <FilterSection
          title="Salary Range"
          options={salaryOptions}
          type="radio"
          selected={salaryRange}
          onChange={setSalaryRange}
        />
      </motion.div>
    </>
  )
}

// Reusable Filter Section Component
const FilterSection = ({ title, options, type, selected, onChange }) => {
  return (
    <div className="mb-8 last:mb-0">
      <h4 className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
        {title}
      </h4>
      <div className="space-y-3">
        {options.map((option) => (
          <motion.div
            key={option.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center"
          >
            <input
              type={type}
              id={option.id}
              name={type === 'radio' ? 'salary' : option.id}
              checked={type === 'checkbox' ? selected.includes(option.id) : selected === option.id}
              onChange={() => onChange(option.id)}
              className={`h-4 w-4 ${
                type === 'checkbox'
                  ? 'text-blue-600 focus:ring-blue-500 rounded'
                  : 'text-blue-600 focus:ring-blue-500'
              } border-gray-300 dark:border-gray-600`}
            />
            <label
              htmlFor={option.id}
              className="ml-3 flex items-center text-sm text-gray-700 dark:text-gray-300"
            >
              {option.icon}
              {option.label}
            </label>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default JobFilters