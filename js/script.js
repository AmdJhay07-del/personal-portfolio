// =========================================================
// JEROME ARMANDICO — PERSONAL PORTFOLIO
// Main JavaScript
// =========================================================


// =========================================================
// ELEMENTS
// =========================================================

const header = document.getElementById("header");
const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");
const currentYear = document.getElementById("currentYear");


// =========================================================
// CURRENT YEAR
// =========================================================

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}


// =========================================================
// HEADER SCROLL EFFECT
// =========================================================

function updateHeader() {
  if (window.scrollY > 40) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

updateHeader();

window.addEventListener("scroll", updateHeader);


// =========================================================
// MOBILE NAVIGATION
// =========================================================

function openMenu() {
  navMenu.classList.add("open");

  menuButton.setAttribute("aria-expanded", "true");

  document.body.classList.add("menu-open");
}

function closeMenu() {
  navMenu.classList.remove("open");

  menuButton.setAttribute("aria-expanded", "false");

  document.body.classList.remove("menu-open");
}

function toggleMenu() {
  const menuIsOpen = navMenu.classList.contains("open");

  if (menuIsOpen) {
    closeMenu();
  } else {
    openMenu();
  }
}

menuButton.addEventListener("click", toggleMenu);


// Close menu when navigation link is clicked

navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});


// Close menu when clicking outside

document.addEventListener("click", (event) => {
  const clickedInsideMenu = navMenu.contains(event.target);
  const clickedMenuButton = menuButton.contains(event.target);

  if (
    navMenu.classList.contains("open") &&
    !clickedInsideMenu &&
    !clickedMenuButton
  ) {
    closeMenu();
  }
});


// Close menu with Escape key

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});


// Close mobile menu when screen becomes desktop size

window.addEventListener("resize", () => {
  if (window.innerWidth > 760) {
    closeMenu();
  }
});


// =========================================================
// ACTIVE NAVIGATION LINK
// =========================================================

function updateActiveNavigation() {
  const scrollPosition = window.scrollY + 180;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      navLinks.forEach((link) => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

updateActiveNavigation();

window.addEventListener("scroll", updateActiveNavigation);


// =========================================================
// SMOOTH INTERNAL NAVIGATION
// =========================================================

const internalLinks = document.querySelectorAll('a[href^="#"]');

internalLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") {
      return;
    }

    const targetElement = document.querySelector(targetId);

    if (!targetElement) {
      return;
    }

    event.preventDefault();

    const headerHeight = header.offsetHeight;

    const targetPosition =
      targetElement.getBoundingClientRect().top +
      window.scrollY -
      headerHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  });
});


// =========================================================
// SCROLL REVEAL
// =========================================================

const revealElements = document.querySelectorAll(
  `
  .section-header,
  .about-content,
  .about-details,
  .skill-card,
  .tools-section,
  .project-card,
  .contact-container
  `,
);

revealElements.forEach((element) => {
  element.classList.add("reveal");
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("reveal-visible");

      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.12,
    rootMargin: "0px 0px -50px 0px",
  },
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});


// =========================================================
// STAGGER SKILL CARDS
// =========================================================

const skillCards = document.querySelectorAll(".skill-card");

skillCards.forEach((card, index) => {
  card.style.transitionDelay = `${index * 70}ms`;
});


// =========================================================
// STAGGER DETAIL CARDS
// =========================================================

const detailCards = document.querySelectorAll(".detail-card");

detailCards.forEach((card, index) => {
  card.style.transitionDelay = `${index * 60}ms`;
});


// =========================================================
// STAGGER PROJECT CARDS
// =========================================================

const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card, index) => {
  card.style.transitionDelay = `${index * 80}ms`;
});


// =========================================================
// HERO ENTRANCE ANIMATION
// =========================================================

const heroContent = document.querySelector(".hero-content");
const heroVisual = document.querySelector(".hero-visual");

window.addEventListener("load", () => {
  if (heroContent) {
    heroContent.classList.add("hero-loaded");
  }

  if (heroVisual) {
    setTimeout(() => {
      heroVisual.classList.add("hero-loaded");
    }, 150);
  }
});


// =========================================================
// CODE WINDOW PARALLAX
// =========================================================

const codeWindow = document.querySelector(".code-window");

if (codeWindow) {
  codeWindow.addEventListener("mousemove", (event) => {
    if (window.innerWidth <= 760) {
      return;
    }

    const rectangle = codeWindow.getBoundingClientRect();

    const mouseX = event.clientX - rectangle.left;
    const mouseY = event.clientY - rectangle.top;

    const centerX = rectangle.width / 2;
    const centerY = rectangle.height / 2;

    const rotateY = ((mouseX - centerX) / centerX) * 3;
    const rotateX = ((centerY - mouseY) / centerY) * 3;

    codeWindow.style.transform = `
      perspective(1200px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-4px)
    `;
  });

  codeWindow.addEventListener("mouseleave", () => {
    codeWindow.style.transform = "";
  });
}


// =========================================================
// PROJECT CARD POINTER EFFECT
// =========================================================

projectCards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    if (window.innerWidth <= 760) {
      return;
    }

    const rectangle = card.getBoundingClientRect();

    const mouseX = event.clientX - rectangle.left;
    const mouseY = event.clientY - rectangle.top;

    card.style.setProperty("--mouse-x", `${mouseX}px`);
    card.style.setProperty("--mouse-y", `${mouseY}px`);
  });
});


// =========================================================
// CONTACT EMAIL PROTECTION
// Keeps "#" links from jumping to top
// =========================================================

const placeholderLinks = document.querySelectorAll('a[href="#"]');

placeholderLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
  });
});


// =========================================================
// PAGE VISIBILITY
// =========================================================

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    document.title = "Come back soon 👋";
  } else {
    document.title =
      "Jerome Armandico | Aspiring Web Developer";
  }
});
