/**
 * DANG HONG PHUC PORTFOLIO - JAVASCRIPT
 * Full interactive logic: Theme toggle, Typing effect, Scrollspy,
 * Project modals, Contact form, and AI Assistant.
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

  // Retrieve saved theme or default to 'light' (as showcased in video)
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
  // 3. Dynamic Typewriter Effect in Hero Section
  // =========================================================================
  const typingElement = document.getElementById('heroTyping');
  const wordsToType = [
    'Backend Developer'
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseBetweenWords = 1800;

  function typeEffect() {
    if (!typingElement) return;

    const currentWord = wordsToType[wordIndex];

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
  // 4. Floating Capsule Navbar & Scrollspy
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

  // Scrollspy to highlight active link
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
  // 5. Scroll Reveal Animations (Intersection Observer)
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
    threshold: 0.08,
    rootMargin: '0px 0px -20px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // =========================================================================
  // 6. Project Details Modal Logic
  // =========================================================================
  const projectDatabase = {
    travelgo: {
      title: 'TravelGo Website (Server Side Rendering)',
      category: 'Travel Booking & Management System',
      image: './assets/project_travelgo.png',
      desc: 'A comprehensive travel booking platform engineered with a modular backend. Supports end-to-end booking workflows, tour and blog management, category indexing, coupon validation, customer inquiries, and secure OTP password recovery.',
      features: [
        'Built a modular backend for a travel booking management system with CRUD operations for tours, blogs, categories, orders, coupons, and contacts.',
        'Implemented JWT authentication, role-based access control, and secure password hashing using bcrypt.',
        'Developed OTP-based password recovery and email notifications using Nodemailer.',
        'Implemented pagination, filtering, searching, bulk operations, and dashboard analytics for efficient data management.'
      ],
      tags: ['NodeJS', 'ExpressJS', 'MongoDB & Mongoose', 'Pug (SSR)', 'JWT Authentication', 'Cloudinary & Multer', 'BcryptJS', 'Nodemailer'],
      liveUrl: 'https://travelgo-bx88.onrender.com',
      githubUrl: 'https://gitlab.com/phucdnag/travelgo'
    },
    techjobs: {
      title: 'TechJobs Website (Client Side Rendering)',
      category: 'IT Recruitment & Career Platform',
      image: './assets/project_techjobs.png',
      desc: 'A full-featured recruitment platform tailored for IT job seekers and hiring managers. Provides high-performance RESTful APIs for job postings, online application processing, CV management, and real-time candidate-recruiter messaging with Socket.IO.',
      features: [
        'Developed robust RESTful APIs for recruitment workflows, job posting, and CV management.',
        'Implemented JWT-based authentication with fine-grained role-based authorization.',
        'Built fast multi-criteria job search, category filtering, pagination, and online application features.',
        'Integrated Socket.IO to enable real-time bidirectional messaging between recruiters and candidates.',
        'Deployed API backend on Render (https://techjobs-o6il.onrender.com) and client on Vercel.'
      ],
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

      modalImg.src = project.image;
      modalImg.alt = project.title;
      modalCategory.textContent = project.category;
      modalTitle.textContent = project.title;
      modalDesc.textContent = project.desc;

      // Populate features
      modalFeaturesList.innerHTML = '';
      project.features.forEach(feat => {
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
        repoText.textContent = project.githubUrl.includes('gitlab.com') ? 'GitLab Repository' : 'GitHub Repository';
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
      showToast('Opening Dang Hong Phuc\'s CV online...');
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

  // Quick Chips
  aiPromptChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const query = chip.getAttribute('data-query');
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
   * Smart AI Knowledge Engine based on Phuc's profile
   */
  function generateRyHarAiResponse(userInput) {
    const q = userInput.toLowerCase();

    // 1. Identity / Who are you?
    if (q.includes('who are you') || q.includes('who are u') || q.includes('bạn là ai') || q.includes('introduce') || q.includes('gioi thieu')) {
      return `I am Phuc's AI Assistant, the personal assistant for Dang Hong Phuc, a passionate Web Developer with experience in Node.js and ReactJS. I am here to help you explore his skills, background, and projects.`;
    }

    // 2. Greetings
    if (q === 'hello' || q === 'hi' || q === 'hey' || q === 'xin chao' || q === 'chao' || q.includes('good morning') || q.includes('good evening')) {
      return `Hello! Wonderful to connect with you. What would you like to explore regarding Dang Hong Phuc's projects, tech stack, or background?`;
    }

    // 3. TravelGo Website
    if (q.includes('travelgo') || q.includes('travel') || q.includes('tour') || q.includes('booking')) {
      return `<strong>TravelGo Website</strong> is a modular travel booking management system engineered with NodeJS, ExpressJS, MongoDB, Pug (SSR), JWT Authentication, and Nodemailer. It features full CRUD operations for tours, blogs, orders, coupons, and secure OTP password recovery.<br>🔗 <a href="https://gitlab.com/phucdnag/travelgo" target="_blank" style="color:var(--text-main);font-weight:700;text-decoration:underline;">GitLab Repository</a> | <a href="https://travelgo-bx88.onrender.com" target="_blank" style="color:var(--text-main);font-weight:700;text-decoration:underline;">Live Demo</a>`;
    }

    // 4. TechJobs Website
    if (q.includes('techjob') || q.includes('recruitment') || q.includes('tuyen dung') || q.includes('job')) {
      return `<strong>TechJobs Website</strong> is an IT recruitment and career platform providing RESTful APIs for recruitment, job posting, and online CV management, role-based authorization, and real-time messaging between recruiters and candidates with Socket.IO.<br>🔗 <a href="https://gitlab.com/phucdnag/techjobs" target="_blank" style="color:var(--text-main);font-weight:700;text-decoration:underline;">GitLab Repository</a> | <a href="https://techjobs-eight.vercel.app" target="_blank" style="color:var(--text-main);font-weight:700;text-decoration:underline;">Live Demo</a>`;
    }

    // 5.5. CV / Resume / Profile
    if (q.includes('cv') || q.includes('resume') || q.includes('ho so') || q.includes('hồ sơ') || q.includes('curriculum vitae')) {
      return `You can view Dang Hong Phuc's complete CV online or download the PDF version:<br>📄 <a href="cv.html" target="_blank" style="color:var(--text-main);font-weight:700;text-decoration:underline;">View CV Online (Interactive & PDF)</a><br>📥 <a href="assets/Dang-Hong-Phuc-CV.pdf" download="Dang-Hong-Phuc-CV.pdf" style="color:var(--text-main);font-weight:700;text-decoration:underline;">Download CV (PDF)</a>`;
    }

    // 6. Tech Stack & Skills
    if (q.includes('skill') || q.includes('tech stack') || q.includes('technolog') || q.includes('stack') || q.includes('ky nang')) {
      return `Phuc's core technology competencies include:<br>• <strong>Frontend:</strong> ReactJS, Next.js, HTML5, CSS3, JavaScript (ES6+)<br>• <strong>Backend:</strong> Node.js, Express.js, RESTful APIs<br>• <strong>Databases & ORM:</strong> MySQL, MongoDB, Prisma<br>• <strong>Tools & DevOps:</strong> Git, Postman, npm`;
    }

    // 7. Contact / How to reach
    if (q.includes('contact') || q.includes('reach') || q.includes('email') || q.includes('phone') || q.includes('lien he') || q.includes('hire')) {
      return `You can reach Dang Hong Phuc directly through:<br>📧 Email: <strong>phucdnag.dev@gmail.com</strong><br>📱 Phone: <strong>+84 332-027-551</strong><br>📍 Location: <strong>Hung Yen, Vietnam</strong><br>💼 Availability: <strong>Open to Intern / Fresher opportunities</strong>`;
    }

    // 8. Education & GPA
    if (q.includes('education') || q.includes('degree') || q.includes('college') || q.includes('university') || q.includes('gpa') || q.includes('hoc van')) {
      return `Phuc is studying at <strong>Hanoi University of Industry</strong>, with a Cumulative GPA of <strong>3.2</strong>.`;
    }

    // 9. Experience & Goal
    if (q.includes('experience') || q.includes('background') || q.includes('kinh nghiem') || q.includes('objective')) {
      return `Phuc is a Web Developer passionate about building practical applications with Node.js and ReactJS, actively seeking an Intern/Fresher opportunity to grow into a professional Software Engineer.`;
    }

    // 10. Default / Fallback
    return `Thank you for reaching out! You can ask me anything about:<br>• Technical skills & tech stack<br>• Education & GPA<br>• Contact information<br>• Projects & practical experience.`;
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

});
