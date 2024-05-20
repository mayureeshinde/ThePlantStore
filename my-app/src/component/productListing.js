import React, { useState,useEffect } from 'react';

const ProductListing = ({ products, addToCart }) => {
  const [sortOrder, setSortOrder] = useState('default');

  // handle sorting
  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };


  const getSortedProducts = () => {
    if (sortOrder === 'name') {
      return [...products].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === 'stock') {
      return [...products].sort((a, b) => b.quantity - a.quantity);
    } else {
      return products;
    }
  };
  const [quantities, setQuantities] = useState({});
  useEffect(() => {
    const initialQuantites = products.reduce((acc, product) => {
      acc[product.id] = 1;
      return acc;
    }, {});
    setQuantities(initialQuantites);
  }, [products]);
  const handleQuantityChange = (productId, increment) => {
    setQuantities((prevQuantities) => {
      const updateQuantities = { ...prevQuantities };

      const currentQuantity = updateQuantities[productId] || 1;
      const newQuantity = increment
        ? Math.min(
          currentQuantity + 1,
          products.find((product) => product.id === productId).quantity
        )
        : Math.max(currentQuantity - 1, 1);
      updateQuantities[productId] = newQuantity;
      return updateQuantities;
    });
  };

  const sortedProducts = getSortedProducts();

  return (
    <div>
      <h1 className='heading'>Product Listing</h1>
      <div className='sortBy'>
        <label>
          Sort by:
          <select value={sortOrder} onChange={handleSortChange}>
            <option value="default">Default</option>
            <option value="name">Name</option>
            <option value="stock">Stock</option>
          </select>
        </label>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {sortedProducts.map(product => (
          <div className='productListingContent' key={product.id} style={{ border: '1px solid black', margin: '10px', padding: '10px', width: '20%' }}>
            <img src={product.image} alt={product.name} style={{ width: '100%', height: '300px' }} />
            <h2>{product.name}</h2>
            <p>Price: ${product.price}</p>

            <div className='quantityContainer'>
              
              <button
                className="quantity"
                onClick={() => handleQuantityChange(product.id, true)}
                disabled={quantities[product.id] >= product.quantity}
              >
                +
              </button>
              <p>{quantities[product.id]}</p>
              <button
                className="quantity"
                onClick={() => handleQuantityChange(product.id, false)}
                disabled={quantities[product.id] <= 1}
              >
                -
              </button>
            </div>
            {product.quantity === 0 ? (
              <button className='outOfStock'>Out of Stock</button>
            ) : (
              <button className='addToCart' onClick={() => addToCart(product, quantities[product.id])}>Add to Cart</button>
            )}

          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListing;
