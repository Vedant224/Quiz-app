"use client"

import { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { motion } from "framer-motion"
import Confetti from "react-confetti"

function QuizResult({ score, totalQuestions, onRestart }) {
  const [showConfetti, setShowConfetti] = useState(false)
  const percentage = (score / totalQuestions) * 100

  useEffect(() => {
    setShowConfetti(true)
    const timer = setTimeout(() => setShowConfetti(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      {showConfetti && score > totalQuestions / 2 && <Confetti recycle={false} numberOfPieces={200} />}

      <h2 className="text-4xl font-bold text-gray-900 mb-8">Quiz Complete!</h2>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="mb-8"
      >
        <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500 mb-2">
          {percentage}%
        </div>
        <p className="text-xl text-gray-600">
          You scored {score} out of {totalQuestions} questions correctly
        </p>
      </motion.div>

      <div className="mb-12">
        {percentage === 100 && <p className="text-2xl text-green-500 font-semibold">Perfect Score! Amazing job! 🏆</p>}
        {percentage >= 70 && percentage < 100 && (
          <p className="text-2xl text-purple-500 font-semibold">Great job! Keep it up! 🌟</p>
        )}
        {percentage >= 40 && percentage < 70 && (
          <p className="text-2xl text-yellow-500 font-semibold">Good effort! Room for improvement! 📚</p>
        )}
        {percentage < 40 && (
          <p className="text-2xl text-red-500 font-semibold">Keep practicing! You&apos;ll get better! 💪</p>
        )}
      </div>

      <motion.button
        onClick={onRestart}
        className="px-8 py-3 text-lg font-medium text-white bg-blue-500 rounded-full hover:from-blue-600 hover:to-green-200 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Try Again
      </motion.button>
    </motion.div>
  )
}
QuizResult.propTypes = {
  score: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  onRestart: PropTypes.func.isRequired,
}

export default QuizResult

