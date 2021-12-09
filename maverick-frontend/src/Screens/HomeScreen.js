import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'

export class HomeScreen extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      data: []
    };
  }
  componentWillMount = async () => {
    var AWS = require("aws-sdk");
    let awsConfig = {
      "region": "us-east-1",
      "endpoint": "http://dynamodb.us-east-1.amazonaws.com",
      "accessKeyId": "AKIA4RW42NZLJPIGWUHA", "secretAccessKey": "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"
    };
    AWS.config.update(awsConfig);

    let docClient = new AWS.DynamoDB.DocumentClient();
    var params = {
      TableName: "products",
    };
    docClient.scan(params, async (err, data) => {
      if (err) {
        console.log("products::fetchOneByKey::error - " + JSON.stringify(err, null, 2));
      }
      else {
        console.log("products::fetchOneByKey::success - " + JSON.stringify(data, null, 2))
        await this.setState({data:data.Items})
      }
    })
  }
  render() {
    return (
      <div>
        <ul className="products">
          {
            this.state.data.length == 0 ? "" :
            this.state.data.map(product => {
              return <li>
                <div className="product">
                  <Link to={{pathname : '/product/' + product._id , state: {products: this.state.data}}}>
                    <img className="product-image" src={product.image} alt="product" />
                  </Link>
                  <div className="product-name">
                  <Link to={{pathname : '/product/' + product._id , state: {products: this.state.data}}}>{product.name}</Link>
                  </div>
                  <div className="product-brand">{product.brand}</div>
                  <div className="product-price">{product.price}</div>
                  <div className="product-rating">{product.rating} Stars({product.numReviews} reviews)</div>
                </div>
              </li>
            }

            )}

        </ul>

      </div>

    )
  }
}

export default HomeScreen
