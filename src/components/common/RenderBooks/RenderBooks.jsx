import React from 'react';
import styles from './RenderBooks.module.scss';
import photo from '../../../img/book1.png';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../../store/reducers/cartReducer';
import Grid from '@mui/material/Grid2';
import MyFavorites from '../MyFavorites/MyFavorites';
import AddInCart from '../../common/AddInCart/AddInCart';

const RenderBooks = ({ books }) => {
	const { loading, error } = useSelector((state) => state.booksList);

	// Если идет загрузка
	if (loading) {
		return <p>Загрузка...</p>;
	}

	// Если ошибка
	if (error) {
		return <p>Ошибка загрузки: {error}</p>;
	}
	function shortenTitle(title, maxLength) {
		if (title.length > maxLength) {
			return title.slice(0, maxLength) + '...';
		}
		return title;
	} // функция чтобы укоротить слишком длинный заголовок книги
	return (
		<Grid container spacing={3} justifyContent='center' className={styles.listPopularBooks}>
			{books.length > 0 ? (
				books.map((book) => (
					<Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
						<div className={styles.popularBook}>
							<div className={styles.backgroundImageBook}>
								{book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail ? (
									<img
										className={styles.imageBook}
										src={book.volumeInfo.imageLinks.thumbnail}
										alt={book.volumeInfo.title || 'Без названия'}
									/>
								) : (
									<img className={styles.imageBook} src={photo} alt='Изображение книги' />
								)}
								{book.saleInfo.listPrice ? (
									<AddInCart book={book} addInCartShop />
								) : (
									<p className={styles.sold}>Sold out</p>
								)}
								<Link to={`/book/${book.id}`} className={styles.seeDetails}>
									See details
								</Link>
								<MyFavorites book={book} styleFavorite />
							</div>

							<h2 className={styles.titleBook} title={book.volumeInfo.title}>
								{shortenTitle(book.volumeInfo.title || 'Без названия', 20)}
							</h2>
							<p className={styles.authorBook}>
								{book.volumeInfo.authors?.join(', ').slice(0, 30) || 'Неизвестные авторы'}
							</p>
							<p className={styles.priceBook}>
								{book.saleInfo?.listPrice?.amount
									? `${Math.round(book.saleInfo.listPrice.amount)} $`
									: 'Распродано'}
							</p>
						</div>
					</Grid>
				))
			) : (
				<Grid item xs={12}>
					<p>Нет доступных книг.</p>
				</Grid>
			)}
		</Grid>
	);
};

export default RenderBooks;
