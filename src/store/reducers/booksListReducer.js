import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_KEY = 'AIzaSyBIVxIvSaQTE85dQ5QFppLL8L3AbOroapg';
const initialState = {
	popularBooks: [],
	books: [],
	bookDetails: null,
	query: '',
	loading: false,
	error: null,
	filteredProducts: [],
	minPrice: 0,
	maxPrice: 100000,
	isSearching: false,
	page: 0,
	sortOrder: 'asc', // Добавляем сортировку (asc - по возрастанию, desc - по убыванию)
	category: '',
	categories: [], // 🔹 Здесь будут все категории
};

// 🔹 Функция сортировки книг по цене
const sortBooks = (books, order) => {
	return [...books].sort((a, b) => {
		const priceA = a.saleInfo?.listPrice?.amount || 0;
		const priceB = b.saleInfo?.listPrice?.amount || 0;
		return order === 'asc' ? priceA - priceB : priceB - priceA;
	});
};

// Асинхронное действие для получения популярных книг
export const fetchPopularBooks = createAsyncThunk('books/fetchPopularBooks', async () => {
	// Проверяем, есть ли кешированные данные
	const cachedBooks = localStorage.getItem('popularBooks');
	if (cachedBooks) {
		console.log('Загружаем книги из localStorage');
		return JSON.parse(cachedBooks);
	}

	// Если данных нет — делаем запрос
	const response = await fetch(
		`https://www.googleapis.com/books/v1/volumes?q=fiction&maxResults=12&orderBy=relevance&key=${API_KEY}`
	);
	if (!response.ok) {
		throw new Error('Ошибка при загрузке данных');
	}
	const data = await response.json();

	// Сохраняем результат в localStorage
	localStorage.setItem('popularBooks', JSON.stringify(data.items || []));

	return data.items || [];
});

// 🔹 Асинхронный экшен для поиска книг
export const fetchBooks = createAsyncThunk(
	'books/fetchBooks',
	async ({ searchQuery = 'history+popular', page = 0, category = '' }) => {
		const startIndex = page * 20;
		const encodedQuery = encodeURIComponent(searchQuery);
		const encodedCategory = encodeURIComponent(category);

		// Добавляем категорию в запрос
		const queryString = category ? `${encodedQuery}+subject:${encodedCategory}` : encodedQuery;

		const response = await fetch(
			`https://www.googleapis.com/books/v1/volumes?q=${queryString}&startIndex=${startIndex}&maxResults=20&key=${API_KEY}`
		);
		const data = await response.json();

		return { books: data.items || [], page };
	}
);

// 🔹 Асинхронный экшен для деталей книги
export const fetchDetailsBooks = createAsyncThunk('bookDetails/fetchBooks', async ({ id }) => {
	const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}?key=${API_KEY}`);
	const data = await response.json();
	return data;
});

const booksListReducer = createSlice({
	name: 'books',
	initialState,
	reducers: {
		setQuery(state, action) {
			state.query = action.payload;
			state.page = 0;
		},
		setIsSearching: (state, action) => {
			state.isSearching = action.payload;
			state.books = [];
		},
		clearBookDetails(state) {
			state.bookDetails = null;
		},
		setPriceRange(state, action) {
			const { min, max } = action.payload;
			state.minPrice = min;
			state.maxPrice = max;

			// Фильтруем книги и сортируем их
			state.filteredProducts = sortBooks(
				state.books.filter((book) => {
					const price = book.saleInfo?.listPrice?.amount || 0;
					return price >= min && price <= max;
				}),
				state.sortOrder
			);
		},
		setSortOrder(state, action) {
			state.sortOrder = action.payload;
			// Сортируем уже отфильтрованные книги
			state.filteredProducts = sortBooks(state.filteredProducts, state.sortOrder);
		},
		setProducts: (state, action) => {
			state.books = action.payload;

			// Фильтруем и сортируем книги сразу при их загрузке
			state.filteredProducts = sortBooks(
				action.payload.filter(
					(book) =>
						(book.saleInfo?.listPrice?.amount || 0) >= state.minPrice &&
						(book.saleInfo?.listPrice?.amount || 0) <= state.maxPrice
				),
				state.sortOrder
			);
		},
		// Устанавливаем новую страницу
		setPage(state, action) {
			state.page = action.payload;
		},
		setCategory(state, action) {
			state.category = action.payload;
			state.filteredProducts = state.books.filter((book) => {
				const bookCategory = book.volumeInfo.categories?.[0] || 'Other'; // Берем первую категорию
				return state.category === '' || bookCategory === state.category;
			});
			state.page = 0; // Сбрасываем страницу на 0 при смене категории
		},
	},
	extraReducers: (builder) => {
		builder
			// популярные книги
			.addCase(fetchPopularBooks.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchPopularBooks.fulfilled, (state, action) => {
				state.loading = false;
				state.popularBooks = action.payload;
			})
			.addCase(fetchPopularBooks.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			// книги
			.addCase(fetchBooks.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchBooks.fulfilled, (state, action) => {
				state.loading = false;
				state.books = action.payload.books || [];

				// 🔹 Собираем уникальные категории из загруженных книг
				const categoriesSet = new Set();
				state.books.forEach((book) => {
					if (book.volumeInfo.categories) {
						book.volumeInfo.categories.forEach((category) => categoriesSet.add(category));
					}
				});
				state.categories = Array.from(categoriesSet); // Преобразуем Set в массив

				// 🔹 Фильтрация по категории и цене
				state.filteredProducts = state.books.filter((book) => {
					const price = book.saleInfo?.listPrice?.amount || 0;
					const bookCategory = book.volumeInfo.categories?.[0] || 'Other';

					return (
						price >= state.minPrice &&
						price <= state.maxPrice &&
						(state.selectedCategory === '' || bookCategory === state.selectedCategory)
					);
				});
			})
			.addCase(fetchBooks.rejected, (state) => {
				state.loading = false;
				state.error = 'Ошибка при загрузке данных.';
			})
			// Детали книги
			.addCase(fetchDetailsBooks.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchDetailsBooks.fulfilled, (state, action) => {
				state.loading = false;
				state.bookDetails = action.payload; // Сохраняем объект книги
			})
			.addCase(fetchDetailsBooks.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export const {
	setQuery,
	incrementPage,
	clearBookDetails,
	setPriceRange,
	setProducts,
	setIsSearching,
	setPage,
	setSortOrder,
	setCategory,
} = booksListReducer.actions;
export default booksListReducer.reducer;
