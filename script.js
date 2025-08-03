// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger menu
        const bars = navToggle.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            if (navMenu.classList.contains('active')) {
                if (index === 0) bar.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                if (index === 1) bar.style.opacity = '0';
                if (index === 2) bar.style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            }
        });
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Order Form Submission
    const orderForm = document.getElementById('orderForm');
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(orderForm);
        const name = formData.get('name');
        const phone = formData.get('phone');
        const product = formData.get('product');
        const quantity = formData.get('quantity');
        const notes = formData.get('notes');

        // Get product name for display
        const productSelect = document.getElementById('product');
        const productName = productSelect.options[productSelect.selectedIndex].text;

        // Create WhatsApp message
        let message = `مرحباً، أريد طلب المنتج التالي:\n\n`;
        message += `الاسم: ${name}\n`;
        message += `رقم الهاتف: ${phone}\n`;
        message += `المنتج: ${productName}\n`;
        message += `الكمية: ${quantity}\n`;
        
        if (notes) {
            message += `ملاحظات: ${notes}\n`;
        }
        
        message += `\nشكراً لكم`;

        // Encode message for URL
        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/96551231305?text=${encodedMessage}`;
        
        // Open WhatsApp
        window.open(whatsappURL, '_blank');
    });

    // Product order buttons
    const productOrderButtons = document.querySelectorAll('.product-card .btn-primary');
    productOrderButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Pre-select the product in the order form
            const productSelect = document.getElementById('product');
            if (index === 0) {
                productSelect.value = 'red-box';
            } else if (index === 1) {
                productSelect.value = 'blue-box';
            }
            
            // Scroll to order section
            const orderSection = document.getElementById('order');
            const offsetTop = orderSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        });
    });

    // Navbar background change on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'linear-gradient(135deg, rgba(139, 69, 19, 0.95), rgba(101, 67, 33, 0.95))';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'linear-gradient(135deg, var(--primary-brown), var(--dark-wood))';
            navbar.style.backdropFilter = 'none';
        }
    });

    // Gallery lightbox effect
    const galleryItems = document.querySelectorAll('.gallery-item img');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Create lightbox overlay
            const lightbox = document.createElement('div');
            lightbox.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.9);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
                cursor: pointer;
            `;
            
            // Create image element
            const lightboxImg = document.createElement('img');
            lightboxImg.src = this.src;
            lightboxImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                object-fit: contain;
                border-radius: 10px;
            `;
            
            lightbox.appendChild(lightboxImg);
            document.body.appendChild(lightbox);
            
            // Close lightbox on click
            lightbox.addEventListener('click', function() {
                document.body.removeChild(lightbox);
            });
        });
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.product-card, .gallery-item, .about-content');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Set initial opacity
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        // If image is already loaded
        if (img.complete) {
            img.style.opacity = '1';
        }
    });

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('.btn, .product-card, .gallery-item, .social-link');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = this.style.transform + ' scale(1.02)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = this.style.transform.replace(' scale(1.02)', '');
        });
    });

    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    const titleText = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < titleText.length) {
            heroTitle.textContent += titleText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 1000);

    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroImg = document.querySelector('.hero-img');
        if (heroImg) {
            heroImg.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Form validation
    const formInputs = document.querySelectorAll('#orderForm input, #orderForm select, #orderForm textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#ff4444';
                this.style.boxShadow = '0 0 5px rgba(255, 68, 68, 0.3)';
            } else {
                this.style.borderColor = 'var(--light-sand)';
                this.style.boxShadow = 'none';
            }
        });
        
        input.addEventListener('focus', function() {
            this.style.borderColor = 'var(--accent-maroon)';
            this.style.boxShadow = '0 0 5px rgba(128, 0, 32, 0.3)';
        });
    });

    // Add success message after form submission
    orderForm.addEventListener('submit', function() {
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--accent-maroon);
            color: white;
            padding: 2rem;
            border-radius: 10px;
            text-align: center;
            z-index: 9999;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        `;
        successMessage.innerHTML = `
            <h3>تم إرسال طلبك بنجاح!</h3>
            <p>سيتم توجيهك إلى الواتساب لإكمال الطلب</p>
        `;
        
        document.body.appendChild(successMessage);
        
        // Remove message after 3 seconds
        setTimeout(() => {
            if (document.body.contains(successMessage)) {
                document.body.removeChild(successMessage);
            }
        }, 3000);
    });
});

