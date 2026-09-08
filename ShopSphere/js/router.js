"use strict";

/*
 * ShopSphere
 * Client-Side Router
 *
 * Handles navigation between application views
 * using URL hash routing.
 */

function router() {
    const hash = window.location.hash || "#/";

    /*
     * Product details route
     *
     * Example:
     * #/product/5
     */
    if (hash.startsWith("#/product/")) {
        const productId = hash.split("/")[2];

        renderProductDetailsPage(productId);
    }

    /*
     * Standard application routes
     */
    else {
        switch (hash) {

            case "#/":
                renderHomePage();
                break;

            case "#/products":
                renderProductsPage();
                break;

            case "#/about":
                renderAboutPage();
                break;

            case "#/cart":
                renderCartPage();
                break;

            default:
                window.location.hash = "#/";
                return;
        }
    }

    updateActiveNavigation();

    closeMobileMenu();

    updateCartCount();
}


/*
 * Highlight the currently active navigation link.
 */
function updateActiveNavigation() {

    const currentHash =
        window.location.hash || "#/";

    const navLinks =
        document.querySelectorAll(
            "#nav-links a"
        );

    navLinks.forEach(function(link) {

        link.classList.remove("active");

        const linkHash =
            link.getAttribute("href");

        if (
            linkHash === currentHash ||
            (
                currentHash.startsWith("#/product/") &&
                linkHash === "#/products"
            )
        ) {
            link.classList.add("active");
        }

    });
}


/*
 * Initialize the router.
 */
window.addEventListener(
    "hashchange",
    router
);