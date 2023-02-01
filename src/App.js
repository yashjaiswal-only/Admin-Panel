import Sidebar from "./components/Sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import './app.css'
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/NewUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function App() {
  // const user=JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).currentUser; //get loggedin user (currentUser) from user redux
  const currentUser=useSelector(state=>state.user?state.user.currentUser:null);
  const admin=currentUser?currentUser.isAdmin:null;
 
  return (
    <Router>
      <>
          {!currentUser && <Login />}

          {currentUser &&
          <div className="App">
          <Topbar/>
            <div className="container">
              <Sidebar/> 
                <Routes>
                    <Route path='/' element={<Home  />} />
                    <Route path='/users' element={<UserList/>} />
                    <Route path='/newUser' element={<NewUser/>} />
                    <Route path='/user/:userId' element={<User/>} />
                    <Route path='/products' element={<ProductList/>} />
                    <Route path='/product/:productId' element={<Product/>} />
                    <Route path='/newProduct' element={<NewProduct/>} />
                </Routes>
            </div>
          </div>}
      </>
    </Router>
  );
}

export default App;
