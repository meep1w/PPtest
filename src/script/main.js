// =============== ГЛОБАЛЬНЫЕ НАСТРОЙКИ ===================
const tg = window.Telegram?.WebApp || {};
// === Управление видимостью навбара ===
const navbar = document.querySelector('.bottom-navbar');


function toggleNavbar(hidden) {
  if (hidden) {
    navbar.style.pointerEvents = 'none';
    navbar.style.opacity = '0';
  } else {
    navbar.style.pointerEvents = 'auto';
    navbar.style.opacity = '1';
  }
}

let disableSparks = localStorage.getItem('disableSparks') === 'true';
let disableEffects = localStorage.getItem('disableEffects') === 'true';

// Инициализация Telegram WebApp API
if (window.Telegram && Telegram.WebApp) {
  Telegram.WebApp.ready();
}

const divisionThresholds = [0, 20000, 50000, 90000, 150000, 220000, 300000, 400000, 550000, 700000, 1000000];
const tapFlash = document.querySelector('.tap-flash');

const i18n = {
  ru: {
    divisionNames: ["Бедный", "Новичок", "Практик", "Продвинутый", "Мастер", "Эксперт", "Профи", "Босс", "Гуру", "Элита"],
    divisionLabel: "Дивизион",
    boost: "Буст",
    energy: "Энергия",
    selectLang: "Выбрать язык",
    lang: "Язык",
    offer: "Выбрать оффер",
    offerDesc: "Скоро",
    inviteRef: "Пригласить рефералов",
    inviteDesc: "Добавь реферальную ссылку",
    delete: "Удалить аккаунт",
    deleteDesc: "Удалить все данные навсегда",
    privacy: "Политика конфиденциальности",
    deleteTitle: "Удаление аккаунта",
    deleteText: "Все ваши данные, включая прогресс, достижения и покупки, будут безвозвратно удалены.",
    deleteBtn: "Удалить аккаунт",
    cancelBtn: "Отмена",
    refTitle: "Пригласить рефералов",
    refText: "Добавьте реферальную ссылку вашего друга, после чего вы станете его рефералом. Это действие нельзя отменить.",
    refBtn: "Добавить",
    langTitle: "Выберите язык",
    settings: "Настройки",
    back: "Назад",
    balance: "Твой баланс",
    dailyBoosts: "Бесплатные дневные бусты",
    boostEnergy: "Восстановить энергию",
    boostTurbo: "Турбо x5 на 1 минуту",
    available: "доступно",
    upgrades: "Улучшения",
    multitap: "Мультитап",
    energyLimit: "Лимит энергии",
    lvl: "ур.",
    use: "Использовать",
    improve: "Улучшить",
    infoFD: "Получаешь каждый час, нужен для прокачки и покупок.",
    infoStar: "Спец.возможности — турбо и фишки. Получаешь за задания и достижения.",
    close: "Ок",
    notEnoughEnergy: "Недостаточно энергии!",
    privacyPolicyTitle: "Политика конфиденциальности",
    privacyPolicyText: "Это приложение не собирает личные данные, кроме ID пользователя от Telegram для сохранения прогресса в игре. Мы не передаём ваши данные третьим лицам. По всем вопросам обращайтесь в поддержку.",
    dailyTitle: "Ежедневная награда",
    dailyClaim: "Забрать",
    dailyClaimed: "Завтра новая награда",
    dailyComplete: "Неделя завершена!",
    dailySeedWord: "Секретное слово",
    dailyCopy: "Скопировать слово",
    langOptions: [
      {key: "ru", label: "Русский (ru)"},
      {key: "en", label: "English (en)"},
      {key: "de", label: "Deutsch (de)"},
      {key: "fr", label: "Français (fr)"},
      {key: "es", label: "Español (es)"},
      {key: "hi", label: "Hindi (hi)"}
    ]
  },
  en: {
    divisionNames: ["Poor", "Beginner", "Practitioner", "Advanced", "Master", "Expert", "Pro", "Boss", "Guru", "Elite"],
    divisionLabel: "Division",
    boost: "Boost",
    energy: "Energy",
    selectLang: "Select language",
    lang: "Language",
    offer: "Choose offer",
    offerDesc: "Coming soon",
    inviteRef: "Invite referrals",
    inviteDesc: "Add your referral link",
    delete: "Delete account",
    deleteDesc: "Delete all data permanently",
    privacy: "Privacy policy",
    deleteTitle: "Delete account",
    deleteText: "All your data, including progress, achievements and purchases, will be permanently deleted.",
    deleteBtn: "Delete account",
    cancelBtn: "Cancel",
    refTitle: "Invite referrals",
    refText: "To become your friend's referral, add their referral link. This action cannot be undone.",
    refBtn: "Add",
    langTitle: "Select language",
    settings: "Settings",
    back: "Back",
    balance: "Your balance",
    dailyBoosts: "Free daily boosts",
    boostEnergy: "Restore energy",
    boostTurbo: "Turbo x5 for 1 min",
    available: "available",
    upgrades: "Upgrades",
    multitap: "Multitap",
    energyLimit: "Energy limit",
    lvl: "lvl",
    use: "Use",
    improve: "Improve",
    infoFD: "You get it every hour, required for upgrades and purchases.",
    infoStar: "Specials — turbo and features. Get for tasks and achievements.",
    close: "Ok",
    notEnoughEnergy: "Not enough energy!",
    privacyPolicyTitle: "Privacy policy",
    privacyPolicyText: "This app does not collect personal data except for user ID provided by Telegram to save your in-game progress. We do not share your data with third parties. For any questions, contact support.",
    dailyTitle: "Daily reward",
    dailyClaim: "Claim",
    dailyClaimed: "Come back tomorrow",
    dailyComplete: "Week complete!",
    dailySeedWord: "Secret word",
    dailyCopy: "Copy word",
    langOptions: [
      {key: "ru", label: "Русский (ru)"},
      {key: "en", label: "English (en)"},
      {key: "de", label: "Deutsch (de)"},
      {key: "fr", label: "Français (fr)"},
      {key: "es", label: "Español (es)"},
      {key: "hi", label: "Hindi (hi)"}
    ]
  }
};
let lang = localStorage.getItem('settingsLang') || 'ru';

