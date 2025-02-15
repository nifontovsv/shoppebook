import React, { useEffect, useState } from 'react';

import styles from './ShopBooksGrid.module.scss';

import { useMediaQuery } from '@mui/material';
import FilterMobile from './FilterMobile/FilterMobile';
import ShoppingBooks from './ShoppingBooks/ShoppingBooks';

function ShopBooksGrid() {
	const [filterMobile, setFilterMobile] = useState(false);
	const isMobile = useMediaQuery('(max-width:768px)');
	const noMobile = useMediaQuery('(min-width:769px)');

	useEffect(() => {
		if (noMobile) {
			setFilterMobile(false);
		}
	}, [noMobile]);
	return (
		<div className={styles.gridContainer}>
			{isMobile ? (
				<div className={styles.filterMobile}>
					<a
						className={styles.filterMobileLink}
						onClick={(e) => {
							setFilterMobile(!filterMobile);
							e.preventDefault();
						}}
						href=''>
						Filter
					</a>
				</div>
			) : (
				<FilterMobile />
			)}
			{filterMobile && <FilterMobile />}

			<div>
				<ShoppingBooks />
			</div>
		</div>
	);
}

export default ShopBooksGrid;
