import React from 'react';
import SearchBar from './SearchBar/SearchBar';
import styles from './ShopBooksGrid.module.scss';
import ShoppingBooks from './ShoppingBooks/ShoppingBooks';

function ShopBooksGrid() {
	return (
		<div className={styles.gridContainer}>
			<div>
				<SearchBar />
			</div>

			<div>
				<ShoppingBooks />
			</div>
		</div>
	);
}

export default ShopBooksGrid;
