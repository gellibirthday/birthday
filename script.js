// State Management
let currentPhase = 1;
let scrollOpen = false;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeBackgroundAnimation();
    setupPhase1();
    setupPhase2();
    setupPhase3();
    setupRefreshButton();
});

// Refresh Button
function setupRefreshButton() {
    const refreshButton = document.getElementById('refreshButton');
    refreshButton.addEventListener('click', resetToGiftBox);
}

function resetToGiftBox() {
    // Reset all phases
    document.getElementById('phase1').classList.remove('zooming');
    document.getElementById('phase2').classList.remove('active');
    document.getElementById('phase3').classList.remove('active');
    document.getElementById('phase1').classList.add('active');
    
    // Reset birthday title
    document.getElementById('birthdayTitle').classList.remove('fly-up');
    
    // Reset scroll
    const scrollPaper = document.getElementById('scrollPaper');
    const ribbonWrap = document.getElementById('ribbonWrap');
    const scrollActionButton = document.getElementById('scrollActionButton');
    
    scrollPaper.classList.remove('unfurled');
    ribbonWrap.classList.remove('untied');
    ribbonWrap.style.display = 'flex';
    scrollActionButton.textContent = 'Open It';
    scrollOpen = false;
    
    // Clear floating elements
    document.getElementById('floatingElements').innerHTML = '';
    
    // Restart phase 1 floating elements
    startPhase1FloatingElements();
    
    currentPhase = 1;
}

// Background Animation - Floating Balloons and Hearts
function initializeBackgroundAnimation() {
    const bgAnimation = document.getElementById('background-animation');
    
    // Create initial set of floating elements
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            createBackgroundElement(bgAnimation);
        }, i * 500);
    }
    
    // Continuously create new elements
    setInterval(() => {
        createBackgroundElement(bgAnimation);
    }, 2000);
}

function createBackgroundElement(container) {
    const isBalloon = Math.random() > 0.5;
    const element = document.createElement('div');
    element.className = isBalloon ? 'bg-balloon' : 'bg-heart';
    
    // Random horizontal position
    element.style.left = Math.random() * 100 + '%';
    
    // Random animation duration
    const duration = 6 + Math.random() * 4;
    element.style.animationDuration = duration + 's';
    
    // Random delay
    element.style.animationDelay = Math.random() * 2 + 's';
    
    container.appendChild(element);
    
    // Remove element after animation completes
    setTimeout(() => {
        element.remove();
    }, (duration + 2) * 1000);
}

// Phase 1: Gift Box Setup
function setupPhase1() {
    const openButton = document.getElementById('openButton');
    openButton.addEventListener('click', openGiftBox);
    
    // Start floating elements for phase 1
    startPhase1FloatingElements();
}

function startPhase1FloatingElements() {
    const floatingElements = document.getElementById('floatingElementsPhase1');
    
    // Clear existing elements
    floatingElements.innerHTML = '';
    
    // Create continuous floating elements
    const interval = setInterval(() => {
        if (currentPhase !== 1) {
            clearInterval(interval);
            floatingElements.innerHTML = '';
            return;
        }
        createPhase1FloatingElement(floatingElements);
    }, 800);
    
    // Create initial burst
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            if (currentPhase === 1) {
                createPhase1FloatingElement(floatingElements);
            }
        }, i * 200);
    }
}

function createPhase1FloatingElement(container) {
    const isBalloon = Math.random() > 0.5;
    const element = document.createElement('div');
    element.className = isBalloon ? 'float-balloon' : 'float-heart';
    
    // Random horizontal starting position
    element.style.left = Math.random() * 90 + 5 + '%';
    element.style.bottom = '-100px';
    
    // Random animation properties
    const duration = 4 + Math.random() * 3;
    element.style.animationDuration = duration + 's';
    
    // Random size variation
    const scale = 0.7 + Math.random() * 0.6;
    element.style.transform = `scale(${scale})`;
    
    container.appendChild(element);
    
    // Remove after animation
    setTimeout(() => {
        element.remove();
    }, duration * 1000);
}

