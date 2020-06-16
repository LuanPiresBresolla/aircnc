const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    date: String,
    approved: Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId, // Faz uma "referencia" do usuário que quer contratar o Booking
        ref: 'User'
    },
    spot: {
        type: mongoose.Schema.Types.ObjectId, // Faz uma "referencia" do spot que o usuario quer
        ref: 'Spot'
    }
});

module.exports = mongoose.model('Booking', BookingSchema);