const dotenv = require('dotenv')
const express = require('express')
const path = require('path')
const connectDB = require('./config/db')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')
const User = require('./models/User')
const History = require('./models/History')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const compression = require('compression')
const helmet = require('helmet')

// Import Routes
const userRoutes = require('./routes/userRoutes')
const historyRoutes = require('./routes/historyRoutes')
const ttsRoutes = require('./routes/ttsRoutes')

dotenv.config() // Load environment variables
const app = express()
const PORT = process.env.PORT || 5000
connectDB()

const RateLimit = require("express-rate-limit")
const limiter = RateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // limit each IP to 20 requests per windowMs
    message: "Too many requests from this IP, please try again after 15 minutes"
})

// Middleware 
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
})) // Enable CORS
app.use(express.json()) // Parse JSON bodies
app.use(express.urlencoded({ extended: true })) // Parse URL-encoded bodies
app.use(cookieParser()) // Parse cookies
app.use(compression()) // Compress all routes
app.use(helmet())
app.use(limiter)

// Route Mount
app.use("/api/users", userRoutes)
app.use("/api/history", historyRoutes)
app.use("/api/tts", ttsRoutes)

// Default Route
app.get("/", (req, res) => {
    res.send("Hello from Tokunbor server backend.")
})

// Custom Error
app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})