import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Products from './components/Products';
import { Routes, Route } from 'react-router-dom';

import Product from './components/Product';  // Make sure to import the new component

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/products' element={<Products />} />
                <Route path='/products/:productId' element={<Product />} /> {/* Route for product details */}
                <Route path='/contact' element={<div>Contact Us</div>} />
            </Routes>
        </>
    );
}

export default App;