// =============== STATE =====================
let division = 1, divisionPoints = 0, stars = 0, profit = 0, coins = 0;
let energyUpgradeLevel = 0, multitapLevel = 0;
let energy = 0, energyRestoreCount = 0, turboUses = 0;
let energyRestoreDate = "", turboUsesDate = "";
let turboActive = false, turboEndTime = 0, turboTimeout = null;
let hasUserInteracted = false;




// ========== LOCAL STORAGE Загрузка ==========
function loadLocal() {
  if (localStorage.getItem('division')) division = +localStorage.getItem('division');
  if (localStorage.getItem('divisionPoints')) divisionPoints = +localStorage.getItem('divisionPoints');
  if (localStorage.getItem('stars')) stars = +localStorage.getItem('stars');
  if (localStorage.getItem('profit')) profit = +localStorage.getItem('profit');
  if (localStorage.getItem('coins')) coins = +localStorage.getItem('coins');
  if (localStorage.getItem('energyUpgradeLevel')) energyUpgradeLevel = +localStorage.getItem('energyUpgradeLevel');
  if (localStorage.getItem('multitapLevel')) multitapLevel = +localStorage.getItem('multitapLevel');
  if (localStorage.getItem('energy')) energy = +localStorage.getItem('energy');
  if (localStorage.getItem('energyRestoreCount')) energyRestoreCount = +localStorage.getItem('energyRestoreCount');
  if (localStorage.getItem('energyRestoreDate')) energyRestoreDate = localStorage.getItem('energyRestoreDate');
  if (localStorage.getItem('turboUses')) turboUses = +localStorage.getItem('turboUses');
  if (localStorage.getItem('turboUsesDate')) turboUsesDate = localStorage.getItem('turboUsesDate');
}
loadLocal();

// ========== ФОРМАТЫ & УТИЛИТЫ ===============
function formatShortNum(n) {
  n = Math.floor(n);
  if (n >= 1e6) return (n / 1e6).toFixed(n % 1e6 === 0 ? 0 : 1) + 'M';
  if (n >= 1e3) return (n / 1e3).toFixed(n % 1e3 === 0 ? 0 : 1) + 'K';
  return n;
}

// ============== ENERGY LOGIC =================
function getDivisionBaseEnergy(div) { return div * 1000; }
function getEnergyMax() { return getDivisionBaseEnergy(division) + energyUpgradeLevel * 1000; }
function getEnergyUpMax() { return Math.min(10, division + 1); }
function getEnergyUpCost() { return Math.floor(2500 * Math.pow(2.55, energyUpgradeLevel)); }
function getMultitapMax() { return 5 + (division - 1) * 5; }
function getMultitapCost() { return Math.floor(500 * Math.pow(1.55, multitapLevel)); }
function getTurboLeft() { resetTurboIfNeeded(); return Math.max(0, 5 - turboUses); }
function getEnergyRestoreLeft() { resetEnergyRestoreIfNeeded(); return Math.max(0, 5 - energyRestoreCount); }
function getMultitapBonus() { return Math.max(1, multitapLevel); }

function resetEnergyRestoreIfNeeded() {
  const today = new Date().toISOString().slice(0,10);
  if (energyRestoreDate !== today) {
    energyRestoreDate = today; energyRestoreCount = 0;
    localStorage.setItem('energyRestoreDate', energyRestoreDate);
    localStorage.setItem('energyRestoreCount', energyRestoreCount);
  }
}
function resetTurboIfNeeded() {
  const today = new Date().toISOString().slice(0,10);
  if (turboUsesDate !== today) {
    turboUsesDate = today; turboUses = 0;
    localStorage.setItem('turboUsesDate', turboUsesDate);
    localStorage.setItem('turboUses', turboUses);
  }
}

