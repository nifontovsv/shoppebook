import React from 'react';
import { useSelector } from 'react-redux';

import styles from './PopularBooks.module.scss';
import CatalogPopularBooks from './CatalogPopularBooks/CatalogPopularBooks';
import LinkAllProducts from './LinkAllProducts/LinkAllProducts';

const PopularBooks = () => {
	const { loading = false, error = null } = useSelector((state) => state.booksList) || {};
	if (loading) return <p>Загрузка...</p>;
	if (error) return <p>Ошибка: {error}</p>;

	return (
		<div className={styles.catalogBooksBlock}>
			<div className={styles.titleBlock}>
				<span className={styles.line}></span>
				<h1 className={styles.title}>Popular Books</h1>
				<span className={styles.line}></span>
			</div>

			{loading && <p>Загрузка...</p>}
			{error && <p>{error}</p>}
			<CatalogPopularBooks />
			<LinkAllProducts />
		</div>
	);
};

export default PopularBooks;
