import React from 'react';
import { useSelector } from 'react-redux';
import RenderBooks from '../../common/RenderBooks/RenderBooks';
import Pagination from '../Pagination/Pagination';

function ShoppingBooks() {
	const { filteredProducts, loading } = useSelector((state) => state.booksList);

	return (
		<div style={{ minHeight: '80vh' }}>
			<RenderBooks books={filteredProducts} />

			{loading || filteredProducts.length === 0 ? null : <Pagination />}
		</div>
	);
}

export default ShoppingBooks;
