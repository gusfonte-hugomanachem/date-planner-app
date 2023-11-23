import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddActivityForm(props) {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newActivity = {
      title: title,
      dateId: parseInt(props.dateId),
    };

    axios
      .post(`${import.meta.env.VITE_API_URL}/activities`, newActivity)
      .then((response) => {
        props.callbackToGetRelatedActivities();
        console.log(document.getElementById("my_modal_5").removeAttribute("open"));
      })
      .catch((error) => console.log("error to post new activity : ", error));
  };

  return (
    <div className="modal-box">
      <h3 className="font-bold text-lg">Add an activity :</h3>
      <div className="modal-action">
        <form method="dialog" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={title}
            placeholder="Enter the title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />

          <button className="btn">Create</button>
        </form>
      </div>
    </div>
  );
}

export default AddActivityForm;
