import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputBase from '@mui/material/InputBase';
import { fetchBooks, setCategory } from '../../../store/reducers/booksListReducer';
import { useDispatch, useSelector } from 'react-redux';

export default function SelectLabels() {
	const dispatch = useDispatch();
	const categories = useSelector((state) => state.booksList.categories);
	const category = useSelector((state) => state.booksList.category);
	const books = useSelector((state) => state.booksList.books);

	const handleCategoryChange = (event) => {
		const newCategory = event.target.value;
		dispatch(setCategory(newCategory)); // Меняем категорию в стейте
		dispatch(fetchBooks({ searchQuery: 'books', category: newCategory })); // Загружаем новые книги
	};

	return (
		<FormControl sx={{ m: 0, minWidth: '100%', border: '1px solid #565656', borderRadius: '4px' }}>
			<Select
				value={category}
				onChange={handleCategoryChange}
				displayEmpty
				inputProps={{ 'aria-label': 'Выберите категорию' }}
				input={
					<InputBase
						sx={{
							'&:focus': { outline: 'none', boxShadow: 'none' },
							'& .MuiInputBase-input': { padding: '10px' },
						}}
					/>
				}>
				<MenuItem value=''>Все категории</MenuItem>
				{categories.length > 0 ? (
					categories.map((cat) => (
						<MenuItem key={cat} value={cat}>
							{cat}
						</MenuItem>
					))
				) : (
					<MenuItem disabled>Загрузка...</MenuItem>
				)}
			</Select>
		</FormControl>
	);
}
