import './App.css';
import Account from './components/Account/Account';
import Password from './components/Account/Password/Password';
import BookDetails from './components/BookDetails/BookDetails';
import Contacts from './components/Contacts/Contacts';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import NotFound from './components/NotFound/NotFound';
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy';
import Cart from './components/Cart/Cart';
import Container from './components/common/Container/Container';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Cart/Sidebar/Sidebar';
import Home from './components/Home/Home';
import ShopBooksGrid from './components/ShopBooksGrid/ShopBooksGrid';
import Checkout from './components/Cart/Checkout/Checkout';
import Order from './components/Cart/Checkout/Order/Order';
import { useEffect } from 'react';
import Dashboard from './components/Account/Dashboard/Dashboard';
import Wishlist from './components/Wishlist/Wishlist';
import OrderTrack from './components/Cart/Checkout/Order/OrderTrack/OrderTrack';
import { useDispatch } from 'react-redux';
import { fetchPopularBooks } from './store/reducers/booksListReducer';

function App() {
	const ScrollToTop = () => {
		const { pathname } = useLocation();

		useEffect(() => {
			window.scrollTo(0, 0);
		}, [pathname]);

		return null;
	};

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchPopularBooks());
	}, [dispatch]);

	return (
		<Router>
			<Container>
				<Header />
				<Sidebar />
				<ScrollToTop />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='shop' element={<ShopBooksGrid />} />
					<Route path='blog' element={<BookDetails />} />
					<Route path='book/:id' element={<BookDetails />} />
					<Route path='cart' element={<Cart />} />
					<Route path='checkout' element={<Checkout />} />
					<Route path='wishlist' element={<Wishlist />} />
					<Route path='account' element={<Account />} />
					<Route path='order' element={<Order />} />
					<Route path='ordertrack' element={<OrderTrack />} />
					<Route path='contacts' element={<Contacts />} />
					<Route path='dashboard' element={<Dashboard />} />
					<Route path='password' element={<Password />} />
					<Route path='privacy' element={<PrivacyPolicy />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
				<Footer />
			</Container>
		</Router>
	);
}

export default App;
