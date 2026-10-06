/* =========================================================
AI STUDY ASSISTANT
Main JavaScript
========================================================= */

/* =========================================================

1. STORAGE KEYS
   ========================================================= */

const HISTORY_STORAGE_KEY = "aiStudyAssistantHistory";
const THEME_STORAGE_KEY = "aiStudyAssistantTheme";

/* =========================================================
2. DOM ELEMENTS
========================================================= */

const questionForm = document.getElementById("questionForm");

const subjectSelect = document.getElementById("subjectSelect");

const questionInput = document.getElementById("questionInput");

const questionCounter = document.getElementById("questionCounter");

const askButton = document.getElementById("askButton");

const clearQuestionBtn = document.getElementById("clearQuestionBtn");

const answerSection = document.getElementById("answerSection");

const answerSubject = document.getElementById("answerSubject");

const answerContent = document.getElementById("answerContent");

const answerLoading = document.getElementById("answerLoading");

const copyAnswerBtn = document.getElementById("copyAnswerBtn");

const historyList = document.getElementById("historyList");

const historyEmpty = document.getElementById("historyEmpty");

const historyCount = document.getElementById("historyCount");

const historySearch = document.getElementById("historySearch");

const clearHistoryBtn = document.getElementById("clearHistoryBtn");

const themeToggle = document.getElementById("themeToggle");

const themeIcon = document.getElementById("themeIcon");

/* =========================================================
3. APPLICATION STATE
========================================================= */

let studyHistory = [];

let currentAnswer = "";

/* =========================================================
4. INITIALIZE APPLICATION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


loadTheme();

loadHistory();

updateQuestionCounter();

renderHistory();


});

/* =========================================================
5. THEME / DARK MODE
========================================================= */

function loadTheme() {


const savedTheme =
    localStorage.getItem(THEME_STORAGE_KEY);

if (savedTheme === "dark") {

    document.body.classList.add("dark-mode");

    updateThemeIcon(true);

} else {

    document.body.classList.remove("dark-mode");

    updateThemeIcon(false);

}


}

function toggleTheme() {


const isDarkMode =
    document.body.classList.toggle("dark-mode");

localStorage.setItem(
    THEME_STORAGE_KEY,
    isDarkMode ? "dark" : "light"
);

updateThemeIcon(isDarkMode);


}

function updateThemeIcon(isDarkMode) {


if (!themeIcon) {
    return;
}

if (isDarkMode) {

    themeIcon.className =
        "bi bi-sun-fill";

    themeToggle.setAttribute(
        "title",
        "Switch to light mode"
    );

    themeToggle.setAttribute(
        "aria-label",
        "Switch to light mode"
    );

} else {

    themeIcon.className =
        "bi bi-moon-stars-fill";

    themeToggle.setAttribute(
        "title",
        "Switch to dark mode"
    );

    themeToggle.setAttribute(
        "aria-label",
        "Switch to dark mode"
    );

}


}

if (themeToggle) {


themeToggle.addEventListener(
    "click",
    toggleTheme
);


}

/* =========================================================
6. QUESTION CHARACTER COUNTER
========================================================= */

function updateQuestionCounter() {


if (!questionInput || !questionCounter) {
    return;
}

const currentLength =
    questionInput.value.length;

const maxLength =
    questionInput.getAttribute("maxlength") || 500;

questionCounter.textContent =
    `${currentLength} / ${maxLength}`;


}

if (questionInput) {


questionInput.addEventListener(
    "input",
    updateQuestionCounter
);


}

/* =========================================================
7. CLEAR QUESTION
========================================================= */

function clearQuestion() {


if (!questionInput) {
    return;
}

questionInput.value = "";

updateQuestionCounter();

questionInput.focus();


}

if (clearQuestionBtn) {


clearQuestionBtn.addEventListener(
    "click",
    clearQuestion
);


}

/* =========================================================
8. QUESTION FORM SUBMISSION
========================================================= */

