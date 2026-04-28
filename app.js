(function () {
  if (!window.NEWSAI_DIGEST) {
    document.querySelector("#issue-title").textContent = "Данные выпуска не загружены";
    document.querySelector("#issue-summary").textContent =
      "Попробуйте обновить страницу или зайдите позже.";
    return;
  }

  const digest = window.NEWSAI_DIGEST;

  function esc(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

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
    return '<span class="tag ' + esc(topic) + '">' + esc(topicLabels[topic] || topic) + "</span>";
  }

  function sourceMarkup(item) {
    if (!item.url) {
      return "";
    }
    return (
      '<a class="source-link" href="' +
      esc(item.url) +
      '" target="_blank" rel="noreferrer">Источник</a>'
    );
  }

  function renderIssue() {
    issueDate.textContent = digest.dateLabel;
    issueLabel.textContent = digest.label;
    issueTitle.textContent = digest.title;
    issueSummary.textContent = digest.summary;
    issueCaption.textContent = digest.caption;
  }

  function renderLead() {
    var item = digest.lead;
    leadStory.innerHTML =
      '<div class="headline-media">' +
      '<img src="' +
      esc(item.image) +
      '" alt="' +
      esc(item.imageAlt) +
      '" loading="eager">' +
      "</div>" +
      '<div class="headline-body">' +
      '<div class="meta-row">' +
      topicTag(item.topic) +
      "<span>" +
      esc(item.source) +
      "</span>" +
      "<span>" +
      esc(item.readTime) +
      "</span>" +
      "</div>" +
      '<h2 id="lead-story-title">' +
      esc(item.title) +
      "</h2>" +
      "<p>" +
      esc(item.summary) +
      "</p>" +
      sourceMarkup(item) +
      "</div>";
  }

  function renderRadar() {
    radarList.innerHTML = digest.radar
      .map(function (item) {
        return "<div><dt>" + esc(item.value) + "</dt><dd>" + esc(item.label) + "</dd></div>";
      })
      .join("");
  }

  function renderSources() {
    sourceList.innerHTML = digest.sources
      .map(function (source) {
        return '<span class="source-chip">' + esc(source) + "</span>";
      })
      .join("");
  }

  function renderNews() {
    var items =
      activeTopic === "all"
        ? digest.items
        : digest.items.filter(function (item) {
            return item.topic === activeTopic;
          });

    var count = items.length;
    newsCount.textContent = count + " " + (count === 1 ? "материал" : "материалов");
    newsGrid.innerHTML = items
      .map(function (item) {
        return (
          '<article class="news-card">' +
          '<img src="' +
          esc(item.image) +
          '" alt="' +
          esc(item.imageAlt) +
          '" loading="lazy">' +
          '<div class="news-card-body">' +
          '<div class="card-meta">' +
          topicTag(item.topic) +
          "<span>" +
          esc(item.source) +
          "</span>" +
          "</div>" +
          "<h3>" +
          esc(item.title) +
          "</h3>" +
          "<p>" +
          esc(item.summary) +
          "</p>" +
          sourceMarkup(item) +
          "</div>" +
          "</article>"
        );
      })
      .join("");
  }

  function renderSignals() {
    signalGrid.innerHTML = digest.signals
      .map(function (item) {
        return (
          '<article class="signal-card">' +
          '<span class="signal-accent" aria-hidden="true"></span>' +
          "<h3>" +
          esc(item.title) +
          "</h3>" +
          "<p>" +
          esc(item.summary) +
          "</p>" +
          "</article>"
        );
      })
      .join("");
  }

  function bindFilters() {
    filters.forEach(function (filter) {
      filter.addEventListener("click", function () {
        activeTopic = filter.dataset.topic;
        filters.forEach(function (item) {
          item.classList.toggle("is-active", item === filter);
        });
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
