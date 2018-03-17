import Products from './products';

export default {
  Mutation: {
    createProduct(obj, { name, price, shopId }) {
      const productId = Products.insert({
        name,
        price,
        shopId,
        completed: false,
      });
      return Products.findOne(productId);
    },
    toggleProduct(obj, { _id }) {
      const product = Products.findOne(_id);
      Products.update(_id, {
        $set: {
          completed: !product.completed,
        },
      });
      return Products.findOne(_id);
    },
  },
};
