
import { useLocation, useNavigate } from "react-router-dom";

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();

  const { trueAnswers, totalQuestions } = location.state ?? {
    trueAnswers: 0,
    totalQuestions: 0,
  };

  return (
    <div className="m-5 rounded-2xl bg-white p-8 text-center">
      <h1 className="mb-4 text-3xl font-bold text-violet-700">
        Quiz Results
      </h1>

      <p className="text-xl">
        Your Score: {trueAnswers} / {totalQuestions}
      </p>

      <button
        onClick={() => navigate("/")}
        className="mt-6 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white hover:bg-violet-700"
      >
        Try Again
      </button>
    </div>
  );
}
