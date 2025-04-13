const tasks = {
    tired: [
        { task: "Take a quick power nap for 10-20 minutes to recharge.", followUp: "Did that nap help you feel more energized?" },
        { task: "Drink a glass of water to rehydrate and boost your energy.", followUp: "Do you feel more awake now?" },
        { task: "Listen to an upbeat song to lift your spirits.", followUp: "Did the music help energize you?" }
    ],
    stressed: [
        { task: "Try a 1-minute breathing exercise: inhale for 4 seconds, hold for 4, exhale for 4.", followUp: "Do you feel calmer now?" },
        { task: "Write down 3 things you're grateful for to shift your focus.", followUp: "Did this help you feel more grounded?" },
        { task: "Take a 5-minute walk to clear your mind.", followUp: "Did the walk help reduce your stress?" }
    ],
    bored: [
        { task: "Doodle or sketch something fun for a minute.", followUp: "Did that spark some creativity?" },
        { task: "Watch a funny 1-minute video to entertain yourself.", followUp: "Did that make you smile?" },
        { task: "Try a quick brain teaser or riddle to engage your mind.", followUp: "Did that help you feel more engaged?" }
    ],
    excited: [
        { task: "Share your excitement with a friend or write it down!", followUp: "Did sharing amplify your excitement?" },
        { task: "Set a small goal to channel your energy into something productive.", followUp: "Did that help you focus your excitement?" }
    ],
    sad: [
        { task: "Listen to a comforting song that resonates with you.", followUp: "Did the music help lift your spirits?" },
        { task: "Write down something you’re looking forward to.", followUp: "Did that give you a bit of hope?" },
        { task: "Give yourself a big hug and take a few deep breaths.", followUp: "Did that make you feel a bit better?" }
    ],
    angry: [
        { task: "Take 10 slow, deep breaths to calm your mind.", followUp: "Do you feel less angry now?" },
        { task: "Write down what’s making you angry, then tear up the paper.", followUp: "Did that help release some anger?" },
        { task: "Punch a pillow for 30 seconds to let out your frustration.", followUp: "Did that help you feel more relaxed?" }
    ],
    happy: [
        { task: "Share your happiness with someone by sending a kind message.", followUp: "Did that make you feel even happier?" },
        { task: "Write down this moment so you can remember it later.", followUp: "Did that help you savor the happiness?" }
    ],
    confused: [
        { task: "Take a moment to write down what’s confusing you to clarify your thoughts.", followUp: "Did that help clear your mind?" },
        { task: "Take 5 deep breaths to center yourself and reduce overwhelm.", followUp: "Do you feel more focused now?" },
        { task: "Break down your problem into smaller steps to tackle one at a time.", followUp: "Did that make things feel more manageable?" }
    ]
};

let currentMood = null;

function selectMood(mood) {
    currentMood = mood;
    const buttons = document.querySelectorAll('#mood-buttons button');
    buttons.forEach(button => button.classList.remove('selected'));
    const selectedButton = Array.from(buttons).find(button => button.textContent.toLowerCase().includes(mood));
    if (selectedButton) selectedButton.classList.add('selected');
    showTask();
}

function showTask() {
    if (!currentMood) return;
    const taskList = tasks[currentMood];
    const randomTask = taskList[Math.floor(Math.random() * taskList.length)];
    const emoji = document.querySelector(`#mood-buttons button.selected .mood-icon`).textContent;
    document.getElementById('result').innerHTML = `
        <div class="chat-bubble">
            <div class="task-header">
                <span class="mood-emoji">${emoji}</span>
                <h3>${currentMood.charAt(0).toUpperCase() + currentMood.slice(1)}</h3>
            </div>
            <p class="task-text">${randomTask.task}</p>
            <p class="follow-up-question">${randomTask.followUp}</p>
            <div class="task-buttons">
                <button class="favorite-button" onclick="favoriteTask(this)"><span class="heart-icon">❤️</span>Favorite</button>
                <button class="new-task-button" onclick="showTask(); gtag('event', 'New Task Request', { 'event_category': 'Task', 'event_label': '${currentMood}' });">New Task</button>
            </div>
        </div>
    `;
}

function favoriteTask(button) {
    button.style.backgroundColor = '#ff4f41';
    button.style.color = '#fff';
    gtag('event', 'Favorite Task', { 'event_category': 'Task', 'event_label': currentMood });
}

