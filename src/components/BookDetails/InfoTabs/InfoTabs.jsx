import React, { useState } from 'react';
import clsx from 'clsx';
import s from './InfoTabs.module.scss';
import ContentTabs from './ContentTabs/ContentTabs';

const TABS = [
	{ key: 'tab1', label: 'Description' },
	{ key: 'tab2', label: 'Additional information' },
	{ key: 'tab3', label: 'Reviews' },
];

const InfoTabs = ({ updateTwoReviewsCount }) => {
	const [activeTab, setActiveTab] = useState('tab1');
	const [reviewsCount, setReviewsCount] = useState(0);

	// Передаем обновленное количество отзывов родительскому компоненту
	updateTwoReviewsCount(reviewsCount);

	// Универсальный обработчик клика по вкладке
	const handleTabClick = (tabKey) => (e) => {
		e.preventDefault();
		setActiveTab(tabKey);
	};

	// Функция обновления количества отзывов, передаваемая в дочерний компонент
	const updateReviewsCount = (count) => {
		setReviewsCount(count);
	};

	return (
		<div className={s.infoTabs}>
			<ul className={s.infoList}>
				{TABS.map((tab) => (
					<li
						key={tab.key}
						className={clsx(s.infoListItem, {
							[s.infoListItemActive]: activeTab === tab.key,
						})}>
						<a
							href='#'
							onClick={handleTabClick(tab.key)}
							className={clsx(s.infoListItemLink, {
								[s.infoListItemLinkActive]: activeTab === tab.key,
							})}>
							{tab.key === 'tab3' ? `${tab.label} (${reviewsCount})` : tab.label}
						</a>
					</li>
				))}
			</ul>
			<ContentTabs activeTab={activeTab} updateReviewsCount={updateReviewsCount} />
		</div>
	);
};

export default InfoTabs;
