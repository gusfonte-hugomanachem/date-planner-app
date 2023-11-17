import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import "../App.css";

function EditDateDetails() {
  const [date, setDate] = useState({});

  const { dateId } = useParams();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/dates/${dateId}`)
      .then((response) => {
        setDate(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <div className="date-box">
      <p>Title: {date.title}</p>
      <p>Time: {date.time}</p>
      <p>Place: {date.place}</p>
      <p>Description: {date.description}</p>

      <button>Save</button>
    </div>
  );
}

export default EditDateDetails;
