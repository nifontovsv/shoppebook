import React from 'react';
import styles from './CartItem.module.scss';
import { decrementCount, incrementCount, removeItem } from '../../../store/reducers/cartReducer';
import { useDispatch } from 'react-redux';

const CartItem = ({ item, id }) => {
	const dispatch = useDispatch();

	const handleDecrementCount = () => {
		dispatch(decrementCount({ id }));
	};

	const handleIncrementCount = () => {
		dispatch(incrementCount({ id }));
	};

	const handleRemove = () => {
		dispatch(removeItem(id));
	};

	return (
		<div className={styles.cartItem}>
			<img width={80} src={item.image} alt='img_01' />
			<div className={styles.cartItemInfo}>
				<div className={styles.cartItemMainInfo}>
					<h3 className={styles.cartItemTitle}>{item.title}</h3>
					<p className={styles.cartItemSubTitle}>{item.author}</p>
					<p className={styles.cartItemPrice}>{item ? item.price * item.quantity : 0} $</p>
				</div>
				<div className={styles.cartItemTotalQuantity}>
					<span className={styles.cartItemTotalQuantityTitle}>QTY:</span>
					<button
						className={styles.cartItemTotalQuantityBtnMinusPlus}
						onClick={handleDecrementCount}>
						-
					</button>
					<span className={styles.cartItemTotalQuantityCount}>{item.quantity}</span>
					<button
						className={styles.cartItemTotalQuantityBtnMinusPlus}
						onClick={handleIncrementCount}>
						+
					</button>
				</div>
			</div>
			<button className={styles.cartItemBtn} onClick={handleRemove}>
				<svg width='8' height='8' viewBox='0 0 8 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
					<path d='M1 1.09172L6.90828 7M1 6.90828L6.90828 1' stroke='black' stroke-width='1.5' />
				</svg>
			</button>
		</div>
	);
};

export default CartItem;
