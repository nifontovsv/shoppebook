import React, { useState } from 'react';
import styles from './Burger.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { openMenuBurger, openSidebar } from '../../../store/reducers/cartReducer';
import CartIcon from '../../Cart/CartIcon/CartIcon';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link } from 'react-router-dom';

const Burger = () => {
	const { totalQuantity } = useSelector((state) => state.cart);
	const { favorites } = useSelector((state) => state.booksList);
	const { isOpenMenuBurger } = useSelector((state) => state.cart);
	const dispatch = useDispatch();
	const handleOpenMenuBurger = () => {
		dispatch(openMenuBurger());
	};
	const handleOpenSidebar = () => {
		dispatch(openSidebar());
	};
	return (
		<>
			<div className={styles.burger}>
				<div onClick={handleOpenSidebar} className={styles.headerIcon}>
					<svg
						width='21'
						height='21'
						viewBox='0 0 21 21'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'>
						<path
							d='M6.76598 13.5763H6.76694C6.76774 13.5763 6.76854 13.5762 6.76934 13.5762H17.9238C18.1984 13.5762 18.4399 13.394 18.5153 13.13L20.9763 4.51669C21.0293 4.33099 20.9921 4.13136 20.876 3.97723C20.7597 3.8231 20.5778 3.73242 20.3848 3.73242H5.34709L4.90729 1.75326C4.84465 1.47176 4.59503 1.27148 4.30664 1.27148H0.615234C0.275413 1.27148 0 1.5469 0 1.88672C0 2.22654 0.275413 2.50195 0.615234 2.50195H3.81317C3.89104 2.85267 5.91779 11.9732 6.03442 12.4979C5.38058 12.7821 4.92187 13.4341 4.92187 14.1914C4.92187 15.2091 5.74988 16.0371 6.76758 16.0371H17.9238C18.2636 16.0371 18.5391 15.7617 18.5391 15.4219C18.5391 15.0821 18.2636 14.8066 17.9238 14.8066H6.76758C6.4284 14.8066 6.15234 14.5306 6.15234 14.1914C6.15234 13.8527 6.42744 13.5771 6.76598 13.5763ZM19.5691 4.96289L17.4597 12.3457H7.26105L5.62042 4.96289H19.5691Z'
							fill='black'
						/>
						<path
							d='M6.15234 17.8828C6.15234 18.9005 6.98035 19.7285 7.99805 19.7285C9.01575 19.7285 9.84375 18.9005 9.84375 17.8828C9.84375 16.8651 9.01575 16.0371 7.99805 16.0371C6.98035 16.0371 6.15234 16.8651 6.15234 17.8828ZM7.99805 17.2676C8.33723 17.2676 8.61328 17.5436 8.61328 17.8828C8.61328 18.222 8.33723 18.498 7.99805 18.498C7.65887 18.498 7.38281 18.222 7.38281 17.8828C7.38281 17.5436 7.65887 17.2676 7.99805 17.2676Z'
							fill='black'
						/>
						<path
							d='M14.8477 17.8828C14.8477 18.9005 15.6757 19.7285 16.6934 19.7285C17.7111 19.7285 18.5391 18.9005 18.5391 17.8828C18.5391 16.8651 17.7111 16.0371 16.6934 16.0371C15.6757 16.0371 14.8477 16.8651 14.8477 17.8828ZM16.6934 17.2676C17.0325 17.2676 17.3086 17.5436 17.3086 17.8828C17.3086 18.222 17.0325 18.498 16.6934 18.498C16.3542 18.498 16.0781 18.222 16.0781 17.8828C16.0781 17.5436 16.3542 17.2676 16.6934 17.2676Z'
							fill='black'
						/>
					</svg>
					<CartIcon quantity={totalQuantity} />
				</div>
				<Link to='/wishlist' style={{ position: 'relative', marginLeft: '10px' }}>
					<FavoriteBorderIcon sx={{ color: '#000' }} />
					<CartIcon quantity={favorites.length} />
				</Link>
				<div>
					<svg
						onClick={handleOpenMenuBurger}
						className={`${styles.ham} ${styles.ham4} ${styles.hamRotate} ${
							isOpenMenuBurger ? styles.active : ''
						} `}
						viewBox='0 0 100 100'
						width='40'>
						<path
							className={`${styles.line} ${styles.top} ${isOpenMenuBurger ? styles.active : ''}`}
							d='m 70,33 h -40 c 0,0 -8.5,-0.149796 -8.5,8.5 0,8.649796 8.5,8.5 8.5,8.5 h 20 v -20'
						/>
						<path className={`${styles.line} ${styles.middle}`} d='m 70,50 h -40' />
						<path
							className={`${styles.line} ${styles.bottom} ${isOpenMenuBurger ? styles.active : ''}`}
							d='m 30,67 h 40 c 0,0 8.5,0.149796 8.5,-8.5 0,-8.649796 -8.5,-8.5 -8.5,-8.5 h -20 v 20'
						/>
					</svg>
				</div>
			</div>
		</>
	);
};

export default Burger;
