const mongoose = require('mongoose')
const boardSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
})

const Board = mongoose.model('Board', boardSchema)

module.exports = Board;