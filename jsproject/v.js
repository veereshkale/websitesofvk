let boxes = document.querySelectorAll(".box");
let restbtn = document.querySelector("#rest");
let newgame = document.querySelector("#new-btn");
let messagecontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turn0 = true;

const winpatters = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const restgame = () => {
    turn0 = true;
    enablebox();
    messagecontainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked");
        if (turn0) {
            box.innerText = "O";
            turn0 = false;
        } else {
            box.innerText = "X";
            turn0 = true;
        }
        box.disabled = true;
        checkwinner();
    });
});

const disablebox = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enablebox = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showwinner = (winner) => {
    msg.innerText = `Congratulations, winner is ${winner}`;
    messagecontainer.classList.remove("hide");
    disablebox();
};

const checkwinner = () => {
    for (let pattern of winpatters) {
        let val1 = boxes[pattern[0]].innerText;
        let val2 = boxes[pattern[1]].innerText;
        let val3 = boxes[pattern[2]].innerText;

        if (val1 !== "" && val1 === val2 && val2 === val3) {
            console.log("winner", val1);
            showwinner(val1);
        }
    }
};

newgame.addEventListener("click", restgame);
restbtn.addEventListener("click", restgame);
