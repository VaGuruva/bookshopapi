const mongoose = require('mongoose');
const User = require('../models/user');
const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const generateString = (length) => {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

const userData = { 
  name: generateString(5), 
  email: `${generateString(5)}@mail.com`, 
  password: generateString(5), 
};

describe('Testing User Model', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb+srv://booksApiadmin:iF11BebhbUfj004u@cluster0-nvxln.mongodb.net/book_order_tests?retryWrites=true&w=majority', { useNewUrlParser: true, useCreateIndex: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    it('create & save user successfully', async () => {
        const validUser = new User(userData);
        const savedUser = await validUser.save();
        expect(savedUser._id).toBeDefined();
        expect(savedUser.name).toBe(userData.name);
        expect(savedUser.email).toBe(userData.email);
        expect(savedUser.password).toBe(userData.password);
        expect(savedUser.token).toBe(userData.token);
    });

    it('create user with field not defined in schema', async () => {
        const userWithInvalidField = new User({ name: generateString(5), email: `${generateString(5)}@mail.com`,password: generateString(5), nickname: generateString(5) });
        const savedUserWithInvalidField = await userWithInvalidField.save();
        expect(savedUserWithInvalidField._id).toBeDefined();
        expect(savedUserWithInvalidField.nickkname).toBeUndefined();
    });

    it('create user without required field should fail', async () => {
        const userWithoutRequiredField = new User({ name: generateString(5) });
        let err;
        try {
            const savedUserWithoutRequiredField = await userWithoutRequiredField.save();
            error = savedUserWithoutRequiredField;
        } catch (error) {
            err = error
        }
        expect(err).toBeDefined();
    });  
});