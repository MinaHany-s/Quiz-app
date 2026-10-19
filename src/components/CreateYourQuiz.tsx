import { useState } from "react";
import { Link } from "react-router-dom";

export default function CreateYourQuiz() {
  const [selectedNumber, setSelectedNumber] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState("9");
  const [selectedDifficulty, setSelectedDifficulty] = useState("medium");
  return (
    <section className="p-4 m-5 bg-white rounded-2xl">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold">Create Your Quiz.</h2>
        <p className=" text-gray-600">Choose your prefernces to get started.</p>
      </div>
      <div className="space-y-8">
        {/* number of questions */}
        <div>
          <label className="font-semibold text-base block my-3">
            Number of Questuins
          </label>
          <div className="grid grid-cols-4 gap-3">
            {[5, 10, 15, 20].map((number) => (
              <button
                onClick={() => setSelectedNumber(number)}
                key={number}
                type="button"
                className={` cursor-pointer rounded-xl border py-3 font-semibold transition ${
                  selectedNumber === number
                    ? "border-violet-600 bg-violet-600 text-white shadow-lg shadow-violet-200"
                    : "border-gray-300 bg-gray-100 text-gray-700 hover:border-violet-400 hover:bg-violet-50"
                }`}
              >
                {number}
              </button>
            ))}
          </div>
        </div>

        {/*Select Category  */}
        <div>
          <label className="font-semibold text-base block my-3">
            Select Category
          </label>
          <select
            id="category"
            value={selectedCategory }
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full cursor-pointer appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 text-gray-700 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="9">General Knowledge</option>
            <option value="10">Entertainment: Books</option>
            <option value="11">Entertainment: Film</option>
            <option value="12">Entertainment: Music</option>
            <option value="13">Entertainment: Musicals & Theatres</option>
            <option value="14">Entertainment: Television</option>
            <option value="15">Entertainment: Video Games</option>
            <option value="16">Entertainment: Board Games</option>
            <option value="17">Science & Nature</option>
            <option value="18">Science: Computers</option>
            <option value="19">Science: Mathematics</option>
            <option value="20">Mythology</option>
            <option value="21">Sports</option>
            <option value="22">Geography</option>
            <option value="23">History</option>
            <option value="24">Politics</option>
            <option value="25">Art</option>
            <option value="26">Celebrities</option>
            <option value="27">Animals</option>
            <option value="28">Vehicles</option>
            <option value="29">Entertainment: Comics</option>
            <option value="30">Science: Gadgets</option>
            <option value="31">Entertainment: Japanese Anime & Manga</option>
            <option value="32">Entertainment: Cartoon & Animations</option>
          </select>
        </div>

        {/* Select difficulty */}
        <div>
          <label className="font-semibold text-base block my-3">
            Select difficulty
          </label>
          <div className="grid grid-cols-3 gap-3">
            {["easy", "medium", "hard"].map((difficulty) => (
              <button
                key={difficulty}
                type="button"
                onClick={() => setSelectedDifficulty(difficulty)}
                className={`rounded-xl border py-3 font-semibold transition ${
                  selectedDifficulty === difficulty
                    ? difficulty === "easy"
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700 ring-2 ring-emerald-100"
                      : difficulty === "medium"
                        ? "border-violet-500 bg-violet-50 text-violet-700 ring-2 ring-violet-100"
                        : "border-rose-500 bg-rose-50 text-rose-700 ring-2 ring-rose-100"
                    : "border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100"
                }`}
              >
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Start Button */}
        <Link
          to={"/quiz"}
          state={{
            number: selectedNumber,
            category: selectedCategory,
            difficulty: selectedDifficulty,
          }}
          type="button"
          className="group flex w-full items-center justify-center gap-3 rounded-xl bg-violet-600 px-6 py-4 font-bold text-white shadow-lg shadow-violet-200 transition duration-300 hover:-translate-y-0.5 hover:bg-violet-700 hover:shadow-xl"
        >
          Start Quiz
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
      {/* Footer */}
      <p className="mt-6 text-center text-sm text-gray-400">
        Your next challenge is just one click away.
      </p>
    </section>
  );
}
