import React from 'react';
import styles from './Wishlist.module.scss';
import Title from '../common/Title/Title';
import ButtonForm from '../common/ButtonForm/ButtonForm';

const Wishlist = () => {
	return (
		<div className={styles.wishlist}>
			<Title title='Your Wishlist' />
			<table>
				<thead>
					<tr>
						<th></th>
						<th>PRODUCT NAME</th>
						<th>PRICE</th>
						<th>STOCK STATUS</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>x</td>
						<td>
							<img src='' alt='' />
							Ollie Earrings
						</td>
						<td>$18.00</td>
						<td>In Stock</td>
						<td>
							{' '}
							<ButtonForm title='ADD CART' />{' '}
						</td>
					</tr>
					<tr>
						<td>x</td>
						<td>Lira Earrings</td>
						<td>$28.00</td>
						<td>In Stock</td>
						<td>
							{' '}
							<ButtonForm title='ADD CART' />{' '}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default Wishlist;