if (questionForm) {


questionForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();

        const subject =
            subjectSelect.value.trim();

        const question =
            questionInput.value.trim();


        /* Validation */

        if (!subject) {

            alert("Please select a subject.");

            subjectSelect.focus();

            return;
        }


        if (!question) {

            alert("Please enter your question.");

            questionInput.focus();

            return;
        }


        /* Loading */

        setAskButtonLoading(true);

        showAnswerLoading();


        try {

            const answer =
                await generateDemoAnswer(
                    subject,
                    question
                );


            displayAnswer(
                subject,
                answer
            );


            saveToHistory(
                subject,
                question,
                answer
            );


            renderHistory();


        } catch (error) {

            console.error(
                "AI Study Assistant Error:",
                error
            );

            showAnswerError();

        } finally {

            setAskButtonLoading(false);

        }

    }
);


}

/* =========================================================
9. DEMO ANSWER GENERATOR
========================================================= */

async function generateDemoAnswer(
subject,
question
) {


await delay(900);

const lowerQuestion =
    question.toLowerCase();


/* Python */

if (subject === "Python") {

    if (
        lowerQuestion.includes("variable")
    ) {

        return `
            <h3>What is a Variable in Python?</h3>

            <p>
                A variable in Python is a name used
                to store a value.
            </p>

            <p>
                Example:
            </p>

            <pre><code>name = "Sam"


age = 18</code></pre>


            <p>
                Here, <strong>name</strong> stores
                a string and <strong>age</strong>
                stores an integer.
            </p>
        `;
    }


    if (
        lowerQuestion.includes("loop")
    ) {

        return `
            <h3>What is a Loop in Python?</h3>

            <p>
                A loop is used to execute a block
                of code repeatedly.
            </p>

            <p>
                Python mainly uses
                <strong>for</strong> and
                <strong>while</strong> loops.
            </p>

            <pre><code>for i in range(5):
print(i)</code></pre>
        `;
    }


    return `
        <h3>Python</h3>

        <p>
            You asked:
            <strong>${escapeHTML(question)}</strong>
        </p>

        <p>
            This is a demo response for the Python
            subject.
        </p>

        <p>
            Try asking:
            <strong>What is a variable?</strong>
            or
            <strong>What is a loop?</strong>
        </p>
    `;
}


/* C */

if (subject === "C") {

    if (
        lowerQuestion.includes("variable")
    ) {

        return `
            <h3>Variables in C</h3>

            <p>
                A variable in C is a named memory
                location used to store a value.
            </p>

            <pre><code>int age = 18;


float marks = 85.5;</code></pre>


            <p>
                Every variable in C has a data type.
            </p>
        `;
    }


    if (
        lowerQuestion.includes("loop")
    ) {

        return `
            <h3>Loops in C</h3>

            <p>
                Loops are used to execute statements
                repeatedly.
            </p>

            <ul>
                <li>for loop</li>
                <li>while loop</li>
                <li>do-while loop</li>
            </ul>

            <pre><code>for(int i = 0; i < 5; i++)


{
printf("%d", i);
}</code></pre>
`;
}


    return `
        <h3>C Programming</h3>

        <p>
            You asked:
            <strong>${escapeHTML(question)}</strong>
        </p>

        <p>
            This is currently a demo response.
        </p>
    `;
}


/* HTML */

if (subject === "HTML") {

    if (
        lowerQuestion.includes("html")
    ) {

        return `
            <h3>What is HTML?</h3>

            <p>
                HTML stands for
                <strong>HyperText Markup Language</strong>.
            </p>

            <p>
                HTML is used to create and structure
                content on web pages.
            </p>

            <pre><code>&lt;h1&gt;Hello World&lt;/h1&gt;</code></pre>
        `;
    }


    if (
        lowerQuestion.includes("tag")
    ) {

        return `
            <h3>What is an HTML Tag?</h3>

            <p>
                An HTML tag is used to define an
                element on a web page.
            </p>

            <pre><code>&lt;p&gt;This is a paragraph.&lt;/p&gt;</code></pre>
        `;
    }


    return `
        <h3>HTML</h3>

        <p>
            You asked:
            <strong>${escapeHTML(question)}</strong>
        </p>

        <p>
            This is currently a demo response.
        </p>
    `;
}


/* Science */

if (subject === "Science") {

    return `
        <h3>Science</h3>

        <p>
            You asked:
            <strong>${escapeHTML(question)}</strong>
        </p>

        <p>
            This is currently a demo response.
        </p>
    `;
}


return `
    <p>
        Please select a valid subject.
    </p>
`;


}

