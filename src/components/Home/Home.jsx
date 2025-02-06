import React from 'react';
import UncontrolledExample from './bootstrapComponents/UncontrolledExample';
import PopularBooks from './PopularBooks/PopularBooks';

const Home = () => {
	return (
		<div style={{ paddingTop: '100px' }}>
			<UncontrolledExample />
			<PopularBooks />
		</div>
	);
};

export default Home;
