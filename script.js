
document.addEventListener('contextmenu', function (event) {
    event.preventDefault();
});

const lowerBound = 1000000;
const upperBound = 4499999;
const startButton = document.getElementById('startButton');
let prizeDisplayElement = document.getElementById("prizeDisplay");
let firstPrizeElement = document.getElementById("firstPrize");
let secondPrizeElement = document.getElementById("secondPrize");
let thirdPrizeElement = document.getElementById("thirdPrize");
let jackpotPrizesElement = document.getElementById("jackpotPrizes");
let luckyPrizesElement = document.getElementById("luckyPrizes");
let giftPrizesElement = document.getElementById("giftPrizes");
let consolationPrizesElement = document.getElementById("consolationPrizes");
let participationPrizesElement = document.getElementById("participationPrizes");
let twoDigitDelightPrizesElement = document.getElementById("twoDigitDelightPrizes");
let winningCategories = [];
let prizeType = [
    "firstPrize",
    "secondPrize",
    "thirdPrize",
    "jackpotPrizes",
    "luckyPrizes",
    "giftPrizes",
    "consolationPrizes",
    "participationPrizes",
    "twoDigitDelightPrizes"
];

let prizeMap = new Map();

var totalWinnings = 0;
var timeElapsed = 0;
var betNumber;
var haventjackpot = true;
var allWinningNumbers;

// Define the prize categories with their weights (quantities)
const prizes = new Map([
    ["First Prize", 2300000],
    ["Second Prize", 500000],
    ["Third Prize", 250000],
    ["Jackpot Prizes", 10000],
    ["Lucky Prizes", 5000],
    ["Gift Prizes", 3000],
    ["Consolation Prizes", 2000],
    ["Participation Prizes", 1000],
    ["Two-Digit Delight Prizes", 6]
]);

document.getElementById('digitInput').addEventListener('input', function (e) {
    this.value = this.value.replace(/\D/g, ''); // Remove non-digit characters
    if (this.value.length > 7) {
        this.value = this.value.slice(0, 7); // Ensure no more than 7 digits
    }
    isWithinRange(this.value);
})

function getBetNumber() {
    let inputField = document.getElementById("digitInput");
    if (inputField.value) {
        betNumber = inputField.value;
    }
    else betNumber = getRandomNumber();
}


