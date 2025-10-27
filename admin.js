// Data management functions
function getStoredData() {
    const storedCategories = localStorage.getItem('mengaCafeCategories');
    const storedProducts = localStorage.getItem('mengaCafeProducts');
    
    // Agar ma'lumotlar bo'sh bo'lsa, default ma'lumotlarni yaratish
    let categories = [];
    let products = [];
    
    if (storedCategories) {
        categories = JSON.parse(storedCategories);
    }
    
    if (storedProducts) {
        products = JSON.parse(storedProducts);
    }
    
    return { categories, products };
}

function saveCategories(categories) {
    localStorage.setItem('mengaCafeCategories', JSON.stringify(categories));
}

function saveProducts(products) {
    localStorage.setItem('mengaCafeProducts', JSON.stringify(products));
}

// DOM elements
const productsList = document.getElementById('productsList');
const productCategorySelect = document.getElementById('productCategory');
const addCategoryBtn = document.getElementById('addCategoryBtn');
const addProductBtn = document.getElementById('addProductBtn');
const exportDataBtn = document.getElementById('exportDataBtn');
const resetDataBtn = document.getElementById('resetDataBtn');

// Global data
let { categories, products } = getStoredData();

// Admin authentication check
function checkAdminAuth() {
    const session = localStorage.getItem('adminSession');
    if (!session) {
        window.location.href = 'index.html';
        return false;
    }
    
    const sessionData = JSON.parse(session);
    if (!sessionData.loggedIn || Date.now() > sessionData.expires) {
        localStorage.removeItem('adminSession');
        window.location.href = 'index.html';
        return false;
    }
    
    return true;
}

// Initialize the admin panel
function initAdmin() {
    if (!checkAdminAuth()) return;
    
    populateCategorySelect();
    displayProductsList();
    displayCategoriesList();
    setupEventListeners();
    
    console.log('Admin panel initialized');
    console.log('Categories:', categories);
    console.log('Products:', products);
}

// Populate category select in admin panel
function populateCategorySelect() {
    if (!productCategorySelect) return;
    
    productCategorySelect.innerHTML = '';
    
    if (categories.length === 0) {
        const option = document.createElement('option');
        option.textContent = 'Avval kategoriya qo\'shing';
        productCategorySelect.appendChild(option);
        return;
    }
    
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        productCategorySelect.appendChild(option);
    });
}

// Display categories list in admin panel
function displayCategoriesList() {
    const categoriesList = document.getElementById('categoriesList');
    if (!categoriesList) return;
    
    categoriesList.innerHTML = '';
    
    if (categories.length === 0) {
        categoriesList.innerHTML = '<p>Hali kategoriyalar mavjud emas.</p>';
        return;
    }
    
    categories.forEach(category => {
        const categoryCard = document.createElement('div');
        categoryCard.className = 'item-card';
        
        categoryCard.innerHTML = `
            <div class="item-card-info">
                <h4>${category.name}</h4>
                <p>ID: ${category.id}</p>
            </div>
            <div class="item-card-actions">
                <button class="btn btn-danger" data-category-id="${category.id}">O'chirish</button>
            </div>
        `;
        
        categoriesList.appendChild(categoryCard);
    });
    
    // Add event listeners to delete buttons
    document.querySelectorAll('.item-card-actions .btn-danger').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const categoryId = e.target.getAttribute('data-category-id');
            deleteCategory(categoryId);
        });
    });
}

