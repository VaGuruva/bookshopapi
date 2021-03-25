const mongoose = require('mongoose');
const Book = require('../models/book');
const config = require('../config');
const generateString = require('../services/randomCharGen');
const ObjectID = require('mongodb').ObjectID;

const bookData = { 
    title: generateString(30), 
    isbn: generateString(30), 
    publisher: new ObjectID(), 
    price: "0",
    authors: [new ObjectID()]
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
            title: generateString(30), 
            isbn: generateString(30), 
            publisher: new ObjectID(), 
            price: "0",
            authors: [new ObjectID()],
            edition: '4th'
        });
        const savedBookWithInvalidField = await bookWithInvalidField.save();
        expect(savedBookWithInvalidField._id).toBeDefined();
        expect(savedBookWithInvalidField.edition).toBeUndefined();
    });

    it('create book without required field should fail', async () => {
        const bookWithoutRequiredField = new Book({ 
            publisher: new ObjectID(), 
            price: "0",
            authors: [new ObjectID()]
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

    it('get books list', async () => {
        const books = await Book.find();
        expect(books).toBeDefined();
    }); 
});
