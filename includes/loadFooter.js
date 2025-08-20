// دالة لتحميل الفوتر في العنصر المحدد
function loadFooter(elementId = 'footer-container') {
  fetch('footer.html')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(data => {
      // استخراج محتوى الـ footer فقط
      const parser = new DOMParser();
      const doc = parser.parseFromString(data, 'text/html');
      const footerContent = doc.querySelector('footer').outerHTML;
      
      // إضافة الـ footer إلى الصفحة
      document.getElementById(elementId).innerHTML = footerContent;
      
      // إضافة الأنماط من header إذا كانت موجودة
      const styles = doc.querySelectorAll('style');
      styles.forEach(style => {
        const newStyle = document.createElement('style');
        newStyle.textContent = style.textContent;
        document.head.appendChild(newStyle);
      });
    })
    .catch(error => {
      console.error('Error loading footer:', error);
      document.getElementById(elementId).innerHTML = `
        <footer style="background: #0B0B3B; color: white; padding: 20px; text-align: center;">
          <p>Footer failed to load. Please check your connection.</p>
        </footer>
      `;
    });
}

// تحميل الفوتر عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
  // إنشاء عنصر لحمل الفوتر إذا لم يكن موجوداً
  if (!document.getElementById('footer-container')) {
    const footerContainer = document.createElement('div');
    footerContainer.id = 'footer-container';
    document.body.appendChild(footerContainer);
  }
  
  // تحميل الفوتر
  loadFooter();
});