function startCounter() {
    let timeDisplayElement = document.getElementById("timeDisplay");
    showWhenStart.style.display = 'block'; // directly set to 'block'


    const intervalId = setInterval(function () {

        let jackpotCheck = document.getElementById("jackpotCheck").checked;
        haventjackpot = jackpotCheck;

        if (timeElapsed >= 12) {
            let years = Math.floor(timeElapsed / 12);
            let months = timeElapsed % 12;

            if (months === 0) {
                timeDisplayElement.textContent = `Time Elapsed: ${years} year${years > 1 ? 's' : ''}`;
            } else {
                timeDisplayElement.textContent = `Time Elapsed: ${years} year${years > 1 ? 's' : ''} and ${months} month${months > 1 ? 's' : ''}`;
            }
        } else {
            timeDisplayElement.textContent = `Time Elapsed: ${timeElapsed} month${timeElapsed > 1 ? 's' : ''}`;
        }

        winningCategories = [];

        getBetNumber();

        allWinningNumbers = new Map([
            ["First Prize", [generateWinningNumbers(1, 1000000, 4499999)]],
            ["Second Prize", [generateWinningNumbers(1, 1000000, 4499999)]],
            ["Third Prize", [generateWinningNumbers(1, 1000000, 4499999)]],
            ["Jackpot Prizes", [generateWinningNumbers(10, 1000000, 4499999)]],
            ["Lucky Prizes", [generateWinningNumbers(10, 1000000, 4499999)]],
            ["Gift Prizes", [generateWinningNumbers(30, 1000000, 4499999)]],
            ["Consolation Prizes", [generateWinningNumbers(30, 1000000, 4499999)]],
            ["Participation Prizes", [generateWinningNumbers(50, 1000000, 4499999)]],
            ["Two-Digit Delight Prizes", [generateTwoDigitWinningNumbers(9)]]
        ]);

        checkIfWon(3929483);
        totalWinnings = totalWinnings - 3;
        // Display results
        if (winningCategories.length > 0) {

            for (let category of winningCategories) {
                var prizeAmountHolder = 0;

                switch (category) {
                    case "First Prize":
                        if (prizeMap.get(prizeType[0])) {
                            prizeAmountHolder = prizeMap.get(prizeType[0]) + prizes.get(category);
                        }
                        else { prizeAmountHolder = prizes.get(category); }
                        prizeMap.set(prizeType[0], prizeAmountHolder);
                        totalWinnings = totalWinnings + prizes.get(category);
                        prizeAmountHolder = 0;
                        firstPrizeElement.textContent = `First Prize: $${prizeMap.get(prizeType[0])}`;
                        haventjackpot = false;
                        break;
                    case "Second Prize":
                        if (prizeMap.get(prizeType[1])) {
                            prizeAmountHolder = prizeMap.get(prizeType[1]) + prizes.get(category);
                        }
                        else { prizeAmountHolder = prizes.get(category); }
                        prizeMap.set(prizeType[1], prizeAmountHolder);
                        totalWinnings = totalWinnings + prizes.get(category);
                        prizeAmountHolder = 0;
                        secondPrizeElement.textContent = `Second Prize: $${prizeMap.get(prizeType[1])}`;
                        break;
                    case "Third Prize":
                        if (prizeMap.get(prizeType[2])) {
                            prizeAmountHolder = prizeMap.get(prizeType[2]) + prizes.get(category);
                        }
                        else { prizeAmountHolder = prizes.get(category); }
                        prizeMap.set(prizeType[2], prizeAmountHolder);
                        totalWinnings = totalWinnings + prizes.get(category);
                        prizeAmountHolder = 0;
                        thirdPrizeElement.textContent = `Third Prize: $${prizeMap.get(prizeType[2])}`;
                        break;
                    case "Jackpot Prizes":
                        if (prizeMap.get(prizeType[3])) {
                            prizeAmountHolder = prizeMap.get(prizeType[3]) + prizes.get(category);
                        }
                        else { prizeAmountHolder = prizes.get(category); }
                        prizeMap.set(prizeType[3], prizeAmountHolder);
                        totalWinnings = totalWinnings + prizes.get(category);
                        prizeAmountHolder = 0;
                        jackpotPrizesElement.textContent = `Jackpot Prizes: $${prizeMap.get(prizeType[3])}`;
                        break;
                    case "Lucky Prizes":
                        if (prizeMap.get(prizeType[4])) {
                            prizeAmountHolder = prizeMap.get(prizeType[4]) + prizes.get(category);
                        }
                        else { prizeAmountHolder = prizes.get(category); }
                        prizeMap.set(prizeType[4], prizeAmountHolder);
                        totalWinnings = totalWinnings + prizes.get(category);
                        prizeAmountHolder = 0;
                        luckyPrizesElement.textContent = `Lucky Prizes: $${prizeMap.get(prizeType[4])}`;
                        break;
                    case "Gift Prizes":
                        if (prizeMap.get(prizeType[5])) {
                            prizeAmountHolder = prizeMap.get(prizeType[5]) + prizes.get(category);
                        }
                        else { prizeAmountHolder = prizes.get(category); }
                        prizeMap.set(prizeType[5], prizeAmountHolder);
                        totalWinnings = totalWinnings + prizes.get(category);
                        prizeAmountHolder = 0;
                        giftPrizesElement.textContent = `Gift Prizes: $${prizeMap.get(prizeType[5])}`;
                        break;
                    case "Consolation Prizes":
                        if (prizeMap.get(prizeType[6])) {
                            prizeAmountHolder = prizeMap.get(prizeType[6]) + prizes.get(category);
                        }
                        else { prizeAmountHolder = prizes.get(category); }
                        prizeMap.set(prizeType[6], prizeAmountHolder);
                        totalWinnings = totalWinnings + prizes.get(category);
                        prizeAmountHolder = 0;
                        consolationPrizesElement.textContent = `Consolation Prizes: $${prizeMap.get(prizeType[6])}`;
                        break;
                    case "Participation Prizes":
                        if (prizeMap.get(prizeType[7])) {
                            prizeAmountHolder = prizeMap.get(prizeType[7]) + prizes.get(category);
                        }
                        else { prizeAmountHolder = prizes.get(category); }
                        prizeMap.set(prizeType[7], prizeAmountHolder);
                        totalWinnings = totalWinnings + prizes.get(category);
                        prizeAmountHolder = 0;
                        participationPrizesElement.textContent = `Participation Prizes: $${prizeMap.get(prizeType[7])}`;
                        break;
                    case "Two-Digit Delight Prizes":
                        if (prizeMap.get(prizeType[8])) {
                            prizeAmountHolder = prizeMap.get(prizeType[8]) + prizes.get(category);
                        }
                        else { prizeAmountHolder = prizes.get(category); }
                        prizeMap.set(prizeType[8], prizeAmountHolder);
                        totalWinnings = totalWinnings + prizes.get(category);
                        prizeAmountHolder = 0;
                        twoDigitDelightPrizesElement.textContent = `Two-Digit Delight Prizes: $${prizeMap.get(prizeType[8])}`;
                        break;
                }
            }
        }

        if (totalWinnings > 0) {
            prizeDisplayElement.textContent = `Your Winnings: $${totalWinnings}`;
            prizeDisplayElement.style.color = 'green';
        } else if (totalWinnings < 0) {
            prizeDisplayElement.textContent = `Your Losses: $${totalWinnings}`;
            prizeDisplayElement.style.color = 'red';
        } else {
            prizeDisplayElement.textContent = `Your Winnings: $${totalWinnings}`;
            prizeDisplayElement.style.color = 'black'; // or any default color for zero
        }

        // Example condition to stop the counter after reaching a certain value
        if (!haventjackpot) {
            clearInterval(intervalId); // Stop the interval
        }

        timeElapsed++;
    }, 1); // Adjust interval time to 1 second for clarity
}

