// ===== CURSOR GLOW EFFECT =====
const cursorGlow = document.getElementById('cursorGlow');

document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// ===== TERMINAL TYPEWRITER EFFECT =====
const typewriter = document.getElementById('typewriter');
const terminalOutput = document.getElementById('terminalOutput');

const commands = [
    { text: 'whoami', delay: 100 },
];

const outputLines = [
    { text: '<span class="output-key">name:</span> Vansh Mohan', delay: 0 },
    { text: '<span class="output-key">role:</span> GenAI Developer @ <span class="output-highlight">GWDG</span>', delay: 100 },
    { text: '<span class="output-key">focus:</span> LLM Infrastructure | HPC | Production AI', delay: 200 },
    { text: '<span class="output-key">stack:</span> vLLM, FastAPI, SLURM, PyTorch', delay: 300 },
    { text: '<span class="output-key">status:</span> Building AI services that scale', delay: 400 },
];

async function typeText(element, text, speed = 50) {
    for (let i = 0; i < text.length; i++) {
        element.textContent += text[i];
        await new Promise(resolve => setTimeout(resolve, speed));
    }
}

async function showOutput() {
    for (let i = 0; i < outputLines.length; i++) {
        const line = document.createElement('div');
        line.className = 'output-line';
        line.innerHTML = outputLines[i].text;
        line.style.animationDelay = `${outputLines[i].delay}ms`;
        terminalOutput.appendChild(line);
        await new Promise(resolve => setTimeout(resolve, 150));
    }
}

async function runTerminal() {
    await new Promise(resolve => setTimeout(resolve, 500));
    await typeText(typewriter, commands[0].text, 80);
    await new Promise(resolve => setTimeout(resolve, 300));
    await showOutput();
}

runTerminal();

// ===== EXPERIENCE TABS =====
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.dataset.tab;

        // Remove active class from all
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));

        // Add active class to clicked
        btn.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

// ===== SMOOTH SCROLL FOR NAV LINKS =====
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== NAV ACTIVE STATE ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    const scrollY = window.scrollY;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ===== ANIMATE ON SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.stack-category, .project-card, .edu-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

// Add visible styles
const style = document.createElement('style');
style.textContent = `
    .stack-category.visible,
    .project-card.visible,
    .edu-card.visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// ===== SKILL ITEM HOVER EFFECT =====
document.querySelectorAll('.stack-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.background = 'var(--bg-primary)';
    });
    item.addEventListener('mouseleave', () => {
        item.style.background = 'var(--bg-secondary)';
    });
});

// ===== PROJECT CARD TILT EFFECT =====
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===== CONSOLE EASTER EGG =====
console.log('%c Hey there! 👋', 'font-size: 24px; font-weight: bold;');
console.log('%c Looking at the source code? Nice!', 'font-size: 14px;');
console.log('%c If you want to chat about GenAI infrastructure, reach out: vansh.mohan@stud.uni-goettingen.de', 'font-size: 12px; color: #3b82f6;');
