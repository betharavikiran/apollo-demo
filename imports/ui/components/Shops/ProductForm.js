import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const createProduct = gql`
    mutation createProduct($name: String!, $price: Float!,  $shopId: String!) {
        createProduct(name: $name, price: $price, shopId: $shopId) {
            _id
        }
    }
`;

class ProductForm extends Component {
    submitForm = () => {
        this.props
            .createProduct({
                variables: {
                    name: this.name.value,
                    price: this.price.value,
                    shopId: this.props.shopId
                }
            })
            .then(() => {
                this.name.value = "";
                this.price.value = 0;
            })
            .catch(error => {
                console.log(error);
            });
    };

    render() {
        return (
            <div>
                <input type="text" placeholder="product name" ref={input => (this.name = input)} />
                <input type="number" placeholder="product price" ref={input => (this.price = input)} />
                <button onClick={this.submitForm}>Submit</button>
            </div>
        );
    }
}

export default graphql(createProduct, {
    name: "createProduct",
    options: {
        refetchQueries: ["shops"]
    }
})(ProductForm);
