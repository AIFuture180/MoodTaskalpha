// Levenshtein distance for fuzzy matching
function levenshtein(a, b) {
    const matrix = [];
    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }
    return matrix[b.length][a.length];
}

// Mood to task mappings
const moodTasks = {
    tired: [
        {
            title: 'Optimize Sleep Environment',
            icon: 'fa-moon',
            tool: null,
            explanation: 'Sleep expert Matthew Walker emphasizes a cool (around 65°F), dark, and quiet bedroom to enhance sleep quality. Better sleep combats daytime fatigue by ensuring deeper restorative sleep stages, which are critical for energy restoration.'
        },
        {
            title: 'Diaphragmatic Breathing',
            icon: 'fa-wind',
            tool: 'breathing',
            explanation: 'Neuroscientist Andrew Huberman advocates for slow, diaphragmatic breathing to activate the parasympathetic nervous system. This reduces fatigue by lowering heart rate and increasing oxygen delivery to the brain, boosting alertness.'
        },
        {
            title: 'Gentle Movement for Energy',
            icon: 'fa-child',
            tool: 'stretch',
            explanation: 'Neuroscientist Lisa Feldman Barrett highlights that bodily movement can shift emotional states. A short stretch increases blood flow and endorphins, helping to counteract the low-energy state of tiredness by signaling alertness to the brain.'
        }
    ],
    stressed: [
        {
            title: 'Physiological Sigh',
            icon: 'fa-wind',
            tool: 'breathing',
            explanation: 'Andrew Huberman highlights the physiological sigh (two quick inhales through the nose, followed by a long exhale) as a rapid way to reduce stress. It balances oxygen and CO2 levels, calming the amygdala—the brain’s stress center—within seconds.'
        },
        {
            title: 'Mindfulness Meditation',
            icon: 'fa-spa',
            tool: 'breathing',
            explanation: 'Jon Kabat-Zinn, founder of Mindfulness-Based Stress Reduction (MBSR), recommends mindfulness meditation to reduce stress. Focusing on the breath helps detach from stress triggers, lowering cortisol levels and promoting a calm state.'
        },
        {
            title: 'Self-Compassion Break',
            icon: 'fa-heart',
            tool: 'gratitude',
            explanation: 'Psychologist Kristin Neff suggests practicing self-compassion during stress. Reflecting on self-kindness reduces self-criticism—a common stress amplifier—by fostering a sense of emotional safety and reducing anxiety.'
        }
    ],
    sad: [
        {
            title: 'Self-Compassion Practice',
            icon: 'fa-heart',
            tool: 'gratitude',
            explanation: 'Kristin Neff, a pioneer in self-compassion research, recommends treating yourself with kindness during sadness. Writing a compassionate note to yourself can increase oxytocin, fostering emotional warmth and reducing feelings of isolation.'
        },
        {
            title: 'Reframe Through Movement',
            icon: 'fa-child',
            tool: 'dance',
            explanation: 'Lisa Feldman Barrett’s research on constructed emotion suggests that physical movement can shift emotional states. Light dancing changes your body’s posture and energy, signaling the brain to generate more positive emotional experiences.'
        },
        {
            title: 'Gratitude for Dopamine Boost',
            icon: 'fa-smile',
            tool: 'gratitude',
            explanation: 'Andrew Huberman discusses how gratitude practices can increase dopamine and serotonin levels in the brain. Reflecting on something you’re grateful for can counteract sadness by enhancing the brain’s reward system.'
        }
    ],
    angry: [
        {
            title: 'Physiological Sigh for Calm',
            icon: 'fa-wind',
            tool: 'breathing',
            explanation: 'Andrew Huberman recommends the physiological sigh to quickly downregulate anger. This breathing pattern reduces activation in the amygdala, the brain’s emotional center, helping you regain control and reduce aggressive impulses.'
        },
        {
            title: 'Mindful Observation of Anger',
            icon: 'fa-spa',
            tool: 'breathing',
            explanation: 'Jon Kabat-Zinn suggests observing anger without reacting, a core principle of mindfulness. By focusing on the physical sensations of anger (e.g., through breath), you create space to respond thoughtfully rather than impulsively.'
        },
        {
            title: 'Cognitive Reframing',
            icon: 'fa-brain',
            tool: null,
            explanation: 'Lisa Feldman Barrett’s work on emotional construction emphasizes reframing anger. Instead of labeling the feeling as anger, try to see it as energy or frustration, which can reduce its intensity by altering how your brain interprets the emotion.'
        }
    ],
    anxious: [
        {
            title: 'Body Scan Meditation',
            icon: 'fa-child',
            tool: 'stretch',
            explanation: 'Jon Kabat-Zinn, creator of MBSR, advocates for body scan meditation to reduce anxiety. By focusing on bodily sensations, you ground yourself in the present, reducing the overactivity of the brain’s fear circuits like the amygdala.'
        },
        {
            title: 'Self-Compassion for Anxiety',
            icon: 'fa-heart',
            tool: 'gratitude',
            explanation: 'Kristin Neff’s research shows that self-compassion can ease anxiety. Writing a kind note to yourself during anxious moments fosters a sense of safety, reducing self-judgment and calming the nervous system.'
        },
        {
            title: '5-4-3-2-1 Grounding Technique',
            icon: 'fa-eye',
            tool: null,
            explanation: 'Lisa Feldman Barrett’s insights on emotion suggest that shifting focus to sensory input can change emotional states. The 5-4-3-2-1 technique (naming 5 things you see, 4 you can touch, etc.) grounds you, reducing anxiety by engaging the prefrontal cortex.'
        }
    ],
    bored: [
        {
            title: 'Creative Task',
            icon: 'fa-pencil-alt',
            tool: 'doodle',
            explanation: 'Psychologist Mihaly Csikszentmihalyi, known for his work on flow states, suggests that engaging in creative tasks like doodling can combat boredom. It stimulates the brain’s reward system, fostering a sense of engagement and fulfillment.'
        },
        {
            title: 'Novel Activity',
            icon: 'fa-puzzle-piece',
            tool: null,
            explanation: 'Neuroscientist David Eagleman highlights that novelty stimulates the brain’s dopamine pathways, counteracting boredom. Trying a new activity or puzzle engages your curiosity, making you feel more alert and interested.'
        },
        {
            title: 'Physical Movement',
            icon: 'fa-music',
            tool: 'dance',
            explanation: 'Kelly McGonigal, a health psychologist, notes that physical movement like dancing can shift your emotional state by releasing endorphins. This helps alleviate boredom by energizing your body and mind, making you feel more engaged.'
        }
    ],
    happy: [
        {
            title: 'Savoring Exercise',
            icon: 'fa-heart',
            tool: 'gratitude',
            explanation: 'Positive psychology expert Barbara Fredrickson recommends savoring positive emotions to amplify happiness. Reflecting on a joyful moment can extend the emotional benefits by reinforcing neural pathways associated with positive affect.'
        },
        {
            title: 'Spread Positivity',
            icon: 'fa-smile',
            tool: null,
            explanation: 'Psychologist Sonja Lyubomirsky’s research shows that sharing positivity, like giving a compliment, can enhance your own happiness. It fosters social connection, which amplifies feelings of joy through oxytocin release.'
        },
        {
            title: 'Active Celebration',
            icon: 'fa-music',
            tool: 'dance',
            explanation: 'Kelly McGonigal highlights that movement, such as dancing, can amplify positive emotions. Celebrating happiness through dance reinforces the brain’s reward system, making the joyful state more vivid and memorable.'
        }
    ],
    worried: [
        {
            title: 'Worry Postponement',
            icon: 'fa-clock',
            tool: 'worry',
            explanation: 'Psychologist Thomas Borkovec, a pioneer in worry research, developed the worry postponement technique. By setting aside a specific ‘worry time,’ you reduce rumination, allowing your brain to focus on the present and decreasing anxiety.'
        },
        {
            title: 'Mindfulness Practice',
            icon: 'fa-spa',
            tool: 'breathing',
            explanation: 'Jon Kabat-Zinn’s mindfulness practices help manage worry by grounding you in the present moment. Focusing on your breath reduces activity in the brain’s default mode network, which is often responsible for excessive worrying.'
        },
        {
            title: 'Relaxation Imagery',
            icon: 'fa-image',
            tool: 'color',
            explanation: 'Neuroscientist Andrew Huberman notes that visualization can calm the nervous system. Focusing on a soothing color or image engages the parasympathetic nervous system, reducing worry by lowering physiological arousal.'
        }
    ],
    overwhelmed: [
        {
            title: 'Task Prioritization',
            icon: 'fa-list',
            tool: null,
            explanation: 'Psychologist David Allen, creator of the Getting Things Done method, suggests breaking tasks into manageable steps to reduce overwhelm. Prioritizing tasks helps declutter your mind, improving focus and reducing cognitive load.'
        },
        {
            title: 'Breathing Break',
            icon: 'fa-wind',
            tool: 'breathing',
            explanation: 'Andrew Huberman advocates for controlled breathing to manage overwhelm. A short breathing exercise activates the parasympathetic nervous system, lowering cortisol levels and helping you regain mental clarity.'
        },
        {
            title: 'Mindful Pause',
            icon: 'fa-palette',
            tool: 'color',
            explanation: 'Jon Kabat-Zinn’s mindfulness techniques emphasize pausing to reset. Focusing on a calming color grounds you in the present, reducing the mental clutter of overwhelm by engaging the brain’s sensory focus.'
        }
    ],
    constipated: [
        {
            title: 'Gentle Abdominal Stretch',
            icon: 'fa-child',
            tool: 'stretch',
            explanation: 'Physical therapist Dr. Kelly Starrett notes that gentle stretching can stimulate blood flow and relax abdominal muscles, potentially aiding digestion and relieving constipation discomfort. Stretching also reduces stress, which can contribute to gastrointestinal tension.'
        },
        {
            title: 'Deep Breathing for Relaxation',
            icon: 'fa-wind',
            tool: 'breathing',
            explanation: 'Neuroscientist Andrew Huberman highlights that deep breathing activates the parasympathetic nervous system, reducing stress and promoting relaxation in the gut. Stress can worsen constipation, so calming the nervous system may help.'
        },
        {
            title: 'Hydration Reminder',
            icon: 'fa-tint',
            tool: null,
            explanation: 'Gastroenterologist Dr. Anthony Lembo emphasizes that adequate hydration softens stool and supports bowel movements. Setting a reminder to drink water can address constipation directly while improving overall well-being.'
        }
    ]
};

