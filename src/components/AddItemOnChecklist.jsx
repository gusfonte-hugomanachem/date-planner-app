import { useState } from "react";
import axios from "axios";

function AddItemOnChecklist(props) {
  const [itemName, setItemName] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedChecklist = { ...props.checklist };
    updatedChecklist.checklist.push([itemName, false]);
    axios
      .put(
        `${import.meta.env.VITE_API_URL}/checklists/${props.checklist.id}`,
        updatedChecklist
      )
      .then(() => {
        props.callbackToGetRelatedActivities();
      })
      .catch((err) => console.log("error to put updated checklist : ", err));
  };

  return (
    <div>
      <button
        className="btn btn-sm"
        onClick={() =>
          document.getElementById(`add_item_checklist_${props.checklist.id}_modal`).showModal()
        }
      >
        Add an item
      </button>
      <dialog id={`add_item_checklist_${props.checklist.id}_modal`} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add the item's name :</h3>
          <p className="py-4"></p>
          <form onSubmit={handleSubmit}>
            <label>
              Name :
              <input
                type="text"
                name="name"
                value={itemName}
                onChange={(e) => {
                  setItemName(e.target.value);
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

export default AddItemOnChecklist;
