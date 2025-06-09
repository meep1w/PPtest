// === ДАННЫЕ ДЛЯ ТЕСТА ===
const divisions = [
  { id: "bronze", name: "Бронза" },
  { id: "silver", name: "Серебро" },
  { id: "gold", name: "Золото" },
  { id: "platinum", name: "Платина" },
  { id: "elite", name: "Элита" }
];

const mockData = {
  bronze: {
    totalFD: 23400000,
    yourRank: 23,
    top3: [
      { user: "BronzeTop1", points: 1450000 },
      { user: "BronzeTop2", points: 1394000 },
      { user: "BronzeTop3", points: 1240000 },
    ],
    rest: Array.from({ length: 97 }, (_, i) => ({
      place: i + 4,
      user: `BronzeUser${i + 4}`,
      points: Math.floor(1000000 - i * 5000),
    }))
  },
  silver: {
    totalFD: 46800000,
    yourRank: 8,
    top3: [
      { user: "SilverTop1", points: 2450000 },
      { user: "SilverTop2", points: 2394000 },
      { user: "SilverTop3", points: 2240000 },
    ],
    rest: Array.from({ length: 97 }, (_, i) => ({
      place: i + 4,
      user: `SilverUser${i + 4}`,
      points: Math.floor(2000000 - i * 10000),
    }))
  },
  // остальные дивизионы по аналогии...
};

// === ЭЛЕМЕНТЫ ===
const tabsContainer = document.getElementById("division-tabs");
const ratingList = document.getElementById("rating-list");
const totalFD = document.getElementById("total-fd");
const yourRank = document.getElementById("your-rank");

// === УТИЛИТЫ ===
function formatNumber(n) {
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + "B";
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1000) return Math.floor(n / 1000) + "K";
  return n.toString();
}

// === ГЕНЕРАЦИЯ ТАБОВ ===
function renderTabs() {
  divisions.forEach((div, index) => {
    const btn = document.createElement("button");
    btn.className = "rating-division-btn";
    btn.innerText = div.name;
    btn.dataset.id = div.id;
    if (index === 0) btn.classList.add("active");
    tabsContainer.appendChild(btn);
  });
}

// === РЕНДЕР ДАННЫХ ===
function renderDivision(id) {
  const data = mockData[id];
  if (!data) return;

  yourRank.textContent = "#" + data.yourRank;
  totalFD.textContent = formatNumber(data.totalFD);
  ratingList.innerHTML = "";

  const top3Wrapper = document.createElement("div");
  top3Wrapper.className = "top-3";

  data.top3.forEach((item, idx) => {
    const div = document.createElement("div");
    div.className = "top-card";
    div.innerHTML = `
      <span class="place">#${idx + 1}</span>
      <span class="user">${item.user}</span>
      <span class="points">${formatNumber(item.points)}</span>
    `;
    top3Wrapper.appendChild(div);
  });

  ratingList.appendChild(top3Wrapper);

  data.rest.forEach(item => {
    const div = document.createElement("div");
    div.className = "rating-card";
    div.innerHTML = `
      <span class="place">#${item.place}</span>
      <span class="user">${item.user}</span>
      <span class="points">${formatNumber(item.points)}</span>
    `;
    ratingList.appendChild(div);
  });
}

// === СОБЫТИЯ ===
tabsContainer.addEventListener("click", e => {
  const btn = e.target.closest(".rating-division-btn");
  if (!btn) return;

  [...tabsContainer.children].forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  const id = btn.dataset.id;
  renderDivision(id);
});

// === ИНИЦИАЛИЗАЦИЯ ===
renderTabs();
renderDivision(divisions[0].id);
