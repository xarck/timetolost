const mongoose = require('mongoose')
const Schema = mongoose.Schema

const contentSchema = new Schema({
    contents: {
        type: Object
    }
})

module.exports = Content = mongoose.model('content',contentSchema)