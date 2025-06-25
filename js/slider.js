// slider.js
document.addEventListener('DOMContentLoaded', () => {
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const sliderImages = document.querySelectorAll('.slider-img');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const dotsContainer = document.querySelector('.slider-dots');

    if (!sliderWrapper || !sliderImages.length || !prevBtn || !nextBtn || !dotsContainer) {
        // Elements not found, likely not on index.html
        return;
    }

    let currentIndex = 0;
    let autoSlideInterval;

    function showSlide(index) {
        // Remover clase 'active' de todas las imágenes y dots
        sliderImages.forEach(img => img.classList.remove('active'));
        dotsContainer.querySelectorAll('.slider-dot').forEach(dot => dot.classList.remove('active'));

        // Asegurarse de que el índice esté dentro de los límites
        if (index >= sliderImages.length) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = sliderImages.length - 1;
        } else {
            currentIndex = index;
        }

        // Añadir clase 'active' a la imagen y dot correctos
        sliderImages[currentIndex].classList.add('active');
        dotsContainer.children[currentIndex].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    function prevSlide() {
        showSlide(currentIndex - 1);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000); // Cambia cada 5 segundos
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Crear los puntos del slider
    sliderImages.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        dot.addEventListener('click', () => {
            showSlide(index);
            stopAutoSlide(); // Detener auto-slide al hacer clic en un punto
            startAutoSlide(); // Reiniciar auto-slide
        });
        dotsContainer.appendChild(dot);
    });

    // Event listeners para los botones de navegación
    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoSlide();
        startAutoSlide();
    });
    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoSlide();
        startAutoSlide();
    });

    // Iniciar el slider
    showSlide(currentIndex);
    startAutoSlide();

    // Detener y reiniciar auto-slide al pasar el ratón por el slider
    sliderWrapper.closest('.hero-slider').addEventListener('mouseover', stopAutoSlide);
    sliderWrapper.closest('.hero-slider').addEventListener('mouseout', startAutoSlide);
});