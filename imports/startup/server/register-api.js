import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';
import merge from 'lodash/merge';

import ProductsSchema from '../../api/products/Product.graphql';
import ProductsResolvers from '../../api/products/resolvers';
import ShopsSchema from '../../api/shops/Shops.graphql';
import ShopsResolvers from '../../api/shops/resolvers';

//xxx

const typeDefs = [ProductsSchema, ShopsSchema];

const resolvers = merge(ProductsResolvers, ShopsResolvers);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

createApolloServer({ schema });
