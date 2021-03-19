const mongoose = require('mongoose');
const BookSchema = require('../schemas/OrderSchema');

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;