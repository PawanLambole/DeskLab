// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const navbar = document.querySelector('.navbar');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('svg use');
    if (mobileMenu.classList.contains('active')) {
        icon.setAttribute('href', '#lucide-x');
    } else {
        icon.setAttribute('href', '#lucide-menu');
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenu.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('svg use');
        icon.setAttribute('href', '#lucide-menu');
    }
});

// Close mobile menu when clicking a link
const mobileMenuLinks = mobileMenu.querySelectorAll('a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('svg use');
        icon.setAttribute('href', '#lucide-menu');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Scroll Effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Download Tracking (Optional - can be used for analytics)
const downloadButtons = document.querySelectorAll('.download-btn');
downloadButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Track download event
        console.log('DeskLab download initiated');
        
        // Optional: Send to analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'download', {
                'event_category': 'engagement',
                'event_label': 'DeskLab Windows Installer'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.feature-card, .step, .doc-card, .faq-item');
animateElements.forEach(el => observer.observe(el));

// Copy code to clipboard (for connection codes)
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add slide animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .animate-in {
        animation: fadeIn 0.6s ease-out;
    }
`;
document.head.appendChild(style);

// Show GitHub stars count (optional)
async function fetchGitHubStars() {
    try {
        const response = await fetch('https://api.github.com/repos/PawanLambole/DeskLab');
        const data = await response.json();
        const starsElement = document.querySelector('.github-stars');
        if (starsElement && data.stargazers_count) {
            starsElement.textContent = `⭐ ${data.stargazers_count} stars`;
        }
    } catch (error) {
        console.error('Failed to fetch GitHub stars:', error);
    }
}

// Check for latest release
async function checkLatestRelease() {
    try {
        const response = await fetch('https://api.github.com/repos/PawanLambole/DeskLab/releases/latest');
        const data = await response.json();
        
        // Update version number if element exists
        const versionElement = document.querySelector('.latest-version');
        if (versionElement && data.tag_name) {
            versionElement.textContent = data.tag_name;
        }
        
        // Update download link with latest release
        const downloadLinks = document.querySelectorAll('.download-btn');
        downloadLinks.forEach(link => {
            if (data.assets && data.assets.length > 0) {
                const exeAsset = data.assets.find(asset => asset.name.endsWith('.exe'));
                if (exeAsset) {
                    link.href = exeAsset.browser_download_url;
                }
            }
        });
    } catch (error) {
        console.error('Failed to fetch latest release:', error);
    }
}

// Platform detection
function detectPlatform() {
    const platform = navigator.platform.toLowerCase();
    const userAgent = navigator.userAgent.toLowerCase();
    
    if (platform.includes('win') || userAgent.includes('windows')) {
        return 'windows';
    } else if (platform.includes('mac') || userAgent.includes('mac')) {
        return 'mac';
    } else if (platform.includes('linux') || userAgent.includes('linux')) {
        return 'linux';
    }
    return 'unknown';
}

// Show platform-specific download button
function showPlatformDownload() {
    const platform = detectPlatform();
    const platformWarning = document.querySelector('.platform-warning');
    
    if (platform !== 'windows' && platformWarning) {
        platformWarning.style.display = 'block';
        platformWarning.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
                <line x1="12" x2="12" y1="9" y2="13"/>
                <line x1="12" x2="12.01" y1="17" y2="17"/>
            </svg>
            Note: DeskLab is currently only available for Windows. Mac and Linux versions coming soon!
        `;
    }
}

// Add platform warning styles
const platformStyle = document.createElement('style');
platformStyle.textContent = `
    .platform-warning {
        display: none;
        background: #fef3c7;
        border: 2px solid #f59e0b;
        color: #92400e;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        margin-top: 1rem;
        display: none;
        align-items: center;
        gap: 0.75rem;
    }
    
    .platform-warning svg {
        flex-shrink: 0;
        color: #f59e0b;
    }
`;
document.head.appendChild(platformStyle);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Fetch GitHub data
    fetchGitHubStars();
    checkLatestRelease();
    showPlatformDownload();
    
    // Add loading state to download buttons
    downloadButtons.forEach(btn => {
        const originalText = btn.innerHTML;
        btn.addEventListener('click', function() {
            this.innerHTML = '<svg class="animate-spin" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg> Downloading...';
            
            setTimeout(() => {
                this.innerHTML = originalText;
            }, 2000);
        });
    });
});

// Spin animation for loading
const spinStyle = document.createElement('style');
spinStyle.textContent = `
    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
    
    .animate-spin {
        animation: spin 1s linear infinite;
    }
`;
document.head.appendChild(spinStyle);

// Easter egg - Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        showNotification('🎉 You found the secret! DeskLab loves you! ❤️');
        document.body.style.animation = 'rainbow 2s linear';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 2000);
    }
});

const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);

console.log('%c🚀 DeskLab Website', 'font-size: 20px; font-weight: bold; color: #3b82f6;');
console.log('%cBuilt with ❤️ by the DeskLab Team', 'font-size: 14px; color: #64748b;');
console.log('%cGitHub: https://github.com/PawanLambole/DeskLab', 'font-size: 12px; color: #10b981;');
