const express = require("express");
const app = express();
const PORT = 4000;

// Middleware
app.use(express.json());

// Default Route
app.get("/", (req, res) => {
    res.send("Welcome to Express.js Backend!");
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
