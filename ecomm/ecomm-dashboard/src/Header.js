import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
function Header() {
  let user=JSON.parse(localStorage.getItem('user-info'))
  const navigate = useNavigate();
  function logOut(){

    localStorage.clear();
    navigate("/login"); 
  }
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Ecommarce Project</Navbar.Brand>
          <Nav className="me-auto navbar_wrapper">
            {
              //"user-info"
              localStorage.getItem("user-info") ? 
              (
                <>
                 <Link to="/search">Search Product</Link>
                 <Link to="/">Product List</Link>
                  <Link to="/add">Add Product</Link>
                  <Link to="/update">Update Product</Link>
                </>
              ) : 
              (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>
                </>
              )
            }
          </Nav>
          if(localStorage.getItem('user-info'))?
          (
            <Nav>
            <NavDropdown title={user && user.name}>
<NavDropdown.Item onClick={logOut}>
  Logout
</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          ):null
          
        </Container>
      </Navbar>
    </>
  );
}
export default Header;