// Synonyms for mood matching
const moodSynonyms = {
    tired: ['exhausted', 'fatigued', 'drained', 'weary', 'sleepy', 'worn-out', 'sluggish'],
    stressed: ['overwhelmed', 'pressured', 'tense', 'anxious', 'nervous', 'frazzled', 'strung-out'],
    sad: ['depressed', 'down', 'blue', 'unhappy', 'melancholy', 'gloomy', 'heartbroken'],
    angry: ['frustrated', 'irritated', 'mad', 'furious', 'annoyed', 'enraged', 'livid'],
    anxious: ['nervous', 'worried', 'uneasy', 'restless', 'tense', 'jittery', 'panicky'],
    bored: ['uninterested', 'listless', 'idle', 'disengaged', 'apathetic', 'uninspired'],
    happy: ['joyful', 'cheerful', 'content', 'pleased', 'delighted', 'ecstatic', 'overjoyed'],
    worried: ['concerned', 'anxious', 'nervous', 'uneasy', 'apprehensive', 'fretful', 'alarmed'],
    overwhelmed: ['swamped', 'burdened', 'stressed', 'flooded', 'inundated', 'snowed-under'],
    constipated: ['blocked', 'backed-up']
};

// Initialize event listeners
document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submit-mood');
    const moodText = document.getElementById('mood-text');
    if (submitButton) {
        submitButton.addEventListener('click', submitMood);
    }
    if (moodText) {
        moodText.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                submitMood();
            }
        });
    }

    const toolButtons = document.querySelectorAll('.tool-button');
    toolButtons.forEach(button => {
        const tool = button.getAttribute('data-tool');
        button.addEventListener('click', () => openPopup(tool));
    });

    const shareButton = document.getElementById('share');
    if (shareButton) {
        shareButton.addEventListener('click', () => {
            const url = encodeURIComponent(window.location.href);
            const text = encodeURIComponent('Check out MoodTask to transform your mood with science-backed activities! #MoodTask #MentalHealth');
            window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
        });
    }
});

