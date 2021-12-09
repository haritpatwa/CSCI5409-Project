import React from 'react'
import Data from '../Data';
import '../index.css';
import { Link } from 'react-router-dom';


function ProductScreen(props) {

    const product = props.location.state.products.find(x => x._id === props.match.params.id);
    return (
        <div >
            <div className="back-to-result">
                <Link to="/">Back to result</Link>
            </div >
            <div className="details">
                <div className="details-image">
                    <img src={product.image} alt="product"></img>
                </div>
            </div>
            <div className="details-info">
                <ul>
                    <li>
                        <h4>{product.name}</h4>
                    </li>
                    <li>
                        {product.rating}Stars ({product.numReviews} Reviews)
                    </li>
                    <li>
                      Price: <b>${product.price}</b>
                    </li>
                    <li>
                        Description:
                        <div>
                            {product.category}
                        </div>
                    </li>
                </ul>
            </div>

            <div className="details-action">
                <ul>
                    <li>
                        Price: {product.price}
                    </li>
                    <li>
                        Status: {product.state}
                    </li>
                    <li>
                        Qty: <select>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </select>
                    </li>
                    <li>
                        <Link to="/buynowpage">
                        <button className="button" >Buy Now</button>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default ProductScreen
