import { useState } from "react";
import axios from "axios";

function AddActivity(props) {
  const [title, setTitle] = useState("");


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
      })
      .catch((error) => console.log("error to post new activity : ", error));
  };

  return (
    <div>
      <button
        className="btn"
        onClick={() =>
          document
            .getElementById(`add_activity_modal`)
            .showModal()
        }
      >
        Add an activity
      </button>
      <dialog id={`add_activity_modal`} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add the activity's title :</h3>
          <p className="py-4"></p>
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

            <button>Create</button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}

export default AddActivity;
