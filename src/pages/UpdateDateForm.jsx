import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import AutoComplete from "../components/AutoComplete";

function UpdateDateForm() {
  const { dateId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [displayedPlace, setDisplayedPlace] = useState("");
  const [time, setTime] = useState(new Date());
  const [likes, setLikes] = useState(0);
  const [cost, setCost] = useState(0);

  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);

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
        setDisplayedPlace(response.data.location.displayedPlace);
        setLikes(response.data.likes);
        setCost(response.data.cost);
        setLat(response.data.location.lat);
        setLon(response.data.location.lon)

      })
      .catch((err) => {
        console.log("error to get date details : ", err);
      });
  };



  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedDate = {
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
      .put(`${import.meta.env.VITE_API_URL}/dates/${dateId}`, updatedDate)
      .then(() => {
        navigate(-1);
        
    })
      .catch((error) => console.log("error to put new date : ", error));
  };

  return (
    <div className="w-full flex flex-col items-center">
      
      <div className="card card-compact bg-primary w-3/4 text-primary-content shadow-xl">
        <div className="card-body flex col gap-4">
          <h2 className="card-title">Edit Date</h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
      <div className="flex justify-between">

          <input
            type="text"
            name="title"
            value={title}
            placeholder="enter the title"
            onChange={(e) => setTitle(e.target.value)}
            required
          />


          <input
            type="date"
            name="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />


          <input
            type="number"
            name="cost"
            value={cost}
            min={0}
            onChange={(e) => setCost(e.target.value)}
          />

</div>

          <AutoComplete
            initialValue={displayedPlace}
            callbackToSetDisplayedPlace={setDisplayedPlace}
            callbackToSetLat={setLat}
            callbackToSetLon={setLon}
          />


          <textarea
            type="text"
            name="description"
            value={description}
            placeholder="describe your date"
            onChange={(e) => setDescription(e.target.value)}
          />



        <button type="submit" className="btn">Save</button>
      </form>
      </div>
      </div>
    </div>
  );
}

export default UpdateDateForm;