// ============= ENERGY RECOVERY TIMER ===========
setInterval(() => {
  const maxEnergy = getEnergyMax();
  if (energy < maxEnergy) {
    energy = Math.min(maxEnergy, energy + 2);
    localStorage.setItem('energy', energy);
    renderEnergy();
    renderBoostPopup();
  }
}, 1000);

// =========== РЕНДЕР ДИВИЗИОН ПАНЕЛИ ============
function renderDivisionPanel() {
  document.getElementById('division-title').textContent = i18n[lang].divisionNames[division - 1];
  document.getElementById('division-avatar').src = `src/img/raccoons/lvl${division}.webp`;
  document.getElementById('division-label').textContent = i18n[lang].divisionLabel;
  document.getElementById('division-number').textContent = division;
  let prev = divisionThresholds[division - 1], next = divisionThresholds[division];
  let max = next - prev, cur = divisionPoints - prev;
  if (cur < 0) cur = 0; if (cur > max) cur = max;
  let percent = Math.min(100, (cur / max) * 100);
  document.getElementById('division-progress-bar').style.width = percent + '%';
  document.getElementById('star-count').textContent = stars;
  document.getElementById('profit-label').textContent = '+' + profit;
}

// ========== CARD ===============
const cardBtn = document.getElementById('card-btn');
const cardNumber = document.getElementById('card-number');
const cardUser = document.getElementById('card-user');
const cardDate = document.getElementById('card-date');
function renderCard() {
  let str = coins.toString().padStart(16, '0');
  cardNumber.textContent = str.replace(/(.{4})/g, '$1 ').trim();
  if (turboActive) cardBtn.classList.add('turbo-active');
  else cardBtn.classList.remove('turbo-active');
}
function pulse() {
  cardBtn.classList.remove('pulse');
  void cardBtn.offsetWidth;
  cardBtn.classList.add('pulse');
}

// ========== ENERGY ===============
function renderEnergy() {
  document.getElementById('energy-value').textContent =
    `${formatShortNum(energy)}/${formatShortNum(getEnergyMax())}`;
}

// =========== BOOST POPUP UI ===============
function renderBoostPopup() {
  document.getElementById('boost-balance-label').textContent = i18n[lang].balance;
  document.getElementById('boost-balance-amount').textContent = coins;
  document.getElementById('boost-daily-title').textContent = i18n[lang].dailyBoosts;
  document.getElementById('boost-energy-label').textContent = i18n[lang].boostEnergy;
  document.getElementById('boost-turbo-label').textContent = i18n[lang].boostTurbo;
  document.getElementById('boost-energy-left').textContent = `${getEnergyRestoreLeft()}/5`;
  document.getElementById('boost-turbo-left').textContent = `${getTurboLeft()}/5`;
  document.getElementById('boost-upgrade-title').textContent = i18n[lang].upgrades;
  document.getElementById('boost-multitap-label').textContent = i18n[lang].multitap;
  document.getElementById('boost-multitap-cost-val').textContent = getMultitapCost();
  document.getElementById('boost-multitap-lvl').textContent = `${multitapLevel + 1} ${i18n[lang].lvl}`;
  document.getElementById('boost-energyup-label').textContent = i18n[lang].energyLimit;
  document.getElementById('boost-energyup-cost-val').textContent = getEnergyUpCost();
  document.getElementById('boost-energyup-lvl').textContent = `${energyUpgradeLevel + 1} ${i18n[lang].lvl}`;
}

// =========== BOOST/TURBO LOGIC ==============
function activateTurbo(isPaid = false) {
  if (turboActive) return;
  turboActive = true; turboEndTime = Date.now() + 60000;
  if (!isPaid) {
    turboUses++; localStorage.setItem('turboUses', turboUses);
    localStorage.setItem('turboUsesDate', new Date().toISOString().slice(0,10));
  } else {
    stars -= TURBO_PAID_COST; if (stars < 0) stars = 0;
    localStorage.setItem('stars', stars); renderDivisionPanel();
  }
  renderBoostPopup(); renderCard();
  if (turboTimeout) clearTimeout(turboTimeout);
  turboTimeout = setTimeout(() => {
    turboActive = false;
    renderCard(); renderBoostPopup();
  }, 60000);
}

// ========== ENERGY USAGE ==========
function useEnergy(amount = 1) {
  if (energy < amount) {
    alert(i18n[lang].notEnoughEnergy);
    return false;
  }
  energy -= amount;
  localStorage.setItem('energy', energy);
  renderEnergy();
  return true;
}

// ====== TAP+ эффект =======
function showTapPlus(x, y, text) {
  const plus = document.createElement('div');
  plus.className = 'tap-plus'; plus.textContent = text;
  plus.style.left = x + 'px'; plus.style.top = y + 'px';
  document.body.appendChild(plus);
  setTimeout(() => {
    plus.classList.add('fade');
    setTimeout(() => plus.remove(), 550);
  }, 30);
}

