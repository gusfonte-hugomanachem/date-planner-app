import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ActivityDetails () {
    const {dateId} = useParams();
    const {activityId} = useParams();

    const [activity, setActivity] = useState(null);

    const navigate = useNavigate();

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

    const deleteActivity = () => {
        axios.delete(`${import.meta.env.VITE_API_URL}/activities/${activityId}`)
            .then(response => {
                console.log(response)
                navigate(-1)
            })
            .catch(err => console.log("error to delete activity : ",err))
    }


    return (
    <div className="ActivityDetails">
        {activity === null ? (<p>Activity details loading ...</p>) : (
            <div className="ActivityDetails-activity">
                <p>Activity Details :</p>
                <p>Title :{activity.title}</p>
                <Link to={`/dates/${dateId}/activity/${activityId}/edit`}><button>Edit</button></Link>
                <button onClick={() => {deleteActivity()}}>Delete</button>
            </div>   
        )}
    </div>
    )
}

export default ActivityDetails;