"use strict";

/*
 * ShopSphere
 * Main Application Logic
 *
 * Responsible for rendering application pages
 * and handling page-specific interactions.
 */


/* =========================================
   DOM REFERENCES
========================================= */

const app =
    document.getElementById("app");

const menuToggle =
    document.getElementById("menu-toggle");

const navLinks =
    document.getElementById("nav-links");


/* =========================================
   HOME PAGE
========================================= */

function renderHomePage() {

    app.innerHTML = `
        <section class="hero">
            <div class="container hero-content">

                <div class="hero-text">

                    <p class="eyebrow">
                        Welcome to ShopSphere
                    </p>

                    <h1>
                        Shop smarter.
                        Live better.
                    </h1>

                    <p>
                        Discover quality products across
                        electronics, fashion, home and
                        lifestyle — all in one simple
                        shopping experience.
                    </p>

                    <a
                        href="#/products"
                        class="primary-button"
                    >
                        Explore Products
                    </a>

                </div>

            </div>
        </section>


        <section class="features">
            <div class="container">

                <div class="section-heading">

                    <p class="eyebrow">
                        Why ShopSphere?
                    </p>

                    <h2>
                        Everything you need
                    </h2>

                    <p>
                        A modern shopping experience
                        designed for simplicity.
                    </p>

                </div>


                <div class="feature-grid">

                    <article class="feature-card">

                        <div
                            class="feature-icon"
                            aria-hidden="true"
                        >
                            🛍️
                        </div>

                        <h3>
                            Wide Selection
                        </h3>

                        <p>
                            Browse products across
                            multiple categories.
                        </p>

                    </article>


                    <article class="feature-card">

                        <div
                            class="feature-icon"
                            aria-hidden="true"
                        >
                            🔒
                        </div>

                        <h3>
                            Simple & Secure
                        </h3>

                        <p>
                            Enjoy a clean and reliable
                            shopping interface.
                        </p>

                    </article>


                    <article class="feature-card">

                        <div
                            class="feature-icon"
                            aria-hidden="true"
                        >
                            ⚡
                        </div>

                        <h3>
                            Fast Experience
                        </h3>

                        <p>
                            Lightweight client-side
                            navigation for quick browsing.
                        </p>

                    </article>

                </div>

            </div>
        </section>
    `;
}


/* =========================================
   PRODUCTS PAGE
========================================= */

function renderProductsPage() {

    app.innerHTML = `
        <section class="products-section">

            <div class="container">

                <div class="section-heading">

                    <p class="eyebrow">
                        Shop
                    </p>

                    <h1>
                        Our Products
                    </h1>

                    <p>
                        Find products that match
                        your needs.
                    </p>

                </div>


                <div class="product-controls">

                    <label>
                        <span class="sr-only">
                            Search products
                        </span>

                        <input
                            type="search"
                            id="product-search"
                            class="search-input"
                            placeholder="Search products..."
                            aria-label="Search products"
                        >
                    </label>


                    <label>
                        <span class="sr-only">
                            Filter products by category
                        </span>

                        <select
                            id="category-filter"
                            class="category-filter"
                            aria-label="Filter products by category"
                        >
                            ${getProductCategories()
                                .map(function(category) {
                                    return `
                                        <option value="${category}">
                                            ${category}
                                        </option>
                                    `;
                                })
                                .join("")}
                        </select>
                    </label>

                </div>


                <p
                    id="product-count"
                    class="product-count"
                ></p>


                <div
                    id="product-grid"
                    class="product-grid"
                ></div>

            </div>

        </section>
    `;


    const searchInput =
        document.getElementById(
            "product-search"
        );

    const categoryFilter =
        document.getElementById(
            "category-filter"
        );


    function updateProducts() {

        const searchTerm =
            searchInput.value
                .trim()
                .toLowerCase();

        const selectedCategory =
            categoryFilter.value;


        const filteredProducts =
            products.filter(function(product) {

                const matchesSearch =
                    product.name
                        .toLowerCase()
                        .includes(searchTerm) ||
                    product.description
                        .toLowerCase()
                        .includes(searchTerm);


                const matchesCategory =
                    selectedCategory === "All" ||
                    product.category ===
                        selectedCategory;


                return (
                    matchesSearch &&
                    matchesCategory
                );

            });


        createProductCards(
            filteredProducts
        );
    }


    searchInput.addEventListener(
        "input",
        updateProducts
    );


    categoryFilter.addEventListener(
        "change",
        updateProducts
    );


    updateProducts();
}


/* =========================================
   PRODUCT CARDS
========================================= */

