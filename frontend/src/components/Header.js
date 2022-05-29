import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import {useDispatch, useSelector} from 'react-redux'
import {LinkContainer} from "react-router-bootstrap";
import { logout } from '../actions/userActions';

function Header() {

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  const dispatch = useDispatch()
  const logoutHandler = () => {
    dispatch(logout())
  }
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>PotroStore</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/cart">
                <Nav.Link><i className="fas fa-shopping-cart"></i>Carrito</Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown title={userInfo.username} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Perfil</NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>

                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link><i className="fas fa-user"></i>Login</Nav.Link>
                </LinkContainer>
              )}
             
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='admin'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Usuarios</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Productos</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Pedidos</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>

              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
