


document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('signature');
    const ctx = canvas.getContext('2d');
    let drawing = false;

    canvas.addEventListener('mousedown', function(e) {
        drawing = true;
        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY);
    });

    canvas.addEventListener('mousemove', function(e) {
        if (drawing) {
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
        }
    });

    canvas.addEventListener('mouseup', function() {
        drawing = false;
    });

    canvas.addEventListener('mouseout', function() {
        drawing = false;
    });

    document.getElementById('clearSignature').addEventListener('click', function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    document.getElementById('vendorForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const vendors = formData.getAll('vendor');
        const signatureData = canvas.toDataURL();
        // Here you can send the form data and signature to the server
        console.log('Selected Vendors:', vendors);
        console.log('Signature Data:', signatureData);
        alert('Form submitted successfully!');
    });
});
