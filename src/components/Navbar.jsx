import { Link } from "react-router-dom"

function Navbar () {
    return (
        <div className="Navbar">
            <h1>Date Flow</h1>
            <nav className="Navbar-nav">
                <Link to={"/"}>Home page</Link>
                <Link to={"/dates"}>Dates</Link>
            </nav>
        </div>
    )
}

export default Navbar