// Submit mood and generate recommendations
function submitMood() {
    try {
        const moodText = document.getElementById('mood-text');
        const activitiesSection = document.getElementById('activities-section');
        const activitiesHeader = activitiesSection.querySelector('.activities-header');
        const userMoodDisplay = activitiesSection.querySelector('.user-mood');
        const activityCards = activitiesSection.querySelector('.activity-cards');
        const toolsContainer = document.getElementById('tools-container');

        if (!moodText || !activitiesSection || !activitiesHeader || !userMoodDisplay || !activityCards || !toolsContainer) {
            throw new Error('One or more required DOM elements are missing.');
        }

        let moodInput = moodText.value.trim();
        if (!moodInput) {
            moodInput = "happy";
        }
        const moodInputLower = moodInput.toLowerCase();

        let matchedMood = Object.keys(moodTasks).find(mood => mood === moodInputLower);
        if (!matchedMood) {
            for (let mood in moodSynonyms) {
                if (moodSynonyms[mood].includes(moodInputLower)) {
                    matchedMood = mood;
                    break;
                }
            }
        }

        if (!matchedMood) {
            let minDistance = Infinity;
            let closestMood = null;
            for (let mood in moodTasks) {
                const distance = levenshtein(mood, moodInputLower);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestMood = mood;
                }
                for (let synonym of moodSynonyms[mood]) {
                    const dist = levenshtein(synonym, moodInputLower);
                    if (dist < minDistance) {
                        minDistance = dist;
                        closestMood = mood;
                    }
                }
            }
            matchedMood = closestMood || "happy";
        }

        activitiesHeader.textContent = `Recommendations for ${matchedMood.charAt(0).toUpperCase() + matchedMood.slice(1)} Mood:`;
        userMoodDisplay.textContent = `You entered '${moodInput}'`;
        activityCards.innerHTML = '<ul>' + moodTasks[matchedMood].map((task, index) => `
            <li onclick="toggleExplanation(${index})">
                <div class="activity-item">
                    <i class="fas ${task.icon}"></i>
                    <span class="activity-title">${task.title}</span>
                    ${task.tool ? `<button class="activity-button" onclick="event.stopPropagation(); openPopup('${task.tool}')"><i class="fas fa-play"></i> Try Now</button>` : ''}
                </div>
                <div class="explanation" id="explanation-${index}">${task.explanation}</div>
            </li>
        `).join('') + '</ul>';

        activitiesSection.classList.add('show');
        toolsContainer.style.display = 'grid';
        moodText.value = '';

        gtag('event', 'mood_submitted', { mood: matchedMood, user_input: moodInput });
    } catch (error) {
        console.error('Error in submitMood:', error);
        alert('An error occurred while processing your mood. Please try again.');
    }
}

