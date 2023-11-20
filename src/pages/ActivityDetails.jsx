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

  const removeItem = (i) => {
    const updatedChecklist = { ...checklist };
    updatedChecklist.checklist.splice(i, 1);
    axios
      .put(
        `${import.meta.env.VITE_API_URL}/checklists/${checklist.id}`,
        updatedChecklist
      )
      .then(() => {
        setChecklist(updatedChecklist);
        console.log("item removed");
      })
      .catch((err) => console.log("error to remove item : ", err));
  };

  const createChecklist = () => {
    const newChecklist = {
      activityId: activityId,
      checklist: [],
    };

    axios
      .post(`${import.meta.env.VITE_API_URL}/checklists`, newChecklist)
      .then(() => {
        getRelatedChecklist();
      })
      .catch((err) => console.log("error to post new checklist : ", err));
  };

  const deleteChecklist = () => {
    axios.delete(`${import.meta.env.VITE_API_URL}/checklists/${checklist.id}`)
      .then(() => {
        getRelatedChecklist();
      })
      .catch(err => console.log("error to delete checklist : ",err))
  }

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
              <button onClick={createChecklist}>Add a checklist</button>
            </div>
          ) : (
            <div>
              <p>Checklist :</p>
              {checklist.checklist.length === 0 ? (
                <p>No items... Start by adding one </p>
              ) : (
                <div>
                  {checklist.checklist.map((item, i) => {
                    return (
                      <li>
                        {item[1] === false ? (
                          <div>
                            {item[0]}
                            <button>&#9989;</button>
                            <button onClick={() => removeItem(i)}>
                              &#10060;
                            </button>
                          </div>
                        ) : (
                          <div>
                            {item[0]}
                            <button onClick={() => removeItem(i)}>
                              &#10060;
                            </button>
                          </div>
                        )}
                      </li>
                    );
                  })}
                </div>
              )}
              <div>
                <Link to={`/dates/${dateId}/activity/${activityId}/addItem`}>
                  <button>Add an item</button>
                </Link>
              </div>
              <button  onClick={() => {
              deleteChecklist();
            }}>Delete checklist</button>
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