const clickSound = document.getElementById('click-sound');
const successSound = document.getElementById('success-sound');
const punchSound = document.getElementById('punch-sound');
const shredSound = document.getElementById('shred-sound');
const natureSounds = {
    nature: document.getElementById('nature-sound'),
    rain: document.getElementById('rain-sound'),
    waves: document.getElementById('waves-sound')
};
const asmrSounds = {
    tapping: document.getElementById('tapping-sound'),
    whispering: document.getElementById('whispering-sound'),
    brushing: document.getElementById('brushing-sound')
};
let currentSound = null;

function playSound(sound, volume = 0.5) {
    sound.volume = volume;
    sound.currentTime = 0;
    sound.play().catch(err => console.error('Sound playback failed:', err));
}

function openPopup(tool) {
    playSound(clickSound, 0.3);
    const popup = document.getElementById(`${tool}-popup`);
    popup.style.display = 'flex';
    if (tool === 'breathing') startBreathing();
    if (tool === 'soundscape') startSoundscape();
    if (tool === 'punching') startPunching();
    if (tool === 'stretch') startStretch();
    if (tool === 'doodle') startDoodle();
    if (tool === 'stressball') startStressBall();
    if (tool === 'worry') startWorry();
    if (tool === 'color') startColorFocus();
    if (tool === 'sudoku') startSudoku();
    if (tool === 'moodflinger') startMoodFlinger();
    if (tool === 'asmr') startASMR();
    if (tool === 'gratitude') startGratitude();
    if (tool === 'stressjar') startStressJar();
    if (tool === 'moodquest') startMoodQuest();
    gtag('event', 'Tool Opened', { 'event_category': 'Tool', 'event_label': tool });
}

function closePopup(tool) {
    const popup = document.getElementById(`${tool}-popup`);
    popup.style.display = 'none';
    if (tool === 'breathing') clearInterval(window.breathingInterval);
    if (tool === 'soundscape') {
        clearInterval(window.soundscapeInterval);
        if (currentSound) currentSound.pause();
    }
    if (tool === 'punching') clearInterval(window.punchingInterval);
    if (tool === 'stretch') clearInterval(window.stretchInterval);
    if (tool === 'doodle') clearInterval(window.doodleInterval);
    if (tool === 'stressball') clearInterval(window.stressballInterval);
    if (tool === 'worry') {
        document.getElementById('worry-text').value = '';
        document.getElementById('paper-strips-container').innerHTML = '';
    }
    if (tool === 'color') clearInterval(window.colorInterval);
    if (tool === 'sudoku') {
        document.getElementById('sudoku-grid').innerHTML = '';
        document.getElementById('check-solution').style.display = 'none';
    }
    if (tool === 'moodflinger') clearInterval(window.moodflingerInterval);
    if (tool === 'asmr') {
        clearInterval(window.asmrInterval);
        if (currentSound) currentSound.pause();
    }
    if (tool === 'gratitude') document.getElementById('gratitude-text').value = '';
    if (tool === 'stressjar') {
        clearInterval(window.stressjarInterval);
        document.getElementById('stressjar-text').value = '';
        document.getElementById('stressjar-container').innerHTML = '';
    }
    if (tool === 'moodquest') {
        clearInterval(window.moodquestInterval);
        document.getElementById('quest-goal').value = '';
        document.getElementById('quest-steps').innerHTML = '';
        document.getElementById('quest-progress-map').innerHTML = '';
    }
}

function updateProgress(elementId, total, current) {
    const progressBar = document.getElementById(elementId);
    const percentage = ((total - current) / total) * 100;
    progressBar.style.width = percentage + '%';
}

