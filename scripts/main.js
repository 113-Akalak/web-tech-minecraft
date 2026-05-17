const heroSlides = [
    {
        title: "Your bonus Minecraft LIVE!",
        copy: "We're back with fresh news from the world of Minecraft in this bonus show. Tune in on May 30.",
        cta: "Stay tuned",
        href: "#news-title",
        image: "../assets/images/minecraft/Homepage_Hero-A-1920_MCL-Twitch-26_2560x932_01.jpg",
        theme: "live",
        video: false,
    },
    {
        title: "The Tiny Takeover drop",
        copy: "New versions of baby mobs are causing cuteness overload across biomes and builds. Collect, cuddle, and coo over our new tiny rascals.",
        cta: "See game drop",
        href: "#news-title",
        theme: "tiny",
        video: true,
    },
    {
        title: "Minecraft Dungeons II",
        copy: "Return to the world of Minecraft Dungeons in an all-new action RPG adventure. Wishlist today to stay up to date on what's coming next.",
        cta: "Get details",
        href: "#games-title",
        image: "../assets/images/minecraft/MCD2_Wishlist_Homepage_2560x932.jpg",
        theme: "dungeons",
        video: false,
    },
];

const trailerContent = {
    minecraft: {
        title: "Minecraft",
        copy: "Explore your own unique worlds, survive the night, and create anything you can imagine!",
        note: "Watch the sample video of Minecraft gameplay above, or select \"watch the trailer\" to see the full video on YouTube.",
        href: "#games-title",
        youtube: "#trailers-title",
        video: "./assets/video/Homepage_Gameplay-Trailer_MC-OV_1080x720.mp4",
        cta: "Get Minecraft",
    },
    dungeons: {
        title: "Minecraft Dungeons",
        copy: "Discover an action-adventure game inspired by classic dungeon crawlers.",
        note: "Watch the sample video of Minecraft Dungeons gameplay above, or select \"watch the trailer\" to see the full video on YouTube.",
        href: "#games-title",
        youtube: "#trailers-title",
        video: "./assets/video/Homepage_Gameplay-Trailer_MC-Dungeons_1080x720.mp4",
        cta: "Learn More",
    },
    legends: {
        title: "Minecraft Legends",
        copy: "Lead your allies in heroic battles in the action-strategy game Minecraft Legends.",
        note: "Watch the sample video of Minecraft Legends gameplay above, or select \"watch the trailer\" to see the full video on YouTube.",
        href: "#games-title",
        youtube: "#trailers-title",
        video: "./assets/video/Homepage_Gameplay-Trailer_MC-Legends_1080x720.mp4",
        cta: "Learn More",
    },
    education: {
        title: "Minecraft Education",
        copy: "A game-based learning platform supporting thousands of educators in over 100 countries.",
        note: "Watch the sample video of Minecraft Education gameplay above, or select \"watch the trailer\" to see the full video on YouTube.",
        href: "#games-title",
        youtube: "#trailers-title",
        video: "./assets/video/Homepage_Gameplay-Trailer_MC-EDU_1080x720.mp4",
        cta: "Learn More",
    },
};

const body = document.body;
const menuToggle = document.querySelector("[data-menu-toggle]");
const navMenu = document.querySelector("[data-nav-menu]");
const panelTriggers = document.querySelectorAll("[data-panel-trigger]");
const panels = document.querySelectorAll("[data-panel]");
const megaTabs = document.querySelectorAll("[data-mega-tab]");
const megaPanels = document.querySelectorAll("[data-mega-panel]");
const accountToggle = document.querySelector("[data-account-toggle]");
const accountMenu = document.querySelector("[data-account-menu]");
const searchOverlay = document.querySelector("[data-search-overlay]");
const searchOpen = document.querySelector("[data-search-open]");
const searchClose = document.querySelector("[data-search-close]");
const heroMedia = document.querySelector("[data-hero-media]");
const heroVideo = document.querySelector(".hero-video");
const heroTabs = document.querySelectorAll("[data-slide]");
const trailerTabs = document.querySelectorAll("[data-trailer]");
const trailerVideo = document.querySelector("[data-trailer-video]");
const trailerToggle = document.querySelector("[data-trailer-toggle]");
const marketTrack = document.querySelector("[data-market-track]");
const collectTrack = document.querySelector("[data-collect-track]");

function isHidden(element) {
    return element?.hasAttribute("hidden") ?? true;
}

function showElement(element) {
    element?.removeAttribute("hidden");
}

function hideElement(element) {
    element?.setAttribute("hidden", "");
}

function closePanels() {
    panelTriggers.forEach((trigger) => trigger.setAttribute("aria-expanded", "false"));
    panels.forEach((panel) => {
        hideElement(panel);
    });
}

function closeSearch() {
    if (!searchOverlay) {
        return;
    }

    hideElement(searchOverlay);
    searchOpen?.setAttribute("aria-expanded", "false");
}

function closeAccountMenu() {
    if (!accountMenu) {
        return;
    }

    hideElement(accountMenu);
    accountToggle?.setAttribute("aria-expanded", "false");
}

function toggleMenu() {
    const isOpen = navMenu.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
}

function togglePanel(name, trigger) {
    const nextPanel = document.querySelector(`[data-panel="${name}"]`);
    const willOpen = isHidden(nextPanel);

    closePanels();
    closeAccountMenu();
    closeSearch();

    if (willOpen) {
        showElement(nextPanel);
        trigger.setAttribute("aria-expanded", "true");
    }
}

