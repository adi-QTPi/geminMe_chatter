document.addEventListener('DOMContentLoaded', function() {
    const textarea = document.getElementById('expandable-prompt');
    const form = document.getElementById('form');

    function autoExpand() {
        // textarea.style.height = 'auto';
        textarea.style.minHeight = (textarea.scrollHeight) + 'px';
    }
    autoExpand();
    textarea.addEventListener('input', autoExpand);

    textarea.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
            event.preventDefault(); 
            form.submit();      
        }
    });
});