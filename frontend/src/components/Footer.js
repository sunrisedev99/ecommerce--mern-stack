import React from 'react';
import { Container } from 'react-bootstrap';
// import { Link } from 'react-router-dom';

const Footer = () => {
	return (
		<Container>
			<footer className='footer-container'>
				<div className='footer-icons'>
					<a
						href='https://github.com/Rajatm544'
						target='_blank'
						rel='noopener noreferrer'>
						<i className='fab fa-github footer-icon'></i>
					</a>
					<a
						href='https://www.linkedin.com/in/rajat--m'
						target='_blank'
						rel='noopener noreferrer'>
						<i className='fab fa-linkedin-in footer-icon'></i>
					</a>
					<a
						href='https://twitter.com/Rajat__m'
						target='_blank'
						rel='noopener noreferrer'>
						<i className='fab fa-twitter footer-icon'></i>
					</a>
					<a
						href='https://rajatm.netlify.app/'
						target='_blank'
						rel='noopener noreferrer'>
						<i className='fas fa-globe-asia footer-icon'></i>
					</a>
				</div>
				<div className='footer-copyright'>&copy;2021 Kosells</div>
			</footer>
		</Container>
	);
};

export default Footer;
