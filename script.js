// Navigation mobile avec animations modernes
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Animation des barres du hamburger
    const spans = hamburger.querySelectorAll('span');
    if (hamburger.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Fermer le menu mobile quand on clique sur un lien
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navigation sticky simplifiée
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    }
});

// Animation des éléments au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observer les cartes de services
document.querySelectorAll('.service-card').forEach(card => {
    observer.observe(card);
});

// Observer les éléments de contact
document.querySelectorAll('.contact-item').forEach(item => {
    observer.observe(item);
});

// Animation des statistiques
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (target === 500 ? '+' : target === 24 ? '/7' : '+');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (target === 500 ? '+' : target === 24 ? '/7' : '+');
        }
    }, 16);
}

// Démarrer l'animation des compteurs quand la section hero est visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach((stat, index) => {
                setTimeout(() => {
                    const text = stat.textContent;
                    if (text.includes('500')) {
                        animateCounter(stat, 500);
                    } else if (text.includes('24')) {
                        animateCounter(stat, 24);
                    } else if (text.includes('15')) {
                        animateCounter(stat, 15);
                    }
                }, index * 200);
            });
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}

// Gestion du formulaire de contact
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Récupérer les données du formulaire
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simulation d'envoi (remplacer par votre logique d'envoi)
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Votre demande a été envoyée avec succès ! Nous vous contacterons dans les plus brefs délais.');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Animation des icônes au hover (simplifiée)
document.querySelectorAll('.service-icon').forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        icon.style.transform = 'scale(1.05)';
    });
    
    icon.addEventListener('mouseleave', () => {
        icon.style.transform = 'scale(1)';
    });
});

// Smooth scroll pour les liens d'ancrage
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Compenser la hauteur de la navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Animation simple au chargement
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(20px)';
        setTimeout(() => {
            heroTitle.style.transition = 'all 0.6s ease';
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 100);
    }
});

// Performance monitoring simple
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`Page chargée en ${Math.round(loadTime)}ms`);
});

// Lazy loading pour les éléments lourds
const lazyElements = document.querySelectorAll('[data-lazy]');
const lazyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            element.classList.add('loaded');
            lazyObserver.unobserve(element);
        }
    });
});

lazyElements.forEach(element => {
    lazyObserver.observe(element);
});

// Calculateur de Devis
function calculateQuote() {
    const serviceType = document.getElementById('serviceType').value;
    const surface = parseInt(document.getElementById('surface').value) || 0;
    const duree = parseInt(document.getElementById('duree').value);
    const niveau = document.getElementById('niveau').value;
    
    if (!serviceType || surface === 0) {
        alert('Veuillez sélectionner un service et entrer une superficie.');
        return;
    }
    
    // Prix de base par m² selon le service
    const prixBase = {
        'gardiennage': 2.5,
        'videosurveillance': 1.8,
        'controle-acces': 3.2,
        'alarme': 1.5,
        'intervention': 4.0
    };
    
    // Multiplicateurs selon le niveau
    const multiplicateurs = {
        'standard': 1,
        'renforce': 1.5,
        'premium': 2
    };
    
    // Calcul du prix
    let prixMensuel = surface * prixBase[serviceType] * multiplicateurs[niveau];
    
    // Réduction selon la durée
    if (duree >= 24) {
        prixMensuel *= 0.9; // 10% de réduction
    } else if (duree >= 12) {
        prixMensuel *= 0.95; // 5% de réduction
    }
    
    const prixTotal = prixMensuel * duree;
    
    // Affichage du résultat
    const resultDiv = document.getElementById('quoteResult');
    resultDiv.innerHTML = `
        <div class="quote-price">${Math.round(prixMensuel).toLocaleString()} CDF</div>
        <p>par mois</p>
        <div class="quote-details">
            <p><strong>Service:</strong> ${serviceType.charAt(0).toUpperCase() + serviceType.slice(1)}</p>
            <p><strong>Superficie:</strong> ${surface} m²</p>
            <p><strong>Niveau:</strong> ${niveau.charAt(0).toUpperCase() + niveau.slice(1)}</p>
            <p><strong>Durée:</strong> ${duree} mois</p>
            <p><strong>Total:</strong> ${Math.round(prixTotal).toLocaleString()} CDF</p>
        </div>
        <button class="btn btn-primary" style="margin-top: 1rem;" onclick="requestQuote()">Demander un Devis Détaillé</button>
    `;
}

function requestQuote() {
    alert('Votre demande de devis détaillé a été envoyée ! Notre équipe vous contactera dans les plus brefs délais.');
}

