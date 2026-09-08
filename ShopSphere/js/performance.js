"use strict";

/*
 * ShopSphere
 * Performance Optimization Module
 *
 * Provides lightweight client-side performance
 * monitoring without external libraries.
 */


/* =========================================
   PERFORMANCE MONITORING
========================================= */

function measurePagePerformance() {

    if (!window.performance) {
        return;
    }


    const navigation =
        performance.getEntriesByType(
            "navigation"
        )[0];


    if (!navigation) {
        return;
    }


    const pageLoadTime =
        navigation.loadEventEnd -
        navigation.startTime;


    if (pageLoadTime > 3000) {

        console.warn(
            `ShopSphere page load time: ${Math.round(pageLoadTime)}ms`
        );

    }

}


/* =========================================
   IDLE TASK
========================================= */

function runWhenIdle(callback) {

    if (
        "requestIdleCallback" in window
    ) {

        window.requestIdleCallback(
            callback
        );

    } else {

        window.setTimeout(
            callback,
            100
        );

    }

}


/* =========================================
   INITIALIZE PERFORMANCE MODULE
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        runWhenIdle(
            measurePagePerformance
        );

    }
);