// ======= CARD CLICK ========
let lastTouchTime = 0;
function handleCardTouch(evt) {
  lastTouchTime = Date.now();
  if (!evt.changedTouches) return;
  for (let i = 0; i < evt.changedTouches.length; i++) {
    const touch = evt.changedTouches[i];
    onTap(touch.clientX, touch.clientY);
  }
  evt.preventDefault();
}
function handleCardMouse(e) {
  if (Date.now() - lastTouchTime < 400) return;
  onTap(e.clientX, e.clientY);
}

function handleClick(e) {
  hasUserInteracted = true;
  onTap(e.clientX, e.clientY);
}




function onTap(x, y) {
  // звук + вибрация
  if (hasUserInteracted) {

    if (window.Telegram?.WebApp?.HapticFeedback) {
      Telegram.WebApp.HapticFeedback.impactOccurred('light'); // для iPhone в Telegram
    } else if (navigator.vibrate) {
      navigator.vibrate(30); // для Android
    }
  }


  if (!disableSparks && !disableEffects) {
    triggerSparks(x, y);  // Добавит анимацию искр

  }
// вспышка
    if (!disableEffects && tapFlash) {
      tapFlash.classList.remove('active');
      void tapFlash.offsetWidth;
      tapFlash.classList.add('active');
    }

// вибрация
    if (navigator.vibrate) navigator.vibrate(10);


    if (!useEnergy(1)) return;
    let clickPoints = (turboActive ? 5 : 1) * getMultitapBonus();
    coins += clickPoints;
    divisionPoints += clickPoints;
    renderCard();
    pulse();
    showTapPlus(x, y, `+${clickPoints}`);
    if (division < 10 && divisionPoints >= divisionThresholds[division]) {
      division++;
      showDivisionUpEffect();
      energy = getEnergyMax();
      localStorage.setItem('energy', energy);
    }
    localStorage.setItem('division', division);
    localStorage.setItem('divisionPoints', divisionPoints);
    localStorage.setItem('coins', coins);
    renderDivisionPanel();
    renderEnergy();
  }
  cardBtn.addEventListener('touchstart', handleCardTouch, {passive: false});
  cardBtn.addEventListener('mousedown', handleCardMouse);

// ========== Анимация дивизиона ==========
  function showDivisionUpEffect() {
    const avatar = document.getElementById('division-avatar');
    avatar.classList.add('division-up-animate');
    setTimeout(() => avatar.classList.remove('division-up-animate'), 1200);
  }

// ========== Пользователь ==========
  function getTgData() {
    let user = {username: '@username', registered: '00/00'};
    if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
      user.username = tg.initDataUnsafe.user.username
          ? '@' + tg.initDataUnsafe.user.username
          : tg.initDataUnsafe.user.first_name;
      let t = tg.initDataUnsafe.user;
      if (t.created_at) {
        let date = new Date(t.created_at * 1000);
        user.registered =
            ("0" + (date.getMonth() + 1)).slice(-2) + "/" + String(date.getFullYear()).slice(-2);
      }
    }
    return user;
  }

