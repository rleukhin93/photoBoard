const mongoose = require('mongoose')
const photoSchema = mongoose.Schema({
    path: {
        type: String,
        trim: true,
    },
    board: {
        type: String,
        required: true
    },
    url: String,
    tags: [Object],
})
photoSchema.set('toJSON', { transform: function(doc, ret, options) 
    { 
        delete ret.path;
        // delete ret.url;
        return ret; 
    }
});
const Photo = mongoose.model('Photo', photoSchema)

module.exports = Photo;