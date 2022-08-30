// asyncHandler(express-async-handler) is a
// simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers.

const asyncHandler = require('express-async-handler');

const Goal = require('../models/goalModel');

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
    // get the goals for a specific user id, due to user id field in a goal
    const goals = await Goal.find({user: req.user.id});

    res.status(200).json(goals);
})

// @desc    Set goals
// @route   POST /api/goals
// @access  Private
const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400);
        // uses the new error handler
        throw new Error('Please add a text field');
    }
    //  Eatch goal has a text and the user id that created the goal
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id,
    })

    res.status(200).json(goal);
})

// @desc    Update goal
// @route   PUT /api/goals:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
        res.status(400);
        throw new Error("Goal not found");
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id,
        req.body, { new: true })
    res.status(200).json(updatedGoal);
})

// @desc    Delete goal
// @route   DELETE /api/goals:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal =  await Goal.findById(req.params.id);
    if (!goal) {
        res.status(400);
        throw new Error("Goal not found");
    }

    await Goal.remove();
    res.status(200).json({id: req.params.id});
})

module.exports = {
    getGoals, setGoal, updateGoal, deleteGoal
}