import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import AutoComplete from "../components/AutoComplete";

function UpdateDateForm() {
  const { dateId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [place, setPlace] = useState("");
  const [time, setTime] = useState(new Date());
  const [likes, setLikes] = useState(0);
  const [cost, setCost] = useState(0);

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
        setLikes(response.data.likes);
        setCost(response.data.cost);
      })
      .catch((err) => {
        console.log("error to get date details : ", err);
      });
  };



  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedDate = { title, description, place, time, likes, cost : parseInt(cost) };
    axios
      .put(`${import.meta.env.VITE_API_URL}/dates/${dateId}`, updatedDate)
      .then(() => {
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
          <AutoComplete initialValue={place} callbackToSetPlace = {setPlace}/>
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

        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateDateForm;
