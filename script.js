'use strict'

const scrollableContainer = document.querySelector('.scrollable-container');
let isDragging = false;
let startX = 0;
let scrollLeft = 0;
let velocity = 0;  // Добавляем переменную для скорости
let animationFrame; // Добавляем переменную для requestAnimationFrame

// Предварительная загрузка изображений (опционально)
const images = document.querySelectorAll('.image-container img');
images.forEach(img => {
  const src = img.getAttribute('src');
  const image = new Image();
  image.src = src;
});

scrollableContainer.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - scrollableContainer.offsetLeft;
    scrollLeft = scrollableContainer.scrollLeft;
    velocity = 0; // Сбрасываем скорость при каждом новом перетаскивании
    cancelAnimationFrame(animationFrame); // Останавливаем предыдущую анимацию
    scrollableContainer.style.cursor = 'grabbing';
});

scrollableContainer.addEventListener('mouseleave', () => {
    isDragging = false;
    scrollableContainer.style.cursor = 'grab';
    startInertiaScroll(); // Запускаем инерцию, если курсор покинул элемент
});

scrollableContainer.addEventListener('mouseup', (e) => {
    isDragging = false;
    scrollableContainer.style.cursor = 'grab';
    startInertiaScroll(); // Запускаем инерцию при отпускании мыши
});

scrollableContainer.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollableContainer.offsetLeft;
    const walk = (x - startX);
    velocity = walk; // Обновляем скорость при каждом движении
    scrollableContainer.scrollLeft = scrollLeft - walk;
});

function startInertiaScroll() {
    let currentScrollLeft = scrollableContainer.scrollLeft;
    let animation;

    function inertiaScroll() {
        currentScrollLeft -= velocity;
        scrollableContainer.scrollLeft = currentScrollLeft;
        velocity *= 0.95; // Коэффициент замедления (можно настроить)

        if (Math.abs(velocity) > 0.5) { // Минимальная скорость для продолжения анимации
            animationFrame = requestAnimationFrame(inertiaScroll);
        }
    }
    inertiaScroll();
}