function startBreathing() {
    let time = 60;
    let step = 0;
    const steps = [
        { text: "Inhale", instruction: "Breathe in slowly through your nose...", class: "inhale" },
        { text: "Hold", instruction: "Hold your breath...", class: "hold" },
        { text: "Exhale", instruction: "Breathe out slowly through your mouth...", class: "exhale" }
    ];
    const stepElement = document.getElementById('breathing-step');
    const instructionElement = document.getElementById('breathing-instruction');
    const timerElement = document.getElementById('breathing-timer');
    const circle = document.getElementById('breathing-circle');
    circle.className = '';
    updateProgress('breathing-progress', 60, 0);
    function updateBreathing() {
        if (time % 4 === 0) {
            step = (step % 3);
            stepElement.textContent = steps[step].text;
            instructionElement.textContent = steps[step].instruction;
            circle.className = steps[step].class;
            step++;
        }
        time--;
        timerElement.textContent = `Time remaining: ${time}s`;
        updateProgress('breathing-progress', 60, time);
        if (time <= 0) {
            clearInterval(window.breathingInterval);
            playSound(successSound, 0.4);
            setTimeout(() => closePopup('breathing'), 1500);
        }
    }
    updateBreathing();
    window.breathingInterval = setInterval(updateBreathing, 1000);
}

function startSoundscape() {
    let time = 90;
    const timerElement = document.getElementById('soundscape-timer');
    const selectElement = document.getElementById('soundscape-select');
    const playButton = document.getElementById('play-btn');
    const volumeSlider = document.getElementById('volume-slider');
    updateProgress('soundscape-progress', 90, 0);
    playButton.innerHTML = '<i class="fas fa-play"></i>';
    selectElement.onchange = function() {
        if (currentSound) {
            currentSound.pause();
            currentSound.currentTime = 0;
            playButton.innerHTML = '<i class="fas fa-play"></i>';
        }
    };
    playButton.onclick = function() {
        const soundType = selectElement.value;
        if (currentSound && currentSound !== natureSounds[soundType]) {
            currentSound.pause();
            currentSound.currentTime = 0;
        }
        currentSound = natureSounds[soundType];
        if (currentSound.paused) {
            currentSound.play().then(() => {
                currentSound.volume = volumeSlider.value;
                playButton.innerHTML = '<i class="fas fa-pause"></i>';
            }).catch(err => console.error('Sound playback failed:', err));
        } else {
            currentSound.pause();
            currentSound.currentTime = 0;
            playButton.innerHTML = '<i class="fas fa-play"></i>';
        }
    };
    volumeSlider.oninput = function() {
        if (currentSound) currentSound.volume = this.value;
    };
    window.soundscapeInterval = setInterval(() => {
        time--;
        timerElement.textContent = `Time remaining: ${time}s`;
        updateProgress('soundscape-progress', 90, time);
        if (time <= 0) {
            clearInterval(window.soundscapeInterval);
            if (currentSound) currentSound.pause();
            playSound(successSound, 0.4);
            setTimeout(() => closePopup('soundscape'), 1500);
        }
    }, 1000);
}

function startPunching() {
    let time = 30;
    let count = 0;
    const bag = document.getElementById('punching-bag');
    const timerElement = document.getElementById('punching-timer');
    bag.textContent = '0';
    bag.style.transform = 'scale(1)';
    updateProgress('punching-progress', 30, 0);
    bag.onclick = () => {
        count++;
        bag.textContent = count;
        playSound(punchSound, 0.3);
        bag.style.transform = 'scale(0.9)';
        setTimeout(() => bag.style.transform = 'scale(1)', 100);
    };
    window.punchingInterval = setInterval(() => {
        time--;
        timerElement.textContent = `Time remaining: ${time}s`;
        updateProgress('punching-progress', 30, time);
        if (time <= 0) {
            clearInterval(window.punchingInterval);
            playSound(successSound, 0.4);
            bag.innerHTML = `Great job! ${count} punches!`;
            setTimeout(() => closePopup('punching'), 1500);
        }
    }, 1000);
}

function startStretch() {
    let time = 60;
    const stretches = [
        "Reach up high for 10 seconds.",
        "Touch your toes for 10 seconds.",
        "Stretch your arms behind your back.",
        "Rotate your shoulders slowly."
    ];
    const stretchElement = document.getElementById('stretch-prompt');
    const timerElement = document.getElementById('stretch-timer');
    stretchElement.textContent = stretches[Math.floor(Math.random() * stretches.length)];
    updateProgress('stretch-progress', 60, 0);
    window.stretchInterval = setInterval(() => {
        time--;
        timerElement.textContent = `Time remaining: ${time}s`;
        updateProgress('stretch-progress', 60, time);
        if (time <= 0) {
            clearInterval(window.stretchInterval);
            playSound(successSound, 0.4);
            setTimeout(() => closePopup('stretch'), 1500);
        }
    }, 1000);
}

