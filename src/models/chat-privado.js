const mongoose = require('mongoose')
const { Schema } = mongoose

const ChatSchema = new Schema({
    idM: String,
    nick: String,
    msg: String,
    created: { type: Date, default: Date.now}
})

module.exports = mongoose.model('chatPrivado', ChatSchema)