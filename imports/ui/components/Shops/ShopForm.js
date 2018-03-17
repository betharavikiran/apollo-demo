import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const createShop = gql`
    mutation createShop($name: String!, $telephone: String!, $website: String!,$startTime: String!,$endTime: String!) {
        createShop(name: $name, telephone:$telephone, website:$website, startTime:$startTime,endTime:$endTime) {
            _id
        }
    }
`;

class ShopForm extends Component {
    submitForm = () => {
        this.props
            .createShop({
                variables: {
                    name: this.name.value,
                    telephone: this.telephone.value,
                    website: this.website.value,
                    startTime: this.startTime.value,
                    endTime: this.endTime.value,
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    render() {
        return (
            <div>
                <input type="text" placeholder="shop name" ref={input => (this.name = input)} />
                <input type="tel"  placeholder="telephone" ref={input => (this.telephone = input)}/>
                <input type="url"  placeholder="website" ref={input => (this.website = input)}/>
                <input id="starttime" type="time" ref={input => (this.startTime = input)}/>
                <input id="endtime" placeholder="shop name" type="time" ref={input => (this.endTime = input)}/>
                <button onClick={this.submitForm}>Submit</button>
            </div>
        );
    }
}

export default graphql(createShop, {
    name: "createShop",
    options: {
        refetchQueries: ["Shops"]
    }
})(ShopForm);
