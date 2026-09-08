"use strict";

/* =========================================
   SHOPSPHERE PRODUCT DATA
========================================= */

const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        category: "Electronics",
        price: 2499,
        rating: 4.5,
        icon: "🎧",
        description:
            "Premium wireless headphones with clear sound, comfortable ear cushions and long-lasting battery life."
    },

    {
        id: 2,
        name: "Smart Watch",
        category: "Electronics",
        price: 3499,
        rating: 4.4,
        icon: "⌚",
        description:
            "A stylish smart watch with fitness tracking, notifications and everyday health monitoring features."
    },

    {
        id: 3,
        name: "Running Shoes",
        category: "Fashion",
        price: 2999,
        rating: 4.6,
        icon: "👟",
        description:
            "Lightweight running shoes designed for comfort, support and everyday active lifestyles."
    },

    {
        id: 4,
        name: "Classic Backpack",
        category: "Fashion",
        price: 1599,
        rating: 4.3,
        icon: "🎒",
        description:
            "A durable everyday backpack with spacious compartments for books, laptops and accessories."
    },

    {
        id: 5,
        name: "Coffee Maker",
        category: "Home",
        price: 2199,
        rating: 4.2,
        icon: "☕",
        description:
            "Compact coffee maker designed to prepare fresh and delicious coffee conveniently at home."
    },

    {
        id: 6,
        name: "Desk Lamp",
        category: "Home",
        price: 899,
        rating: 4.1,
        icon: "💡",
        description:
            "Modern LED desk lamp with a clean design that is perfect for study and workspace environments."
    },

    {
        id: 7,
        name: "Gaming Keyboard",
        category: "Electronics",
        price: 1899,
        rating: 4.7,
        icon: "⌨️",
        description:
            "Responsive gaming keyboard with comfortable keys and a durable design for gaming and productivity."
    },

    {
        id: 8,
        name: "Travel Water Bottle",
        category: "Lifestyle",
        price: 699,
        rating: 4.5,
        icon: "🥤",
        description:
            "Reusable insulated water bottle designed to keep drinks at a comfortable temperature while travelling."
    },

    {
        id: 9,
        name: "Sunglasses",
        category: "Fashion",
        price: 1299,
        rating: 4.3,
        icon: "🕶️",
        description:
            "Classic sunglasses with a lightweight frame suitable for everyday outdoor use."
    },

    {
        id: 10,
        name: "Bluetooth Speaker",
        category: "Electronics",
        price: 1799,
        rating: 4.6,
        icon: "🔊",
        description:
            "Portable Bluetooth speaker delivering powerful audio in a compact and convenient design."
    },

    {
        id: 11,
        name: "Indoor Plant",
        category: "Lifestyle",
        price: 499,
        rating: 4.4,
        icon: "🪴",
        description:
            "A decorative indoor plant that adds a natural touch to bedrooms, offices and living spaces."
    },

    {
        id: 12,
        name: "Notebook Set",
        category: "Lifestyle",
        price: 399,
        rating: 4.2,
        icon: "📓",
        description:
            "A premium notebook set suitable for notes, journaling, planning and creative ideas."
    }
];


/* =========================================
   PRODUCT CATEGORIES
========================================= */

const productCategories = [
    "All",
    "Electronics",
    "Fashion",
    "Home",
    "Lifestyle"
];


/* =========================================
   FIND PRODUCT BY ID
========================================= */

function getProductById(productId) {

    return products.find(function (product) {

        return product.id === Number(productId);

    });

}


/* =========================================
   GET CATEGORIES
========================================= */

function getProductCategories() {

    return productCategories;

}