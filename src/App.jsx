import { Routes, Route } from "react-router-dom";

import "./App.css";

import Navbar from "./components/Navbar";
import DateList from "./pages/DateList";
import Homepage from "./pages/Homepage";
import AddDateForm from "./pages/AddDateForm";
import DateDetails from "./pages/DateDetails";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/dates" element={<DateList />} />
        <Route path="/dates/create" element={<AddDateForm />} />
        <Route path="/dates/:dateId" element={<DateDetails />} />
      </Routes>
    </>
  );
}

export default App;
