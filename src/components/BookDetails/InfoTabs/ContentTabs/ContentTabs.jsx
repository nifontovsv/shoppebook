import React, { useEffect, useState } from 'react';
import s from './ContentTabs.module.scss';
import StarRating from '../../../common/StarRating/StarRating';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ContentTabs = ({ activeTab, updateReviewsCount }) => {
	const [reviews, setReviews] = useState([]);
	const [newReview, setNewReview] = useState('');
	const [newUserName, setNewUserName] = useState('');
	const [rating, setRating] = useState(0);
	const { id } = useParams(); // получаем id книги из URL

	const formatDate = () => {
		const options = { day: 'numeric', month: 'long', year: 'numeric' };
		return new Date().toLocaleDateString('en-US', options);
	};

	// Загружаем отзывы при монтировании компонента
	useEffect(() => {
		const savedReviews = JSON.parse(localStorage.getItem(`reviews_${id}`)) || [];
		setReviews(savedReviews);
		updateReviewsCount(savedReviews.length); // Обновляем количество отзывов при загрузке
	}, [id, updateReviewsCount]);

	const addReview = (e) => {
		e.preventDefault();
		if (!newReview.trim() || rating === 0) return;

		const newReviewObj = {
			id: Date.now(),
			text: newReview,
			date: formatDate(),
			rating,
			name: newUserName,
		};
		const updatedReviews = [...reviews, newReviewObj];

		setReviews(updatedReviews);
		setNewReview('');
		setRating(0);

		// Сохраняем отзывы для конкретной книги в localStorage
		localStorage.setItem(`reviews_${id}`, JSON.stringify(updatedReviews));
		updateReviewsCount(updatedReviews.length); // Обновляем количество отзывов в родителе
	};

	const deleteReview = (reviewId) => {
		const updatedReviews = reviews.filter((review) => review.id !== reviewId);
		setReviews(updatedReviews);

		// Сохраняем обновлённый список отзывов для этой книги в localStorage
		localStorage.setItem(`reviews_${id}`, JSON.stringify(updatedReviews));
		updateReviewsCount(updatedReviews.length); // Обновляем количество отзывов в родителе
	};

	const { bookDetails } = useSelector((state) => state.booksList);

	if (!bookDetails?.volumeInfo) return <p>Книга не найдена</p>;
	const { volumeInfo } = bookDetails;
	const { description } = volumeInfo || {};

	return (
		<div className={s.tabsContent}>
			{activeTab === 'tab1' && (
				<p className={s.tabDescription}>
					{description.replace(/<\/?[a-zA-Z]+>/gi, '') ||
						'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, molestiae perferendis sapiente molestias dolores quae? Nostrum voluptates illum harum beatae voluptatum saepe explicabo rem, facilis ab, id culpa aspernatur ex.'}
				</p>
			)}
			{activeTab === 'tab2' && (
				<ul className={s.tabInfo}>
					<li className={s.tabInfoItem}>
						Weight:&nbsp;&nbsp;<span className={s.tabInfoValue}>0.3 kg</span>
					</li>
					<li className={s.tabInfoItem}>
						Dimentions:&nbsp;&nbsp;<span className={s.tabInfoValue}>15 x 10 x 1 cm</span>
					</li>
					<li className={s.tabInfoItem}>
						Colours:&nbsp;&nbsp;<span className={s.tabInfoValue}>Black, Browns, White</span>
					</li>
					<li className={s.tabInfoItem}>
						Material:&nbsp;&nbsp;<span className={s.tabInfoValue}>Metal</span>
					</li>
				</ul>
			)}
			{activeTab === 'tab3' && (
				<div className={s.blockReviews}>
					<div className={s.allReviews}>
						<h2 className={s.headerReviews}>
							{reviews.length} Reviews for {bookDetails?.volumeInfo?.title}
						</h2>
						{reviews.map((review) => (
							<div key={review.id} className={s.review}>
								<h3 className={s.headerReview}>
									{review.name}
									<span className={s.dateReview}>{review.date}</span>
								</h3>
								<StarRating rating={review.rating} readOnly />
								<p className={s.descriptionReview}>{review.text}</p>
								<button onClick={() => deleteReview(review.id)}>Delete review</button>
							</div>
						))}
					</div>
					<div className={s.addReviews}>
						<h2 className={s.titleAddReviews}>Add a Review</h2>
						<h3 className={s.subtitleAddReviews}>
							Your email address will not be published. Required fields are marked *
						</h3>
						<form onSubmit={addReview} className={s.addReviewsForm} action=''>
							<input
								type='text'
								value={newReview}
								onChange={(e) => setNewReview(e.target.value)}
								className={s.addReviewsFormInput}
								placeholder='Your Review*'
							/>
							<input
								value={newUserName}
								onChange={(e) => setNewUserName(e.target.value)}
								className={s.addReviewsFormInput}
								type='text'
								placeholder='Enter your name*'
							/>
							<input
								className={s.addReviewsFormInput}
								type='text'
								placeholder='Enter your Email*'
							/>
							<div className={s.addReviewsCheckbox}>
								<input className={s.addReviewsCheckboxInput} type='checkbox' />{' '}
								<span className={s.addReviewsCheckboxInfo}>
									Save my name, email, and website in this browser for the next time I comment
								</span>
							</div>
							<div className={s.addReviewsRating}>
								<p className={s.addReviewsRatingTitle}>Your Rating*</p>
								<StarRating rating={rating} onChange={setRating} />
							</div>
							<button className={s.addReviewsBtn}>Submit</button>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default ContentTabs;
