// includes/loadFooter.js - إصدار محسن

// إصدار مع تعامل أفضل مع الأخطاء ووظائف إضافية
(function() {
    'use strict';
    
    // إعدادات التكوين
    const config = {
        footerUrl: 'includes/footer.html',
        containerId: 'footer-container',
        retryAttempts: 3,
        retryDelay: 1000,
        enableCache: true,
        cacheKey: 'alazab-footer-cache',
        cacheExpiry: 24 * 60 * 60 * 1000 // 24 ساعة
    };
    
    // تحقق مما إذا كان التخزين محلياً متاحاً
    const isLocalStorageAvailable = () => {
        try {
            const test = 'test';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    };
    
    // الحصول على الفوتر من التخزين المحلي
    const getCachedFooter = () => {
        if (!config.enableCache || !isLocalStorageAvailable()) return null;
        
        const cached = localStorage.getItem(config.cacheKey);
        if (!cached) return null;
        
        try {
            const { html, timestamp } = JSON.parse(cached);
            // التحقق من انتهاء الصلاحية
            if (Date.now() - timestamp > config.cacheExpiry) {
                localStorage.removeItem(config.cacheKey);
                return null;
            }
            return html;
        } catch (e) {
            console.error('Error parsing cached footer:', e);
            return null;
        }
    };
    
    // حفظ الفوتر في التخزين المحلي
    const cacheFooter = (html) => {
        if (!config.enableCache || !isLocalStorageAvailable()) return;
        
        try {
            const cacheData = {
                html: html,
                timestamp: Date.now()
            };
            localStorage.setItem(config.cacheKey, JSON.stringify(cacheData));
        } catch (e) {
            console.error('Error caching footer:', e);
        }
    };
    
    // إنشاء عنصر الفوتر الافتراضي في حالة فشل التحميل
    const createFallbackFooter = () => {
        return `
        <footer style="background: #0B0B3B; color: white; padding: 40px 0;">
            <div class="container">
                <div class="row">
                    <div class="col-md-12 text-center">
                        <h3>Alazab Construction</h3>
                        <p>8 / 500 Maadi New, Cairo, Egypt</p>
                        <p>Phone: (+20) 1004006620</p>
                        <p>Email: info@alazab.com</p>
                        <div class="mt-3">
                            <a href="https://www.facebook.com/alazab24" style="color: #F5BF23; margin: 0 10px;"><i class="fab fa-facebook-f fa-2x"></i></a>
                            <a href="https://instagram.com/alazab.co" style="color: #F5BF23; margin: 0 10px;"><i class="fab fa-instagram fa-2x"></i></a>
                            <a href="https://www.linkedin.com/company/alazab" style="color: #F5BF23; margin: 0 10px;"><i class="fab fa-linkedin-in fa-2x"></i></a>
                        </div>
                        <div class="mt-4">
                            <p>&copy; ${new Date().getFullYear()} Alazab Construction. All Rights Reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        `;
    };
    
    // تحميل الفوتر مع إعادة المحاولة
    const loadFooterWithRetry = async (retryCount = 0) => {
        try {
            // محاولة استخدام النسخة المخبأة أولاً
            if (retryCount === 0) {
                const cachedFooter = getCachedFooter();
                if (cachedFooter) {
                    document.getElementById(config.containerId).innerHTML = cachedFooter;
                    return true;
                }
            }
            
            // جلب الفوتر من الخادم
            const response = await fetch(config.footerUrl);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const footerHtml = await response.text();
            
            // تخزين الفوتر مؤقتاً
            cacheFooter(footerHtml);
            
            // إضافة الفوتر إلى الصفحة
            document.getElementById(config.containerId).innerHTML = footerHtml;
            
            return true;
        } catch (error) {
            console.error(`Failed to load footer (attempt ${retryCount + 1}):`, error);
            
            if (retryCount < config.retryAttempts - 1) {
                // إعادة المحاولة بعد تأخير
                await new Promise(resolve => setTimeout(resolve, config.retryDelay));
                return loadFooterWithRetry(retryCount + 1);
            } else {
                // استخدام الفوتر الافتراضي بعد فشل جميع المحاولات
                document.getElementById(config.containerId).innerHTML = createFallbackFooter();
                return false;
            }
        }
    };
    
    // تهيئة الفوتر عند تحميل الصفحة
    const initFooter = async () => {
        // إنشاء حاوية الفوتر إذا لم تكن موجودة
        if (!document.getElementById(config.containerId)) {
            const footerContainer = document.createElement('div');
            footerContainer.id = config.containerId;
            document.body.appendChild(footerContainer);
        }
        
        // تحميل الفوتر
        await loadFooterWithRetry();
        
        // إضافة الأنماط إذا كانت مفقودة
        if (!document.querySelector('style[data-footer-styles]')) {
            const footerStyles = document.createElement('style');
            footerStyles.setAttribute('data-footer-styles', 'true');
            footerStyles.textContent = `
                /* أنماط الفوتر الأساسية */
                footer {
                    background: #0B0B3B;
                    color: #fff;
                    padding: 40px 0 0;
                    font-weight: 400;
                }
                footer a { 
                    color: #fff; 
                    text-decoration: none; 
                }
                footer a:hover { 
                    color: #F5BF23; 
                    text-decoration: none; 
                }
                /* يمكن إضافة المزيد من الأنماط هنا */
            `;
            document.head.appendChild(footerStyles);
        }
    };
    
    // بدء التحميل عندما تكون الصفحة جاهزة
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFooter);
    } else {
        initFooter();
    }
    
    // جعل الدوال متاحة عالمياً للاستخدام اليدوي إذا لزم الأمر
    window.alazabFooter = {
        reload: () => {
            localStorage.removeItem(config.cacheKey);
            return loadFooterWithRetry();
        },
        getConfig: () => ({ ...config }),
        setConfig: (newConfig) => {
            Object.assign(config, newConfig);
        }
    };
})();
