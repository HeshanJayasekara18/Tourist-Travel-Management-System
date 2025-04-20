import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogActions, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import './DisplayDetails.css';
import Homepage from '../addpackage/Addpackage.js';
import SimplifiedTourForm from '../editpackagefrom/Editpackagefrom.js';
import axios from 'axios';

const DisplayDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [submitMessage, setSubmitMessage] = useState({ type: '', message: '' });
  const [tourPackages, setTourPackages] = useState([
    
  ]);
  const [viewPackage, setViewPackage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState(null);

  const navigate = useNavigate(); // Initialize useNavigate hook

  // Fetch tour packages from the API
  useEffect(() => {
    const fetchTourPackages = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/tourPackage');
        setTourPackages(response.data); // Store the fetched data in state
        setIsLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching tour packages:', error);
        setSubmitMessage({ type: 'error', message: 'Failed to load tour packages. Please try again.' });
        setIsLoading(false);
      }
    };

    fetchTourPackages();
  }, []); // Empty dependency array to run once when the component mounts

  const handleClickOpen = (pkgId = null) => {
    if (pkgId) {
      const packageToEdit = tourPackages.find(pkg => pkg.tp_Id === pkgId);
      setSelectedPackageId(pkgId);
      setViewPackage(packageToEdit);
      console.log("TEST",viewPackage);
      
    } else {
      setSelectedPackageId(null);
      setViewPackage(null);
    }
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
    setSelectedPackageId(null);
  };
  

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this tour package?')) {
      try {
        await axios.delete(`http://localhost:4000/api/tourPackage/${id}`);
        
      
        setTourPackages(prevPackages => prevPackages.filter(pkg => pkg.tp_Id !== id));
        
        alert('Tour package deleted successfully!');
      } catch (error) {
        console.error('Error deleting tour package:', error);
        alert('Failed to delete tour package.');
      }
    }
  };
  

  const handleView = (pkg) => {
    console.log("TEST",pkg);
    setViewPackage(pkg);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
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

  return (
    <div className="tour-packages-container">
      <div className="header">
        <h1>Tour Packages</h1>
        <button className="add-button" onClick={() => handleClickOpen()}>
          <span style={{ marginRight: '8px' }}>&#10133;</span> Add New Package
        </button>
      </div>

      <div className="tour-packages-grid">
        {isLoading ? (
          <p>Loading tour packages...</p>
        ) : tourPackages.length === 0 ? (
          <p className="no-packages">No tour packages found. Add your first package now!</p>
        ) : (
          tourPackages.map(pkg => (
            <div className="tour-package-card" key={pkg.tp_Id}>
              <div className="card-image">
                <img src={pkg.image} alt={pkg.name} />
                <div className="tour-type">{pkg.tourType}</div>
              </div>

              <div className="card-content">
                <h2>{pkg.name}</h2>
                <p className="destination"><strong>Destination:</strong> {pkg.destination}</p>
                <p className="dates">
                  <strong>Duration:</strong> {formatDate(pkg.startDate)} - {formatDate(pkg.endDate)}
                </p>
                <p className="price"><strong>Price:</strong> ${pkg.price.toLocaleString()}</p>

                <div className="action-buttons">
                  <button className="view-btn" onClick={() => handleView(pkg)}>
                    <span style={{ marginRight: '5px' }}>&#128065;</span> View
                  </button>
                  <button className="edit-btn" onClick={() => handleClickOpen(pkg.tp_Id)}>
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
              <h2>{viewPackage.name}</h2>
              <p className="tour-badge">{viewPackage.tourType}</p>
            </div>

            <div className="modal-body">
              <div className="modal-image">
                <img src={viewPackage.image} alt={viewPackage.name} />
              </div>

              <div className="modal-details">
                <p><strong>Package ID:</strong> {viewPackage.tp_Id}</p>
                <p><strong>Destination:</strong> {viewPackage.destination}</p>
                <p><strong>Tour Guide:</strong> {viewPackage.tourGuideName}</p>
                <p><strong>Start Date:</strong> {formatDate(viewPackage.startDate)}</p>
                <p><strong>End Date:</strong> {formatDate(viewPackage.endDate)}</p>
                <p><strong>Price:</strong> ${viewPackage.price.toLocaleString()}</p>
                <p><strong>Description:</strong></p>
                <p className="description">{viewPackage.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <Dialog open={isDialogOpen} onClose={handleClose} fullWidth maxWidth="md">
        <DialogContent>
          {viewPackage ? (
            <SimplifiedTourForm packageData={viewPackage} />
          ) : (
            <Homepage />
          )}
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

export default DisplayDetails;
