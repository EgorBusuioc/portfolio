const navigation = document.querySelector('.navigation');
const navContainer = document.querySelector('.nav-container');
const navHero = document.querySelector('.nav-hero');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    const scrollPosition = window. scrollY;

    const root = document.documentElement;
    const heroHeight = getComputedStyle(root).getPropertyValue('--navigation-height').trim();
    const heroHeightPx = parseInt(heroHeight);

    if (scrollPosition >= window.innerHeight - heroHeightPx) {
        navigation.classList.add('scrolled');
        navContainer.classList.add('scrolled');
        navHero.classList.add('scrolled');
        navLinks.forEach(link => link.classList.add('scrolled'));
    } else {
        navigation.classList.remove('scrolled');
        navContainer.classList.remove('scrolled');
        navHero.classList.remove('scrolled');
        navLinks.forEach(link => link.classList.remove('scrolled'));
    }
});

const words = ["Java", "JavaEE", "Spring", "Kafka", "Docker", "AWS", "FastAPI", "Angular", "TypeScript", "PostgreSQL", "Redis", "Terraform"];
const wordEl = document.getElementById("word");

let index = 0;
let isAnimating = false;
let intervalId = null;
let isPaused = false;

function initFirstWord() {
    wordEl.textContent = words[index];
    wordEl.style.transition = "opacity 0.4s ease, transform 0.4s ease";
    wordEl.style.opacity = 1;
    wordEl.style.transform = "translateY(0)";
    index = 1;
}

initFirstWord();

function showWord() {
    if (isAnimating || isPaused) return;
    isAnimating = true;

    wordEl.style.opacity = 0;
    wordEl.style.transform = "translateY(-10px)";

    setTimeout(() => {
        wordEl.textContent = words[index];

        wordEl.style. transition = "none";
        wordEl.style.transform = "translateY(10px)";

        requestAnimationFrame(() => {
            wordEl.style.transition = "opacity 0.4s ease, transform 0.4s ease";
            wordEl.style. opacity = 1;
            wordEl.style.transform = "translateY(0)";
        });

        index = (index + 1) % words.length;
        isAnimating = false;
    }, 400);
}

wordEl.textContent = words[0];
wordEl.style.opacity = 1;
wordEl.style.transform = "translateY(0)";

intervalId = setInterval(showWord, 3000);

const glassBox = document.querySelector('.glass-box');

glassBox.addEventListener('mouseenter', () => {
    isPaused = true;
    glassBox.style.borderColor = '#66FCF1';
    glassBox. style.transform = 'scale(1.02)';
    glassBox.style.boxShadow = '0 8px 40px rgba(102, 252, 241, 0.3)';
});

glassBox.addEventListener('mouseleave', () => {
    isPaused = false;
    glassBox. style.borderColor = 'rgba(5, 14, 60, 0.38)';
    glassBox.style.transform = 'scale(1)';
    glassBox.style. boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
});