function toggleAccountMenu() {
    const willOpen = isHidden(accountMenu);
    closePanels();
    closeSearch();
    if (willOpen) {
        showElement(accountMenu);
    } else {
        hideElement(accountMenu);
    }
    accountToggle.setAttribute("aria-expanded", String(willOpen));
}

function openSearch() {
    const willOpen = isHidden(searchOverlay);
    closePanels();
    closeAccountMenu();
    if (willOpen) {
        showElement(searchOverlay);
    } else {
        hideElement(searchOverlay);
    }
    searchOpen.setAttribute("aria-expanded", String(willOpen));

    if (willOpen) {
        searchOverlay.querySelector("input").focus();
    }
}

function setMegaTab(tab) {
    const panelName = tab.dataset.megaTab;

    megaTabs.forEach((item) => {
        const isActive = item === tab;
        item.classList.toggle("is-active", isActive);
        item.setAttribute("aria-selected", String(isActive));
    });

    megaPanels.forEach((panel) => {
        panel.classList.toggle("is-active", panel.dataset.megaPanel === panelName);
    });
}

function setHeroSlide(index) {
    const slide = heroSlides[index];

    document.querySelector("[data-hero-title]").textContent = slide.title;
    document.querySelector("[data-hero-copy]").textContent = slide.copy;
    document.querySelector("[data-hero-link]").textContent = slide.cta;
    document.querySelector("[data-hero-link]").href = slide.href;

    heroMedia.classList.toggle("is-video", slide.video);
    heroMedia.dataset.theme = slide.theme;
    if (slide.video) {
        heroVideo.play().catch(() => {});
    } else {
        heroMedia.style.setProperty("--hero-image", `url("${slide.image}")`);
        heroVideo.pause();
    }

    heroTabs.forEach((tab) => {
        const isActive = Number(tab.dataset.slide) === index;
        tab.classList.toggle("is-active", isActive);
        tab.setAttribute("aria-selected", String(isActive));
    });
}

function setTrailer(key) {
    const content = trailerContent[key];

    document.querySelector("[data-trailer-title]").textContent = content.title;
    document.querySelector("[data-trailer-copy]").textContent = content.copy;
    document.querySelector("[data-trailer-note]").textContent = content.note;
    document.querySelector("[data-trailer-link]").textContent = content.cta;
    document.querySelector("[data-trailer-link]").href = content.href;
    document.querySelector("[data-trailer-youtube]").href = content.youtube;

    if (trailerVideo && trailerVideo.getAttribute("src") !== content.video) {
        trailerVideo.src = content.video;
        trailerVideo.load();
        trailerVideo.play().catch(() => {});
        trailerToggle?.classList.remove("is-paused");
        trailerToggle?.setAttribute("aria-label", "Pause trailer");
    }

    trailerTabs.forEach((tab) => {
        tab.classList.toggle("is-active", tab.dataset.trailer === key);
    });
}

function scrollTrack(track, direction) {
    track.scrollBy({
        left: direction * Math.max(220, Math.round(track.clientWidth * 0.72)),
        behavior: "smooth",
    });
}

menuToggle?.addEventListener("click", toggleMenu);

panelTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
        togglePanel(trigger.dataset.panelTrigger, trigger);
    });
});

megaTabs.forEach((tab) => {
    tab.addEventListener("click", () => setMegaTab(tab));
});

accountToggle?.addEventListener("mousedown", (event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleAccountMenu();
});

accountToggle?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") {
        return;
    }

    event.preventDefault();
    event.stopPropagation();
    toggleAccountMenu();
});

searchClose?.addEventListener("click", closeSearch);

heroTabs.forEach((tab) => {
    tab.addEventListener("click", () => setHeroSlide(Number(tab.dataset.slide)));
});

trailerTabs.forEach((tab) => {
    tab.addEventListener("click", () => setTrailer(tab.dataset.trailer));
});

trailerToggle?.addEventListener("click", () => {
    if (trailerVideo.paused) {
        trailerVideo.play().catch(() => {});
        trailerToggle.classList.remove("is-paused");
        trailerToggle.setAttribute("aria-label", "Pause trailer");
        return;
    }

    trailerVideo.pause();
    trailerToggle.classList.add("is-paused");
    trailerToggle.setAttribute("aria-label", "Play trailer");
});

document.querySelector("[data-market-prev]")?.addEventListener("click", () => scrollTrack(marketTrack, -1));
document.querySelector("[data-market-next]")?.addEventListener("click", () => scrollTrack(marketTrack, 1));
document.querySelector("[data-collect-prev]")?.addEventListener("click", () => scrollTrack(collectTrack, -1));
document.querySelector("[data-collect-next]")?.addEventListener("click", () => scrollTrack(collectTrack, 1));

document.addEventListener("click", (event) => {
    const target = event.target;
    const searchButton = target.closest("[data-search-open]");

    if (searchButton) {
        openSearch();
        return;
    }

    const clickedHeader = target.closest("[data-site-header]");

    if (!clickedHeader) {
        closePanels();
        closeAccountMenu();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
        return;
    }

    closePanels();
    closeAccountMenu();

    if (!isHidden(searchOverlay)) {
        closeSearch();
    }
});

setHeroSlide(0);
