import React, { useEffect } from 'react';
import styles from './Sidebar.module.scss';
import { useSelector } from 'react-redux';
import Cart from '../Cart';
import Blur from '../Blur/Blur';

export default function () {
	const isSidebarOpen = useSelector((state) => state.cart.isSidebarOpen);

	useEffect(() => {
		if (isSidebarOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	}, [isSidebarOpen]);

	return (
		<>
			{isSidebarOpen && <Blur />}
			<div className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}>
				<Cart />
			</div>
		</>
	);
}
