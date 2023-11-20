import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function UpdateDateForm() {
  const { dateId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [place, setPlace] = useState("");
  const [time, setTime] = useState(new Date());

  const navigate = useNavigate();

  useEffect(() => {
    getDateDetails();
  }, []);

  const getDateDetails = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/dates/${dateId}`)
      .then((response) => {
        setTitle(response.data.title);
        setDescription(response.data.description);
        setTime(response.data.time);
        setPlace(response.data.place);
      })
      .catch((err) => {
        console.log("error to get date details : ", err);
      });
  };



  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedDate = { title, description, place, time };
    axios
      .put(`${import.meta.env.VITE_API_URL}/dates/${dateId}`, updatedDate)
      .then((response) => {
        navigate(-1);
        
    })
      .catch((error) => console.log("error to put new date : ", error));
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

        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateDateForm;
