import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as he from "he";
type ApiQuestion = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

type Question = ApiQuestion & {
  answers: string[];
};

export default function Quiz() {
  const location = useLocation();
  const navigate = useNavigate();

  const { number, category, difficulty } = location.state ?? {};

  const [questionsData, setQuestionsData] = useState<Question[]>([]);
  const [currentQuestionIdx, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [trueAnswers, setTrueAnswers] = useState(0);

  function shuffleAnswers(answers: string[]): string[] {
    const shuffled = [...answers];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
  }

  useEffect(() => {
    if (!number || !category || !difficulty) {
      navigate("/");
      return;
    }

    async function getData() {
      try {
        setLoading(true);

        const { data } = await axios.get(
          `https://opentdb.com/api.php?amount=${number}&category=${category}&difficulty=${difficulty}&type=multiple`,
        );

        if (data.response_code !== 0 || data.results.length === 0) {
          return;
        }

        const results = data.results as ApiQuestion[];

        const preparedQuestions: Question[] = results.map((question) => {
          const decodedQuestion = he.decode(question.question);
          const decodedCorrectAnswer = he.decode(question.correct_answer);

          const decodedIncorrectAnswers = question.incorrect_answers.map(
            (answer) => he.decode(answer),
          );

          return {
            ...question,
            question: decodedQuestion,
            correct_answer: decodedCorrectAnswer,
            incorrect_answers: decodedIncorrectAnswers,
            answers: shuffleAnswers([
              ...decodedIncorrectAnswers,
              decodedCorrectAnswer,
            ]),
          };
        });

        setQuestionsData(preparedQuestions);
      } catch (error: unknown) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, [number, category, difficulty, navigate]);

  const currentQuestion = questionsData[currentQuestionIdx];

  function handleNext() {
    if (selectedAnswer === null) return;

    if (currentQuestionIdx < questionsData.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      navigate("/results", {
        state: {
          trueAnswers,
          totalQuestions: questionsData.length,
        },
      });
    }
  }

  if (loading) {
    return (
      <section className="m-5 rounded-2xl bg-white p-6 text-center">
        <p className="text-lg font-semibold text-violet-700">
          Loading questions...
        </p>
      </section>
    );
  }

  if (!currentQuestion) return null;

  return (
    <section className="m-5 rounded-2xl bg-white p-6">
      <div className="flex justify-between font-semibold text-violet-700">
        <span>
          QUESTION {currentQuestionIdx + 1} OF {questionsData.length}
        </span>
        <span className="capitalize">{difficulty}</span>
      </div>

      <div className="my-5 h-2 overflow-hidden rounded-2xl bg-gray-300">
        <div
          style={{
            width: `${((currentQuestionIdx + 1) / questionsData.length) * 100}%`,
          }}
          className="h-2 rounded-2xl bg-violet-600 transition-all duration-300"
        />
      </div>

      <h2 className="mb-6 text-2xl font-semibold">
        {currentQuestion.question}
      </h2>

      <div className="flex flex-col gap-3">
        {currentQuestion.answers.map((answer, idx) => {
          const isSelected = selectedAnswer === answer;
          const isCorrect = answer === currentQuestion.correct_answer;

          let answerStyle = "border-gray-300 bg-white hover:border-violet-400";

          if (selectedAnswer !== null) {
            if (isCorrect) {
              answerStyle = "border-green-500 bg-green-100 text-green-800";
            } else if (isSelected) {
              answerStyle = "border-red-500 bg-red-100 text-red-800";
            }
          }

          return (
            <button
              key={`${currentQuestionIdx}-${idx}`}
              onClick={() => {
                if (selectedAnswer !== null) return;

                setSelectedAnswer(answer);

                if (isCorrect) {
                  setTrueAnswers((prev) => prev + 1);
                }
              }}
              disabled={selectedAnswer !== null}
              className={`w-full rounded-xl border p-4 text-left transition-colors disabled:cursor-not-allowed ${answerStyle}`}
            >
              {String.fromCharCode(65 + idx)}. {answer}
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleNext}
          disabled={selectedAnswer === null}
          className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {currentQuestionIdx === questionsData.length - 1
            ? "Finish Quiz"
            : "Next Question"}
        </button>
      </div>
    </section>
  );
}
