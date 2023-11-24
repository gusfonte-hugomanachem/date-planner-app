import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import AutoComplete from "../components/AutoComplete";
import ThemeController from "../components/ThemeController";

function AddDateForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [displayedPlace, setDisplayedPlace] = useState("");
  const [time, setTime] = useState(new Date());
  const [cost, setCost] = useState(0);

  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newDate = {
      title: title,
      time,
      location: {
        displayedPlace: displayedPlace,
        lat: lat,
        lon: lon,
      },
      description: description,
      likes: 0,
      cost: parseInt(cost),
    };
    axios
      .post(`${import.meta.env.VITE_API_URL}/dates`, newDate)
      .then(() => {
        navigate(-1);
      })
      .catch((error) => console.log("error to post new date : ", error));
  };

  return (
    <div className="w-full flex flex-col items-center">
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

      <div className="card card-compact bg-primary w-3/4 text-primary-content shadow-xl">
        <div className="card-body flex col gap-4">
          <h2 className="card-title">New Date</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex justify-between">
            <div className="form-control">
                <label>
                  <span className="label-text text-primary-content font-medium">Title*</span>
                </label>
                <input className="input input-bordered input-sm" type="text" name="title" value={title} placeholder="Enter a date title" onChange={(e) => setTitle(e.target.value)} required/>
              </div>

              <div className="form-control">
                <label>
                  <span className="label-text text-primary-content font-medium">Time</span>
                </label>
              <input
                className="input input-bordered input-sm"
                type="date"
                name="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                />
                </div>

                <div className="form-control">
                <label>
                  <span className="label-text text-primary-content font-medium">Cost</span>
                </label>
              <input
                className="input input-bordered input-sm"
                type="number"
                name="cost"
                value={cost}
                min={0}
                onChange={(e) => setCost(e.target.value)}
                />
                </div>

            </div>

            <div className="form-control">
                <label>
                  <span className="label-text text-primary-content font-medium">Location</span>
                </label>
              <AutoComplete
                callbackToSetDisplayedPlace={setDisplayedPlace}
                callbackToSetLat={setLat}
                callbackToSetLon={setLon}
                />
                </div>

                <div className="form-control">
                <label>
                  <span className="label-text text-primary-content font-medium">Description</span>
                </label>
              <textarea
              className="textarea textarea-bordered textarea-sm"
                type="text"
                name="description"
                value={description}
                placeholder="Enter a description"
                onChange={(e) => setDescription(e.target.value)}
                />
                </div>

            <button className="btn">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddDateForm;
