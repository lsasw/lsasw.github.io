(function () {
  function normalize(value) {
    return String(value || "").trim().toLowerCase();
  }

  function tokenize(query) {
    return normalize(query).split(/\s+/).filter(Boolean);
  }

  function scorePost(post, terms) {
    const title = normalize(post.title);
    const summary = normalize(post.summary);
    const content = normalize(post.content);

    return terms.reduce(function (score, term) {
      if (title.includes(term)) score += 8;
      if (summary.includes(term)) score += 4;
      if (content.includes(term)) score += 2;
      return score;
    }, 0);
  }

  function search(query) {
    const terms = tokenize(query);
    if (!terms.length) return [];

    return (window.BLOG_SEARCH_INDEX || [])
      .map(function (post) {
        return { post: post, score: scorePost(post, terms) };
      })
      .filter(function (item) {
        return item.score > 0;
      })
      .sort(function (a, b) {
        return b.score - a.score;
      })
      .map(function (item) {
        return item.post;
      });
  }

  function renderResults(query) {
    const list = document.querySelector("[data-search-results]");
    const status = document.querySelector("[data-search-status]");
    if (!list || !status) return;

    const results = search(query);
    list.innerHTML = "";

    if (!normalize(query)) {
      status.textContent = "输入关键词开始搜索。";
      return;
    }

    if (!results.length) {
      status.textContent = "没有找到相关文章。";
      return;
    }

    status.textContent = "找到 " + results.length + " 篇相关文章。";
    results.forEach(function (post) {
      const item = document.createElement("li");
      item.innerHTML =
        "<time>" +
        post.date +
        "</time><a href=\"" +
        post.url +
        "\">" +
        post.title +
        "</a><p>" +
        post.summary +
        "</p>";
      list.appendChild(item);
    });
  }

  function initSearchPage() {
    const input = document.querySelector("#search-query");
    if (!input) return;

    const params = new URLSearchParams(window.location.search);
    const initialQuery = params.get("q") || "";
    input.value = initialQuery;
    renderResults(initialQuery);

    input.addEventListener("input", function () {
      renderResults(input.value);
    });
  }

  function initHeaderSearch() {
    document.querySelectorAll(".site-search").forEach(function (form) {
      form.addEventListener("submit", function (event) {
        const input = form.querySelector("input[name='q']");
        const query = input ? input.value.trim() : "";
        if (!query) return;

        event.preventDefault();
        window.location.href = "/search.html?q=" + encodeURIComponent(query);
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initHeaderSearch();
    initSearchPage();
  });
})();
