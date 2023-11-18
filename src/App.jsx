import { Routes, Route } from "react-router-dom";

import "./App.css";

import Navbar from "./components/Navbar";
import DateList from "./pages/DateList";
import Homepage from "./pages/Homepage";
import AddDateForm from "./pages/AddDateForm";
import DateDetails from "./pages/DateDetails";
import UpdateDateForm from "./pages/UpdateDateForm";
import ActivityDetails from "./pages/ActivityDetails";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/dates" element={<DateList />} />
        <Route path="/dates/create" element={<AddDateForm />} />
        <Route path="/dates/:dateId" element={<DateDetails />} />
        <Route path="/dates/:dateId/edit" element={<UpdateDateForm />} />
        <Route path="/dates/:dateId/activity/:activityId" element={<ActivityDetails/>} ></Route>
      </Routes>
    </>
  );
}

export default App;
