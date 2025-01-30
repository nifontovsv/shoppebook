import React, { useState } from 'react';
import s from './Navbar.module.scss';
import clsx from 'clsx';
import HeaderIcon from '../HeaderIcon/HeaderIcon';

export default function Navbar() {
	const [activeIndex, setActiveIndex] = useState(null);

	const handleClick = (index) => {
		setActiveIndex(index === activeIndex ? null : index); // Переключаем активность
	};

	return (
		<nav className={s.nav}>
			<ul className={s.navList}>
				<li
					className={clsx(s.navItem, {
						[s.active]: activeIndex === 0,
					})}>
					<a onClick={() => handleClick(0)} href='#' className={s.navLink}>
						Shop
					</a>
				</li>
				<li
					className={clsx(s.navItem, {
						[s.active]: activeIndex === 1,
					})}>
					<a onClick={() => handleClick(1)} href='#' className={s.navLink}>
						Blog
					</a>
				</li>
				<li
					className={clsx(s.navItem, {
						[s.active]: activeIndex === 2,
					})}>
					<a onClick={() => handleClick(2)} href='#' className={s.navLink}>
						About
					</a>
				</li>
			</ul>
			<HeaderIcon />
		</nav>
	);
}
