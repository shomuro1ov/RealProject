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
    galleryCurrentSlide = (galleryCurrentSlide + 1) % galleryDots.length;
    updateGalleryCarousel();
}, 6000);

// Modal functionality
const modal = document.getElementById('itemModal');
const modalClose = document.querySelector('.modal-close');
const menuItems = document.querySelectorAll('.menu-item');

// Menga Cafe Menu Functionality - YANGILANDI
class MengaCafeMenu {
    constructor() {
        this.categories = this.getCategories();
        this.products = this.getProducts();
        this.init();
    }

    getCategories() {
        const storedCategories = localStorage.getItem('mengaCafeCategories');
        
        if (storedCategories && JSON.parse(storedCategories).length > 0) {
            return JSON.parse(storedCategories);
        } else {
            // Default kategoriyalar
            const defaultCategories = [
                { id: 'lavash', name: 'Lavashlar' },
                { id: 'burgers', name: 'Bamburgerlar' },
                { id: 'drinks', name: 'Suvlar' },
                { id: 'desserts', name: 'Shirinliklar' }
            ];
            
            localStorage.setItem('mengaCafeCategories', JSON.stringify(defaultCategories));
            return defaultCategories;
        }
    }

    getProducts() {
        const storedProducts = localStorage.getItem('mengaCafeProducts');
        
        if (storedProducts && JSON.parse(storedProducts).length > 0) {
            return JSON.parse(storedProducts);
        } else {
            // Default mahsulotlar
            const defaultProducts = [
                {
                    id: 1,
                    name: "Tovuq Lavash",
                    price: "25,000 so'm",
                    category: "lavash",
                    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                    description: "Yumshoq lavash noni, marinadlangan tovuq go'shti, yangi sabzavotlar va maxsus sous."
                },
                {
                    id: 2,
                    name: "Mol Go'shti Lavash",
                    price: "28,000 so'm",
                    category: "lavash",
                    image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                    description: "Yumshoq lavash noni, mazali mol go'shti, yangi sabzavotlar va maxsus sous."
                },
                {
                    id: 3,
                    name: "Klassik Burger",
                    price: "24,000 so'm",
                    category: "burgers",
                    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                    description: "Yumshoq bulochka, mol go'shti kotlet, yangi sabzavotlar va maxsus sous."
                },
                {
                    id: 4,
                    name: "Pishloqli Burger",
                    price: "28,000 so'm",
                    category: "burgers",
                    image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                    description: "Yumshoq bulochka, mol go'shti kotlet, erigan pishloq, yangi sabzavotlar va maxsus sous."
                },
                {
                    id: 5,
                    name: "Coca-Cola",
                    price: "8,000 so'm",
                    category: "drinks",
                    image: "https://images.unsplash.com/photo-1567103472667-6898f3a79cf2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                    description: "0.5L klassik Coca-Cola ichimligi."
                },
                {
                    id: 6,
                    name: "Fanta",
                    price: "8,000 so'm",
                    category: "drinks",
                    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                    description: "0.5L apelsin ta'mli Fanta ichimligi."
                },
                {
                    id: 7,
                    name: "Chizkeyk",
                    price: "15,000 so'm",
                    category: "desserts",
                    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                    description: "Yumshoq va shirin klassik chizkeyk."
                },
                {
                    id: 8,
                    name: "Donut",
                    price: "12,000 so'm",
                    category: "desserts",
                    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                    description: "Turli xil krem va shirinliklar bilan donut."
                }
            ];
            
            localStorage.setItem('mengaCafeProducts', JSON.stringify(defaultProducts));
            return defaultProducts;
        }
    }

    init() {
        this.displayCategories();
        this.displayMenuItems();
        this.setupEventListeners();
        this.setupAutoRefresh();
    }

    displayCategories() {
        const menuCategories = document.querySelector('.menu-categories');
        if (!menuCategories) return;
        
        menuCategories.innerHTML = '<button class="menu-category-btn active" data-category="all">Hammasi</button>';
        
        this.categories.forEach(category => {
            const categoryBtn = document.createElement('button');
            categoryBtn.className = 'menu-category-btn';
            categoryBtn.setAttribute('data-category', category.id);
            categoryBtn.textContent = category.name;
            
            categoryBtn.addEventListener('click', () => {
                document.querySelectorAll('.menu-category-btn').forEach(btn => btn.classList.remove('active'));
                categoryBtn.classList.add('active');
                this.displayMenuItems(category.id);
            });
            
            menuCategories.appendChild(categoryBtn);
        });
    }

