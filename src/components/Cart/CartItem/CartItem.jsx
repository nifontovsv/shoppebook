import React from 'react';
import styles from './CartItem.module.scss';
import { decrementCount, incrementCount, removeItem } from '../../../store/reducers/cartReducer';
import { useDispatch } from 'react-redux';
import ClearIcon from '@mui/icons-material/Clear';

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
			<img width={80} height={120} src={item.image} alt='img_01' />
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
				<ClearIcon />
			</button>
		</div>
	);
};

export default CartItem;
