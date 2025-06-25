// main.js
document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica del Menú Hamburguesa ---
    const hamburgerBtn = document.querySelector('.hamburger-menu');
    const closeMenuBtn = document.querySelector('.close-menu-btn');
    const sidebarMenu = document.querySelector('.sidebar-menu');

    if (hamburgerBtn && sidebarMenu && closeMenuBtn) {
        hamburgerBtn.addEventListener('click', () => {
            sidebarMenu.classList.add('active');
        });

        closeMenuBtn.addEventListener('click', () => {
            sidebarMenu.classList.remove('active');
        });

        // Cerrar menú si se hace clic fuera de él (opcional)
        document.addEventListener('click', (e) => {
            if (!sidebarMenu.contains(e.target) && !hamburgerBtn.contains(e.target) && sidebarMenu.classList.contains('active')) {
                sidebarMenu.classList.remove('active');
            }
        });
    }


    // --- Lógica del Carrito Modal ---
    const viewCartBtn = document.getElementById('view-cart-btn');
    const cartModal = document.getElementById('cart-modal');
    const closeCartModalBtn = document.querySelector('.close-cart-btn');

    if (viewCartBtn && cartModal && closeCartModalBtn) {
        viewCartBtn.addEventListener('click', () => {
            cartModal.classList.add('active');
            renderCartItems(); // Asegura que el carrito se actualice al abrir
        });

        closeCartModalBtn.addEventListener('click', () => {
            cartModal.classList.remove('active');
        });

        // Cerrar modal al hacer clic fuera de él
        window.addEventListener('click', (e) => {
            if (e.target === cartModal) {
                cartModal.classList.remove('active');
            }
        });
    }

    // --- Lógica de Carga de Productos y Filtros (Solo en index.html) ---
    const productListContainer = document.getElementById('product-list');
    const productSearchInput = document.getElementById('product-search');
    const categoryFilterSelect = document.getElementById('category-filter');

    if (productListContainer) { // Solo si estamos en la página de inicio
        function renderProducts(filteredProducts) {
            productListContainer.innerHTML = ''; // Limpia el contenedor

            if (filteredProducts.length === 0) {
                productListContainer.innerHTML = '<p>No se encontraron productos.</p>';
                return;
            }

            filteredProducts.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');
                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <p class="price">$${product.price.toFixed(2)}</p>
                        <button class="add-to-cart-btn" data-id="${product.id}">Añadir al Carrito</button>
                    </div>
                `;
                productListContainer.appendChild(productCard);
            });

            // Añadir event listeners a los nuevos botones "Añadir al Carrito"
            document.querySelectorAll('.add-to-cart-btn').forEach(button => {
                button.addEventListener('click', (e) => {
                    const productId = parseInt(e.target.dataset.id);
                    addToCart(productId); // Función de cart.js
                    alert('Producto añadido al carrito!'); // Feedback simple
                });
            });
        }

        function applyFilters() {
            const searchTerm = productSearchInput.value.toLowerCase();
            const selectedCategory = categoryFilterSelect.value;

            const filtered = products.filter(product => {
                const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                                      product.description.toLowerCase().includes(searchTerm);
                const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
                return matchesSearch && matchesCategory;
            });
            renderProducts(filtered);
        }

        // Event listeners para filtros
        productSearchInput.addEventListener('input', applyFilters);
        categoryFilterSelect.addEventListener('change', applyFilters);

        // Cargar productos iniciales al cargar la página
        renderProducts(products);
    }
});