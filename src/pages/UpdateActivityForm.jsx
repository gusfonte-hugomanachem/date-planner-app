import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function UpdateActivityForm() {
  const { dateId } = useParams();
  const { activityId } = useParams();

  const [title, setTitle] = useState("");

  const navigate = useNavigate();

  const getActivity = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/activities`)
      .then((response) => {
        const activityDetails = response.data.find(
          (activity) => activity.id == activityId
        );
        setTitle(activityDetails.title);
      })
      .catch((err) => console.log("error to get activity details : ", err));
  };

  useEffect(() => {
    getActivity();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedActivity = {
        title : title,
        dateId : parseInt(dateId)
    };

    axios
      .put(`${import.meta.env.VITE_API_URL}/activities/${activityId}`, updatedActivity)
      .then((response) => {
        console.log(response);
        navigate(-1);
        
    })
      .catch((error) => console.log("error to put updated activity : ", error));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Title :
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </label>

        <button>Update</button>
      </form>
    </div>
  );
}

export default UpdateActivityForm;
