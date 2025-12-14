import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import './Packages.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import MailForm from '../components/MailForm';
import API from "../api/api";
import fallbackImage from "../assets/fallback.png";


const FALLBACK_IMAGE = fallbackImage;

const PackageDetail = () => {
  const { id } = useParams();

  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openDay, setOpenDay] = useState(null);

  const nav1 = useRef(null);
  const nav2 = useRef(null);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const res = await API.get(`/packages/${id}`);
        setPackageData(res.data.data);
      } catch (error) {
        console.error("Failed to load package", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackage();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!packageData) return <p>Package not found</p>;

  // ✅ SAFE IMAGE SOURCE
  const images =
    packageData.gallery && packageData.gallery.length > 0
      ? packageData.gallery
      : [packageData.coverImage];

  const mainSliderSettings = {
    asNavFor: nav2.current,
    ref: nav1,
    arrows: true,
    fade: true
  };

  const thumbnailSliderSettings = {
    asNavFor: nav1.current,
    ref: nav2,
    slidesToShow: Math.min(5, images.length),
    swipeToSlide: true,
    focusOnSelect: true,
    arrows: false
  };

  const toggleDay = (index) => {
    setOpenDay(openDay === index ? null : index);
  };

  return (
    <div className="package-container">
      <h2 className="package-title">{packageData.title}</h2>

      <div className="details">
        <p><strong>Location:</strong> {packageData.location}</p>
        <p><strong>Duration:</strong> {packageData.duration}</p>
        <p><strong>Tour Type:</strong> {packageData.tourType}</p>
        {packageData.groupSize && (
          <p><strong>Group Size:</strong> {packageData.groupSize}</p>
        )}
        {packageData.languages && (
          <p><strong>Languages:</strong> {packageData.languages}</p>
        )}
        <p><strong>Price:</strong> ₹{packageData.price}</p>
      </div>

      <hr />

      {/* 🔥 IMAGE SLIDERS */}
      <div className="slider-container">
        <Slider {...mainSliderSettings}>
          {images.map((img, index) => (
            <div key={index}>
              <img
                src={img}
                onError={(e) => (e.target.src = FALLBACK_IMAGE)}
                alt={`Image ${index + 1}`}
                className="main-image"
              />
            </div>
          ))}
        </Slider>

        <Slider {...thumbnailSliderSettings} className="thumbnail-slider">
          {images.map((img, index) => (
            <div key={index}>
              <img
                src={img}
                onError={(e) => (e.target.src = FALLBACK_IMAGE)}
                alt={`Thumbnail ${index + 1}`}
                className="thumbnail-image"
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* 🔥 ITINERARY */}
      <div className="itinerary">
        <h3>Itinerary</h3>
        <p className="package-description">{packageData.description}</p>

        {packageData.itinerary.map((item, index) => (
          <div key={index} className="itinerary-item">
            <h4 onClick={() => toggleDay(index)} style={{ cursor: "pointer" }}>
              {openDay === index ? "▼" : "►"} {item.day}: {item.title}
            </h4>
            <div className={`itinerary-details ${openDay === index ? "open" : ""}`}>
              {item.details}
            </div>
          </div>
        ))}
      </div>

      <MailForm />
    </div>
  );
};

export default PackageDetail;
