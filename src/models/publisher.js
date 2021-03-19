const mongoose = require('mongoose');
const PublisherSchema = require('../schemas/PublisherSchema');

const Publisher = mongoose.model('Publisher', PublisherSchema);

module.exports = Publisher;