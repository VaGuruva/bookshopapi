const mongoose = require('mongoose');
const Publisher = require('../models/publisher');
const config = require('../config');
const generateString = require('../services/randomCharGen');
const ObjectID = require('mongodb').ObjectID;

const publisherData = { 
    name: generateString(5), 
    books: [new ObjectID()]
};

describe('Testing Publisher Model', () => {
    beforeAll(async () => {
        await mongoose.connect(config.mongoTestURI, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    it('create & save publisher successfully', async () => {
        const validPublisher = new Publisher(publisherData);
        const savedPublisher = await validPublisher.save();
        expect(savedPublisher._id).toBeDefined();
        expect(savedPublisher.name).toBe(publisherData.name);
        expect(savedPublisher.books).toBeDefined();
    });

    it('create publisher with field not defined in schema', async () => {
        const publisherWithInvalidField = new Publisher({ 
            name: generateString(5), 
            address: generateString(5), 
            books: [new ObjectID()]
        });
        const savedPublisherWithInvalidField = await publisherWithInvalidField.save();
        expect(savedPublisherWithInvalidField._id).toBeDefined();
        expect(savedPublisherWithInvalidField.address).toBeUndefined();
    });

    it('create publisher without required field should fail', async () => {
        const publisherWithoutRequiredField = new Publisher({ 
            books: [new ObjectID()]
        });
        let err;
        try {
            const savedPublisherWithoutRequiredField = await publisherWithoutRequiredField.save();
            error = savedPublisherWithoutRequiredField;
        } catch (error) {
            err = error
        }
        expect(err).toBeDefined();
    }); 
});