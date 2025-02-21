import React, { useState } from 'react';
import s from './BookDetails.module.scss';
import OneBookDetails from './OneBookDetails/OneBookDetails';
import InfoTabs from './InfoTabs/InfoTabs';
import SliderBookDetails from './SliderBookDetails/SliderBookDetails';

export default function BookDetails() {
	const [reviewsCount, setReviewsCount] = useState(0);

	const updateTwoReviewsCount = (count) => {
		setReviewsCount(count); // Обновляем количество отзывов
	};

	return (
		<>
			<div className={s.bookDetailsContainer}>
				<SliderBookDetails />
				<OneBookDetails reviewsCount={reviewsCount} />
			</div>
			<InfoTabs updateTwoReviewsCount={updateTwoReviewsCount} />
		</>
	);
}
