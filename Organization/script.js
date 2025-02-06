// script.js
document.querySelectorAll('.box').forEach(box => {
    box.addEventListener('click', () => {
        const role = box.getAttribute('data-role');
        alert(`تم اختيار: ${role}`);
    });
});