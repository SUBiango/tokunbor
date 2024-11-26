const mongoose = require("mongoose")


/**
 * Establishes a connection to the MongoDB database using the connection string
 * specified in the environment variable MONGO_URI. Logs the host of the connected
 * database on success. If an error occurs during connection, logs the error message
 * and exits the process with a failure code.
 */
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Mongodb connected: ${conn.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
}

module.exports = connectDB