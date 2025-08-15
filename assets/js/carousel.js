document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll(".carousel");
    
    carousels.forEach(carousel => {
        const slides = carousel.querySelector("#carouselSlides");
        const indicators = carousel.querySelectorAll("#carouselIndicators button");
        const nextButton = carousel.querySelector("#next");
        const prevButton = carousel.querySelector("#prev");
        const totalSlides = indicators.length;
        let currentIndex = 0;

        const updateCarousel = (index) => {
            slides.style.transform = `translateX(-${index * 100}%)`;
            indicators.forEach((btn, i) => {
                btn.classList.toggle('opacity-100', i === index);
                btn.classList.toggle('opacity-40', i !== index);
                btn.classList.add('active', i === index);
                btn.classList.remove('active', i !== index);
            });
        };

        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateCarousel();
        });

        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateCarousel();
        });

        indicators.forEach(btn => {
            btn.addEventListener('click', () => {
                currentIndex = parseInt(btn.getAttribute("data-slide"));
                updateCarousel(currentIndex);
            });
        });

        setInterval(() => {
            index = -1
            index = (currentIndex += 1) % totalSlides;
            updateCarousel(index);
        }, 5000);
    });
});