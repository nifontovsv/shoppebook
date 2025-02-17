import React, { useState } from 'react';
import s from './BookDetails.module.scss';
import SliderBookDetails from './SliderBookDetails/SliderBookDetails';
import OneBookDetails from './OneBookDetails/OneBookDetails';
import InfoTabs from './InfoTabs/InfoTabs';

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
