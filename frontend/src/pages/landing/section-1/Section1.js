import React, { useState, useEffect } from 'react';
import sigiriyaLanding from '../../../images/sigiriya-landing.jpg';
import deerLanding from '../../../images/deer-landing.jpg';
import weblogo from '../../../images/logo.png';
import templeofthtoothLanding from '../../../images/templeofthtooth-landing.jpeg';
import './Section1.css';
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
=======
import { useNavigate } from 'react-router-dom';


>>>>>>> 7de07865f64e44dc5091f0fb6eb98dd878fc4d57

const slides = [
  {
    image: sigiriyaLanding,
    title: 'Sigiriya',
    description: 'Ancient "Lion Rock" fortress, famed for frescoes and views.'
  },
  {
    image: deerLanding,
    title: 'Yala National Park',
    description: 'Leopard filled wildlife safaris.'
  },
  {
    image: templeofthtoothLanding,
    title: 'Temple of The Tooth',
    description: "Sacred Buddhist shrine with Buddha's tooth relic."
  }
];

<<<<<<< HEAD
const TravelLandingPage1 = () => {
  const navigate = useNavigate();
=======
function TravelLandingPage1() {

  const navigate=useNavigate();

>>>>>>> 7de07865f64e44dc5091f0fb6eb98dd878fc4d57
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleCardClick = (index) => {
    setCurrentSlide(index);
  };

  const login = () => {
    navigate('/login');

  }

  return (
    <div className="landingLandingPage">
      <nav className="landingNavigation">
        <div className="landingLogo"><img src={weblogo} alt="Logo" /></div>
        <div className="landingNavLinks">
          <a href="#" className="landingNavLink">Home</a>
          <a href="#" className="landingNavLink">Plan your tour</a>
          <a href="#" className="landingNavLink">Our Packages</a>
          <a href="#" className="landingNavLink">Gallery</a>
          <a href="#" className="landingNavLink">Contact</a>
          <a href="#" className="landingNavLink">Join with us</a>
        </div>
        <div className="landingRegbutton">
<<<<<<< HEAD
          <button className="landingsignupbutton" onClick={() => navigate('/tourist-signup')}>Sign Up</button>
          <button className="landinglogbutton" onClick={() => navigate('/login')}>Login</button>
=======
          <button onClick={login}>Login</button>
          <button>Sign Up</button>
>>>>>>> 7de07865f64e44dc5091f0fb6eb98dd878fc4d57
        </div>
      </nav>

      <div className="landingHeroSection">
        <div className="landingSliderContainer">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`landingSlide ${index === currentSlide ? 'landingActiveSlide' : ''}`}
            >
              <img src={slide.image} alt={slide.title} className="landingSlideImage" />
              <div className="landingOverlay"></div>
            </div>
          ))}
        </div>

        <div className="landingHeroContent">
          <h1 className="landingHeroTitle">Your Dream Vacation Awaits</h1>
          <p className="landingHeroSubtitle">Explore Sri Lanka with us.</p>
          <button className="landingExploreButton">Explore Now →</button>
        </div>

        <div className="landingSlideIndicator">0{currentSlide + 1}</div>

        <div className="landingDestinationCards">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`landingDestinationCard ${index === currentSlide ? 'landingActiveCard' : ''}`}
              onClick={() => handleCardClick(index)}
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <h3>{slide.title}</h3>
              <p>{slide.description}</p>
            </div>
          ))}
        </div>

        {/* WAVE SVG - Positioned at the bottom */}
        <div className="landingWaveContainer">
          <svg
            className="landingWave"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,96L0,128C160,10,320,224,49,218.7C640,213,800,139,960,117.3C0,96,1280,128,1910,144L1440,160L1440,320L1360,320C120,320,110,320,96,320C800,320,640,320,480,320C320,320,160,320,80,322L0,320Z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default TravelLandingPage1;