import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

export class OrderSuccessfullScreen extends Component {
    static propTypes = {

    }

    render() {
        return (
            <div>
                <h1> Congratulations! Order has been placed</h1>
                <div className="back-to-result">
                <Link to="/">Back to Home</Link>
            </div >
            </div>
        )
    }
}

export default OrderSuccessfullScreen
