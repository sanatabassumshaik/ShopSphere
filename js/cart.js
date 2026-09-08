"use strict";

/* =========================================
   SHOPSPHERE CART MANAGEMENT
========================================= */

const CART_STORAGE_KEY = "shopsphere_cart";


/* =========================================
   GET CART
========================================= */

function getCart() {

    const storedCart =
        localStorage.getItem(CART_STORAGE_KEY);


    if (!storedCart) {
        return [];
    }


    try {

        return JSON.parse(storedCart);

    } catch (error) {

        console.error(
            "Unable to read cart data:",
            error
        );

        return [];

    }
}


/* =========================================
   SAVE CART
========================================= */

function saveCart(cart) {

    localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(cart)
    );

}


/* =========================================
   ADD PRODUCT TO CART
========================================= */

function addToCart(productId) {

    const product =
        getProductById(productId);


    if (!product) {

        console.error(
            "Product not found:",
            productId
        );

        return;

    }


    const cart = getCart();


    const existingItem =
        cart.find(function(item) {

            return item.id === product.id;

        });


    if (existingItem) {

        existingItem.quantity += 1;

    } else {

        cart.push({

            id: product.id,
            name: product.name,
            price: product.price,
            icon: product.icon,
            quantity: 1

        });

    }


    saveCart(cart);

    updateCartCount();

    showCartMessage(
        `${product.name} added to cart!`
    );
}


/* =========================================
   REMOVE PRODUCT
========================================= */

function removeFromCart(productId) {

    let cart = getCart();


    cart = cart.filter(function(item) {

        return item.id !== Number(productId);

    });


    saveCart(cart);

    updateCartCount();

}


/* =========================================
   UPDATE QUANTITY
========================================= */

function updateCartQuantity(
    productId,
    quantity
) {

    const cart = getCart();


    const item =
        cart.find(function(cartItem) {

            return cartItem.id === Number(productId);

        });


    if (!item) {
        return;
    }


    const newQuantity =
        Number(quantity);


    if (newQuantity <= 0) {

        removeFromCart(productId);

        return;

    }


    item.quantity = newQuantity;


    saveCart(cart);

    updateCartCount();

}


/* =========================================
   CART ITEM COUNT
========================================= */

function getCartItemCount() {

    const cart = getCart();


    return cart.reduce(
        function(total, item) {

            return total + item.quantity;

        },
        0
    );
}


/* =========================================
   CART TOTAL
========================================= */

function getCartTotal() {

    const cart = getCart();


    return cart.reduce(
        function(total, item) {

            return total +
                item.price * item.quantity;

        },
        0
    );
}


/* =========================================
   UPDATE CART COUNT IN HEADER
========================================= */

function updateCartCount() {

    const cartCount =
        document.getElementById("cart-count");


    if (!cartCount) {
        return;
    }


    cartCount.textContent =
        getCartItemCount();

}


/* =========================================
   CART MESSAGE
========================================= */

function showCartMessage(message) {

    const existingMessage =
        document.querySelector(
            ".cart-message"
        );


    if (existingMessage) {

        existingMessage.remove();

    }


    const messageElement =
        document.createElement("div");


    messageElement.className =
        "cart-message";


    messageElement.textContent =
        message;


    document.body.appendChild(
        messageElement
    );


    setTimeout(function() {

        messageElement.classList.add(
            "hide"
        );


        setTimeout(function() {

            messageElement.remove();

        }, 300);

    }, 1800);

}


/* =========================================
   INITIALIZE CART
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateCartCount();

    }
);