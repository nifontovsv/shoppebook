import React from 'react';
import styles from './LinkAllProducts.module.scss';
import { Link } from 'react-router-dom';

function LinkAllProducts() {
	return (
		<div className={styles.allProducts}>
			<Link to={'/shop'} className={styles.linkAllProducts}>
				View all products{' '}
				<svg
					width='14'
					height='8'
					viewBox='0 0 14 8'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'>
					<path
						d='M10.0662 0L9.24158 0.856675L11.7499 3.40467H0V4.59533H11.7499L9.24217 7.14392L10.0662 8L14 4L10.0662 0Z'
						fill='#9a9a9a'
					/>
				</svg>
			</Link>
		</div>
	);
}

export default LinkAllProducts;
