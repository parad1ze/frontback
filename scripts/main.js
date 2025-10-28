// Фильтрация проектов
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация фильтра проектов
    initProjectFilter();
    
    // Инициализация модального окна
    initModal();
    
    // Инициализация формы контактов
    initContactForm();
    
    // Инициализация кнопки добавления записи
    initAddEntryButton();
});

// Фильтрация проектов
function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Обновляем активную кнопку
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Фильтруем проекты
                projectCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
}

// Модальное окно для проектов
function initModal() {
    const modal = document.getElementById('project-modal');
    const projectCards = document.querySelectorAll('.project-card');
    const closeModal = document.querySelector('.close-modal');
    
    if (modal && projectCards.length > 0) {
        // Данные для модального окна
        const projectData = {
            'Личный сайт': {
                title: 'Личный сайт',
                description: 'Полностью адаптивный веб-сайт, разработанный с использованием современных технологий HTML5 и CSS3. Включает в себя семантическую разметку, flexbox/grid layout, анимации и оптимизацию для различных устройств.',
                image: 'Личный сайт',
                live: '#',
                code: '#'
            },
            'Todo-приложение': {
                title: 'Todo-приложение',
                description: 'Интерактивное приложение для управления задачами на чистом JavaScript. Функциональность включает добавление, редактирование, удаление задач, фильтрацию и локальное сохранение данных.',
                image: 'Todo-приложение',
                live: '#',
                code: '#'
            },
            'Интернет-магазин': {
                title: 'Интернет-магазин',
                description: 'Прототип интернет-магазина с использованием React.js. Реализованы основные функции: каталог товаров, корзина, фильтрация, управление состоянием приложения.',
                image: 'Интернет-магазин',
                live: '#',
                code: '#'
            },
            'Портфолио': {
                title: 'Портфолио',
                description: 'Адаптивное портфолио с использованием Bootstrap 5. Включает современный дизайн, модальные окна, карусели и оптимизацию для мобильных устройств.',
                image: 'Портфолио',
                live: '#',
                code: '#'
            }
        };
        
        // Открытие модального окна при клике на карточку
        projectCards.forEach(card => {
            card.addEventListener('click', function() {
                const projectTitle = this.querySelector('h3').textContent;
                const data = projectData[projectTitle];
                
                if (data) {
                    document.getElementById('modal-title').textContent = data.title;
                    document.getElementById('modal-image').textContent = data.image;
                    document.getElementById('modal-description').textContent = data.description;
                    document.getElementById('modal-live').href = data.live;
                    document.getElementById('modal-code').href = data.code;
                    
                    modal.style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                }
            });
        });
        
        // Закрытие модального окна
        if (closeModal) {
            closeModal.addEventListener('click', function() {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }
        
        // Закрытие при клике вне модального окна
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        // Закрытие по ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
}

// Форма контактов
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Валидация формы
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !message) {
                alert('Пожалуйста, заполните все обязательные поля');
                return;
            }
            
            if (!isValidEmail(email)) {
                alert('Пожалуйста, введите корректный email адрес');
                return;
            }
            
            // Имитация отправки формы
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Отправка...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Сообщение успешно отправлено!');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// Валидация email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Кнопка добавления записи в дневник
function initAddEntryButton() {
    const addEntryBtn = document.getElementById('add-entry-btn');
    
    if (addEntryBtn) {
        addEntryBtn.addEventListener('click', function() {
            const entryText = prompt('Введите текст новой записи:');
            
            if (entryText) {
                const diaryEntries = document.querySelector('.diary-entries');
                const currentDate = new Date().toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'short'
                });
                
                const newEntry = document.createElement('li');
                newEntry.className = 'diary-entry';
                newEntry.innerHTML = `
                    <div class="entry-date">${currentDate}</div>
                    <div>${entryText} <span class="entry-status status-in-progress">in progress</span></div>
                `;
                
                diaryEntries.insertBefore(newEntry, diaryEntries.firstChild);
                
                // Анимация появления
                newEntry.style.opacity = '0';
                newEntry.style.transform = 'translateX(-20px)';
                
                setTimeout(() => {
                    newEntry.style.transition = 'all 0.3s ease';
                    newEntry.style.opacity = '1';
                    newEntry.style.transform = 'translateX(0)';
                }, 50);
            }
        });
    }
}

// Плавная прокрутка для навигации
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Анимация появления элементов при скролле
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    document.querySelectorAll('.project-card, .skill-item, .diary-entry').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Инициализация анимаций при загрузке
window.addEventListener('load', initScrollAnimations);