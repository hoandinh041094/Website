/* Sightcraft Analytics — shared site navigation.
   Usage: <div id="site-nav"></div><script src="assets/nav.js" data-base="" data-active="services"></script>
   data-base: "" at the site root, "../" one level down (dashboards/, reports/).
   data-active: "services" | "sales" | "finance" | "marketing" | "weekly" | "monthly" | "chatbot" | "platform" */

(function () {
  const script = document.currentScript;
  const base = script.dataset.base || "";
  const active = script.dataset.active || "";

  const DEMOS = [
    { key: "sales", href: "dashboards/sales.html", label: "Sales dashboard" },
    { key: "finance", href: "dashboards/finance.html", label: "Finance dashboard" },
    { key: "marketing", href: "dashboards/marketing.html", label: "Marketing dashboard" },
    { key: "weekly", href: "reports/weekly.html", label: "Weekly business review" },
    { key: "monthly", href: "reports/monthly-ops.html", label: "Monthly ops review" },
    { key: "chatbot", href: "chatbot.html", label: "AI data assistant" },
  ];
  const isDemoActive = DEMOS.some((d) => d.key === active);
  const cls = (on) => (on ? ' class="active"' : "");

  const html = `
<header class="nav">
  <div class="brand-group">
    <a class="brand" href="${base}index.html">Sightcraft<span>&nbsp;Analytics</span></a>
    <span class="status-pill"><span class="live-dot"></span>pipeline: live</span>
  </div>
  <nav>
    <a href="${base}index.html#services"${cls(active === "services")}>Overview</a>
    <div class="nav-dropdown${isDemoActive ? " open-active" : ""}">
      <button type="button" class="nav-dd-btn${isDemoActive ? " active" : ""}">
        Demos <span class="caret">&#9662;</span>
      </button>
      <div class="nav-dd-menu">
        ${DEMOS.map((d) => `<a href="${base}${d.href}"${cls(active === d.key)}>${d.label}</a>`).join("")}
      </div>
    </div>
    <a href="${base}platform.html"${cls(active === "platform")}>Platform</a>
    <a class="nav-cta" href="${base}index.html#contact">Contact</a>
  </nav>
</header>`.trim();

  const mount = document.getElementById("site-nav");
  mount.outerHTML = html;

  const dd = document.querySelector(".nav-dropdown");
  const btn = dd.querySelector(".nav-dd-btn");
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    dd.classList.toggle("open");
  });
  document.addEventListener("click", () => dd.classList.remove("open"));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") dd.classList.remove("open");
  });
})();
