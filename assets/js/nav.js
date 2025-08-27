document.addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector("body");
    const mobileMenu = document.getElementById("mobileMenu");
    const mobileMenuLinks = mobileMenu.querySelectorAll("a");
    const navButtons = document.querySelectorAll(".navButton");
    const allMenus = document.querySelectorAll(".navMenu");

    // Mobile Menu Behavior
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.setAttribute('hidden', '');
        });
    });

    // Links Behavior
    allMenus.forEach(menu => {
        const menuLinks = menu.querySelectorAll("a");
        menuLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                const fpv = link.getAttribute('data-fpv');
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                };
            });
        });
    });

    navButtons.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                });
            };
        });
    });

    // Scrolling Behavior
    document.addEventListener('wheel', handleScroll, { passive: false });
    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchend', handleTouchEnd, { passive: false });

    const sections = document.querySelectorAll(".section");
    let isScrolling = false;
    let touchStartY = 0;
    let touchEndY = 0;

    function handleScroll(e) {
        e.preventDefault();
        if (isScrolling) return;

        isScrolling = true;

        const currentSection = getClosestSection();

        let target;
        if (e.deltaY > 0) {
            target = currentSection.nextElementSibling;
        } else {
            target = currentSection.previousElementSibling;
        };

        scrollToTarget(target);
    };

    function handleTouchStart(e) {
        const diff = Math.round(touchStartY - touchEndY);

        if (diff <= (-10) || diff >= 10) {
            e.preventDefault();
        };
        
        touchStartY = e.touches[0].clientY;
    };

    function handleTouchEnd(e) {
        touchEndY = e.changedTouches[0].clientY;
        if (isScrolling) return;

        const diff = Math.round(touchStartY - touchEndY);

        if (Math.abs(diff) < 70) return;

        const wheelEvent = new WheelEvent('wheel', {
            deltaY: diff > 0 ? 10 : -10,
            bubbles: true,
            cancelable: true
        });

        document.dispatchEvent(wheelEvent);
    };

    const scrollToTarget = (target) => {
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        };

        setTimeout(() => {
            isScrolling = false;
        }, 800);
    };

    const getClosestSection = () => {
        let closest = null;
        let closestOffset = Infinity;
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const offset = Math.abs(section.offsetTop - scrollY);
            if (offset < closestOffset) {
                closestOffset = offset;
                closest = section;
            };
        });

        return closest;
    };
});