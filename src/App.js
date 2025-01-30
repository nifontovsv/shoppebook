// import { Route, Routes } from 'react-router-dom';
import './App.css';
import BookDetails from './components/BookDetails/BookDetails';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Container from './components/common/Container/Container';

function App() {
	return (
		<Container>
			<Header />
			<BookDetails />
			{/* <Routes>
				<Route path='/' element={<Home />} />
				<Route path='/shop' element={<About />} />
				<Route path='/blog' element={<About />} />
				<Route path='/about' element={<About />} />
			</Routes> */}
			<Footer />
		</Container>
	);
}

export default App;
