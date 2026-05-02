(function() {
    var navToggle = document.querySelector('.nav-toggle');
    var navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

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

    document.querySelectorAll('.paper-links a, .cv-download a.btn').forEach(function(link) {
        var label = linkContext(link);
        var action = link.textContent.trim() || 'link';

        if (!link.dataset.goatcounterClick) {
            link.dataset.goatcounterClick = 'click:' + slugify(action + '-' + label);
        }

        if (!link.dataset.goatcounterTitle) {
            link.dataset.goatcounterTitle = action + ': ' + label;
        }

        if (link.target === '_blank' && !link.rel) {
            link.rel = 'noopener noreferrer';
        }
    });
})();
