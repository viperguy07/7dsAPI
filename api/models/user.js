const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nickName: String,
    eDate: Date,
    status: String,
    gTag: String,
    lWeek: Number,
    cWeek: Number,
    lTotal: Number
});

module.exports = mongoose.model('User', userSchema);