document.addEventListener('DOMContentLoaded', () => {
  const PDF_URL = 'assets/Dang-Hong-Phuc-CV.pdf';

  const themeToggle = document.getElementById('themeToggle');
  const htmlRoot = document.documentElement;

  const savedTheme = localStorage.getItem('theme') || 'light';
  htmlRoot.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      htmlRoot.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      const isVi = currentLang === 'vi';
      showToast(isVi ? `Đã chuyển sang giao diện ${newTheme === 'dark' ? 'tối' : 'sáng'}` : `Switched to ${newTheme} mode`);
    });
  }

  const cvTranslations = {
    en: {
      cv_back: 'Portfolio',
      cv_role: 'Backend Developer',
      cv_status: 'Available for Hire',
      cv_tab_pdf: 'PDF View',
      cv_tab_web: 'Web View',
      cv_download: 'Download CV',
      cv_download_pdf: 'Download PDF',
      cv_download_mobile: 'Download CV (PDF)',
      cv_loading: "Rendering Dang Hong Phuc's CV...",
      cv_address: 'Bac Tu Liem, Ha Noi',
      cv_born: 'Born: 2005',
      cv_sec_summary: 'SUMMARY',
      cv_summary_text: 'Backend Developer Intern with hands-on experience in <strong>Node.js, Express.js, TypeScript, and MongoDB</strong>, specializing in building RESTful APIs and scalable backend applications. Familiar with JWT authentication, database design, and MVC architecture. Passionate about writing clean, maintainable code and eager to contribute to real-world backend projects while continuously improving technical skills.',
      cv_sec_edu: 'EDUCATION',
      cv_edu_school: 'Hanoi University of Industry (HaUI)',
      cv_edu_time: '2023 - 2027 (Expected)',
      cv_edu_meta: 'Major: <strong>Information Technology</strong> (Final Year Student) • GPA: <strong>3.2 / 4.0</strong>',
      cv_sec_skills: 'TECHNICAL SKILLS',
      cv_skill_lang: 'Languages:',
      cv_skill_backend: 'Backend:',
      cv_skill_frontend: 'Frontend:',
      cv_skill_db: 'Databases:',
      cv_skill_tools: 'Tools & Process:',
      cv_skill_soft: 'Soft Skills:',
      cv_skill_soft_val: 'Time Management, Self-study, and Research',
      cv_sec_projects: 'PROJECTS',
      cv_proj_role: 'Backend Developer (Personal Project)',
      cv_tech_label: 'Tech Stack:',
      cv_p1_f1: 'Built a modular backend for a travel booking management system with CRUD operations for tours, blogs, categories, orders, coupons, and contacts.',
      cv_p1_f2: 'Implemented JWT authentication, role-based access control, and secure password hashing using bcrypt.',
      cv_p1_f3: 'Developed OTP-based password recovery and email notification using Nodemailer.',
      cv_p1_f4: 'Implemented pagination, filtering, searching, bulk operations, and dashboard analytics for efficient data management.',
      cv_p2_f1: 'Developed RESTful APIs for recruitment, job posting, and CV management.',
      cv_p2_f2: 'Implemented JWT-based authentication with role-based authorization.',
      cv_p2_f3: 'Built job search, filtering, pagination, and online application features.',
      cv_p2_f4: 'Integrated Socket.IO to enable real-time messaging between recruiters and candidates.',
      toast_lang_switched: 'Switched language to English',
      toast_download: "Downloading Dang Hong Phuc's CV (PDF)..."
    },
    vi: {
      cv_back: 'Trang chủ',
      cv_role: 'Lập trình viên Backend',
      cv_status: 'Sẵn sàng nhận việc',
      cv_tab_pdf: 'Xem file PDF',
      cv_tab_web: 'Bản Web',
      cv_download: 'Tải CV',
      cv_download_pdf: 'Tải PDF',
      cv_download_mobile: 'Tải CV (PDF)',
      cv_loading: 'Đang hiển thị CV của Đặng Hồng Phúc...',
      cv_address: 'Bắc Từ Liêm, Hà Nội',
      cv_born: 'Sinh năm: 2005',
      cv_sec_summary: 'TỔNG QUAN',
      cv_summary_text: 'Thực tập sinh Backend Developer có kinh nghiệm thực tế với <strong>Node.js, Express.js, TypeScript và MongoDB</strong>, chuyên xây dựng RESTful APIs và các ứng dụng backend có khả năng mở rộng. Nắm vững xác thực JWT, thiết kế cơ sở dữ liệu và kiến trúc MVC. Đam mê viết code sạch, dễ bảo trì và mong muốn đóng góp cho các dự án backend thực tế đồng thời không ngừng nâng cao kỹ năng chuyên môn.',
      cv_sec_edu: 'HỌC VẤN',
      cv_edu_school: 'Đại học Công nghiệp Hà Nội (HaUI)',
      cv_edu_time: '2023 - 2027 (Dự kiến)',
      cv_edu_meta: 'Chuyên ngành: <strong>Công nghệ thông tin</strong> (Sinh viên năm cuối) • GPA: <strong>3.2 / 4.0</strong>',
      cv_sec_skills: 'KỸ NĂNG CHUYÊN MÔN',
      cv_skill_lang: 'Ngôn ngữ:',
      cv_skill_backend: 'Backend:',
      cv_skill_frontend: 'Frontend:',
      cv_skill_db: 'Cơ sở dữ liệu:',
      cv_skill_tools: 'Công cụ & Quy trình:',
      cv_skill_soft: 'Kỹ năng mềm:',
      cv_skill_soft_val: 'Quản lý thời gian, Tự học và Nghiên cứu tài liệu',
      cv_sec_projects: 'DỰ ÁN TIÊU BIỂU',
      cv_proj_role: 'Lập trình viên Backend (Dự án cá nhân)',
      cv_tech_label: 'Công nghệ:',
      cv_p1_f1: 'Xây dựng hệ thống backend dạng module cho trang web đặt tour du lịch với các chức năng CRUD cho tour, blog, danh mục, đơn hàng, mã giảm giá và liên hệ.',
      cv_p1_f2: 'Thiết lập cơ chế xác thực JWT, phân quyền tài khoản (RBAC) và mã hóa mật khẩu an toàn bằng bcrypt.',
      cv_p1_f3: 'Phát triển tính năng khôi phục mật khẩu xác thực qua mã OTP gửi qua email bằng Nodemailer.',
      cv_p1_f4: 'Tích hợp phân trang, lọc nâng cao, tìm kiếm, thao tác dữ liệu hàng loạt và dashboard thống kê hỗ trợ quản trị dữ liệu.',
      cv_p2_f1: 'Thiết kế và xây dựng hệ thống RESTful API phục vụ tuyển dụng, đăng tin tìm việc và quản lý hồ sơ ứng viên.',
      cv_p2_f2: 'Hiện thực hệ thống đăng nhập/đăng ký bằng JWT token với phân quyền đa vai trò (ứng viên / nhà tuyển dụng).',
      cv_p2_f3: 'Xây dựng chức năng tìm kiếm việc làm, lọc theo nhiều tiêu chí, phân trang và ứng tuyển CV trực tuyến.',
      cv_p2_f4: 'Tích hợp Socket.IO hỗ trợ nhắn tin thời gian thực (real-time chat) giữa nhà tuyển dụng và ứng viên.',
      toast_lang_switched: 'Đã chuyển sang Tiếng Việt',
      toast_download: 'Đang tải xuống CV Đặng Hồng Phúc (PDF)...'
    }
  };

  let currentLang = localStorage.getItem('portfolio_lang') || 'en';

  function applyLanguage(lang, notify = false) {
    if (!cvTranslations[lang]) lang = 'en';
    currentLang = lang;
    localStorage.setItem('portfolio_lang', lang);
    htmlRoot.setAttribute('lang', lang);

    const dict = cvTranslations[lang];
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) {
        el.innerHTML = dict[key];
      }
    });

    document.querySelectorAll('.lang-btn').forEach((btn) => {
      if (btn.getAttribute('data-lang-btn') === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    if (notify) {
      showToast(dict.toast_lang_switched);
    }
  }

  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetLang = btn.getAttribute('data-lang-btn');
      if (targetLang && targetLang !== currentLang) {
        applyLanguage(targetLang, true);
      }
    });
  });

  applyLanguage(currentLang, false);

  const tabPdf = document.getElementById('tabPdf');
  const tabWeb = document.getElementById('tabWeb');
  const pdfView = document.getElementById('pdfView');
  const webView = document.getElementById('webView');
  const cvToolbar = document.getElementById('cvToolbar');

  function switchTab(mode) {
    if (mode === 'pdf') {
      tabPdf.classList.add('active');
      tabWeb.classList.remove('active');
      pdfView.classList.add('active');
      webView.classList.remove('active');
      if (cvToolbar) cvToolbar.style.display = 'flex';
      renderCurrentPage();
    } else {
      tabWeb.classList.add('active');
      tabPdf.classList.remove('active');
      webView.classList.add('active');
      pdfView.classList.remove('active');
      if (cvToolbar) cvToolbar.style.display = 'none';
    }
  }

  if (tabPdf && tabWeb) {
    tabPdf.addEventListener('click', () => switchTab('pdf'));
    tabWeb.addEventListener('click', () => switchTab('web'));
  }

  const pdfCanvas = document.getElementById('pdfCanvas');
  const loadingOverlay = document.getElementById('loadingOverlay');
  const fallbackContainer = document.getElementById('fallbackContainer');
  const zoomText = document.getElementById('zoomText');
  const zoomInBtn = document.getElementById('zoomInBtn');
  const zoomOutBtn = document.getElementById('zoomOutBtn');
  const zoomFitBtn = document.getElementById('zoomFitBtn');
  const zoomResetBtn = document.getElementById('zoomResetBtn');

  let pdfDoc = null;
  let pageNum = 1;
  let scale = 1.25;
  let isRendering = false;
  let pageRenderingQueue = null;

  if (window.pdfjsLib) {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc =
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  }

  async function loadPdf() {
    if (!window.pdfjsLib) {
      enableFallback();
      return;
    }

    try {
      const loadingTask = window.pdfjsLib.getDocument(PDF_URL);
      pdfDoc = await loadingTask.promise;

      if (window.innerWidth < 768) {
        scale = 0.85;
      }

      if (loadingOverlay) loadingOverlay.style.display = 'none';
      renderCurrentPage();
    } catch (err) {
      console.warn('PDF.js loading failed, switching to native fallback:', err);
      enableFallback();
    }
  }

  function enableFallback() {
    if (loadingOverlay) loadingOverlay.style.display = 'none';
    if (pdfCanvas) pdfCanvas.style.display = 'none';
    if (fallbackContainer) fallbackContainer.style.display = 'block';
  }

  function updateZoomLabel() {
    if (zoomText) {
      zoomText.textContent = `${Math.round(scale * 100)}%`;
    }
  }

  async function renderCurrentPage() {
    if (!pdfDoc || !pdfCanvas) return;

    if (isRendering) {
      pageRenderingQueue = pageNum;
      return;
    }

    isRendering = true;
    updateZoomLabel();

    try {
      const page = await pdfDoc.getPage(pageNum);
      const ctx = pdfCanvas.getContext('2d');
      const dpr = window.devicePixelRatio || 1;

      const viewport = page.getViewport({ scale: scale * dpr });

      pdfCanvas.width = viewport.width;
      pdfCanvas.height = viewport.height;
      pdfCanvas.style.width = `${viewport.width / dpr}px`;
      pdfCanvas.style.height = `${viewport.height / dpr}px`;

      const renderContext = {
        canvasContext: ctx,
        viewport: viewport
      };

      await page.render(renderContext).promise;
      isRendering = false;

      if (pageRenderingQueue !== null) {
        pageRenderingQueue = null;
        renderCurrentPage();
      }
    } catch (err) {
      console.error('Error rendering page:', err);
      isRendering = false;
    }
  }

  if (zoomInBtn) {
    zoomInBtn.addEventListener('click', () => {
      if (scale < 2.5) {
        scale = Math.min(2.5, scale + 0.15);
        renderCurrentPage();
      }
    });
  }

  if (zoomOutBtn) {
    zoomOutBtn.addEventListener('click', () => {
      if (scale > 0.5) {
        scale = Math.max(0.5, scale - 0.15);
        renderCurrentPage();
      }
    });
  }

  if (zoomResetBtn) {
    zoomResetBtn.addEventListener('click', () => {
      scale = 1.0;
      renderCurrentPage();
    });
  }

  if (zoomFitBtn) {
    zoomFitBtn.addEventListener('click', () => {
      const containerWidth = Math.min(window.innerWidth - 48, 920);
      scale = containerWidth / 680;
      renderCurrentPage();
    });
  }

  const downloadBtns = document.querySelectorAll('.cv-download-trigger');
  downloadBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const msg = cvTranslations[currentLang]?.toast_download || "Downloading Dang Hong Phuc's CV (PDF)...";
      showToast(msg);
    });
  });

  const printBtn = document.getElementById('printBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      if (!tabWeb.classList.contains('active')) {
        switchTab('web');
        setTimeout(() => {
          window.print();
        }, 200);
      } else {
        window.print();
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.location.href = 'index.html';
    }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
      e.preventDefault();
      if (printBtn) printBtn.click();
    }
    if ((e.ctrlKey || e.metaKey) && (e.key === '=' || e.key === '+')) {
      e.preventDefault();
      if (zoomInBtn) zoomInBtn.click();
    }
    if ((e.ctrlKey || e.metaKey) && e.key === '-') {
      e.preventDefault();
      if (zoomOutBtn) zoomOutBtn.click();
    }
  });

  function showToast(message) {
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 400);
    }, 3000);
  }

  loadPdf();
});
