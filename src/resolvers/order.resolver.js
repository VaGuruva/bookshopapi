const Order = require("../models/order");

module.exports = {
  orders: () => Order.find(),

  order: (_, { refNumber }) => Order.findById(refNumber),

  createOrder: async (root, args, context, info) => {
    const order = new Order(args);
    await order.save();
    return order;
  },

  updateOrder: async (parent, args, context) => {
    const result = await Order.updateOne({ _id: args._id }, args);
    return result.n;
  },

  deleteOrder: async (parent, args, context) => {
    const result = await Order.deleteOne({ _id: args._id }, args);
    return result.n;
  },
};
