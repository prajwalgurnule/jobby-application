// src/components/ProfileCard.jsx
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { motion } from 'framer-motion'

const ProfileCard = () => {
  const { authToken } = useAuth()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('https://apis.ccbp.in/profile', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })

        if (!response.ok) {
          throw new Error('Failed to fetch profile')
        }

        const data = await response.json()
        setProfile(data.profile_details)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [authToken])

  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse"
      >
        <div className="flex items-center space-x-4">
          <div className="rounded-full bg-gray-300 dark:bg-gray-600 h-16 w-16"></div>
          <div className="flex-1 space-y-3">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
      </motion.div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 p-4 rounded-md">
        {error}
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={profile.profile_image_url}
              alt={profile.name}
              className="h-16 w-16 rounded-full object-cover border-4 border-blue-100 dark:border-gray-700 shadow-sm"
            />
            <div className="absolute bottom-0 right-0 h-4 w-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-700"></div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">{profile.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{profile.short_bio}</p>
          </div>
        </div>
        {/* <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between">
            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">Experience</p>
              <p className="font-semibold text-gray-700 dark:text-gray-200">
                {profile.experience_in_years || 0} yrs
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">Rating</p>
              <p className="font-semibold text-gray-700 dark:text-gray-200">
                {profile.rating || 'N/A'}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">Jobs</p>
              <p className="font-semibold text-gray-700 dark:text-gray-200">
                {profile.jobs_count || 0}
              </p>
            </div>
          </div>
        </div> */}
      </div>
    </motion.div>
  )
}

export default ProfileCard