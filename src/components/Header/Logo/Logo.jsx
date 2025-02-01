import React from 'react';
import styles from './Logo.module.scss';
import { Link } from 'react-router-dom';

export default function Logo() {
	return (
		<Link to='/' className={styles.linkLogo}>
			<p className={styles.logo}>
				{' '}
				<span className={styles.first}>shoppe</span> <span className={styles.second}>book</span>
			</p>
		</Link>
	);
}
