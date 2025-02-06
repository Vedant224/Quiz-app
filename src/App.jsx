import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import QuizStart from "./components/QuizStart";
import QuizQuestion from "./components/QuizQuestion";
import QuizResult from "./components/QuizResult";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const [quizData, setQuizData] = useState(null);
  const [quizState, setQuizState] = useState("start");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("api/Uw5CrX");
        setQuizData(response.data);
      } catch {
        setError("Failed to load quiz data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, []);

  const startQuiz = () => {
    setLoading(true);
    setTimeout(() => {
      setQuizState("question");
      setCurrentQuestion(0);
      setScore(0);
      setLoading(false);
    }, 1500);
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore(score + 1);
    setTimeout(() => {
      if (currentQuestion < quizData?.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setQuizState("result");
      }
    }, 500);
  };

  const restartQuiz = () => {
    setQuizState("start");
    setCurrentQuestion(0);
    setScore(0);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100">
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <p className="text-red-500 font-bold">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md"
      >
        <AnimatePresence mode="wait">
          {quizState === "start" ? (
            <QuizStart key="start" onStart={startQuiz} />
          ) : quizState === "question" && quizData ? (
            <QuizQuestion
              key={`question-${currentQuestion}`}
              question={quizData.questions[currentQuestion]}
              questionNumber={currentQuestion + 1}
              totalQuestions={quizData.questions.length}
              onAnswer={handleAnswer}
            />
          ) : (
            <QuizResult
              key="result"
              score={score}
              totalQuestions={quizData?.questions.length}
              onRestart={restartQuiz}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default App;