/* =========================================================
10. DELAY
========================================================= */

function delay(milliseconds) {


return new Promise(
    resolve =>
        setTimeout(
            resolve,
            milliseconds
        )
);


}

/* =========================================================
11. SHOW LOADING
========================================================= */

function showAnswerLoading() {


answerContent.classList.add("d-none");

answerLoading.classList.remove("d-none");

answerSubject.textContent =
    "Thinking...";


}

/* =========================================================
12. DISPLAY ANSWER
========================================================= */

function displayAnswer(
subject,
answer
) {


answerLoading.classList.add("d-none");

answerContent.classList.remove("d-none");

answerSubject.textContent =
    subject;

answerContent.innerHTML =
    answer;

currentAnswer =
    answerContent.innerText;

answerSection.scrollIntoView({
    behavior: "smooth",
    block: "nearest"
});


}

/* =========================================================
13. ERROR
========================================================= */

function showAnswerError() {


answerLoading.classList.add("d-none");

answerContent.classList.remove("d-none");

answerSubject.textContent =
    "Error";

answerContent.innerHTML = `
    <div class="text-center py-4">

        <i
            class="bi bi-exclamation-circle text-danger"
            style="font-size: 30px;"
        ></i>

        <p class="mt-2 mb-0">
            Something went wrong.
            Please try again.
        </p>

    </div>
`;


}

/* =========================================================
14. ASK BUTTON LOADING
========================================================= */

function setAskButtonLoading(
isLoading
) {


if (!askButton) {
    return;
}

if (isLoading) {

    askButton.disabled = true;

    askButton.innerHTML = `
        <span
            class="spinner-border spinner-border-sm me-2"
        ></span>

        Thinking...
    `;

} else {

    askButton.disabled = false;

    askButton.innerHTML = `
        <i class="bi bi-stars"></i>

        <span>
            Ask Question
        </span>
    `;
}


}

/* =========================================================
15. HISTORY
========================================================= */

function saveToHistory(
subject,
question,
answer
) {


const historyItem = {

    id:
        Date.now().toString(),

    subject:
        subject,

    question:
        question,

    answer:
        answer,

    date:
        new Date().toISOString()

};


studyHistory.unshift(
    historyItem
);


localStorage.setItem(
    HISTORY_STORAGE_KEY,
    JSON.stringify(studyHistory)
);


}

function loadHistory() {


const savedHistory =
    localStorage.getItem(
        HISTORY_STORAGE_KEY
    );


if (!savedHistory) {

    studyHistory = [];

    return;
}


try {

    studyHistory =
        JSON.parse(savedHistory);

    if (!Array.isArray(studyHistory)) {
        studyHistory = [];
    }

} catch (error) {

    console.error(
        "Could not load history:",
        error
    );

    studyHistory = [];
}


}

function persistHistory() {


localStorage.setItem(
    HISTORY_STORAGE_KEY,
    JSON.stringify(studyHistory)
);


}

/* =========================================================
16. RENDER HISTORY
========================================================= */

