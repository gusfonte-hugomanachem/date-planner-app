import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import axios from "axios";

import "../App.css";

function DateDetails() {
  const [date, setDate] = useState(null);
  const [dateActivities, setDateActivities] = useState(null);
  const [likesCounter, setLikesCounter] = useState(0);
  const { dateId } = useParams();
  const navigate = useNavigate();
  const [center, setCenter] = useState(null);

  const getDateDetails = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/dates/${dateId}`)
      .then((response) => {
        setDate(response.data);
        setLikesCounter(response.data.likes);
        setCenter({
          lat: response.data.location.lat,
          lng: response.data.location.lon,
        });
      })
      .catch((err) => {
        console.log("error to get date details : ", err);
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
      navigate(-1);
    } catch (err) {
      console.log("error to delete date : ", err);
    }
  };

  const incrementLikesCounter = () => {
    const newLikesCounter = likesCounter + 1;

    const updatedDate = { ...date };
    updatedDate.likes = newLikesCounter;

    axios
      .put(`${import.meta.env.VITE_API_URL}/dates/${dateId}`, updatedDate)
      .then(() => {
        getDateDetails();
      })
      .catch((err) => console.log("error to put new likes counter : ", err));
  };

  return (
    <div>
      {date === null ? (
        <p>Date details loading...</p>
      ) : (
        <div className="date-box">
          <div className="date-box-date">
            <div className="date-box-date-infos">
              <p>Title: {date.title}</p>
              <p>Time: {date.time}</p>
              <p>Place: {date.location.displayedPlace}</p>
              {center.lat === null || center.lon === null ? (
                ""
              ) : (
                <GoogleMap
                  zoom={15}
                  center={center}
                  mapContainerClassName="map-container"
                >
                  <MarkerF position={center} />
                </GoogleMap>
              )}
              <p>Description: {date.description}</p>
              <p>Cost : {date.cost}€</p>
              <Link to={`/dates/${date.id}/edit`}>
                <button>Edit</button>
              </Link>

              <button onClick={() => deleteDate()}>Delete</button>
            </div>
            <div className="date-box-likes">
              <p>{likesCounter} Likes</p>
              <button onClick={incrementLikesCounter}>&#128077;</button>
            </div>
          </div>

          {dateActivities === null ? (
            <p>Related activities loading...</p>
          ) : (
            <div>
              <hr />
              <div className="DateDetails-activity-header">
                <p>Related activities :</p>
                <Link to={`/dates/${dateId}/activity/create`}>
                  <button>Add an activity</button>
                </Link>
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
