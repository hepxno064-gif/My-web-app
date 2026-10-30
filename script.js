/* =========================================
   ZYHAM DEVELOPER PORTFOLIO
   Interactive functionality
========================================= */

"use strict";


/* =========================================
   1. PAGE LOADER
========================================= */

const loader = document.getElementById("loader");

function hideLoader() {
    if (loader) {
        loader.classList.add("loaded");
    }
}

window.addEventListener("load", () => {
    setTimeout(hideLoader, 500);
});

/* Prevent the loader from remaining visible
   if the page load event is delayed. */

setTimeout(hideLoader, 3000);


/* =========================================
   2. CURRENT YEAR
========================================= */

const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* =========================================
   3. HEADER SCROLL EFFECT
========================================= */

const header = document.getElementById("header");

function updateHeader() {
    if (!header) return;

    if (window.scrollY > 30) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
}

window.addEventListener("scroll", updateHeader, {
    passive: true
});

updateHeader();


/* =========================================
   4. MOBILE NAVIGATION
========================================= */

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
const navLinks = document.querySelectorAll(".nav-link");

function openMenu() {
    if (!menuToggle || !nav) return;

    menuToggle.classList.add("open");
    nav.classList.add("open");

    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation");

    document.body.classList.add("menu-open");
}

function closeMenu() {
    if (!menuToggle || !nav) return;

    menuToggle.classList.remove("open");
    nav.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");

    document.body.classList.remove("menu-open");
}

if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
        const isOpen = nav.classList.contains("open");

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });
}

/* Close the mobile menu after choosing a section. */

navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
});

const navContact = document.querySelector(".nav-contact");

if (navContact) {
    navContact.addEventListener("click", closeMenu);
}

/* Close the menu when the Escape key is pressed. */

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMenu();
    }
});

/* Close the menu when switching to a desktop layout. */

window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
        closeMenu();
    }
});


/* =========================================
   5. ACTIVE NAVIGATION SECTION
========================================= */

const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) return;

                const sectionId = entry.target.id;

                navLinks.forEach((link) => {

                    const matches =
                        link.getAttribute("href") === "#" + sectionId;

                    link.classList.toggle("active", matches);

                });

            });

        },
        {
            rootMargin: "-30% 0px -55% 0px"
        }
    );

    sections.forEach((section) => {
        sectionObserver.observe(section);
    });

}


/* =========================================
   6. SCROLL REVEAL ANIMATIONS
========================================= */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -35px 0px"
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });

} else {

    /* Fallback for older browsers. */

    revealElements.forEach((element) => {
        element.classList.add("visible");
    });

}


/* =========================================
   7. HERO TYPING ANIMATION
========================================= */

const typingText = document.getElementById("typingText");

const typingWords = [
    "digital experiences",
    "backend systems",
    "web applications",
    "useful solutions",
    "my next project"
];

let wordIndex = 0;
let characterIndex = 0;

let deleting = false;

let typingTimer = null;

function typeWords() {

    if (!typingText) return;

    const currentWord = typingWords[wordIndex];

    if (!deleting) {

        characterIndex++;

        typingText.textContent =
            currentWord.substring(0, characterIndex);

        if (characterIndex >= currentWord.length) {

            deleting = true;

            typingTimer = setTimeout(typeWords, 1600);

            return;
        }

        typingTimer = setTimeout(typeWords, 65);

    } else {

        characterIndex--;

        typingText.textContent =
            currentWord.substring(0, characterIndex);

        if (characterIndex <= 0) {

            deleting = false;

            wordIndex = (wordIndex + 1) % typingWords.length;

            typingTimer = setTimeout(typeWords, 350);

            return;
        }

        typingTimer = setTimeout(typeWords, 35);
    }

}

if (typingText) {

    typingText.textContent = "";

    typingTimer = setTimeout(typeWords, 800);

}


/* =========================================
   8. PROFILE IMAGE FALLBACK
========================================= */

const profileImage = document.getElementById("profileImage");

const profileFallback = document.getElementById("profileFallback");

function showProfileFallback() {

    if (profileImage) {
        profileImage.style.display = "none";
    }

    if (profileFallback) {
        profileFallback.style.display = "flex";
    }

}

if (profileImage) {

    profileImage.addEventListener("error", showProfileFallback);

    if (profileImage.complete && profileImage.naturalWidth === 0) {
        showProfileFallback();
    }

}


/* =========================================
   9. TOAST NOTIFICATIONS
========================================= */

const toast = document.getElementById("toast");

let toastTimer = null;

function showToast(message) {

    if (!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2600);

}


/* =========================================
   10. COPY EMAIL ADDRESS
========================================= */

const copyEmailButton = document.getElementById("copyEmail");

const emailAddress = "abdulsalamhammed064@gmail.com";

async function copyEmail() {

    try {

        if (navigator.clipboard && window.isSecureContext) {

            await navigator.clipboard.writeText(emailAddress);

        } else {

            /* Fallback for browsers where the Clipboard
               API is unavailable. */

            const temporaryInput = document.createElement("textarea");

            temporaryInput.value = emailAddress;

            temporaryInput.setAttribute("readonly", "");

            temporaryInput.style.position = "fixed";
            temporaryInput.style.opacity = "0";

            document.body.appendChild(temporaryInput);

            temporaryInput.select();

            const successful = document.execCommand("copy");

            temporaryInput.remove();

            if (!successful) {
                throw new Error("Copy operation failed");
            }

        }

        showToast("Email address copied!");

    } catch (error) {

        showToast("Email: " + emailAddress);

    }

}

if (copyEmailButton) {

    copyEmailButton.addEventListener("click", copyEmail);

}


/* =========================================
   11. PROJECT IMAGE FALLBACK
========================================= */

const projectImages = document.querySelectorAll(".portfolio-image");

projectImages.forEach((image) => {

    image.addEventListener("error", () => {

        image.style.display = "none";

        const imageWrap = image.closest(".portfolio-image-wrap");

        if (imageWrap) {

            imageWrap.style.background =
                "linear-gradient(135deg, #171922, #26150f)";

        }

    });

});


/* =========================================
   12. BUTTON FEEDBACK
========================================= */

const projectLinks = document.querySelectorAll(
    ".portfolio-image-link, .portfolio-card-footer a"
);

projectLinks.forEach((link) => {

    link.addEventListener("click", () => {

        /*
         The anchor's normal navigation is preserved.
         No preventDefault() is used.
        */

    });

});


/* =========================================
   13. REDUCE MOTION SUPPORT
========================================= */

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
);

if (prefersReducedMotion.matches) {

    if (typingTimer) {
        clearTimeout(typingTimer);
    }

    if (typingText) {
        typingText.textContent = "digital experiences";
    }

}


/* =========================================
   14. INITIALIZE
========================================= */

document.documentElement.classList.add("js-ready");

console.log("ZYHAM portfolio initialized successfully.");