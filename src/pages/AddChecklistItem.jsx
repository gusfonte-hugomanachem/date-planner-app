import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function AddChecklistItem() {
  const { dateId } = useParams();
  const { activityId } = useParams();

  const [activity, setActivity] = useState(null);
  const [checklist, setChecklist] = useState(undefined);

  const [itemName, setItemName] = useState("");

  const navigate = useNavigate();

  const getActivity = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/activities`)
      .then((response) => {
        const activityDetails = response.data.find(
          (activity) => activity.id == activityId
        );
        setActivity(activityDetails);
      })
      .catch((err) => console.log("error to get activity details : ", err));
  };

  useEffect(() => {
    getActivity();
  }, []);

  const deleteActivity = () => {
    axios
      .delete(`${import.meta.env.VITE_API_URL}/activities/${activityId}`)
      .then((response) => {
        console.log(response);
        navigate(-1);
      })
      .catch((err) => console.log("error to delete activity : ", err));
  };

  useEffect(() => {
    getRelatedChecklist();
  }, []);

  const getRelatedChecklist = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/checklists`)
      .then((response) => {
        const relatedChecklist = response.data.find(
          (checklist) => checklist.activityId == activityId
        );
        setChecklist(relatedChecklist);
      })
      .catch((err) => console.log("error to get activity details : ", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedChecklist = { ...checklist };
    updatedChecklist.checklist.push([itemName, false]);
    axios
      .put(
        `${import.meta.env.VITE_API_URL}/checklists/${checklist.id}`,
        updatedChecklist
      )
      .then(() => navigate(`/dates/${dateId}/activity/${activityId}`))
      .catch((err) => console.log("error to put updated checklist : ", err));
  };

  return (
    <div className="ActivityDetails">
      {activity === null ? (
        <p>Activity details loading ...</p>
      ) : (
        <div className="ActivityDetails-activity">
          <p>Activity Details :</p>
          <p>Title :{activity.title}</p>
          <hr />
          {checklist === null || checklist === undefined ? (
            <div>
              <p>No related checklist. Want to create one ?</p>
              <button>Add a checklist</button>
            </div>
          ) : (
            <div>
              <p>Checklist :</p>
              {checklist.checklist.map((item) => {
                return <li>{item[0]}</li>;
              })}
              <form onSubmit={handleSubmit}>
                <label>
                  New Item :
                  <input
                    type="text"
                    name="itemName"
                    value={itemName}
                    onChange={(e) => {
                      setItemName(e.target.value);
                    }}
                  />
                </label>
                <button>Add</button>
              </form>
            </div>
          )}
          <hr />
        </div>
      )}
    </div>
  );
}

export default AddChecklistItem;
