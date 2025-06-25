// cart.js
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) { // Check if the element exists on the page
        const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
        cartCountElement.textContent = totalItems;
    }
}

function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    if (!cartItemsContainer || !cartTotalElement) return; // Exit if elements not found

    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Tu carrito está vacío.</p>';
    } else {
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p class="item-price">$${item.price.toFixed(2)}</p>
                </div>
                <div class="cart-item-quantity">
                    <input type="number" value="${item.quantity}" min="1" data-id="${item.id}">
                </div>
                <button class="cart-item-remove" data-id="${item.id}">X</button>
            `;
            cartItemsContainer.appendChild(itemElement);
            total += item.price * item.quantity;
        });
    }

    cartTotalElement.textContent = total.toFixed(2);

    // Add event listeners for quantity change and remove
    cartItemsContainer.querySelectorAll('.cart-item-quantity input').forEach(input => {
        input.addEventListener('change', (e) => {
            const id = parseInt(e.target.dataset.id);
            const newQuantity = parseInt(e.target.value);
            updateCartItemQuantity(id, newQuantity);
        });
    });

    cartItemsContainer.querySelectorAll('.cart-item-remove').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            removeCartItem(id);
        });
    });
}

function addToCart(productId) {
    const productToAdd = products.find(p => p.id === productId);
    if (productToAdd) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...productToAdd, quantity: 1 });
        }
        saveCart();
        updateCartCount();
        renderCartItems();
        // Opcional: Mostrar un mensaje de éxito o abrir el carrito
        // alert(`${productToAdd.name} añadido al carrito!`);
    }
}

function updateCartItemQuantity(productId, newQuantity) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
        if (newQuantity <= 0) {
            cart.splice(itemIndex, 1); // Remove if quantity is 0 or less
        } else {
            cart[itemIndex].quantity = newQuantity;
        }
        saveCart();
        updateCartCount();
        renderCartItems();
    }
}

function removeCartItem(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    renderCartItems();
}

// Inicializar el carrito al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    // No renderizamos el carrito al inicio, solo cuando se abre el modal
});

// Exporta funciones si necesitas usarlas en otros módulos
// export { addToCart, updateCartCount, renderCartItems, cart };