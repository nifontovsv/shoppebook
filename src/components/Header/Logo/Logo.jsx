import React from 'react';
import styles from './Logo.module.scss';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { closeMenuBurger } from '../../../store/reducers/cartReducer';

export default function Logo({ fontSize }) {
	const dispatch = useDispatch();
	return (
		<Link to='/' onClick={() => dispatch(closeMenuBurger())} className={styles.linkLogo}>
			<p style={{ fontSize: `${fontSize}` }} className={styles.logo}>
				{' '}
				<span className={styles.first}>shoppe</span> <span className={styles.second}>book</span>
			</p>
		</Link>
	);
}
