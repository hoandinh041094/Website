/* Sightcraft Analytics — tiny SVG chart engine.
   Line, bar (grouped/stacked), heatmap, sparkline, stat tiles.
   Colors resolve from CSS custom properties so charts follow the theme. */

const Charts = (() => {
  const registry = []; // {el, cfg, fn} — re-rendered on theme change

  const css = (name) =>
    getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const slot = (n) => css(`--s${n}`);

  // ---------------------------------------------------------- formatting
  function fmtCompact(v, prefix = "", dp = 0) {
    const a = Math.abs(v);
    if (a >= 1e6) return `${prefix}${(v / 1e6).toFixed(1).replace(/\.0$/, "")}M`;
    if (a >= 1e3) return `${prefix}${(v / 1e3).toFixed(1).replace(/\.0$/, "")}K`;
    return `${prefix}${v.toFixed(dp)}`;
  }
  function fmtFull(v, prefix = "", dp = 0) {
    return `${prefix}${v.toLocaleString(undefined,
      { minimumFractionDigits: dp, maximumFractionDigits: dp })}`;
  }

  // clean axis ticks: 0 / 1,000 / 2,000 …
  function niceStep(raw) {
    const mag = Math.pow(10, Math.floor(Math.log10(raw)));
    const norm = raw / mag;
    return (norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 5 ? 5 : 10) * mag;
  }
  function niceTicks(max, count = 4, lo = 0) {
    const step = niceStep((max - lo) / count);
    const start = Math.floor(lo / step) * step;
    const ticks = [];
    for (let t = start; t <= max + step * 0.999; t += step) ticks.push(+t.toFixed(6));
    return ticks;
  }
  // padded floor for narrow-range series (yMin: "auto")
  function autoFloor(min, max) {
    const span = (max - min) || Math.abs(max) * 0.1 || 1;
    const step = niceStep(span / 3);
    const lo = Math.floor((min - span * 0.08) / step) * step;
    return min >= 0 ? Math.max(0, lo) : lo;
  }

  // ------------------------------------------------------------ tooltip
  let tip;
  function ensureTip() {
    if (!tip) {
      tip = document.createElement("div");
      tip.id = "viz-tip";
      document.body.appendChild(tip);
    }
    return tip;
  }
  function showTip(html, x, y) {
    const t = ensureTip();
    t.innerHTML = html;
    t.style.display = "block";
    const r = t.getBoundingClientRect();
    let left = x + 14, top = y - r.height - 10;
    if (left + r.width > window.innerWidth - 8) left = x - r.width - 14;
    if (top < 8) top = y + 14;
    t.style.left = `${left}px`;
    t.style.top = `${top}px`;
  }
  function hideTip() { if (tip) tip.style.display = "none"; }

  function tipRows(title, rows) {
    const body = rows.map(r => `
      <div class="tip-row">
        <span class="k">${r.color ? `<span class="swatch" style="background:${r.color}"></span>` : ""}${r.name}</span>
        <span class="v">${r.value}</span>
      </div>`).join("");
    return `<div class="tip-title">${title}</div>${body}`;
  }

  // ------------------------------------------------------------- legend
  function legendHTML(series) {
    if (series.length < 2) return "";
    const keys = series.map(s =>
      `<span class="key"><span class="swatch" style="background:${slot(s.color)}"></span>${s.name}</span>`
    ).join("");
    return `<div class="legend">${keys}</div>`;
  }

  // ---------------------------------------------------------- sparkline
  function sparkSVG(values, color, w = 96, h = 28) {
    const min = Math.min(...values), max = Math.max(...values);
    const span = max - min || 1;
    const pts = values.map((v, i) => {
      const x = (i / (values.length - 1)) * (w - 8) + 4;
      const y = h - 4 - ((v - min) / span) * (h - 8);
      return [x, y];
    });
    const d = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join("");
    const [ex, ey] = pts[pts.length - 1];
    return `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" aria-hidden="true">
      <path d="${d}" fill="none" stroke="${color}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
      <circle cx="${ex}" cy="${ey}" r="3.5" fill="${color}" stroke="${css("--surface")}" stroke-width="2"/>
    </svg>`;
  }

  // ---------------------------------------------------------- stat tile
  function statTile(el, cfg) {
    const render = () => {
      const { label, value, delta, deltaLabel = "vs prior period", upIsGood = true, spark } = cfg;
      let deltaHTML = "";
      if (delta != null) {
        const up = delta >= 0;
        const good = up === upIsGood;
        deltaHTML = `<div class="delta ${good ? "up" : "down"}">${up ? "▲" : "▼"} ${Math.abs(delta).toFixed(1)}% <small>${deltaLabel}</small></div>`;
      }
      const sparkHTML = spark ? sparkSVG(spark, css("--accent")) : "";
      el.innerHTML = `<div class="label">${label}</div><div class="value">${value}</div>${deltaHTML}${sparkHTML}`;
    };
    registry.push(render);
    render();
  }

  // --------------------------------------------------------- line chart
  // cfg: {labels, series:[{name, color(slot#), values}], height, prefix, areaFill}
  function lineChart(el, cfg) {
    const render = () => {
      const { labels, series, height = 260, prefix = "", areaFill = false,
              decimals = 0, suffix = "", yMin = 0 } = cfg;
      const W = 720, H = height;
      const pad = { l: 46, r: 14, t: 12, b: 26 };
      const iw = W - pad.l - pad.r, ih = H - pad.t - pad.b;
      const allV = series.flatMap(s => s.values);
      const max = Math.max(...allV);
      const lo = yMin === "auto" ? autoFloor(Math.min(...allV), max) : yMin;
      const ticks = niceTicks(max, 4, lo);
      const top = ticks[ticks.length - 1];
      const bottom = ticks[0];
      const x = (i) => pad.l + (i / (labels.length - 1)) * iw;
      const y = (v) => pad.t + ih - ((v - bottom) / (top - bottom)) * ih;

      const grid = ticks.map(t => `
        <line x1="${pad.l}" y1="${y(t)}" x2="${W - pad.r}" y2="${y(t)}" stroke="${css("--grid")}" stroke-width="1"/>
        <text x="${pad.l - 8}" y="${y(t) + 4}" text-anchor="end" font-size="11" fill="${css("--muted")}">${fmtCompact(t, prefix, decimals)}${suffix}</text>`).join("");

      const everyN = Math.ceil(labels.length / 12);
      const xLabels = labels.map((l, i) => i % everyN ? "" : `
        <text x="${x(i)}" y="${H - 8}" text-anchor="middle" font-size="11" fill="${css("--muted")}">${l}</text>`).join("");

      const paths = series.map(s => {
        const c = slot(s.color);
        const d = s.values.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join("");
        const area = areaFill ? `<path d="${d} L${x(s.values.length - 1)},${y(bottom)} L${x(0)},${y(bottom)} Z" fill="${c}" opacity="0.1"/>` : "";
        const [ex, ey] = [x(s.values.length - 1), y(s.values[s.values.length - 1])];
        return `${area}<path d="${d}" fill="none" stroke="${c}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
          <circle cx="${ex}" cy="${ey}" r="4" fill="${c}" stroke="${css("--surface")}" stroke-width="2"/>`;
      }).join("");

      // direct label on the last point of the leading series only (selective)
      const lead = series[0];
      const endLabel = `<text x="${x(lead.values.length - 1) - 8}" y="${y(lead.values[lead.values.length - 1]) - 10}"
        text-anchor="end" font-size="11" font-weight="600" fill="${css("--ink")}">${fmtCompact(lead.values[lead.values.length - 1], prefix, decimals)}${suffix}</text>`;

      el.innerHTML = `${legendHTML(series)}
        <svg viewBox="0 0 ${W} ${H}" role="img">
          ${grid}
          <line x1="${pad.l}" y1="${y(bottom)}" x2="${W - pad.r}" y2="${y(bottom)}" stroke="${css("--baseline")}" stroke-width="1"/>
          ${xLabels}${paths}${endLabel}
          <line id="xh" x1="0" y1="${pad.t}" x2="0" y2="${pad.t + ih}" stroke="${css("--baseline")}" stroke-width="1" visibility="hidden"/>
          <rect x="${pad.l}" y="${pad.t}" width="${iw}" height="${ih}" fill="transparent"/>
        </svg>`;

      const svg = el.querySelector("svg");
      const hair = svg.querySelector("#xh");
      const hit = svg.lastElementChild;
      hit.addEventListener("mousemove", (e) => {
        const r = svg.getBoundingClientRect();
        const sx = (e.clientX - r.left) * (W / r.width);
        const i = Math.max(0, Math.min(labels.length - 1,
          Math.round(((sx - pad.l) / iw) * (labels.length - 1))));
        hair.setAttribute("x1", x(i)); hair.setAttribute("x2", x(i));
        hair.setAttribute("visibility", "visible");
        showTip(tipRows(labels[i], series.map(s => ({
          name: s.name, color: slot(s.color), value: fmtFull(s.values[i], prefix, decimals) + suffix
        }))), e.clientX, e.clientY);
      });
      hit.addEventListener("mouseleave", () => { hair.setAttribute("visibility", "hidden"); hideTip(); });
    };
    registry.push(render);
    render();
  }

  // ---------------------------------------------------------- bar chart
  // cfg: {labels, series:[{name,color,values}], stacked, height, prefix}
  function barChart(el, cfg) {
    const render = () => {
      const { labels, series, stacked = false, height = 260, prefix = "",
              decimals = 0, suffix = "" } = cfg;
      const W = 720, H = height;
      const pad = { l: 46, r: 14, t: 12, b: 26 };
      const iw = W - pad.l - pad.r, ih = H - pad.t - pad.b;
      const max = stacked
        ? Math.max(...labels.map((_, i) => series.reduce((a, s) => a + s.values[i], 0)))
        : Math.max(...series.flatMap(s => s.values));
      const ticks = niceTicks(max);
      const top = ticks[ticks.length - 1];
      const y = (v) => pad.t + ih - (v / top) * ih;
      const band = iw / labels.length;

      const grid = ticks.map(t => `
        <line x1="${pad.l}" y1="${y(t)}" x2="${W - pad.r}" y2="${y(t)}" stroke="${css("--grid")}" stroke-width="1"/>
        <text x="${pad.l - 8}" y="${y(t) + 4}" text-anchor="end" font-size="11" fill="${css("--muted")}">${fmtCompact(t, prefix)}${suffix}</text>`).join("");

      const xLabels = labels.map((l, i) => `
        <text x="${pad.l + band * (i + 0.5)}" y="${H - 8}" text-anchor="middle" font-size="11" fill="${css("--muted")}">${l}</text>`).join("");

      let bars = "";
      const hitRects = [];
      if (stacked) {
        const bw = Math.min(24, band * 0.55);
        labels.forEach((l, i) => {
          const cx = pad.l + band * (i + 0.5);
          let acc = 0;
          series.forEach((s, si) => {
            const v = s.values[i];
            const y0 = y(acc), y1 = y(acc + v);
            const gap = si < series.length - 1 ? 2 : 0; // 2px surface gap between segments
            const isTop = si === series.length - 1;
            const hgt = Math.max(0, y0 - y1 - gap);
            const r = isTop ? 4 : 0; // rounded data-end, square below
            bars += roundedTopRect(cx - bw / 2, y1 + gap * 0, bw, hgt, r, slot(s.color));
            acc += v;
          });
          hitRects.push({ x: cx - band / 2, i });
        });
      } else {
        const n = series.length;
        const bw = Math.min(24, (band * 0.72) / n);
        const groupW = bw * n + 2 * (n - 1);
        labels.forEach((l, i) => {
          const start = pad.l + band * (i + 0.5) - groupW / 2;
          series.forEach((s, si) => {
            const v = s.values[i];
            bars += roundedTopRect(start + si * (bw + 2), y(v), bw, y(0) - y(v), 4, slot(s.color));
          });
          hitRects.push({ x: pad.l + band * i, i });
        });
      }

      const hits = hitRects.map(h => `
        <rect class="hit" data-i="${h.i}" x="${stacked ? h.x : h.x}" y="${pad.t}" width="${band}" height="${ih}" fill="transparent"/>`).join("");

      el.innerHTML = `${legendHTML(series)}
        <svg viewBox="0 0 ${W} ${H}" role="img">
          ${grid}${bars}
          <line x1="${pad.l}" y1="${y(0)}" x2="${W - pad.r}" y2="${y(0)}" stroke="${css("--baseline")}" stroke-width="1"/>
          ${xLabels}${hits}
        </svg>`;

      el.querySelectorAll(".hit").forEach(r => {
        r.addEventListener("mousemove", (e) => {
          const i = +r.dataset.i;
          const rows = series.map(s => ({ name: s.name, color: slot(s.color), value: fmtFull(s.values[i], prefix, decimals) + suffix }));
          if (stacked && series.length > 1) {
            rows.push({ name: "Total", value: fmtFull(series.reduce((a, s) => a + s.values[i], 0), prefix, decimals) + suffix });
          }
          showTip(tipRows(labels[i], rows), e.clientX, e.clientY);
        });
        r.addEventListener("mouseleave", hideTip);
      });
    };
    registry.push(render);
    render();
  }

  function roundedTopRect(x, y, w, h, r, fill) {
    if (h <= 0) return "";
    r = Math.min(r, w / 2, h);
    return `<path d="M${x},${y + h} L${x},${y + r} Q${x},${y} ${x + r},${y}
      L${x + w - r},${y} Q${x + w},${y} ${x + w},${y + r} L${x + w},${y + h} Z" fill="${fill}"/>`;
  }

  // ----------------------------------------------------------- heatmap
  // cfg: {rows, cols, values[r][c], fmt}
  function heatmap(el, cfg) {
    const render = () => {
      const { rows, cols, values, fmt = (v) => v } = cfg;
      const ramp = [1, 2, 3, 4, 5, 6].map(n => css(`--heat-${n}`));
      const flat = values.flat();
      const min = Math.min(...flat), max = Math.max(...flat);
      const cellW = 100 / cols.length;
      const shade = (v) => ramp[Math.min(ramp.length - 1,
        Math.floor(((v - min) / (max - min || 1)) * ramp.length))];

      const head = `<tr><th></th>${cols.map(c => `<th style="text-align:center">${c}</th>`).join("")}</tr>`;
      const body = rows.map((r, ri) => `<tr>
        <td style="font-size:.78rem;color:var(--muted);padding:2px 8px 2px 0;white-space:nowrap">${r}</td>
        ${cols.map((c, ci) => {
          const v = values[ri][ci];
          return `<td class="hm-cell" data-r="${ri}" data-c="${ci}"
            style="background:${shade(v)};width:${cellW}%;height:30px;border:2px solid var(--surface);border-radius:4px;cursor:default"></td>`;
        }).join("")}
      </tr>`).join("");

      el.innerHTML = `<table style="width:100%;border-collapse:collapse">
        <thead style="font-size:.72rem;color:var(--muted)">${head}</thead><tbody>${body}</tbody></table>`;

      el.querySelectorAll(".hm-cell").forEach(td => {
        td.addEventListener("mousemove", (e) => {
          const v = values[+td.dataset.r][+td.dataset.c];
          showTip(tipRows(`${rows[+td.dataset.r]} · ${cols[+td.dataset.c]}`,
            [{ name: "Value", value: fmt(v) }]), e.clientX, e.clientY);
        });
        td.addEventListener("mouseleave", hideTip);
      });
    };
    registry.push(render);
    render();
  }

  // re-render everything when the OS theme flips
  window.matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => registry.forEach(fn => fn()));

  return { lineChart, barChart, heatmap, statTile, sparkSVG, fmtCompact, fmtFull, css, slot };
})();
