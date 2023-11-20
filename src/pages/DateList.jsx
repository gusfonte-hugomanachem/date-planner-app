import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "../App.css";

function DateList() {
  const [fullDateList, setFullDateList] = useState([]);
  const [dateList, setDateList] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState(null);

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
        {dateList === null ? (
          <h1>Loading...</h1>
        ) : (
          dateList.map((date) => {
            return (
              <div key={date.id} className="date-box">
                <div className="date-box-date">
                  <div className="date-box-general-infos">
                    <p>Title: {date.title}</p>
                    <p>Time: {date.time}</p>
                    <p>Place: {date.place}</p>
                    <p>Description: {date.description}</p>
                    <Link to={`/dates/${date.id}`}>
                      <button>See details</button>
                    </Link>
                  </div>
                  <div className="date-box-likes">
                    <div>{date.likes} </div>
                    <div>&#128077; </div>
                  </div>
                </div>
                {activities === null ? (
                  <p>Loading activities...</p>
                ) : (
                  <h3>
                    {
                      activities.filter(
                        (activity) => activity.dateId === date.id
                      ).length
                    }{" "}
                    Activities
                  </h3>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default DateList;
