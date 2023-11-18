import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import "../App.css";

function DateDetails() {
  const [date, setDate] = useState(null);
  const [dateActivities, setDateActivities] = useState(null);

  const { dateId } = useParams();
  const navigate = useNavigate();

  const getDateDetails = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/dates/${dateId}`)
      .then((response) => {
        setDate(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDateDetails();
  }, []);

  const getRelatedActivities = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/activities`)
      .then((response) => {
        const relatedActivities = response.data.filter((activity) => {
          if (activity.dateId == dateId) {
            return activity.dateId;
          }
        });
        setDateActivities(relatedActivities);
      })
      .catch((err) => {
        console.log("error to get related activities : ", err);
      });
  };

  useEffect(() => {
    getRelatedActivities();
  }, []);

  const deleteDate = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/dates/${dateId}`);
      console.log("date deleted");
      navigate(-1);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {date === null ? (
        <p>Date details loading...</p>
      ) : (
        <div className="date-box">
          <p>Title: {date.title}</p>
          <p>Time: {date.time}</p>
          <p>Place: {date.place}</p>
          <p>Description: {date.description}</p>

          <Link to={`/dates/${date.id}/edit`}>
            <button>Edit</button>
          </Link>

          <button onClick={() => deleteDate()}>Delete</button>
          {dateActivities === null ? (
            <p>Related activities loading...</p>
          ) : (
            <div>
              <hr />
              <div className="DateDetails-activity-header">
                <p>Related activities :</p>
                <Link to={`/dates/${dateId}/activity/create`}><button>Add an activity</button></Link>
              </div>
              {dateActivities.map((dateActivity) => {
                return (
                  <div className="DateDetails-activity-list">
                    <p>{dateActivity.title}</p>
                    <Link to={`/dates/${dateId}/activity/${dateActivity.id}`}>
                      <button>See activity details</button>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DateDetails;