// ========== INIT ==============
  document.addEventListener('DOMContentLoaded', () => {
    resetEnergyRestoreIfNeeded();
    resetTurboIfNeeded();
    energy = localStorage.getItem('energy') ? +localStorage.getItem('energy') : getEnergyMax();
    if (energy > getEnergyMax()) energy = getEnergyMax();
    const user = getTgData();
    cardUser.textContent = user.username;
    cardDate.textContent = user.registered;
    renderCard();
    renderDivisionPanel();
    renderEnergy();
    renderBoostPopup();

    const cardBtn = document.getElementById('card-btn');
    if (cardBtn) {
      cardBtn.addEventListener('click', handleClick);
    }

    // Boost popup logic
    const boostBtn = document.getElementById('boost-btn');
    const boostPopup = document.getElementById('boost-popup');


    const boostPopupSheet = document.getElementById('boost-popup-sheet');
    if (boostBtn) boostBtn.addEventListener('click', () => {
      renderBoostPopup();
      boostPopup.classList.add('show');
    });
    if (boostPopup) boostPopup.addEventListener('click', (e) => {
      if (e.target === boostPopup) boostPopup.classList.remove('show');
    });
    if (boostPopupSheet && boostPopupSheet.querySelector('.boost-popup-grabber')) {
      boostPopupSheet.querySelector('.boost-popup-grabber').addEventListener('click', () => {
        boostPopup.classList.remove('show');
      });
    }
    if (document.getElementById('boost-row-turbo'))
      document.getElementById('boost-row-turbo').onclick = function () {
        if (getTurboLeft() <= 0 || turboActive) return;
        activateTurbo(false);
        boostPopup.classList.remove('show');
      };
    if (document.getElementById('boost-row-energy'))
      document.getElementById('boost-row-energy').onclick = function () {
        if (getEnergyRestoreLeft() <= 0 || energy === getEnergyMax()) return;
        energy = getEnergyMax();
        energyRestoreCount++;
        localStorage.setItem('energy', energy);
        localStorage.setItem('energyRestoreCount', energyRestoreCount);
        renderEnergy();
        renderBoostPopup();
      };
    if (document.getElementById('boost-row-multitap'))
      document.getElementById('boost-row-multitap').onclick = function () {
        if (multitapLevel >= getMultitapMax() || coins < getMultitapCost()) return;
        coins -= getMultitapCost();
        multitapLevel++;
        localStorage.setItem('coins', coins);
        localStorage.setItem('multitapLevel', multitapLevel);
        renderCard();
        renderBoostPopup();
        renderEnergy();
      };
    if (document.getElementById('boost-row-energyup'))
      document.getElementById('boost-row-energyup').onclick = function () {
        if (energyUpgradeLevel >= getEnergyUpMax() || coins < getEnergyUpCost()) return;
        coins -= getEnergyUpCost();
        energyUpgradeLevel++;
        localStorage.setItem('coins', coins);
        localStorage.setItem('energyUpgradeLevel', energyUpgradeLevel);
        energy = getEnergyMax();
        localStorage.setItem('energy', energy);
        renderCard();
        renderEnergy();
        renderBoostPopup();
      };

    // Info Popup (валюты)
    if (document.querySelector('.topbar-metrics'))
      document.querySelector('.topbar-metrics').addEventListener('click', () => {
        document.getElementById('info-popup').classList.add('show');
      });
    if (document.getElementById('info-popup-close'))
      document.getElementById('info-popup-close').addEventListener('click', () => {
        document.getElementById('info-popup').classList.remove('show');
      });
    if (document.getElementById('info-popup'))
      document.getElementById('info-popup').addEventListener('click', (e) => {
        if (e.target === document.getElementById('info-popup'))
          document.getElementById('info-popup').classList.remove('show');
      });


    // ---- SETTINGS POPUP ----
    settingsInit();
    updateLangAll();

    const divisionPopup = document.getElementById('division-popup');
    document.getElementById('division-avatar').onclick = () => {
      renderDivisionCards();
      divisionPopup.classList.add('show');
    };

    document.getElementById('division-popup-overlay')?.addEventListener('click', () => {
      divisionPopup.classList.remove('show');
    });
    document.getElementById('division-popup-close')?.addEventListener('click', () => {
      divisionPopup.classList.remove('show');
    });


  });


// =========== SETTINGS POPUP LOGIC =============
  function settingsInit() {
    const openSettingsBtn = document.getElementById('open-settings-btn');
    openSettingsBtn.onclick = () => {
      document.getElementById('settings-popup').classList.add('visible');
      toggleNavbar(true); // Скрыть навбар
    };

    const settingsPopup = document.getElementById('settings-popup');
    if (openSettingsBtn && settingsPopup) {
      openSettingsBtn.onclick = () => {
        updateLangAll();
        settingsPopup.classList.add('show');
        document.body.classList.add('popup-open');
        toggleNavbar(true); // 👈 добавляем сюда!
      };

      document.getElementById('settings-close-btn').onclick = () => {
        document.getElementById('settings-popup').classList.remove('visible');
        toggleNavbar(false); // Показать навбар
      };

      settingsPopup.onclick = (e) => {
        if (e.target === settingsPopup) {
          settingsPopup.classList.remove('show');
          toggleNavbar(false); // 👈 ЭТОГО НЕ ХВАТАЛО
        }
        document.body.classList.remove('popup-open');
      };

      document.getElementById('settings-lang-row').onclick = () => {
        showSlidePopup('settings-lang-popup');
      };
      document.getElementById('settings-lang-back').onclick = () => {
        hideSlidePopups();
      };
      document.querySelectorAll('.settings-lang-row').forEach(row => {
        row.onclick = () => {
          lang = row.getAttribute('data-lang');
          localStorage.setItem('settingsLang', lang);
          updateLangAll();
          hideSlidePopups();
          settingsPopup.classList.add('show');
        };

        const sparkToggle = document.getElementById('toggle-sparks');
        const effectsToggle = document.getElementById('toggle-effects');

// Установим начальные значения
        if (sparkToggle) sparkToggle.checked = !disableSparks;
        if (effectsToggle) effectsToggle.checked = !disableEffects;

// Обработчики
        if (sparkToggle) {
          sparkToggle.onchange = () => {
            disableSparks = !sparkToggle.checked;
            localStorage.setItem('disableSparks', disableSparks);
          };
        }
        if (effectsToggle) {
          effectsToggle.onchange = () => {
            disableEffects = !effectsToggle.checked;
            localStorage.setItem('disableEffects', disableEffects);
            // возможно, нужно перезагрузить страницу:
            location.reload(); // или динамически отключить эффекты
          };
        }


      });
      document.getElementById('settings-ref-row').onclick = () => {
        showSlidePopup('settings-ref-popup');
      };
      document.getElementById('settings-ref-back').onclick = () => {
        hideSlidePopups();
      };
      document.getElementById('settings-ref-add').onclick = () => {
        hideSlidePopups();
        settingsPopup.classList.remove('show');
        alert('Реферал добавлен!');
      };
      document.getElementById('settings-delete-row').onclick = () => {
        showSlidePopup('settings-delete-popup');
      };
      document.getElementById('settings-delete-back').onclick = () => {
        hideSlidePopups();
      };
      document.getElementById('settings-delete-confirm').onclick = () => {
        hideSlidePopups();
        settingsPopup.classList.remove('show');
        alert('Аккаунт удалён!');
      };
      document.getElementById('settings-delete-cancel').onclick = () => {
        hideSlidePopups();
      };
      document.getElementById('settings-policy-btn').onclick = () => {
        showSlidePopup('settings-policy-popup');
      };
      document.getElementById('settings-policy-back').onclick = () => {
        hideSlidePopups();
      };
      document.querySelectorAll('.settings-popup-slide').forEach(popup => {
        let startX = null;
        popup.addEventListener('touchstart', e => {
          startX = e.touches[0].clientX;
        });
        popup.addEventListener('touchend', e => {
          if (startX !== null && (e.changedTouches[0].clientX - startX) > 70) {
            hideSlidePopups();
          }
          startX = null;
        });
        popup.onclick = (e) => {
          if (e.target === popup) hideSlidePopups();
        };
      });
    }
  }

