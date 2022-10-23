const mongoose = require('mongoose')

const timeElapsed = Date.now();
const today = new Date(timeElapsed);
const day = today.toDateString().split(" ")[0];

const timerSchema = new mongoose.Schema({
    noOfHoursStudied: {
        type: Number,
        required: true
    },
    day: {
        type: String,
        default: day
    },
    user_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('Timer', timerSchema)