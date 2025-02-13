import React, { useState } from 'react';
import styles from './Burger.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { openMenuBurger } from '../../../store/reducers/cartReducer';

const Burger = () => {
	const { isOpenMenuBurger } = useSelector((state) => state.cart);
	const dispatch = useDispatch();
	const handleOpenMenuBurger = () => {
		dispatch(openMenuBurger());
	};
	return (
		<>
			<div className={styles.burger}>
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
		</>
	);
};

export default Burger;
