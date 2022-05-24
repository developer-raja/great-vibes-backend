const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db')
const PORT = process.env.PORT || 5000
const movieRoutes = require('./routes/movieRoutes')

// Connect to database
connectDB()

const app = express();

app.use(cookieParser());


app.use(express.json())
app.use(express.urlencoded({ extended: false }))




app.use('/api/movie', movieRoutes)









app.listen(PORT, () => console.log(`Server started on port ${PORT}`))