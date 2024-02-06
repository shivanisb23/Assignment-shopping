window.onload = function() {
    fetchProducts('Men');
    document.getElementById('menButton').classList.add('selected'); 
};

function fetchProducts(category) {
    fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
        .then(response => response.json())
        .then(data => {
            const categories = data.categories;
            console.log("cat", categories);
            categories.forEach(product => {
                if(product.category_name === (category)){
                    console.log(product.category_name);
                    const categoryProducts = product.category_products;
                    renderProducts(categoryProducts);
                }
                
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

function renderProducts(products) {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        const percentageOff = calculatePercentageOff(product.price, product.compare_at_price);

        productCard.innerHTML = `
        <div class="product-content">
            <div class="image-container">
                <img src="${product.image}" alt="${product.name}">
                ${product.badge_text ? `<p class="badge">${product.badge_text}</p>` : ''}
            </div>
            <p><strong class="product-title">${product.title}</strong> - ${product.vendor}</p>
            <p>Rs${product.price}.00  <span style="color: grey; text-decoration: line-through;">${product.compare_at_price}.0</span> <span style="color: red;">${percentageOff}% off</span></p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        </div>`;
        productsContainer.appendChild(productCard);
    });
}

function calculatePercentageOff(price, compareAtPrice) {
    if (compareAtPrice && compareAtPrice > price) {
        const percentageOff = ((compareAtPrice - price) / compareAtPrice) * 100;
        return Math.round(percentageOff);
    } else {
        return 0;
    }
}