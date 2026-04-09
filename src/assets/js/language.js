// Language Switcher - Unified Translation System
let currentLanguage = localStorage.getItem('language') || 'en';
let translations = {};

// Load translations from JSON file
async function loadTranslations() {
    try {
        const response = await fetch('assets/translations.json?v=' + new Date().getTime());
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        translations = await response.json();
        console.log('✓ Translations loaded successfully from JSON file');
        
        // Verify translations structure
        if (!translations.en || !translations.fr) {
            throw new Error('Translations object is incomplete');
        }
        
        // Apply language after DOM is ready
        setTimeout(() => {
            applyLanguage(currentLanguage);
        }, 100);
    } catch (error) {
        console.error('Error loading translations from JSON:', error);
        console.log('Using inline translations fallback');
        loadInlineTranslations();
    }
}

// Fallback: Load translations inline if fetch fails
function loadInlineTranslations() {
    translations = {
        en: {
            nav: { home: "Home", about: "About", education: "Education", experience: "Experience", contact: "Contact" },
            hero: { greeting: "Hello, I'm", title: "Full Stack Developer" },
            about: { title: "About Me", lead: "Full Stack Developer with over 5 years of experience", description: "Expert in creating high-performance, responsive, and maintainable web applications. Passionate about designing intuitive user interfaces and seamless user experiences, with deep mastery of the Angular RxJS ecosystem and development best practices. My goal is to transform complex requirements into elegant, scalable, and high-quality interfaces.", hireMe: "Hire Me", downloadCV: "Download CV" },
            education: { title: "My Education", degree1: { name: "National Engineering Degree in Software Engineering", description: "Engineering degree in Software Engineering with focus on modern web development and software architecture." }, degree2: { name: "Applied Bachelor's Degree in Computer Networks", description: "Applied Bachelor's degree in Computer Networks, covering network infrastructure and system administration." }, degree3: { name: "Computer Science Baccalaureate", description: "High school diploma in Computer Science, foundational education in programming and computer systems." } },
            experience: { title: "My Experience", job1: { title: "Full Stack JS Developer - IoT Platform", description: "Built multiple Business Accelerators: Smart Parking, Smart Construction, Waste Management, Aircraft Solution, and Fleet Ops with delivery trips management." }, job2: { title: "Front End Developer", description: "Integrated user interfaces with ADF (Alfresco) and Angular. Collaborated with designers, PO, and Scrum Master to analyze client needs. Worked on multiple projects including Digi Recouvrement/GED (banking debt recovery), Smart Claim (insurance claims), Poc Réclamation (banking complaints), and FTUSA (insurance request management)." }, certifications: { title: "Certifications", cert1: { name: "HTML/CSS/JavaScript Certification", description: "Certified in web development fundamentals including HTML, CSS, and JavaScript." }, cert2: { name: "MPR Alcatel Certification", description: "Alcatel Lucent Maroc certification in network and telecommunications technologies." } }, moreDetails: "More details", screenshotsComingSoon: "Screenshots coming soon", projects: { "smart-construction": { title: "Smart Construction Suite", company: "Kian Technologies - Plateforme Retina", date: "July 2023 – February 2026", description: "Comprehensive IoT solution for Site Monitoring, Asset, Equipment & Machine Tracking, Vehicle Management, Worker Safety Monitoring, Energy Management, Access Control Management, and violation detection." }, "fleet-ops": { title: "Fleet Ops", company: "Kian Technologies - Plateforme Retina", date: "July 2023 – February 2026", description: "Comprehensive fleet management system with delivery trips management, real-time tracking, and resource optimization modules." }, "smart-parking": { title: "Smart Parking", company: "Kian Technologies - Plateforme Retina", date: "July 2023 – February 2026", description: "Intelligent parking management system using IoT sensors to track occupancy, manage reservations, and provide real-time parking availability." }, "waste-management": { title: "Waste Management", company: "Kian Technologies - Plateforme Retina", date: "July 2023 – February 2026", description: "IoT-based waste management solution for optimizing collection routes, monitoring bin levels, and improving urban waste disposal efficiency." }, "air-craft": { title: "Aircraft Solution", company: "Kian Technologies - Plateforme Retina", date: "July 2023 – February 2026", description: "Specialized solution for aircraft management and tracking, integrating IoT data for maintenance and operational monitoring." }, "ftusa": { title: "FTUSA", company: "ADDINN Tunisie", date: "February 2021 – June 2023", description: "Insurance request management platform for FTUSA, facilitating paperless workflows and automated processing of insurance claims." }, "poc-reclamation": { title: "Poc Réclamation", company: "ADDINN Tunisie", date: "February 2021 – June 2023", description: "POC for a banking complaints management system, designed to handle customer feedback and resolution workflows efficiently." }, "smart-claim": { title: "Smart Claim", company: "ADDINN Tunisie", date: "February 2021 – June 2023", description: "Insurance claims management application. Part of a collaborative effort with designers, PO, and Scrum Master. Core responsibilities included integrating user interfaces with ADF (Alfresco) and Angular." }, "recouvrement": { title: "Digi Recouvrement (GED)", company: "ADDINN Tunisie", date: "February 2021 – June 2023", description: "Banking debt recovery management application. Collaborated on requirements analysis and technical implementation to ensure a smooth, professional banking interface." } } },
            experienceDetails: { back: "← Back to Resume", allScreens: " - All Screens", notFound: "Project not found" },
            skills: { title: "My Skills", skill1: { title: "Frontend Frameworks", description: "Angular, React - Building modern, responsive web applications with advanced state management and component-based architecture." }, skill2: { title: "Backend Technologies", description: "Node.js, GraphQL, Firebase, ASP.Net Core, SpringBoot - Full-stack development with modern backend frameworks and APIs." }, skill3: { title: "Databases & Tools", description: "PostgreSQL, MongoDB, Docker, CI/CD, Git, SCRUM - Database management, DevOps practices, and agile methodologies." }, skill4: { title: "Programming Languages", description: "TypeScript, JavaScript - Strong expertise in modern JavaScript and TypeScript for scalable application development." }, skill5: { title: "Data Visualization", description: "E-Charts.js, Chart.js - Creating interactive and insightful data visualizations for dashboards and analytics." }, skill6: { title: "Languages", description: "Arabic (Native), French (Fluent), English (Fluent) - Multilingual communication for international collaboration." } },
            contact: { title: "Get In Touch", formTitle: "Get In Touch", namePlaceholder: "Your Name", emailPlaceholder: "Your Email", phonePlaceholder: "Your Phone", messagePlaceholder: "Write a Message", submitButton: "Send Message", contactDetails: "My Contact Details", email: "Email", phone: "Phone", portfolio: "Portfolio", address: "Address" }
        },
        fr: {
            nav: { home: "Accueil", about: "À propos", education: "Formation", experience: "Expérience", contact: "Contact" },
            hero: { greeting: "Bonjour, je suis", title: "Développeur Full Stack" },
            about: { title: "À propos de moi", lead: "Développeur Full Stack avec plus de 5 ans d'expérience", description: "Expert dans la création d'applications web performantes, réactives et maintenables. Passionné par la conception d'interfaces utilisateur intuitives et d'expériences fluides, avec une maîtrise approfondie de l'écosystème Angular RxJS et des bonnes pratiques de développement. Mon objectif est de transformer des exigences complexes en interfaces élégantes, scalables et de haute qualité.", hireMe: "M'embaucher", downloadCV: "Télécharger CV" },
            education: { title: "Ma Formation", degree1: { name: "Diplôme National d'Ingénieur en Génie Logiciel", description: "Diplôme d'ingénieur en Génie Logiciel axé sur le développement web moderne et l'architecture logicielle." }, degree2: { name: "Licence Appliquée en Réseaux Informatique", description: "Licence appliquée en Réseaux Informatique, couvrant l'infrastructure réseau et l'administration système." }, degree3: { name: "Baccalauréat Informatique", description: "Diplôme de baccalauréat en Informatique, formation fondamentale en programmation et systèmes informatiques." } },
            experience: { title: "Mon Expérience", job1: { title: "Développeur Full Stack JS - Plateforme IoT", description: "Construction de plusieurs accélérateurs métier : Smart Parking, Smart Construction, Waste Management, Aircraft Solution, et Fleet Ops avec gestion des trajets de livraison." }, job2: { title: "Développeur Front End", description: "Intégration d'interfaces utilisateur avec ADF (Alfresco) et Angular. Collaboration avec les designers, PO et Scrum Master pour analyser les besoins clients. Travail sur plusieurs projets incluant Digi Recouvrement/GED (recouvrement de créances bancaires), Smart Claim (gestion des sinistres d'assurance), Poc Réclamation (gestion des réclamations bancaires), et FTUSA (gestion des demandes d'assurance)." }, certifications: { title: "Certifications", cert1: { name: "Certification HTML/CSS/JavaScript", description: "Certifié en fondamentaux du développement web incluant HTML, CSS et JavaScript." }, cert2: { name: "Certification MPR Alcatel", description: "Certification Alcatel Lucent Maroc en technologies réseau et télécommunications." } }, moreDetails: "Plus de détails", screenshotsComingSoon: "Captures d'écran à venir", projects: { "smart-construction": { title: "Smart Construction Suite", company: "Kian Technologies - Plateforme Retina", date: "Juillet 2023 – Février 2026", description: "Solution IoT complète pour le suivi de chantier, le suivi des actifs, des équipements et des machines, la gestion des véhicules, la surveillance de la sécurité des travailleurs, la gestion de l'énergie, la gestion du contrôle d'accès et la détection d'infractions." }, "fleet-ops": { title: "Fleet Ops", company: "Kian Technologies - Plateforme Retina", date: "Juillet 2023 – Février 2026", description: "Système complet de gestion de flotte avec gestion des trajets de livraison, suivi en temps réel et modules d'optimisation des ressources." }, "smart-parking": { title: "Smart Parking", company: "Kian Technologies - Plateforme Retina", date: "Juillet 2023 – Février 2026", description: "Système de gestion de stationnement intelligent utilisant des capteurs IoT pour suivre l'occupation, gérer les réservations et fournir la disponibilité du stationnement en temps réel." }, "waste-management": { title: "Waste Management", company: "Kian Technologies - Plateforme Retina", date: "Juillet 2023 – Février 2026", description: "Solution de gestion des déchets basée sur l'IoT pour optimiser les itinéraires de collecte, surveiller les niveaux des bacs et améliorer l'efficacité de l'élimination des déchets urbains." }, "air-craft": { title: "Aircraft Solution", company: "Kian Technologies - Plateforme Retina", date: "Juillet 2023 – Février 2026", description: "Solution spécialisée pour la gestion et le suivi des aéronefs, intégrant les données IoT pour la maintenance et le suivi opérationnel." }, "ftusa": { title: "FTUSA", company: "ADDINN Tunisie", date: "Février 2021 – Juin 2023", description: "Plateforme de gestion des demandes d'assurance pour la FTUSA, facilitant les flux de travail sans papier et le traitement automatisé des demandes d'indemnisation." }, "poc-reclamation": { title: "Poc Réclamation", company: "ADDINN Tunisie", date: "Février 2021 – Juin 2023", description: "POC pour un système de gestion des réclamations bancaires, conçu pour gérer efficacement les retours clients et les flux de travail de résolution." }, "smart-claim": { title: "Smart Claim", company: "ADDINN Tunisie", date: "Février 2021 – Juin 2023", description: "Application de gestion des sinistres d'assurance. Collaboration avec les designers, PO et Scrum Master. Responsabilités principales incluant l'intégration des interfaces utilisateur avec ADF (Alfresco) et Angular." }, "recouvrement": { title: "Digi Recouvrement (GED)", company: "ADDINN Tunisie", date: "Février 2021 – Juin 2023", description: "Application de gestion du recouvrement de créances bancaires. Collaboration à l'analyse des besoins et à la mise en œuvre technique pour assurer une interface bancaire fluide et professionnelle." } } },
            experienceDetails: { back: "← Retour au CV", allScreens: " - Tous les écrans", notFound: "Projet introuvable" },
            skills: { title: "Mes Compétences", skill1: { title: "Frameworks Frontend", description: "Angular, React - Construction d'applications web modernes et réactives avec gestion d'état avancée et architecture basée sur les composants." }, skill2: { title: "Technologies Backend", description: "Node.js, GraphQL, Firebase, ASP.Net Core, SpringBoot - Développement full-stack avec frameworks backend modernes et APIs." }, skill3: { title: "Bases de données et Outils", description: "PostgreSQL, MongoDB, Docker, CI/CD, Git, SCRUM - Gestion de bases de données, pratiques DevOps et méthodologies agiles." }, skill4: { title: "Langages de Programmation", description: "TypeScript, JavaScript - Expertise solide en JavaScript et TypeScript modernes pour le développement d'applications scalables." }, skill5: { title: "Visualisation de Données", description: "E-Charts.js, Chart.js - Création de visualisations de données interactives et pertinentes pour tableaux de bord et analyses." }, skill6: { title: "Langues", description: "Arabe (Natif), Français (Courant), Anglais (Courant) - Communication multilingue pour collaboration internationale." } },
            contact: { title: "Me Contacter", formTitle: "Me Contacter", namePlaceholder: "Votre Nom", emailPlaceholder: "Votre Email", phonePlaceholder: "Votre Téléphone", messagePlaceholder: "Écrire un Message", submitButton: "Envoyer le Message", contactDetails: "Mes Coordonnées", email: "Email", phone: "Téléphone", portfolio: "Portfolio", address: "Adresse" }
        }
    };
    applyLanguage(currentLanguage);
}

