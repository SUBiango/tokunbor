const dotenv = require('dotenv')
const express = require('express')
const path = require('path')
const connectDB = require('./config/db')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')
const User = require('./models/User')
const History = require('./models/History')
const cors = require('cors')
const cookieParser = require('cookie-parser')

// Import Routes
const userRoutes = require('./routes/userRoutes')
const historyRoutes = require('./routes/historyRoutes')
const ttsRoutes = require('./routes/ttsRoutes')

dotenv.config({ path: path.resolve(__dirname, '../.env') })
const app = express()
const PORT = process.env.PORT || 3000
connectDB()

// Middleware 
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

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