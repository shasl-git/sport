'use strict'

const scrollableContainer = document.querySelector('.scrollable-container');
let isDragging = false;
let startX = 0;
let scrollLeft = 0;
let velocity = 0; 
let animationFrame; 


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
    velocity = 0; 
    cancelAnimationFrame(animationFrame); 
    scrollableContainer.style.cursor = 'grabbing';
});

scrollableContainer.addEventListener('mouseleave', () => {
    isDragging = false;
    scrollableContainer.style.cursor = 'grab';
    startInertiaScroll(); 
});

scrollableContainer.addEventListener('mouseup', (e) => {
    isDragging = false;
    scrollableContainer.style.cursor = 'grab';
    startInertiaScroll();
});

scrollableContainer.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollableContainer.offsetLeft;
    const walk = (x - startX);
    velocity = walk; 
    scrollableContainer.scrollLeft = scrollLeft - walk;
});

function startInertiaScroll() {
    let currentScrollLeft = scrollableContainer.scrollLeft;
    let animation;

    function inertiaScroll() {
        currentScrollLeft -= velocity;
        scrollableContainer.scrollLeft = currentScrollLeft;
        velocity *= 0.95; 

        if (Math.abs(velocity) > 0.5) { 
            animationFrame = requestAnimationFrame(inertiaScroll);
        }
    }
    inertiaScroll();
}