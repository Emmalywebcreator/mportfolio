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

// const form = document.querySelector('.contact-form');

// form.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const formData = new FormData(form);

//     const res = await fetch(form.action, {
//         method: 'POST',
//         body: formData,
//         headers: {
//             'Accept': 'application/json'
//         }
//     });
//     if (res.ok) {
//         alert("Thank you! Your message has been sent.");
//         form.reset();
//     } else {
//         alert("Oops! Something went wrong.");
//     }
// });

document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    try {
        const res = await fetch('https://my-backend-portfolio-web.onrender.com/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.name.value,
                email: this.email.value,
                message: this.message.value
            })
        });

        const data = await res.json();
        alert(data.message || data.error);

        if (data.success) {
            this.reset(); //clear form if success
        }
    } catch (err) {
        alert("Failed to send message. Please try again later.");
        console.error(err);
    }
})