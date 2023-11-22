import { Routes, Route } from "react-router-dom";

import "./App.css";

import DateList from "./pages/DateList";
import Homepage from "./pages/Homepage";
import AddDateForm from "./pages/AddDateForm";
import DateDetails from "./pages/DateDetails";
import UpdateDateForm from "./pages/UpdateDateForm";
import ActivityDetails from "./pages/ActivityDetails";
import UpdateActivityForm from "./pages/UpdateActivityForm";
import AddActivityForm from "./pages/AddActivityForm";
import AddChecklistItem from "./pages/AddChecklistItem";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/dates" element={<DateList />} />
        <Route path="/dates/create" element={<AddDateForm />} />
        <Route path="/dates/:dateId" element={<DateDetails />} />
        <Route path="/dates/:dateId/edit" element={<UpdateDateForm />} />
        <Route path="/dates/:dateId/activity/:activityId" element={<ActivityDetails/>} ></Route>
        <Route path="/dates/:dateId/activity/:activityId/edit" element={<UpdateActivityForm/>}></Route>
        <Route path="/dates/:dateId/activity/create" element={<AddActivityForm/>}></Route>
        <Route path="/dates/:dateId/activity/:activityId/addItem" element={<AddChecklistItem/>}></Route>
      </Routes>
    </>
  );
}

export default App;
