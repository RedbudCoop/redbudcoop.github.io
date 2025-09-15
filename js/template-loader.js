// Template loader for consistent headers and footers using jQuery
$(document).ready(function() {
    // Load header if placeholder exists
    if ($('.header-placeholder').length) {
        $('.header-placeholder').load('templates/header.html');
    }
    
    // Load footer if placeholder exists
    if ($('.footer-placeholder').length) {
        $('.footer-placeholder').load('templates/footer.html');
    }
});