function toggleExplanation(index) {
    const explanation = document.getElementById(`explanation-${index}`);
    if (explanation.classList.contains('show')) {
        explanation.classList.remove('show');
    } else {
        const allExplanations = document.querySelectorAll('.explanation');
        allExplanations.forEach(exp => exp.classList.remove('show'));
        explanation.classList.add('show');
    }
}

function openPopup(tool) {
    closeAllPopups();
    const popup = document.getElementById(`${tool}-popup`);
    if (popup) {
        popup.style.display = 'flex';
        document.body.style.overflow = 'hidden';

        if (tool === 'breathing') startBreathing();
        if (tool === 'soundscape') setupSoundscape();
        if (tool === 'punching') startPunching();
        if (tool === 'stretch') startStretch();
        if (tool === 'doodle') setupDoodle();
        if (tool === 'dance') startDance();
        if (tool === 'color') startColorFocus();
    } else {
        console.error(`Popup for tool '${tool}' not found.`);
    }
}

function closePopup(tool) {
    const popup = document.getElementById(`${tool}-popup`);
    if (popup) {
        popup.style.display = 'none';
        document.body.style.overflow = 'auto';

        if (tool === 'breathing') stopBreathing();
        if (tool === 'soundscape') stopSoundscape();
        if (tool === 'punching') stopPunching();
        if (tool === 'doodle') stopDoodle();
        if (tool === 'dance') stopDance();
    }
}