function renderHistory(
searchTerm = ""
) {


if (!historyList) {
    return;
}


const oldItems =
    historyList.querySelectorAll(
        ".history-item"
    );


oldItems.forEach(
    item => item.remove()
);


const normalizedSearch =
    searchTerm
        .trim()
        .toLowerCase();


const filteredHistory =
    studyHistory.filter(
        item => {

            if (!normalizedSearch) {
                return true;
            }

            return (
                item.question
                    .toLowerCase()
                    .includes(normalizedSearch)
                ||
                item.subject
                    .toLowerCase()
                    .includes(normalizedSearch)
            );
        }
    );


if (historyCount) {

    historyCount.textContent =
        studyHistory.length;
}


if (filteredHistory.length === 0) {

    historyEmpty.classList.remove(
        "d-none"
    );

    return;
}


historyEmpty.classList.add(
    "d-none"
);


filteredHistory.forEach(
    item => {

        const wrapper =
            document.createElement("div");

        wrapper.className =
            "history-item";

        wrapper.dataset.id =
            item.id;


        wrapper.innerHTML = `

            <div class="history-item-top">

                <span class="history-subject">
                    ${escapeHTML(item.subject)}
                </span>

                <span class="history-date">
                    ${formatDate(item.date)}
                </span>

            </div>

            <p class="history-question">
                ${escapeHTML(item.question)}
            </p>

        `;


        wrapper.addEventListener(
            "click",
            () => openHistoryItem(item.id)
        );


        historyList.appendChild(
            wrapper
        );

    }
);


}

/* =========================================================
17. OPEN HISTORY
========================================================= */

function openHistoryItem(id) {


const item =
    studyHistory.find(
        historyItem =>
            historyItem.id === id
    );


if (!item) {
    return;
}


displayAnswer(
    item.subject,
    item.answer
);


subjectSelect.value =
    item.subject;

questionInput.value =
    item.question;

updateQuestionCounter();


}

/* =========================================================
18. CLEAR HISTORY
========================================================= */

function clearAllHistory() {


if (studyHistory.length === 0) {

    alert("There is no history to clear.");

    return;
}


if (
    !confirm(
        "Are you sure you want to delete all question history?"
    )
) {
    return;
}


studyHistory = [];

localStorage.removeItem(
    HISTORY_STORAGE_KEY
);

renderHistory();

answerSubject.textContent =
    "Ready to help";

answerContent.innerHTML = `
    <div class="answer-placeholder">

        <i class="bi bi-lightbulb"></i>

        <p class="mb-0">
            Your AI-generated answer will appear here.
        </p>

    </div>
`;

currentAnswer = "";


}

if (clearHistoryBtn) {


clearHistoryBtn.addEventListener(
    "click",
    clearAllHistory
);


}

/* =========================================================
19. SEARCH HISTORY
========================================================= */

if (historySearch) {


historySearch.addEventListener(
    "input",
    function () {

        renderHistory(
            historySearch.value
        );

    }
);


}

/* =========================================================
20. COPY ANSWER
========================================================= */

if (copyAnswerBtn) {


copyAnswerBtn.addEventListener(
    "click",
    async function () {

        if (!currentAnswer) {

            alert(
                "There is no answer to copy."
            );

            return;
        }


        try {

            await navigator.clipboard.writeText(
                currentAnswer
            );

            const originalHTML =
                copyAnswerBtn.innerHTML;

            copyAnswerBtn.innerHTML = `
                <i class="bi bi-check2"></i>
                <span class="d-none d-sm-inline">
                    Copied
                </span>
            `;

            setTimeout(
                () => {

                    copyAnswerBtn.innerHTML =
                        originalHTML;

                },
                1500
            );

        } catch (error) {

            console.error(
                "Copy failed:",
                error
            );

            alert(
                "Unable to copy the answer."
            );
        }

    }
);


}

/* =========================================================
21. DATE
========================================================= */

function formatDate(
dateString
) {


const date =
    new Date(dateString);


if (Number.isNaN(date.getTime())) {
    return "";
}


const now =
    new Date();


if (
    date.toDateString() ===
    now.toDateString()
) {

    return date.toLocaleTimeString(
        [],
        {
            hour: "2-digit",
            minute: "2-digit"
        }
    );

}


return date.toLocaleDateString(
    [],
    {
        day: "2-digit",
        month: "short"
    }
);


}

/* =========================================================
22. ESCAPE HTML
========================================================= */

function escapeHTML(text) {


const element =
    document.createElement("div");

element.textContent =
    text;

return element.innerHTML;


}