function startDoodle() {
    let time = 90;
    const canvas = document.getElementById('doodle-canvas');
    const ctx = canvas.getContext('2d');
    const timerElement = document.getElementById('doodle-timer');
    const colorPicker = document.getElementById('color-picker');
    const brushSize = document.getElementById('brush-size');
    let isDrawing = false;
    ctx.lineCap = 'round';
    ctx.strokeStyle = colorPicker.value;
    ctx.lineWidth = brushSize.value;
    colorPicker.onchange = () => ctx.strokeStyle = colorPicker.value;
    brushSize.oninput = () => ctx.lineWidth = brushSize.value;
    canvas.onmousedown = (e) => {
        isDrawing = true;
        ctx.beginPath();
        const rect = canvas.getBoundingClientRect();
        ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    };
    canvas.onmouseup = () => isDrawing = false;
    canvas.onmousemove = (e) => {
        if (!isDrawing) return;
        const rect = canvas.getBoundingClientRect();
        ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
        ctx.stroke();
    };
    updateProgress('doodle-progress', 90, 0);
    window.doodleInterval = setInterval(() => {
        time--;
        timerElement.textContent = `Time remaining: ${time}s`;
        updateProgress('doodle-progress', 90, time);
        if (time <= 0) {
            clearInterval(window.doodleInterval);
            playSound(successSound, 0.4);
            setTimeout(() => closePopup('doodle'), 1500);
        }
    }, 1000);
}

function saveDoodle() {
    const canvas = document.getElementById('doodle-canvas');
    const link = document.createElement('a');
    link.download = 'doodle.png';
    link.href = canvas.toDataURL();
    link.click();
    playSound(successSound, 0.4);
}

function clearCanvas() {
    const canvas = document.getElementById('doodle-canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    playSound(clickSound, 0.3);
}

function clearDoodle() {
    clearCanvas(); // Alias for compatibility with index.html
}

function startStressBall() {
    let time = 30;
    let count = 0;
    const ball = document.getElementById('stress-ball');
    const timerElement = document.getElementById('stressball-timer');
    ball.textContent = '0';
    ball.style.transform = 'scale(1)';
    updateProgress('stressball-progress', 30, 0);
    ball.onclick = () => {
        count++;
        ball.textContent = count;
        playSound(punchSound, 0.3);
        ball.style.transform = 'scale(0.9)';
        setTimeout(() => ball.style.transform = 'scale(1)', 100);
    };
    window.stressballInterval = setInterval(() => {
        time--;
        timerElement.textContent = `Time remaining: ${time}s`;
        updateProgress('stressball-progress', 30, time);
        if (time <= 0) {
            clearInterval(window.stressballInterval);
            playSound(successSound, 0.4);
            ball.innerHTML = `Great job! ${count} squeezes!`;
            setTimeout(() => closePopup('stressball'), 1500);
        }
    }, 1000);
}

function startWorry() {
    const worryText = document.getElementById('worry-text');
    worryText.value = '';
}

function shredWorry() {
    const worryText = document.getElementById('worry-text');
    const container = document.getElementById('paper-strips-container');
    if (!worryText.value.trim()) {
        alert('Please enter a worry to shred.');
        return;
    }
    container.innerHTML = '';
    for (let i = 0; i < 5; i++) {
        const strip = document.createElement('div');
        strip.className = 'paper-strip';
        strip.style.left = `${i * 20}px`;
        container.appendChild(strip);
    }
    playSound(shredSound, 0.5);
    setTimeout(() => {
        worryText.value = '';
        container.innerHTML = '';
        playSound(successSound, 0.4);
        alert('Worry shredded!');
    }, 1000);
}

function startColorFocus() {
    let time = 60;
    const colors = ['#ff6347', '#4682b4', '#32cd32'];
    const colorSquare = document.getElementById('color-square');
    const colorPrompt = document.getElementById('color-prompt');
    const timerElement = document.getElementById('color-timer');
    const selectedColor = colors[Math.floor(Math.random() * colors.length)];
    colorSquare.style.backgroundColor = selectedColor;
    colorPrompt.textContent = `Focus on this color...`;
    updateProgress('color-progress', 60, 0);
    window.colorInterval = setInterval(() => {
        time--;
        timerElement.textContent = `Time remaining: ${time}s`;
        updateProgress('color-progress', 60, time);
        if (time <= 0) {
            clearInterval(window.colorInterval);
            playSound(successSound, 0.4);
            setTimeout(() => closePopup('color'), 1500);
        }
    }, 1000);
}

function generateSudoku(difficulty) {
    // Initialize empty 9x9 grid
    const grid = Array(9).fill().map(() => Array(9).fill(0));

    // Fill diagonal 3x3 boxes (ensures solvability)
    for (let box = 0; box < 9; box += 3) {
        const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);
        let idx = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                grid[box + i][box + j] = nums[idx++];
            }
        }
    }

    // Solve the grid using backtracking
    function solve(grid) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (grid[row][col] === 0) {
                    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);
                    for (let num of nums) {
                        if (isValidSudoku(grid, row, col, num)) {
                            grid[row][col] = num;
                            if (solve(grid)) return true;
                            grid[row][col] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    solve(grid);

    // Copy the solved grid as the solution
    const solution = grid.map(row => [...row]);

    // Remove numbers based on difficulty
    let clues;
    switch (difficulty) {
        case 'easy':
            clues = 40; // ~49% filled
            break;
        case 'intermediate':
            clues = 30; // ~37% filled
            break;
        case 'hard':
            clues = 20; // ~25% filled
            break;
        default:
            clues = 30;
    }

    // Randomly remove numbers
    let cellsToRemove = 81 - clues;
    while (cellsToRemove > 0) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);
        if (grid[row][col] !== 0) {
            grid[row][col] = 0;
            cellsToRemove--;
        }
    }

    return { puzzle: grid, solution };
}

