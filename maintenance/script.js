import { createClient } from '@supabase/supabase-js';
import emailjs from '@emailjs/browser';

// إعدادات Supabase
const SUPABASE_URL = 'https://hvnxhovwbvphynuxlqnj.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2bnhob3Z3YnZwaHludXhscW5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM4Mjg2ODAsImV4cCI6MjA1OTQwNDY4MH0.i59NYbHj1aJixQMmXh61gPV5SpqoXwxjr85-5pUl-9U';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// إعداد EmailJS
emailjs.init('18ygGgryRoGve-Tpw');

// إرسال البيانات إلى قاعدة البيانات
document.getElementById('maintenanceForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const store = document.getElementById('store').value;
  const description = document.getElementById('description').value;

  try {
    // إدخال البيانات في Supabase
    const { data, error } = await supabase
      .from('maintenance_requests')
      .insert([{ store, description }]);

    if (error) {
      console.error('خطأ أثناء الإرسال:', error);
      alert('حدث خطأ أثناء إرسال الطلب.');
    } else {
      alert('تم إرسال الطلب بنجاح!');

      // إعداد بيانات البريد الإلكتروني
      const emailParams = {
        store_name: store,
        request_description: description,
        request_id: data[0].id, // رقم الطلب
      };

      // إرسال البريد الإلكتروني عبر EmailJS
      emailjs
        .send('service_Alazab.co', 'template_hbb46pi', emailParams)
        .then(
          (response) => {
            console.log('تم إرسال البريد الإلكتروني بنجاح:', response);
            alert('تم إرسال تأكيد بالبريد الإلكتروني!');
          },
          (error) => {
            console.error('خطأ أثناء إرسال البريد الإلكتروني:', error);
            alert('حدث خطأ أثناء إرسال البريد الإلكتروني.');
          }
        );
    }
  } catch (err) {
    console.error('خطأ غير متوقع:', err);
    alert('حدث خطأ غير متوقع.');
  }
});
