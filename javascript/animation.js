gsap.registerPlugin(ScrollTrigger, SplitText);

//onLoad
window.addEventListener('DOMContentLoaded', () => {

    const cursor = document.querySelector('.custom-cursor');
    const hint = document.querySelector('.cursor-hint');

    if (cursor && hint && window.matchMedia('(pointer: fine)').matches) {

        let hoverTimer = null;
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        const speed = 0.1;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            if (hint.classList.contains('visible')) {
                hint.classList.remove('visible');
            }

            clearTimeout(hoverTimer);
            hoverTimer = setTimeout(() => {
                hint.classList.add('visible');
            }, 1500);
        });

        function animate() {
            let distX = mouseX - cursorX;
            let distY = mouseY - cursorY;

            cursorX += distX * speed;
            cursorY += distY * speed;

            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';

            hint.style.left = cursorX + 'px';
            hint.style.top = cursorY + 'px';

            requestAnimationFrame(animate);
        }

        animate();

        const interactiveElements = document.querySelectorAll('a, button, input, textarea');

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                clearTimeout(hoverTimer);
                hint.classList.remove('visible');

                cursor.style.width = '15px';
                cursor.style.height = '15px';
            });

            el.addEventListener('mouseleave', () => {
                cursor.style.width = '10px';
                cursor. style.height = '10px';

                clearTimeout(hoverTimer);
                hoverTimer = setTimeout(() => {
                    hint.classList.add('visible');
                }, 1000);
            });
        });

        document.addEventListener('mousedown', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
        });

        document.addEventListener('mouseup', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        });

        window.addEventListener('scroll', () => {
            if (hint.classList.contains('visible')) {
                hint.classList.remove('visible');
                clearTimeout(hoverTimer);
            }
        });
    }

    gsap.from('.navigation', {
        y: -100,
        duration: 1,
        ease: 'power1.out'
    });

    gsap.from('.hero-title', {
        y:  80,
        opacity: 0,
        duration: 1.2,
        delay: 0.6,
        ease: 'power2.out'
    });

    const heroTextSplit = new SplitText('.hero-text', { type: 'words' });
    gsap.from(heroTextSplit.words, {
        opacity: 0,
        y: -50,
        stagger: 0.1,
        delay: 1.2,
        duration: 0.6,
        ease: 'power2.out'
    });

    const profExp = new SplitText('.heading.prof', { type: 'words' });
    gsap.from(profExp.words, {
        opacity: 0,
        y: -50,
        stagger: 0.1,
        delay: 1.2,
        duration: 1,
        ease: 'power2.out'
    });

    gsap.utils.toArray('.heading').forEach((heading) => {
        const split = new SplitText(heading, { type: 'chars' });

        gsap.from(split.chars, {
            opacity: 0,
            y: -50,
            stagger: 0.03,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: heading,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    gsap.utils.toArray('.about-me-text').forEach((text) => {
        const split = new SplitText(text, { type: 'lines' });

        gsap.from(split.lines, {
            opacity: 0,
            y: -50,
            stagger: 0.03,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: text,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });

    gsap.utils.toArray('.education-card').forEach((card) => {
        gsap.from(card, {
            opacity: 0,
            y: -50,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });
});