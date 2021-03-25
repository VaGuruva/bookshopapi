const mongoose = require('mongoose');
const Book = require('../models/book');
const config = require('../config');
const generateString = require('../services/randomCharGen');

const bookData = { 
    title: generateString(5), 
    isbn: generateString(5), 
    publisher: '605700a3af37d527309e98b0', 
    price: "0",
    authors: ['6057afeca55d403990cb39bc']
};

describe('Testing Book Model', () => {
    beforeAll(async () => {
        await mongoose.connect(config.mongoTestURI, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    it('create & save book successfully', async () => {
        const validBook = new Book(bookData);
        const savedBook = await validBook.save();
        expect(savedBook._id).toBeDefined();
        expect(savedBook.isbn).toBe(bookData.isbn);
        expect(savedBook.price).toBe(bookData.price);
        expect(savedBook.authors).toBeDefined();
    });

    it('create book with field not defined in schema', async () => {
        const bookWithInvalidField = new Book({ 
            title: generateString(5), 
            isbn: generateString(5), 
            publisher: '605700a3af37d527309e99b0', 
            price: "0",
            authors: ['6057afeca55d403990cb39bc'],
            edition: '4th'
        });
        const savedBookWithInvalidField = await bookWithInvalidField.save();
        expect(savedBookWithInvalidField._id).toBeDefined();
        expect(savedBookWithInvalidField.edition).toBeUndefined();
    });

    it('create book without required field should fail', async () => {
        const bookWithoutRequiredField = new Book({ 
            publisher: '605700a3af37d527309e99b0', 
            price: "0",
            authors: ['6057afeca55d403990cb39bc']
        });
        let err;
        try {
            const savedBookWithoutRequiredField = await bookWithoutRequiredField.save();
            error = savedBookWithoutRequiredField;
        } catch (error) {
            err = error
        }
        expect(err).toBeDefined();
    });  
});