function isValidSudoku(grid, row, col, num) {
    // Check row
    for (let x = 0; x < 9; x++) {
        if (grid[row][x] === num) return false;
    }
    // Check column
    for (let x = 0; x < 9; x++) {
        if (grid[x][col] === num) return false;
    }
    // Check 3x3 box
    const startRow = row - (row % 3);
    const startCol = col - (col % 3);
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (grid[i + startRow][j + startCol] === num) return false;
        }
    }
    return true;
}

function startSudoku() {
    const gridElement = document.getElementById('sudoku-grid');
    const difficultySelect = document.getElementById('sudoku-difficulty');
    const checkButton = document.getElementById('check-solution');
    gridElement.innerHTML = '';
    checkButton.style.display = 'none';

    // Generate puzzle based on selected difficulty
    const difficulty = difficultySelect.value;
    const { puzzle, solution } = generateSudoku(difficulty);

    // Store solution for checking
    window.sudokuSolution = solution;

    // Render puzzle
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const input = document.createElement('input');
            input.type = 'text';
            input.maxLength = 1;
            input.value = puzzle[i][j] === 0 ? '' : puzzle[i][j];
            input.disabled = puzzle[i][j] !== 0;
            input.className = 'sudoku-cell';
            input.oninput = () => {
                if (!/^[1-9]?$/.test(input.value)) input.value = '';
                // Check if all cells are filled
                const inputs = gridElement.querySelectorAll('input');
                const allFilled = Array.from(inputs).every(inp => inp.value !== '');
                checkButton.style.display = allFilled ? 'block' : 'none';
            };
            gridElement.appendChild(input);
        }
    }

    // Log difficulty selection
    gtag('event', 'Sudoku Difficulty', { 'event_category': 'Sudoku', 'event_label': difficulty });
}

function checkSudokuSolution() {
    const gridElement = document.getElementById('sudoku-grid');
    const inputs = gridElement.querySelectorAll('input');
    let isCorrect = true;
    let idx = 0;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const inputVal = inputs[idx].value ? parseInt(inputs[idx].value) : 0;
            if (inputVal !== window.sudokuSolution[i][j]) {
                isCorrect = false;
                inputs[idx].style.backgroundColor = '#ffcccc'; // Highlight errors
            } else {
                inputs[idx].style.backgroundColor = ''; // Reset
            }
            idx++;
        }
    }
    playSound(isCorrect ? successSound : clickSound, 0.4);
    alert(isCorrect ? 'Good job, you are correct!' : 'Sorry, there are errors. Try again!');
    if (isCorrect) {
        gtag('event', 'Sudoku Solved', { 'event_category': 'Sudoku', 'event_label': 'Correct' });
        setTimeout(() => closePopup('sudoku'), 1500);
    } else {
        gtag('event', 'Sudoku Attempt', { 'event_category': 'Sudoku', 'event_label': 'Incorrect' });
    }
}