function openGiftBox() {
    const phase1 = document.getElementById('phase1');
    const phase2 = document.getElementById('phase2');
    
    // Zoom into gift box
    phase1.classList.add('zooming');
    
    // After zoom animation, show phase 2
    setTimeout(() => {
        phase1.classList.remove('active');
        phase2.classList.add('active');
        currentPhase = 2;
    }, 1500);
}

// Phase 2: Cake & Wish Setup
function setupPhase2() {
    const wishButton = document.getElementById('wishButton');
    wishButton.addEventListener('click', makeWish);
}

function makeWish() {
    const phase2 = document.getElementById('phase2');
    const phase3 = document.getElementById('phase3');
    const birthdayTitle = document.getElementById('birthdayTitle');
    
    // Brief pause before transitions
    setTimeout(() => {
        // Transition to Phase 3
        phase2.classList.remove('active');
        phase3.classList.add('active');
        currentPhase = 3;
        
        // Show and fly up the birthday title
        setTimeout(() => {
            birthdayTitle.classList.add('fly-up');
        }, 100);
        
        // Start celebration effects
        setTimeout(() => {
            startCelebration();
        }, 800);
    }, 800);
}


// Phase 3: Celebration Setup
function setupPhase3() {
    const scrollActionButton = document.getElementById('scrollActionButton');
    const closeScrollButton = document.getElementById('closeScrollButton');
    
    scrollActionButton.addEventListener('click', toggleScroll);
    closeScrollButton.addEventListener('click', furlScroll);
}


function toggleScroll() {
    if (!scrollOpen) {
        unfurlScroll();
    } else {
        furlScroll();
    }
}

function unfurlScroll() {
    const ribbonWrap = document.getElementById('ribbonWrap');
    const scrollPaper = document.getElementById('scrollPaper');
    const scrollActionButton = document.getElementById('scrollActionButton');
    const closeScrollButton = document.getElementById('closeScrollButton');

    ribbonWrap.classList.add('untied');
    setTimeout(() => {
        scrollPaper.classList.add('unfurled');
        scrollPaper.classList.remove('furling');
        ribbonWrap.style.display = 'none';
        scrollActionButton.textContent = 'Hide';
        closeScrollButton.classList.add('visible'); // Show the close button
        scrollOpen = true;
    }, 800);
}

function furlScroll() {
    const ribbonWrap = document.getElementById('ribbonWrap');
    const scrollPaper = document.getElementById('scrollPaper');
    const scrollActionButton = document.getElementById('scrollActionButton');
    const closeScrollButton = document.getElementById('closeScrollButton');

    scrollPaper.classList.remove('unfurled');
    scrollPaper.classList.add('furling');
    scrollActionButton.textContent = 'Open It';
    closeScrollButton.classList.remove('visible'); // Hide the close button
    setTimeout(() => {
        ribbonWrap.style.display = 'flex';
        ribbonWrap.classList.remove('untied');
        scrollOpen = false;
    }, 800);
}

function startCelebration() {
    const floatingElements = document.getElementById('floatingElements');
    
    // Create continuous floating elements
    setInterval(() => {
        if (currentPhase === 3) {
            createFloatingElement(floatingElements);
        }
    }, 800);
    
    // Create initial burst
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            createFloatingElement(floatingElements);
        }, i * 200);
    }
}

function createFloatingElement(container) {
    const isBalloon = Math.random() > 0.5;
    const element = document.createElement('div');
    element.className = isBalloon ? 'float-balloon' : 'float-heart';
    
    // Random horizontal starting position
    element.style.left = Math.random() * 90 + 5 + '%';
    element.style.bottom = '-100px';
    
    // Random animation properties
    const duration = 4 + Math.random() * 3;
    element.style.animationDuration = duration + 's';
    
    // Random size variation
    const scale = 0.7 + Math.random() * 0.6;
    element.style.transform = `scale(${scale})`;
    
    container.appendChild(element);
    
    // Remove after animation
    setTimeout(() => {
        element.remove();
    }, duration * 1000);
}

// Utility function to preload images
function preloadImages() {
    const images = ['cake-lit.jpg', 'cake-blown.jpg'];
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Preload images when page loads
preloadImages();