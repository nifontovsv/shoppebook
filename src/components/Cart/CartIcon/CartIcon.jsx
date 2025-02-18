import React from 'react';
import styles from './CartIcon.module.scss';

const CartIcon = ({ quantity }) => {
	return <>{quantity > 0 && <span className={styles.cartIcon}>{quantity}</span>}</>;
};

export default CartIcon;
