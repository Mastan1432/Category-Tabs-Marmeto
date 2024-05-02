// Function to fetch data and generate product cards
function fetchAndDisplayProducts(category) {
    let url = "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json";
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data.categories)) {
                // Find the category that matches the provided category name
                const categoryData = data.categories.find(cat => cat.category_name.toLowerCase() === category.toLowerCase());
                
                if (categoryData && Array.isArray(categoryData.category_products)) {
                    // Display products for the found category
                    displayProducts(categoryData.category_products);
                } else {
                    console.error("Category or products not found.");
                }
            } else {
                console.error("Data format error: Expected an object with 'categories' array.");
            }
        })
        .catch(error => console.error('Error fetching products:', error));
}

// Initially, display products for the "Men" category
fetchAndDisplayProducts("Men");


// Function to display product cards
function displayProducts(products) {
    const container = document.getElementById("product-container");
    container.innerHTML = ""; // Clear previous products

    products.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("product-card");

        // Image
        const image = document.createElement("img");
        image.src = product.image;
        card.appendChild(image);

        // Badge - Conditionally create and append badge only if badge text exists
        if (product.badge_text) {
            const badge = document.createElement("div");
            badge.classList.add("badge");
            badge.textContent = product.badge_text;
            card.appendChild(badge);
        }

        //productdetails=product title+vendor
        const product_details = document.createElement("div");
        product_details.classList.add("product_details");
        // Product title
        const title = document.createElement("div");
        title.classList.add("title");
        title.textContent = product.title;
        product_details.appendChild(title);

        // Vendor
        const vendor = document.createElement("li");
        vendor.classList.add("vendor");
        vendor.textContent = product.vendor;
        product_details.appendChild(vendor);
        card.appendChild(product_details);

        //product prices=price+compareprice+discount
        const product_prices = document.createElement("div");
        product_prices.classList.add("product_prices");
        // Price
        const price = document.createElement("div");
        price.classList.add("price");
        price.textContent = "Rs " + product.price + ".00";
        product_prices.appendChild(price);

        // Compare at price
        const comparePrice = document.createElement("div");
        comparePrice.classList.add("comparePrice");
        comparePrice.textContent = product.compare_at_price + ".00";
        product_prices.appendChild(comparePrice);

        // Calculate discount percentage
        const discount = ((product.compare_at_price - product.price) / product.compare_at_price) * 100;
        const discountElement = document.createElement("div");
        discountElement.classList.add("discountElement");
        discountElement.textContent = discount.toFixed(0) + "% Off";
        product_prices.appendChild(discountElement);

        card.appendChild(product_prices);

        // Add to cart button (dummy)
        const addToCartBtn = document.createElement("button");
        addToCartBtn.classList.add("addToCartBtn");
        addToCartBtn.textContent = "Add to Cart";
        card.appendChild(addToCartBtn);

        container.appendChild(card);
    });
}

// Function to show products based on category
function showProducts(category) {
    fetchAndDisplayProducts(category);
}

// Initially, display products for the "Men" category
showProducts("men");
