/**
 * RC Elevators & Escalators - Main JavaScript
 * Handles all interactive features and functionality
 */

// ==================== Email JS Initialization ====================
// Initialize Email JS with your public key
emailjs.init('ELTV5M97dEJdhrbEE');

// ==================== Initialization ====================
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  setupEventListeners();
  setupScrollAnimations();
  setupFormValidation();
  validateMinDate();
}

// ==================== Event Listeners ====================
function setupEventListeners() {
  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('#mobile-menu a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // Contact form submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactSubmit);
  }

  // Booking form submission
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', handleBookingSubmit);
  }

  // Modal background click
  const bookingModal = document.getElementById('bookingModal');
  if (bookingModal) {
    bookingModal.addEventListener('click', (e) => {
      if (e.target.id === 'bookingModal') {
        closeBookingModal();
      }
    });
  }

  // Close modal on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeBookingModal();
    }
  });
}

// ==================== Scroll Animations ====================
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-up');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with animation classes
  document.querySelectorAll('.service-card, .stat-card, h2, h3').forEach(el => {
    observer.observe(el);
  });
}

// ==================== Form Handling ====================
function setupFormValidation() {
  // Add real-time validation
  document.querySelectorAll('input[type="email"]').forEach(input => {
    input.addEventListener('blur', validateEmail);
  });

  document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('blur', validatePhone);
  });

  document.querySelectorAll('textarea').forEach(textarea => {
    textarea.addEventListener('input', validateTextarea);
  });
}

function validateEmail(e) {
  const email = e.target.value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (email && !emailRegex.test(email)) {
    e.target.style.borderColor = '#ff6b6b';
  } else {
    e.target.style.borderColor = '';
  }
}

function validatePhone(e) {
  const phone = e.target.value;
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
  
  if (phone && !phoneRegex.test(phone)) {
    e.target.style.borderColor = '#ff6b6b';
  } else {
    e.target.style.borderColor = '';
  }
}

function validateTextarea(e) {
  if (e.target.value.length > 500) {
    e.target.value = e.target.value.substring(0, 500);
  }
}

function validateMinDate() {
  const dateInput = document.querySelector('input[type="date"]');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }
}

// ==================== Contact Form ====================
function handleContactSubmit(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone-input').value.trim();
  const message = document.getElementById('message').value.trim();

  // Validation
  if (!name || !phone || !message) {
    showMessage('Please fill in all fields', 'error');
    return;
  }

  // Prepare data for Email JS
  const templateParams = {
    from_name: name,
    from_phone: phone,
    message: message,
    to_email: 'mani1311491998@gmail.com'
  };

  // Send email using Email JS
  emailjs.send('service_sne0y2h', 'template_io2sl2v', templateParams)
    .then(function(response) {
      console.log('Email sent successfully:', response);
      
      // Show success
      const successEl = document.getElementById('form-success');
      if (successEl) {
        successEl.classList.remove('hidden');
        document.getElementById('contact-form').reset();
        
        setTimeout(() => {
          successEl.classList.add('hidden');
        }, 4000);
      }
    }, function(error) {
      console.error('Email send failed:', error);
      showMessage('Failed to send message. Please try again later.', 'error');
    });
}

// ==================== Booking Modal ====================
function openBookingModal() {
  const modal = document.getElementById('bookingModal');
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    lucide.createIcons();
  }
}

function closeBookingModal() {
  const modal = document.getElementById('bookingModal');
  const form = document.getElementById('bookingForm');
  
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }
  
  if (form) {
    form.reset();
    document.getElementById('bookingSuccess').classList.add('hidden');
    document.getElementById('bookingError').classList.add('hidden');
  }
}

