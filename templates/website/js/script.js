// JavaScript code for interactivity and dynamic content

// Wait for the DOM to load completely
document.addEventListener("DOMContentLoaded", function() {
    // Initialize navigation functionality
    initNavigation();

    // Function to initialize navigation and set event listeners
    function initNavigation() {
        const navLinks = document.querySelectorAll("nav a");

        // Adding click event to each navigation link
        navLinks.forEach(link => {
            link.addEventListener("click", function(event) {
                // Prevent the default anchor click behavior
                event.preventDefault();

                // Remove 'active' class from all links
                navLinks.forEach(link => link.classList.remove("active"));

                // Add 'active' class to the clicked link
                this.classList.add("active");

                // Scroll smoothly to the corresponding section
                const targetId = this.getAttribute("href").slice(1);
                const targetSection = document.getElementById(targetId);
                targetSection.scrollIntoView({ behavior: 'smooth' });
            });
        });
    }

    // Example function to add more dynamic behavior
    function highlightCurrentSection() {
        const sections = document.querySelectorAll("section");
        const options = {
            root: null,
            threshold: 0.5,  // Trigger when 50% of the section is visible
        };

        let observer = new IntersectionObserver(callback, options);

        // Observe each section
        sections.forEach(section => {
            observer.observe(section);
        });

        // Callback for the observer
        function callback(entries) {
            entries.forEach(entry => {
                const id = entry.target.getAttribute("id");
                const navLink = document.querySelector(`nav a[href="#${id}"]`);
                if (entry.isIntersecting) {
                    navLink.classList.add("highlight");
                } else {
                    navLink.classList.remove("highlight");
                }
            });
        }
    }

    // Call the function if needed
    highlightCurrentSection();

    // Function to handle mobile navigation toggle
    function mobileNavToggle() {
        const nav = document.querySelector("nav");
        const toggleButton = document.createElement("button");
        toggleButton.textContent = "Menu";
        toggleButton.className = "nav-toggle";
        document.body.insertBefore(toggleButton, nav);

        toggleButton.addEventListener("click", function() {
            nav.classList.toggle("open");
        });
    }

    // Initialize mobile navigation toggle
    mobileNavToggle();

    // Function to load asynchronous content, if desired
    function loadContent() {
        const contentContainer = document.querySelector(".container");

        // Hypothetical AJAX call to fetch content
        // Example: using fetch API (uncomment when needed)
        /*
        fetch("content.json")
            .then(response => response.json())
            .then(data => {
                contentContainer.innerHTML = ""; // Clear existing content
                data.forEach(item => {
                    const section = document.createElement("section");
                    section.innerHTML = `<h2>${item.title}</h2><p>${item.content}</p>`;
                    contentContainer.appendChild(section);
                });
            })
            .catch(error => console.error("Error fetching content:", error));
        */
    }

});