function startMoodFlinger() {
    let time = 60;
    let score = 0;
    const canvas = document.getElementById('moodflinger-canvas');
    const ctx = canvas.getContext('2d');
    const timerElement = document.getElementById('moodflinger-timer');
    const scoreElement = document.getElementById('moodflinger-score');
    let isDragging = false;
    let startX, startY;
    const target = { x: canvas.width / 2, y: 50, radius: 20 };
    canvas.onmousedown = (e) => {
        isDragging = true;
        const rect = canvas.getBoundingClientRect();
        startX = e.clientX - rect.left;
        startY = e.clientY - rect.top;
    };
    canvas.onmouseup = (e) => {
        if (!isDragging) return;
        isDragging = false;
        const rect = canvas.getBoundingClientRect();
        const endX = e.clientX - rect.left;
        const endY = e.clientY - rect.top;
        const dist = Math.hypot(endX - target.x, endY - target.y);
        if (dist < target.radius) {
            score += 10;
            scoreElement.textContent = `Score: ${score}`;
            playSound(successSound, 0.4);
        }
    };
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(target.x, target.y, target.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#e74c3c';
        ctx.fill();
        if (isDragging) {
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(canvas.width / 2, canvas.height - 20);
            ctx.strokeStyle = '#333';
            ctx.stroke();
        }
        requestAnimationFrame(draw);
    }
    draw();
    updateProgress('moodflinger-progress', 60, 0);
    window.moodflingerInterval = setInterval(() => {
        time--;
        timerElement.textContent = `Time remaining: ${time}s`;
        updateProgress('moodflinger-progress', 60, time);
        if (time <= 0) {
            clearInterval(window.moodflingerInterval);
            playSound(successSound, 0.4);
            setTimeout(() => closePopup('moodflinger'), 1500);
        }
    }, 1000);
}

function startASMR() {
    let time = 90;
    const timerElement = document.getElementById('asmr-timer');
    const selectElement = document.getElementById('asmr-select');
    const playButton = document.getElementById('asmr-play-btn');
    const volumeSlider = document.getElementById('asmr-volume-slider');
    updateProgress('asmr-progress', 90, 0);
    playButton.innerHTML = '<i class="fas fa-play"></i>';
    selectElement.onchange = function() {
        if (currentSound) {
            currentSound.pause();
            currentSound.currentTime = 0;
            playButton.innerHTML = '<i class="fas fa-play"></i>';
        }
    };
    playButton.onclick = function() {
        const soundType = selectElement.value;
        if (currentSound && currentSound !== asmrSounds[soundType]) {
            currentSound.pause();
            currentSound.currentTime = 0;
        }
        currentSound = asmrSounds[soundType];
        if (currentSound.paused) {
            currentSound.play().then(() => {
                currentSound.volume = volumeSlider.value;
                playButton.innerHTML = '<i class="fas fa-pause"></i>';
            }).catch(err => console.error('Sound playback failed:', err));
        } else {
            currentSound.pause();
            currentSound.currentTime = 0;
            playButton.innerHTML = '<i class="fas fa-play"></i>';
        }
    };
    volumeSlider.oninput = function() {
        if (currentSound) currentSound.volume = this.value;
    };
    window.asmrInterval = setInterval(() => {
        time--;
        timerElement.textContent = `Time remaining: ${time}s`;
        updateProgress('asmr-progress', 90, time);
        if (time <= 0) {
            clearInterval(window.asmrInterval);
            if (currentSound) currentSound.pause();
            playSound(successSound, 0.4);
            setTimeout(() => closePopup('asmr'), 1500);
        }
    }, 1000);
}

function startGratitude() {
    let time = 30;
    const gratitudeText = document.getElementById('gratitude-text');
    const timerElement = document.getElementById('gratitude-timer');
    gratitudeText.value = '';
    updateProgress('gratitude-progress', 30, 0);
    window.gratitudeInterval = setInterval(() => {
        time--;
        timerElement.textContent = `Time remaining: ${time}s`;
        updateProgress('gratitude-progress', 30, time);
        if (time <= 0) {
            clearInterval(window.gratitudeInterval);
            playSound(successSound, 0.4);
            setTimeout(() => closePopup('gratitude'), 1500);
        }
    }, 1000);
}

