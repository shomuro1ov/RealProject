 // Mobile Menu Toggle
        document.querySelector('.mobile-menu').addEventListener('click', function() {
            document.querySelector('.nav-links').classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });

        // Header scroll effect
        window.addEventListener('scroll', function() {
            const header = document.getElementById('header');
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Menu Category Filter
        const categoryButtons = document.querySelectorAll('.category-btn');
        
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // In a real implementation, this would filter the menu items
                // For this demo, we'll just show a message
                const category = this.getAttribute('data-category');
                console.log(`Filtering by category: ${category}`);
            });
        });



        // Gallery Carousel
        const galleryCarousel = document.querySelector('.gallery-carousel-container');
        const galleryDots = document.querySelectorAll('.gallery-carousel-dot');
        const galleryPrev = document.querySelector('.gallery-carousel .prev');
        const galleryNext = document.querySelector('.gallery-carousel .next');
        let galleryCurrentSlide = 0;

        function updateGalleryCarousel() {
            galleryCarousel.style.transform = `translateX(-${galleryCurrentSlide * 100}%)`;
            
            // Update dots
            galleryDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === galleryCurrentSlide);
            });
        }

        galleryPrev.addEventListener('click', () => {
            galleryCurrentSlide = (galleryCurrentSlide - 1 + galleryDots.length) % galleryDots.length;
            updateGalleryCarousel();
        });

        galleryNext.addEventListener('click', () => {
            galleryCurrentSlide = (galleryCurrentSlide + 1) % galleryDots.length;
            updateGalleryCarousel();
        });

        galleryDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                galleryCurrentSlide = index;
                updateGalleryCarousel();
            });
        });

        // Auto-advance carousels
        setInterval(() => {
            menuCurrentSlide = (menuCurrentSlide + 1) % menuDots.length;
            updateMenuCarousel();
        }, 5000);

        setInterval(() => {
            galleryCurrentSlide = (galleryCurrentSlide + 1) % galleryDots.length;
            updateGalleryCarousel();
        }, 6000);

        // Modal functionality
        const modal = document.getElementById('itemModal');
        const modalClose = document.querySelector('.modal-close');
        const menuItems = document.querySelectorAll('.menu-item');

        //  kjasbdfkaksvkhsahvksadfhvkkjsvkhsda
const menuData = {
  lavash: [
    {
      title: "Tovuq Lavash",
      price: "$5.99",
      img: "images/lavash1.jpg.webg",
      description: "Yumshoq non orasida tovuq go'shti, sabzavotlar va maxsus sous bilan.",
      ingredients: ["Tovuq go'shti", "Pomidor", "Bodring", "Sous", "Pishloq"],
      nutrition: "Calories: 520 | Protein: 26g | Carbs: 45g | Fat: 20g"
    },
    {
      title: "Go'shtli Lavash",
      price: "$6.99",
      img: "images/lavash2.jpg",
      description: "Mol go'shti, pishloq va sabzavotlar bilan to'ldirilgan lavash.",
      ingredients: ["Mol go'shti", "Pishloq", "Karam", "Sous"],
      nutrition: "Calories: 640 | Protein: 32g | Carbs: 50g | Fat: 28g"
    }
  ],
  burgers: [
    {
      title: "Classic Burger",
      price: "$7.99",
      img: "images/burger1.jpg",
      description: "100% mol go'shtli burger pishloq, sabzavot va sous bilan.",
      ingredients: ["Mol go'shti", "Pishloq", "Pomidor", "Sous"],
      nutrition: "Calories: 700 | Protein: 40g | Carbs: 55g | Fat: 35g"
    },
    {
      title: "Double Burger",
      price: "$9.99",
      img: "images/burger2.jpg",
      description: "Ikki qavatli burger, cheddar pishloq va maxsus sous bilan.",
      ingredients: ["2x Go'shtli kotlet", "Cheddar", "Sous"],
      nutrition: "Calories: 890 | Protein: 55g | Carbs: 60g | Fat: 45g"
    }
  ],
  drinks: [
    {
      title: "Coca-Cola",
      price: "$1.99",
      img: "images/cola.jpg",
      description: "Muzdek gazli ichimlik.",
      ingredients: ["Suv", "Shakar", "Gaz"],
      nutrition: "Calories: 140 | Carbs: 39g"
    },
    {
      title: "Lemonade",
      price: "$2.49",
      img: "images/lemonade.jpg",
      description: "Tabiiy limon sharbatidan tayyorlangan ichimlik.",
      ingredients: ["Limon", "Shakar", "Suv"],
      nutrition: "Calories: 120 | Carbs: 32g"
    }
  ]
};

// Elementlar
const grid = document.getElementById("menuGrid");
const modalmenu = document.getElementById("menuModal");
const closeModal = document.getElementById("closeModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalIngredients = document.getElementById("modalIngredients");
const modalNutrition = document.getElementById("modalNutrition");

// Funksiya: menyuni ko‘rsatish
function showMenu(category) {
  grid.innerHTML = "";
  menuData[category].forEach(item => {
    const div = document.createElement("div");
    div.classList.add("menu-item");
    div.innerHTML = `
      <img src="${item.img}" alt="${item.title}" class="menu-item-img">
      <h3 class="menu-item-name">${item.title}</h3>
      <p class="menu-item-price">${item.price}</p>
    `;
    div.addEventListener("click", () => openModal(item));
    grid.appendChild(div);
  });
}

// Modalni ochish
function openModal(item) {
  modalImage.src = item.img;
  modalTitle.textContent = item.title;
  modalDescription.textContent = item.description;
  modalIngredients.innerHTML = item.ingredients.map(i => `<li>${i}</li>`).join("");
  modalNutrition.textContent = item.nutrition;
  modal.style.display = "flex";
}

// Yopish
closeModal.addEventListener("click", () => modalmenu.style.display = "none");
window.addEventListener("click", e => {
  if (e.target === modalmenu) modalmenu.style.display = "none";
});

// Kategoriya bosilganda
document.querySelectorAll(".menu-category-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".menu-category-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    showMenu(btn.dataset.category);
  });
});

// Default - lavashlar
showMenu("lavash");
// =================================================================================================================================

        // Add floating elements to hero section
        function createFloatingElement() {
            const floatingElements = document.querySelector('.floating-elements');
            const icons = ['fa-hamburger', 'fa-pizza-slice', 'fa-ice-cream', 'fa-hotdog', 'fa-french-fries', 'fa-cookie', 'fa-cheese', 'fa-bacon'];
            const icon = icons[Math.floor(Math.random() * icons.length)];
            
            const element = document.createElement('div');
            element.className = 'floating-element';
            element.innerHTML = `<i class="fas ${icon}"></i>`;
            element.style.left = `${Math.random() * 100}%`;
            element.style.top = `${Math.random() * 100}%`;
            element.style.animationDelay = `${Math.random() * 5}s`;
            element.style.fontSize = `${Math.random() * 2 + 1.5}rem`;
            
            floatingElements.appendChild(element);
            
            // Remove element after animation completes
            setTimeout(() => {
                element.remove();
            }, 15000);
        }

        // Create initial floating elements
        for (let i = 0; i < 8; i++) {
            setTimeout(createFloatingElement, i * 500);
        }

        // Continue creating floating elements
        setInterval(createFloatingElement, 2000);