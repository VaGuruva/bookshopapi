const mongoose = require('mongoose');
const Author = require('../models/author');
const config = require('../config');
const generateString = require('../services/randomCharGen');

const authorData = { 
    name: generateString(5), 
    surname: generateString(5), 
    books: ['6057afeca55d403390cb39bc']
};


describe('Testing Author Model', () => {
    beforeAll(async () => {
        await mongoose.connect(config.mongoTestURI, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    it('create & save author successfully', async () => {
        const validAuthor = new Author(authorData);
        const savedAuthor = await validAuthor.save();
        expect(savedAuthor._id).toBeDefined();
        expect(savedAuthor.name).toBe(authorData.name);
        expect(savedAuthor.surname).toBe(authorData.surname);
        expect(savedAuthor.books).toBeDefined();
    });

    it('create author with field not defined in schema', async () => {
        const authorWithInvalidField = new Author({ 
            name: generateString(5), 
            surname: generateString(5), 
            books: ['6057afeca55d403390cb39bc'],
            dob: new Date()
        });
        const savedAuthorWithInvalidField = await authorWithInvalidField.save();
        expect(savedAuthorWithInvalidField._id).toBeDefined();
        expect(savedAuthorWithInvalidField.dob).toBeUndefined();
    });

    it('create author without required field should fail', async () => {
        const authorWithoutRequiredField = new Author({ 
            surname: generateString(5), 
            books: ['6057afeca55d403390cb39bc']
        });
        let err;
        try {
            const savedAuthorWithoutRequiredField = await authorWithoutRequiredField.save();
            error = savedAuthorWithoutRequiredField;
        } catch (error) {
            err = error
        }
        expect(err).toBeDefined();
    }); 
});