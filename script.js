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

document.addEventListener("DOMContentLoaded", () => {
    const projectsSection = document.querySelector("#projects");
    const projectsHeadlines = document.querySelector(".projects-headlines");
    const projectsContainer = document.querySelector(".projects-container");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                projectsSection.classList.add("visible");
                projectsHeadlines.classList.add("visible");
                projectsContainer.classList.add("visible");

                setTimeout(() => {
                    projectsSection.style.backgroundImage = 'url("/background.svg")';
                }, 1000);
            }
        });
    }, {
        threshold: 0.3
    });

    observer.observe(projectsSection);
});
document.addEventListener("scroll", () => {
    const projectsSection = document.querySelector("#projects");
    const rect = projectsSection.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.3) { // Detecta cuando está visible
        projectsSection.classList.add("visible");
    }
});