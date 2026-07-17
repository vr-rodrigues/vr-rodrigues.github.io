(function() {
    var navToggle = document.querySelector('.nav-toggle');
    var navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        var isPortuguese = document.documentElement.lang.toLowerCase().indexOf('pt') === 0;

        function setNavigationState(isOpen) {
            navLinks.classList.toggle('active', isOpen);
            navToggle.classList.toggle('active', isOpen);
            navToggle.setAttribute('aria-expanded', String(isOpen));
            navToggle.setAttribute('aria-label', isPortuguese
                ? (isOpen ? 'Fechar navega\u00e7\u00e3o' : 'Abrir navega\u00e7\u00e3o')
                : (isOpen ? 'Close navigation' : 'Open navigation'));
        }

        navToggle.addEventListener('click', function() {
            setNavigationState(navToggle.getAttribute('aria-expanded') !== 'true');
        });

        navLinks.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                setNavigationState(false);
            });
        });

        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
                setNavigationState(false);
                navToggle.focus();
            }
        });
    }

    document.querySelectorAll('i[class*="fa-"]').forEach(function(icon) {
        icon.setAttribute('aria-hidden', 'true');
    });

    function slugify(value) {
        return value
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
            .slice(0, 90);
    }

    function linkContext(link) {
        var paper = link.closest('.paper, .featured-item, .cv-download');
        if (!paper) {
            return link.textContent.trim() || link.href;
        }

        var title = paper.querySelector('.paper-title, .featured-title, .cv-entry-title');
        if (title) {
            return title.textContent.trim();
        }

        if (paper.classList.contains('cv-download')) {
            return 'CV download';
        }

        return link.textContent.trim() || link.href;
    }

    document.querySelectorAll('a[target="_blank"]').forEach(function(link) {
        var relValues = new Set(link.rel.split(/\s+/).filter(Boolean));
        relValues.add('noopener');
        relValues.add('noreferrer');
        link.rel = Array.from(relValues).join(' ');
    });

    document.querySelectorAll('.paper-links a, .cv-download a.btn').forEach(function(link) {
        var label = linkContext(link);
        var action = link.textContent.trim() || 'link';

        if (!link.dataset.goatcounterClick) {
            link.dataset.goatcounterClick = 'click:' + slugify(action + '-' + label);
        }

        if (!link.dataset.goatcounterTitle) {
            link.dataset.goatcounterTitle = action + ': ' + label;
        }

    });
})();
