import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

class Product extends Component {
    toggleProduct = () => {
        this.props.toggleProduct({
            variables: {
                id: this.props.goal._id
            }
        });
    };
    render() {
        const { product } = this.props;
        return (
            <li>
                <input
                    type="checkbox"
                    onChange={this.toggleProduct}
                    checked={product.completed}
                />
                <span
                    style={{
                        textDecoration: product.completed ? "line-through" : "none"
                    }}
                >
                    <div>{product.name} : {product.price}</div>

        </span>
            </li>
        );
    }
}

const toggleProduct = gql`
    mutation toggleProduct($id: String!) {
        toggleProduct(_id: $id) {
            _id
        }
    }
`;

export default graphql(toggleProduct, {
    name: "toggleProduct",
    options: {
        refetchQueries: ["Shops"]
    }
})(Product);
