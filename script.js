
/* =========================================
   KETHRABALAN V — PORTFOLIO JAVASCRIPT
========================================= */


/* ===== 1. MOBILE NAVIGATION ===== */

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

if (menuToggle && navMenu) {

    function closeMenu() {
        navMenu.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
        menuToggle.textContent = "☰";
    }

    function openMenu() {
        navMenu.classList.add("open");

        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Close navigation menu");
        menuToggle.textContent = "✕";
    }

    menuToggle.addEventListener("click", function () {

        const isOpen =
            navMenu.classList.contains("open");

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }

    });

    // Close menu after selecting a navigation link
    const navLinks = navMenu.querySelectorAll("a");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {
            closeMenu();
        });

    });

    // Close menu using Escape key
    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closeMenu();
            menuToggle.focus();
        }

    });

    // Close menu if screen becomes desktop-sized
    window.addEventListener("resize", function () {

        if (window.innerWidth > 760) {
            closeMenu();
        }

    });

}


/* ===== 2. SCROLL REVEAL ANIMATION ===== */

const revealElements =
    document.querySelectorAll(".reveal");

const prefersReducedMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (prefersReducedMotion ||
    !("IntersectionObserver" in window)) {

    revealElements.forEach(function (element) {
        element.classList.add("active");
    });

} else {

    const revealObserver = new IntersectionObserver(

        function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        }

    );

    revealElements.forEach(function (element) {
        revealObserver.observe(element);
    });

}


/* ===== 3. AUTOMATIC COPYRIGHT YEAR ===== */

const yearElement = document.getElementById("year");

if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


/* ===== 4. TYPING ANIMATION ===== */

const typingElement =
    document.getElementById("typing-text");

const roles = [

    "Developer",
    "AI & Data Science Student",
    "Problem Solver",
    "Software Developer",
    "Tech Enthusiast"

];

if (typingElement) {

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {

        const currentRole = roles[roleIndex];

        typingElement.textContent =
            currentRole.substring(0, charIndex);

        let typingSpeed = deleting ? 45 : 90;

        if (!deleting && charIndex < currentRole.length) {

            charIndex++;

        } else if (!deleting &&
                   charIndex === currentRole.length) {

            deleting = true;
            typingSpeed = 1300;

        } else if (deleting && charIndex > 0) {

            charIndex--;

        } else {

            deleting = false;

            roleIndex =
                (roleIndex + 1) % roles.length;

            typingSpeed = 400;

        }

        setTimeout(typeEffect, typingSpeed);

    }

    // Start typing animation
    if (!prefersReducedMotion) {

        typingElement.textContent = "";

        typeEffect();

    } else {

        typingElement.textContent = "Developer";

    }

}


/* ===== 5. ACTIVE NAVIGATION ON SCROLL ===== */

const sections =
    document.querySelectorAll("main section[id]");

const navigationLinks =
    document.querySelectorAll("#nav-menu a");

if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    const currentId = entry.target.id;

                    navigationLinks.forEach(function (link) {

                        const isActive =
                            link.getAttribute("href") ===
                            "#" + currentId;

                        if (isActive) {

                            link.classList.add("active");

                        } else {

                            link.classList.remove("active");

                        }

                    });

                }

            });

        },

        {
            rootMargin: "-25% 0px -65% 0px"
        }

    );

    sections.forEach(function (section) {

        sectionObserver.observe(section);

    });

}
