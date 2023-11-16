import { Routes, Route } from "react-router-dom";
import './App.css'
import Navbar from "./components/Navbar";

function App() {

  return (
    <>
    <Navbar />

    <Routes>
      <Route path="/" element={<h1>HELLO</h1>}/>
      <Route path="/dates" element={<h1>Dates List page</h1>}/>
    </Routes>
    </>
  )
}

export default App
