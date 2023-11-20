import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ActivityDetails() {
  const { dateId } = useParams();
  const { activityId } = useParams();

  const [activity, setActivity] = useState(null);
  const [checklist, setChecklist] = useState(undefined);

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
              <button>Edit checklist</button>
              <button>Delete checklist</button>
            </div>
          )}

          <hr />
          <Link to={`/dates/${dateId}/activity/${activityId}/edit`}>
            <button>Edit</button>
          </Link>
          <button
            onClick={() => {
              deleteActivity();
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default ActivityDetails;
