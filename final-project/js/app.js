document.addEventListener('DOMContentLoaded', () => {
    const carouselInner = document.querySelector('.carousel-inner');
    const slides = document.querySelectorAll('.carousel-inner img');
    const slideWidth = slides[0].offsetWidth;
    let currentSlide = 0;

    // Duplicate slides to make the loop seamless
    slides.forEach(slide => {
        const clone = slide.cloneNode(true);
        carouselInner.appendChild(clone);
    });

    function slideShow() {
        currentSlide++;
        carouselInner.style.transform = `translateX(-${currentSlide * slideWidth}px)`;

        // Reset to the first slide without transition when reaching the last slide
        if (currentSlide >= slides.length) {
            setTimeout(() => {
                carouselInner.style.transition = 'none'; // Remove transition for reset
                currentSlide = 0;
                carouselInner.style.transform = 'translateX(0)';
                
                // Reapply transition for the next move
                setTimeout(() => {
                    carouselInner.style.transition = 'transform 1s linear';
                }, 20);
            }, 1000); // Wait for the transition duration before resetting
        }
    }

    setInterval(slideShow, 2000); // Adjust interval as needed
});
