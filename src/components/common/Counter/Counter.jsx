import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrementCount, incrementCount } from '../../../store/reducers/cartReducer';

export default function ({ id }) {
	const item = useSelector((state) => state.cart.items[id]); // Получаем текущий товар из Redux
	const dispatch = useDispatch();

	const handleDecrementCount = () => {
		dispatch(decrementCount({ id }));
	};

	const handleIncrementCount = () => {
		dispatch(incrementCount({ id }));
	};

	if (!item) return null; // Если товара нет, не рендерим ничего

	return (
		<div>
			<button onClick={handleDecrementCount} disabled={item.quantity === 0}>
				-
			</button>
			<span>{item.quantity}</span>
			<button onClick={handleIncrementCount}>+</button>
		</div>
	);
}
