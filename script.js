// Función del carrusel con Alpine.js
function carousel() {
    return {
        currentIndex: 0,
        images: [
            {
                src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
                alt: 'Montaña al atardecer',
                title: 'Montaña Dorada',
                description: 'Un hermoso atardecer en las montañas capturado en el momento perfecto'
            },
            {
                src: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
                alt: 'Playa tropical',
                title: 'Paraíso Tropical',
                description: 'Aguas cristalinas y arena blanca en una playa paradisíaca'
            },
            {
                src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
                alt: 'Bosque místico',
                title: 'Bosque Encantado',
                description: 'Rayos de luz filtrándose entre los árboles de un bosque mágico'
            },
            {
                src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
                alt: 'Ciudad nocturna',
                title: 'Luces de la Ciudad',
                description: 'El skyline de la ciudad iluminado durante la noche'
            },
            {
                src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
                alt: 'Campo de flores',
                title: 'Jardín de Primavera',
                description: 'Un campo lleno de flores coloridas en plena primavera'
            }
        ],
        
        // Navegar a la imagen anterior
        prevImage() {
            this.currentIndex = this.currentIndex === 0 
                ? this.images.length - 1 
                : this.currentIndex - 1;
        },
        
        // Navegar a la imagen siguiente
        nextImage() {
            this.currentIndex = this.currentIndex === this.images.length - 1 
                ? 0 
                : this.currentIndex + 1;
        },
        
        // Inicializar el carrusel
        init() {
            // Auto-avance cada 5 segundos (opcional)
            setInterval(() => {
                this.nextImage();
            }, 5000);
            
            // Navegación con teclado
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    this.prevImage();
                } else if (e.key === 'ArrowRight') {
                    this.nextImage();
                }
            });
        }
    }
}

// Funciones adicionales para mejorar la experiencia
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scroll para los enlaces de navegación
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Efecto parallax sutil en el scroll
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        const header = document.querySelector('header');
        if (header) {
            header.style.transform = `translate3d(0, ${rate}px, 0)`;
        }
    });
    
    // Animación de entrada para elementos
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
    
    // Observar elementos para animaciones
    const animatedElements = document.querySelectorAll('.carousel-container, h1, .lead');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Precargar imágenes para mejor rendimiento
    function preloadImages() {
        const imageUrls = [
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        ];
        
        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    }
    
    preloadImages();
    
    // Mostrar/ocultar botón de "volver arriba" según el scroll
    const backToTopBtn = document.querySelector('a[onclick*="scrollTo"]');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.style.opacity = '1';
            } else {
                backToTopBtn.style.opacity = '0.7';
            }
        });
    }
});

// Función para manejar errores de carga de imágenes
function handleImageError(img) {
    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbiBubyBkaXNwb25pYmxlPC90ZXh0Pjwvc3ZnPg==';
    img.alt = 'Imagen no disponible';
}

// Función para cambiar el tema (día/noche) - opcional
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// Cargar tema guardado
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
}