// Chat Widget
let chatOpen = false;

function toggleChat() {
    const chatWidget = document.getElementById('chatWidget');
    const chatButton = document.getElementById('chatButton');
    
    chatOpen = !chatOpen;
    
    if (chatOpen) {
        chatWidget.classList.add('active');
        chatButton.classList.add('hidden');
    } else {
        chatWidget.classList.remove('active');
        chatButton.classList.remove('hidden');
    }
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (message === '') return;
    
    // Ajouter le message de l'utilisateur
    addMessage(message, 'user');
    input.value = '';
    
    // Réponse automatique du bot
    setTimeout(() => {
        const response = getBotResponse(message);
        addMessage(response, 'bot');
    }, 1000);
}

function addMessage(text, sender) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    messageDiv.innerHTML = `<p>${text}</p>`;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function getBotResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    if (message.includes('prix') || message.includes('coût') || message.includes('tarif')) {
        return 'Nos tarifs varient selon vos besoins. Utilisez notre calculateur de devis pour une estimation personnalisée !';
    } else if (message.includes('gardiennage')) {
        return 'Nous offrons des services de gardiennage 24h/24 avec des agents certifiés. Voulez-vous plus d\'informations ?';
    } else if (message.includes('videosurveillance')) {
        return 'Nos systèmes de vidéosurveillance incluent des caméras HD, vision nocturne et stockage cloud sécurisé.';
    } else if (message.includes('urgence') || message.includes('urgent')) {
        return 'Pour les urgences, appelez-nous immédiatement au +243 81 234 5678. Nous sommes disponibles 24h/24.';
    } else if (message.includes('contact') || message.includes('téléphone')) {
        return 'Vous pouvez nous joindre au +243 81 234 5678 ou par email à contact@eliteguardclean.cd';
    } else if (message.includes('merci') || message.includes('bye') || message.includes('au revoir')) {
        return 'De rien ! N\'hésitez pas à nous contacter si vous avez d\'autres questions.';
    } else {
        return 'Merci pour votre message ! Un de nos conseillers vous contactera bientôt. En attendant, vous pouvez utiliser notre calculateur de devis.';
    }
}

// Gestion de l'envoi de message avec Enter
document.addEventListener('DOMContentLoaded', function() {
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Détection tactile
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }
});

// Support multilingue
let currentLanguage = 'fr';

function toggleLanguage() {
    currentLanguage = currentLanguage === 'fr' ? 'ln' : 'fr';
    const langBtn = document.getElementById('langBtn');
    langBtn.textContent = currentLanguage.toUpperCase();
    
    // Traductions basiques
    const translations = {
        'fr': {
            'nav-accueil': 'Accueil',
            'nav-services': 'Services',
            'nav-apropos': 'À Propos',
            'nav-temoignages': 'Témoignages',
            'nav-contact': 'Contact',
            'nav-devis': 'Devis'
        },
        'ln': {
            'nav-accueil': 'Liboso',
            'nav-services': 'Misala',
            'nav-apropos': 'Mpo na Biso',
            'nav-temoignages': 'Maloba',
            'nav-contact': 'Bokundoli',
            'nav-devis': 'Mobeko'
        }
    };
    
    // Appliquer les traductions
    Object.keys(translations[currentLanguage]).forEach(key => {
        const elements = document.querySelectorAll(`[data-translate="${key}"]`);
        elements.forEach(element => {
            element.textContent = translations[currentLanguage][key];
        });
    });
}

// Animation des témoignages
function animateTestimonials() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        }, index * 200);
    });
}

// Observer pour les témoignages
const testimonialsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateTestimonials();
            testimonialsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const testimonialsSection = document.querySelector('.testimonials');
if (testimonialsSection) {
    testimonialsObserver.observe(testimonialsSection);
}

// Mise à jour des statistiques pour la RDC
function updateStatsForRDC() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach((stat, index) => {
        setTimeout(() => {
            const text = stat.textContent;
            if (text.includes('200')) {
                animateCounter(stat, 200);
            } else if (text.includes('24')) {
                animateCounter(stat, 24);
            } else if (text.includes('8')) {
                animateCounter(stat, 8);
            } else if (text.includes('50')) {
                animateCounter(stat, 50);
            }
        }, index * 200);
    });
}

// Remplacer l'ancienne fonction d'animation des stats
if (heroSection) {
    heroObserver.unobserve(heroSection);
    const newHeroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateStatsForRDC();
                newHeroObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    newHeroObserver.observe(heroSection);
}
