document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {

            filterButtons.forEach(function (b) {
                b.classList.remove('active');
            });
            btn.classList.add('active');

            const selected = btn.getAttribute('data-filter');

            projectCards.forEach(function (card) {
                const categories = card.getAttribute('data-category') || '';

                if (selected === 'all' || categories.split(' ').includes(selected)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});