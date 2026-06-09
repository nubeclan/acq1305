/* ==========================================================================
   INTERACTIVE PORTFOLIO SCRIPTS - ANGEL CÉSPEDES QUIROZ
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. STICKY GLASS NAVBAR & ACTIVE LINK HIGH LIGHTER
     ========================================================================== */
  const header = document.getElementById('header');
  const backToTopBtn = document.getElementById('back-to-top');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    // Toggle scrolled header state
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
      backToTopBtn.classList.add('active');
    } else {
      header.classList.remove('scrolled');
      backToTopBtn.classList.remove('active');
    }

    // Scroll active link highlighter
    let currentSection = '';
    sections.forEach(sec => {
      const secTop = sec.offsetTop;
      const secHeight = sec.clientHeight;
      if (window.scrollY >= (secTop - 150)) {
        currentSection = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === currentSection) {
        link.classList.add('active');
      }
    });
  });

  // Smooth scroll back to top
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ==========================================================================
     2. MOBILE RESPONSIVE HAMBURGER MENU
     ========================================================================== */
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close mobile menu when a nav link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });


  /* ==========================================================================
     3. INTERACTIVE SKILLS TABS SELECTOR
     ========================================================================== */
  const skillBtns = document.querySelectorAll('.skill-tab-btn');
  const skillPanes = document.querySelectorAll('.skills-pane');

  skillBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Deactivate current active states
      skillBtns.forEach(b => b.classList.remove('active'));
      skillPanes.forEach(p => p.classList.remove('active'));

      // Activate clicked tab
      btn.classList.add('active');
      const targetPane = document.getElementById(btn.getAttribute('data-tab'));
      targetPane.classList.add('active');

      // Re-trigger skill bar filling animation
      const fills = targetPane.querySelectorAll('.skill-bar-fill');
      fills.forEach(fill => {
        const width = fill.style.width;
        fill.style.width = '0';
        setTimeout(() => {
          fill.style.width = width;
        }, 100);
      });
    });
  });


  /* ==========================================================================
     4. INTERACTIVE TIMELINE EXPERIENCE FILTER (Corporate vs Consulting)
     ========================================================================== */
  const expBtns = document.querySelectorAll('.exp-filter-btn');
  const timelineItems = document.querySelectorAll('.timeline-item');

  function filterTimeline(filter) {
    timelineItems.forEach(item => {
      if (filter === 'all') {
        item.classList.remove('hidden');
      } else if (filter === 'corporate') {
        if (item.classList.contains('corporate')) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      } else if (filter === 'consulting') {
        if (item.classList.contains('consulting')) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      }
    });
  }

  expBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      expBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      filterTimeline(filter);
    });
  });

  // Execute initial filter for Corporate Experiences by default
  filterTimeline('corporate');


  /* ==========================================================================
     5. DYNAMIC CERTIFICATIONS & FUZZY SEARCH SYSTEM
     ========================================================================== */
  const certificationsData = [
    { title_es: "Microsoft Power Apps", title_en: "Microsoft Power Apps", date: "10/2022", type: "tech" },
    { title_es: "Gestión de servicios en TI basado en ITIL v4", title_en: "IT Service Management based on ITIL v4", date: "09/2022", type: "mgmt" },
    { title_es: "Scrum de la teoría a la práctica", title_en: "Scrum: From Theory to Practice", date: "08/2021", type: "mgmt" },
    { title_es: "Compras por internet", title_en: "Online Shopping & E-Commerce", date: "08/2019", type: "mgmt" },
    { title_es: "Cadena de importación y aduana, paso a paso y costos", title_en: "Import & Customs Chain: Step-by-Step and Costs", date: "03/2019", type: "mgmt" },
    { title_es: "Guaraní Nivel Básico", title_en: "Guarani Language - Basic Level", date: "08/2017 - 11/2017", type: "mgmt" },
    { title_es: "MikroTik Certified Network Associate (MTCNA)", title_en: "MikroTik Certified Network Associate (MTCNA)", date: "05/2017", type: "tech" },
    { title_es: "Como Importar de la China", title_en: "How to Import from China", date: "03/2017", type: "mgmt" },
    { title_es: "Taller de Diseño Gráfico", title_en: "Graphic Design Workshop", date: "08/2016", type: "tech" },
    { title_es: "Diseñador Gráfico Profesional (UTO)", title_en: "Professional Graphic Designer (UTO)", date: "2015 – 2016", type: "tech" },
    { title_es: "Administración de redes I", title_en: "Network Administration I", date: "07/2015", type: "tech" },
    { title_es: "Hardware, Reparación Ensamblaje y Mantenimiento", title_en: "Hardware, Repair, Assembly, and Maintenance", date: "04/2015 - 05/2015", type: "tech" },
    { title_es: "Diseño de sitios web con Joomla, Wordpress + Magento", title_en: "Website Design with Joomla, WordPress + Magento", date: "04/2014", type: "tech" },
    { title_es: "Taller elaboración de perfil de tesis", title_en: "Thesis Profile Preparation Workshop", date: "02/2014", type: "mgmt" },
    { title_es: "Computación de nivel avanzado", title_en: "Advanced Computing Level", date: "11/2013 - 12/2013", type: "tech" },
    { title_es: "Network and Technology Wireless", title_en: "Network and Technology Wireless", date: "05/2012", type: "tech" },
    { title_es: "MS Project", title_en: "MS Project", date: "11/2011", type: "mgmt" },
    { title_es: "El abismo de las matemáticas (colegio a universidad)", title_en: "The Abyss of Mathematics (High School to University)", date: "08/2011", type: "mgmt" },
    { title_es: "Estrategias de enseñanza aprendizaje", title_en: "Teaching-Learning Strategies", date: "07/2011", type: "mgmt" },
    { title_es: "Configuración de Servidores Linux", title_en: "Linux Server Configuration", date: "03/2011 - 04/2011", type: "tech" },
    { title_es: "GNU/Linux Básico", title_en: "Basic GNU/Linux", date: "04/2010 - 05/2010", type: "tech" },
    { title_es: "Liderazgo de excelencia", title_en: "Leadership of Excellence", date: "09/2009 - 10/2009", type: "mgmt" },
    { title_es: "Java Básico", title_en: "Basic Java", date: "09/2008", type: "tech" }
  ];

  const certsList = document.getElementById('certs-list');
  const certsSearchInput = document.getElementById('certs-search');
  const certsFilterBtns = document.querySelectorAll('.certs-filter-btn');
  const certsCount = document.getElementById('certs-count');

  let currentCertFilter = 'all';

  function renderCertifications() {
    const query = certsSearchInput.value.toLowerCase().trim();
    certsList.innerHTML = '';
    const lang = document.documentElement.getAttribute('lang') || 'es';

    const filtered = certificationsData.filter(cert => {
      // Check type filter
      if (currentCertFilter !== 'all' && cert.type !== currentCertFilter) {
        return false;
      }
      // Check query filter
      const title = lang === 'en' ? cert.title_en : cert.title_es;
      return title.toLowerCase().includes(query) || cert.date.includes(query);
    });

    if (lang === 'en') {
      certsCount.textContent = `${filtered.length} of ${certificationsData.length}`;
    } else {
      certsCount.textContent = `${filtered.length} de ${certificationsData.length}`;
    }

    if (filtered.length === 0) {
      const emptyMsg = lang === 'en' 
        ? 'No matching certifications found.' 
        : 'No se encontraron certificaciones coincidentes.';
      certsList.innerHTML = `
        <div style="text-align: center; padding: 30px; color: var(--text-muted); font-size: 0.9rem;">
          <i class="fa-solid fa-folder-open" style="font-size: 2rem; margin-bottom: 10px; display: block;"></i>
          ${emptyMsg}
        </div>
      `;
      return;
    }

    filtered.forEach(cert => {
      const card = document.createElement('div');
      card.className = 'cert-card';
      
      const badgeIcon = cert.type === 'tech' ? 'fa-laptop-code' : 'fa-list-check';
      const badgeText = lang === 'en' 
        ? (cert.type === 'tech' ? 'IT' : 'Management')
        : (cert.type === 'tech' ? 'TI' : 'Gestión');
      const subtitleText = lang === 'en' ? 'External Certification' : 'Certificación Externa';
      const badgeClass = cert.type === 'tech' ? '' : 'style="background: rgba(127, 0, 255, 0.1); color: var(--accent-magenta); border-color: rgba(127, 0, 255, 0.2);"';
      const title = lang === 'en' ? cert.title_en : cert.title_es;

      card.innerHTML = `
        <div class="cert-info">
          <h4>${title}</h4>
          <p><span class="badge" ${badgeClass} style="padding: 2px 8px; font-size: 0.65rem; margin-right: 5px;"><i class="fa-solid ${badgeIcon}"></i> ${badgeText}</span> ${subtitleText}</p>
        </div>
        <div class="cert-date">${cert.date}</div>
      `;
      certsList.appendChild(card);
    });
  }

  // Bind Search Input
  certsSearchInput.addEventListener('input', renderCertifications);

  // Bind Filter Buttons
  certsFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      certsFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCertFilter = btn.getAttribute('data-filter');
      renderCertifications();
    });
  });

  // Initial Render of Certifications
  renderCertifications();


  /* ==========================================================================
     6. DYNAMIC REFERENCES, SEARCH & CLIPBOARD COPY SYSTEM
     ========================================================================== */
  const referencesData = [
    { name: "Franklin Vargas Rodriguez", role_es: "Encargado de desarrollo y mantenimiento de canales digitales", role_en: "Head of Digital Channels Development and Maintenance", company_es: "Banco Económico", company_en: "Banco Económico", phone: "72188998" },
    { name: "Marco Antonio Erlwein", role_es: "Jefe de Proyectos", role_en: "Project Manager", company_es: "Cognos S.R.L.", company_en: "Cognos S.R.L.", phone: "70812728" },
    { name: "Geovanna R. Vargas Mojica", role_es: "Jefe de Proyectos", role_en: "Project Manager", company_es: "DIMA LTDA.", company_en: "DIMA LTDA.", phone: "77549168" },
    { name: "Heber Surco Chayña", role_es: "Jefe de Sistemas", role_en: "IT Manager", company_es: "Multicenter S.A.", company_en: "Multicenter S.A.", phone: "70894148" },
    { name: "Yrene Pereira Subelza", role_es: "Encargada de Recursos Humanos", role_en: "HR Manager", company_es: "CRDA SC", company_en: "CRDA SC", phone: "72632870" },
    { name: "Elder Escobar Calzadilla", role_es: "Jefe de Sistemas, SER", role_en: "IT Manager, SER", company_es: "GAMSC (Gobierno Municipal)", company_en: "GAMSC (Municipal Government)", phone: "75629482" },
    { name: "Maria Jannet Ibañez Flores", role_es: "Directora Ejecutiva", role_en: "Executive Director", company_es: "ADSIB (Agencia Criptográfica)", company_en: "ADSIB (Cryptographic Agency)", phone: "70104317" },
    { name: "Regina Otero", role_es: "Jefa de Recursos Humanos", role_en: "HR Manager", company_es: "Técnicas Reunidas S.A.", company_en: "Técnicas Reunidas S.A.", phone: "3111704" },
    { name: "Henry Nelson Farel Mendoza", role_es: "Gerente de Producción", role_en: "Production Manager", company_es: "FORVIDAS S.A.", company_en: "FORVIDAS S.A.", phone: "77078734" },
    { name: "Cristian Torranzos", role_es: "Director de Carrera de Informática", role_en: "Director of the Computer Science Department", company_es: "Universidad Bethesda", company_en: "Bethesda University", phone: "68908889" },
    { name: "Daniel Distasi", role_es: "Director Académico", role_en: "Academic Director", company_es: "Universidad UNO", company_en: "UNO University", phone: "72222731" },
    { name: "Freddy Saavedra Ramos", role_es: "Asesor Legal", role_en: "Legal Advisor", company_es: "Consultora General \"S&G\"", company_en: "General Consulting \"S&G\"", phone: "78400617" },
    { name: "Nolberto Zabala Quiroz", role_es: "Jefe de Informática", role_en: "IT Manager", company_es: "G.A.M. La Guardia", company_en: "M.G. La Guardia", phone: "77694784" },
    { name: "Juan Marcelo Calderón Bustos", role_es: "Gerente General", company_es: "Active BS S.R.L.", role_en: "General Manager", company_en: "Active BS S.R.L.", phone: "70840137" },
    { name: "Ricardo Zuna", role_es: "Director del DTIC", role_en: "Director of the DTIC", company_es: "UAGRM (Universidad Gabriel René Moreno)", company_en: "UAGRM (Gabriel René Moreno University)", phone: "72686611" },
    { name: "Mario Campos", role_es: "Jefe de Laboratorio de Cómputo (2011)", role_en: "Head of Computer Labs (2011)", company_es: "UAGRM", company_en: "UAGRM", phone: "77659663" },
    { name: "Miguel Jesús Peinado", role_es: "Gerente de Desarrollo", role_en: "Development Manager", company_es: "Century Software S.R.L.", company_en: "Century Software S.R.L.", phone: "75022506" }
  ];

  const refsList = document.getElementById('refs-list');
  const refsSearchInput = document.getElementById('refs-search');
  const refsCount = document.getElementById('refs-count');

  function renderReferences() {
    const query = refsSearchInput.value.toLowerCase().trim();
    refsList.innerHTML = '';
    const lang = document.documentElement.getAttribute('lang') || 'es';

    const filtered = referencesData.filter(ref => {
      const role = lang === 'en' ? ref.role_en : ref.role_es;
      const company = lang === 'en' ? ref.company_en : ref.company_es;
      return ref.name.toLowerCase().includes(query) || 
             role.toLowerCase().includes(query) || 
             company.toLowerCase().includes(query) ||
             ref.phone.includes(query);
    });

    if (lang === 'en') {
      refsCount.textContent = `${filtered.length} of ${referencesData.length} references`;
    } else {
      refsCount.textContent = `${filtered.length} de ${referencesData.length} referencias`;
    }

    if (filtered.length === 0) {
      const emptyMsg = lang === 'en' 
        ? 'No matching references found.' 
        : 'No se encontraron referencias que coincidan con la búsqueda.';
      refsList.innerHTML = `
        <div style="text-align: center; padding: 40px; color: var(--text-muted); font-size: 0.9rem; grid-column: 1 / -1;">
          <i class="fa-solid fa-users-slash" style="font-size: 2.5rem; margin-bottom: 12px; display: block;"></i>
          ${emptyMsg}
        </div>
      `;
      return;
    }

    filtered.forEach(ref => {
      const card = document.createElement('div');
      card.className = 'glass-card ref-card';
      const role = lang === 'en' ? ref.role_en : ref.role_es;
      const company = lang === 'en' ? ref.company_en : ref.company_es;
      const copyTitle = lang === 'en' ? 'Copy Phone' : 'Copiar Teléfono';
      const callTitle = lang === 'en' ? 'Call' : 'Llamar';
      
      card.innerHTML = `
        <div class="ref-info-top">
          <h4>${ref.name}</h4>
          <div class="ref-role">${role}</div>
          <div class="ref-company"><i class="fa-solid fa-building"></i> ${company}</div>
        </div>
        <div class="ref-contact-action">
          <div class="ref-phone"><i class="fa-solid fa-phone" style="color: var(--accent-blue); margin-right: 5px;"></i> ${ref.phone}</div>
          <div class="ref-buttons">
            <button class="ref-btn copy-btn" data-phone="${ref.phone}" title="${copyTitle}"><i class="fa-solid fa-copy"></i></button>
            <a href="tel:${ref.phone}" class="ref-btn call-btn" title="${callTitle}"><i class="fa-solid fa-phone-flip"></i></a>
          </div>
        </div>
      `;
      refsList.appendChild(card);
    });

    // Re-bind clipboard copying
    const copyBtns = refsList.querySelectorAll('.copy-btn');
    copyBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const phone = btn.getAttribute('data-phone');
        navigator.clipboard.writeText(phone).then(() => {
          // Success Feedback
          btn.classList.add('copied');
          btn.innerHTML = '<i class="fa-solid fa-check"></i>';
          setTimeout(() => {
            btn.classList.remove('copied');
            btn.innerHTML = '<i class="fa-solid fa-copy"></i>';
          }, 1500);
        }).catch(err => {
          console.error('Error copying phone number:', err);
        });
      });
    });
  }

  // Bind Search for References (only active after unlocking)
  refsSearchInput.addEventListener('input', renderReferences);

  // References Password Protection Lock Gate Logic
  const refsLockCard = document.getElementById('refs-lock-card');
  const refsProtectedContent = document.getElementById('refs-protected-content');
  const refsPasswordInput = document.getElementById('refs-password-input');
  const refsUnlockBtn = document.getElementById('refs-unlock-btn');
  const refsErrorMsg = document.getElementById('refs-error-msg');
  const refsLockInputGroup = document.getElementById('refs-lock-input-group');
  const refsHeaderLockIcon = document.getElementById('refs-header-lock-icon');

  function unlockReferences(animate = true) {
    if (animate) {
      refsLockCard.style.opacity = '0';
      refsLockCard.style.transform = 'scale(0.95)';
      setTimeout(() => {
        refsLockCard.style.display = 'none';
        refsProtectedContent.style.display = 'block';
        refsProtectedContent.classList.add('refs-unlocked-animate');
        renderReferences(); // Populate references grid dynamically
      }, 300);
    } else {
      refsLockCard.style.display = 'none';
      refsProtectedContent.style.display = 'block';
      renderReferences();
    }

    // Dynamic Header Lock Icon change to unlocked Turquesa state
    if (refsHeaderLockIcon) {
      refsHeaderLockIcon.className = 'fa-solid fa-lock-open';
      refsHeaderLockIcon.style.color = 'var(--accent-cyan)';
    }

    // Persist unlock state for the current session to avoid annoying re-prompts
    sessionStorage.setItem('refs_unlocked', 'true');
  }

  function verifyPassword() {
    const password = refsPasswordInput.value.trim();
    const lang = document.documentElement.getAttribute('lang') || 'es';
    if (password === 'nubeclan') {
      unlockReferences(true);
    } else {
      // Wrong password: trigger shake animation and error feedback
      refsErrorMsg.innerHTML = lang === 'en' 
        ? '<i class="fa-solid fa-triangle-exclamation"></i> Incorrect password. Try again.'
        : '<i class="fa-solid fa-triangle-exclamation"></i> Clave incorrecta. Inténtalo de nuevo.';
      refsErrorMsg.style.display = 'flex';
      refsLockInputGroup.classList.add('shake-animation');
      refsPasswordInput.focus();
      refsPasswordInput.select();
      
      // Clean up animation class after complete iteration
      setTimeout(() => {
        refsLockInputGroup.classList.remove('shake-animation');
      }, 500);
    }
  }

  // Bind Unlock Button Click
  if (refsUnlockBtn) {
    refsUnlockBtn.addEventListener('click', verifyPassword);
  }

  // Bind Enter Key press inside password input
  if (refsPasswordInput) {
    refsPasswordInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        verifyPassword();
      }
    });
  }

  // Check if references were already unlocked in the current session
  if (sessionStorage.getItem('refs_unlocked') === 'true') {
    unlockReferences(false);
  }


  /* ==========================================================================
     7. CONTACT FORM INTERACTIVE SUBMISSION MODAL
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const successModal = document.getElementById('success-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('form-name').value;
    const email = document.getElementById('form-email').value;
    const subject = document.getElementById('form-subject').value;
    const message = document.getElementById('form-message').value;

    // Construct formatted WhatsApp message
    const lang = document.documentElement.getAttribute('lang') || 'es';
    const msgHeader = lang === 'en' ? '*New contact from your Web Portfolio*' : '*Nuevo contacto desde tu Portafolio Web*';
    const labelName = lang === 'en' ? 'Name' : 'Nombre';
    const labelEmail = lang === 'en' ? 'Email' : 'Email';
    const labelSubject = lang === 'en' ? 'Subject' : 'Asunto';
    const labelMessage = lang === 'en' ? 'Message' : 'Mensaje';

    const formattedText = `${msgHeader}\n\n` +
                          `👤 *${labelName}:* ${name}\n` +
                          `✉️ *${labelEmail}:* ${email}\n` +
                          `📋 *${labelSubject}:* ${subject}\n\n` +
                          `💬 *${labelMessage}:*\n${message}`;

    const encodedText = encodeURIComponent(formattedText);
    const whatsappUrl = `https://wa.me/59133264587?text=${encodedText}`;

    // Open WhatsApp in a new window or tab
    window.open(whatsappUrl, '_blank');

    // Open success modal
    successModal.classList.add('active');
    
    // Reset Form
    contactForm.reset();
  });

  // Close modal
  modalCloseBtn.addEventListener('click', () => {
    successModal.classList.remove('active');
  });

  // Close modal clicking outside
  successModal.addEventListener('click', (e) => {
    if (e.target === successModal) {
      successModal.classList.remove('active');
    }
  });

  /* ==========================================================================
     8. EXPERIENCE TIMELINE ACCORDION INTERACTIVES
     ========================================================================== */
  const timelineCards = document.querySelectorAll('.timeline-card');

  timelineCards.forEach((card, index) => {
    const header = card.querySelector('.timeline-card-header');

    // Create and append the dynamic chevron icon
    const chevron = document.createElement('div');
    chevron.className = 'accordion-chevron';
    chevron.innerHTML = '<i class="fa-solid fa-chevron-down"></i>';
    header.appendChild(chevron);

    // Expand the first card by default so users instantly see it is interactive
    if (index === 0) {
      card.classList.add('expanded');
    }

    // Bind click listener for toggling the accordion
    card.addEventListener('click', (e) => {
      // Safe check for timeline-details ancestor to support absolutely all mobile web engines
      let target = e.target;
      while (target && target !== card) {
        if (target.classList && target.classList.contains('timeline-details')) {
          return; // Clicking inside detail block does not collapse the card
        }
        target = target.parentNode;
      }
      card.classList.toggle('expanded');
    });
  });

  /* ==========================================================================
     9. LANGUAGE SWITCHER LOGIC
     ========================================================================== */
  const langPillItems = document.querySelectorAll('.lang-pill-item');
  
  function setLanguage(lang) {
    document.documentElement.setAttribute('lang', lang);
    localStorage.setItem('cv_lang', lang);
    
    // Update active state in UI pills
    langPillItems.forEach(item => {
      if (item.getAttribute('data-lang') === lang) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Update placeholders for inputs
    const inputsToTranslate = document.querySelectorAll('[data-placeholder-es]');
    inputsToTranslate.forEach(input => {
      const placeholder = lang === 'en' ? input.getAttribute('data-placeholder-en') : input.getAttribute('data-placeholder-es');
      input.setAttribute('placeholder', placeholder);
    });

    // Update titles for elements (like back-to-top button)
    const elementsWithTitle = document.querySelectorAll('[data-title-es]');
    elementsWithTitle.forEach(el => {
      const titleText = lang === 'en' ? el.getAttribute('data-title-en') : el.getAttribute('data-title-es');
      el.setAttribute('title', titleText);
    });

    // Update document title and description meta tag
    if (lang === 'en') {
      document.title = "Angel Céspedes Quiroz | Professional Portfolio";
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', "Professional portfolio of Angel Céspedes Quiroz - Computer Engineer and Expert in Software Solutions Management and Digital Channels.");
    } else {
      document.title = "Angel Céspedes Quiroz | Portafolio Profesional";
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', "Portafolio profesional de Angel Céspedes Quiroz - Ingeniero Informático y Experto en Dirección de Soluciones de Software y Canales Digitales.");
    }

    // Re-render components that rely on language
    renderCertifications();
    
    // Only render references if they are unlocked
    const refsProtectedContent = document.getElementById('refs-protected-content');
    if (refsProtectedContent && refsProtectedContent.style.display === 'block') {
      renderReferences();
    }
  }

  // Bind click handlers to language pill items
  langPillItems.forEach(item => {
    item.addEventListener('click', () => {
      const selectedLang = item.getAttribute('data-lang');
      setLanguage(selectedLang);
    });
  });

  // Initialize language from localStorage or browser settings
  const savedLang = localStorage.getItem('cv_lang') || 
                    (navigator.language.startsWith('en') ? 'en' : 'es');
  setLanguage(savedLang);

});