function closeAllPopups() {
    const popups = document.querySelectorAll('.popup');
    popups.forEach(popup => {
        const tool = popup.id.replace('-popup', '');
        closePopup(tool);
    });
}

// Breathing Exercise
let breathingInterval;
function startBreathing() {
    const circle = document.getElementById('breathing-circle');
    const stepText = document.getElementById('breathing-step');
    const instruction = document.getElementById('breathing-instruction');
    const progressBar = document.getElementById('breathing-progress');
    const timerText = document.getElementById('breathing-timer');
    const affirmation = document.querySelector('#breathing-popup .affirmation');
    affirmation.style.display = 'none';
    let timeLeft = 60;
    let phase = 'inhale';
    let phaseTime = 0;
    const phaseDurations = { inhale: 4, hold: 4, exhale: 6 };
    let totalDuration = 60;

    progressBar.style.width = '0%';
    timerText.textContent = `Time remaining: ${timeLeft}s`;
    circle.classList.remove('inhale', 'hold', 'exhale');
    circle.classList.add(phase);

    breathingInterval = setInterval(() => {
        phaseTime += 0.1;
        timeLeft -= 0.1;
        progressBar.style.width = `${((totalDuration - timeLeft) / totalDuration) * 100}%`;
        timerText.textContent = `Time remaining: ${Math.ceil(timeLeft)}s`;

        if (phaseTime >= phaseDurations[phase]) {
            phaseTime = 0;
            if (phase === 'inhale') {
                phase = 'hold';
                stepText.textContent = 'Hold';
                instruction.textContent = 'Hold your breath...';
                circle.classList.remove('inhale');
                circle.classList.add('hold');
            } else if (phase === 'hold') {
                phase = 'exhale';
                stepText.textContent = 'Exhale';
                instruction.textContent = 'Exhale slowly...';
                circle.classList.remove('hold');
                circle.classList.add('exhale');
            } else {
                phase = 'inhale';
                stepText.textContent = 'Inhale';
                instruction.textContent = 'Breathe in deeply...';
                circle.classList.remove('exhale');
                circle.classList.add('inhale');
            }
        }

        if (timeLeft <= 0) {
            clearInterval(breathingInterval);
            affirmation.style.display = 'block';
            progressBar.style.width = '100%';
            timerText.style.display = 'none';
        }
    }, 100);
}

function stopBreathing() {
    clearInterval(breathingInterval);
}

// Gratitude Note
function saveGratitude() {
    const textarea = document.getElementById('gratitude-text');
    const history = document.getElementById('gratitude-history');
    const affirmation = document.querySelector('#gratitude-popup .affirmation');
    if (textarea.value.trim()) {
        const entry = document.createElement('p');
        entry.textContent = `${new Date().toLocaleString()}: ${textarea.value.trim()}`;
        history.insertBefore(entry, history.firstChild);
        textarea.value = '';
        affirmation.style.display = 'block';
        setTimeout(() => affirmation.style.display = 'none', 2000);
    }
}

