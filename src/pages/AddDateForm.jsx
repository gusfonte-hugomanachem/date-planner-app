import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AutoComplete from "../components/AutoComplete";

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
    <div id="add-date-page">
      <form onSubmit={handleSubmit}>
        <label>
          Title :
          <input
            type="text"
            name="title"
            value={title}
            placeholder="enter the title"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <label>
          Description :
          <textarea
            type="text"
            name="description"
            value={description}
            placeholder="describe your date"
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <label>
          Place :
          <AutoComplete
            callbackToSetDisplayedPlace={setDisplayedPlace}
            callbackToSetLat={setLat}
            callbackToSetLon={setLon}
          />
        </label>

        <label>
          Time :
          <input
            type="date"
            name="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </label>

        <label>
          Cost :
          <input
            type="number"
            name="cost"
            value={cost}
            min={0}
            onChange={(e) => setCost(e.target.value)}
          />
        </label>

        <button>Create</button>
      </form>
    </div>
  );
}

export default AddDateForm;
