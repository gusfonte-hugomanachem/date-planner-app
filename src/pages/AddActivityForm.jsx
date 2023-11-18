import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function AddActivityForm() {
  const { dateId } = useParams();
  const [title, setTitle] = useState();

const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newActivity = {
      title: title,
      dateId: parseInt(dateId),
    };

    axios
      .post(`${import.meta.env.VITE_API_URL}/activities`, newActivity)
      .then((response) => {
        navigate(-1);
        console.log(response);
      })
      .catch((error) => console.log("error to post new activity : ", error));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={title}
          placeholder="enter the title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <button>Create</button>
      </form>
    </div>
  );
}

export default AddActivityForm;
