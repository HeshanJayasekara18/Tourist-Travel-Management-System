import React, { useState } from 'react';
import { Dialog, DialogContent, DialogActions, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import './DisplayDetails.css';
import Homepage from '../addpackage/Addpackage.js';
import SimplifiedTourForm from '../editpackagefrom/Editpackagefrom.js';

const DisplayDetails = () => {
  const sampleData = [
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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState(null);

  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleClickOpen = (pkgId = null) => {
    if (pkgId) {
      const packageToEdit = tourPackages.find(pkg => pkg.tp_Id === pkgId);
      setSelectedPackageId(pkgId);  // Set packageId for editing
      setViewPackage(packageToEdit);  // Set the selected package to be edited
    } else {
      setSelectedPackageId(null); // For Add New Package
      setViewPackage(null);
    }
    setIsDialogOpen(true); // Open the dialog (popup)
  };

  const handleClose = () => {
    setIsDialogOpen(false);
    setSelectedPackageId(null);
  };

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
              {/* Additional footer actions */}
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
