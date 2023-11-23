import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import axios from "axios";

import "../App.css";
import AddActivityForm from "../components/AddActivityForm";

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
    <div className="h-full">
      {date === null ? (
        <span className="loading loading-spinner w-28 absolute left-1/3 top-1/2"></span>
      ) : (
        <div className="flex flex-col gap-6 justify-center items-center ">
          <div className="card card-compact w-3/5 bg-primary text-primary-content shadow-xl">
            <dialog
              id="my_modal_5"
              className="modal modal-bottom sm:modal-middle"
            >
              <AddActivityForm
                dateId={dateId}
                callbackToGetRelatedActivities={getRelatedActivities}
              />
            </dialog>
            <div className="card-body">
              <div className="flex justify-between card-title">
                <section className="capitalize flex gap-3 items-center truncate">
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
                <h2 className="flex gap-3 items-center">
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

              <section className="">
                <p>Description: {date.description}</p>
              </section>

              <section className="flex flex-row justify-between items-center gap-3">
                <p className=" flex-grow-0">Cost : {date.cost}€</p>

                <button
                  onClick={incrementLikesCounter}
                  className="flex flex-row items-center gap-1"
                >
                  {date.likes}
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
                </button>
              </section>

              {/* ACTIVITIES --- WORK IN PROGRESS */}
              <details className="collapse bg-primary-content text-primary select-none">
                <summary className="collapse-title text-xl font-medium">
                  Activities
                </summary>
                <div className="collapse-content flex flex-col gap-4">
                  {/* RENDER EACH ACTIVITY --- BUGGED */}

                  {dateActivities === null ? (
                    <p>Related activities loading...</p>
                  ) : (
                    <div>
                      {dateActivities.map((dateActivity) => {
                        return (
                          <div className="DateDetails-activity-list">
                            <p>{dateActivity.title}</p>
                            <Link
                              to={`/dates/${dateId}/activity/${dateActivity.id}`}
                            >
                              <button>See activity details</button>
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <button
                    onClick={() =>
                      document.getElementById("my_modal_5").showModal()
                    }
                  >
                    Add an activity
                  </button>
                </div>
              </details>
            </div>
          </div>

          {/* GOOGLE MAPS API --- BUGGED */}
          <div>
            <details className="collapse bg-primary-content text-primary">
              <summary className="collapse-title text-xl min-w-min font-medium">
                See on map
              </summary>
              <div className="collapse-content">
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
              </div>
            </details>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4">
            <Link to={`/dates/${date.id}/edit`} className="btn">
              <button>Edit</button>
            </Link>

            <button onClick={() => deleteDate()} className="btn">
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DateDetails;
