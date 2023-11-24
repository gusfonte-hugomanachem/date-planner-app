import { useState, useEffect } from "react";
import axios from "axios";
import ChecklistItem from "./ChecklistItem";
import AddItemOnChecklist from "./AddItemOnChecklist";
import { useNavigate } from "react-router-dom";

function Activity(props) {
  const [checklist, setChecklist] = useState(undefined);
  const [title, setTitle] = useState(props.dateActivity.title);
  const navigate = useNavigate();
  const getRelatedChecklist = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/checklists`)
      .then((response) => {
        const relatedChecklist = response.data.find((checklist) => {
          return checklist.activityId == props.dateActivity.id;
        });
        setChecklist(relatedChecklist);
      })
      .catch((err) => console.log("error to get activity details : ", err));
  };

  useEffect(() => {
    getRelatedChecklist();
  }, []);

  const createChecklist = () => {
    const newChecklist = {
      activityId: props.dateActivity.id,
      checklist: [],
    };

    axios
      .post(`${import.meta.env.VITE_API_URL}/checklists`, newChecklist)
      .then(() => {
        getRelatedChecklist();
      })
      .catch((err) => console.log("error to post new checklist : ", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedActivity = {
      title: title,
      dateId: parseInt(props.dateId),
    };

    axios
      .put(
        `${import.meta.env.VITE_API_URL}/activities/${props.dateActivity.id}`,
        updatedActivity
      )
      .then(() => {props.callbackToGetRelatedActivities()})
      .catch((error) => console.log("error to put updated activity : ", error));
  };

  const deleteActivity = () => {
    axios
      .delete(
        `${import.meta.env.VITE_API_URL}/activities/${props.dateActivity.id}`
      )
      .then(() => {
        props.callbackToGetRelatedActivities();
      })
      .catch((err) => {
        console.log("error to delete activity : ", err);
      });
  };

  const deleteChecklist = () => {
    axios
      .delete(`${import.meta.env.VITE_API_URL}/checklists/${checklist.id}`)
      .then(() => {
        getRelatedChecklist();
      })
      .catch((err) => console.log("error to delete checklist : ", err));
  };

  return (

    <div className="DateDetails-activity-list flex gap-3">
      <div className="collapse bg-base-100">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium capitalize">
          {props.dateActivity.title}
        </div>
        <div className="collapse-content">
          {checklist === undefined ? (
            <div>
              <p>No related checklist.</p>
              <button onClick={createChecklist} className="btn btn-sm">Add a checklist</button>
            </div>
          ) : (
            <div>
              {checklist.checklist.length === 0 ? (
                <p>No items...</p>
              ) : (
                <div>
                  <h1>Checklist:</h1>
                  {checklist.checklist.map((item, i) => {
                    return (
                      <ChecklistItem
                        checklist={checklist}
                        position={i}
                        key={i}
                        item={item}
                        callbackToSetChecklist={setChecklist}
                      />
                    );
                  })}
                </div>
              )}
              {checklist === null || checklist === undefined ? (
                ""
              ) : (
                <div>
                  <AddItemOnChecklist
                    checklist={checklist}
                    callbackToSetChecklist={setChecklist}
                    callbackToGetRelatedActivities={
                      props.callbackToGetRelatedActivities
                    }
                  />
                  {checklist.checklist.length > 0 ? (
                    <button
                      className="btn btn-sm"
                      onClick={() => {
                        deleteChecklist();
                      }}
                    >
                      Delete checklist
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {/* modal edit */}
      <button
        className="btn btn-ghost btn-circle"
        onClick={() =>
          document
            .getElementById(`my_modal_${props.dateActivity.id}`)
            .showModal()
        }
      >
        &#9999;&#65039;
      </button>
      <dialog id={`my_modal_${props.dateActivity.id}`} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit the activity's title :</h3>
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

            <button>Update</button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      {/* delete button */}
      <button className="btn btn-ghost btn-circle" onClick={deleteActivity}>
        &#10060;
      </button>

      {/* end */}
    </div>
  );
}

export default Activity;
