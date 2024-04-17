import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NavBar from "./navbar";
import auth from "../utils/auth";
import Background2 from "../images/airports/DPS.jpg";
import Background1 from "../images/airports/BIA.jpg"; // Add more background images as needed
import Background3 from "../images/airports/BKK.avif";
import Background4 from "../images/airports/SIN.jpg";
import Background5 from "../images/airports/CGK.jpg";
import Background6 from "../images/airports/DPS.jpg";

function Header() {
  const [user, setUser] = useState({ user_id: null, first_name: "", last_name: "Guest" });
  const [admin, setAdmin] = useState(false);
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const backgrounds = [Background1, Background2, Background3, Background4, Background5, Background6]; // Add more backgrounds to this array

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    const loggedInAdmin = localStorage.getItem("admin");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser[0]);
    } else if (loggedInAdmin) {
      const foundAdmin = JSON.parse(loggedInAdmin);
      setAdmin(foundAdmin[0]);
    }

    // Rotate background image every 5 seconds
    const interval = setInterval(() => {
      setBackgroundIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header>
      <div
        className="p-5 text-center bg-image"
        style={{
          backgroundImage: `url(${backgrounds[backgroundIndex]})`,
          height: "400px",
        }}
      >
        <div className="mask" style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="text-white">
              <h1 className="mb-3">Welcome to FourFly Airways</h1>
              {!admin && <h4 className="mb-3">{user.first_name + " " + user.last_name} </h4>}
              {admin && <h4 className="mb-3">Admin {admin.name}</h4>}
              <button className="btn btn-outline-light btn-lg">
                <Link style={{ color: "white" }} to={"/serachFlights/" + user.user_id}>
                  BOOK
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
