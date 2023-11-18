import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ActivityDetails () {
    const {dateId} = useParams();
    const {activityId} = useParams();

    const [activity, setActivity] = useState(null);

    const getActivity = () => {
        axios.get(`${import.meta.env.VITE_API_URL}/activities`)
            .then(response => {
                const activityDetails = response.data.find((activity) => activity.id == activityId)
                setActivity(activityDetails);
            })
            .catch(err => console.log("error to get activity details : ", err))
    }

    useEffect(() => {
        getActivity();
    },[])




    return (
    <div className="ActivityDetails">
        {activity === null ? (<p>Activity details loading ...</p>) : (
            <div className="ActivityDetails-activity">
                <p>Activity Details :</p>
                <p>Title :{activity.title}</p>
                <button>Edit</button>
                <button>Delete</button>
            </div>   
        )}
    </div>
    )
}

export default ActivityDetails;