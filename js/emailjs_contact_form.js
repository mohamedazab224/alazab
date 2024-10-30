// Initialize EmailJS
(function() {
   emailjs.init("18ygGgryRoGve-Tpw");
})();

// Handle form submission
document.getElementById('contact-form').addEventListener('submit', function(event) {
   event.preventDefault();

   emailjs.sendForm('service_Alazab.co', 'template_tvn06ki', this)
      .then(function() {
         alert('Your message has been sent successfully!');
      }, function(error) {
         alert('Failed to send your message. Please try again later.');
      });
});
