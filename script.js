const menuButton = document.getElementById('menu-button');

menuButton.addEventListener('click', () => {
    const menuSection = document.getElementById('menu');
    menuSection.scrollIntoView({behavior: 'smooth'});
})

// === ИГРА "ПОЙМАЙ КОТИКА" ===

// Переменные игры
let gameActive = false;
let score = 0;
let timeLeft = 30;
let catTimer;
let gameTimer;

// Элементы DOM
const cat = document.getElementById('cat');
const scoreValue = document.getElementById('score-value');
const timeValue = document.getElementById('time-value');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const gameOver = document.getElementById('game-over');
const finalScore = document.getElementById('final-score');
const gameContainer = document.getElementById('game-container');

// Функция начала игры
function startGame() {
    gameActive = true;
    score = 0;
    timeLeft = 30;
    
    // Скрываем кнопку старта
    startBtn.style.display = 'none';
    gameOver.classList.add('hidden');
    
    // Обновляем счетчики
    updateScore();
    updateTimer();
    
    // Показываем первого котика
    showCat();
    
    // Запускаем таймер игры
    gameTimer = setInterval(() => {
        timeLeft--;
        updateTimer();
        
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

// Функция показа котика
function showCat() {
    if (!gameActive) return;
    
    // Случайная позиция котика
    const containerWidth = gameContainer.offsetWidth;
    const containerHeight = gameContainer.offsetHeight;
    const catSize = 80;
    
    const maxX = containerWidth - catSize;
    const maxY = containerHeight - catSize;
    
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    // Позиционируем котика
    cat.style.left = randomX + 'px';
    cat.style.top = randomY + 'px';
    cat.style.display = 'block';
    
    // Добавляем анимацию появления
    cat.classList.add('appear');
    
    // Убираем анимацию через 0.5 секунды
    setTimeout(() => {
        cat.classList.remove('appear');
    }, 500);
    
    // Котик исчезает через 1.5 секунды, если не поймали
    catTimer = setTimeout(() => {
        hideCat();
        showCat(); // Показываем нового котика
    }, 1700);
}

// Функция скрытия котика
function hideCat() {
    cat.style.display = 'none';
    clearTimeout(catTimer);
}

// Функция клика по котику
function catchCat() {
    if (!gameActive) return;
    
    // Увеличиваем счет
    score++;
    updateScore();
    
    // Анимация поимки
    cat.classList.add('caught');
    
    // Скрываем котика и показываем нового
    setTimeout(() => {
        cat.classList.remove('caught');
        hideCat();
        showCat();
    }, 300);
    
    clearTimeout(catTimer);
}

// Функция обновления счета
function updateScore() {
    scoreValue.textContent = score;
}

// Функция обновления таймера
function updateTimer() {
    timeValue.textContent = timeLeft;
}

// Функция окончания игры
function endGame() {
    gameActive = false;
    clearInterval(gameTimer);
    clearTimeout(catTimer);
    
    // Скрываем котика
    hideCat();
    
    // Показываем результат
    finalScore.textContent = score;
    gameOver.classList.remove('hidden');
}

// Функция перезапуска игры
function restartGame() {
    startGame();
}

// Обработчики событий
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', restartGame);
cat.addEventListener('click', catchCat);

// Инициализация - скрываем котика
cat.style.display = 'none';




