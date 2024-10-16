// Функция для авторизации
const authenticate = () => {
    const username = document.querySelector('input[name="username"]').value;
    const password = document.querySelector('input[name="password"]').value;

    if (username === 'sneza' && password === '555') {
        localStorage.setItem('authenticated', 'true');

        // Скрыть форму входа и показать контент админки
        document.querySelector('.main').style.display = 'none';
        document.getElementById('admin-content').style.display = 'block';

        document.querySelector('input[name="username"]').classList.remove('invalid');
        document.querySelector('input[name="password"]').classList.remove('invalid');

        const firstItem = document.querySelector('#navigation li');
        if (firstItem) {
            setActive(firstItem); 
        }
    } else {
        document.querySelector('input[name="username"]').classList.add('invalid');
        document.querySelector('input[name="password"]').classList.add('invalid');
    }
};


// активный элемент и линия
const setActive = (element) => {
    const items = document.querySelectorAll('#navigation li');
    items.forEach(item => item.classList.remove('active'));

    element.classList.add('active');

    const rect = element.getBoundingClientRect();
    const underline = document.querySelector('.underline');
    underline.style.width = `${rect.width}px`; // Устанавливаем ширину линии
    underline.style.left = `${rect.left - document.getElementById('navigation').getBoundingClientRect().left}px`; // Позиционируем линию
};

// вход
const logout = () => {
    // Удаляем данные авторизации из localStorage
    localStorage.removeItem('authenticated');

    // Показываем форму входа и скрываем админский контент
    document.querySelector('.main').style.display = 'block';
    document.getElementById('admin-content').style.display = 'none';

    const items = document.querySelectorAll('#navigation li');
    items.forEach(item => item.classList.remove('active'));

    const underline = document.querySelector('.underline');
    underline.style.width = '0';
    underline.style.left = '0';
};


// переключатель
const showSection = (sectionId, element) => {
    // Переключаем видимые разделы
    const sections = document.querySelectorAll('.tab-content');
    sections.forEach(section => section.style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';

    // Устанавливаем активный элемент и обновляем линию
    setActive(element);
};

// Проверка авторизации при загрузке страницы
window.addEventListener('load', () => {
    const isAuthenticated = localStorage.getItem('authenticated');
    
    if (isAuthenticated === 'true') {
        // скрыть форму показать админку
        document.querySelector('.main').style.display = 'none';
        document.getElementById('admin-content').style.display = 'block';
    } else {
        // наоборот
        document.querySelector('.main').style.display = 'block';
        document.getElementById('admin-content').style.display = 'none';
    }

    // линия
    const activeItem = document.querySelector('#navigation li.active');
    if (activeItem) {
        setActive(activeItem);
    }
});