function createProductCards(
    productList
) {

    const productGrid =
        document.getElementById(
            "product-grid"
        );

    const productCount =
        document.getElementById(
            "product-count"
        );


    if (!productGrid) {
        return;
    }


    if (productCount) {

        productCount.textContent =
            `${productList.length} product${
                productList.length !== 1
                    ? "s"
                    : ""
            } found`;

    }


    if (productList.length === 0) {

        productGrid.innerHTML = `
            <div class="empty-products">

                <div
                    class="empty-icon"
                    aria-hidden="true"
                >
                    🔍
                </div>

                <h2>
                    No products found
                </h2>

                <p>
                    Try a different search term
                    or category.
                </p>

            </div>
        `;

        return;
    }


    productGrid.innerHTML =
        productList.map(function(product) {

            return `
                <article class="product-card">

                    <a
                        href="#/product/${product.id}"
                        class="product-image"
                        aria-label="View ${product.name}"
                    >
                        <span
                            class="product-icon"
                            aria-hidden="true"
                        >
                            ${product.icon}
                        </span>
                    </a>


                    <div class="product-content">

                        <span class="product-category">
                            ${product.category}
                        </span>


                        <h2>
                            <a
                                href="#/product/${product.id}"
                            >
                                ${product.name}
                            </a>
                        </h2>


                        <p class="product-description">
                            ${product.description}
                        </p>


                        <div class="product-rating">
                            ⭐ ${product.rating} / 5
                        </div>


                        <div class="product-bottom">

                            <strong class="product-price">
                                ₹${product.price.toLocaleString("en-IN")}
                            </strong>


                            <button
                                type="button"
                                class="add-cart-button"
                                data-product-id="${product.id}"
                            >
                                🛒 Add to Cart
                            </button>

                        </div>

                    </div>

                </article>
            `;

        }).join("");


    setupAddToCartButtons();
}


/* =========================================
   ADD TO CART BUTTONS
========================================= */

function setupAddToCartButtons() {

    const buttons =
        document.querySelectorAll(
            ".add-cart-button"
        );


    buttons.forEach(function(button) {

        button.addEventListener(
            "click",
            function(event) {

                event.preventDefault();

                const productId =
                    Number(
                        button.dataset.productId
                    );


                addToCart(productId);


                const originalText =
                    button.textContent;


                button.textContent =
                    "Added ✓";


                setTimeout(function() {

                    button.textContent =
                        originalText;

                }, 1200);

            }
        );

    });
}


/* =========================================
   PRODUCT DETAILS PAGE
========================================= */

function renderProductDetailsPage(
    productId
) {

    const product =
        getProductById(productId);


    if (!product) {

        app.innerHTML = `
            <section class="content-section">

                <div class="container">

                    <div class="cart-placeholder">

                        <h2>
                            Product Not Found
                        </h2>

                        <p>
                            The product you are
                            looking for does not exist.
                        </p>

                        <a
                            href="#/products"
                            class="primary-button"
                        >
                            Back to Products
                        </a>

                    </div>

                </div>

            </section>
        `;

        return;
    }


    app.innerHTML = `
        <section class="content-section">

            <div class="container">

                <a
                    href="#/products"
                    class="back-link"
                >
                    ← Back to Products
                </a>


                <div class="product-details">

                    <div
                        class="product-details-image"
                    >
                        <span
                            class="product-details-icon"
                            aria-hidden="true"
                        >
                            ${product.icon}
                        </span>
                    </div>


                    <div
                        class="product-details-content"
                    >

                        <span class="product-category">
                            ${product.category}
                        </span>


                        <h1>
                            ${product.name}
                        </h1>


                        <div
                            class="product-details-rating"
                        >
                            ⭐ ${product.rating} / 5
                        </div>


                        <p
                            class="product-details-description"
                        >
                            ${product.description}
                        </p>


                        <div
                            class="product-details-price"
                        >
                            ₹${product.price.toLocaleString("en-IN")}
                        </div>


                        <button
                            type="button"
                            id="details-add-cart"
                            class="primary-button"
                            data-product-id="${product.id}"
                        >
                            🛒 Add to Cart
                        </button>

                    </div>

                </div>

            </div>

        </section>
    `;


    const addButton =
        document.getElementById(
            "details-add-cart"
        );


    if (addButton) {

        addButton.addEventListener(
            "click",
            function() {

                addToCart(product.id);


                addButton.textContent =
                    "Added to Cart ✓";


                setTimeout(function() {

                    addButton.textContent =
                        "🛒 Add to Cart";

                }, 1200);

            }
        );

    }
}


/* =========================================
   ABOUT PAGE
========================================= */

function renderAboutPage() {

    app.innerHTML = `
        <section class="content-section">

            <div class="container">

                <div class="section-heading">

                    <p class="eyebrow">
                        About
                    </p>

                    <h1>
                        About ShopSphere
                    </h1>

                </div>


                <div class="about-content">

                    <p>
                        ShopSphere is a modern e-commerce
                        product catalog created as a
                        full-stack deployment and
                        project architecture capstone.
                    </p>

                    <p>
                        The application demonstrates
                        modular JavaScript architecture,
                        client-side routing, product
                        filtering, product details,
                        shopping cart functionality and
                        browser-based data persistence.
                    </p>

                    <p>
                        The project is designed to provide
                        a fast, responsive and accessible
                        shopping experience.
                    </p>

                </div>

            </div>

        </section>
    `;
}


