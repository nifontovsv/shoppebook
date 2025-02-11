import React from 'react';
import { useSelector } from 'react-redux';
import RenderBooks from '../../common/RenderBooks/RenderBooks';
import Pagination from '../Pagination/Pagination';

function ShoppingBooks() {
	const { filteredProducts } = useSelector((state) => state.booksList);

	return (
		<div>
			<RenderBooks books={filteredProducts} />
			<Pagination />
		</div>
	);
}

export default ShoppingBooks;
