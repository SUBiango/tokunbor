const asyncHandler = require("express-async-handler")
const History = require("../models/History")  
const { default: mongoose } = require("mongoose")

// @desc Add a conversion to history
// @route POST /api/conversions
// @access Private
const addHistory = asyncHandler(async (req, res) => {
    const { text, language, voice } = req.body

    const newHistory = await History.create({
        userId: req.user._id,
        text,
        language,
        voice
    })

    if (!newHistory) {
        res.status(400)
        throw new Error('Conversion not added to history')
    }

    res.status(201).json(newHistory);
})

// @desc  Fetch user history
// @route GET /api/history
// @access Private
const getUserHistory = asyncHandler(async (req, res) => {
    const history = await History.find({ userId: req.user._id })
    res.status(200).json(history);
})

// @desc  Delete specific history entry
// @route DELETE /api/history
// @access Private
const deleteHistory = asyncHandler(async (req, res) => {
    const history = await History.findByIdAndDelete(req.params.id)

    if (!history) {
        res.status(404)
        throw new Error('History not found')
    }
    
    res.status(200).json({message: "History deleted"});
})

// @desc  Clear all history
// @route DELETE /api/history
// @access Private
const clearAllHistory = asyncHandler(async (req, res) => {
    await History.deleteMany({ user: req.userId })
    res.status(200).json({message: "All history cleared successfully" });
})

module.exports = {
    addHistory,
    getUserHistory,
    deleteHistory,
    clearAllHistory
}

