const TRACK_SCROLL_FACTOR = 0.72;
const TRACK_SCROLL_MIN_WIDTH = 220;
const TOGGLE_CLASS = {
    active: "is-active",
    open: "is-open",
    paused: "is-paused",
};
const HIDDEN_ATTR = "hidden";

const SEL = {
    menuToggle: "[data-menu-toggle]",
    navMenu: "[data-nav-menu]",
    panelTrigger: "[data-panel-trigger]",
    panel: "[data-panel]",
    megaTab: "[data-mega-tab]",
    megaPanel: "[data-mega-panel]",
    accountToggle: "[data-account-toggle]",
    accountMenu: "[data-account-menu]",
    searchOverlay: "[data-search-overlay]",
    searchOpen: "[data-search-open]",
    searchClose: "[data-search-close]",
    heroMedia: "[data-hero-media]",
    heroVideo: ".hero-video",
    heroTab: "[data-slide]",
    heroTitle: "[data-hero-title]",
    heroCopy: "[data-hero-copy]",
    heroLink: "[data-hero-link]",
    trailerTab: "[data-trailer]",
    trailerVideo: "[data-trailer-video]",
    trailerToggle: "[data-trailer-toggle]",
    trailerTitle: "[data-trailer-title]",
    trailerCopy: "[data-trailer-copy]",
    trailerNote: "[data-trailer-note]",
    trailerLink: "[data-trailer-link]",
    trailerYouTube: "[data-trailer-youtube]",
    siteHeader: "[data-site-header]",
    marketPrev: "[data-market-prev]",
    marketNext: "[data-market-next]",
    collectPrev: "[data-collect-prev]",
    collectNext: "[data-collect-next]",
    marketTrack: "[data-market-track]",
    collectTrack: "[data-collect-track]",
};

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

const el = {
    menuToggle: document.querySelector(SEL.menuToggle),
    navMenu: document.querySelector(SEL.navMenu),
    panelTriggers: document.querySelectorAll(SEL.panelTrigger),
    panels: document.querySelectorAll(SEL.panel),
    megaTabs: document.querySelectorAll(SEL.megaTab),
    megaPanels: document.querySelectorAll(SEL.megaPanel),
    accountToggle: document.querySelector(SEL.accountToggle),
    accountMenu: document.querySelector(SEL.accountMenu),
    searchOverlay: document.querySelector(SEL.searchOverlay),
    searchOpen: document.querySelector(SEL.searchOpen),
    searchClose: document.querySelector(SEL.searchClose),
    hero: {
        container: document.querySelector(SEL.heroMedia),
        media: document.querySelector(SEL.heroVideo),
        tabs: document.querySelectorAll(SEL.heroTab),
        title: document.querySelector(SEL.heroTitle),
        copy: document.querySelector(SEL.heroCopy),
        link: document.querySelector(SEL.heroLink),
    },
    trailer: {
        tabs: document.querySelectorAll(SEL.trailerTab),
        video: document.querySelector(SEL.trailerVideo),
        toggle: document.querySelector(SEL.trailerToggle),
        title: document.querySelector(SEL.trailerTitle),
        copy: document.querySelector(SEL.trailerCopy),
        note: document.querySelector(SEL.trailerNote),
        link: document.querySelector(SEL.trailerLink),
        youtube: document.querySelector(SEL.trailerYouTube),
    },
    tracks: {
        market: document.querySelector(SEL.marketTrack),
        collect: document.querySelector(SEL.collectTrack),
    },
    controls: {
        marketPrev: document.querySelector(SEL.marketPrev),
        marketNext: document.querySelector(SEL.marketNext),
        collectPrev: document.querySelector(SEL.collectPrev),
        collectNext: document.querySelector(SEL.collectNext),
    },
    siteHeader: document.querySelector(SEL.siteHeader),
};

const ensureText = (element, value) => {
    if (element) {
        element.textContent = value;
    }
};

const ensureHref = (element, value) => {
    if (element) {
        element.href = value;
    }
};

const isHidden = (element) => element?.hasAttribute(HIDDEN_ATTR) ?? true;
const showElement = (element) => {
    element?.removeAttribute(HIDDEN_ATTR);
};

const hideElement = (element) => {
    element?.setAttribute(HIDDEN_ATTR, "");
};

const closePanels = () => {
    el.panelTriggers.forEach((trigger) => {
        trigger.setAttribute("aria-expanded", "false");
    });

    el.panels.forEach((panel) => {
        hideElement(panel);
    });
};

const closeSearch = () => {
    if (!el.searchOverlay) {
        return;
    }

    hideElement(el.searchOverlay);
    el.searchOpen?.setAttribute("aria-expanded", "false");
};

const closeAccountMenu = () => {
    if (!el.accountMenu) {
        return;
    }

    hideElement(el.accountMenu);
    el.accountToggle?.setAttribute("aria-expanded", "false");
};

const toggleMenu = () => {
    const isOpen = el.navMenu.classList.toggle(TOGGLE_CLASS.open);
    el.menuToggle?.setAttribute("aria-expanded", String(isOpen));
};

const togglePanel = (name, trigger) => {
    const nextPanel = document.querySelector(`[data-panel="${name}"]`);
    const willOpen = isHidden(nextPanel);

    closePanels();
    closeAccountMenu();
    closeSearch();

    if (!willOpen) {
        return;
    }

    showElement(nextPanel);
    trigger.setAttribute("aria-expanded", "true");
};

