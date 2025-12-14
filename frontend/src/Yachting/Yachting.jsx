// src/Yachting/Yachting.jsx

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Yachting.css";
import API from "../api/api";

function Yachting() {
  const [activity, setActivity] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const res = await API.get("/activities/yachting");
        setActivity(res.data);
      } catch (error) {
        console.error("Failed to load yachting activity", error);
      }
    };

    fetchActivity();
    window.scrollTo(0, 0);
  }, []);

  if (!activity) return null; 

  return (
    <div className="Yachting">
      <div className="content_div">
        <h2 className="content">{activity.title}</h2>
        <p className="desc">{activity.description}</p>
      </div>

      <img
        src={activity.bannerImage}
        className="title-img"
        alt={activity.name}
      />

      <div className="jumbotron">
        <div className="menu">
          <h4>
            <li>
              <Link to="/home" className="ll">Home</Link>
            </li>
          </h4>
          <h4>
            <li>
              <Link to="/activities/yachting" className="ll">
                Mediterranean Yachting
              </Link>
            </li>
          </h4>
        </div>

        {activity.sections.map((section, index) => (
          <div key={index}>
            <h1>{section.heading}</h1>
            <div className="content">
              <p>{section.content}</p>
              <img src={section.image} alt={section.heading} />
            </div>
          </div>
        ))}
      </div>

      <div className="button-container">
        <button
          className="view-pack"
          onClick={() => navigate("/package?category=yachting")}
        >
          View Package
        </button>
      </div>
    </div>
  );
}

export default Yachting;
