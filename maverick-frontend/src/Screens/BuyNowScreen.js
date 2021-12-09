import React, { Component } from 'react'
import { Button,Form, FloatingLabel } from 'react-bootstrap';
import {Link } from'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types'

export class BuyNowScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                name: "",
                studentid: "",
                mode: "",
                address: "",
                day: ""
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
      
      buyproduct = async (e) => {
        e.preventDefault();
       
        var AWS = require("aws-sdk");
        let awsConfig = {
            "region": "us-east-1",
            "endpoint": "http://dynamodb.us-east-1.amazonaws.com",
            "accessKeyId": "AKIA4RW42NZLJPIGWUHA", "secretAccessKey": "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"
        };
        AWS.config.update(awsConfig);
        
        let docClient = new AWS.DynamoDB.DocumentClient();
        var input = {
            "_id": Math.random().toFixed(16).split(".")[1],
            "name": this.state.form.name, 
            "studentid": this.state.form.studentid,
            "mode": this.state.form.mode, 
            "address": this.state.form.address,
            "day": this.state.form.day
        };
        var params = {
            TableName: "orders",
            Item: input
        };
        await this.setState({loading : true})
        docClient.put(params, function (err, data) {

            if (err) {
                console.log("order::save::error - " + JSON.stringify(err, null, 2));
            } else {
                console.log("order::save::success");
                window.location.href = "/ordersuccess"
            }
        });
        await this.setState({loading : false , start : true})
      }

    render() {
        return (
            <div>
                <>
                    <div>Enter Your full Name</div>
                    <Form.Control type="text" placeholder="Full Name" id="name" value={this.state.form.name} onChange={this.handleInp}/>
                    <br />
                    <div>Enter Student ID</div>
                    <Form.Control type="text" placeholder="Starting with B00" id="studentid" value={this.state.form.studentid} onChange={this.handleInp} />
                    <br />
                    <div>Enter Pickup day</div>
                    <select id="day" value={this.state.form.day} onChange={this.handleInp}>
                        <option value ="Monday">Monday</option>
                        <option value = "Wednesday">Wednesday</option>
                        <option value = "Friday">Friday</option>
                        <option value = "Sunday">Sunday</option>
                    </select>
                    <br />
                    <div>Enter Your full Address</div>
                    <FloatingLabel controlId="floatingTextarea2" label="Address">
                        <Form.Control
                            as="textarea"
                            placeholder="Please Enter your full address here"
                            id="address" value={this.state.form.address} onChange={this.handleInp}
                            style={{ height: '100px' }}
                        />
                    </FloatingLabel>
                    <br />
                    <div>Enter Payment mode</div>
                    <select id="mode" value={this.state.form.mode} onChange={this.handleInp}>
                        <option>Cash</option>
                        <option>Credit Card</option>
                        <option>Cheque</option>
                    </select>
                   
                    <br />
                    <Link to="/ordersuccess">
                    <Button variant="primary" to="/ordersuccess" onClick={this.buyproduct}>Place Order</Button>{' '}
                    </Link>

                </>

            </div>
        )
    }
}

export default BuyNowScreen