// Unified function to get translation by key path
window.getTranslation = function getTranslation(key, lang) {
    if (!translations[lang]) {
        console.error('Language not available:', lang);
        return null;
    }
    
    const keys = key.split('.');
    let value = translations[lang];
    
    for (const k of keys) {
        if (value && typeof value === 'object' && value[k] !== undefined) {
            value = value[k];
        } else {
            console.warn('Translation not found:', key, 'at key:', k);
            return null;
        }
    }
    
    if (typeof value === 'string') {
        return value;
    }
    
    console.warn('Translation value is not a string for key:', key);
    return null;
}

// Unified function to apply translation to an element
function applyTranslationToElement(element, key, lang) {
    const translation = getTranslation(key, lang);
    
    if (!translation || translation.trim() === '') {
        // Keep original text if translation not found
        if (element.dataset.originalText) {
            element.textContent = element.dataset.originalText;
        }
        return false;
    }
    
    const fullTranslation = translation.trim();
    
    // Store original text on first translation
    if (!element.dataset.originalText) {
        element.dataset.originalText = element.textContent.trim();
    }
    
    // Apply translation based on element type
    if (element.tagName === 'INPUT' && element.type === 'submit') {
        element.value = fullTranslation;
    } else if (element.tagName === 'A') {
        element.textContent = fullTranslation;
    } else {
        element.textContent = fullTranslation;
    }
    
    return true;
}

