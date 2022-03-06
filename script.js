// Array Of Words
const words = [
    "hello",
    "programming",
    "code",
    "javascript",
    "town",
    "country",
    "testing",
    "youtube",
    "linkedin",
    "twitter",
    "github",
    "leetcode",
    "internet",
    "python",
    "scale",
    "destructuring",
    "paradigm",
    "styling",
    "cascade",
    "documentation",
    "coding",
    "funny",
    "working",
    "dependencies",
    "task",
    "runners",
    "rules",
    "test",
    "rust",
    "playing"
];

// Setting Levels
const lvls = {
    "Easy": 5,
    "Normal": 3,
    "Hard": 2
};

// Default Level
let defaultLevelName = "Normal";
let defaultLevelSeconds = lvls[defaultLevelName];

// Catch Selectors
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let startButton = document.querySelector(".start");
let theWord = document.querySelector(".the-word");
let input = document.querySelector(".input");
let upcomingWords = document.querySelector(".upcoming-words");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");

// Setting Level Name + Seconds + Score
lvlNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = words.length;

// Disable Paste Event
input.onpaste = function () {
    return false;
}

// Start Game
startButton.onclick = function () {
    this.remove();
    input.focus();

    // Generate Word Function
    genWords ();
}

function genWords () {
    // Get Random Word From Array
    let randomWord = words[Math.floor(Math.random() * words.length)];
    // Get Word Index
    let wordIndex = words.indexOf(randomWord);
    // Remove Word From Array
    words.splice(wordIndex, 1);
    // Show The Random Word
    theWord.innerHTML = randomWord;
    // Empty Upcoming Words
    upcomingWords.innerHTML = "";
    // Generate Word
    for (let i = 0; i < words.length; i++) {
        // Create Div Element
        let div = document.createElement("div");
        let txt = document.createTextNode(words[i]);
        div.appendChild(txt);
        upcomingWords.appendChild(div);
    }
    // Call Start Play Function
    startPlay ();
}

function startPlay () {
    timeLeftSpan.innerHTML = defaultLevelSeconds;
    let start = setInterval(() => {
        timeLeftSpan.innerHTML--;
        if(timeLeftSpan.innerHTML === "0") {
            // Stop Timer
            clearInterval(start);
            // Compare Words
            if(theWord.innerHTML.toLocaleLowerCase() === input.value.toLocaleLowerCase()) {
                // Empty Input Field
                input.value = "";
                // Increase Score
                scoreGot.innerHTML++;
                if(words.length > 0) {
                    // Call Generate Word Function
                    genWords ();
                }else {
                    let span = document.createElement("span");
                    span.className = "good";
                    let spanText = document.createTextNode("You Win");
                    span.appendChild(spanText);
                    finishMessage.appendChild(span);
                    // Remove Upcoming Words Box
                    upcomingWords.remove();
                }
            }else {
                let span = document.createElement("span");
                span.className = "bad";
                let spanText = document.createTextNode("Game Over");
                span.appendChild(spanText);
                finishMessage.appendChild(span);
            }
        }
    }, 1000)
}