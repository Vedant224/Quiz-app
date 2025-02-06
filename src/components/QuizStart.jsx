import { motion } from "framer-motion"
import { FaPlay } from "react-icons/fa"
import PropTypes from 'prop-types';

function QuizStart({ onStart }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Welcome to the Quiz!</h1>
      <p className="text-xl text-gray-600 mb-12">Test your knowledge with our interactive quiz. Ready to begin?</p>
      <motion.button
        onClick={onStart}
        className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-gradient-to-r from-indigo-700 to-blue-500 rounded-full overflow-hidden"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaPlay className="mr-2" />
        Start Quiz
        <motion.span
          className="absolute inset-0 h-full w-full bg-white rounded-full"
          style={{ originX: 0 }}
          initial={{ scale: 0 }}
          animate={{ scale: 0 }}
          whileHover={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />
      </motion.button>
    </motion.div>
  )
}
QuizStart.propTypes = {
  onStart: PropTypes.func.isRequired,
};

export default QuizStart