function saveGratitude() {
    const gratitudeText = document.getElementById('gratitude-text');
    if (!gratitudeText.value.trim()) {
        alert('Please enter something you are grateful for.');
        return;
    }
    let gratitudes = JSON.parse(localStorage.getItem('gratitudes') || '[]');
    gratitudes.push({ text: gratitudeText.value, date: new Date().toLocaleString() });
    localStorage.setItem('gratitudes', JSON.stringify(gratitudes));
    playSound(successSound, 0.4);
    alert('Gratitude saved!');
    gratitudeText.value = '';
}

function startStressJar() {
    let time = 30;
    const stressText = document.getElementById('stressjar-text');
    const timerElement = document.getElementById('stressjar-timer');
    const container = document.getElementById('stressjar-container');
    stressText.value = '';
    container.innerHTML = '';
    updateProgress('stressjar-progress', 30, 0);
    window.stressjarInterval = setInterval(() => {
        time--;
        timerElement.textContent = `Time remaining: ${time}s`;
        updateProgress('stressjar-progress', 30, time);
        if (time <= 0) {
            clearInterval(window.stressjarInterval);
            playSound(successSound, 0.4);
            setTimeout(() => closePopup('stressjar'), 1500);
        }
    }, 1000);
}

function sealStress() {
    const stressText = document.getElementById('stressjar-text');
    const container = document.getElementById('stressjar-container');
    if (!stressText.value.trim()) {
        alert('Please enter a stress to seal.');
        return;
    }
    container.innerHTML = '<div class="sparkle">✨</div>';
    playSound(successSound, 0.5);
    let stresses = JSON.parse(localStorage.getItem('stresses') || '[]');
    stresses.push({ text: stressText.value, date: new Date().toLocaleString() });
    localStorage.setItem('stresses', JSON.stringify(stresses));
    gtag('event', 'Seal Stress', { 'event_category': 'StressJar', 'event_label': 'Stress Sealed' });
    setTimeout(() => {
        stressText.value = '';
        container.innerHTML = '';
        alert('Stress sealed!');
    }, 1000);
}

function viewStresses() {
    const container = document.getElementById('stressjar-container');
    let stresses = JSON.parse(localStorage.getItem('stresses') || '[]');
    container.innerHTML = '';
    if (stresses.length === 0) {
        container.innerHTML = '<p>No stresses saved.</p>';
        return;
    }
    stresses.forEach((stress, index) => {
        const div = document.createElement('div');
        div.className = 'stress-item';
        div.innerHTML = `
            <p>${stress.date}: ${stress.text}</p>
            <button onclick="deleteStress(${index})">Delete</button>
        `;
        container.appendChild(div);
    });
    gtag('event', 'View Stresses', { 'event_category': 'StressJar', 'event_label': 'Stresses Viewed' });
}

function deleteStress(index) {
    let stresses = JSON.parse(localStorage.getItem('stresses') || '[]');
    stresses.splice(index, 1);
    localStorage.setItem('stresses', JSON.stringify(stresses));
    viewStresses();
    playSound(clickSound, 0.3);
}

function startMoodQuest() {
    let time = 90;
    const goalInput = document.getElementById('quest-goal');
    const stepsContainer = document.getElementById('quest-steps');
    const progressMap = document.getElementById('quest-progress-map');
    const timerElement = document.getElementById('moodquest-timer');
    goalInput.value = '';
    stepsContainer.innerHTML = '';
    progressMap.innerHTML = '<div id="progress-marker" style="left: 0;"></div>';
    updateProgress('moodquest-progress', 90, 0);
    window.moodquestInterval = setInterval(() => {
        time--;
        timerElement.textContent = `Time remaining: ${time}s`;
        updateProgress('moodquest-progress', 90, time);
        if (time <= 0) {
            clearInterval(window.moodquestInterval);
            playSound(successSound, 0.4);
            setTimeout(() => closePopup('moodquest'), 1500);
        }
    }, 1000);
}

