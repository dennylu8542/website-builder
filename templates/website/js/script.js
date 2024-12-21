// JavaScript functionality for the given HTML and CSS structure

// Wait till the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // Selecting elements by class names
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('section');
    
    // Window scroll event to highlight navigation link based on section visibility
    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });

    // Scroll functionality for smooth scroll experience
    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = link.getAttribute('href').replace('#', '');
            const targetSection = document.getElementById(targetId);

            window.scrollTo({
                top: targetSection.offsetTop - 60,
                behavior: 'smooth',
            });
        });
    });

});


// Simulate some dynamic content load for demonstration purposes
const myWorkSection = document.querySelector('.my-work p');
myWorkSection.textContent = 'Here are some of my projects that I\'ve worked on recently. They span various technologies and showcase my versatility in handling different tech stacks.';

// Contact form functionality with basic validation (in case a contact form is present)
const contactSection = document.querySelector('.contact'); 
if (contactSection) {
    const form = document.createElement('form');
    form.innerHTML = `
        <input type="text" name="name" placeholder="Your Name" required>
        <input type="email" name="email" placeholder="Your Email" required>
        <textarea name="message" placeholder="Your Message" required></textarea>
        <button type="submit">Send</button>
    `;
    contactSection.appendChild(form);

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();
        
        if (name && email && message) {
            alert(`Thank you for contacting us, ${name}! We will get back to you soon.`);
            form.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });
}

// Responsive adjustments (could be expanded upon for further flexibility)
window.addEventListener('resize', function() {
    if (window.innerWidth <= 768) {
        console.log('Viewport is less than or equal to 768px wide');
        // Additional responsive behavior can be added here
    } else {
        console.log('Viewport is greater than 768px wide');
        // Additional responsive behavior can be added here
    }
});