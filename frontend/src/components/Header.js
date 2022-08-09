import React from "react";
import { Nav, Navbar, Container,Button,Dropdown } from "react-bootstrap";
import { Link} from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux';
import { actions } from '../store'
import {useNavigate} from 'react-router-dom'
import SearchBox from "./SearchBox";

function Header() {
  const {userInfo}=useSelector(state=>state.user)
  const dispatch=useDispatch();
  const navigate=useNavigate()

  const logouthandler=()=>{
    const logout=()=>{dispatch(actions.UserLogout())}
        logout()
        navigate('/')
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>

      {userInfo.token?<Navbar.Brand>{userInfo.username}</Navbar.Brand>:<Navbar.Brand><Link to='/' style={{color:'white',textDecoration:'none'}}>My Shop</Link></Navbar.Brand>}
        <SearchBox/>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          {userInfo.token?<Button className="mx-3"><Link to='/' style={{color:'white',textDecoration:'none'}}>Home</Link></Button>:''}
          <Button className="mx-3"><Link to='cart/' style={{color:'white',textDecoration:'none'}}>Cart</Link></Button>
          {userInfo.token?<Button className="mx-3"><Link to='orders/' style={{color:'white',textDecoration:'none'}}>Orders</Link></Button>:''}
          {!userInfo.token?<Button className="mx-3"><Link to='signup/' style={{color:'white',textDecoration:'none'}}>Sign Up</Link></Button>:''}
            {userInfo.token?<Button onClick={logouthandler} className="mx-3">Logout</Button>:<Button className="mx-3"><Link to='login/' style={{color:'white', textDecoration:'none'}}>Login</Link></Button>}
          </Nav>
        </Navbar.Collapse>
        {userInfo.token?userInfo.is_superuser?<Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
              Admin
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item> <Link to='/users'>Users</Link> </Dropdown.Item>
              <Dropdown.Item> <Link to='/products'>Products</Link></Dropdown.Item>
              <Dropdown.Item> <Link to='/admin/orders'>Orders</Link></Dropdown.Item>
              <Dropdown.Item></Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>:'':''}
        
      </Container>
    </Navbar>
  );
}

export default Header;
