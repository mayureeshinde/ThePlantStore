console.log("test");
document.addEventListener('DOMContentLoaded', function () {
    const productsContainer = document.getElementById('products-container');
    const cartIcon = document.getElementById('cart-icon');
    const cartCount = document.getElementById('cart-count');
    const cartDrawer = document.getElementById('cart-drawer');
    const cartProductsContainer = document.getElementById('cart-products');
    if (!isClickInsideCartDrawer && !isClickOnCartIcon) {
        closeCartDrawer();
    }
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Sample product data
    const products = [
        { id: 1, name: 'Peace Lily Plant', price: 299, image: './img/plant_1.jpg' },
        { id: 2, name: 'Jade Plant Mini', price: 249, image: './img/plant_2.jpg' },
        { id: 3, name: 'Bamboo Palm Plant', price: 399, image: './img/plant_3.jpg' },
        { id: 4, name: 'Monstera Deliciosa Plant', price: 499, image: './img/plant_4.jpg' }
    ];

    // Display products
    function displayProducts() {
        productsContainer.innerHTML = ''; // Clear existing products
        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.innerHTML = `
    <div> <img src="${product.image}" ></div>
        <p>${product.name} </p>
        <p>Price : $${product.price}</p>
        <button class="add-to-cart-button" data-product-id="${product.id}">Add to Cart</button>
    `;
            productsContainer.appendChild(productElement);
        });
    }

    // Update cart count in header
    function updateCartCount() {
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }

    // Add product to cart or update quantity
    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        const cartItem = cart.find(item => item.id === productId);

        if (cartItem) {
            // Product already in cart, increment quantity
            cartItem.quantity++;
        } else {
            // Product not in cart, add new entry
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        displayCartProducts(); // Update the cart drawer after adding a product
        openCartDrawer(); // Open the cart drawer when adding a product
    }

    // Remove product from cart
    window.removeFromCart = function (productId) {
        const index = cart.findIndex(item => item.id === productId);
        if (index !== -1) {
            const cartItem = cart[index];
            if (cartItem.quantity >= 1) {
                // If quantity is 1, remove the product from cart
                cart.splice(index, 1);
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            displayCartProducts();
        }
    };

    // Display cart products in the drawer
    function displayCartProducts() {
        cartProductsContainer.innerHTML = ''; // Clear existing cart products
        cart.forEach(product => {
            const productElement = document.createElement('div');
            productElement.innerHTML = `
    <div class="cart-content"> 
        <div class="cart-image">
        <img src="${product.image}" >
        </div>
        <div class="cart-info">
        <p>${product.name} </p>
        <p>Price : $${product.price}</p>
        <p>Quantity : ${product.quantity}</p>
        </div>
        <button onclick="removeFromCart(${product.id})">DEL</button>
    </div>
    `;
            cartProductsContainer.appendChild(productElement);
        });
    }

    // Toggle cart drawer
    window.toggleCartDrawer = function () {
        cartDrawer.classList.toggle('open');
    }

    // Open cart drawer
    function openCartDrawer() {
        cartDrawer.classList.add('open');
        displayCartProducts();
    }

    // Event listener for "Add to Cart" buttons
    productsContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('add-to-cart-button')) {
            const productId = event.target.getAttribute('data-product-id');
            addToCart(parseInt(productId));
        }
    });

    // Event listener for cart icon
    cartIcon.addEventListener('click', function () {
        toggleCartDrawer();
    });

    cartIcon.addEventListener('click', function () {
        openCartDrawer();
    });

    // Initial setup
    displayProducts();
    updateCartCount();
});