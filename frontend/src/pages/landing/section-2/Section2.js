<<<<<<< HEAD
// Section2.jsx
import React from 'react';
import './Section2.css';
import { FaUmbrellaBeach, FaTree, FaLandmark, FaHiking } from 'react-icons/fa';

const Section2 = () => {
  return (
    <div className="section2Container">
      <div className="aboutSriLanka">
        <div className="aboutTextContainer">
          <h2 className="sectionTitle">Discover Sri Lanka</h2>
          <p className="sectionSubtitle">Paradise Island with a rich cultural heritage</p>
          <div className="aboutDescription">
            <p>Sri Lanka, the pearl of the Indian Ocean, offers an incredible diversity of experiences in a compact island. From ancient ruins and lush tea plantations to pristine beaches and abundant wildlife, this tropical paradise has something for every traveler.</p>
            <p>With over 2,000 years of recorded history, 8 UNESCO World Heritage Sites, and incredible biodiversity, Sri Lanka delivers unforgettable experiences with its warm hospitality and rich culture.</p>
          </div>
          
          <div className="highlightsContainer">
            <div className="highlightItem">
              <div className="iconContainer">
                <FaUmbrellaBeach className="highlightIcon" />
              </div>
              <div className="highlightText">
                <h4>Beautiful Beaches</h4>
                <p>1,340km of pristine coastline</p>
              </div>
            </div>
            
            <div className="highlightItem">
              <div className="iconContainer">
                <FaTree className="highlightIcon" />
              </div>
              <div className="highlightText">
                <h4>National Parks</h4>
                <p>26 national parks with diverse wildlife</p>
              </div>
            </div>
            
            <div className="highlightItem">
              <div className="iconContainer">
                <FaLandmark className="highlightIcon" />
              </div>
              <div className="highlightText">
                <h4>Heritage Sites</h4>
                <p>8 UNESCO World Heritage sites</p>
              </div>
            </div>
            
            <div className="highlightItem">
              <div className="iconContainer">
                <FaHiking className="highlightIcon" />
              </div>
              <div className="highlightText">
                <h4>Adventure</h4>
                <p>Hiking, surfing, diving & more</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="imageGalleryContainer">
          <div className="imageGrid">
            <div className="imageBox imageBox1"></div>
            <div className="imageBox imageBox2"></div>
            <div className="imageBox imageBox3"></div>
            <div className="imageBox imageBox4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
=======
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Payment from '../../Admin/InBuildpackage/paymentpage/PackagePayment';
// Import Dialog components from Material UI
import { Dialog, DialogContent, DialogActions, Button } from "@mui/material";
// Import icons from react-icons
import { FaMapMarkerAlt, FaClock, FaUser, FaArrowLeft, FaSearch, FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaEnvelope, FaPhone } from 'react-icons/fa';
import { MdDateRange, MdLocationOn } from 'react-icons/md';
import { AiFillStar } from 'react-icons/ai';
>>>>>>> 7de07865f64e44dc5091f0fb6eb98dd878fc4d57

import './Section2.css';

const TourPackagesLanding = () => {
  const [tourPackages, setTourPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewPackage, setViewPackage] = useState(null);
  const [filters, setFilters] = useState({
    searchTerm: '',
    priceRange: [0, 10000],
    tourTypes: [],
    sortBy: 'price-low-high'
  });
  const [allTourTypes, setAllTourTypes] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  // Add state for dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState(null);
  
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
        
        // Extract unique tour types
        const types = [...new Set(response.data.map(pkg => pkg.tourType))];
        setAllTourTypes(types);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching tour packages:', error);
        setError('Failed to load tour packages. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchTourPackages();
  }, []);

  const handleView = (pkg) => {
    setViewPackage(pkg);
    window.scrollTo(0, 0); // Scroll to top when viewing package
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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTourTypeToggle = (type) => {
    setFilters(prev => {
      const currentTypes = [...prev.tourTypes];
      if (currentTypes.includes(type)) {
        return {
          ...prev,
          tourTypes: currentTypes.filter(t => t !== type)
        };
      } else {
        return {
          ...prev,
          tourTypes: [...currentTypes, type]
        };
      }
    });
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const filteredPackages = tourPackages
    .filter(pkg => {
      // Filter by search term
      const searchMatch = pkg.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                         pkg.destination.toLowerCase().includes(filters.searchTerm.toLowerCase());
      
      // Filter by price range
      const priceMatch = pkg.price >= filters.priceRange[0] && pkg.price <= filters.priceRange[1];
      
      // Filter by tour type
      const typeMatch = filters.tourTypes.length === 0 || filters.tourTypes.includes(pkg.tourType);
      
      return searchMatch && priceMatch && typeMatch;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low-high':
          return a.price - b.price;
        case 'price-high-low':
          return b.price - a.price;
        case 'duration-short-long':
          return calculateDuration(a.startDate, a.endDate) - calculateDuration(b.startDate, b.endDate);
        case 'duration-long-short':
          return calculateDuration(b.startDate, b.endDate) - calculateDuration(a.startDate, a.endDate);
        default:
          return 0;
      }
    });

  return (
    <div className="tour-landing-container-j">
      {/* Hero Section */}
      <div className="hero-section-j">
        <div className="hero-content-j">
          <h1>Discover Amazing Tours</h1>
          <p>Find your perfect adventure from our selection of premium tour packages</p>
          <div className="search-container-j">
            <div className="search-input-wrapper-j">
              <FaSearch className="search-icon-j" />
              <input
                type="text"
                placeholder="Search destinations, tours..."
                name="searchTerm"
                value={filters.searchTerm}
                onChange={handleFilterChange}
              />
            </div>
            <button className="search-btn-j">Search</button>
          </div>
        </div>
      </div>

      {/* Single Package View */}
      {viewPackage && (
        <div className="package-detail-section-j">
          <button className="back-button-j" onClick={closePackageView}>
            <FaArrowLeft className="back-icon-j" /> Back to All Packages
          </button>
          
          <div className="package-detail-container-j">
            <div className="package-detail-header-j">
              <h2>{viewPackage.name}</h2>
              <span className="package-tag-j">{viewPackage.tourType}</span>
            </div>
            
            <div className="package-detail-main-j">
              <div className="package-detail-image-j">
                <img src={viewPackage.image} alt={viewPackage.name} />
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
                
                <button className="book-now-btn-j" onClick={() => handleClickOpen()}>Book This Tour</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters and Packages Section */}
      {!viewPackage && (
        <div className="section-container-j">
          <div className="packages-section-j">
            <div className={`filter-sidebar-j ${showFilters ? 'show-filters-j' : ''}`}>
              <div className="filter-header-j">
                <h3>Filters</h3>
                <button className="close-filters-j" onClick={toggleFilters}>×</button>
              </div>
              
              <div className="filter-group-j">
                <h4>Price Range</h4>
                <div className="price-slider-j">
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="100"
                    value={filters.priceRange[1]}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      priceRange: [prev.priceRange[0], parseInt(e.target.value)]
                    }))}
                  />
                  <div className="price-range-display-j">
                    ${filters.priceRange[0]} - ${filters.priceRange[1]}
                  </div>
                </div>
              </div>
              
              <div className="filter-group-j">
                <h4>Tour Type</h4>
                <div className="tour-type-filters-j">
                  {allTourTypes.map(type => (
                    <div className="tour-type-checkbox-j" key={type}>
                      <input
                        type="checkbox"
                        id={`type-${type}`}
                        checked={filters.tourTypes.includes(type)}
                        onChange={() => handleTourTypeToggle(type)}
                      />
                      <label htmlFor={`type-${type}`}>{type}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="filter-group-j">
                <h4>Sort By</h4>
                <select
                  name="sortBy"
                  value={filters.sortBy}
                  onChange={handleFilterChange}
                  className="sort-select-j"
                >
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="duration-short-long">Duration: Short to Long</option>
                  <option value="duration-long-short">Duration: Long to Short</option>
                </select>
              </div>
              
              <button className="apply-filters-btn-j">Apply Filters</button>
            </div>
            
            <div className="packages-grid-j">
              <div className="packages-header-j">
                <h2>Our Tour Packages</h2>
                <button className="filter-toggle-btn-j" onClick={toggleFilters}>
                  <FaSearch /> Filters
                </button>
              </div>
              
              {isLoading ? (
                <div className="loading-spinner-j">Loading packages...</div>
              ) : error ? (
                <div className="error-message-j">{error}</div>
              ) : filteredPackages.length === 0 ? (
                <div className="no-results-j">No packages match your search criteria.</div>
              ) : (
                <div className="packages-cards-j">
                  {filteredPackages.map(pkg => (
                    <div className="package-card-j" key={pkg.tp_Id}>
                      <div className="package-image-j">
                        <img src={pkg.image} alt={pkg.name} />
                        <div className="package-type-j">{pkg.tourType}</div>
                        <div className="package-price-j">${pkg.price.toLocaleString()}</div>
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
                          View Details
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
                      Explore
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
                <button>Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="landing-footer-j">
        <div className="footer-content-j">
          <div className="footer-column-j">
            <h3>About Us</h3>
            <p>We specialize in creating unforgettable travel experiences around the world.</p>
          </div>
          
          <div className="footer-column-j">
            
            <h3>Contact</h3>
            <p><FaEnvelope className="footer-icon-j" /> info@tourcompany.com</p>
            <p><FaPhone className="footer-icon-j" /> +1 (555) 123-4567</p>
          </div>
          
          <div className="footer-column-j">
            <h3>Follow Us</h3>
            <div className="social-icons-j">
              <span className="social-icon-j"><FaFacebookF /></span>
              <span className="social-icon-j"><FaTwitter /></span>
              <span className="social-icon-j"><FaInstagram /></span>
              <span className="social-icon-j"><FaYoutube /></span>
            </div>
          </div>
        </div>
        <div className="copyright-j">
          © 2025 Tour Company. All rights reserved.
        </div>
      </footer>

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