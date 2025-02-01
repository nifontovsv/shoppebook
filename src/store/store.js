import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './reducers/cartReducer';
import booksListReducer from './reducers/booksListReducer';

const store = configureStore({
	reducer: {
		cart: cartReducer,
		booksList: booksListReducer,
	},
});

window.store = store;

export default store;
