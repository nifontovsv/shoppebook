import React, { useEffect, useState } from 'react';
import Counter from '../../common/Counter/Counter';
import s from './OneBookDetails.module.scss';
import BlockMedia from '../../common/BlockMedia/BlockMedia';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearBookDetails, fetchDetailsBooks } from '../../../store/reducers/booksListReducer';

const OneBookDetails = () => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const { bookDetails, error, loading } = useSelector((state) => state.booksList); // books?

	useEffect(() => {
		dispatch(clearBookDetails());
		dispatch(fetchDetailsBooks({ id }));
		return () => {
			dispatch(clearBookDetails());
		};
	}, [dispatch, id]);

	if (loading) return <p>Загрузка...</p>;
	if (error) return <p>Ошибка: {error}</p>;
	if (!bookDetails?.volumeInfo) return <p>Книга не найдена</p>; // Проверяем bookDetails перед деструктуризацией обязательно!

	const { volumeInfo, saleInfo } = bookDetails;
	const { title, description, authors, categories, publishedDate } = volumeInfo || {};
	const { listPrice } = saleInfo || {};

	function shortenTitle(title, maxLength) {
		if (title.length > maxLength) {
			return title.slice(0, maxLength) + '...';
		}
		return title;
	} // функция чтобы укоротить слишком длинный заголовок книги
	return (
		<div className={s.oneBookDetails}>
			<h1 className={s.bookHeader}>{title}</h1>

			<p>Written By: {authors}</p>
			<p>
				Book published on:
				{publishedDate}
			</p>
			<span className={s.bookPrice}>
				{listPrice ? `${listPrice.amount} ${listPrice.currencyCode}` : 'Распродано'}
			</span>
			<div className={s.bookRaiting}>
				<div className={s.bookRaitingStars}>
					<svg
						width='18'
						height='18'
						viewBox='0 0 18 18'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'>
						<g clipPath='url(#clip0_888_1330)'>
							<path
								d='M17.9529 6.90409C17.8344 6.53961 17.5111 6.28156 17.1302 6.24709L11.9341 5.77536L9.88059 0.967661C9.72898 0.614445 9.384 0.386475 9.00002 0.386475C8.61605 0.386475 8.27093 0.614445 8.12028 0.967661L6.06676 5.77536L0.869868 6.24709C0.488911 6.28225 0.166319 6.54029 0.0471156 6.90409C-0.0714014 7.26856 0.0380517 7.66833 0.326173 7.92102L4.25399 11.3652L3.09587 16.4659C3.01114 16.841 3.15671 17.2288 3.4679 17.4537C3.63517 17.5753 3.83169 17.636 4.0289 17.636C4.19837 17.636 4.36797 17.5909 4.51945 17.5003L9.00002 14.8212L13.4798 17.5003C13.8084 17.6967 14.2216 17.6787 14.5321 17.4537C14.8433 17.2288 14.9889 16.841 14.9042 16.4659L13.7461 11.3652L17.6739 7.92102C17.9619 7.66833 18.0714 7.26939 17.9529 6.90409Z'
								fill='black'
							/>
						</g>
						<defs>
							<clipPath id='clip0_888_1330'>
								<rect width='18' height='18' fill='white' />
							</clipPath>
						</defs>
					</svg>
					<svg
						width='18'
						height='18'
						viewBox='0 0 18 18'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'>
						<g clipPath='url(#clip0_888_1330)'>
							<path
								d='M17.9529 6.90409C17.8344 6.53961 17.5111 6.28156 17.1302 6.24709L11.9341 5.77536L9.88059 0.967661C9.72898 0.614445 9.384 0.386475 9.00002 0.386475C8.61605 0.386475 8.27093 0.614445 8.12028 0.967661L6.06676 5.77536L0.869868 6.24709C0.488911 6.28225 0.166319 6.54029 0.0471156 6.90409C-0.0714014 7.26856 0.0380517 7.66833 0.326173 7.92102L4.25399 11.3652L3.09587 16.4659C3.01114 16.841 3.15671 17.2288 3.4679 17.4537C3.63517 17.5753 3.83169 17.636 4.0289 17.636C4.19837 17.636 4.36797 17.5909 4.51945 17.5003L9.00002 14.8212L13.4798 17.5003C13.8084 17.6967 14.2216 17.6787 14.5321 17.4537C14.8433 17.2288 14.9889 16.841 14.9042 16.4659L13.7461 11.3652L17.6739 7.92102C17.9619 7.66833 18.0714 7.26939 17.9529 6.90409Z'
								fill='black'
							/>
						</g>
						<defs>
							<clipPath id='clip0_888_1330'>
								<rect width='18' height='18' fill='white' />
							</clipPath>
						</defs>
					</svg>
					<svg
						width='18'
						height='18'
						viewBox='0 0 18 18'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'>
						<g clipPath='url(#clip0_888_1330)'>
							<path
								d='M17.9529 6.90409C17.8344 6.53961 17.5111 6.28156 17.1302 6.24709L11.9341 5.77536L9.88059 0.967661C9.72898 0.614445 9.384 0.386475 9.00002 0.386475C8.61605 0.386475 8.27093 0.614445 8.12028 0.967661L6.06676 5.77536L0.869868 6.24709C0.488911 6.28225 0.166319 6.54029 0.0471156 6.90409C-0.0714014 7.26856 0.0380517 7.66833 0.326173 7.92102L4.25399 11.3652L3.09587 16.4659C3.01114 16.841 3.15671 17.2288 3.4679 17.4537C3.63517 17.5753 3.83169 17.636 4.0289 17.636C4.19837 17.636 4.36797 17.5909 4.51945 17.5003L9.00002 14.8212L13.4798 17.5003C13.8084 17.6967 14.2216 17.6787 14.5321 17.4537C14.8433 17.2288 14.9889 16.841 14.9042 16.4659L13.7461 11.3652L17.6739 7.92102C17.9619 7.66833 18.0714 7.26939 17.9529 6.90409Z'
								fill='black'
							/>
						</g>
						<defs>
							<clipPath id='clip0_888_1330'>
								<rect width='18' height='18' fill='white' />
							</clipPath>
						</defs>
					</svg>
					<svg
						width='18'
						height='18'
						viewBox='0 0 18 18'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'>
						<g clipPath='url(#clip0_888_1330)'>
							<path
								d='M17.9529 6.90409C17.8344 6.53961 17.5111 6.28156 17.1302 6.24709L11.9341 5.77536L9.88059 0.967661C9.72898 0.614445 9.384 0.386475 9.00002 0.386475C8.61605 0.386475 8.27093 0.614445 8.12028 0.967661L6.06676 5.77536L0.869868 6.24709C0.488911 6.28225 0.166319 6.54029 0.0471156 6.90409C-0.0714014 7.26856 0.0380517 7.66833 0.326173 7.92102L4.25399 11.3652L3.09587 16.4659C3.01114 16.841 3.15671 17.2288 3.4679 17.4537C3.63517 17.5753 3.83169 17.636 4.0289 17.636C4.19837 17.636 4.36797 17.5909 4.51945 17.5003L9.00002 14.8212L13.4798 17.5003C13.8084 17.6967 14.2216 17.6787 14.5321 17.4537C14.8433 17.2288 14.9889 16.841 14.9042 16.4659L13.7461 11.3652L17.6739 7.92102C17.9619 7.66833 18.0714 7.26939 17.9529 6.90409Z'
								fill='black'
							/>
						</g>
						<defs>
							<clipPath id='clip0_888_1330'>
								<rect width='18' height='18' fill='white' />
							</clipPath>
						</defs>
					</svg>
					<svg
						width='18'
						height='18'
						viewBox='0 0 18 18'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'>
						<g clipPath='url(#clip0_888_1330)'>
							<path
								d='M17.9529 6.90409C17.8344 6.53961 17.5111 6.28156 17.1302 6.24709L11.9341 5.77536L9.88059 0.967661C9.72898 0.614445 9.384 0.386475 9.00002 0.386475C8.61605 0.386475 8.27093 0.614445 8.12028 0.967661L6.06676 5.77536L0.869868 6.24709C0.488911 6.28225 0.166319 6.54029 0.0471156 6.90409C-0.0714014 7.26856 0.0380517 7.66833 0.326173 7.92102L4.25399 11.3652L3.09587 16.4659C3.01114 16.841 3.15671 17.2288 3.4679 17.4537C3.63517 17.5753 3.83169 17.636 4.0289 17.636C4.19837 17.636 4.36797 17.5909 4.51945 17.5003L9.00002 14.8212L13.4798 17.5003C13.8084 17.6967 14.2216 17.6787 14.5321 17.4537C14.8433 17.2288 14.9889 16.841 14.9042 16.4659L13.7461 11.3652L17.6739 7.92102C17.9619 7.66833 18.0714 7.26939 17.9529 6.90409Z'
								fill='black'
							/>
						</g>
						<defs>
							<clipPath id='clip0_888_1330'>
								<rect width='18' height='18' fill='white' />
							</clipPath>
						</defs>
					</svg>
				</div>
				<span className={s.bookRaitingDescription}>1 customer review</span>
			</div>
			<p className={s.bookDescription}>
				{shortenTitle(
					description.replace(/<\/?[a-zA-Z]+>/gi, '') ||
						'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, molestiae perferendis sapiente molestias dolores quae? Nostrum voluptates illum harum beatae voluptatum saepe explicabo rem, facilis ab, id culpa aspernatur ex.',
					300
				)}
			</p>

			{listPrice ? (
				<div className={s.blockAddBookToCart}>
					{/* <div className={s.counterAddBookToCart}>
						<button className={s.counterMinus} onClick={handleDecrement}>
							-
						</button>
						<span className={s.count}>{count}</span>
						<button className={s.counterPlus} onClick={handleIncrement}>
							+
						</button>
					</div> */}
					<Counter />
					<button className={s.btnAddBookToCart}>Add to Cart</button>
				</div>
			) : (
				''
			)}
			<div className={s.blockWishlistAndMedia}>
				<a className={s.headerIconWishlist}>
					<svg
						width='20'
						height='20'
						viewBox='0 0 20 20'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'>
						<g clipPath='url(#clip0_2046_6520)'>
							<path
								d='M9.07423 18.5033C9.323 18.7521 9.65742 18.8908 10.0082 18.8908C10.3548 18.8908 10.6974 18.748 10.9421 18.5033L18.2708 11.1746C19.3842 10.0613 19.9959 8.58083 20 7.01068C20 5.43645 19.3883 3.95603 18.2749 2.84265C17.1615 1.72928 15.6852 1.11753 14.1109 1.11753C12.5653 1.11753 11.1093 1.70889 10.0041 2.78556C8.89478 1.70481 7.43475 1.10938 5.88499 1.10938C4.31485 1.10938 2.8385 1.72112 1.72512 2.83042C0.611746 3.9438 0 5.42422 0 6.99845C0 8.56859 0.615824 10.049 1.7292 11.1624L9.07423 18.5033ZM2.43475 3.54004C3.35644 2.61835 4.58401 2.10856 5.88907 2.10856C7.19413 2.10856 8.42578 2.61835 9.35155 3.54412L9.65334 3.84592C9.74715 3.93972 9.87357 3.99274 10.0082 3.99274C10.1387 3.99274 10.2692 3.93972 10.363 3.84592L10.6566 3.55228C11.5824 2.6265 12.81 2.11672 14.1191 2.11672C15.4241 2.11672 16.6517 2.6265 17.5734 3.5482C18.4992 4.47398 19.0049 5.70154 19.0049 7.0066C19.0049 8.31166 18.4951 9.53923 17.5693 10.465L10.2365 17.7978C10.1183 17.9161 9.90212 17.9161 9.77977 17.7978L2.43883 10.4568C1.51305 9.53107 1.00326 8.3035 1.00326 6.99845C1.00326 5.69339 1.51305 4.46582 2.43475 3.54004Z'
								fill='black'
								stroke='black'
								strokeWidth='0.3'
							/>
						</g>
						<defs>
							<clipPath id='clip0_2046_6520'>
								<rect width='20' height='20' fill='white' />
							</clipPath>
						</defs>
					</svg>
				</a>
				<BlockMedia />
			</div>
			<div className={s.blockSku}>
				<p className={s.sku}>SKU:</p>
				<span className={s.blockSkuValue}>12</span>
			</div>
			<div className={s.blockSku}>
				<p className={s.sku}>Categories:</p>
				<span className={s.blockSkuValue}>{categories}</span>
			</div>
		</div>
	);
};

export default OneBookDetails;
// <div>
// 	<h1>{volumeInfo.title}</h1>
// 	<img src={volumeInfo.imageLinks?.thumbnail} alt={volumeInfo.title} />
// 	<p>{volumeInfo.description}</p>
// 	<p>Автор(ы): {volumeInfo.authors?.join(', ')}</p>
// 	<p>Дата публикации: {volumeInfo.publishedDate}</p>
// </div>