// ==================== Booking Form ====================
function handleBookingSubmit(e) {
  e.preventDefault();

  // Get form data
  const formData = new FormData(this);
  const data = {
    name: formData.get('name'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    service: formData.get('service'),
    date: formData.get('date'),
    time: formData.get('time'),
    building: formData.get('building'),
    notes: formData.get('notes'),
    timestamp: new Date().toISOString()
  };

  // Validation
  if (!data.name || !data.phone || !data.email || !data.service || !data.date || !data.time) {
    showBookingError('Please fill in all required fields');
    return;
  }

  // Prepare data for Email JS
  const templateParams = {
    to_email: 'kedarisettimanikanta@gmail.com',
    from_name: data.name,
    from_phone: data.phone,
    from_email: data.email,
    service_type: data.service,
    appointment_date: data.date,
    appointment_time: data.time,
    building_name: data.building,
    additional_notes: data.notes || 'No additional notes'
  };

  // Send email using Email JS
  emailjs.send('service_sne0y2h', 'template_llcr0s8', templateParams)
    .then(function(response) {
      console.log('Booking email sent successfully:', response);
      
      // Show success
      document.getElementById('bookingError').classList.add('hidden');
      document.getElementById('bookingSuccess').classList.remove('hidden');

      // Close modal after delay
      setTimeout(() => {
        closeBookingModal();
      }, 2000);
    }, function(error) {
      console.error('Booking email send failed:', error);
      showBookingError('Failed to book appointment. Please try again.');
    });
}

function showBookingError(message) {
  const errorEl = document.getElementById('bookingError');
  if (errorEl) {
    errorEl.textContent = '⚠ ' + message;
    errorEl.classList.remove('hidden');
  }
}

// ==================== Utility Functions ====================
function showMessage(message, type = 'success') {
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type}`;
  alertDiv.textContent = message;
  alertDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 16px 24px;
    border-radius: 8px;
    background-color: ${type === 'success' ? '#4caf50' : '#f44336'};
    color: white;
    z-index: 10000;
    animation: slideInRight 0.3s ease;
  `;

  document.body.appendChild(alertDiv);

  setTimeout(() => {
    alertDiv.remove();
  }, 4000);
}

// ==================== Smooth Scroll ====================
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        // Get the scrollable container (the #app div)
        const appContainer = document.getElementById('app');
        
        if (appContainer) {
          // Scroll within the container
          const navHeight = 80;
          const containerRect = appContainer.getBoundingClientRect();
          const targetRect = target.getBoundingClientRect();
          
          // Calculate the scroll position relative to the container
          const scrollTop = appContainer.scrollTop + targetRect.top - containerRect.top - navHeight;
          
          appContainer.scrollTo({
            top: scrollTop,
            behavior: 'smooth'
          });
        } else {
          // Fallback to window scroll if container not found
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
}

// Initialize smooth scroll when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupSmoothScroll);
} else {
  setupSmoothScroll();
}

// ==================== Navbar Scroll Effect ====================
let lastScroll = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (nav) {
    if (currentScroll > lastScroll) {
      // Scrolling down
      nav.style.transform = 'translateY(-100%)';
    } else {
      // Scrolling up
      nav.style.transform = 'translateY(0)';
    }
  }

  lastScroll = currentScroll;
});

// Reset navbar transform on scroll stop
let scrollTimeout;
window.addEventListener('scroll', () => {
  clearTimeout(scrollTimeout);
  
  if (nav) {
    nav.style.transition = 'transform 0.3s ease';
  }

  scrollTimeout = setTimeout(() => {
    if (nav) {
      nav.style.transition = 'none';
    }
  }, 150);
}, false);

// ==================== Performance Monitoring ====================
function logPerformanceMetrics() {
  window.addEventListener('load', () => {
    const perfData = performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    
    console.log('Page Load Time:', pageLoadTime + 'ms');
    console.log('DOM Content Loaded:', perfData.domContentLoadedEventEnd - perfData.navigationStart + 'ms');
  });
}

logPerformanceMetrics();

// ==================== Development Mode ====================
// Uncomment to view stored appointments in console
window.viewAppointments = function() {
  const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
  console.table(appointments);
  return appointments;
};

// Uncomment to clear all appointments
window.clearAppointments = function() {
  localStorage.removeItem('appointments');
  console.log('All appointments cleared');
};

// Uncomment to export appointments as CSV
window.exportAppointments = function() {
  const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
  if (appointments.length === 0) {
    console.log('No appointments to export');
    return;
  }

  let csv = 'Name,Phone,Email,Service,Date,Time,Building,Notes,Timestamp\n';
  appointments.forEach(apt => {
    csv += `"${apt.name}","${apt.phone}","${apt.email}","${apt.service}","${apt.date}","${apt.time}","${apt.building}","${apt.notes}","${apt.timestamp}"\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'appointments.csv';
  a.click();
  window.URL.revokeObjectURL(url);
};

console.log('%cRC Elevators & Escalators', 'color: #d4a853; font-size: 20px; font-weight: bold;');
console.log('%cUse viewAppointments(), clearAppointments(), or exportAppointments() for data management', 'color: #a0b4c8;');
