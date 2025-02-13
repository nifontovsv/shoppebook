import React, { useState } from 'react';
import Logo from './Logo/Logo';
import Navbar from './Navbar/Navbar';
import styles from './Header.module.scss';
import { useMediaQuery } from '@mui/material';
import Burger from './Burger/Burger';

export default function Header() {
	const isMobile = useMediaQuery('(max-width:991px)');
	return (
		<header className={styles.header}>
			<Logo />
			{isMobile ? <Burger /> : <Navbar />}
		</header>
	);
}
