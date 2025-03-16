const express = require("express");
const app = express();
const PORT = 4000;
const testRoute = require('./route/testRoute');

// Middleware
app.use(express.json());
app.use('/api',testRoute);

// Default Route
// app.get("/test", (req, res) => {
//     res.send("Welcome to Express.js Backend!");
// });

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
