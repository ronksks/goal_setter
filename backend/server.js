const express = require("express")
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;


const app = express();
//whenever i enter the /api/goals - it requires the routes that has been set in the goalRoutes.js
app.use('/api/goals', require('./routes/goalRoutes'))



app.listen(port, () => {
    console.log(`server started on port: ${port}`);
})