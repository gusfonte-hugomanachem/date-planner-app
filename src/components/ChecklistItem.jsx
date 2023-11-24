import axios from "axios";

function ChecklistItem(props) {
  const removeItem = () => {
    const updatedChecklist = { ...props.checklist };
    updatedChecklist.checklist.splice(props.position, 1);
    axios
      .put(
        `${import.meta.env.VITE_API_URL}/checklists/${props.checklist.id}`,
        updatedChecklist
      )
      .then(() => {
        props.callbackToSetChecklist(updatedChecklist);
      })
      .catch((err) => console.log("error to remove item : ", err));
  };

  const checkAnItem = () => {
    const updatedChecklist = { ...props.checklist };
    updatedChecklist.checklist[props.position][1] = true;
    axios
      .put(
        `${import.meta.env.VITE_API_URL}/checklists/${props.checklist.id}`,
        updatedChecklist
      )
      .then(() => {
        props.callbackToSetChecklist(updatedChecklist);
      })
      .catch((err) => console.log("error to check item : ", err));
  }

  return (
    <div>
      {props.item[1] === true ? (
        <div>
          <span className="checklist-item-checked">{props.item[0]}</span>
          <button onClick={() => removeItem()}>&#10060;</button>
        </div>
      ) : (
        <div>
          <span className="checklist-item-unchecked">{props.item[0]}</span>
          <button
            onClick={() => {
              checkAnItem();
            }}
          >
            &#9989;
          </button>
          <button onClick={() => removeItem()}>&#10060;</button>
        </div>
      )}
    </div>
  );
}

export default ChecklistItem;
