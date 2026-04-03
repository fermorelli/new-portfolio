document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const siteNav = document.querySelector(".site-nav");
    const navLinks = [...document.querySelectorAll(".site-nav a")];
    const revealItems = document.querySelectorAll(".reveal");
    const clickableCards = document.querySelectorAll(".case-card[data-href], .project-card[data-href]");
    const sections = navLinks
        .map((link) => document.querySelector(link.getAttribute("href")))
        .filter(Boolean);

    if (menuToggle && siteNav) {
        menuToggle.addEventListener("click", () => {
            const isOpen = siteNav.classList.toggle("is-open");
            menuToggle.setAttribute("aria-expanded", String(isOpen));
        });

        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                siteNav.classList.remove("is-open");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.18,
            rootMargin: "0px 0px -10% 0px",
        }
    );

    revealItems.forEach((item) => revealObserver.observe(item));

    const setActiveLink = () => {
        const scrollPosition = window.scrollY + 160;
        let activeId = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                activeId = section.id;
            }
        });

        navLinks.forEach((link) => {
            const isActive = link.getAttribute("href") === `#${activeId}`;
            link.classList.toggle("active", isActive);
        });
    };

    setActiveLink();
    document.addEventListener("scroll", setActiveLink, { passive: true });

    const openCardLink = (card) => {
        const href = card.dataset.href;
        const target = card.dataset.target;

        if (!href) {
            return;
        }

        if (target === "_blank") {
            window.open(href, "_blank", "noopener,noreferrer");
            return;
        }

        window.location.href = href;
    };

    clickableCards.forEach((card) => {
        card.addEventListener("click", (event) => {
            if (event.target.closest("a, button")) {
                return;
            }

            openCardLink(card);
        });

        card.addEventListener("keydown", (event) => {
            if (event.key !== "Enter" && event.key !== " ") {
                return;
            }

            event.preventDefault();
            openCardLink(card);
        });
    });
});
