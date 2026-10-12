const questions = [
    {
        id: 1,
        question: "How do cancer cells differ from normal cells?",
        options: [
            "They stop growing completely",
            "They grow and divide uncontrollably",
            "They die immediately",
            "They help repair tissues faster"
        ],
        correctIndex: 1,
        explanation: "Normal cells grow and divide only when the body needs them. Cancer cells lose this control — they keep growing and dividing non-stop, which is what forms tumors."
    },
    {
        id: 2,
        question: "What happens when a cell loses control over its growth?",
        options: [
            "It becomes a healthy cell",
            "It may form a tumor",
            "It moves to another body part and stops",
            "It shrinks and disappears"
        ],
        correctIndex: 1,
        explanation: "Without growth control, cells build up and form a mass called a tumor. Benign tumors stay in one place; malignant tumors can spread to other parts of the body."
    },
    {
        id: 3,
        question: "What is the main difference between benign and malignant tumors?",
        options: [
            "Benign are small, malignant are large",
            "Benign don't spread; malignant can invade nearby tissues",
            "Benign are pink; malignant are red",
            "There is no real difference"
        ],
        correctIndex: 1,
        explanation: "Benign tumors grow locally and don't spread — they're rarely dangerous. Malignant tumors invade surrounding tissues and can travel through the body (metastasis)."
    },
    {
        id: 4,
        question: "How does breast cancer primarily affect the body?",
        options: [
            "It damages the lungs only",
            "It affects breast tissue and may spread to lymph nodes or organs",
            "It stops digestion completely",
            "It causes hair loss immediately"
        ],
        correctIndex: 1,
        explanation: "Breast cancer starts in breast tissue. If not detected early, cells can spread to lymph nodes or distant organs like lungs, liver, or bones — early detection saves lives."
    },
    {
        id: 5,
        question: "What is one key purpose of breast cancer screening?",
        options: [
            "To cure cancer instantly",
            "To detect changes early, before symptoms appear",
            "To make it go away on its own",
            "To replace surgery entirely"
        ],
        correctIndex: 1,
        explanation: "Screening like mammograms finds changes early — often before any lump or pain. Early detection drastically improves survival and makes treatment easier."
    },
    {
        id: 6,
        question: "Which of these helps the body fight abnormal cells?",
        options: [
            "Wearing pink clothes",
            "A healthy immune system",
            "Avoiding all exercise",
            "Eating only one type of food"
        ],
        correctIndex: 1,
        explanation: "Your immune system finds and destroys abnormal cells every day. Good nutrition, sleep, and exercise keep it strong and working properly."
    },
    {
        id: 7,
        question: "What does cell reproduction refer to in biology?",
        options: [
            "Cells talking to each other",
            "Cell division to make new cells",
            "Cells changing colour",
            "Cells moving around the body"
        ],
        correctIndex: 1,
        explanation: "Cell reproduction = cell division. Healthy cells divide in a controlled way. Cancer happens when this process loses its 'stop' signal and cells multiply too fast."
    },
    {
        id: 8,
        question: "Why is awareness and education about breast cancer important?",
        options: [
            "So people can avoid doctors",
            "Early detection, better outcomes, and supporting those affected",
            "It's not actually important",
            "To treat it at home without help"
        ],
        correctIndex: 1,
        explanation: "Awareness saves lives! Knowing the signs means people seek help sooner. Education also removes fear and stigma, and helps communities support patients."
    },
    {
        id: 9,
        question: "What is the most common first sign of breast cancer?",
        options: [
            "Immediate pain all over",
            "A new lump or thickening in the breast or underarm",
            "Hair loss",
            "Fever and chills"
        ],
        correctIndex: 1,
        explanation: "A painless lump is often the first sign. Not all lumps are cancer — but any new lump or change should be checked by a doctor."
    },
    {
        id: 10,
        question: "Who can be affected by breast cancer?",
        options: [
            "Only women over 50",
            "Only women",
            "Anyone — women and men can both get breast cancer",
            "Only people with a family history"
        ],
        correctIndex: 2,
        explanation: "Breast cancer affects everyone. About 1 in 8 women will develop it in their lifetime, and about 1 in 800 men too. Family history increases risk, but most cases happen to people with no family history."
    }
];

// DOM Elements
const homeSection = document.getElementById('homeSection');
const numberGrid = document.getElementById('numberGrid');
const quizSection = document.getElementById('quizSection');
const questionLabel = document.getElementById('questionLabel');
const questionText = document.getElementById('questionText');
const optionsGrid = document.getElementById('optionsGrid');
const feedbackPanel = document.getElementById('feedbackPanel');
const feedbackIcon = document.getElementById('feedbackIcon');
const feedbackMsg = document.getElementById('feedbackMsg');
const explanationText = document.getElementById('explanationText');
const backHomeBtn = document.getElementById('backHomeBtn');
const homeBtn = document.getElementById('homeBtn');

// State
let currentQ = null;
let answered = false;

// Build number grid — ALL numbers always clickable
function buildNumberGrid() {
    numberGrid.innerHTML = '';
    for (let i = 1; i <= 10; i++) {
        const btn = document.createElement('button');
        btn.className = 'number-btn';
        btn.innerHTML = `<span>${i}</span>`;
        // NO disabling — all numbers stay available for all participants!
        btn.addEventListener('click', () => selectNumber(i));
        numberGrid.appendChild(btn);
    }
}

// Select a question
function selectNumber(num) {
    currentQ = questions.find(q => q.id === num);
    answered = false;
    
    // Switch views
    homeSection.classList.add('hidden');
    quizSection.classList.remove('hidden');
    
    // Reset UI
    questionLabel.textContent = `Question #${currentQ.id}`;
    questionText.textContent = currentQ.question;
    optionsGrid.innerHTML = '';
    feedbackPanel.classList.add('hidden');
    homeBtn.classList.add('hidden');
    
    // Show options
    currentQ.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = `${String.fromCharCode(65 + i)}. ${opt}`;
        btn.addEventListener('click', () => selectAnswer(i));
        optionsGrid.appendChild(btn);
    });
}

// Handle answer selection
function selectAnswer(selectedIndex) {
    if (answered) return;
    answered = true;
    
    const allBtns = document.querySelectorAll('.option-btn');
    allBtns.forEach(b => b.disabled = true);
    
    if (selectedIndex === currentQ.correctIndex) {
        allBtns[selectedIndex].classList.add('correct-answer');
        showFeedback(true);
    } else {
        allBtns[selectedIndex].classList.add('wrong-answer');
        allBtns[currentQ.correctIndex].classList.add('correct-answer');
        showFeedback(false);
    }
}

// Display feedback
function showFeedback(isCorrect) {
    feedbackPanel.classList.remove('hidden');
    feedbackPanel.className = `feedback-panel ${isCorrect ? 'correct' : 'wrong'}`;
    
    feedbackIcon.textContent = isCorrect ? '✅' : '❌';
    feedbackMsg.textContent = isCorrect 
        ? 'Perfect! You got it right! 🎉' 
        : 'Good try — here\'s the answer 💡';
    explanationText.textContent = currentQ.explanation;
    
    homeBtn.classList.remove('hidden');
}

// Navigate back to home
function goHome() {
    currentQ = null;
    answered = false;
    quizSection.classList.add('hidden');
    homeSection.classList.remove('hidden');
    buildNumberGrid();
}

// Event Listeners
backHomeBtn.addEventListener('click', goHome);
homeBtn.addEventListener('click', goHome);

// Initialize
buildNumberGrid();