    displayMenuItems(category = 'all') {
        const menuGrid = document.getElementById('menuGrid');
        if (!menuGrid) return;
        
        menuGrid.innerHTML = '';
        
        const filteredProducts = category === 'all' 
            ? this.products 
            : this.products.filter(product => product.category === category);
        
        if (filteredProducts.length === 0) {
            menuGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 20px; color: #666;">Bu kategoriyada hali mahsulotlar mavjud emas.</p>';
            return;
        }
        
        filteredProducts.forEach(product => {
            const menuItemElement = document.createElement('div');
            menuItemElement.className = 'menu-item';
            menuItemElement.setAttribute('data-id', product.id);
            
            menuItemElement.innerHTML = `
                <img class="menu-item-img" src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x200?text=Rasm+Yuklanmadi'">
                <div class="menu-item-content">
                    <h3 class="menu-item-title">${product.name}</h3>
                    <p class="menu-item-price">${product.price}</p>
                    <p class="menu-item-desc">${product.description}</p>
                </div>
            `;
            
            menuItemElement.addEventListener('click', () => this.openModal(product));
            menuGrid.appendChild(menuItemElement);
        });
    }

    openModal(item) {
        const modal = document.getElementById('menuModal');
        const modalImage = document.getElementById('modalImage');
        const modalTitle = document.getElementById('modalTitle');
        const modalPrice = document.getElementById('modalPrice');
        const modalDescription = document.getElementById('modalDescription');

        modalImage.src = item.image;
        modalImage.alt = item.name;
        modalTitle.textContent = item.name;
        modalPrice.textContent = item.price;
        modalDescription.textContent = item.description;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        const modal = document.getElementById('menuModal');
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // YANGI: Ma'lumotlarni yangilash funksiyasi
    refreshData() {
        this.categories = this.getCategories();
        this.products = this.getProducts();
        this.displayCategories();
        this.displayMenuItems();
    }

    // YANGI: Avtomatik yangilash sozlamalari
    setupAutoRefresh() {
        // Har 5 soniyada ma'lumotlarni tekshirish
        setInterval(() => {
            this.refreshData();
        }, 5000);

        // Sahifa fokuslanganda yangilash
        window.addEventListener('focus', () => {
            this.refreshData();
        });
    }

    setupEventListeners() {
        // Category buttons
        document.querySelectorAll('.menu-category-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.menu-category-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const category = btn.getAttribute('data-category');
                this.displayMenuItems(category);
            });
        });

        // Modal close
        document.getElementById('closeModal').addEventListener('click', () => this.closeModal());

        // Close modal when clicking outside
        document.getElementById('menuModal').addEventListener('click', (e) => {
            if (e.target === document.getElementById('menuModal')) {
                this.closeModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && document.getElementById('menuModal').classList.contains('active')) {
                this.closeModal();
            }
        });
    }
}

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

// Admin Login Functionality
class AdminAuth {
    constructor() {
        this.adminCredentials = {
            username: 'admin',
            password: 'admin123'
        };
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.checkExistingSession();
    }

    setupEventListeners() {
        // Admin login tugmasi
        const adminLoginBtn = document.getElementById('adminLoginBtn');
        if (adminLoginBtn) {
            adminLoginBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.openLoginModal();
            });
        }

        // Login form
        const loginForm = document.getElementById('adminLoginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.login();
            });
        }

        // Modal yopish
        const closeModal = document.querySelector('.close-admin-modal');
        if (closeModal) {
            closeModal.addEventListener('click', () => {
                this.closeLoginModal();
            });
        }

        // Tashqariga bosganda yopish
        const loginModal = document.getElementById('adminLoginModal');
        if (loginModal) {
            loginModal.addEventListener('click', (e) => {
                if (e.target === loginModal) {
                    this.closeLoginModal();
                }
            });
        }
    }

    openLoginModal() {
        const modal = document.getElementById('adminLoginModal');
        if (modal) {
            modal.style.display = 'flex';
        }
    }

    closeLoginModal() {
        const modal = document.getElementById('adminLoginModal');
        if (modal) {
            modal.style.display = 'none';
        }
        const form = document.getElementById('adminLoginForm');
        if (form) {
            form.reset();
        }
    }

    login() {
        const username = document.getElementById('adminUsername').value;
        const password = document.getElementById('adminPassword').value;

        if (username === this.adminCredentials.username && 
            password === this.adminCredentials.password) {
            
            // Session yaratish
            const session = {
                loggedIn: true,
                timestamp: Date.now(),
                expires: Date.now() + (24 * 60 * 60 * 1000) // 24 soat
            };
            
            localStorage.setItem('adminSession', JSON.stringify(session));
            this.closeLoginModal();
            
            // Admin panelga yo'naltirish
            window.open('admin.html', '_blank');
            
        } else {
            alert('Noto‘g‘ri login yoki parol!');
        }
    }

    checkExistingSession() {
        const session = localStorage.getItem('adminSession');
        if (session) {
            const sessionData = JSON.parse(session);
            if (sessionData.loggedIn && Date.now() < sessionData.expires) {
                // Session aktiv
                console.log('Admin session active');
            } else {
                // Session muddati o'tgan
                localStorage.removeItem('adminSession');
            }
        }
    }

    logout() {
        localStorage.removeItem('adminSession');
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new AdminAuth();
    new MengaCafeMenu();
});