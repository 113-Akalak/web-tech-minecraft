(() => {
    const q = (s, p = document) => p.querySelector(s);
    const qa = (s, p = document) => [...p.querySelectorAll(s)];
    const hide = (el) => el?.setAttribute("hidden", "");
    const show = (el) => el?.removeAttribute("hidden");
    const setOpen = (el, on) => el?.setAttribute("aria-expanded", on);
    const close = () => {
        qa("[data-panel-trigger], [data-account-toggle], [data-search-open]").forEach((el) => setOpen(el, false));
        qa("[data-panel], [data-account-menu], [data-search-overlay]").forEach(hide);
    };
    const closeMenu = () => {
        close();
        q("[data-nav-menu]")?.classList.remove("is-open");
        q("[data-menu-toggle]")?.setAttribute("aria-expanded", false);
        document.body.classList.remove("is-menu-open");
    };

    q("[data-menu-toggle]")?.addEventListener("click", (e) => {
        const menu = q("[data-nav-menu]");
        const on = menu.classList.toggle("is-open");
        setOpen(e.currentTarget, on);
        document.body.classList.toggle("is-menu-open", on);
        if (!on) close();
    });

    document.addEventListener("click", (e) => {
        const t = e.target;
        const nav = t.closest("[data-panel-trigger]");
        const mega = t.closest("[data-mega-tab]");
        const account = t.closest("[data-account-toggle]");
        const search = t.closest("[data-search-open]");
        const hero = t.closest(".hero-tab");
        const trailer = t.closest(".trailer-tab");
        const toggle = t.closest("[data-trailer-toggle]");
        const scroll = t.closest("[data-scroll-track]");
        const back = t.closest("[data-mobile-back]");

        if (back) {
            close();
        } else if (nav) {
            const panel = q(`[data-panel="${nav.dataset.panelTrigger}"]`);
            const on = panel?.hasAttribute("hidden");
            close();
            if (on) show(panel);
            setOpen(nav, !!on);
        } else if (mega) {
            const box = mega.closest(".mega-shell");
            qa("[data-mega-tab]", box).forEach((el) => {
                const on = el === mega;
                el.classList.toggle("is-active", on);
                el.setAttribute("aria-selected", on);
            });
            qa("[data-mega-panel]", box).forEach((el) => el.classList.toggle("is-active", el.dataset.megaPanel === mega.dataset.megaTab));
        } else if (account) {
            const menu = q("[data-account-menu]");
            const on = menu?.hasAttribute("hidden");
            close();
            if (on) show(menu);
            setOpen(account, !!on);
        } else if (search) {
            const overlay = q("[data-search-overlay]");
            const on = overlay?.hasAttribute("hidden");
            close();
            if (on) {
                show(overlay);
                q("input", overlay)?.focus();
            }
            setOpen(search, !!on);
        } else if (hero) {
            const media = q("[data-hero-media]");
            q("[data-hero-title]").textContent = hero.dataset.title;
            q("[data-hero-copy]").textContent = hero.dataset.copy;
            q("[data-hero-link]").textContent = hero.dataset.cta;
            q("[data-hero-link]").href = hero.dataset.href;
            media.dataset.theme = hero.dataset.theme;
            media.classList.toggle("is-video", hero.dataset.video === "true");
            if (hero.dataset.image) media.style.setProperty("--hero-image", `url("${hero.dataset.image}")`);
            const video = q(".hero-video");
            hero.dataset.video === "true" ? video?.play().catch(() => { }) : video?.pause();
            qa(".hero-tab").forEach((el) => {
                const on = el === hero;
                el.classList.toggle("is-active", on);
                el.setAttribute("aria-selected", on);
            });
        } else if (trailer) {
            q("[data-trailer-title]").textContent = trailer.dataset.title;
            q("[data-trailer-copy]").textContent = trailer.dataset.copy;
            q("[data-trailer-note]").textContent = trailer.dataset.note;
            q("[data-trailer-link]").textContent = trailer.dataset.cta;
            q("[data-trailer-link]").href = trailer.dataset.href;
            q("[data-trailer-youtube]").href = trailer.dataset.youtube;
            const video = q("[data-trailer-video]");
            if (video.src !== new URL(trailer.dataset.video, location.href).href) {
                video.src = trailer.dataset.video;
                video.play().catch(() => { });
            }
            q("[data-trailer-toggle]")?.classList.remove("is-paused");
            qa(".trailer-tab").forEach((el) => el.classList.toggle("is-active", el === trailer));
        } else if (toggle) {
            const video = q("[data-trailer-video]");
            const paused = video.paused;
            paused ? video.play().catch(() => { }) : video.pause();
            toggle.classList.toggle("is-paused", !paused);
            toggle.setAttribute("aria-label", paused ? "Pause trailer" : "Play trailer");
        } else if (scroll) {
            const track = q(scroll.dataset.scrollTrack);
            const dir = scroll.dataset.scrollDir === "prev" ? -1 : 1;
            track?.scrollBy({ left: dir * Math.max(220, track.clientWidth * .72), behavior: "smooth" });
        } else if (!t.closest("[data-site-header]")) {
            closeMenu();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeMenu();
    });
})();
