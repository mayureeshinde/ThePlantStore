import React, { useState } from 'react';

const CartPage = ({ cart, removeFromCart }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(2);

  // Pagination
  const totalPages = Math.ceil(cart.length / itemsPerPage);

  
  const currentItems = cart.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1); 
  };

  return (
    <div>
      <h1 className='heading'>Cart Page</h1>
      <div className='emptyCart'>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          currentItems.map(item => (
            <div className='cart-content' key={item.id} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
                <div>
              <img src={item.image} alt={item.name} style={{ width: '150px', height: '150px' }} />
              </div>
              <div className='cart-info'>
              <h2>{item.name}</h2>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Count: {item.count}</p>
              </div>
              <div>
              <button className='remove' onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
            </div>
          ))
        )}
      </div>
      {   cart.length !== 0 && 
      (<div className='pagination'>
        
        <label className='pagination_content'>
          Items per page:
          <select className='pagination_content-value'  value={itemsPerPage} onChange={handleItemsPerPageChange}>
            <option value={2}>2</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
        
          </select>
        </label>
     

      <div className='pagination-value'> 
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>)
    }
    </div>
  );
};

export default CartPage;
