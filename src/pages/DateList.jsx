import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "../App.css";
import Navbar from "../components/Navbar";
import ThemeController from "../components/ThemeController";

function DateList() {
  const [fullDateList, setFullDateList] = useState([]);
  const [dateList, setDateList] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState(null);
  const [sortOption, setSortOption] = useState(null);
  const getAllDates = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/dates`)
      .then((response) => {
        setDateList(response.data);
        setFullDateList(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error to get all dates : ", err);
      });
  };

  useEffect(() => {
    getAllDates();
  }, []);

  const getAllActivities = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/activities`)
      .then((response) => {
        setActivities(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error to get all activities", err);
      });
  };

  useEffect(() => {
    getAllActivities();
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
      <div className="navbar bg-primary text-primary-content">
        <div className="flex-1">
          <Link to={"/"}>
            <button className="btn btn-ghost text-3xl flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              Date Flow
            </button>
          </Link>
        </div>
        <div className="flex-none">
          {/* NEW THEME BUTTON */}
          {<ThemeController />}
        </div>
      </div>

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
              <div
                key={date.id}
                className="card card-compact w-1/2 bg-primary text-primary-content shadow-xl"
              >
                <div className="card-body">
                  <div>
                    <div className="flex justify-between card-title">
                      <section className="capitalize flex gap-3 items-center">
                        {date.title}

                        <p className="flex items-center font-normal text-slate-200 text-base">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            strokeWidth={1}
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            className="w-5 h-5 fill-red-600"
                          >
                            <path
                              fillRule="evenodd"
                              d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {date.location.displayedPlace}
                        </p>
                      </section>
                      <h2 className="flex gap-2 grow-0 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6"
                        >
                          <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                          <path
                            fillRule="evenodd"
                            d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z"
                            clipRule="evenodd"
                          />
                        </svg>

                        {date.time}
                      </h2>
                    </div>
                    <p>Description: {date.description}</p>
                  </div>
                  <div className="flex justify-between items-end">
                    <Link to={`/dates/${date.id}`}>
                      <button className="btn min-h-min h-9">See details</button>
                    </Link>

                    <div className="flex gap-3">
                      <div className="badge badge-primary-content flex gap-1 min-h-min h-7">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          strokeWidth={1}
                          stroke="currentColor"
                          className="w-5 h-6 fill-red-600"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                          />
                        </svg>
                        {date.likes}
                      </div>

                      <div className="badge badge-primary-content min-h-min h-7">
                        &#128178;
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default DateList;
