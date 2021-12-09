import React, { Component } from 'react'
import Amplify from 'aws-amplify';

import awsconfig from '../aws-exports';
import HomeScreen from './HomeScreen';
import { Link } from 'react-router-dom';
import {AmplifySignOut,withAuthenticator} from '@aws-amplify/ui-react'
Amplify.configure(awsconfig)


export class SignInScreen extends Component {
    render() {
        return (
            <div>
                <Link to="/addproduct">Add Product</Link>
                <AmplifySignOut />
            
            </div>
        )
    }
}

export default withAuthenticator (SignInScreen);