// Soundscape
let currentAudio = null;
function setupSoundscape() {
    const soundSelect = document.getElementById('soundscape-select');
    const playBtn = document.getElementById('play-btn');
    const volumeSlider = document.getElementById('volume-slider');
    const playIcon = playBtn.querySelector('i');
    const affirmation = document.querySelector('#soundscape-popup .affirmation');
    const errorMsg = document.getElementById('soundscape-error');
    const specificErrorMsg = document.getElementById('soundscape-specific-error');
    affirmation.style.display = 'none';
    errorMsg.style.display = 'none';
    specificErrorMsg.style.display = 'none';

    const sounds = {
        lightrain: 'https://www.dropbox.com/scl/fi/42k6f2f5z4p5gbdh2d3om/lightrain.mp3?rlkey=8u9x5p5k2h5j5x5v5k5q5z5n5&raw=1',
        chinese: 'https://www.dropbox.com/scl/fi/5k5q5z5n5u9x5p5k2h5j5/chinese.mp3?rlkey=2d3om42k6f2f5z4p5gbdh5x5v&raw=1',
        forest: 'https://www.dropbox.com/scl/fi/2h5j5x5v5k5q5z5n5u9x5p/forest.mp3?rlkey=42k6f2f5z4p5gbdh5k5q5z5n5&raw=1',
        waves: 'https://www.dropbox.com/scl/fi/5z4p5gbdh5k5q5z5n5u9x5p/waves.mp3?rlkey=2h5j5x5v5k5q5z5n5u9x5p5k2&raw=1',
        temple: 'https://www.dropbox.com/scl/fi/5k5q5z5n5u9x5p5k2h5j5x/temple.mp3?rlkey=42k6f2f5z4p5gbdh5k5q5z5n5&raw=1'
    };

    playBtn.onclick = () => {
        if (currentAudio) {
            if (!currentAudio.paused) {
                currentAudio.pause();
                playIcon.classList.remove('fa-pause');
                playIcon.classList.add('fa-play');
                affirmation.style.display = 'block';
                return;
            }
        }

        const soundUrl = sounds[soundSelect.value];
        currentAudio = new Audio(soundUrl);
        currentAudio.volume = volumeSlider.value;
        currentAudio.loop = true;

        currentAudio.play().then(() => {
            playIcon.classList.remove('fa-play');
            playIcon.classList.add('fa-pause');
            affirmation.style.display = 'none';
            errorMsg.style.display = 'none';
            specificErrorMsg.style.display = 'none';
        }).catch(err => {
            console.error('Audio playback error:', err);
            specificErrorMsg.textContent = `Failed to play ${soundSelect.options[soundSelect.selectedIndex].text}: ${err.message}`;
            specificErrorMsg.style.display = 'block';
            errorMsg.style.display = 'block';
        });
    };

    volumeSlider.oninput = () => {
        if (currentAudio) currentAudio.volume = volumeSlider.value;
    };

    soundSelect.onchange = () => {
        if (currentAudio) {
            currentAudio.pause();
            playIcon.classList.remove('fa-pause');
            playIcon.classList.add('fa-play');
        }
        affirmation.style.display = 'none';
    };
}

function stopSoundscape() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
        const playIcon = document.querySelector('#play-btn i');
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
    }
}

