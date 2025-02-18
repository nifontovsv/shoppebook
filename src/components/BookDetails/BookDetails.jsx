import React, { useState } from 'react';
import s from './BookDetails.module.scss';
import OneBookDetails from './OneBookDetails/OneBookDetails';
import InfoTabs from './InfoTabs/InfoTabs';
import { useSelector } from 'react-redux';
import imageBook from '../../img/book1.png';

export default function BookDetails() {
	const { bookDetails, loading } = useSelector((state) => state.booksList);
	const [reviewsCount, setReviewsCount] = useState(0);

	const updateTwoReviewsCount = (count) => {
		setReviewsCount(count); // Обновляем количество отзывов
	};

	// Получаем изображения из bookDetails, если они есть
	const images = bookDetails?.volumeInfo?.imageLinks?.thumbnail
		? [bookDetails.volumeInfo.imageLinks.thumbnail]
		: [imageBook];

	// Если данные ещё загружаются, отображаем сообщение "Loading..."
	// if (loading) {
	// 	return <div>Loading...</div>;
	// }

	// Если данных нет, показываем сообщение "Нет данных"
	// if (!bookDetails?.volumeInfo) {
	// 	return <div>No data available</div>;
	// }

	return (
		<>
			<div className={s.bookDetailsContainer}>
				<div className={s.imageContainer}>
					{images.map((src, index) => (
						<img src={src} alt={`Main ${index}`} className={s.image} loading='lazy' />
					))}
				</div>
				<OneBookDetails reviewsCount={reviewsCount} />
			</div>
			<InfoTabs updateTwoReviewsCount={updateTwoReviewsCount} />
		</>
	);
}
