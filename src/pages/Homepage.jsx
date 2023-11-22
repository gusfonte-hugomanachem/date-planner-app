import Footer from "../components/Footer";

import "../App.css";
import { Link } from "react-router-dom";

function Homepage() {
  return (
    <div
      id="home-page"
      className="flex flex-col items-center justify-between min-h-screen"
    >
      <h1 className="font-sans text-8xl">Date Flow</h1>

      <p className="mx-80">
        A collaborative date planner app for all your date planning needs!
        Whether it be a romantic, casual or formal plan, Date Flow allows users
        to go as in-depth as needed, creating multiple activities, nested
        checklists, or keeping your plan a little more vague as you hammer out
        the details.
      </p>
      
<div className="flex gap-8">
      <Link to={"/dates/create"}>
      <button className="btn bg-primary text-primary-content hover:bg-white">Start planning</button>
      </Link>

      <Link to={"/dates"}>
      <button className="btn bg-primary text-primary-content hover:bg-white">Browse dates</button>
      </Link>
</div>

<Footer />
    </div>
  );
}

export default Homepage;