// Apply language to all elements
function applyLanguage(lang) {
    if (!translations[lang]) {
        console.error('Language not found:', lang);
        return;
    }
    
    console.log('Applying language:', lang);
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    
    // Broadcast robust language change event to Angular
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: lang }));
    
    // Apply translations to all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        applyTranslationToElement(element, key, lang);
    });
    
    // Apply translations to placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        const translation = getTranslation(key, lang);
        if (translation) {
            element.placeholder = translation;
            // Force compliance with Angular Material
            element.setAttribute('data-placeholder', translation);
        }
    });
    
    // Apply translations to input values
    document.querySelectorAll('[data-i18n-value]').forEach(element => {
        const key = element.getAttribute('data-i18n-value');
        const translation = getTranslation(key, lang);
        if (translation) {
            element.value = translation;
        }
    });
    
    // Update toggle button
    updateToggleButton();
    
    console.log('Language applied:', lang);
}

// Update language toggle button
function updateToggleButton() {
    const toggleBtn = document.getElementById('langToggle');
    const currentLangSpan = document.getElementById('currentLang');
    const otherLangSpan = document.getElementById('otherLang');
    
    if (toggleBtn && currentLangSpan && otherLangSpan) {
        if (currentLanguage === 'en') {
            currentLangSpan.textContent = 'EN';
            otherLangSpan.textContent = 'FR';
        } else {
            currentLangSpan.textContent = 'FR';
            otherLangSpan.textContent = 'EN';
        }
    }
}

// Toggle language
function toggleLanguage() {
    const newLang = currentLanguage === 'en' ? 'fr' : 'en';
    applyLanguage(newLang);
}

// Initialize on page load
function initializeLanguage() {
    console.log('Initializing language system...');
    loadTranslations();
    
    const toggleBtn = document.getElementById('langToggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleLanguage);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeLanguage);
} else {
    initializeLanguage();
}
