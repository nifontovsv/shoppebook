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
	favorites: [],
	page: 0,
	sortOrder: 'asc', // Добавляем сортировку (asc - по возрастанию, desc - по убыванию)
	category: '',
	categories: [
		'Art',
		'Biography & Autobiography',
		'Comics & Graphic Novels',
		'Computers',
		'Cooking',
		'Education',
		'Fiction',
		'Health & Fitness',
		'History',
	],
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
		return JSON.parse(cachedBooks);
	}

	// Если данных нет — делаем запрос
	const response = await fetch(
		`https://www.googleapis.com/books/v1/volumes?q=fiction&maxResults=21&orderBy=relevance&key=${API_KEY}`
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
	async ({ searchQuery, category = '' }) => {
		const maxStartIndex = 50;
		const randomStartIndex = Math.floor(Math.random() * maxStartIndex);

		const encodedQuery = encodeURIComponent(searchQuery);
		const encodedCategory = encodeURIComponent(category);
		const queryString = category ? `${encodedQuery}+subject:${encodedCategory}` : encodedQuery;

		const response = await fetch(
			`https://www.googleapis.com/books/v1/volumes?q=${queryString}&startIndex=${randomStartIndex}&maxResults=30&key=${API_KEY}`
		);
		const data = await response.json();

		return { books: data.items || [] };
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
		setCategory: (state, action) => {
			state.category = action.payload;
			state.page = 0;

			// Если выбрана "Все категории" — показываем все книги
			if (state.category === '') {
				state.filteredProducts = state.books;
			} else {
				state.filteredProducts = state.books.filter((book) => {
					const mainCategory = book.volumeInfo.categories?.[0] || 'Other'; // Берем только первую категорию
					return mainCategory === state.category;
				});
			}
		},
		setMainCategories(state, action) {
			// Устанавливаем категории только если они еще не были заданы
			if (state.categories.length === 0) {
				state.categories = action.payload;
			}
		},
		addToFavorites(state, action) {
			const book = action.payload;

			if (!state.favorites.find((fav) => fav.id === book.id)) {
				state.favorites.push(book);
			}
		},
		removeFromFavorites(state, action) {
			state.favorites = state.favorites.filter((fav) => fav.id !== action.payload);
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
				// state.books = shuffleArray(action.payload.books); // Перемешиваем книги
				state.books = action.payload.books;

				// 🔹 Фильтрация только по ГЛАВНОЙ категории
				state.filteredProducts = state.books.filter((book) => {
					const price = book.saleInfo?.listPrice?.amount || 0;
					const bookCategory = book.volumeInfo.categories?.[0] || 'Other';

					return (
						price >= state.minPrice &&
						price <= state.maxPrice &&
						(state.category === '' || bookCategory === state.category)
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
	setMainCategories,
	addToFavorites,
	removeFromFavorites,
} = booksListReducer.actions;
export default booksListReducer.reducer;
