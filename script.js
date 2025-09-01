const cursorLight = document.getElementById('cursor-light');
const projectCards = document.querySelectorAll('.project-card');
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

// Cursor light glow
document.addEventListener('mousemove', (e) => {
  const x = e.clientX;
  const y = e.clientY;
  if(cursorLight) {
    cursorLight.style.background = `
      radial-gradient(circle at ${x}px ${y}px, rgba(99, 128, 233, 0.09) 120px, transparent 400px)
    `;
  }
});

// Highlight nav link on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => link.classList.remove("active"));

            const id = entry.target.getAttribute("id");
            const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
            if (activeLink) activeLink.classList.add("active");
        }
    });
}, { threshold: 1 });

sections.forEach(section => observer.observe(section));

// Service Worker registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered with scope: ', registration.scope);
            })
            .catch(error => {
                console.log('Service Worker registration failed: ', error);
            });
    });
}

