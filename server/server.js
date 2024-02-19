const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan")
const cors = require("cors");

const connectDB = require("./config/db");


//dotenv conig
dotenv.config();

//mongodb connection
connectDB();

//rest obejct
const app = express();

// Enable CORS for all requests
app.use(cors());

// middlewares
app.use(express.json())
app.use(morgan("dev"))
app.use('/uploads', express.static('uploads'));


app.use('/api/v1/users', require("./routes/userRoutes"));
app.use('/api/v1/files', require("./routes/fileRoutes"))


//port
const port = process.env.PORT || 8080;
//listen port
app.listen(port, () => {
    console.log(
        `Server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`
    );
});