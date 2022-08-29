const express = require("express")
const dotenv = require("dotenv").config();
const colors = require("colors");
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;

connectDB();


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//whenever i enter the /api/goals - it requires the routes that has been set in the goalRoutes.js
app.use('/api/goals', require('./routes/goalRoutes'));

app.use('/api/users', require('./routes/userRoutes'));

// overrides the default express error handler to the one a wrote at  ('./middleware/errorMiddleware')
app.use(errorHandler);




app.listen(port, () => {
    console.log(`server started on port: ${port}`);
})