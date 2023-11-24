import { Routes, Route } from "react-router-dom";

import "./App.css";

import DateList from "./pages/DateList";
import Homepage from "./pages/Homepage";
import AddDateForm from "./pages/AddDateForm";
import DateDetails from "./pages/DateDetails";
import UpdateDateForm from "./pages/UpdateDateForm";
import GoogleMapsScriptLoader from "./components/GoogleMapsScriptLoader";

function App() {
  const googleMapsAPIstatus = GoogleMapsScriptLoader();
  return (
    <div>
      {googleMapsAPIstatus === "ready" ? (
        <>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/dates" element={<DateList />} />
            <Route path="/dates/create" element={<AddDateForm />} />
            <Route path="/dates/:dateId" element={<DateDetails />} />
            <Route path="/dates/:dateId/edit" element={<UpdateDateForm />} />
          </Routes>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