function showSlidePopup(id) {
  document.querySelectorAll('.settings-popup-slide').forEach(p => p.classList.remove('show'));
  document.getElementById(id).classList.add('show');
  document.body.classList.add('popup-open'); // ✅ ок
  document.getElementById('settings-popup')?.classList.remove('show');

  toggleNavbar(true); // ✅ ДОБАВЬ ЭТУ СТРОКУ — скрыть .bottom-navbar
}



function hideSlidePopups() {
  document.querySelectorAll('.settings-popup-slide').forEach(p => p.classList.remove('show'));

  // Показываем обратно основной popup настроек
  document.getElementById('settings-popup')?.classList.add('show');
  toggleNavbar(true); // ← Это то, что ты не вызывал в этой части


  // popup-open должен остаться, если show добавлен снова
  document.body.classList.add('popup-open');
}



function updateLangAll() {
    const t = i18n[lang];
    renderDivisionPanel();

    document.querySelectorAll('.settings-title').forEach(el => {
      let p = el.closest('.settings-popup-slide');
      if (p && p.id === 'settings-lang-popup') el.textContent = t.langTitle;
      else if (p && p.id === 'settings-ref-popup') el.textContent = t.refTitle;
      else if (p && p.id === 'settings-delete-popup') el.textContent = t.deleteTitle;
      else if (p && p.id === 'settings-policy-popup') el.textContent = t.privacyPolicyTitle;
      else el.textContent = t.settings;
    });

    document.querySelectorAll('.settings-back-btn').forEach(btn => {
      btn.textContent = t.back;
    });

    document.getElementById('settings-lang-label').textContent = t.selectLang;
    document.getElementById('settings-lang-current').textContent =
        t.langOptions.find(l => l.key === lang)?.label || lang;
    document.getElementById('settings-offer-label').textContent = t.offer;
    document.getElementById('settings-offer-desc').textContent = t.offerDesc;
    document.querySelector('#settings-ref-row .settings-row-label').textContent = t.inviteRef;
    document.querySelector('#settings-ref-row .settings-row-desc').textContent = t.inviteDesc;
    document.querySelector('#settings-delete-row .settings-row-label').textContent = t.delete;
    document.querySelector('#settings-delete-row .settings-row-desc').textContent = t.deleteDesc;
    document.getElementById('settings-policy-btn').textContent = t.privacy;

    document.querySelectorAll('.settings-lang-row').forEach(row => {
      const key = row.getAttribute('data-lang');
      row.querySelector('.settings-row-label').textContent = t.langOptions.find(l => l.key === key).label;
    });

    document.querySelector('#settings-ref-popup .settings-title').textContent = t.refTitle;
    document.getElementById('settings-ref-text').textContent = t.refText;
    document.getElementById('settings-ref-add').textContent = t.refBtn;

    document.querySelector('#settings-delete-popup .settings-title').textContent = t.deleteTitle;
    document.querySelector('#settings-delete-popup .settings-delete-text').textContent = t.deleteText;
    document.getElementById('settings-delete-confirm').textContent = t.deleteBtn;
    document.getElementById('settings-delete-cancel').textContent = t.cancelBtn;

    document.querySelector('#settings-policy-popup .settings-title').textContent = t.privacyPolicyTitle;
    document.querySelector('#settings-policy-popup .settings-policy-content').textContent = t.privacyPolicyText;

    if (document.querySelector('.info-popup-minimal-title')) document.querySelector('.info-popup-minimal-title').textContent = lang === 'ru' ? 'Информация о валютах' : 'Currency info';
    if (document.querySelector('.info-popup-minimal-label')) document.querySelector('.info-popup-minimal-label').textContent = 'FD Coin';
    if (document.querySelectorAll('.info-popup-minimal-desc')[0]) document.querySelectorAll('.info-popup-minimal-desc')[0].textContent = t.infoFD;
    if (document.querySelectorAll('.info-popup-minimal-desc')[1]) document.querySelectorAll('.info-popup-minimal-desc')[1].textContent = t.infoStar;
    if (document.getElementById('info-popup-close')) document.getElementById('info-popup-close').textContent = t.close;
  }

  const divisions = [
    {
      rank: 1,
      title: "Бедный",
      points: "0+",
      desc: "Начинающий путь дивизиона. Нужен только энтузиазм!",
      img: "src/img/raccoons/lvl1.webp"
    },
    {
      rank: 2,
      title: "Новичок",
      points: "10,000+",
      desc: "Первые шаги сделаны, ты на правильном пути.",
      img: "src/img/raccoons/lvl2.webp"
    },
    {
      rank: 3,
      title: "Продвинутый",
      points: "50,000+",
      desc: "Уже знаешь основы и двигаешься уверенно.",
      img: "src/img/raccoons/lvl3.webp"
    },
    {
      rank: 4,
      title: "Успешный",
      points: "100,000+",
      desc: "Твоя уверенность уже приносит результат.",
      img: "src/img/raccoons/lvl4.webp"
    },
    {
      rank: 5,
      title: "Опытный",
      points: "250,000+",
      desc: "Знаешь, как устроен рынок, готов к большему.",
      img: "src/img/raccoons/lvl5.webp"
    },
    {
      rank: 6,
      title: "Профи",
      points: "500,000+",
      desc: "Ты уже не просто участник, ты играешь по-крупному.",
      img: "src/img/raccoons/lvl6.webp"
    },
    {
      rank: 7,
      title: "Эксперт",
      points: "1,000,000+",
      desc: "Твои решения влияют на ход событий.",
      img: "src/img/raccoons/lvl7.webp"
    },
    {
      rank: 8,
      title: "Мастер",
      points: "2,000,000+",
      desc: "Ты вдохновляешь других своим успехом.",
      img: "src/img/raccoons/lvl8.webp"
    },
    {
      rank: 9,
      title: "Элита",
      points: "5,000,000+",
      desc: "Ты в числе лучших, которых знают все.",
      img: "src/img/raccoons/lvl9.webp"
    },
    {
      rank: 10,
      title: "Легенда",
      points: "10,000,000+",
      desc: "Твоя история — пример для будущих поколений.",
      img: "src/img/raccoons/lvl10.webp"
    },
  ];

  function renderDivisionPopup() {
    const slider = document.getElementById('division-slider');
    slider.innerHTML = '';
    divisions.forEach(div => {
      const card = document.createElement('div');
      card.className = `division-card rank-${div.rank}`;
      card.innerHTML = `
        <img src="${div.img}" alt="${div.title}">
        <div class="div-name">${div.title}</div>
        <div class="div-points">${div.points} поинтов</div>
        <div class="div-desc">${div.desc}</div>
      `;
      slider.appendChild(card);
    });
  }

  const avatar = document.getElementById('division-avatar');
  const popup = document.getElementById('division-popup');
  const overlay = document.getElementById('division-popup-overlay');
  const closeBtn = document.getElementById('division-popup-close');

  if (avatar) {
    avatar.addEventListener('click', () => {
      renderDivisionPopup();
      popup.classList.add('show');
      document.body.classList.add('popup-open');

    });
  }