// Display products list in admin panel
function displayProductsList() {
    if (!productsList) return;
    
    productsList.innerHTML = '';
    
    if (products.length === 0) {
        productsList.innerHTML = '<p>Hali mahsulotlar mavjud emas.</p>';
        return;
    }
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'item-card';
        
        const categoryName = categories.find(cat => cat.id === product.category)?.name || product.category;
        
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/60x60?text=Rasm'">
            <div class="item-card-info">
                <h4>${product.name}</h4>
                <p>${product.price} - ${categoryName}</p>
            </div>
            <div class="item-card-actions">
                <button class="btn btn-danger" data-id="${product.id}">O'chirish</button>
            </div>
        `;
        
        productsList.appendChild(productCard);
    });
    
    // Add event listeners to delete buttons
    document.querySelectorAll('.btn-danger[data-id]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            deleteProduct(productId);
        });
    });
}

// Add new category - YANGILANDI
function addCategory() {
    const categoryNameInput = document.getElementById('categoryName');
    if (!categoryNameInput) return;
    
    const categoryName = categoryNameInput.value.trim();
    
    if (!categoryName) {
        alert('Iltimos, kategoriya nomini kiriting!');
        return;
    }
    
    const categoryId = categoryName.toLowerCase().replace(/\s+/g, '-');
    
    // Check if category already exists
    if (categories.some(cat => cat.id === categoryId)) {
        alert('Bu kategoriya allaqachon mavjud!');
        return;
    }
    
    const newCategory = {
        id: categoryId,
        name: categoryName
    };
    
    categories.push(newCategory);
    saveCategories(categories);
    
    // Update UI
    populateCategorySelect();
    displayCategoriesList();
    
    // Clear input
    categoryNameInput.value = '';
    
    alert('Kategoriya muvaffaqiyatli qo\'shildi! Asosiy menyuda yangilanishi uchun sahifani yangilang.');
}

// Add new product - YANGILANDI
function addProduct() {
    const productName = document.getElementById('productName')?.value.trim();
    const productPrice = document.getElementById('productPrice')?.value.trim();
    const productCategory = document.getElementById('productCategory')?.value;
    const productImage = document.getElementById('productImage')?.value.trim();
    const productDescription = document.getElementById('productDescription')?.value.trim();
    
    if (!productName || !productPrice || !productCategory || !productImage) {
        alert('Iltimos, barcha maydonlarni to\'ldiring!');
        return;
    }
    
    if (categories.length === 0) {
        alert('Avval kategoriya qo\'shing!');
        return;
    }
    
    const newProduct = {
        id: Date.now(), // Simple ID generation
        name: productName,
        price: productPrice,
        category: productCategory,
        image: productImage,
        description: productDescription
    };
    
    products.push(newProduct);
    saveProducts(products);
    
    // Update UI
    displayProductsList();
    
    // Clear form
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productImage').value = '';
    document.getElementById('productDescription').value = '';
    
    alert('Mahsulot muvaffaqiyatli qo\'shildi! Asosiy menyuda yangilanishi uchun sahifani yangilang.');
}

// Delete category - YANGI FUNKSIYA
function deleteCategory(categoryId) {
    if (confirm('Bu kategoriyani o\'chirishni istaysizmi? Kategoriyadagi barcha mahsulotlar ham o\'chiriladi!')) {
        // Kategoriyani o'chirish
        categories = categories.filter(cat => cat.id !== categoryId);
        saveCategories(categories);
        
        // Shu kategoriyadagi mahsulotlarni o'chirish
        products = products.filter(product => product.category !== categoryId);
        saveProducts(products);
        
        // Update UI
        populateCategorySelect();
        displayCategoriesList();
        displayProductsList();
        
        alert('Kategoriya va uning mahsulotlari muvaffaqiyatli o\'chirildi!');
    }
}

// Delete product
function deleteProduct(productId) {
    if (confirm('Bu mahsulotni o\'chirishni istaysizmi?')) {
        products = products.filter(product => product.id !== productId);
        saveProducts(products);
        
        // Update UI
        displayProductsList();
        
        alert('Mahsulot muvaffaqiyatli o\'chirildi!');
    }
}

// Export data
function exportData() {
    const data = {
        categories: categories,
        products: products,
        exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `menga-cafe-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Reset all data
function resetData() {
    if (confirm('BARCHA ma\'lumotlarni o\'chirishni istaysizmi? Bu amalni ortga qaytarib bo\'lmaydi!')) {
        localStorage.removeItem('mengaCafeCategories');
        localStorage.removeItem('mengaCafeProducts');
        
        categories = [];
        products = [];
        
        populateCategorySelect();
        displayCategoriesList();
        displayProductsList();
        
        alert('Barcha ma\'lumotlar o\'chirildi!');
    }
}

// Logout function
function logoutAdmin() {
    localStorage.removeItem('adminSession');
    window.location.href = 'index.html';
}

// Setup event listeners
function setupEventListeners() {
    if (addCategoryBtn) {
        addCategoryBtn.addEventListener('click', addCategory);
    }
    
    if (addProductBtn) {
        addProductBtn.addEventListener('click', addProduct);
    }
    
    if (exportDataBtn) {
        exportDataBtn.addEventListener('click', exportData);
    }
    
    if (resetDataBtn) {
        resetDataBtn.addEventListener('click', resetData);
    }
    
    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logoutAdmin);
    }
}

// Initialize the admin panel when page loads
document.addEventListener('DOMContentLoaded', initAdmin);