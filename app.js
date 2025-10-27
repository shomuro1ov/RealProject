// === Mobile Menu Toggle ===
document.querySelector('.mobile-menu')?.addEventListener('click', function() {
  document.querySelector('.nav-links').classList.toggle('active');
  this.querySelector('i').classList.toggle('fa-bars');
  this.querySelector('i').classList.toggle('fa-times');
});

// === Header scroll effect ===
window.addEventListener('scroll', function() {
  const header = document.getElementById('header');
  if (window.scrollY > 100) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
});

// === API URL ===
const API_URL = "http://localhost:5000/api/menu"; // keyinchalik hosting linkni shu yerga almashtirasan

// === Menu Manager ===
class MengaCafeMenu {
  constructor() {
    this.menuGrid = document.getElementById('menuGrid');
    this.init();
  }

  async init() {
    await this.loadMenu();
    this.setupModal();
  }

  // --- BACKENDDAN MA'LUMOT OLIB, KATEGORIYALAR VA ITEMLARNI SAQLAYDI ---
  async loadMenu() {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();

      this.categories = data; // backenddagi category + items tuzilma
      this.displayMenuItems('all');

      // --- KATEGORIYALAR TUGMALARINI CHIQARISH ---
      const categoryContainer = document.querySelector('.menu-categories');
      if (categoryContainer) {
        categoryContainer.innerHTML = `
          <button class="menu-category-btn active" data-category="all">Barchasi</button>
          ${this.categories.map(c => `
            <button class="menu-category-btn" data-category="${c.category}">${c.category}</button>
          `).join('')}
        `;
        this.setupCategoryButtons();
      }

    } catch (err) {
      console.error('Serverdan maʼlumot olishda xatolik:', err);
      this.menuGrid.innerHTML = `<p style="color:red;text-align:center;">Server bilan bogʻlanib boʻlmadi 😢</p>`;
    }
  }

  // --- KATEGORIYA TUGMALARI BOSILGANDA FILTRLASH ---
  setupCategoryButtons() {
    const buttons = document.querySelectorAll('.menu-category-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const category = btn.dataset.category;
        this.displayMenuItems(category);
      });
    });
  }

  // --- KATEGORIYAGA MOS ITEMLARNI KO'RSATISH ---
  displayMenuItems(category = 'all') {
    if (!this.menuGrid) return;
    this.menuGrid.innerHTML = '';

    let items = [];

    if (category === 'all') {
      this.categories.forEach(c => items.push(...c.items));
    } else {
      const found = this.categories.find(c => c.category.toLowerCase() === category.toLowerCase());
      if (found) items = found.items;
    }

    if (items.length === 0) {
      this.menuGrid.innerHTML = `<p style="grid-column:1/-1;text-align:center;">Bu kategoriyada hali mahsulot yoʻq 🍽️</p>`;
      return;
    }

    items.forEach(item => {
      const el = document.createElement('div');
      el.className = 'menu-item';
      el.innerHTML = `
        <img src="${item.image}" alt="${item.name}" 
           onerror="this.src='images/no-image.jpg'"

        <h3>${item.name}</h3><br>
        <span class="price">${item.price} so'm</span>
      `;
      el.addEventListener('click', () => this.openModal(item));
      this.menuGrid.appendChild(el);
    });
  }

  // --- MODALNI BOSHGARISH ---
  setupModal() {
  const modal = document.getElementById("menuModal");
  const closeBtn = document.getElementById("closeModal");

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
    });
  }

  // Modal tashqarisiga bosilganda yopish
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });
}


  // --- ITEM DETAIL MODALINI OCHISH ---
 openModal(item) {
  const modal = document.getElementById("menuModal");
  const modalImg = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalPrice = document.getElementById("modalPrice");
  const modalDesc = document.getElementById("modalDescription");

  // === agar rasm mavjud bo'lmasa, default rasm qo'yiladi ===
  const imgSrc =
    item.image && item.image.trim() !== ""
      ? item.image
      : "images/no-image.jpg"; // yoki "https://via.placeholder.com/400x260?text=No+Image"

  modalImg.src = imgSrc;
  modalTitle.textContent = item.name || "Nomaʼlum mahsulot";
  modalPrice.textContent = item.price ? `${item.price} so'm` : "Narx belgilanmagan";
  modalDesc.textContent = item.description || "Bu mahsulot haqida maʼlumot mavjud emas.";

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

}

// === ADMIN LOGIN FUNCTIONALITY ===
class AdminAuth {
  constructor() {
    this.username = 'admin';
    this.password = 'admin123';
    this.init();
  }

  init() {
    const loginBtn = document.getElementById('adminLoginBtn');
    const loginModal = document.getElementById('adminLoginModal');
    const closeBtn = document.querySelector('.close-admin-modal');
    const form = document.getElementById('adminLoginForm');

    loginBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      loginModal.style.display = 'flex';
    });

    closeBtn?.addEventListener('click', () => (loginModal.style.display = 'none'));

    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.login();
    });
  }

  login() {
    const username = document.getElementById('adminUsername').value.trim();
    const password = document.getElementById('adminPassword').value.trim();

    if (username === this.username && password === this.password) {
      window.location.href = 'admin.html';
    } else {
      alert('Login yoki parol notoʻgʻri!');
    }
  }
}

// === Initialize on DOM load ===
document.addEventListener('DOMContentLoaded', () => {
  new AdminAuth();
  new MengaCafeMenu();
});
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".gallery-carousel-container");
  const slides = document.querySelectorAll(".gallery-carousel-item");
  const next = document.querySelector(".gallery-carousel-arrow.next");
  const prev = document.querySelector(".gallery-carousel-arrow.prev");
  const dots = document.querySelectorAll(".gallery-carousel-dot");

  let index = 0;

  function showSlide(i) {
    if (i < 0) index = slides.length - 1;
    else if (i >= slides.length) index = 0;
    else index = i;

    container.style.transform = `translateX(-${index * 100}%)`;

    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");
  }

  next.addEventListener("click", () => showSlide(index + 1));
  prev.addEventListener("click", () => showSlide(index - 1));

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => showSlide(i));
  });

  // Avto-slayd har 5 sekundda
  setInterval(() => showSlide(index + 1), 5000);

  showSlide(0);
});
