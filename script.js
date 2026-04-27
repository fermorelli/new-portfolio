document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const siteNav = document.querySelector(".site-nav");
    const navLinks = [...document.querySelectorAll(".site-nav a")];
    const revealItems = document.querySelectorAll(".reveal");
    const clickableCards = document.querySelectorAll(".case-card[data-href], .project-card[data-href]");
    const typewriterText = document.querySelector(".typewriter-text[data-typewriter]");
    const rotatingWordFrame = document.querySelector(".rotating-word-frame");
    let rotatingWord = document.querySelector(".rotating-word[data-words]");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sections = navLinks
        .map((link) => document.querySelector(link.getAttribute("href")))
        .filter(Boolean);

    if (typewriterText) {
        const message = typewriterText.dataset.typewriter || "";

        if (prefersReducedMotion) {
            typewriterText.textContent = message;
        } else {
            let letterIndex = 0;
            typewriterText.textContent = "";

            const getDelay = (character) => {
                if (character === "," || character === "!") {
                    return 170;
                }

                if (character === ".") {
                    return 120;
                }

                if (character === " ") {
                    return 34;
                }

                return 42;
            };

            const typeNextLetter = () => {
                if (letterIndex >= message.length) {
                    return;
                }

                const character = message[letterIndex];
                typewriterText.textContent += character;
                letterIndex += 1;
                window.setTimeout(typeNextLetter, getDelay(character));
            };

            window.setTimeout(typeNextLetter, 360);
        }
    }

    if (rotatingWord && rotatingWordFrame) {
        const words = rotatingWord.dataset.words
            .split("|")
            .map((word) => word.trim())
            .filter(Boolean);
        let wordIndex = 0;
        let currentWord = words[0] || "";
        let isRolling = false;

        const renderRotatingWord = (element, word) => {
            element.replaceChildren();

            if (word !== "growth expert") {
                element.textContent = word;
                return;
            }

            const mobileBreak = document.createElement("span");

            mobileBreak.className = "mobile-word-break";
            element.append("growth", mobileBreak, "expert");
        };

        const rotateWord = () => {
            if (words.length < 2 || isRolling) {
                return;
            }

            wordIndex = (wordIndex + 1) % words.length;

            if (prefersReducedMotion) {
                renderRotatingWord(rotatingWordFrame, words[wordIndex]);
                return;
            }

            isRolling = true;
            const outgoingText = currentWord;
            const incomingText = words[wordIndex];
            const wordTrack = document.createElement("span");
            const incomingWord = document.createElement("span");
            const outgoingWord = document.createElement("span");

            wordTrack.className = "rotating-word-track";
            incomingWord.className = "rotating-word";
            outgoingWord.className = "rotating-word";
            renderRotatingWord(incomingWord, incomingText);
            renderRotatingWord(outgoingWord, outgoingText);
            wordTrack.append(incomingWord, outgoingWord);
            rotatingWordFrame.replaceChildren(wordTrack);
            void wordTrack.offsetHeight;
            wordTrack.classList.add("is-rolling");

            window.setTimeout(() => {
                const settledWord = document.createElement("span");

                settledWord.className = "rotating-word";
                renderRotatingWord(settledWord, incomingText);
                rotatingWordFrame.replaceChildren(settledWord);
                rotatingWord = settledWord;
                currentWord = incomingText;
                isRolling = false;
            }, 700);
        };

        window.setInterval(rotateWord, 1900);
    }

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

    let scrollTicking = false;
    document.addEventListener(
        "scroll",
        () => {
            if (scrollTicking) {
                return;
            }

            scrollTicking = true;
            window.requestAnimationFrame(() => {
                setActiveLink();
                scrollTicking = false;
            });
        },
        { passive: true }
    );

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
