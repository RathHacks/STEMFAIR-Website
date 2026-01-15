document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('door-prize-modal');
    const openButton = document.getElementById('view-prizes-btn');
    const closeButton = document.querySelector('.modal-close');

    if (openButton) {
        openButton.addEventListener('click', function() {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; 
        });
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; 
    }

    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});
