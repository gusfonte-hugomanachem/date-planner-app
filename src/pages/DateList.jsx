import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "../App.css";
import Navbar from "../components/Navbar";
import DateSummary from "../components/DateSummary";

function DateList() {
  const [fullDateList, setFullDateList] = useState([]);
  const [dateList, setDateList] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [sortOption, setSortOption] = useState(null);
  
  const getAllDates = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/dates`)
      .then((response) => {
        setDateList(response.data);
        setFullDateList(response.data);
      })
      .catch((err) => {
        console.log("error to get all dates : ", err);
      });
  };

  useEffect(() => {
    getAllDates();
  }, []);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
    const filteredArray = fullDateList.filter((elm) => {
      return elm.title.toLowerCase().includes(e.target.value.toLowerCase());
    });
    if (e.target.value === "") {
      getAllDates();
    } else {
      setDateList(filteredArray);
    }
  };

  useEffect(() => {
    if (sortOption === "likes-decreasing") {
      const sortedDateList = [...dateList];
      sortedDateList.sort(function (a, b) {
        return b.likes - a.likes;
      });
      setDateList(sortedDateList);
    } else if (sortOption === "cost-decreasing") {
      const sortedDateList = [...dateList];
      sortedDateList.sort(function (a, b) {
        return b.cost - a.cost;
      });
      setDateList(sortedDateList);
    } else if (sortOption === "cost-increasing") {
      const sortedDateList = [...dateList];
      sortedDateList.sort(function (a, b) {
        return a.cost - b.cost;
      });
      setDateList(sortedDateList);
    } else {
    }
  }, [sortOption]);

  /* ------ RENDER -------- */

  return (
    <div className="flex flex-col items-center h-auto gap-14 ">

      <Navbar />
      {/* CONTROLS */}
      <div className="flex gap-10">
        {/* SEARCH NAV */}
        <div className="join">
          <div>
            <div>
              <input
                className="input input-bordered join-item"
                type="text"
                name="searchQuery"
                value={searchQuery}
                onChange={handleChange}
                placeholder="Search"
              />
            </div>
          </div>
          <select
            name="sort-select"
            onChange={(e) => setSortOption(e.target.value)}
            className="select select-bordered join-item"
          >
            <option>Filter</option>
            <option value="likes-decreasing">Most liked</option>
            <option value="cost-decreasing"> Cost : High to Low </option>
            <option value="cost-increasing"> Cost : Low to High </option>
          </select>
          <button className="btn join-item">Search</button>
        </div>
        {/* CREATE DATE BUTTON */}
        <Link to={"/dates/create"} className="">
          <button className="btn items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                clipRule="evenodd"
              />
            </svg>
            Create
          </button>
        </Link>
      </div>

      {/* DATE LIST CONTAINER */}
      <div className="flex flex-col w-full items-center gap-6 mb-6">
        {/* LOADING */}
        {dateList === null ? (
          <span className="loading loading-spinner w-28 absolute top-1/2"></span>
        ) : (
          /* RENDER EACH DATE */
          dateList.map((date) => {
            return (
              <DateSummary key={date.id} date={date}/>
            );
          })
        )}
      </div>
    </div>
  );
}

export default DateList;
