import { Routes, Route } from "react-router-dom";

import './App.css'

import Navbar from "./components/Navbar";
import DateList from "./pages/DateList";
import Homepage from "./pages/Homepage";


function App() {

  return (
    <>
    <Navbar />

    <Routes>
      <Route path="/" element={<Homepage />}/>
      <Route path="/dates" element={<DateList />}/>
    </Routes>
    </>
  )
}

export default App
