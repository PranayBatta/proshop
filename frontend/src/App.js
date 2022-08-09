import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Home from './screens/Home';
import ProductView from './screens/ProductView'
import Cart from './screens/Cart'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from './screens/Login';
import Signup from './screens/Signup';
import Checkout from './screens/Checkout';
import Payment from './screens/Payment';
import PlaceOrder from './screens/PlaceOrder';
import Order from './screens/Order';
import Orders from './screens/Orders';
import Users from './screens/Users';
import CreateUser from './screens/CreateUser';
import EditUser from './screens/EditUser';
import ProductList from './screens/Admin/ProductList';
import EditProduct from './screens/Admin/EditProduct';
import NewProduct from './screens/Admin/NewProduct';
import AdminOrder from './screens/Admin/AdminOrders';
import SearchResults from './screens/SearchResults';

function App() {
  return (
    <>
    <Router>
      <Header/>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/product/:id' element={<ProductView/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/signup' element={<Signup/>}/>
        <Route exact path='/cart' element={<Cart/>}/>
        <Route exact path='/checkout' element={<Checkout/>}/>
        <Route exact path='/payment' element={<Payment/>}/>
        <Route exact path='/placeOrder' element={<PlaceOrder/>}/>
        <Route exact path='/order/:id' element={<Order/>}/>
        <Route exact path='/orders' element={<Orders/>}/>
        <Route exact path='/users' element={<Users/>}/>
        <Route exact path='/createUser' element={<CreateUser/>}/>
        <Route exact path='/editUser/:id' element={<EditUser/>}/>
        <Route exact path='/products' element={<ProductList/>}/>
        <Route exact path='/editProduct/:id' element={<EditProduct/>}/>
        <Route exact path='/createProduct' element={<NewProduct/>}/>
        <Route exact path='/admin/orders' element={<AdminOrder/>}/>
        <Route exact path='/search/item=:item' element={<SearchResults/>}/>
      </Routes>
      
    </Router>
    </>
  );
}

export default App;
