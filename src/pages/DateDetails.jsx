import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import "../App.css";

function DateDetails() {
  const [date, setDate] = useState({});

  const { dateId } = useParams();
  const navigate = useNavigate();

  const deleteDate = async () => {
    try {
      await axios
        .delete(`${import.meta.env.VITE_API_URL}/dates/${dateId}`)
          console.log("date deleted");
          navigate(-1)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/dates/${dateId}`)
      .then((response) => {
        setDate(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="date-box">
      <p>Title: {date.title}</p>
      <p>Time: {date.time}</p>
      <p>Place: {date.place}</p>
      <p>Description: {date.description}</p>

      <Link to={`/dates/${date.id}/edit`}>
        <button>Edit</button>
      </Link>
      
      <button onClick={() => deleteDate()}>Delete</button>
    </div>
  );
}

export default DateDetails;
