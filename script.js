/* =========================================
   BIG OR SMALL - SENIOR KG GAME
   ========================================= */


/* =========================================
   10 QUESTIONS
   ========================================= */

const rounds = [

    {
        item: "boy",
        file: "boy.svg",
        target: "big"
    },

    {
        item: "umbrella",
        file: "umbrella.svg",
        target: "small"
    },

    {
        item: "bird",
        file: "bird.svg",
        target: "big"
    },

    {
        item: "ball",
        file: "ball.svg",
        target: "small"
    },

    {
        item: "flower",
        file: "flower.svg",
        target: "big"
    },

    {
        item: "cat",
        file: "cat.svg",
        target: "small"
    },

    {
        item: "kite",
        file: "kite.svg",
        target: "big"
    },

    {
        item: "apple",
        file: "apple.svg",
        target: "small"
    },

    {
        item: "car",
        file: "car.svg",
        target: "big"
    },

    {
        item: "butterfly",
        file: "butterfly.svg",
        target: "small"
    }

];



/* =========================================
   GAME VARIABLES
   ========================================= */

let index = 0;

let score = 0;

let locked = false;



/* =========================================
   GET ELEMENTS
   ========================================= */

const splash =
    document.getElementById("splash");

const startScreen =
    document.getElementById("startScreen");

const game =
    document.getElementById("game");

const endScreen =
    document.getElementById("endScreen");

const pair =
    document.getElementById("pair");

const instruction =
    document.getElementById("instruction");

const progress =
    document.getElementById("progress");

const scoreEl =
    document.getElementById("score");

const feedback =
    document.getElementById("feedback");

const confetti =
    document.getElementById("confetti");

const music =
    document.getElementById("music");

const correctSound =
    document.getElementById("correctSound");

const wrongSound =
    document.getElementById("wrongSound");



/* =========================================
   BACKGROUND MUSIC
   ========================================= */

function playMusic() {

    music.volume = 0.15;

    const playPromise =
        music.play();

    if (playPromise) {

        playPromise.catch(() => {});

    }

}



/* =========================================
   SHOW QUESTION
   ========================================= */

function render() {

    locked = false;


    const q =
        rounds[index];


    /* QUESTION TEXT */

    instruction.textContent =
        `Tap on the ${q.target} ${q.item}.`;


    /* PROGRESS */

    progress.textContent =
        `${index + 1} / 10`;


    /* CLEAR OLD OBJECTS */

    pair.innerHTML = "";


    /*
       Randomly place the big and small
       object on the left or right.
    */

    const sizes =
        Math.random() < 0.5
            ? ["big", "small"]
            : ["small", "big"];


    sizes.forEach(function(size) {


        const button =
            document.createElement("button");


        button.type =
            "button";


        button.className =
            `choice ${size}`;


        button.dataset.size =
            size;


        button.innerHTML = `

            <img
                src="assets/${q.file}"
                alt="${size} ${q.item}">

            <span class="label">
                ${size}
            </span>

        `;


        /*
           POINTER EVENT

           Works with:
           - Mouse
           - Touch
           - Android
           - iPhone/iPad
        */

        button.addEventListener(
            "pointerup",
            function(event) {

                event.preventDefault();

                check(size, button);

            }
        );


        pair.appendChild(button);


    });


    /*
       VOICE INSTRUCTION

       "Tap on the big boy."
    */

    setTimeout(function() {

        speak(
            `Tap on the ${q.target} ${q.item}.`
        );

    }, 220);

}



/* =========================================
   CONFETTI
   ========================================= */

function confettiBurst() {

    confetti.innerHTML = "";


    const colors = [

        "#ff6b6b",
        "#ffd43b",
        "#69db7c",
        "#4dabf7",
        "#cc5de8"

    ];


    for (
        let i = 0;
        i < 70;
        i++
    ) {


        const piece =
            document.createElement("div");


        piece.className =
            "piece";


        piece.style.left =
            Math.random() * 100 + "vw";


        piece.style.animationDelay =
            Math.random() * 0.2 + "s";


        piece.style.background =
            colors[i % colors.length];


        confetti.appendChild(piece);


    }


    setTimeout(function() {

        confetti.innerHTML = "";

    }, 1200);

}



