import { motion } from "framer-motion"
import PropTypes from 'prop-types';

function QuizQuestion({ question, questionNumber, totalQuestions, onAnswer }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="text-center">
        <p className="text-sm text-gray-500 mb-2">
          Question {questionNumber} of {totalQuestions}
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
          <motion.div
            className="bg-gradient-to-r from-teal-200 to-blue-400 h-2.5"
            initial={{ width: `${((questionNumber - 1) / totalQuestions) * 100}%` }}
            animate={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            transition={{ duration: 0.2}}
          ></motion.div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 text-center">{question.description}</h2>

      <div className="space-y-4">
        {question.options.map((option, index) => (
          <motion.button
            key={index}
            onClick={() => onAnswer(option.is_correct)}
            className="w-full p-4 text-left text-gray-700 bg-white border-2 border-gray-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {option.description}
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
QuizQuestion.propTypes = {
  question: PropTypes.shape({
    description: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        description: PropTypes.string.isRequired,
        is_correct: PropTypes.bool.isRequired
      })
    ).isRequired
  }).isRequired,
  questionNumber: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  onAnswer: PropTypes.func.isRequired
};

export default QuizQuestion