// Punching Bag
let punchInterval;
function startPunching() {
    const bag = document.getElementById('punching-bag');
    const progressBar = document.getElementById('punching-progress');
    const timerText = document.getElementById('punching-timer');
    const affirmation = document.querySelector('#punching-popup .affirmation');
    affirmation.style.display = 'none';
    let punchCount = 0;
    let timeLeft = 30;
    const totalDuration = 30;

    bag.textContent = punchCount;
    progressBar.style.width = '0%';
    timerText.textContent = `Time remaining: ${timeLeft}s`;

    bag.onclick = () => {
        punchCount++;
        bag.textContent = punchCount;
        bag.style.transform = 'rotate(-5deg)';
        setTimeout(() => bag.style.transform = 'rotate(5deg)', 150);
    };

    punchInterval = setInterval(() => {
        timeLeft--;
        progressBar.style.width = `${((totalDuration - timeLeft) / totalDuration) * 100}%`;
        timerText.textContent = `Time remaining: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(punchInterval);
            bag.onclick = null;
            affirmation.style.display = 'block';
            timerText.style.display = 'none';
        }
    }, 1000);
}

function stopPunching() {
    clearInterval(punchInterval);
    const bag = document.getElementById('punching-bag');
    bag.onclick = null;
}

// Stretch
let stretchIndex = 0;
const stretches = [
    "Reach your arms above your head and stretch upwards as if trying to touch the sky.",
    "Bend forward at your hips, reaching towards your toes, and feel the stretch in your hamstrings.",
    "Stand tall, extend one arm across your body, and use the other hand to gently pull it closer for a shoulder stretch."
];
function startStretch() {
    stretchIndex = 0;
    const prompt = document.getElementById('stretch-prompt');
    const nextBtn = document.querySelector('#stretch-popup .next-button');
    const affirmation = document.querySelector('#stretch-popup .affirmation');
    affirmation.style.display = 'none';
    prompt.textContent = stretches[stretchIndex];
    nextBtn.disabled = false;
}

function nextStretch() {
    stretchIndex++;
    const prompt = document.getElementById('stretch-prompt');
    const nextBtn = document.querySelector('#stretch-popup .next-button');
    const affirmation = document.querySelector('#stretch-popup .affirmation');
    if (stretchIndex < stretches.length) {
        prompt.textContent = stretches[stretchIndex];
    } else {
        prompt.textContent = 'Well done! You’ve completed the stretches.';
        nextBtn.disabled = true;
        affirmation.style.display = 'block';
    }
}

// Doodle
let doodleInterval;
let isDrawing = false;
let lastX = 0;
let lastY = 0;
function setupDoodle() {
    const canvas = document.getElementById('doodle-canvas');
    const ctx = canvas.getContext('2d');
    const colorPicker = document.getElementById('color-picker');
    const brushSize = document.getElementById('brush-size');
    const progressBar = document.getElementById('doodle-progress');
    const timerText = document.getElementById('doodle-timer');
    const affirmation = document.querySelector('#doodle-popup .affirmation');
    affirmation.style.display = 'none';
    let timeLeft = 90;
    const totalDuration = 90;

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = colorPicker.value;
    ctx.lineWidth = brushSize.value;

    progressBar.style.width = '0%';
    timerText.textContent = `Time remaining: ${timeLeft}s`;

    canvas.onmousedown = (e) => {
        isDrawing = true;
        const rect = canvas.getBoundingClientRect();
        lastX = e.clientX - rect.left;
        lastY = e.clientY - rect.top;
    };

    canvas.onmousemove = (e) => {
        if (!isDrawing) return;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();
        lastX = x;
        lastY = y;
    };

    canvas.onmouseup = () => isDrawing = false;
    canvas.onmouseleave = () => isDrawing = false;

    colorPicker.onchange = () => ctx.strokeStyle = colorPicker.value;
    brushSize.oninput = () => ctx.lineWidth = brushSize.value;

    doodleInterval = setInterval(() => {
        timeLeft--;
        progressBar.style.width = `${((totalDuration - timeLeft) / totalDuration) * 100}%`;
        timerText.textContent = `Time remaining: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(doodleInterval);
            affirmation.style.display = 'block';
            timerText.style.display = 'none';
            canvas.onmousedown = null;
            canvas.onmousemove = null;
            canvas.onmouseup = null;
            canvas.onmouseleave = null;
        }
    }, 1000);
}

