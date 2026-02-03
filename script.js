// Video Background Management
function initializeVideoBackground() {
    const video = document.getElementById('bg-video');
    
    if (video) {
        // Ensure video plays (some browsers require user interaction)
        video.play().catch(e => {
            console.log('Auto-play prevented, video will play when user interacts with page');
            
            // Try to play video on first user interaction
            document.addEventListener('click', function() {
                video.play().catch(e => console.log('Video play failed'));
            }, { once: true });
        });
        
        // Handle video loading
        video.addEventListener('loadstart', function() {
            console.log('Video loading started');
        });
        
        video.addEventListener('canplay', function() {
            console.log('Video can start playing');
        });
        
        video.addEventListener('error', function(e) {
            console.log('Video error:', e);
            // Show fallback background if video fails
            const videoContainer = document.getElementById('video-background');
            if (videoContainer) {
                videoContainer.style.display = 'none';
                document.body.style.background = 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 25%, #141414 50%, #1a1a1a 75%, #0a0a0a 100%)';
            }
        });
    }
}

// Initialize modal videos
function initializeModalVideos() {
    const modalVideos = ['studies-video', 'senior-manager-video', 'iam-video'];
    
    modalVideos.forEach(videoId => {
        const video = document.getElementById(videoId);
        if (video) {
            video.addEventListener('error', function(e) {
                console.log(`Modal video ${videoId} error:`, e);
                // Hide video and show fallback
                video.style.display = 'none';
                const fallback = video.nextElementSibling;
                if (fallback && fallback.tagName === 'DIV') {
                    fallback.style.display = 'flex';
                }
            });
            
            // Try to play when modal opens
            video.addEventListener('loadstart', function() {
                console.log(`Modal video ${videoId} loading started`);
            });
        }
    });
}

// Netflix Sound Effect
function playNetflixSound() {
    const audio = document.getElementById('netflix-sound');
    
    if (audio) {
        try {
            audio.volume = 0.5; // Set volume to 50%
            audio.play().catch(e => {
                console.log('Audio autoplay prevented:', e);
                
                // Try to play on first user interaction
                document.addEventListener('click', function() {
                    audio.play().catch(e => {
                        console.log('Audio play failed:', e);
                    });
                }, { once: true });
            });
        } catch (e) {
            console.log('Audio error:', e);
        }
    }
}

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

// Download resume function
function downloadResume() {
    const link = document.createElement('a');
    link.href = './assets/documents/David_Graves_Resume.pdf';
    link.download = 'David_Graves_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Modal functions
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Initialize video background and other animations when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Start video background
    initializeVideoBackground();
    
    // Initialize modal videos
    initializeModalVideos();
    
    // Play Netflix sound after a short delay to let page settle
    setTimeout(() => {
        playNetflixSound();
    }, 1000);
    
    // Add initial styles for animation
    const cards = document.querySelectorAll('.card, .skill-category, .contact-item');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Profile image placeholder if no image is provided
    const profileImg = document.getElementById('profile-img');
    profileImg.onerror = function() {
        this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzUwIiBoZWlnaHQ9IjM1MCIgdmlld0JveD0iMCAwIDM1MCAzNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzNTAiIGhlaWdodD0iMzUwIiByeD0iMTc1IiBmaWxsPSIjMUExQTFBIi8+CjxjaXJjbGUgY3g9IjE3NSIgY3k9IjEzMCIgcj0iNTAiIGZpbGw9IiNFNTA5MTQiLz4KPHBhdGggZD0iTTEwMCAyNzBDMTAwIDI0My4zNzMgMTIxLjM3MyAyMjIgMTQ4IDIyMkgyMDJDMjI4LjYyNyAyMjIgMjUwIDI0My4zNzMgMjUwIDI3MFYzMDBIMTAwVjI3MFoiIGZpbGw9IiNFNTA5MTQiLz4KPC9zdmc+';
    };
    
    // Smooth reveal animation for hero content
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        const heroImage = document.querySelector('.hero-image');
        
        if (heroContent) {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateX(0)';
        }
        
        if (heroImage) {
            heroImage.style.opacity = '1';
            heroImage.style.transform = 'translateX(0)';
        }
    }, 100);
});

// Add hover effects for skill tags
document.addEventListener('DOMContentLoaded', function() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Carousel scroll functionality (optional enhancement)
function scrollCarousel(direction, carouselElement) {
    const scrollAmount = 320; // Width of card + gap
    if (direction === 'left') {
        carouselElement.scrollLeft -= scrollAmount;
    } else {
        carouselElement.scrollLeft += scrollAmount;
    }
}

// Add carousel navigation buttons (optional)
document.addEventListener('DOMContentLoaded', function() {
    const carousels = document.querySelectorAll('.carousel');
    
    carousels.forEach(carousel => {
        const container = carousel.parentElement;
        
        // Check if carousel has overflow content
        if (carousel.scrollWidth > carousel.clientWidth) {
            // Create navigation buttons
            const leftBtn = document.createElement('button');
            const rightBtn = document.createElement('button');
            
            leftBtn.innerHTML = '‹';
            rightBtn.innerHTML = '›';
            
            leftBtn.className = 'carousel-nav carousel-nav-left';
            rightBtn.className = 'carousel-nav carousel-nav-right';
            
            // Add event listeners
            leftBtn.addEventListener('click', () => scrollCarousel('left', carousel));
            rightBtn.addEventListener('click', () => scrollCarousel('right', carousel));
            
            // Append buttons to container
            container.style.position = 'relative';
            container.appendChild(leftBtn);
            container.appendChild(rightBtn);
        }
    });
});

// Add typing effect to hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        // Uncomment the next line to enable typing effect
        // typeWriter(heroTitle, originalText, 150);
    }
});

// Add initial animation styles for hero content
document.addEventListener('DOMContentLoaded', function() {
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateX(-50px)';
        heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
    }
    
    if (heroImage) {
        heroImage.style.opacity = '0';
        heroImage.style.transform = 'translateX(50px)';
        heroImage.style.transition = 'opacity 1s ease, transform 1s ease';
    }
});

// Add CSS for carousel navigation buttons dynamically
const carouselNavStyles = `
    .carousel-nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background-color: rgba(0, 0, 0, 0.7);
        color: white;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        z-index: 10;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .carousel-nav:hover {
        background-color: rgba(229, 9, 20, 0.8);
        transform: translateY(-50%) scale(1.1);
    }
    
    .carousel-nav-left {
        left: 10px;
    }
    
    .carousel-nav-right {
        right: 10px;
    }
    
    @media (max-width: 768px) {
        .carousel-nav {
            width: 40px;
            height: 40px;
            font-size: 20px;
        }
    }
`;

// Inject carousel navigation styles
const styleSheet = document.createElement('style');
styleSheet.textContent = carouselNavStyles;
document.head.appendChild(styleSheet);