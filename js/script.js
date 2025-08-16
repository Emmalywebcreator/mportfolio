// Mobile menu toggle
const menuIcon = document.getElementById('menuIcon');
const navLinks = document.getElementById('navLink');

menuIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.toggle('show');
});

// close menu when any link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('show');
    });
});

//close menu when outside is clicked
document.addEventListener('click', (e) => {
    if (
        navLinks.classList.contains('show') &&
        !navLinks.contains(e.target) &&
        e.target !== menuIcon
    ) {
        navLinks.classList.remove('show');
    }
});

const form = document.querySelector('.contact-form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    const res = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    });
    if (res.ok) {
        alert("Thank you! Your message has been sent.");
        form.reset();
    } else {
        alert("Oops! Something went wrong.");
    }
});