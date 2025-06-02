import { motion, AnimatePresence } from 'framer-motion'
import { FiFilter, FiX } from 'react-icons/fi'
import { RiMoneyDollarCircleLine, RiBriefcaseLine } from 'react-icons/ri'

const JobFilters = ({
  employmentTypes,
  salaryRange,
  toggleEmploymentType,
  setSalaryRange,
  showFilters,
  setShowFilters,
  employmentTypesList,
  salaryRangesList
}) => {
  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowFilters(!showFilters)}
          className="w-full flex items-center justify-center py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-lg"
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
            <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 my-4 border border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setShowFilters(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                <FiX className="h-5 w-5" />
              </button>
              
              <FilterSection
                title="Employment Type"
                options={employmentTypesList}
                type="checkbox"
                selected={employmentTypes}
                onChange={toggleEmploymentType}
              />
              
              <FilterSection
                title="Salary Range"
                options={salaryRangesList}
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
        className="hidden lg:block bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 border border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-2 rounded-lg mr-3">
              <FiFilter className="text-white text-lg" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Filters</h3>
          </div>
        </div>
        
        <FilterSection
          title="Employment Type"
          options={employmentTypesList}
          type="checkbox"
          selected={employmentTypes}
          onChange={toggleEmploymentType}
        />
        
        <FilterSection
          title="Salary Range"
          options={salaryRangesList}
          type="radio"
          selected={salaryRange}
          onChange={setSalaryRange}
        />
      </motion.div>
    </>
  )
}

const FilterSection = ({ title, options, type, selected, onChange }) => {
  return (
    <div className="mb-8 last:mb-0">
      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 uppercase tracking-wider">
        {title}
      </h4>
      <div className="space-y-3">
        {options.map((option) => (
          <motion.div
            key={option.employmentTypeId || option.salaryRangeId}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center"
          >
            <input
              type={type}
              id={option.employmentTypeId || option.salaryRangeId}
              name={type === 'radio' ? 'salary' : option.employmentTypeId}
              checked={
                type === 'checkbox' 
                  ? selected.includes(option.employmentTypeId) 
                  : selected === option.salaryRangeId
              }
              onChange={() => onChange(option.employmentTypeId || option.salaryRangeId)}
              className={`h-4 w-4 ${
                type === 'checkbox'
                  ? 'text-blue-600 focus:ring-blue-500 rounded'
                  : 'text-blue-600 focus:ring-blue-500'
              } border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800`}
            />
            <label
              htmlFor={option.employmentTypeId || option.salaryRangeId}
              className="ml-3 flex items-center text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
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