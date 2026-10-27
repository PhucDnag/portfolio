/**
 * DANG HONG PHUC PORTFOLIO - JAVASCRIPT
 * Full interactive logic: Theme toggle, Multi-language (EN/VI) i18n,
 * Typing effect, Scrollspy, Project modals, and AI Assistant.
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. Initial Page Loading Animation
  // =========================================================================
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('fade-out');
    }, 1200);
  }

  // Set welcome message timestamp to current time
  const welcomeTimeEl = document.getElementById('welcomeTime');
  if (welcomeTimeEl) {
    const now = new Date();
    welcomeTimeEl.textContent = `${String(now.getHours()).padStart(2, '0')}.${String(now.getMinutes()).padStart(2, '0')}`;
  }

  // =========================================================================
  // 2. Theme Toggle (Light / Dark Mode with LocalStorage)
  // =========================================================================
  const themeToggle = document.getElementById('themeToggle');
  const rootElement = document.documentElement;

  const savedTheme = localStorage.getItem('ryhar_theme') || 'light';
  rootElement.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = rootElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      rootElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('ryhar_theme', newTheme);
      showToast(`${newTheme === 'dark' ? 'Dark' : 'Light'} mode activated`);
    });
  }

  // =========================================================================
  // 3. Multi-language (EN / VI) Translation Engine
  // =========================================================================
  const translations = {
    en: {
      nav_home: "Home",
      nav_about: "About",
      nav_skills: "Skills",
      nav_projects: "Projects",

      hero_title: "Hi, I'm Phuc Dnag",
      hero_bio: "Hi! I'm passionate about building modern, efficient, and user friendly web applications. I enjoy turning ideas into real world solutions, exploring new technologies, and continuously improving my skills to create meaningful digital experiences.",
      hero_explore: "Explore Work",
      hero_view_cv: "View CV",
      hero_connect: "CONNECT",
      badge_stack: "Main Stack: MERN Stack",
      badge_role: "Backend Developer",

      about_subtitle: "DISCOVER",
      about_title: "About Me",
      about_who_title: "Who Am I",
      about_who_desc: "I am a passionate Web Developer with experience using Node.js and ReactJS. I enjoy building practical web applications and continuously improving my development skills.",
      about_approach_title: "My Approach",
      about_approach_desc: "I am seeking an Intern/Fresher opportunity where I can apply my knowledge, gain real-world experience, and grow into a professional Software Engineer.",
      about_details_heading: "Personal Details",
      detail_name: "NAME",
      detail_name_val: "Dang Hong Phuc",
      detail_hometown: "HOMETOWN",
      detail_hometown_val: "Hung Yen",
      detail_phone: "PHONE",
      detail_gpa: "GPA",
      detail_email: "EMAIL",
      detail_education: "EDUCATION",
      detail_education_val: "Hanoi University of Industry",

      skills_subtitle: "SKILLS & TOOLS",
      skills_title: "My Tech Stack",
      skills_cat1_title: "Frontend Languages & Frameworks",
      skills_cat1_desc: "The tools I use to build beautiful, responsive, and interactive user interfaces.",
      skills_cat2_title: "Backend Core",
      skills_cat2_desc: "The foundations of the APIs and services I build for web apps and bots.",

      projects_subtitle: "PORTFOLIO",
      projects_title: "Selected Works",
      project1_tag: "Server Side Rendering",
      project1_title: "TravelGo Website",
      project1_desc: "A modular travel booking and management system featuring CRUD operations for tours, blogs, categories, orders, coupons, contacts, and OTP password recovery.",
      project2_tag: "Client Side Rendering",
      project2_title: "TechJobs Website",
      project2_desc: "An IT recruitment and career platform providing RESTful APIs for recruitment, job posting, CV management, and real-time messaging with Socket.IO.",
      btn_view_details: "VIEW DETAILS",

      modal_highlights: "Key Highlights & Architecture",
      modal_tech_used: "Technologies Used",
      modal_live_demo: "View Live Demo",
      modal_repo: "GitLab Repository",

      footer_copy: "© 2026 Dang Hong Phuc. All rights reserved.",
      footer_back_top: "Back to Top",

      ai_header_title: "Phuc's Assistant",
      ai_status_online: "Online",
      ai_welcome_msg: "Hello! I am Dang Hong Phuc's AI Assistant. How can I assist you with Phuc's portfolio, skills, or projects today?",
      ai_prompt_who: "💡 Who are you?",
      ai_prompt_cv: "📄 View CV",
      ai_prompt_stack: "⚡ Skills",
      ai_prompt_edu: "🎓 Education",
      ai_prompt_contact: "📬 Contact",
      ai_input_placeholder: "Ask me anything...",

      toast_lang_switched: "Switched language to English",
      toast_cv_opening: "Opening Dang Hong Phuc's CV online..."
    },
    vi: {
      nav_home: "Trang chủ",
      nav_about: "Giới thiệu",
      nav_skills: "Kỹ năng",
      nav_projects: "Dự án",

      hero_title: "Xin chào, tôi là Phúc",
      hero_bio: "Xin chào! Tôi đam mê xây dựng các ứng dụng web hiện đại, hiệu quả và thân thiện với người dùng. Tôi yêu thích việc biến các ý tưởng thành giải pháp thực tế, khám phá các công nghệ mới và không ngừng trau dồi kỹ năng để tạo ra những sản phẩm số chất lượng.",
      hero_explore: "Xem dự án",
      hero_view_cv: "Xem CV",
      hero_connect: "KẾT NỐI",
      badge_stack: "Công nghệ chính: MERN Stack",
      badge_role: "Lập trình viên Backend",

      about_subtitle: "KHÁM PHÁ",
      about_title: "Về Bản Thân",
      about_who_title: "Tôi Là Ai",
      about_who_desc: "Tôi là một lập trình viên Web nhiệt huyết với kinh nghiệm sử dụng Node.js và ReactJS. Tôi thích phát triển các ứng dụng thực tế và không ngừng nâng cao kỹ năng lập trình của mình.",
      about_approach_title: "Định Hướng Của Tôi",
      about_approach_desc: "Tôi đang tìm kiếm cơ hội Thực tập sinh / Fresher để áp dụng kiến thức đã học, tích lũy kinh nghiệm thực tế và phát triển trở thành một Software Engineer chuyên nghiệp.",
      about_details_heading: "Thông Tin Cá Nhân",
      detail_name: "HỌ VÀ TÊN",
      detail_name_val: "Đặng Hồng Phúc",
      detail_hometown: "QUÊ QUÁN",
      detail_hometown_val: "Hưng Yên",
      detail_phone: "ĐIỆN THOẠI",
      detail_gpa: "ĐIỂM GPA",
      detail_email: "EMAIL",
      detail_education: "HỌC VẤN",
      detail_education_val: "Đại học Công nghiệp Hà Nội (HaUI)",

      skills_subtitle: "KỸ NĂNG & CÔNG CỤ",
      skills_title: "Công Nghệ & Kỹ Năng",
      skills_cat1_title: "Công Nghệ & Framework Frontend",
      skills_cat1_desc: "Những công cụ tôi sử dụng để xây dựng giao diện người dùng đẹp mắt, mượt mà và tương thích đa thiết bị.",
      skills_cat2_title: "Nền Tảng Backend Cốt Lõi",
      skills_cat2_desc: "Nền tảng các API và dịch vụ tôi xây dựng cho ứng dụng web và hệ thống backend hiệu năng cao.",

      projects_subtitle: "DỰ ÁN",
      projects_title: "Dự Án Nổi Bật",
      project1_tag: "Server Side Rendering",
      project1_title: "Website TravelGo",
      project1_desc: "Hệ thống quản lý và đặt tour du lịch module hóa với đầy đủ CRUD cho tour, blog, danh mục, đơn hàng, mã giảm giá, liên hệ và khôi phục mật khẩu OTP.",
      project2_tag: "Client Side Rendering",
      project2_title: "Website TechJobs",
      project2_desc: "Nền tảng tuyển dụng IT cung cấp RESTful APIs quản lý đăng tin, hồ sơ CV ứng viên, phân quyền JWT và nhắn tin thời gian thực qua Socket.IO.",
      btn_view_details: "XEM CHI TIẾT",

      modal_highlights: "Điểm Nổi Bật & Kiến Trúc",
      modal_tech_used: "Công Nghệ Sử Dụng",
      modal_live_demo: "Xem Demo Trực Tiếp",
      modal_repo: "Mã Nguồn GitLab",

      footer_copy: "© 2026 Đặng Hồng Phúc. Tất cả quyền được bảo lưu.",
      footer_back_top: "Lên đầu trang",

      ai_header_title: "Trợ lý của Phúc",
      ai_status_online: "Trực tuyến",
      ai_welcome_msg: "Xin chào! Tôi là Trợ lý AI của Đặng Hồng Phúc. Bạn muốn tìm hiểu điều gì về kỹ năng, học vấn hay các dự án của Phúc hôm nay?",
      ai_prompt_who: "💡 Bạn là ai?",
      ai_prompt_cv: "📄 Xem CV",
      ai_prompt_stack: "⚡ Kỹ năng",
      ai_prompt_edu: "🎓 Học vấn",
      ai_prompt_contact: "📬 Liên hệ",
      ai_input_placeholder: "Hỏi tôi bất cứ điều gì...",

      toast_lang_switched: "Đã chuyển sang Tiếng Việt",
      toast_cv_opening: "Đang mở CV trực tuyến của Đặng Hồng Phúc..."
    }
  };

  const wordsByLang = {
    en: [
      'Backend Developer',
      'Node.js & Express.js',
      'TypeScript & MongoDB',
      'RESTful API Architect'
    ],
    vi: [
      'Lập trình viên Backend',
      'Node.js & Express.js',
      'TypeScript & MongoDB',
      'Xây dựng RESTful API'
    ]
  };

  let currentLang = localStorage.getItem('portfolio_lang') || 'en';

  // Apply Language function
  function applyLanguage(lang, notify = false) {
    if (!translations[lang]) lang = 'en';
    currentLang = lang;
    localStorage.setItem('portfolio_lang', lang);
    document.documentElement.setAttribute('data-lang', lang);

    // Update active class on buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    // Update all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });

    // Update placeholders
    const chatInput = document.getElementById('aiChatInput');
    if (chatInput && translations[lang].ai_input_placeholder) {
      chatInput.placeholder = translations[lang].ai_input_placeholder;
    }

    // Reset typewriter words and restart typing
    wordsToType = wordsByLang[lang] || wordsByLang.en;
    wordIndex = 0;
    charIndex = 0;
    isDeleting = false;

    if (notify) {
      showToast(translations[lang].toast_lang_switched);
    }
  }

  // Language button event listeners
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetLang = e.currentTarget.getAttribute('data-lang');
      if (targetLang && targetLang !== currentLang) {
        applyLanguage(targetLang, true);
      }
    });
  });

  // =========================================================================
  // 4. Dynamic Typewriter Effect in Hero Section
  // =========================================================================
  const typingElement = document.getElementById('heroTyping');
  let wordsToType = wordsByLang[currentLang] || wordsByLang.en;
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseBetweenWords = 1800;

  function typeEffect() {
    if (!typingElement) return;

    const currentWord = wordsToType[wordIndex] || wordsToType[0];

    if (isDeleting) {
      typingElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentWord.length) {
      delay = pauseBetweenWords;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % wordsToType.length;
      delay = 400;
    }

    setTimeout(typeEffect, delay);
  }

  typeEffect();

  // =========================================================================
  // 5. Floating Capsule Navbar & Scrollspy
  // =========================================================================
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const navLinksContainer = document.getElementById('navLinks');

  // Mobile menu toggle
  if (mobileMenuToggle && navLinksContainer) {
    mobileMenuToggle.addEventListener('click', () => {
      navLinksContainer.classList.toggle('mobile-open');
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinksContainer.classList.remove('mobile-open');
      });
    });
  }

  // Active section scrollspy
  window.addEventListener('scroll', () => {
    let currentSectionId = 'home';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 140;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = sectionId;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === currentSectionId) {
        link.classList.add('active');
      }
    });
  });

  // =========================================================================
  // 6. Scroll Reveal Animations (Intersection Observer)
  // =========================================================================
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // =========================================================================
  // 7. Project Details Modal Logic
  // =========================================================================
  const projectDatabase = {
    travelgo: {
      title: {
        en: 'TravelGo Website (Server Side Rendering)',
        vi: 'Website TravelGo (Server Side Rendering)'
      },
      category: {
        en: 'Travel Booking & Management System',
        vi: 'Hệ thống Quản lý & Đặt Tour Du lịch'
      },
      image: './assets/project_travelgo.png',
      desc: {
        en: 'A comprehensive travel booking platform engineered with a modular backend. Supports end-to-end booking workflows, tour and blog management, category indexing, coupon validation, customer inquiries, and secure OTP password recovery.',
        vi: 'Nền tảng đặt tour du lịch toàn diện với kiến trúc backend module hóa. Hỗ trợ quy trình đặt tour trọn gói, quản lý bài viết và danh mục, xác thực mã giảm giá, tiếp nhận phản hồi và phục hồi mật khẩu bảo mật qua OTP.'
      },
      features: {
        en: [
          'Built a modular backend for a travel booking management system with CRUD operations for tours, blogs, categories, orders, coupons, and contacts.',
          'Implemented JWT authentication, role-based access control, and secure password hashing using bcrypt.',
          'Developed OTP-based password recovery and email notifications using Nodemailer.',
          'Implemented pagination, filtering, searching, bulk operations, and dashboard analytics for efficient data management.'
        ],
        vi: [
          'Xây dựng backend module hóa cho hệ thống đặt tour với đầy đủ thao tác CRUD cho tour, blog, danh mục, đơn hàng, mã giảm giá và liên hệ.',
          'Triển khai xác thực JWT, phân quyền theo vai trò (Role-based access control) và mã hóa mật khẩu an toàn với bcrypt.',
          'Phát triển tính năng khôi phục mật khẩu xác thực OTP qua email bằng Nodemailer.',
          'Xử lý phân trang, bộ lọc tìm kiếm nâng cao, thao tác hàng loạt và dashboard thống kê dữ liệu trực quan.'
        ]
      },
      tags: ['NodeJS', 'ExpressJS', 'MongoDB & Mongoose', 'Pug (SSR)', 'JWT Authentication', 'Cloudinary & Multer', 'BcryptJS', 'Nodemailer'],
      liveUrl: 'https://travelgo-bx88.onrender.com',
      githubUrl: 'https://gitlab.com/phucdnag/travelgo'
    },
    techjobs: {
      title: {
        en: 'TechJobs Website (Client Side Rendering)',
        vi: 'Website TechJobs (Client Side Rendering)'
      },
      category: {
        en: 'IT Recruitment & Career Platform',
        vi: 'Nền tảng Tuyển dụng & Nghề nghiệp IT'
      },
      image: './assets/project_techjobs.png',
      desc: {
        en: 'A full-featured recruitment platform tailored for IT job seekers and hiring managers. Provides high-performance RESTful APIs for job postings, online application processing, CV management, and real-time candidate-recruiter messaging with Socket.IO.',
        vi: 'Nền tảng tuyển dụng hoàn chỉnh dành cho ứng viên và nhà tuyển dụng ngành IT. Cung cấp hệ thống RESTful API hiệu năng cao cho đăng tin tuyển dụng, nộp và quản lý hồ sơ CV trực tuyến, cùng tính năng nhắn tin tức thời qua Socket.IO.'
      },
      features: {
        en: [
          'Developed robust RESTful APIs for recruitment workflows, job posting, and CV management.',
          'Implemented JWT-based authentication with fine-grained role-based authorization.',
          'Built fast multi-criteria job search, category filtering, pagination, and online application features.',
          'Integrated Socket.IO to enable real-time bidirectional messaging between recruiters and candidates.',
          'Deployed API backend on Render (https://techjobs-o6il.onrender.com) and client on Vercel.'
        ],
        vi: [
          'Phát triển hệ thống RESTful API hoàn chỉnh cho quy trình tuyển dụng, quản lý tin tuyển dụng và hồ sơ CV.',
          'Triển khai cơ chế xác thực JWT với phân quyền chặt chẽ giữa ứng viên và nhà tuyển dụng.',
          'Xây dựng tính năng tìm kiếm việc làm đa tiêu chí, lọc danh mục, phân trang và nộp hồ sơ ứng tuyển trực tuyến.',
          'Tích hợp Socket.IO hỗ trợ nhắn tin thời gian thực 2 chiều giữa nhà tuyển dụng và ứng viên.',
          'Triển khai backend API trên Render (https://techjobs-o6il.onrender.com) và frontend trên Vercel.'
        ]
      },
      tags: ['RESTful API', 'Socket.IO', 'Node.js', 'Express.js', 'TypeScript', 'MongoDB & Mongoose', 'JWT Authentication', 'Cloudinary'],
      liveUrl: 'https://techjobs-eight.vercel.app',
      githubUrl: 'https://gitlab.com/phucdnag/techjobs'
    }
  };

  const projectModal = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalImg = document.getElementById('modalImg');
  const modalCategory = document.getElementById('modalCategory');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalFeaturesList = document.getElementById('modalFeaturesList');
  const modalTags = document.getElementById('modalTags');
  const modalLiveLink = document.getElementById('modalLiveLink');
  const modalGithubLink = document.getElementById('modalGithubLink');

  document.querySelectorAll('.open-project-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project');
      const project = projectDatabase[projectId];
      if (!project) return;

      const lang = currentLang || 'en';

      modalImg.src = project.image;
      modalImg.alt = typeof project.title === 'object' ? (project.title[lang] || project.title.en) : project.title;
      modalCategory.textContent = typeof project.category === 'object' ? (project.category[lang] || project.category.en) : project.category;
      modalTitle.textContent = typeof project.title === 'object' ? (project.title[lang] || project.title.en) : project.title;
      modalDesc.textContent = typeof project.desc === 'object' ? (project.desc[lang] || project.desc.en) : project.desc;

      // Populate features
      modalFeaturesList.innerHTML = '';
      const featuresList = (typeof project.features === 'object' && !Array.isArray(project.features))
        ? (project.features[lang] || project.features.en)
        : project.features;

      featuresList.forEach(feat => {
        const li = document.createElement('li');
        li.textContent = feat;
        modalFeaturesList.appendChild(li);
      });

      // Populate tags
      modalTags.innerHTML = '';
      project.tags.forEach(tag => {
        const span = document.createElement('span');
        span.className = 'badge-tag';
        span.textContent = tag;
        modalTags.appendChild(span);
      });

      modalLiveLink.href = project.liveUrl;
      modalGithubLink.href = project.githubUrl;
      const repoText = modalGithubLink.querySelector('span');
      if (repoText) {
        repoText.textContent = project.githubUrl.includes('gitlab.com')
          ? (lang === 'vi' ? 'Mã Nguồn GitLab' : 'GitLab Repository')
          : (lang === 'vi' ? 'Mã Nguồn GitHub' : 'GitHub Repository');
      }

      // Open Modal
      projectModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    if (projectModal) {
      projectModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeModal();
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal && projectModal.classList.contains('open')) {
      closeModal();
    }
  });

  // CV View Button Action (opens online CV viewer)
  const viewCvBtn = document.getElementById('viewCvBtn') || document.getElementById('downloadCvBtn');
  if (viewCvBtn) {
    viewCvBtn.addEventListener('click', () => {
      showToast(translations[currentLang]?.toast_cv_opening || 'Opening Dang Hong Phuc\'s CV online...');
    });
  }


  // =========================================================================
  // 8. RyHar AI Assistant Chatbot (Floating Widget)
  // =========================================================================
  const aiFabBtn = document.getElementById('aiFabBtn');
  const aiChatWindow = document.getElementById('aiChatWindow');
  const aiCloseBtn = document.getElementById('aiCloseBtn');
  const aiChatForm = document.getElementById('aiChatForm');
  const aiChatInput = document.getElementById('aiChatInput');
  const aiChatBody = document.getElementById('aiChatBody');
  const aiTypingIndicator = document.getElementById('aiTypingIndicator');
  const aiPromptChips = document.querySelectorAll('.ai-prompt-chip');

  // Toggle chat window open/close
  if (aiFabBtn && aiChatWindow) {
    aiFabBtn.addEventListener('click', () => {
      const isOpen = aiChatWindow.classList.contains('open');
      if (isOpen) {
        aiChatWindow.classList.remove('open');
      } else {
        aiChatWindow.classList.add('open');
        setTimeout(() => {
          aiChatInput.focus();
        }, 200);
      }
    });
  }

  if (aiCloseBtn && aiChatWindow) {
    aiCloseBtn.addEventListener('click', () => {
      aiChatWindow.classList.remove('open');
    });
  }

  // Handle Quick Prompt Chips
  aiPromptChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const query = chip.textContent.trim();
      if (query) {
        handleUserAiMessage(query);
      }
    });
  });

  // Handle Chat Form Submit
  if (aiChatForm) {
    aiChatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const message = aiChatInput.value.trim();
      if (!message) return;
      aiChatInput.value = '';
      handleUserAiMessage(message);
    });
  }

  function handleUserAiMessage(text) {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}.${String(now.getMinutes()).padStart(2, '0')}`;

    // Append user message bubble (outgoing)
    const userMsgEl = document.createElement('div');
    userMsgEl.className = 'chat-message chat-outgoing';
    userMsgEl.innerHTML = `
      <div class="chat-bubble">
        <p>${escapeHtml(text)}</p>
        <span class="msg-time">${timeStr}</span>
      </div>
    `;
    aiChatBody.appendChild(userMsgEl);
    scrollChatToBottom();

    // Show Typing indicator
    aiTypingIndicator.classList.remove('typing-hidden');
    aiChatBody.appendChild(aiTypingIndicator);
    scrollChatToBottom();

    // Determine smart response
    const botReply = generateRyHarAiResponse(text);

    // Simulate realistic AI typing delay (600ms - 1100ms)
    setTimeout(() => {
      aiTypingIndicator.classList.add('typing-hidden');

      const botTime = new Date();
      const botTimeStr = `${String(botTime.getHours()).padStart(2, '0')}.${String(botTime.getMinutes()).padStart(2, '0')}`;

      const botMsgEl = document.createElement('div');
      botMsgEl.className = 'chat-message chat-incoming';
      botMsgEl.innerHTML = `
        <div class="chat-bubble">
          <p>${botReply}</p>
          <span class="msg-time">${botTimeStr}</span>
        </div>
      `;
      aiChatBody.appendChild(botMsgEl);
      scrollChatToBottom();
    }, 850);
  }

  function scrollChatToBottom() {
    aiChatBody.scrollTop = aiChatBody.scrollHeight;
  }

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, (m) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    })[m]);
  }

  /**
   * Remove Vietnamese tone marks for accent-insensitive search
   */
  function removeVietnameseTones(str) {
    return (str || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D');
  }

  /**
   * Smart AI Knowledge Engine based on Phuc's profile (Bilingual with Vietnamese diacritic tolerance)
   */
  function generateRyHarAiResponse(userInput) {
    const raw = (userInput || '').toLowerCase().trim();
    const norm = removeVietnameseTones(raw);

    // Detect if user is asking in Vietnamese
    const hasVietnameseChars = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/.test(raw);
    const hasVietnameseWords = /\b(ban|anh|em|minh|chao|xin chao|o dau|sdt|lien he|ky nang|hoc van|du an|kinh nghiem|ho so|bao nhieu|nhu the nao|the nao|khong|gi|sao)\b/.test(norm);
    const isVi = currentLang === 'vi' || hasVietnameseChars || hasVietnameseWords;

    // Helper to check if any keyword exists in raw or normalized query
    const hasAny = (keywords) => {
      return keywords.some(k => {
        const kNorm = removeVietnameseTones(k.toLowerCase());
        return raw.includes(k.toLowerCase()) || norm.includes(kNorm);
      });
    };

    // 1. Contact / Liên hệ (e.g. "liên hệ", "contact", "email", "sđt", "ở đâu", "địa chỉ", "inbox")
    if (hasAny([
      'lien he', 'liên hệ', 'lien lac', 'liên lạc', 'contact', 'reach', 'hire',
      'email', 'mail', 'gmail', 'sdt', 'so dien thoai', 'số điện thoại', 'phone', 'dien thoai', 'điện thoại',
      'dia chi', 'địa chỉ', 'address', 'o dau', 'ở đâu', 'que', 'quê', 'hometown', 'location',
      'zalo', 'facebook', 'inbox', 'nhan tin', 'nhắn tin', 'trao doi', 'trao đổi', 'ket noi', 'kết nối'
    ])) {
      return isVi
        ? `Bạn có thể liên hệ trực tiếp với Đặng Hồng Phúc qua:<br>• 📧 Email: <a href="mailto:phucdnag.dev@gmail.com" style="color:var(--text-main);font-weight:700;text-decoration:underline;">phucdnag.dev@gmail.com</a><br>• 📱 Số điện thoại: <a href="tel:0332027551" style="color:var(--text-main);font-weight:700;text-decoration:underline;">0332 027 551</a><br>• 📍 Địa chỉ: <strong>Bắc Từ Liêm, Hà Nội</strong> (Quê quán: <strong>Hưng Yên</strong>)<br>• 💼 Trạng thái: <strong>Sẵn sàng làm việc (Thực tập sinh / Fresher Backend Developer)</strong>`
        : `You can reach Dang Hong Phuc directly via:<br>• 📧 Email: <a href="mailto:phucdnag.dev@gmail.com" style="color:var(--text-main);font-weight:700;text-decoration:underline;">phucdnag.dev@gmail.com</a><br>• 📱 Phone: <a href="tel:0332027551" style="color:var(--text-main);font-weight:700;text-decoration:underline;">+84 332-027-551</a><br>• 📍 Location: <strong>Bac Tu Liem, Hanoi, Vietnam</strong> (Hometown: <strong>Hung Yen</strong>)<br>• 💼 Availability: <strong>Ready for hire (Intern / Fresher Backend Developer)</strong>`;
    }

    // 2. Identity / Who are you? / Bạn là ai? / Giới thiệu
    if (hasAny([
      'who are you', 'who are u', 'who is phuc', 'introduce', 'about', 'who am i',
      'ban la ai', 'bạn là ai', 'ai day', 'ai đấy', 'ai the', 'ai thế', 'ai vay', 'ai vậy',
      'gioi thieu', 'giới thiệu', 'phuc la ai', 'phúc là ai', 'thong tin', 'thông tin', 'la ai'
    ])) {
      return isVi
        ? `Tôi là Trợ lý AI của <strong>Đặng Hồng Phúc</strong> — sinh viên năm cuối ngành Công nghệ Thông tin tại Đại học Công nghiệp Hà Nội (HaUI). Phúc chuyên phát triển Backend với <strong>Node.js, Express.js, TypeScript và MongoDB</strong>. Tôi có thể hỗ trợ bạn tìm hiểu chi tiết về kỹ năng, học vấn, dự án và cách thức liên hệ với Phúc!`
        : `I am the AI Assistant of <strong>Dang Hong Phuc</strong> — a final-year Information Technology student at Hanoi University of Industry (HaUI) specializing in Backend development with <strong>Node.js, Express.js, TypeScript, and MongoDB</strong>. Feel free to ask me anything about Phuc's skills, background, projects, or contact info!`;
    }

    // 3. CV / Resume / Hồ sơ
    if (hasAny([
      'cv', 'resume', 'ho so', 'hồ sơ', 'curriculum vitae', 'profile', 'xem cv', 'tai cv', 'tải cv', 'download cv'
    ])) {
      return isVi
        ? `Bạn có thể xem và tải CV chính thức của Đặng Hồng Phúc trực tiếp tại đây:<br>📄 <a href="cv.html" target="_blank" style="color:var(--text-main);font-weight:700;text-decoration:underline;">Xem CV Trực Tuyến (Online CV Viewer)</a><br>📥 <a href="assets/Dang-Hong-Phuc-CV.pdf" download="Dang-Hong-Phuc-CV.pdf" style="color:var(--text-main);font-weight:700;text-decoration:underline;">Tải CV Bản PDF</a>`
        : `You can view and download Dang Hong Phuc's official CV right here:<br>📄 <a href="cv.html" target="_blank" style="color:var(--text-main);font-weight:700;text-decoration:underline;">View Online CV (Interactive & PDF)</a><br>📥 <a href="assets/Dang-Hong-Phuc-CV.pdf" download="Dang-Hong-Phuc-CV.pdf" style="color:var(--text-main);font-weight:700;text-decoration:underline;">Download PDF CV</a>`;
    }

    // 4. Tech Stack & Skills / Kỹ năng & Công nghệ
    if (hasAny([
      'skill', 'stack', 'technolog', 'backend', 'frontend', 'database', 'framework',
      'ky nang', 'kỹ năng', 'cong nghe', 'công nghệ', 'ngon ngu', 'ngôn ngữ', 'chuyen mon', 'chuyên môn',
      'node', 'express', 'mongodb', 'mongoose', 'react', 'next', 'typescript', 'javascript', 'mysql',
      'socket', 'rest api', 'restful', 'git', 'postman', 'jwt', 'pug'
    ])) {
      return isVi
        ? `Kỹ năng công nghệ trọng tâm của Phúc bao gồm:<br>• <strong>Backend:</strong> Node.js, Express.js, RESTful API, Socket.IO, JWT, MVC architecture<br>• <strong>Frontend:</strong> ReactJS, Next.js, HTML5, CSS3, Tailwind CSS, JavaScript (ES6+)<br>• <strong>Cơ sở dữ liệu:</strong> MongoDB (Mongoose), MySQL<br>• <strong>Công cụ & Quy trình:</strong> Git, GitLab, GitHub, Postman, npm, Multer, Cloudinary, Nodemailer`
        : `Phuc's core technical stack includes:<br>• <strong>Backend:</strong> Node.js, Express.js, RESTful API, Socket.IO, JWT, MVC architecture<br>• <strong>Frontend:</strong> ReactJS, Next.js, HTML5, CSS3, Tailwind CSS, JavaScript (ES6+)<br>• <strong>Databases:</strong> MongoDB (Mongoose), MySQL<br>• <strong>Tools & Workflow:</strong> Git, GitLab, GitHub, Postman, npm, Multer, Cloudinary, Nodemailer`;
    }

    // 5. TravelGo Website specifically
    if (hasAny(['travelgo', 'travel', 'tour', 'booking'])) {
      return isVi
        ? `<strong>Website TravelGo (Server Side Rendering)</strong> là hệ thống quản lý và đặt tour du lịch module hóa được phát triển với NodeJS, ExpressJS, MongoDB, Pug (SSR), JWT và Nodemailer. Dự án tích hợp đầy đủ CRUD tour, blog, đơn hàng, mã giảm giá và khôi phục mật khẩu OTP.<br>🔗 <a href="https://gitlab.com/phucdnag/travelgo" target="_blank" style="color:var(--text-main);font-weight:700;text-decoration:underline;">GitLab Repository</a> | <a href="https://travelgo-bx88.onrender.com" target="_blank" style="color:var(--text-main);font-weight:700;text-decoration:underline;">Demo Trực Tiếp</a>`
        : `<strong>TravelGo Website (Server Side Rendering)</strong> is a modular travel booking management system built with NodeJS, ExpressJS, MongoDB, Pug (SSR), JWT, and Nodemailer. It features full CRUD operations for tours, blogs, orders, coupons, and OTP password recovery.<br>🔗 <a href="https://gitlab.com/phucdnag/travelgo" target="_blank" style="color:var(--text-main);font-weight:700;text-decoration:underline;">GitLab Repository</a> | <a href="https://travelgo-bx88.onrender.com" target="_blank" style="color:var(--text-main);font-weight:700;text-decoration:underline;">Live Demo</a>`;
    }

    // 6. TechJobs Website specifically
    if (hasAny(['techjob', 'recruitment', 'tuyen dung', 'tuyển dụng', 'job'])) {
      return isVi
        ? `<strong>Website TechJobs (Client Side Rendering)</strong> là nền tảng tuyển dụng IT xây dựng với RESTful APIs quản lý đăng tin, hồ sơ CV ứng viên, phân quyền đa vai trò bằng JWT và nhắn tin thời gian thực qua Socket.IO.<br>🔗 <a href="https://gitlab.com/phucdnag/techjobs" target="_blank" style="color:var(--text-main);font-weight:700;text-decoration:underline;">GitLab Repository</a> | <a href="https://techjobs-eight.vercel.app" target="_blank" style="color:var(--text-main);font-weight:700;text-decoration:underline;">Demo Web</a> | <a href="https://techjobs-o6il.onrender.com" target="_blank" style="color:var(--text-main);font-weight:700;text-decoration:underline;">API Endpoint</a>`
        : `<strong>TechJobs Website (Client Side Rendering)</strong> is an IT recruitment platform providing RESTful APIs for recruitment, job posting, online CV management, role-based authorization, and real-time candidate-recruiter chat via Socket.IO.<br>🔗 <a href="https://gitlab.com/phucdnag/techjobs" target="_blank" style="color:var(--text-main);font-weight:700;text-decoration:underline;">GitLab Repository</a> | <a href="https://techjobs-eight.vercel.app" target="_blank" style="color:var(--text-main);font-weight:700;text-decoration:underline;">Live Demo</a> | <a href="https://techjobs-o6il.onrender.com" target="_blank" style="color:var(--text-main);font-weight:700;text-decoration:underline;">API Endpoint</a>`;
    }

    // 7. General Projects / Dự án / Sản phẩm
    if (hasAny(['project', 'du an', 'dự án', 'san pham', 'sản phẩm', 'work', 'selected work', 'da lam duoc gi', 'làm được gì'])) {
      return isVi
        ? `Phúc có 2 dự án tiêu biểu được phát triển bài bản:<br><br>1. <strong>Website TravelGo (SSR)</strong>: Hệ thống quản lý & đặt tour du lịch với NodeJS, ExpressJS, MongoDB, Pug, JWT, Nodemailer.<br>🔗 <a href="https://gitlab.com/phucdnag/travelgo" target="_blank" style="color:var(--text-main);font-weight:700;text-decoration:underline;">GitLab</a> | <a href="https://travelgo-bx88.onrender.com" target="_blank" style="color:var(--text-main);font-weight:700;text-decoration:underline;">Demo Trực Tiếp</a><br><br>2. <strong>Website TechJobs (CSR)</strong>: Nền tảng tuyển dụng IT xây dựng bằng RESTful API, Socket.IO, TypeScript, Node.js, Express, MongoDB.<br>🔗 <a href="https://gitlab.com/phucdnag/techjobs" target="_blank" style="color:var(--text-main);font-weight:700;text-decoration:underline;">GitLab</a> | <a href="https://techjobs-eight.vercel.app" target="_blank" style="color:var(--text-main);font-weight:700;text-decoration:underline;">Demo Web</a>`
        : `Phuc has built two featured backend-focused projects:<br><br>1. <strong>TravelGo Website (SSR)</strong>: Modular travel booking platform with NodeJS, ExpressJS, MongoDB, Pug, JWT, and Nodemailer.<br>🔗 <a href="https://gitlab.com/phucdnag/travelgo" target="_blank" style="color:var(--text-main);font-weight:700;text-decoration:underline;">GitLab</a> | <a href="https://travelgo-bx88.onrender.com" target="_blank" style="color:var(--text-main);font-weight:700;text-decoration:underline;">Live Demo</a><br><br>2. <strong>TechJobs Website (CSR)</strong>: Real-time IT recruitment platform with RESTful API, Socket.IO, TypeScript, Express, MongoDB.<br>🔗 <a href="https://gitlab.com/phucdnag/techjobs" target="_blank" style="color:var(--text-main);font-weight:700;text-decoration:underline;">GitLab</a> | <a href="https://techjobs-eight.vercel.app" target="_blank" style="color:var(--text-main);font-weight:700;text-decoration:underline;">Live Demo</a>`;
    }

    // 8. Education & GPA / Học vấn & Trường / Điểm số
    if (hasAny([
      'education', 'degree', 'college', 'university', 'gpa', 'score', 'school', 'birthday', 'birth', 'born',
      'hoc van', 'học vấn', 'truong', 'trường', 'dai hoc', 'đại học', 'haui', 'cong nghiep', 'công nghiệp',
      'diem', 'điểm', 'nam sinh', 'năm sinh', 'sinh nam', 'sinh năm', 'tuoi', 'tuổi', '2005'
    ])) {
      return isVi
        ? `Về học vấn & thông tin cá nhân của Phúc:<br>• 🎓 <strong>Trường:</strong> Đại học Công nghiệp Hà Nội (HaUI)<br>• 📚 <strong>Chuyên ngành:</strong> Công nghệ Thông tin (Sinh viên năm cuối, 2023 - 2027)<br>• 🎯 <strong>Điểm GPA:</strong> <strong>3.2 / 4.0</strong><br>• 🎂 <strong>Năm sinh:</strong> 2005<br>• 📍 <strong>Địa chỉ hiện tại:</strong> Bắc Từ Liêm, Hà Nội`
        : `Phuc's education and personal background:<br>• 🎓 <strong>University:</strong> Hanoi University of Industry (HaUI)<br>• 📚 <strong>Major:</strong> Information Technology (Final year student, 2023 - 2027)<br>• 🎯 <strong>GPA:</strong> <strong>3.2 / 4.0</strong><br>• 🎂 <strong>Born:</strong> 2005<br>• 📍 <strong>Current Location:</strong> Bac Tu Liem, Hanoi, Vietnam`;
    }

    // 9. Experience & Career Goal / Kinh nghiệm & Định hướng
    if (hasAny([
      'experience', 'intern', 'fresher', 'background', 'goal', 'objective', 'career',
      'kinh nghiem', 'kinh nghiệm', 'thuc tap', 'thực tập', 'muc tieu', 'mục tiêu', 'dinh huong', 'định hướng'
    ])) {
      return isVi
        ? `Phúc là một lập trình viên Backend nhiệt huyết, có kinh nghiệm thực tế trong thiết kế kiến trúc hệ thống, RESTful APIs, phân quyền JWT và xử lý cơ sở dữ liệu MongoDB qua hai dự án <strong>TravelGo</strong> và <strong>TechJobs</strong>. Phúc đang tìm kiếm vị trí <strong>Thực tập sinh / Fresher Backend Developer</strong> để áp dụng kiến thức và phát triển thành kỹ sư phần mềm chuyên nghiệp.`
        : `Phuc is a passionate Backend Developer with practical hands-on experience in system design, RESTful APIs, JWT authentication, and MongoDB database design through projects <strong>TravelGo</strong> and <strong>TechJobs</strong>. He is actively seeking an <strong>Intern / Fresher Backend Developer</strong> role to contribute and grow professionally.`;
    }

    // 10. Greetings / Lời chào
    if (hasAny([
      'hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening',
      'chao', 'chào', 'xin chao', 'xin chào', 'alo', 'chào bạn', 'chao ban'
    ])) {
      return isVi
        ? `Xin chào bạn! Rất vui được kết nối. Bạn muốn tìm hiểu thông tin gì về kỹ năng chuyên môn, dự án hay cách liên hệ với Đặng Hồng Phúc?`
        : `Hello there! Wonderful to connect with you. What would you like to explore regarding Dang Hong Phuc's technical skills, projects, or background?`;
    }

    // 11. Thanks / Cảm ơn
    if (hasAny(['thank', 'thanks', 'cam on', 'cảm ơn', 'tks', 'ok', 'oke', 'tuyet', 'tuyệt', 'great'])) {
      return isVi
        ? `Rất vui được hỗ trợ bạn! Nếu bạn cần thêm bất kỳ thông tin nào về Đặng Hồng Phúc hoặc muốn trao đổi cơ hội hợp tác, bạn cứ nhắn tiếp nhé.`
        : `You are very welcome! If you need any further information about Dang Hong Phuc or wish to discuss an opportunity, feel free to ask anytime.`;
    }

    // 12. Default / Fallback
    return isVi
      ? `Cảm ơn bạn đã nhắn tin! Bạn có thể hỏi tôi chi tiết về:<br>• 📬 <strong>Liên hệ:</strong> Email, số điện thoại, địa chỉ<br>• ⚡ <strong>Kỹ năng:</strong> Node.js, Express, TypeScript, MongoDB...<br>• 💼 <strong>Dự án:</strong> TravelGo (SSR) & TechJobs (CSR)<br>• 🎓 <strong>Học vấn:</strong> HaUI & GPA 3.2<br>• 📄 <strong>CV:</strong> Xem và tải CV bản PDF`
      : `Thank you for reaching out! You can explore details about:<br>• 📬 <strong>Contact:</strong> Email, phone, location<br>• ⚡ <strong>Skills:</strong> Node.js, Express, TypeScript, MongoDB...<br>• 💼 <strong>Projects:</strong> TravelGo (SSR) & TechJobs (CSR)<br>• 🎓 <strong>Education:</strong> HaUI & GPA 3.2<br>• 📄 <strong>CV:</strong> View online and download PDF`;
  }

  // =========================================================================
  // 9. Toast Notification System
  // =========================================================================
  function showToast(message) {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => {
        toast.remove();
      }, 400);
    }, 3200);
  }

  // Initialize Language on page load
  applyLanguage(currentLang, false);

});
