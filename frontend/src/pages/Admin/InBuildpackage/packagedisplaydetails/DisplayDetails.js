import React, { useState } from 'react';
import './DisplayDetails.css';

const DisplayDetails = () => {
  // Sample data for testing
  const sampleData = [
    {
      tp_Id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
      packageId: "ADV-001",
      Packagename: "Himalayan Trek Adventure",
      destination: "Nepal - Everest Base Camp",
      price: 2499,
      startDate: "2025-06-10T00:00:00.000Z",
      endDate: "2025-06-21T00:00:00.000Z",
      tourGuideName: "Sherpa Tenzing",
      tourType: "Adventure",
      description: "Experience the thrill of trekking to Everest Base Camp with our expert guides. This 12-day adventure will take you through stunning Himalayan landscapes, traditional Sherpa villages, and ultimately to the base of the world's highest mountain. Suitable for experienced hikers looking for the journey of a lifetime.",
      imageUrl: "https://images.unsplash.com/photo-1517021897933-0e0319cfbc28?q=80&w=1000&auto=format&fit=crop",
    },
    {
      tp_Id: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
      packageId: "BCH-002",
      Packagename: "Bali Beach Paradise",
      destination: "Indonesia - Bali",
      price: 1899,
      startDate: "2025-05-15T00:00:00.000Z",
      endDate: "2025-05-22T00:00:00.000Z",
      tourGuideName: "Maya Indra",
      tourType: "Beach",
      description: "Escape to the tropical paradise of Bali with our 8-day beach getaway. Enjoy pristine beaches, luxurious accommodations, and authentic Indonesian cuisine. Package includes guided tours to ancient temples, traditional dance performances, and a sunset dinner cruise.",
      imageUrl: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?q=80&w=1000&auto=format&fit=crop",
    },
    {
      tp_Id: "6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b",
      packageId: "CLT-003",
      Packagename: "Japanese Cultural Experience",
      destination: "Japan - Kyoto and Tokyo",
      price: 3299,
      startDate: "2025-04-03T00:00:00.000Z",
      endDate: "2025-04-12T00:00:00.000Z",
      tourGuideName: "Hiroshi Tanaka",
      tourType: "Cultural",
      description: "Immerse yourself in Japanese culture with our 10-day tour of Kyoto and Tokyo. Visit ancient temples, participate in a traditional tea ceremony, and experience both the historic and modern sides of Japan. Highlights include cherry blossom viewing (seasonal), a night in a traditional ryokan, and a sushi-making class.",
      imageUrl: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=1000&auto=format&fit=crop",
    },
    {
      tp_Id: "7fb1377b-57ef-4885-a3e6-5b821e16898c",
      packageId: "FAM-004",
      Packagename: "Orlando Family Fun",
      destination: "USA - Orlando, Florida",
      price: 2799,
      startDate: "2025-07-10T00:00:00.000Z",
      endDate: "2025-07-17T00:00:00.000Z",
      tourGuideName: "Jessica Rodriguez",
      tourType: "Family",
      description: "Create unforgettable memories with our family-friendly Orlando package. Enjoy 7 days of fun with passes to major theme parks, comfortable family accommodations, and transportation included. Perfect for families with children of all ages, this package makes navigating Orlando's attractions easy and stress-free.",
      imageUrl: "https://images.unsplash.com/photo-1575089976121-8ed7b2a54265?q=80&w=1000&auto=format&fit=crop",
    },
    {
      tp_Id: "9e71dc35-d70d-4a31-b76a-cd2d10df127a",
      packageId: "LUX-005",
      Packagename: "Maldives Luxury Escape",
      destination: "Maldives - Private Island Resort",
      price: 5999,
      startDate: "2025-03-12T00:00:00.000Z",
      endDate: "2025-03-19T00:00:00.000Z",
      tourGuideName: "Ahmed Rasheed",
      tourType: "Luxury",
      description: "Indulge in the ultimate luxury experience with our exclusive Maldives package. Stay in an overwater bungalow with direct access to crystal clear waters. Package includes gourmet dining, couples spa treatments, private snorkeling tours, and sunset champagne cruises. Perfect for honeymoons or special celebrations.",
      imageUrl: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1000&auto=format&fit=crop",
    },
    {
      tp_Id: "3b96c09e-2edc-4c1a-85cc-af56568cdef2",
      packageId: "WLD-006",
      Packagename: "African Safari Adventure",
      destination: "Kenya - Masai Mara",
      price: 4199,
      startDate: "2025-08-05T00:00:00.000Z",
      endDate: "2025-08-14T00:00:00.000Z",
      tourGuideName: "Daniel Kimani",
      tourType: "Wildlife",
      description: "Experience the majestic wildlife of Africa with our 10-day safari in Kenya's Masai Mara. Witness the Great Migration, see the Big Five up close, and connect with local Masai communities. Accommodations include luxury tented camps with amazing views. Daily game drives and expert naturalist guides ensure an unforgettable wildlife adventure.",
      imageUrl: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=1000&auto=format&fit=crop",
    }
  ];

  const [tourPackages, setTourPackages] = useState(sampleData);
  const [viewPackage, setViewPackage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this tour package?')) {
      setTourPackages(tourPackages.filter(pkg => pkg.tp_Id !== id));
      alert('Tour package deleted successfully!');
    }
  };

  const handleView = (pkg) => {
    setViewPackage(pkg);
    setShowModal(true);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
  };

  const closeModal = () => {
    setShowModal(false);
    setViewPackage(null);
  };

  return (
    <div className="tour-packages-container">
      <div className="header">
        <h1>Tour Packages</h1>
        <button className="add-button" onClick={() => window.location.href = '/add-tour'}>
          <span style={{ marginRight: '8px' }}>&#10133;</span> Add New Package
        </button>
      </div>

      <div className="tour-packages-grid">
        {tourPackages.length === 0 ? (
          <p className="no-packages">No tour packages found. Add your first package now!</p>
        ) : (
          tourPackages.map(pkg => (
            <div className="tour-package-card" key={pkg.tp_Id}>
              <div className="card-image">
                <img src={pkg.imageUrl} alt={pkg.Packagename} />
                <div className="tour-type">{pkg.tourType}</div>
              </div>
              
              <div className="card-content">
                <h2>{pkg.Packagename}</h2>
                <p className="destination"><strong>Destination:</strong> {pkg.destination}</p>
                <p className="dates">
                  <strong>Duration:</strong> {formatDate(pkg.startDate)} - {formatDate(pkg.endDate)}
                </p>
                <p className="price"><strong>Price:</strong> ${pkg.price.toLocaleString()}</p>
                
                <div className="action-buttons">
                  <button className="view-btn" onClick={() => handleView(pkg)}>
                    <span style={{ marginRight: '5px' }}>&#128065;</span> View
                  </button>
                  <button className="edit-btn" onClick={() => window.location.href = `/edit-tour/${pkg.tp_Id}`}>
                    <span style={{ marginRight: '5px' }}>&#9998;</span> Edit
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(pkg.tp_Id)}>
                    <span style={{ marginRight: '5px' }}>&#128465;</span> Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && viewPackage && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>&times;</span>
            <div className="modal-header">
              <h2>{viewPackage.Packagename}</h2>
              <p className="tour-badge">{viewPackage.tourType}</p>
            </div>
            
            <div className="modal-body">
              <div className="modal-image">
                <img src={viewPackage.imageUrl} alt={viewPackage.Packagename} />
              </div>
              
              <div className="modal-details">
                <p><strong>Package ID:</strong> {viewPackage.packageId}</p>
                <p><strong>Destination:</strong> {viewPackage.destination}</p>
                <p><strong>Tour Guide:</strong> {viewPackage.tourGuideName}</p>
                <p><strong>Start Date:</strong> {formatDate(viewPackage.startDate)}</p>
                <p><strong>End Date:</strong> {formatDate(viewPackage.endDate)}</p>
                <p><strong>Price:</strong> ${viewPackage.price.toLocaleString()}</p>
                <p><strong>Description:</strong></p>
                <p className="description">{viewPackage.description}</p>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="edit-btn" onClick={() => window.location.href = `/edit-tour/${viewPackage.tp_Id}`}>
                <span style={{ marginRight: '5px' }}>&#9998;</span> Edit Package
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayDetails;