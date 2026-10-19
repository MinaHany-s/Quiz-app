import { BsFillPatchQuestionFill } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { RiFocusLine } from "react-icons/ri";

export default function Header() {
  const location = useLocation();
  const isQuizPage = location.pathname === "/quiz";
  return (
    <div className=" bg-white p-6 my-5 mx-4 rounded-2xl flex justify-between">
      <div className="flex items-center gap-3">
        <div className=" bg-violet-600 inline-flex p-3 rounded-2xl">
          <BsFillPatchQuestionFill className=" text-white text-4xl" />
        </div>
        <h1 className=" font-bold text-xl">Quizzzz</h1>
      </div>
      <div className="flex gap-1 items-center">
        <div className="flex gap-1 items-center  h-9 p-3   ">
          {isQuizPage ? (
            <RiFocusLine className="text-xl text-violet-600" />
          ) : (
            <FaHome className="text-xl text-violet-600" />
          )}
          <p className="text-lg text-violet-600">
            {isQuizPage ? "Quiz" : "Home"}
          </p>
        </div>
       
      </div>
    </div>
  );
}