function isWithinRange(input) {
    if (input.length === 7) {
        const number = parseInt(input, 10);
        const errorMessage = document.getElementById('error-message');
        if (number < 1000000 || number > 4499999) {
            errorMessage.style.display = 'block';
        } else {
            errorMessage.style.display = 'none';
        }
    }
    else {
        errorMessage.style.display = 'none';
    }
}

function generateWinningNumbers(quantity, min, max) {
    let winningNumbers = [];
    while (winningNumbers.length < quantity) {
        let number = Math.floor(Math.random() * (max - min + 1)) + min;
        if (!winningNumbers.includes(number)) {
            winningNumbers.push(number);
        }
    }
    return winningNumbers;
}

function generateTwoDigitWinningNumbers(quantity) {
    return generateWinningNumbers(quantity, 0, 99);
}

function getRandomNumber() {
    // Generate a random number within the specified range
    let randomNum = Math.floor(Math.random() * (upperBound - lowerBound + 1)) + lowerBound;
    return randomNum;
}

function checkIfWon(betNumber) {
    last_two_digits = betNumber % 100
    allWinningNumbers.forEach((winningNumbers, key) => {

        for (let number of winningNumbers[0]) {
            if (number == betNumber) {
                winningCategories.push(key);
            }
            else if (key == "Two-Digit Delight Prizes") {
                if (number == last_two_digits) {
                    winningCategories.push(key);
                }
            }


        }
    });

}
