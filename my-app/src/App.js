
import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProductListing from './component/productListing';
import CartPage from './component/cartPage';


const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // Load products data
  useEffect(() => {
    fetch('/products.json')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error loading products:', error));
  }, []);


  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
    console.log('Loaded cart from localStorage:', savedCart);
  }, []);

 
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
      console.log('Saved cart to localStorage:', cart);
    }
  }, [cart]);

  //  add a product to the cart
  const addToCart = (product, quantity) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);

      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, count: item.count + quantity } : item
        );
      } else {
        return [...prevCart, { ...product, count: quantity}];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => {
      const updatedCart = prevCart.filter(item => item.id !== productId);
      localStorage.setItem('cart', JSON.stringify(updatedCart)); 
      return updatedCart;
    });
  };

  return (
    <Router>
      <header>
    
        <Link to="/"> <button className='header-button'>Products</button></Link>
        <h1>The Plant E-commerce Store</h1>
        <Link to="/cart"> <button className='header-button'>Cart ({cart.reduce((total, item) => total + item.count, 0)})</button></Link>
      </header>
      <Routes>
        <Route path="/" element={<ProductListing products={products} addToCart={addToCart} />} />
        <Route path="/cart" element={<CartPage cart={cart} removeFromCart={removeFromCart} />} />
      </Routes>
    </Router>
  );
};

export default App;







