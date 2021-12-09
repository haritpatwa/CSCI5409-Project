
import './App.css';
import './index.css'
import { BrowserRouter , Route,Link } from 'react-router-dom';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import SignInScreen from './Screens/SignInScreen';
import AddProductScreen from './Screens/AddProductScreen';
import BuyNowScreen from './Screens/BuyNowScreen';
import OrderSuccessfullScreen from './Screens/OrderSuccessfullScreen';
import AddProductSuccess from './Screens/AddProductSuccess';

function App() {
  const openMenu=()=>
{
  document.querySelector('.sidebar').classList.add('open');
  }
  const closeMenu=()=>
  {
    document.querySelector('.sidebar').classList.remove('open');
  }
  
  return (
    <BrowserRouter>
    <div className="grid-container">
      <header className="header">
        <div className="brand">
          <button onClick={openMenu}>
            &#9776;
          </button>
          <Link to="/" > MaverickStore</Link>
        </div>
        <div className="headers-links">
          <a href="cart.html">Cart  </a>
          <a href="signin">Admin Sign In  </a>
        </div>
      </header>
      <aside className="sidebar">
        <h3 className="shopping-list-header">Shopping Categories  <button className="sidebar-close-button" onClick={closeMenu}>x</button></h3>

        <ul className="categories-list">
          <li>
            <a href="index.html">Hoodies</a>
          </li> <li>
            <a href="index.html">T-shirts</a>
          </li>
        </ul>
      </aside>
      <main className="main">
        <div className="content">
          
   
     
        <Route path="/"   exact={true} component={HomeScreen} />
        <Route path="/product/:id" component = {ProductScreen} /> 
        <Route path="/signin" component ={SignInScreen} />
        <Route path="/addproduct" component ={AddProductScreen} />
        <Route path="/buynowpage" component ={BuyNowScreen} />
        <Route path="/ordersuccess" component ={OrderSuccessfullScreen} />
        <Route path="/addproductsuccess" component ={AddProductSuccess} />
    
      
        </div>
      </main>
      <footer className="footer">
        All rights reserved.
      </footer>
    </div>
    </BrowserRouter>
       
   
    );
}

export default App;
