import Footer from "../components/Footer";

import "../App.css";
import { Link } from "react-router-dom";
import ThemeController from "../components/ThemeController";

function Homepage() {
  return (
    <div
      /* bg-gradient-to-b from-primary to-slate-800 */
      className="flex flex-col items-center justify-between min-h-screen"
    >
      <div className=" fixed left-3">
      {<ThemeController />}
      </div>
      
      <div className="flex items-end gap-4 mt-20 select-none">
        <h1 className="font-serif text-8xl font-bold leading-none">
          Date Flow
        </h1>
      
        {/* TRY   ../src/assets/dots-and-pencil.png OR src/assets/dots-and-pencil.png ON PRODUCTION */}
        <img
          src="./src/assets/dots-and-pencil.png"
          alt="dots and pencil"
          className="w-80 pb-3"
        />
      </div>

      <section className="flex flex-col gap-6 items-center w-3/5 select-none">
        <h2 className="text-5xl mb-4 font-semibold text-center">
          For all your date planning needs
        </h2>
        <p className="text-lg lg:mx-2 font-medium text-center leading-relaxed">
          A collaborative date planner app for all your date planning needs!
          Whether it be a romantic, casual or formal plan,{" "}
          <span className="font-bold italic">Date Flow</span> allows users to go
          as in-depth as needed, creating multiple activities, nested
          checklists, or keeping your plan a little more vague as you hammer out
          the details.
        </p>

        <div className="flex gap-8">
          <Link to={"/dates/create"}>
            <button className="btn bg-primary text-primary-content hover:bg-gray-600">
              Start planning
            </button>
          </Link>

          <Link to={"/dates"}>
            <button className="btn bg-primary text-primary-content hover:bg-gray-600">
              Browse dates
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Homepage;
