// JavaScript to handle the interactive elements and functionality of the page

// Function to highlight current navigation item based on scroll position
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    let fromTop = window.scrollY;

    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (fromTop >= sectionTop - 100 && fromTop < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            navLinks[index].classList.add('active');
        }
    });
});

// Function to smoothly scroll to a section when a navigation link is clicked
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const href = this.getAttribute('href');
        const offsetTop = document.querySelector(href).offsetTop;
        
        scroll({
            top: offsetTop - 40,
            behavior: 'smooth'
        });
    });
});

// Function to clear the contact form once submitted
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form submission
    
    const name = document.querySelector('[name="name"]').value;
    const email = document.querySelector('[name="email"]').value;
    const message = document.querySelector('[name="message"]').value;

    // Simulate form submission logic
    if (name && email && message) {
        alert('Thank you for your message. We will get back to you shortly.');

        // Clear the form fields
        document.querySelector('.contact-form').reset();
    } else {
        alert('Please fill in all fields.');
    }
});

// Code for dynamically updating the hero section image on screen resize
window.addEventListener('resize', updateHeroImage);

function updateHeroImage() {
    const heroSection = document.querySelector('.hero');
    const windowWidth = window.innerWidth;

    if (windowWidth < 600) { 
        heroSection.style.backgroundImage = "url('https://via.placeholder.com/600x200')";
    } else {
        heroSection.style.backgroundImage = "url('https://via.placeholder.com/1200x400')";
    }
}

// Initial call to set the hero image based on window width
updateHeroImage();