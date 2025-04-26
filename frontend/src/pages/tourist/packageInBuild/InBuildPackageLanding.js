import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Payment from '../../Admin/InBuildpackage/paymentpage/PackagePayment';
// Import Dialog components from Material UI
import { Dialog, DialogContent, DialogActions, Button } from "@mui/material";
// Import icons from react-icons
import { FaMapMarkerAlt, FaClock, FaUser, FaArrowLeft, FaSearch, FaEnvelope } from 'react-icons/fa';
import { MdDateRange, MdLocationOn } from 'react-icons/md';
import { AiFillStar, AiFillHeart } from 'react-icons/ai';
import { BiSolidCategory } from 'react-icons/bi';
import BookingFooter from "../booking-footer/BookingFooter";

import './InBuildPackageLanding.css'; // Import your CSS file

const TourPackagesLanding = () => {
  const [tourPackages, setTourPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewPackage, setViewPackage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  // Add state for dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  // Initialize useNavigate hook
  const navigate = useNavigate();

  // Handle opening the dialog
  const handleClickOpen = (pkgId = null) => {
    if (pkgId) {
      const packageToEdit = tourPackages.find(pkg => pkg.tp_Id === pkgId);
      setSelectedPackageId(pkgId);
      setViewPackage(packageToEdit);
    } else if (viewPackage) {
      setSelectedPackageId(viewPackage.tp_Id);
    } else {
      setSelectedPackageId(null);
      setViewPackage(null);
    }
    setIsDialogOpen(true);
  };

  // Handle closing the dialog
  const handleClose = () => {
    setIsDialogOpen(false);
    setSelectedPackageId(null);
  };

  // Fetch tour packages from the API
  useEffect(() => {
    const fetchTourPackages = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/tourPackage');
        setTourPackages(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching tour packages:', error);
        setError('Failed to load tour packages. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchTourPackages();
    
    // Check local storage for favorites
    const storedFavorites = localStorage.getItem('tourFavorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const handleView = (pkg) => {
    setViewPackage(pkg);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to top
  };

  const closePackageView = () => {
    setViewPackage(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  const toggleFavorite = (pkgId) => {
    setFavorites(prev => {
      let newFavorites;
      if (prev.includes(pkgId)) {
        newFavorites = prev.filter(id => id !== pkgId);
      } else {
        newFavorites = [...prev, pkgId];
      }
      
      // Store in localStorage
      localStorage.setItem('tourFavorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  // Get all unique tour types
  const allTourTypes = ['All', ...new Set(tourPackages.map(pkg => pkg.tourType))];

  // Filter packages based on search and active category
  const filteredPackages = tourPackages
    .filter(pkg => {
      const matchesSearch = pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           pkg.destination.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = activeCategory === 'All' || pkg.tourType === activeCategory;
      
      return matchesSearch && matchesCategory;
    });

  return (
    <div className="tour-landing-container-j">
      {/* Hero Section */}
      <div className="hero-section-j">
        <div className="hero-overlay-j"></div>
        <div className="hero-content-j">
          <h1>Discover Amazing Tours</h1>
          <p>Find your perfect adventure from our selection of premium tour packages</p>
          <div className={`search-container-j ${isSearchFocused ? 'search-focused' : ''}`}>
            <div className="search-input-wrapper-j">
              <FaSearch className="search-icon-j" />
              <input
                type="text"
                placeholder="Search destinations, tours..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </div>
            <button className="search-btn-j">
              <span>Search</span>
              <span className="search-btn-hover">Explore Now</span>
            </button>
          </div>
        </div>
      </div>

      {/* Single Package View */}
      {viewPackage && (
        <div className="package-detail-section-j">
          <button className="back-button-j" onClick={closePackageView}>
            <FaArrowLeft className="back-icon-j" /> <span>Back to All Packages</span>
          </button>
          
          <div className="package-detail-container-j">
            <div className="package-detail-header-j">
              <h2>{viewPackage.name}</h2>
              <div className="package-header-actions-j">
                <span className="package-tag-j">{viewPackage.tourType}</span>
                <button 
                  className={`favorite-btn-j ${favorites.includes(viewPackage.tp_Id) ? 'is-favorite' : ''}`}
                  onClick={() => toggleFavorite(viewPackage.tp_Id)}
                  aria-label={favorites.includes(viewPackage.tp_Id) ? "Remove from favorites" : "Add to favorites"}
                >
                  <AiFillHeart />
                </button>
              </div>
            </div>
            
            <div className="package-detail-main-j">
              <div className="package-detail-image-j">
                <img src={viewPackage.image} alt={viewPackage.name} />
                <div className="image-overlay-j"></div>
              </div>
              
              <div className="package-detail-info-j">
                <div className="package-highlight-j">
                  <div className="highlight-item-j">
                    <span className="highlight-label-j">Price</span>
                    <span className="highlight-value-j">${viewPackage.price.toLocaleString()}</span>
                  </div>
                  <div className="highlight-item-j">
                    <span className="highlight-label-j">Duration</span>
                    <span className="highlight-value-j">
                      {calculateDuration(viewPackage.startDate, viewPackage.endDate)} days
                    </span>
                  </div>
                  <div className="highlight-item-j">
                    <span className="highlight-label-j">Location</span>
                    <span className="highlight-value-j">{viewPackage.destination}</span>
                  </div>
                </div>
                
                <div className="package-dates-j">
                  <p><MdDateRange className="date-icon-j" /> <strong>Start:</strong> {formatDate(viewPackage.startDate)}</p>
                  <p><MdDateRange className="date-icon-j" /> <strong>End:</strong> {formatDate(viewPackage.endDate)}</p>
                </div>
                
                <h3>Tour Description</h3>
                <p className="package-description-j">{viewPackage.description}</p>
                
                <div className="package-guide-j">
                  <h3><FaUser className="guide-icon-j" /> Tour Guide</h3>
                  <p>{viewPackage.tourGuideName}</p>
                </div>
                
                <button className="book-now-btn-j" onClick={() => handleClickOpen()}>
                  <span className="btn-text-j">Book This Tour</span>
                  <span className="btn-icon-j">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Packages Section */}
      {!viewPackage && (
        <div className="section-container-j">
          <div className="packages-section-j">
            <div className="packages-grid-j">
              <div className="packages-header-j">
                <h2>Our Tour Packages</h2>
                <div className="tour-categories-j">
                  {allTourTypes.map(type => (
                    <button 
                      key={type}
                      className={`category-btn-j ${activeCategory === type ? 'active' : ''}`}
                      onClick={() => setActiveCategory(type)}
                    >
                      {type}
                      {activeCategory === type && <span className="active-indicator"></span>}
                    </button>
                  ))}
                </div>
              </div>
              
              {isLoading ? (
                <div className="loading-spinner-j">
                  <div className="spinner"></div>
                  <p>Loading amazing adventures...</p>
                </div>
              ) : error ? (
                <div className="error-message-j">
                  <p>{error}</p>
                  <button className="retry-btn-j" onClick={() => window.location.reload()}>Try Again</button>
                </div>
              ) : filteredPackages.length === 0 ? (
                <div className="no-results-j">
                  <p>No packages match your search criteria.</p>
                  <button className="reset-search-btn-j" onClick={() => {
                    setSearchTerm('');
                    setActiveCategory('All');
                  }}>Reset Search</button>
                </div>
              ) : (
                <div className="packages-cards-j">
                  {filteredPackages.map(pkg => (
                    <div className="package-card-j" key={pkg.tp_Id}>
                      <div className="package-image-j">
                        <img src={pkg.image} alt={pkg.name} />
                        <div className="card-overlay-j"></div>
                        <div className="package-type-j">
                          <BiSolidCategory className="type-icon-j" /> {pkg.tourType}
                        </div>
                        <div className="package-price-j">${pkg.price.toLocaleString()}</div>
                        <button 
                          className={`card-favorite-btn-j ${favorites.includes(pkg.tp_Id) ? 'is-favorite' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(pkg.tp_Id);
                          }}
                          aria-label={favorites.includes(pkg.tp_Id) ? "Remove from favorites" : "Add to favorites"}
                        >
                          <AiFillHeart />
                        </button>
                      </div>
                      
                      <div className="package-content-j">
                        <h3>{pkg.name}</h3>
                        <div className="package-meta-j">
                          <span><FaMapMarkerAlt className="location-icon-j" /> {pkg.destination}</span>
                          <span><FaClock className="duration-icon-j" /> {calculateDuration(pkg.startDate, pkg.endDate)} days</span>
                        </div>
                        <p className="package-snippet-j">
                          {pkg.description.substring(0, 100)}...
                        </p>
                        <button 
                          className="view-details-btn-j"
                          onClick={() => handleView(pkg)}
                        >
                          <span>View Details</span>
                          <i className="btn-arrow">→</i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Featured Destinations Section */}
          <div className="featured-section-j">
            <h2>Featured Destinations</h2>
            <div className="destinations-grid-j">
              {tourPackages.slice(0, 3).map(pkg => (
                <div className="destination-card-j" key={`featured-${pkg.tp_Id}`}>
                  <img src={pkg.image} alt={pkg.destination} />
                  <div className="destination-overlay-j">
                    <h3><MdLocationOn className="dest-icon-j" /> {pkg.destination}</h3>
                    <button 
                      className="explore-btn-j"
                      onClick={() => handleView(pkg)}
                    >
                      <span>Explore</span>
                      <i className="explore-icon">→</i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Testimonials Section */}
          <div className="testimonials-section-j">
            <h2>What Our Travelers Say</h2>
            <div className="testimonials-container-j">
              <div className="testimonial-card-j">
                <div className="testimonial-stars-j">
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                </div>
                <div className="testimonial-content-j">
                  <p>"Amazing experience! The tour guide was knowledgeable and the destinations were breathtaking."</p>
                </div>
                <div className="testimonial-author-j">
                  <div className="author-avatar-j">
                    <FaUser />
                  </div>
                  <div className="author-info-j">
                    <h4>Sarah Johnson</h4>
                    <p>Adventure Tour to Bali</p>
                  </div>
                </div>
              </div>
              
              <div className="testimonial-card-j">
                <div className="testimonial-stars-j">
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                </div>
                <div className="testimonial-content-j">
                  <p>"Perfectly organized trip. Everything from accommodation to activities exceeded our expectations."</p>
                </div>
                <div className="testimonial-author-j">
                  <div className="author-avatar-j">
                    <FaUser />
                  </div>
                  <div className="author-info-j">
                    <h4>Michael Brown</h4>
                    <p>Cultural Tour in Japan</p>
                  </div>
                </div>
              </div>
              
              <div className="testimonial-card-j">
                <div className="testimonial-stars-j">
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                </div>
                <div className="testimonial-content-j">
                  <p>"Worth every penny! Our family had the time of our lives exploring these wonderful destinations."</p>
                </div>
                <div className="testimonial-author-j">
                  <div className="author-avatar-j">
                    <FaUser />
                  </div>
                  <div className="author-info-j">
                    <h4>Emily Wilson</h4>
                    <p>Family Package to Greece</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="newsletter-section-j">
            <div className="newsletter-content-j">
              <h2>Stay Updated</h2>
              <p>Subscribe to our newsletter and be the first to know about new tour packages and exclusive deals!</p>
              <div className="newsletter-form-j">
                <div className="newsletter-input-wrapper-j">
                  <FaEnvelope className="newsletter-icon-j" />
                  <input type="email" placeholder="Your email address" />
                </div>
                <button>
                  <span>Subscribe</span>
                  <span className="subscribe-hover">Join Now</span>
                </button>
              </div>
            </div>
          </div>
          <BookingFooter/>
        </div>
      )}

      {/* Dialog for Payment */}
      <Dialog open={isDialogOpen} onClose={handleClose} fullWidth maxWidth="md">
        <DialogContent>
          <Payment packageData={viewPackage} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TourPackagesLanding;