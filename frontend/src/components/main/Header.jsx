import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Badge, Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../../slices/userApi';
import { resetCart } from '../../slices/cart';
import { logout } from '../../slices/auth';
import logo from '../../assets/logo.png';
import { toast } from 'react-toastify';
import SearchBox from './SearchBox';
import { ProductsCarousel } from '../homePage';

import { useLocationContext } from '../../contexts/';

const Header = () => {
  // Component base states
  const { orderItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get home and category pages to truck carousel appearance;
  const { isHomePage, categories } = useLocationContext();

  // Logout API action
  const [logoutApiCall] = useLogoutMutation();

  // Logout handler
  const logoutHandler = async () => {
    const { error, data } = await logoutApiCall();

    if (error)
      return toast.error(
        error?.data?.message || error.message || 'Logout error'
      );

    dispatch(logout());
    dispatch(resetCart());
    toast.success(error?.data?.message || 'Logout successful');
    navigate('/login');
  };
  return (
    <header
      className={`${
        isHomePage || categories
          ? 'header-gradient padding-b m-md-3 rounded-4'
          : 'header-gradient m-md-3 rounded-4'
      }`}
    >
      <Container className='py-3'>
        <Navbar
          bg={'dark'}
          className='px-3 py-1  rounded-5'
          variant='dark'
          expand='lg'
          collapseOnSelect
        >
          <LinkContainer to='/'>
            <Navbar.Brand>
              <img src={logo} />
              ProShop
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />

          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <SearchBox />

              <LinkContainer to='/cart'>
                <Nav.Link>
                  <FaShoppingCart /> Cart
                  {orderItems.length > 0 && (
                    <Badge pill bg='success' style={{ marginLeft: '5px' }}>
                      {orderItems.reduce((a, i) => a + i.qty, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id='username'>
                    <NavDropdown.Item as={Link} to='/profile'>
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <Nav.Link as={Link} to='/login'>
                  <FaUser /> Sign In
                </Nav.Link>
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>

      {(isHomePage || categories) && <ProductsCarousel />}
    </header>
  );
};

export default Header;
