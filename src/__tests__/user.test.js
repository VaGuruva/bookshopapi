const mongoose = require('mongoose');
const User = require('../models/user');
const config = require('../config');
const generateString = require('../services/randomCharGen');

const userData = { 
  name: generateString(5), 
  email: `${generateString(5)}@mail.com`, 
  password: generateString(5), 
};

describe('Testing User Model', () => {
    beforeAll(async () => {
        await mongoose.connect(config.mongoTestURI, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
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