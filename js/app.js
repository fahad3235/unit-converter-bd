/* Unit Converter BD app logic: tabs, selects, validation, live conversion. */

(function () {
  "use strict";

  const state = { cat: "land", lang: "en", precision: 3 };

  const $ = (id) => document.getElementById(id);
  const els = {
    title: $("app-title"), tagline: $("app-tagline"), langBtn: $("lang-toggle"),
    tabs: document.querySelectorAll("#cat-tabs .tab"),
    amount: $("amount"), fromSel: $("from-unit"), toSel: $("to-unit"),
    swap: $("swap"), precision: $("precision"),
    result: $("result"), error: $("error"),
    refBody: document.querySelector("#ref-table tbody"),
    note: $("cat-note"),
  };

  const t = (key) => (I18N[state.lang] && I18N[state.lang][key]) || I18N.en[key] || key;
  const unitName = (key) => FACTORS[state.cat].units[key][state.lang] || FACTORS[state.cat].units[key].en;
  const baseName = () => FACTORS[state.cat].base[state.lang] || FACTORS[state.cat].base.en;

  function fillSelect(sel, selected) {
    sel.innerHTML = "";
    Object.keys(FACTORS[state.cat].units).forEach((key) => {
      const opt = document.createElement("option");
      opt.value = key;
      opt.textContent = unitName(key);
      if (key === selected) opt.selected = true;
      sel.appendChild(opt);
    });
  }

  function fmt(n) {
    const p = state.precision;
    // Avoid "-0" and strip needless zeros for readability
    let s = Number(n.toFixed(p)).toString();
    return s === "-0" ? "0" : s;
  }

  function convert(fromKey, toKey, rawValue) {
    const from = FACTORS[state.cat].units[fromKey];
    const to = FACTORS[state.cat].units[toKey];
    return rawValue * from.toBase / to.toBase;
  }

  function validate(raw) {
    const trimmed = raw.trim();
    if (trimmed === "") return { error: t("err_empty") };
    if (!/^[+-]?(\d+\.?\d*|\.\d+)$/.test(trimmed)) return { error: t("err_invalid") };
    const v = parseFloat(trimmed);
    if (!isFinite(v)) return { error: t("err_invalid") };
    if (v < 0) return { error: t("err_negative") };
    return { value: v };
  }

  function renderResult() {
    const check = validate(els.amount.value);
    if (check.error) {
      els.error.textContent = check.error;
      els.error.hidden = false;
      els.result.textContent = "";
      return;
    }
    els.error.hidden = true;
    const from = els.fromSel.value, to = els.toSel.value;
    const out = convert(from, to, check.value);
    els.result.innerHTML =
      `<strong>${fmt(check.value)} ${unitName(from)}</strong> ${t("equals")} <strong>${fmt(out)} ${unitName(to)}</strong>`;
  }

  function renderReference() {
    els.refBody.innerHTML = "";
    Object.entries(FACTORS[state.cat].units).forEach(([key, u]) => {
      const tr = document.createElement("tr");
      const tdU = document.createElement("td"); tdU.textContent = unitName(key);
      const tdB = document.createElement("td");
      tdB.textContent = `1 ${unitName(key)} = ${u.toBase} ${baseName()}`;
      tr.appendChild(tdU); tr.appendChild(tdB);
      els.refBody.appendChild(tr);
    });
    els.note.textContent = t(FACTORS[state.cat].noteKey);
  }

  function renderStaticText() {
    document.documentElement.lang = state.lang;
    els.title.textContent = t("app_title");
    els.tagline.textContent = t("app_tagline");
    els.langBtn.textContent = state.lang === "en" ? "বাংলা" : "English";
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = t(el.dataset.i18n);
    });
  }

  function setCategory(cat) {
    state.cat = cat;
    els.tabs.forEach((b) => {
      const on = b.dataset.cat === cat;
      b.classList.toggle("active", on);
      b.setAttribute("aria-selected", on ? "true" : "false");
    });
    fillSelect(els.fromSel, DEFAULT_UNITS[cat].from);
    fillSelect(els.toSel, DEFAULT_UNITS[cat].to);
    renderReference();
    renderResult();
  }

  function setLanguage(lang) {
    state.lang = lang;
    const from = els.fromSel.value, to = els.toSel.value;
    renderStaticText();
    fillSelect(els.fromSel, from);
    fillSelect(els.toSel, to);
    renderReference();
    renderResult();
  }

  // Events
  els.tabs.forEach((b) => b.addEventListener("click", () => setCategory(b.dataset.cat)));
  els.langBtn.addEventListener("click", () => setLanguage(state.lang === "en" ? "bn" : "en"));
  ["input", "change"].forEach((ev) => {
    els.amount.addEventListener(ev, renderResult);
    els.fromSel.addEventListener(ev, renderResult);
    els.toSel.addEventListener(ev, renderResult);
  });
  els.swap.addEventListener("click", () => {
    const f = els.fromSel.value;
    els.fromSel.value = els.toSel.value;
    els.toSel.value = f;
    renderResult();
  });
  els.precision.addEventListener("change", () => {
    state.precision = parseInt(els.precision.value, 10);
    renderResult();
  });

  // Init
  renderStaticText();
  setCategory("land");
})();
