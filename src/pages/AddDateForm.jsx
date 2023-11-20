import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddDateForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [place, setPlace] = useState("");
  const [time, setTime] = useState(new Date());

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newDate = { title, description, place, time };
    axios
      .post(`${import.meta.env.VITE_API_URL}/dates`, newDate)
      .then((response) => {
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
          <input
            type="text"
            name="place"
            value={place}
            placeholder="enter the title"
            onChange={(e) => setPlace(e.target.value)}
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

        <button>Create</button>
      </form>
    </div>
  );
}

export default AddDateForm;
