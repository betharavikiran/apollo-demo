import Shops from './shops';
import Products from '../products/products';

export default {
  Query: {
    shops(obj, args, { userId }) {
      return Shops.find({
      }).fetch();
    },
  },

  Shop: {
    products: shop =>
      Products.find({
        //shopId: shop._id,
      }).fetch(),

    completed: (shop) => {
      const products = Products.find({
        shopId: shop._id,
      }).fetch();
      if (products.length === 0) return false;
      const completedProducts = products.filter(product => product.completed);
      return products.length === completedProducts.length;
    },
  },

  Mutation: {
    createShop(obj, {
      name, telephone, website, startTime, endTime,
    }, { userId }) {
      const shopId = Shops.insert({
        name,
        telephone,
        website,
        startTime,
        endTime,
      });
      return Shops.findOne(shopId);
    },
  },
};
