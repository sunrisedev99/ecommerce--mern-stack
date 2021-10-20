import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { logoutUser } from '../actions/userActions';
import { Route } from 'react-router-dom';
import SearchBox from './SearchBox';

const Header = () => {
	const dispatch = useDispatch();
	const userLogin = useSelector((state) => state.userLogin);
	const cart = useSelector((state) => state.cart);
	const { userInfo } = userLogin;
	const { cartItems } = cart;

	const [show1, setShow1] = useState(false);
	const [show2, setShow2] = useState(false);
	const [count, setCount] = useState(0);

	useEffect(() => {
		setCount(cartItems.reduce((acc, item) => acc + item.qty, 0));
	}, [cartItems]);

	const handleDropdown2 = (e) => {
		if (show2) {
			setShow2(false);
		} else {
			setShow2(true);
			setShow1(false);
		}
	};

	const handleDropdown1 = (e) => {
		if (show1) {
			setShow1(false);
		} else {
			setShow1(true);
			setShow2(false);
		}
	};

	const handleLogout = () => {
		dispatch(logoutUser());
		window.location.href = '/';
	};

	return (
		<header>
			<section
				style={{
					display: show1 || show2 ? 'block' : 'none',
					minWidth: '100%',
					height: '100%',
					// background: 'red',
					zIndex: '100',
					position: 'absolute',
				}}
				onClick={() => {
					setShow1(false);
					setShow2(false);
				}}
			/>

			<Navbar bg='primary' variant='dark' expand='lg' collapseOnSelect>
				<Container>
					<LinkContainer to='/'>
						<Navbar.Brand>
							<img
								src='/images/kosells.png'
								className='nav-logo'
								alt='logo'
							/>
							KOSELLS
						</Navbar.Brand>
					</LinkContainer>

					<Navbar.Toggle
						className='navbar-toggle-btn'
						aria-controls='basic-navbar-nav'
					/>

					<Navbar.Collapse id='basic-navbar-nav'>
						<Route
							render={({ history }) => (
								<div className='d-none d-md-block'>
									<SearchBox history={history} />
								</div>
							)}
						/>

						<Nav className='ms-auto'>
							<LinkContainer to='/cart'>
								<Nav.Link>
									{count ? (
										<div className='nav-cart-size'>
											<span
												style={
													count > 10
														? { fontSize: '0.6em' }
														: { fontSize: '0.7em' }
												}>
												{count}
											</span>
										</div>
									) : (
										''
									)}
									<i
										style={{ fontSize: '1.2em' }}
										className='fas fa-shopping-cart'
									/>{' '}
									Cart
								</Nav.Link>
							</LinkContainer>
							{userInfo && userInfo.isAdmin && (
								<NavDropdown
									title='Admin'
									id='adminMenu'
									show={show2}
									onClick={handleDropdown2}>
									<LinkContainer to='/admin/userlist'>
										<NavDropdown.Item>
											Users
										</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to='/admin/productlist'>
										<NavDropdown.Item>
											Products
										</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to='/admin/orderlist'>
										<NavDropdown.Item>
											Orders
										</NavDropdown.Item>
									</LinkContainer>
								</NavDropdown>
							)}
							{userInfo ? (
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										marginLeft: '0.8em',
									}}>
									<img
										src={userInfo.avatar}
										className='nav-avatar'
										alt={userInfo.name}
									/>
									<NavDropdown
										title={userInfo.name}
										id={userInfo.id}
										show={show1}
										onClick={handleDropdown1}>
										<LinkContainer to='/profile'>
											<NavDropdown.Item>
												Profile
											</NavDropdown.Item>
										</LinkContainer>
										<NavDropdown.Item
											onClick={handleLogout}>
											Logout
										</NavDropdown.Item>
									</NavDropdown>
								</div>
							) : (
								<LinkContainer to='/login' variant='primary'>
									<Nav.Link>
										<i
											style={{ fontSize: '1.2em' }}
											className='fas fa-user'
										/>{' '}
										Sign In
									</Nav.Link>
								</LinkContainer>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
