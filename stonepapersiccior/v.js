let userscore = 0;
let compscore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userscorepara = document.querySelector("#user-score");
const compscorepara = document.querySelector("#comp-score");

const gencompchoice = () => {
    const options = ["rock", "paper", "scissors"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
};

const drawgame = () => {
    msg.innerText = "Game was a draw, play again!";
    msg.style.backgroundColor = "yellow"; // Draw background
};

const showwiner = (userwin, userchoice, compchoice) => {
    if (userwin) {
        userscore++;
        userscorepara.innerText = userscore;
        msg.innerText = `You win! ${userchoice} beats ${compchoice}`;
        msg.style.backgroundColor = "green";
    } else {
        compscore++;
        compscorepara.innerText = compscore;  // Corrected: updating compscorepara
        msg.innerText = `You lose! ${compchoice} beats ${userchoice}`;  // Corrected message
        msg.style.backgroundColor = "red";
    }
};

const playgame = (userchoice) => {
    console.log("User choice = ", userchoice);
    const compchoice = gencompchoice();
    console.log("Comp choice = ", compchoice);

    if (userchoice === compchoice) {
        drawgame();
    } else {
        let userwin = false; // Assume the user doesn't win
        // Logic for checking user win
        if (userchoice === "rock" && compchoice === "scissors") {
            userwin = true;
        } else if (userchoice === "paper" && compchoice === "rock") {
            userwin = true;
        } else if (userchoice === "scissors" && compchoice === "paper") {
            userwin = true;
        }
        showwiner(userwin, userchoice, compchoice);
    }
};

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userchoice = choice.getAttribute("id");
        playgame(userchoice);
    });
});
