const mongoose = require('mongoose');
const Order = require('../models/order');
const config = require('../config');
const generateString = require('../services/randomCharGen');
const ObjectID = require('mongodb').ObjectID;

const orderData = { 
    number: generateString(5), 
    quantity: generateString(5), 
    book: new ObjectID(), 
    total: "0",
    user: [new ObjectID()]
};

describe('Testing Order Model', () => {
    beforeAll(async () => {
        await mongoose.connect(config.mongoTestURI, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    it('create & save order successfully', async () => {
        const validOrder = new Order(orderData);
        const savedOrder = await validOrder.save();
        expect(savedOrder._id).toBeDefined();
        expect(savedOrder.number).toBe(orderData.number);
        expect(savedOrder.quantity).toBe(orderData.quantity);
        expect(savedOrder.book).toBeDefined();
        expect(savedOrder.total).toBe(orderData.total);
        expect(savedOrder.user).toBeDefined();
    });

    it('create order with field not defined in schema', async () => {
        const orderWithInvalidField = new Order({ 
            number: generateString(5), 
            quantity: generateString(5), 
            book: new ObjectID(), 
            total: "0",
            user: [new ObjectID()],
            date: new Date()
        });
        const savedOrderWithInvalidField = await orderWithInvalidField.save();
        expect(savedOrderWithInvalidField._id).toBeDefined();
        expect(savedOrderWithInvalidField.date).toBeUndefined();
    });
});