overlay.addEventListener('click', () => {
  popup.classList.remove('show');
  document.body.classList.remove('popup-open');
});
// Закрытие по клику вне попапа — только если сам попап открыт
document.addEventListener('click', (e) => {
  const popupSelectors = ['.settings-popup', '.settings-popup-slide', '.modal-popup', '.boost-popup', '.info-popup-minimal', '.division-popup'];
  const isInPopup = popupSelectors.some(selector => e.target.closest(selector));

  if (!isInPopup) {
    document.body.classList.remove('popup-open');
  }
});






// === FARM LOGIC ===
  const farmContainer = document.getElementById("farm-container");
  const farmStartBtn = document.getElementById("farm-start-btn");
  const farmUI = document.querySelector(".farm-active-ui");
  const farmTimer = document.getElementById("farm-timer");
  const farmCounter = document.getElementById("farm-coin-amount");
  const farmClaimBtn = document.getElementById("farm-claim-btn");

  const FARM_DURATION = 5 * 60 * 60 * 1000; // 5 часов в мс

  let farmStartTime = null;
  let farmCoins = 0;
  let farmInterval = null;

// Получаем скорость фарма из верхней панели
  function getFarmRate() {
    const profitText = document.getElementById("profit")?.innerText || "+0";
    return parseInt(profitText.replace("+", "").trim()) || 0;
  }

  function formatFarmTime(ms) {
    const totalSeconds = Math.max(Math.floor(ms / 1000), 0);
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h}h:${m.toString().padStart(2, "0")}m:${s.toString().padStart(2, "0")}s`;
  }

  function updateFarmUI() {
    const now = Date.now();
    const passed = now - farmStartTime;
    const remaining = Math.max(FARM_DURATION - passed, 0);

    if (remaining <= 0) {
      clearInterval(farmInterval);
      farmInterval = null;
      farmTimer.innerText = "0h:00m:00s";
      return;
    }

    farmTimer.innerText = formatFarmTime(remaining);
    const secondsPassed = Math.floor(passed / 1000);
    const farmRate = getFarmRate();
    farmCoins = secondsPassed * farmRate;
    farmCounter.innerText = `+${farmCoins}`;
  }

  function startFarm() {
    farmStartTime = Date.now();
    farmCoins = 0;
    localStorage.setItem("farmStartTime", farmStartTime);
    localStorage.setItem("farmClaimed", "false");
    farmContainer.classList.remove("farm-idle");
    farmContainer.classList.add("farm-active");

    updateFarmUI();
    farmInterval = setInterval(updateFarmUI, 1000);
  }

  function claimFarm() {
    if (farmCoins > 0) {
      let currentBalance = parseInt(localStorage.getItem("coins") || "0");
      currentBalance += farmCoins;
      localStorage.setItem("coins", currentBalance);
      updateBalance(); // функция у тебя уже есть
    }

    // сброс
    farmCoins = 0;
    farmStartTime = null;
    clearInterval(farmInterval);
    farmInterval = null;
    localStorage.removeItem("farmStartTime");
    localStorage.setItem("farmClaimed", "true");
    farmContainer.classList.remove("farm-active");
    farmContainer.classList.add("farm-idle");
  }

// === Восстановление при загрузке ===
  window.addEventListener("DOMContentLoaded", () => {
    const savedStart = localStorage.getItem("farmStartTime");
    // Отключение гифки на ферме (режим производительности)
    if (disableEffects) {
      const farmImage = document.getElementById('farm-animation');
      if (farmImage) {
        farmImage.src = 'src/img/staticbg.webp'; // замени путь, если другой
      }
    }

    const claimed = localStorage.getItem("farmClaimed");

    if (savedStart && claimed !== "true") {
      farmStartTime = parseInt(savedStart);
      const now = Date.now();
      const passed = now - farmStartTime;

      if (passed >= FARM_DURATION) {
        const farmRate = getFarmRate();
        farmCoins = Math.floor(FARM_DURATION / 1000) * farmRate;
        farmTimer.innerText = "0h:00m:00s";
        farmCounter.innerText = `+${farmCoins}`;
        farmContainer.classList.remove("farm-idle");
        farmContainer.classList.add("farm-active");
      } else {
        farmContainer.classList.remove("farm-idle");
        farmContainer.classList.add("farm-active");

        updateFarmUI();
        farmInterval = setInterval(updateFarmUI, 1000);
      }
    }


// === События ===
    farmStartBtn.addEventListener("click", startFarm);
    farmClaimBtn.addEventListener("click", claimFarm);

  });

  const canvas = document.getElementById('tap-sparks');
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  window.addEventListener('resize', () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  });

  let particles = [];

  function createSpark(x, y) {
    for (let i = 0; i < 6; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 2 + 1;
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: Math.random() * 3 + 2,
        alpha: 3,
        color: 'rgb(255,255,255)' // нежно-голубой

      });
    }
  }

  function updateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, index) => {
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.01; // медленнее исчезают

      if (p.alpha <= 0) {
        particles.splice(index, 1);
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        // Устанавливаем яркий цвет + свечение
        const rgb = hexToRgb(p.color); // например, "255,255,255"
        ctx.fillStyle = `rgba(${rgb},${p.alpha})`;
        ctx.shadowColor = `rgba(${rgb},${Math.min(1, p.alpha * 1.5)})`;
        ctx.shadowBlur = 10;

        ctx.fill();
      }
    });

    requestAnimationFrame(updateParticles);
  }


  function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}`
        : "255,255,255"; // fallback
  }


  function hslToRgbString(hsl) {
    let tmp = document.createElement("div");
    tmp.style.color = hsl;
    document.body.append(tmp);
    let rgb = getComputedStyle(tmp).color.match(/\d+,\s*\d+,\s*\d+/)[0];
    tmp.remove();
    return rgb;
  }

  updateParticles(); // запускаем цикл

  function triggerSparks(x, y) {
    const rect = canvas.getBoundingClientRect();
    const cx = x - rect.left;
    const cy = y - rect.top;
    createSpark(cx, cy);
  }

