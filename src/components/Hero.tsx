import { MdStackedLineChart } from "react-icons/md";
import { FiBookOpen } from "react-icons/fi";

export default function Hero() {
  return (
    <>
      <div className="flex items-center flex-col">
        <div className="flex flex-col items-center gap-3">
          <span className=" bg-gray-300 px-3 py-2 rounded-3xl text-violet-700 text-sm">
            {" "}
            YOUR NEXT CHALLENGE
          </span>
          <h1 className="text-3xl font-semibold">
            Ready to test your knowledge ?
          </h1>
          <p className=" text-gray-600">
            Build your quiz, challenge yourself, and track your progress.
          </p>
        </div>
      </div>

      <div className="flex m-5 gap-4">
        <div className="w-1/2 bg-white p-4 gap-3 flex flex-col rounded-2xl">
          <MdStackedLineChart className=" text-xl text-violet-700" />
          <div>
            <h2 className=" text-3xl font-semibold">Track</h2>
            <p>Your quiz results</p>
          </div>
        </div>
        <div className="w-1/2 bg-white p-4 gap-3 flex flex-col rounded-2xl">
          <FiBookOpen className=" text-xl text-violet-700" />
          <div>
            <h2 className=" text-3xl font-semibold">+10</h2>
            <p>Questions to choose</p>
          </div>
        </div>
      
      </div>
    </>
  );
}
