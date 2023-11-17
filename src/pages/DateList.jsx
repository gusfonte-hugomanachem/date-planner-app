import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "../App.css";

function DateList() {
  const [dateList, setDateList] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/dates`)
      .then((response) => {
        setDateList(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div id="date-list-page">
      <h1>Date List</h1>

      <Link to={"/dates/create"}>
        <button>Add a Date</button>
      </Link>

      <div className="dates-container">
        {dateList.map((date) => {
          return (
            <div key={date.id} className="date-box">
              <p>Title: {date.title}</p>
              <p>Time: {date.time}</p>
              <p>Place: {date.place}</p>
              <p>Description: {date.description}</p>
              <Link to={"/"}>
                <button>See details</button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DateList;
