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

        // Menu Carousel
        const menuCarousel = document.querySelector('.menu-carousel-container');
        const menuDots = document.querySelectorAll('.carousel-dot');
        const menuPrev = document.querySelector('.menu-carousel .prev');
        const menuNext = document.querySelector('.menu-carousel .next');
        let menuCurrentSlide = 0;

        function updateMenuCarousel() {
            menuCarousel.style.transform = `translateX(-${menuCurrentSlide * 100}%)`;
            
            // Update dots
            menuDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === menuCurrentSlide);
            });
        }

        menuPrev.addEventListener('click', () => {
            menuCurrentSlide = (menuCurrentSlide - 1 + menuDots.length) % menuDots.length;
            updateMenuCarousel();
        });

        menuNext.addEventListener('click', () => {
            menuCurrentSlide = (menuCurrentSlide + 1) % menuDots.length;
            updateMenuCarousel();
        });

        menuDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                menuCurrentSlide = index;
                updateMenuCarousel();
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

        // Menu item data
        const menuItemData = {
            1: {
                title: "Classic Cheeseburger",
                price: "$8.99",
                description: "Juicy beef patty with melted cheese, fresh lettuce, tomato, and our special sauce.",
                icon: "fa-hamburger",
                ingredients: [
                    "100% Angus beef patty",
                    "American cheese",
                    "Fresh lettuce",
                    "Ripe tomato",
                    "Red onion",
                    "Pickles",
                    "Special sauce",
                    "Sesame seed bun"
                ],
                nutrition: "Calories: 650 | Protein: 35g | Carbs: 45g | Fat: 35g"
            },
            2: {
                title: "Bacon Deluxe",
                price: "$10.99",
                description: "Double beef patty with crispy bacon, cheddar cheese, and smoky BBQ sauce.",
                icon: "fa-bacon",
                ingredients: [
                    "Two 100% Angus beef patties",
                    "Crispy bacon strips",
                    "Cheddar cheese",
                    "Caramelized onions",
                    "Fresh lettuce",
                    "Smoky BBQ sauce",
                    "Toasted brioche bun"
                ],
                nutrition: "Calories: 850 | Protein: 45g | Carbs: 50g | Fat: 45g"
            },
            3: {
                title: "Mushroom Swiss",
                price: "$9.99",
                description: "Beef patty topped with sautéed mushrooms and melted Swiss cheese.",
                icon: "fa-cheese",
                ingredients: [
                    "100% Angus beef patty",
                    "Sautéed mushrooms",
                    "Swiss cheese",
                    "Caramelized onions",
                    "Arugula",
                    "Garlic aioli",
                    "Toasted artisan bun"
                ],
                nutrition: "Calories: 720 | Protein: 38g | Carbs: 48g | Fat: 38g"
            },
            4: {
                title: "Classic Fries",
                price: "$3.99",
                description: "Golden crispy fries seasoned with our special blend of spices.",
                icon: "fa-french-fries",
                ingredients: [
                    "Premium potatoes",
                    "Sea salt",
                    "Black pepper",
                    "Paprika",
                    "Garlic powder",
                    "Served with ketchup"
                ],
                nutrition: "Calories: 320 | Protein: 4g | Carbs: 45g | Fat: 14g"
            },
            5: {
                title: "Cheese Fries",
                price: "$5.99",
                description: "Our classic fries topped with melted cheese sauce and crispy bacon bits.",
                icon: "fa-cheese",
                ingredients: [
                    "Classic fries",
                    "Melted cheese sauce",
                    "Crispy bacon bits",
                    "Chopped green onions",
                    "Sour cream (optional)"
                ],
                nutrition: "Calories: 580 | Protein: 15g | Carbs: 48g | Fat: 35g"
            },
            6: {
                title: "Garlic Bread",
                price: "$4.99",
                description: "Toasted bread with garlic butter and herbs, served with marinara sauce.",
                icon: "fa-bread-slice",
                ingredients: [
                    "Artisan bread",
                    "Garlic butter",
                    "Italian herbs",
                    "Parmesan cheese",
                    "Fresh parsley",
                    "Marinara dipping sauce"
                ],
                nutrition: "Calories: 280 | Protein: 8g | Carbs: 35g | Fat: 12g"
            },
            7: {
                title: "Fresh Lemonade",
                price: "$2.99",
                description: "Freshly squeezed lemons with just the right amount of sweetness.",
                icon: "fa-beer",
                ingredients: [
                    "Freshly squeezed lemon juice",
                    "Pure cane sugar",
                    "Filtered water",
                    "Ice",
                    "Lemon slices for garnish"
                ],
                nutrition: "Calories: 120 | Protein: 0g | Carbs: 32g | Fat: 0g"
            },
            8: {
                title: "Chocolate Shake",
                price: "$4.99",
                description: "Rich, creamy chocolate milkshake topped with whipped cream.",
                icon: "fa-ice-cream",
                ingredients: [
                    "Premium vanilla ice cream",
                    "Chocolate syrup",
                    "Milk",
                    "Whipped cream",
                    "Chocolate shavings",
                    "Maraschino cherry"
                ],
                nutrition: "Calories: 420 | Protein: 8g | Carbs: 55g | Fat: 18g"
            },
            9: {
                title: "Cookie Sundae",
                price: "$5.99",
                description: "Warm chocolate chip cookie topped with vanilla ice cream and hot fudge.",
                icon: "fa-cookie",
                ingredients: [
                    "Warm chocolate chip cookie",
                    "Vanilla ice cream",
                    "Hot fudge sauce",
                    "Whipped cream",
                    "Chopped nuts",
                    "Maraschino cherry"
                ],
                nutrition: "Calories: 580 | Protein: 6g | Carbs: 75g | Fat: 28g"
            }
        };

        // Open modal when menu item is clicked
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                const itemId = item.getAttribute('data-item');
                const itemData = menuItemData[itemId];
                
                if (itemData) {
                    document.getElementById('modal-title').textContent = itemData.title;
                    document.getElementById('modal-price').textContent = itemData.price;
                    document.getElementById('modal-description').textContent = itemData.description;
                    document.getElementById('modal-icon').className = `fas ${itemData.icon}`;
                    
                    const ingredientsList = document.getElementById('modal-ingredients');
                    ingredientsList.innerHTML = '';
                    itemData.ingredients.forEach(ingredient => {
                        const li = document.createElement('li');
                        li.textContent = ingredient;
                        ingredientsList.appendChild(li);
                    });
                    
                    document.getElementById('modal-nutrition').textContent = itemData.nutrition;
                    
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        // Close modal
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if(targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if(targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    document.querySelector('.nav-links').classList.remove('active');
                    document.querySelector('.mobile-menu i').classList.add('fa-bars');
                    document.querySelector('.mobile-menu i').classList.remove('fa-times');
                }
            });
        });

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