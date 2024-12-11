document.querySelector('.headline').addEventListener('animationend', () => {
    document.querySelector('.headline').classList.add('animation-ended');
    document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        const bannerIntro = document.querySelector(".banner-intro");
        if (bannerIntro) {
            bannerIntro.style.backgroundImage = 'url("/background.svg")';
            bannerIntro.style.backgroundRepeat = "no-repeat";
        }
    }, 3000);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const bannerIntro = document.querySelector(".banner-intro");

    setTimeout(() => {
        bannerIntro.style.backgroundImage = 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/background.svg")';
        bannerIntro.style.backgroundRepeat = 'no-repeat';
        bannerIntro.style.backgroundSize = 'cover';
        bannerIntro.style.backgroundPosition = 'center';
        bannerIntro.style.transition = "background-image 3s ease-in-out, opacity 3s ease-in-out";
        bannerIntro.style.opacity = "1";
    }, 6000);
});

document.addEventListener("DOMContentLoaded", () => {
    const aboutSection = document.querySelector("#about");
    const sectionHeadlines = document.querySelector(".section-headlines");
    const profilePic = document.querySelector(".profile-pic");
    const bodyText = document.querySelector(".body-text");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                aboutSection.classList.add("visible");
                sectionHeadlines.classList.add("visible");
                profilePic.classList.add("visible");
                bodyText.classList.add("visible");

                setTimeout(() => {
                    aboutSection.style.backgroundImage = 'url("/background-right.svg")';
                }, 1000);
            }
        });
    }, {
        threshold: 0.3
    });

    observer.observe(aboutSection);
});

document.querySelector('a[href="#about"]').addEventListener('click', event => {
    if (window.innerWidth > 768) { // Solo se ejecuta si no es en mobile
        event.preventDefault();
        const aboutSection = document.querySelector('#about');
        const offset = aboutSection.getBoundingClientRect().top + window.scrollY - 50;
        window.scrollTo({
            top: offset,
            behavior: 'smooth'
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const projectsSection = document.querySelector("#projects");
    const headlines = document.querySelector(".projects-headlines");
    const container = document.querySelector(".projects-container");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                projectsSection.classList.add("visible");
                headlines.classList.add("visible");
                container.classList.add("visible");
            }
        });
    }, {
        root: null,
        threshold: 0.1
    });

    observer.observe(projectsSection);
});

document.addEventListener("DOMContentLoaded", () => {
    const codingSection = document.querySelector("#coding");
    const codingHeadlines = document.querySelector(".coding-headlines");
    const codingContainer = document.querySelector(".coding-projects-container");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                codingSection.classList.add("visible");
                codingHeadlines.classList.add("visible");
                codingContainer.classList.add("visible");
            }
        });
    }, {
        root: null,
        threshold: 0.1
    });
    setTimeout(() => {
        if (codingSection) {
            codingSection.style.backgroundImage = 'url("/background-right.svg")';
            codingSection.style.backgroundRepeat = "no-repeat";
        }
    }, 3000);

    observer.observe(codingSection);
});

document.addEventListener("DOMContentLoaded", () => {
    const contactSection = document.querySelector("#contact");
    const sectionHeadlines = document.querySelector(".contact-headlines");
    const singleCards = document.querySelectorAll(".single-card");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                contactSection.classList.add("visible");
                sectionHeadlines.classList.add("visible");
                
                // Para las tarjetas de contacto, agregar la clase visible una a una
                singleCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add("visible");
                    }, 200 * index); // Desfase entre tarjetas
                });
            }
            setTimeout(() => {
                const contactSection = document.querySelector("#contact");
                if (contactSection) {
                    contactSection.style.backgroundImage = 'url("/background.svg")';
                    contactSection.style.backgroundRepeat = "no-repeat";
                }
            }, 3000);
        });
    }, {
        threshold: 0.3
    });

    observer.observe(contactSection);
});