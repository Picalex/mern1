import React, {useContext} from 'react'
import {useHistory} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'
import {Nav,Navbar,NavDropdown, Form,FormControl,Button} from "react-bootstrap";

export const NavbarT = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)

  const logoutHandler = event => {
    event.preventDefault()
    auth.logout()
    history.push('/')
  }

  return (



          <Navbar collapseOnSelect bg="dark" expand="lg" variant='dark'  style={{ margin:'10px' }} >
              <Navbar.Brand href="#home">Сайт</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto" style={{ fontSize:'15pt'}}>
                      <Nav.Link href="#home" >Home</Nav.Link>
                      <Nav.Link href="/Testpage">Testpage</Nav.Link>
                      <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                          <NavDropdown.Item href="/RoleDash">Роли</NavDropdown.Item>
                          <NavDropdown.Item href="/UserDash">Пользователи</NavDropdown.Item>
                          <NavDropdown.Item href="/Table">Таблица</NavDropdown.Item>

                      </NavDropdown>
                  </Nav>
                  <Form inline>
                      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                      <Button variant="outline-success"  className='mr-2' >Search</Button>
                  </Form>
              </Navbar.Collapse>
              <Nav>
                  <Button  variant='warning' className='mr-2' >поиск</Button>
              </Nav>
              <Nav>
                  <Button  variant='primary' className='mr-2' onClick={logoutHandler}>Выйти</Button>
              </Nav>
          </Navbar>





  )
}
