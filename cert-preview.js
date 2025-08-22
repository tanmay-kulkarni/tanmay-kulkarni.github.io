// cert-preview.js: Open certification links in a sidebar iframe

document.addEventListener('DOMContentLoaded', function () {
    document.body.addEventListener('click', function (e) {
        if (e.target.tagName === 'A' && e.target.classList.contains('cert-link')) {
            e.preventDefault();
            window.open(e.target.href, 'certPopup', 'width=900,height=700,noopener');
        }
    });
});
