const asyncHandler = require("express-async-handler")
const generateTokens = require("../utils/generateTokens")
const User = require("../models/User")
const bcrypt = require('bcryptjs')

// @desc Authenticate a user
// @route POST /api/users/auth
// @access Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (user) {
        const isMatch = await bcrypt.compare(password, user.passwordHash)
        if (isMatch) {
            generateTokens(res, user._id)
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email
            })
        } else {
            res.status(401)
            throw new Error('Invalid email or password')
        }
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }

})

// @desc Register a user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    // console.log('password: ', password)

    const userExist = await User.findOne({ email })

    if (userExist) {
        res.status(400)
        throw new Error(`User: ${email} already exists`)
    }

    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    const newUser = await User.create({
        name,
        email,
        passwordHash
    })

    if (newUser) {
        generateTokens(res, newUser._id)
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email
        })
    }
})

// @desc Logout a user
// @route POST /api/users/logout
// @access Public
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    
    res.status(200).json({ message: "User logged out" });
})

// @desc  Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }
    res.status(200).json(user);
})

// @desc  Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            const passwordHash = await bcrypt.hash(req.body.password, salt)
            user.passwordHash = passwordHash
        }
        const updateUser = await user.save()
        if (updateUser) {
            generateTokens(res, updateUser._id)
            res.status(200).json({
                _id: updateUser._id,
                name: updateUser.name,
                email: updateUser.email
            })
        }
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc  Delete user profile
// @route DELETE /api/users/:id
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
    // const user = await User.findById(req.user._id)

    // if (user) {
    //     await user.remove()
    // }
    res.status(200).json({ message: "User deleted" });
})

module.exports = { 
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    deleteUser
 }