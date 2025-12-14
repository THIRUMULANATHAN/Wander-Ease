import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from "../api/api";
import MailForm from '../components/MailForm';

function Home() {
    const [packages, setPackages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const res = await API.get("/packages/featured");
                setPackages(res.data.data);
            } catch (error) {
                console.error("Failed to load packages", error);
            }
        };

        fetchPackages();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <div className='content_divs'>
                <h3 className='sub_contents'>Life Changing</h3>
                <h2 className='contents'>India</h2>
                <p className='descs'>
                    Travel is seeing the world with fresh eyes. Uncover hidden wonders and transform your journey into discovery.
                </p>
            </div>

            <video autoPlay loop muted playsInline>
                <source src='src/assets/vid.mp4' type='video/mp4' />
            </video>

            <div className='Popular-Packages'>
                <h2>Popular Packages</h2>

                <div className="packages-container">
                    {packages.map((pkg) => (
                        <div className="package" key={pkg._id}>
                            <img src={pkg.coverImage} height={200} alt={pkg.title} />
                            <h3>{pkg.title}</h3>
                            <p>{pkg.description}</p>
                            <button onClick={() => navigate(`/package/${pkg._id}`)}>
                                Explore
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="about-us">
                <h1>About Us</h1>
                <p>
                    <strong>Traverse</strong> is your ultimate travel companion app designed to make your trips seamless and enjoyable.
                    Our mission is to simplify travel planning and provide you with essential tools and insights,
                    so you can focus on enjoying your journey.
                </p>
            </div>

            <MailForm />
        </>
    );
}

export default Home;
