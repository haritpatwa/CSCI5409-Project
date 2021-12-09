import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

export class AddProductSuccess extends Component {
    static propTypes = {

    }

    render() {
        return (
            <div>
                  <h1> Congratulations! Product has been added</h1>
                <div className="back-to-result">
                <Link to="/signin">Back to admin page</Link>
                </div>
            </div>
        )
    }
}

export default AddProductSuccess
