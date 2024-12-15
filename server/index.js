const dotenv = require('dotenv')
const express = require('express')
const connectDB = require('./config/db')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')
const User = require('./models/User')
const History = require('./models/History')
const cors = require('cors')
const cookieParser = require('cookie-parser')

//Routes
const userRoutes = require('./routes/userRoutes')
const historyRoutes = require('./routes/historyRoutes')
const ttsRoutes = require('./routes/ttsRoutes')

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000
connectDB()

// Middleware 
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Routes
app.use("/api/users", userRoutes)
app.use("/api/history", historyRoutes)
app.use("/api/tts", ttsRoutes)

app.get("/", (req, res) => {
    res.send("Hello from Tokunbor server backend.")
})

// Custom error
app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})