const toggleAccountMenu = () => {
    const willOpen = isHidden(el.accountMenu);
    closePanels();
    closeSearch();

    if (willOpen) {
        showElement(el.accountMenu);
    } else {
        hideElement(el.accountMenu);
    }

    el.accountToggle?.setAttribute("aria-expanded", String(willOpen));
};

const openSearch = () => {
    const willOpen = isHidden(el.searchOverlay);

    closePanels();
    closeAccountMenu();

    if (willOpen) {
        showElement(el.searchOverlay);
        el.searchOverlay.querySelector("input")?.focus();
    } else {
        hideElement(el.searchOverlay);
    }

    el.searchOpen?.setAttribute("aria-expanded", String(willOpen));
};

const setMegaTab = (tab) => {
    const panelName = tab.dataset.megaTab;

    el.megaTabs.forEach((item) => {
        const isActive = item === tab;
        item.classList.toggle(TOGGLE_CLASS.active, isActive);
        item.setAttribute("aria-selected", String(isActive));
    });

    el.megaPanels.forEach((panel) => {
        panel.classList.toggle(TOGGLE_CLASS.active, panel.dataset.megaPanel === panelName);
    });
};

const setHeroSlide = (index) => {
    const slide = heroSlides[index];

    ensureText(el.hero.title, slide.title);
    ensureText(el.hero.copy, slide.copy);
    ensureText(el.hero.link, slide.cta);
    ensureHref(el.hero.link, slide.href);

    el.hero.container?.classList.toggle("is-video", slide.video);
    if (el.hero.container) {
        el.hero.container.dataset.theme = slide.theme;
    }

    if (slide.video) {
        el.hero.media?.play().catch(() => {});
    } else {
        el.hero.container?.style.setProperty("--hero-image", `url("${slide.image}")`);
        el.hero.media?.pause();
    }

    el.hero.tabs.forEach((tab) => {
        const isActive = Number(tab.dataset.slide) === index;
        tab.classList.toggle(TOGGLE_CLASS.active, isActive);
        tab.setAttribute("aria-selected", String(isActive));
    });
};

const setTrailer = (key) => {
    const content = trailerContent[key];

    ensureText(el.trailer.title, content.title);
    ensureText(el.trailer.copy, content.copy);
    ensureText(el.trailer.note, content.note);
    ensureText(el.trailer.link, content.cta);
    ensureHref(el.trailer.link, content.href);
    ensureHref(el.trailer.youtube, content.youtube);

    if (el.trailer.video && el.trailer.video.getAttribute("src") !== content.video) {
        el.trailer.video.src = content.video;
        el.trailer.video.load();
        el.trailer.video.play().catch(() => {});
        el.trailer.toggle?.classList.remove(TOGGLE_CLASS.paused);
        el.trailer.toggle?.setAttribute("aria-label", "Pause trailer");
    }

    el.trailer.tabs.forEach((tab) => {
        tab.classList.toggle(TOGGLE_CLASS.active, tab.dataset.trailer === key);
    });
};

const scrollTrack = (track, direction) => {
    if (!track) {
        return;
    }

    const delta = direction * Math.max(TRACK_SCROLL_MIN_WIDTH, Math.round(track.clientWidth * TRACK_SCROLL_FACTOR));
    track.scrollBy({
        left: delta,
        behavior: "smooth",
    });
};

el.menuToggle?.addEventListener("click", toggleMenu);

el.panelTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
        togglePanel(trigger.dataset.panelTrigger, trigger);
    });
});

el.megaTabs.forEach((tab) => {
    tab.addEventListener("click", () => setMegaTab(tab));
});

el.accountToggle?.addEventListener("mousedown", (event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleAccountMenu();
});

el.accountToggle?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") {
        return;
    }

    event.preventDefault();
    event.stopPropagation();
    toggleAccountMenu();
});

el.searchClose?.addEventListener("click", closeSearch);

el.hero.tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        setHeroSlide(Number(tab.dataset.slide));
    });
});

el.trailer.tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        setTrailer(tab.dataset.trailer);
    });
});

el.trailer.toggle?.addEventListener("click", () => {
    if (el.trailer.video?.paused) {
        el.trailer.video.play().catch(() => {});
        el.trailer.toggle?.classList.remove(TOGGLE_CLASS.paused);
        el.trailer.toggle.setAttribute("aria-label", "Pause trailer");
        return;
    }

    el.trailer.video?.pause();
    el.trailer.toggle?.classList.add(TOGGLE_CLASS.paused);
    el.trailer.toggle?.setAttribute("aria-label", "Play trailer");
});

el.controls.marketPrev?.addEventListener("click", () => {
    scrollTrack(el.tracks.market, -1);
});
el.controls.marketNext?.addEventListener("click", () => {
    scrollTrack(el.tracks.market, 1);
});
el.controls.collectPrev?.addEventListener("click", () => {
    scrollTrack(el.tracks.collect, -1);
});
el.controls.collectNext?.addEventListener("click", () => {
    scrollTrack(el.tracks.collect, 1);
});

document.addEventListener("click", (event) => {
    const target = event.target;
    const searchButton = target.closest(SEL.searchOpen);

    if (searchButton) {
        openSearch();
        return;
    }

    const clickedHeader = target.closest(SEL.siteHeader);
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

    if (!isHidden(el.searchOverlay)) {
        closeSearch();
    }
});

setHeroSlide(0);
