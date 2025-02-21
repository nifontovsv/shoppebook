import React from 'react';
import UncontrolledExample from './bootstrapComponents/UncontrolledExample';
import PopularBooks from './PopularBooks/PopularBooks';
import RandomQuoteOfTheDay from './RandomQuoteOfTheDay/RandomQuoteOfTheDay';

const Home = () => {
	return (
		<div style={{ paddingTop: '100px' }}>
			<UncontrolledExample />
			<RandomQuoteOfTheDay />
			<PopularBooks />
		</div>
	);
};

export default Home;
