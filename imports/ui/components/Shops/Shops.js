import React from 'react';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';
import ShopForm from './ShopForm';
import ProductForm from './ProductForm';
import Product from './Product';


import './shops.scss';

const Shops = ({
  loading, shops, client, user,
}) => {
  if (loading) return null;
  return (
    <div>
      <ShopForm />
      <ul>
        {shops.map(shop => (
          <li key={shop._id}>
            <span
              style={{
                    textDecoration: shop.completed ? 'line-through' : 'none',
                }}
            >
              <div className="shop">
                <h3> {shop.name}</h3>
                <h4>{shop.telephone} </h4>
                <h4>{shop.website} </h4>
                <h4>{shop.startTime} </h4>
                <h4>{shop.endTime} </h4>
              </div>
            </span>
            <ul>
              {shop.products.map(product => (
                <Product product={product} key={product._id} />
                        ))}
            </ul>
            <ProductForm shopId={shop._id} />
          </li>
            ))}
      </ul>
    </div>
  );
};

const shopsQuery = gql`
    query Shops {
        shops {
            _id
            name
            telephone
            website
            startTime
            endTime
            completed
            products {
                _id
                name
                completed
            }
        }
    }
`;

export default graphql(shopsQuery, {
  props: ({ data }) => ({ ...data }),
})(withApollo(Shops));


/* <ul>
    {shops.map(shop => (
        <li key={shop._id}>
            <span
                style={{
                    textDecoration: shop.completed ? 'line-through' : 'none',
                }}
            >
              {shop.name}
            </span>
            <ul>
                {shop.products.map(product => (
                    <Product goal={product} key={product._id} />
                ))}
            </ul>
            <ProductForm shopId={shop._id} />
        </li>
    ))}
</ul> */
