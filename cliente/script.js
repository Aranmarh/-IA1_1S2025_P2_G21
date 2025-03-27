document.addEventListener("DOMContentLoaded", () => {
    const cardWrapper = document.querySelector('.card-wrapper');
    const cards = document.querySelectorAll('.card');
    let currentIndex = 0;

    // Muestra la tarjeta activa
    function updateCards() {
        cardWrapper.style.transform = `translateX(-${currentIndex * 100}%)`; // Mueve el carrusel
    }

    // Función para pasar a la siguiente tarjeta
    function showNextCard() {
        currentIndex = (currentIndex + 1) % cards.length; // Incrementa el índice y vuelve al principio si llega al final
        updateCards();
    }

    // Función para volver a la tarjeta anterior
    function showPrevCard() {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length; // Retrocede al índice anterior
        updateCards();
    }

    // Flechas de navegación
    document.querySelector('.arrow-left').addEventListener('click', showPrevCard);
    document.querySelector('.arrow-right').addEventListener('click', showNextCard);

    // Inicializa las tarjetas
    updateCards();

    // Soporte para arrastre
    let isDragging = false;
    let startX = 0;

    cardWrapper.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX;
        cardWrapper.style.cursor = 'grabbing'; // Cambiar el cursor cuando se está arrastrando
    });

    cardWrapper.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const moveX = e.pageX - startX;
        cardWrapper.style.transform = `translateX(${-(currentIndex * 100) + (moveX / window.innerWidth) * 100}%)`;
    });

    cardWrapper.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        isDragging = false;
        const moveX = e.pageX - startX;
        if (moveX < -50) {
            showNextCard(); // Pasar a la siguiente tarjeta si el movimiento fue hacia la izquierda
        } else if (moveX > 50) {
            showPrevCard(); // Volver a la tarjeta anterior si el movimiento fue hacia la derecha
        } else {
            updateCards(); // Regresar a la posición inicial si no se arrastra suficiente
        }
        cardWrapper.style.cursor = 'grab'; // Volver al cursor normal
    });

    cardWrapper.addEventListener('mouseleave', () => {
        if (isDragging) {
            isDragging = false;
            cardWrapper.style.cursor = 'grab'; // Volver al cursor normal
        }
    });
});
