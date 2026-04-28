(function () {
  const digest = window.NEWSAI_DIGEST;
  const topicLabels = {
    products: "Продукты",
    policy: "Регулирование",
    research: "Исследования",
    market: "Рынок"
  };

  const issueDate = document.querySelector("#issue-date");
  const issueLabel = document.querySelector("#issue-label");
  const issueTitle = document.querySelector("#issue-title");
  const issueSummary = document.querySelector("#issue-summary");
  const issueCaption = document.querySelector("#issue-caption");
  const leadStory = document.querySelector("#lead-story");
  const radarList = document.querySelector("#radar-list");
  const sourceList = document.querySelector("#source-list");
  const newsGrid = document.querySelector("#news-grid");
  const newsCount = document.querySelector("#news-count");
  const signalGrid = document.querySelector("#signal-grid");
  const filters = Array.from(document.querySelectorAll(".filter"));

  let activeTopic = "all";

  function topicTag(topic) {
    return `<span class="tag ${topic}">${topicLabels[topic] || topic}</span>`;
  }

  function sourceMarkup(item) {
    if (!item.url) {
      return "";
    }

    return `<a class="source-link" href="${item.url}" target="_blank" rel="noreferrer">Источник</a>`;
  }

  function renderIssue() {
    issueDate.textContent = digest.dateLabel;
    issueLabel.textContent = digest.label;
    issueTitle.textContent = digest.title;
    issueSummary.textContent = digest.summary;
    issueCaption.textContent = digest.caption;
  }

  function renderLead() {
    const item = digest.lead;

    leadStory.innerHTML = `
      <div class="headline-media">
        <img src="${item.image}" alt="${item.imageAlt}">
      </div>
      <div class="headline-body">
        <div class="meta-row">
          ${topicTag(item.topic)}
          <span>${item.source}</span>
          <span>${item.readTime}</span>
        </div>
        <h2 id="lead-story-title">${item.title}</h2>
        <p>${item.summary}</p>
        ${sourceMarkup(item)}
      </div>
    `;
  }

  function renderRadar() {
    radarList.innerHTML = digest.radar
      .map((item) => `
        <div>
          <dt>${item.value}</dt>
          <dd>${item.label}</dd>
        </div>
      `)
      .join("");
  }

  function renderSources() {
    sourceList.innerHTML = digest.sources
      .map((source) => `<span class="source-chip">${source}</span>`)
      .join("");
  }

  function renderNews() {
    const items = activeTopic === "all"
      ? digest.items
      : digest.items.filter((item) => item.topic === activeTopic);

    newsCount.textContent = `${items.length} ${items.length === 1 ? "материал" : "материалов"}`;
    newsGrid.innerHTML = items
      .map((item) => `
        <article class="news-card">
          <img src="${item.image}" alt="${item.imageAlt}">
          <div class="news-card-body">
            <div class="card-meta">
              ${topicTag(item.topic)}
              <span>${item.source}</span>
            </div>
            <h3>${item.title}</h3>
            <p>${item.summary}</p>
          </div>
        </article>
      `)
      .join("");
  }

  function renderSignals() {
    signalGrid.innerHTML = digest.signals
      .map((item) => `
        <article class="signal-card">
          <span class="signal-accent" aria-hidden="true"></span>
          <h3>${item.title}</h3>
          <p>${item.summary}</p>
        </article>
      `)
      .join("");
  }

  function bindFilters() {
    filters.forEach((filter) => {
      filter.addEventListener("click", () => {
        activeTopic = filter.dataset.topic;
        filters.forEach((item) => item.classList.toggle("is-active", item === filter));
        renderNews();
      });
    });
  }

  renderIssue();
  renderLead();
  renderRadar();
  renderSources();
  renderNews();
  renderSignals();
  bindFilters();
})();
