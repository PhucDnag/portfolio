/**
 * ONLINE CV VIEWER JAVASCRIPT - DANG HONG PHUC
 * Handles PDF rendering with PDF.js, Zooming, Tabs, Theme Sync & Actions
 */

document.addEventListener('DOMContentLoaded', () => {
  const PDF_URL = 'assets/Dang-Hong-Phuc-CV.pdf';

  // -------------------------------------------------------------------------
  // 1. Theme Management (Synchronized with Portfolio)
  // -------------------------------------------------------------------------
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
      showToast(`Switched to ${newTheme} mode`);
    });
  }

  // -------------------------------------------------------------------------
  // 2. View Mode Tabs (PDF View vs Interactive Web View)
  // -------------------------------------------------------------------------
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

  // -------------------------------------------------------------------------
  // 3. PDF.js Document Rendering & Zoom Engine
  // -------------------------------------------------------------------------
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
  let scale = 1.25; // default comfortable reading scale
  let isRendering = false;
  let pageRenderingQueue = null;

  // Initialize PDF.js worker
  if (window.pdfjsLib) {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc =
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  }

  // Load PDF document
  async function loadPdf() {
    if (!window.pdfjsLib) {
      enableFallback();
      return;
    }

    try {
      const loadingTask = window.pdfjsLib.getDocument(PDF_URL);
      pdfDoc = await loadingTask.promise;

      // Adjust default scale for mobile screens
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

      // Calculate viewport at current scale
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

  // Zoom Handlers
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
      // Standard A4 aspect ratio width ~ 595pt
      scale = containerWidth / 680;
      renderCurrentPage();
    });
  }

  // -------------------------------------------------------------------------
  // 4. Download & Print Actions
  // -------------------------------------------------------------------------
  const downloadBtns = document.querySelectorAll('.cv-download-trigger');
  downloadBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      showToast('Downloading Dang Hong Phuc\'s CV (PDF)...');
    });
  });

  const printBtn = document.getElementById('printBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      // If currently on PDF tab, switch to Web View or print directly
      if (!tabWeb.classList.contains('active')) {
        // Switch to web view for clean print formatting
        switchTab('web');
        setTimeout(() => {
          window.print();
        }, 200);
      } else {
        window.print();
      }
    });
  }

  // Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    // Escape -> Return to portfolio
    if (e.key === 'Escape') {
      window.location.href = 'index.html';
    }
    // Ctrl/Cmd + P -> Print
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
      e.preventDefault();
      if (printBtn) printBtn.click();
    }
    // Ctrl/Cmd + Plus / Minus
    if ((e.ctrlKey || e.metaKey) && (e.key === '=' || e.key === '+')) {
      e.preventDefault();
      if (zoomInBtn) zoomInBtn.click();
    }
    if ((e.ctrlKey || e.metaKey) && e.key === '-') {
      e.preventDefault();
      if (zoomOutBtn) zoomOutBtn.click();
    }
  });

  // -------------------------------------------------------------------------
  // 5. Toast Notification System
  // -------------------------------------------------------------------------
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

  // Start PDF rendering
  loadPdf();
});
