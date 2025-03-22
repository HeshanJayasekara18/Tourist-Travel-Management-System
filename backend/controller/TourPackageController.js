const TourPackage = require('../model/TourPackage');

// Create a new tour package
const createTourPackage = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "Request body cannot be empty" });
        }
        const tourPackage = new TourPackage(req.body);
        await tourPackage.save();
        res.status(201).json({ message: "Tour package created successfully", tourPackage });
    } catch (error) {
        res.status(400).json({ message: "Error creating tour package", error: error.message });
    }
};

// Get all tour packages
const getAllTourPackages = async (req, res) => {
    try {
        const tourPackages = await TourPackage.find();
        res.status(200).json(tourPackages);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving tour packages", error: error.message });
    }
};

// Get a single tour package by ID
const getTourPackageById = async (req, res) => {
    try {
        const tourPackage = await TourPackage.findById(req.params.id);
        if (!tourPackage) {
            return res.status(404).json({ message: "Tour package not found" });
        }
        res.status(200).json(tourPackage);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving tour package", error: error.message });
    }
};

// Update a tour package by ID
const updateTourPackage = async (req, res) => {
    try {
        // Validate that the incoming ID is valid
        const tourPackage = await TourPackage.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        // If no tour package was found and updated, return a 404 error
        if (!tourPackage) {
            return res.status(404).json({ message: "Tour package not found" });
        }

        // Return a success response with the updated tour package
        res.status(200).json({ message: "Tour package updated successfully", tourPackage });
    } catch (error) {
        // Handle Mongoose validation errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: "Validation error", error: error.message });
        }

        // General error handling
        res.status(400).json({ message: "Error updating tour package", error: error.message });
    }
};


// Delete a tour package by ID
const deleteTourPackage = async (req, res) => {
    try {
        const tourPackage = await TourPackage.findByIdAndDelete(req.params.id);
        if (!tourPackage) {
            return res.status(404).json({ message: "Tour package not found" });
        }
        res.status(200).json({ message: "Tour package deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting tour package", error: error.message });
    }
};

module.exports = {
    createTourPackage,
    getAllTourPackages,
    getTourPackageById,
    updateTourPackage,
    deleteTourPackage
};
