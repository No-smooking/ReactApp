import React from 'react';
import ReactDOM from 'react-dom/client';
  import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './Home';
// import ListBlog from './Components/Blog/ListBlog';
import Detail from './Components/Blog/Detail';
import Index from './Components/Blog/Index';
import Comment from './Components/Blog/Comment';
import Register from './Components/Member/Register';
import Login from './Components/Member/Login';
import Rate from './Components/Blog/Rate';
import Account from './Components/Account/Account';
import AddProduct from './Components/Product/Add_Product';
import My_Product from './Components/Product/My_Product';
import Edit_Product from './Components/Product/Edit_Product';
import Cart from './Components/Cart/Cart';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App>
        <Routes>
          <Route index path='/' element={<Home/>}/>
          <Route path='/Blog' element={<Index/>}/>
          <Route path='/blog/detail/:id' element={<Detail/>}/>
          <Route path='/blog/Comment/:id' element={<Comment/>}/> 
          <Route path='/blog/rate/:id' element={<Rate/>} />
          <Route path='/account/update' element={<Account/>} />
          <Route path='/account/add_product' element={<AddProduct/>} />
          <Route path='/account/my_product' element={<My_Product/>} />
          <Route path='/account/edit_product/:id' element= {<Edit_Product/>} />
          <Route path='/Login' element={<Login/>}/>
          <Route path='/Register' element={<Register/>}/>
          <Route path='/product/cart' element={<Cart/>} />
          {/* <Route path='/Comment' element={<Comment/>} /> */}
        </Routes>
      </App>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
