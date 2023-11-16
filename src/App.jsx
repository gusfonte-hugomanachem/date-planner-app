import { Routes, Route } from "react-router-dom";
import './App.css'

function App() {

  return (
    <Routes>
      <Route path="/" element={<h1>HELLO</h1>}/>
      <Route path="/dates" element={<h1>Dates List page</h1>}/>
    </Routes>
  )
}

export default App