/* =========================================
   CORRECT ANSWER
   ========================================= */

function showCorrect() {


    feedback.textContent =
        "✓";


    feedback.style.color =
        "#35a853";


    feedback.classList.remove(
        "hidden"
    );


    correctSound.currentTime =
        0;


    correctSound
        .play()
        .catch(() => {});


    confettiBurst();


    setTimeout(function() {

        feedback.classList.add(
            "hidden"
        );

    }, 850);

}



/* =========================================
   WRONG ANSWER
   ========================================= */

function showWrong() {


    feedback.textContent =
        "✕";


    feedback.style.color =
        "#e53935";


    feedback.classList.remove(
        "hidden"
    );


    wrongSound.currentTime =
        0;


    wrongSound
        .play()
        .catch(() => {});


    setTimeout(function() {

        feedback.classList.add(
            "hidden"
        );

    }, 800);

}



/* =========================================
   CHECK ANSWER
   ========================================= */

function check(size, button) {


    /*
       Prevent double tapping after
       a correct answer.
    */

    if (locked) {

        return;

    }


    const q =
        rounds[index];


    /* =====================================
       CORRECT
       ===================================== */

    if (size === q.target) {


        locked = true;


        score++;


        scoreEl.textContent =
            "⭐ " + score;


        button.classList.add(
            "selected"
        );


        speak(
            "Correct! Well done!"
        );


        showCorrect();


        /*
           Move to the next question
           after feedback.
        */

        setTimeout(function() {


            index++;


            if (
                index >= rounds.length
            ) {


                finish();


            } else {


                render();


            }


        }, 950);


    }


    /* =====================================
       WRONG
       ===================================== */

    else {


        /*
           Do NOT move to the next
           question.
        */

        button.classList.add(
            "wrong"
        );


        showWrong();


        speak(
            "Try again. Look carefully."
        );


        setTimeout(function() {

            button.classList.remove(
                "wrong"
            );

        }, 700);

    }

}



/* =========================================
   START GAME
   ========================================= */

function start() {


    startScreen.classList.add(
        "hidden"
    );


    endScreen.classList.add(
        "hidden"
    );


    game.classList.remove(
        "hidden"
    );


    index = 0;

    score = 0;


    scoreEl.textContent =
        "⭐ 0";


    /*
       Music starts after the child
       taps Start Game, which avoids
       mobile browser autoplay blocking.
    */

    playMusic();


    render();

}



/* =========================================
   FINISH GAME
   ========================================= */

function finish() {


    game.classList.add(
        "hidden"
    );


    endScreen.classList.remove(
        "hidden"
    );


    document.getElementById(
        "finalScore"
    ).textContent =
        `You scored ${score} out of 10!`;


    speak(
        `Great job! You scored ${score} out of 10.`
    );

}



/* =========================================
   START BUTTON
   ========================================= */

document
    .getElementById("startBtn")
    .addEventListener(
        "click",
        start
    );



/* =========================================
   PLAY AGAIN BUTTON
   ========================================= */

document
    .getElementById("againBtn")
    .addEventListener(
        "click",
        start
    );



/* =========================================
   HEAR BUTTON
   ========================================= */

document
    .getElementById("hearBtn")
    .addEventListener(
        "click",
        function() {


            const q =
                rounds[index];


            speak(
                `Tap on the ${q.target} ${q.item}.`
            );

        }
    );



/* =========================================
   5-SECOND INNOVINE SPLASH
   ========================================= */

window.addEventListener(
    "load",
    function() {


        setTimeout(
            function() {


                splash.style.display =
                    "none";


                startScreen.classList.remove(
                    "hidden"
                );


            },
            5000
        );

    }
);
