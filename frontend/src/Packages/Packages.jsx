import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Packages.css';
import API from "../api/api";

function Packages() {
    const [packages, setPackages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const res = await API.get("/packages"); // 🔥 ALL PACKAGES
                setPackages(res.data.data);
            } catch (error) {
                console.error("Failed to load packages", error);
            }
        };

        fetchPackages();
    }, []);

    const handleExploreClick = (id) => {
        navigate(`/package/${id}`);
    };

    return (
        <div className="PackagesPage">
            <img
                src="https://s1.1zoom.me/b5545/524/India_Rivers_Riverboat_Alappuzha_Kerala_Palms_527898_2560x1440.jpg"
                className="title-img"
                alt="India Odyssey"
            />

            <div className="content_div">
                <h2 className="content">India Odyssey</h2>
                <p className="desc">
                    Experience the rich heritage and vibrant adventures across India.
                </p>
            </div>

            <div className="Popular-Packages">
                <h2>Popular Packages</h2>

                <div className="packages-container">
                    {packages.map(pkg => (
                        <div className="package" key={pkg._id}>
                            <img src={pkg.coverImage} height={200} alt={pkg.title} />
                            <h3>{pkg.title}</h3>
                            <p>{pkg.shortDescription || pkg.description}</p>
                            <button onClick={() => handleExploreClick(pkg._id)}>
                                Explore
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Packages;