/* =========================================
   CART PAGE
========================================= */

function renderCartPage() {

    const cart = getCart();


    if (cart.length === 0) {

        app.innerHTML = `
            <section class="content-section">

                <div class="container">

                    <div class="section-heading">

                        <p class="eyebrow">
                            Shopping Cart
                        </p>

                        <h1>
                            Your Cart
                        </h1>

                    </div>


                    <div class="cart-placeholder">

                        <div
                            class="empty-icon"
                            aria-hidden="true"
                        >
                            🛒
                        </div>

                        <h2>
                            Your cart is empty
                        </h2>

                        <p>
                            Add some products to
                            get started.
                        </p>

                        <a
                            href="#/products"
                            class="primary-button"
                        >
                            Browse Products
                        </a>

                    </div>

                </div>

            </section>
        `;

        return;
    }


    const cartItems =
        cart.map(function(item) {

            const itemTotal =
                item.price * item.quantity;


            return `
                <article class="cart-item">

                    <div class="cart-item-icon">
                        <span aria-hidden="true">
                            ${item.icon}
                        </span>
                    </div>


                    <div class="cart-item-details">

                        <h2>
                            ${item.name}
                        </h2>

                        <p>
                            ₹${item.price.toLocaleString("en-IN")}
                            each
                        </p>

                    </div>


                    <div class="cart-item-actions">

                        <label>
                            Quantity

                            <input
                                type="number"
                                class="quantity-input"
                                min="1"
                                value="${item.quantity}"
                                data-product-id="${item.id}"
                                aria-label="Quantity for ${item.name}"
                            >
                        </label>


                        <strong>
                            ₹${itemTotal.toLocaleString("en-IN")}
                        </strong>


                        <button
                            type="button"
                            class="remove-cart-button"
                            data-product-id="${item.id}"
                        >
                            Remove
                        </button>

                    </div>

                </article>
            `;

        }).join("");


    const subtotal =
        getCartTotal();


    app.innerHTML = `
        <section class="content-section">

            <div class="container">

                <div class="section-heading">

                    <p class="eyebrow">
                        Shopping Cart
                    </p>

                    <h1>
                        Your Cart
                    </h1>

                </div>


                <div class="cart-items">
                    ${cartItems}
                </div>


                <div class="cart-summary">

                    <h2>
                        Order Summary
                    </h2>


                    <p>
                        <span>
                            Items
                        </span>

                        <strong>
                            ${getCartItemCount()}
                        </strong>
                    </p>


                    <p>
                        <span>
                            Subtotal
                        </span>

                        <strong>
                            ₹${subtotal.toLocaleString("en-IN")}
                        </strong>
                    </p>


                    <p class="cart-total">
                        <span>
                            Total
                        </span>

                        <strong>
                            ₹${subtotal.toLocaleString("en-IN")}
                        </strong>
                    </p>


                    <button
                        type="button"
                        class="primary-button"
                        id="checkout-button"
                    >
                        Proceed to Checkout
                    </button>

                </div>

            </div>

        </section>
    `;


    setupCartControls();
}


/* =========================================
   CART CONTROLS
========================================= */

function setupCartControls() {

    const quantityInputs =
        document.querySelectorAll(
            ".quantity-input"
        );


    quantityInputs.forEach(
        function(input) {

            input.addEventListener(
                "change",
                function() {

                    const productId =
                        Number(
                            input.dataset.productId
                        );


                    const quantity =
                        Number(input.value);


                    updateCartQuantity(
                        productId,
                        quantity
                    );


                    renderCartPage();

                }
            );

        }
    );


    const removeButtons =
        document.querySelectorAll(
            ".remove-cart-button"
        );


    removeButtons.forEach(
        function(button) {

            button.addEventListener(
                "click",
                function() {

                    const productId =
                        Number(
                            button.dataset.productId
                        );


                    removeFromCart(
                        productId
                    );


                    renderCartPage();

                }
            );

        }
    );


    const checkoutButton =
        document.getElementById(
            "checkout-button"
        );


    if (checkoutButton) {

        checkoutButton.addEventListener(
            "click",
            function() {

                showCartMessage(
                    "Checkout is coming soon!"
                );

            }
        );

    }
}


/* =========================================
   MOBILE MENU
========================================= */

function closeMobileMenu() {

    if (!navLinks) {
        return;
    }


    navLinks.classList.remove(
        "open"
    );


    if (menuToggle) {

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }
}


if (menuToggle) {

    menuToggle.addEventListener(
        "click",
        function() {

            const isOpen =
                navLinks.classList.toggle(
                    "open"
                );


            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        }
    );

}


/* =========================================
   APPLICATION INITIALIZATION
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateCartCount();

        router();

    }
);