function saveDoodle() {
    const canvas = document.getElementById('doodle-canvas');
    const link = document.createElement('a');
    link.download = 'doodle.png';
    link.href = canvas.toDataURL();
    link.click();
}

function clearCanvas() {
    const canvas = document.getElementById('doodle-canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function stopDoodle() {
    clearInterval(doodleInterval);
    const canvas = document.getElementById('doodle-canvas');
    canvas.onmousedown = null;
    canvas.onmousemove = null;
    canvas.onmouseup = null;
    canvas.onmouseleave = null;
}

// Dance
let danceInterval;
function startDance() {
    const prompt = document.getElementById('dance-prompt');
    const progressBar = document.getElementById('dance-progress');
    const timerText = document.getElementById('dance-timer');
    const affirmation = document.querySelector('#dance-popup .affirmation');
    affirmation.style.display = 'none';
    let timeLeft = 30;
    const totalDuration = 30;

    prompt.textContent = 'Move your body to your favorite rhythm!';
    progressBar.style.width = '0%';
    timerText.textContent = `Time remaining: ${timeLeft}s`;

    danceInterval = setInterval(() => {
        timeLeft--;
        progressBar.style.width = `${((totalDuration - timeLeft) / totalDuration) * 100}%`;
        timerText.textContent = `Time remaining: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(danceInterval);
            affirmation.style.display = 'block';
            timerText.style.display = 'none';
        }
    }, 1000);
}

function stopDance() {
    clearInterval(danceInterval);
}

// Worry Shredder
function shredWorry() {
    const textarea = document.getElementById('worry-text');
    const container = document.getElementById('paper-strips-container');
    const affirmation = document.querySelector('#worry-popup .affirmation');
    if (textarea.value.trim()) {
        textarea.classList.add('shredding');
        container.innerHTML = '';
        for (let i = 0; i < 5; i++) {
            const strip = document.createElement('div');
            strip.style.position = 'absolute';
            strip.style.width = '10px';
            strip.style.height = '50px';
            strip.style.background = '#ccc';
            strip.style.left = `${i * 15 + 20}px`;
            strip.style.animation = `shred 0.5s forwards ${i * 0.1}s`;
            container.appendChild(strip);
        }
        setTimeout(() => {
            textarea.value = '';
            textarea.classList.remove('shredding');
            affirmation.style.display = 'block';
        }, 1000);
    }
}

// Color Focus
let colorIndex = 0;
const colors = [
    { name: 'Soft Blue', hex: '#ADD8E6' },
    { name: 'Calm Green', hex: '#90EE90' },
    { name: 'Warm Yellow', hex: '#FFFFE0' }
];
function startColorFocus() {
    colorIndex = 0;
    const prompt = document.getElementById('color-prompt');
    const square = document.getElementById('color-square');
    const nextBtn = document.querySelector('#color-popup .next-button');
    const affirmation = document.querySelector('#color-popup .affirmation');
    affirmation.style.display = 'none';
    prompt.textContent = `Focus on this ${colors[colorIndex].name} color to calm your mind...`;
    square.style.backgroundColor = colors[colorIndex].hex;
    nextBtn.disabled = false;
}

function nextColor() {
    colorIndex++;
    const prompt = document.getElementById('color-prompt');
    const square = document.getElementById('color-square');
    const nextBtn = document.querySelector('#color-popup .next-button');
    const affirmation = document.querySelector('#color-popup .affirmation');
    if (colorIndex < colors.length) {
        prompt.textContent = `Focus on this ${colors[colorIndex].name} color to calm your mind...`;
        square.style.backgroundColor = colors[colorIndex].hex;
    } else {
        prompt.textContent = 'Great job focusing on calming colors!';
        square.style.display = 'none';
        nextBtn.disabled = true;
        affirmation.style.display = 'block';
    }
}
