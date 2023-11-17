import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "../App.css";

function DateList() {
  const [fullDateList, setFullDateList] = useState([]);
  const [dateList, setDateList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const getAllDates = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/dates`)
      .then((response) => {
        setDateList(response.data);
        setFullDateList(response.data);
      })
      .catch((err) => {
        console.log(err);
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

  return (
    <div id="date-list-page">
      <h1>Date List</h1>
      <label>
        Search a Date
        <input
          type="text"
          name="searchQuery"
          value={searchQuery}
          onChange={handleChange}
        />
      </label>
      <br />
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
              <Link to={`/dates/${date.id}`}>
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
