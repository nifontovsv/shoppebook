import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart, removeItem } from '../../store/reducers/cartReducer';
import Counter from '../common/Counter/Counter';

const Cart = () => {
	const items = useSelector((state) => state.cart.items);
	const cart = useSelector((state) => state.cart);
	const dispatch = useDispatch();

	const handleRemove = (id) => {
		dispatch(removeItem(id));
	};

	const handleClearCart = () => {
		dispatch(clearCart());
	};

	return (
		<div>
			<h2>Корзина</h2>
			{Object.entries(items).map(([id, item]) => (
				<div key={id}>
					<h3>{item.name}</h3>
					<p>Цена: {item ? item.price * item.quantity : 0} ₽</p>

					<Counter item={item} id={id} />

					<button onClick={() => handleRemove(id)}>Удалить</button>
				</div>
			))}
			<p>Общая стоимость: {cart.totalPrice} ₽</p>
			<button onClick={handleClearCart}>Clear Cart</button>
		</div>
	);
};

export default Cart;
