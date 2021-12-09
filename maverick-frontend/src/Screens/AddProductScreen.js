import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect } from 'react-router';

export class AddProductScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                category: "",
                state: "",
                price: "",
                brand: "",
                reviews: "",
                name: "",
                _id: ""
            },
            loading : false,
            start : true
        };

    }
    handleInp = (event) => {
        let id = event.target.id
        let form = this.state.form
        form[id] = event.target.value;
        this.setState({form : form , start : false})
      }

      uploadToS3 = async (AWS) => {

        var files = document.getElementById('file').files;
        var s3 = new AWS.S3();

        if (files) 
        {
          var file = files[0];
          var fileName = file.name;
          var filePath = 'images/' + fileName;
          var fileUrl = 'https://maverickstore.s3.amazonaws.com/images/' + fileName
          await s3.upload({
             Bucket: 'maverickstore',
             Key: filePath,
             Body: file,
             ContentType : 'image/jpeg',
             ACL: 'public-read'
             }, function (err, data) {
                if (err) {
                    console.log(err)
                }
            })
        }
        return fileUrl;
      }
      
      addproduct = async (e) => {
        e.preventDefault();
        var AWS = require("aws-sdk");
        let awsConfig = {
            "region": "us-east-1",
            "accessKeyId": "AKIA4RW42NZLJPIGWUHA", "secretAccessKey": "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"
        };
        AWS.config.update(awsConfig);
        let s3Path = await this.uploadToS3(AWS)
        let docClient = new AWS.DynamoDB.DocumentClient();
        var input = {
            "_id": Math.random().toFixed(16).split(".")[1],
            "numReviews": this.state.form.reviews, 
            "brand": this.state.form.brand,
            "image": s3Path, 
            "rating": 4.5,
            "category": this.state.form.category,
            "price": this.state.form.price, 
            "name": this.state.form.name,
            "state": this.state.form.state
        };
        var params = {
            TableName: "products",
            Item: input
        };
        await this.setState({loading : true})
        docClient.put(params, function (err, data) {

            if (err) {
                console.log("products::save::error - " + JSON.stringify(err, null, 2));
            } else {
                console.log("products::save::success");
                window.location.href = "/addproductsuccess"
            }
        });
        await this.setState({loading : false , start : true})
      }
      
    render() {
        return (
            <div>
                <>
                    <div>Product Category such as hoodies/t shirt</div>
                    <Form.Control type="text" id="category" placeholder="Prouduct Category" value={this.state.form.category} onChange={this.handleInp} />
                    <br />
                    <div>Product state like "InStock"/ "OutOfStock"</div>
                    <Form.Control type="text" id="state" placeholder="Prouduct State" value={this.state.form.state} onChange={this.handleInp} />
                    <br />
                    <div>Product Name</div>
                    <Form.Control type="text" id="name" placeholder="Prouduct name" value={this.state.form.name} onChange={this.handleInp} />
                    <br />
                    <div>Choose file from local device</div>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Control type="file" id="file"/>
                    </Form.Group>
                    <div>Enter Product price in CND</div>
                    <Form.Control type="text" id="price" placeholder="Prouduct Price" value={this.state.form.price} onChange={this.handleInp} />
                    <br />
                    <div>Enter Product brand such as Dalhouise, Saint Maryy etc..</div>
                    <Form.Control type="text" id="brand" placeholder="Prouduct Brand" value={this.state.form.brand} onChange={this.handleInp}/>
                    <br />
                    <div>Enter Product reviews count</div>
                    <Form.Control type="text" id= "reviews" placeholder="Prouduct Reviews in number" value={this.state.form.reviews} onChange={this.handleInp} />
                    <br />
                    <Button variant="primary" onClick={this.addproduct}>Add Product</Button>{' '}
                </>
            </div>
        )
    }
}

export default AddProductScreen
