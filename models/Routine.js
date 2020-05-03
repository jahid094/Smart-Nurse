const mongoose = require('mongoose')
const validator = require('validator')

const routineSchema = new mongoose.Schema({
    routineItem: {
        type: String,
        required: true,
        trim: true
    },
    itemName: {
        type: String,
        required: true,
        trim: true
    },
    unit: {
        type: Number,
        trim: true
    },
    startDate: {
        type: String,
        required: true,
        trim: true
    },
    endDate: {
        type: String,
        required: true,
        trim: true
    },
    timesPerDay: {
        type: Number,
        required: true,
        trim: true
    },
    beforeAfterMeal: {
        type: String,
        trim: true
    },
    times: [{
        time: {
            type: String,
            required: true 
        }
    }],
    notification: {
        type: String ,
        required: true,
        trim: true
    },
    notificationFor: {
        type: String ,
        required: true,
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId ,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Routine = mongoose.model('Routine', routineSchema)

module.exports = Routine