function generateQuest() {
    const goalInput = document.getElementById('quest-goal');
    const stepsContainer = document.getElementById('quest-steps');
    const progressMap = document.getElementById('quest-progress-map');
    if (!goalInput.value.trim()) {
        alert('Please enter a quest goal.');
        return;
    }
    const steps = [
        { task: "Take 5 deep breaths", xp: 1 },
        { task: "Write down 3 things you're grateful for", xp: 2 },
        { task: "Do a quick stretch", xp: 1 },
        { task: "Drink a glass of water", xp: 1 },
        { task: "Listen to a favorite song", xp: 2 },
        { task: "Take a 5-minute walk", xp: 3 }
    ];
    const questSteps = [];
    const stepCount = Math.floor(Math.random() * 3) + 3;
    for (let i = 0; i < stepCount; i++) {
        const randomStep = steps[Math.floor(Math.random() * steps.length)];
        questSteps.push(randomStep);
        steps.splice(steps.indexOf(randomStep), 1);
    }
    stepsContainer.innerHTML = '';
    let totalXP = 0;
    questSteps.forEach((step, index) => {
        const div = document.createElement('div');
        div.className = 'quest-step';
        div.innerHTML = `
            <input type="checkbox" id="step-${index}" onchange="updateQuestProgress(${index}, ${step.xp})">
            <label for="step-${index}">${step.task} (+${step.xp} XP)</label>
        `;
        stepsContainer.appendChild(div);
        totalXP += step.xp;
    });
    let quests = JSON.parse(localStorage.getItem('quests') || '[]');
    quests.push({
        goal: goalInput.value,
        steps: questSteps,
        date: new Date().toLocaleString()
    });
    localStorage.setItem('quests', JSON.stringify(quests));
    gtag('event', 'Generate Quest', { 'event_category': 'MoodQuest', 'event_label': goalInput.value });
}

function updateQuestProgress(stepIndex, xp) {
    const progressMap = document.getElementById('quest-progress-map');
    const marker = document.getElementById('progress-marker');
    const checkboxes = document.querySelectorAll('#quest-steps input[type="checkbox"]');
    let completed = 0;
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) completed++;
    });
    const progress = (completed / checkboxes.length) * 100;
    marker.style.left = `${progress}%`;
    let totalXP = JSON.parse(localStorage.getItem('totalXP') || '0');
    totalXP = parseInt(totalXP) + xp;
    localStorage.setItem('totalXP', totalXP);
    checkBadges(totalXP);
    gtag('event', 'Complete Quest Step', { 'event_category': 'MoodQuest', 'event_label': `Step ${stepIndex}` });
}

function checkBadges(totalXP) {
    const badgesContainer = document.getElementById('quest-badges');
    let badges = JSON.parse(localStorage.getItem('badges') || '[]');
    const badgeLevels = [
        { xp: 10, name: 'Quest Starter' },
        { xp: 25, name: 'Task Champion' },
        { xp: 50, name: 'Mood Master' }
    ];
    badgeLevels.forEach(level => {
        if (totalXP >= level.xp && !badges.includes(level.name)) {
            badges.push(level.name);
            alert(`New badge earned: ${level.name}!`);
        }
    });
    localStorage.setItem('badges', JSON.stringify(badges));
    badgesContainer.innerHTML = badges.length ? `Badges: ${badges.join(', ')}` : 'No badges yet';
}

function viewQuests() {
    const stepsContainer = document.getElementById('quest-steps');
    let quests = JSON.parse(localStorage.getItem('quests') || '[]');
    stepsContainer.innerHTML = '';
    if (quests.length === 0) {
        stepsContainer.innerHTML = '<p>No quests saved.</p>';
        return;
    }
    quests.forEach((quest, index) => {
        const div = document.createElement('div');
        div.className = 'quest-item';
        div.innerHTML = `
            <p><strong>Goal:</strong> ${quest.goal}</p>
            <p><strong>Date:</strong> ${quest.date}</p>
            <p><strong>Steps:</strong></p>
            <ul>${quest.steps.map(step => `<li>${step.task} (+${step.xp} XP)</li>`).join('')}</ul>
            <button onclick="deleteQuest(${index})">Delete</button>
        `;
        stepsContainer.appendChild(div);
    });
    gtag('event', 'View Quests', { 'event_category': 'MoodQuest', 'event_label': 'Quests Viewed' });
}

function deleteQuest(index) {
    let quests = JSON.parse(localStorage.getItem('quests') || '[]');
    quests.splice(index, 1);
    localStorage.setItem('quests', JSON.stringify(quests));
    viewQuests();
    playSound(clickSound, 0.3);
}
