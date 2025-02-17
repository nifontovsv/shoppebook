import React, { useEffect, useState } from 'react';
import s from './InfoTabs.module.scss';
import ContentTabs from './ContentTabs/ContentTabs';
import clsx from 'clsx';
import { useParams } from 'react-router-dom';

const InfoTabs = ({ updateTwoReviewsCount }) => {
	const { id } = useParams(); // получаем id книги из URL
	const [activeTab, setActiveTab] = useState('tab1');
	const handleClickTab1 = (e) => {
		e.preventDefault();
		setActiveTab('tab1');
	};
	const handleClickTab2 = (e) => {
		e.preventDefault();
		setActiveTab('tab2');
	};
	const handleClickTab3 = (e) => {
		e.preventDefault();
		setActiveTab('tab3');
	};
	const [reviewsCount, setReviewsCount] = useState(0); // Состояние для хранения количества отзывов
	updateTwoReviewsCount(reviewsCount);
	// Функция, которую будем передавать в дочерний компонент для обновления состояния
	const updateReviewsCount = (count) => {
		setReviewsCount(count); // Обновляем количество отзывов
	};

	return (
		<div className={s.infoTabs}>
			<ul className={s.infoList}>
				<li
					className={clsx(s.infoListItem, {
						[s.infoListItemActive]: activeTab === 'tab1',
					})}>
					<a
						onClick={handleClickTab1}
						className={clsx(s.infoListItemLink, {
							[s.infoListItemLinkActive]: activeTab === 'tab1',
						})}
						href='#'>
						Description
					</a>
				</li>
				<li
					className={clsx(s.infoListItem, {
						[s.infoListItemActive]: activeTab === 'tab2',
					})}>
					<a
						onClick={handleClickTab2}
						className={clsx(s.infoListItemLink, {
							[s.infoListItemLinkActive]: activeTab === 'tab2',
						})}
						href='#'>
						Aditional information
					</a>
				</li>
				<li
					className={clsx(s.infoListItem, {
						[s.infoListItemActive]: activeTab === 'tab3',
					})}>
					<a
						onClick={handleClickTab3}
						className={clsx(s.infoListItemLink, {
							[s.infoListItemLinkActive]: activeTab === 'tab3',
						})}
						href='#'>
						Reviews ({reviewsCount})
					</a>
				</li>
			</ul>
			<ContentTabs activeTab={activeTab} updateReviewsCount={updateReviewsCount} />
		</div>
	);
};

export default InfoTabs;
