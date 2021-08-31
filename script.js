$(document).ready(function () {
  const options = [
    {
      name: "rock",
      symbol: "✊",
      defeats: [
        { name: "lizard", reason: "crushes" },
        { name: "scissors", reason: "crushes" },
      ],
    },
    {
      name: "paper",
      symbol: "✋",
      defeats: [
        { name: "rock", reason: "covers" },
        { name: "spock", reason: "disproves" },
      ],
    },
    {
      name: "scissors",
      symbol: "✌️",
      defeats: [
        { name: "paper", reason: "cuts" },
        { name: "lizard", reason: "decapitates" },
      ],
    },
    {
      name: "lizard",
      symbol: "🦎",
      defeats: [
        { name: "spock", reason: "poisons" },
        { name: "paper", reason: "eats" },
      ],
    },
    {
      name: "spock",
      symbol: "🖖",
      defeats: [
        { name: "scissors", reason: "smashes" },
        { name: "rock", reason: "vaporizes" },
      ],
    },
  ];

  const TIMER_DURATION = 3;

  $("[data-option]").mouseup(startGame);

  $("#playAgainBtn").mouseup(resetGame);

  function checkWin(option1, option2) {
    return option1.defeats.find((option) => option.name === option2.name);
  }

  function getOpponentOption() {
    const optionIndex = Math.floor(Math.random() * 5);
    return options[optionIndex];
  }

  function setResultDescription(winner, loser) {
    $("#resultDescription").text(
      `${winner.name} ${
        winner.defeats.find((option) => option.name === loser.name).reason
      } ${loser.name}`
    );
  }

  function showResults(playerOption, opponentOption) {
    $("#playerHand").addClass("clear-rotate").text(playerOption.symbol);
    $("#opponentHand").addClass("clear-rotate").text(opponentOption.symbol);
    if (checkWin(playerOption, opponentOption)) {
      $("#gameText").text("You Win!");
      setResultDescription(playerOption, opponentOption);
    } else if (checkWin(opponentOption, playerOption)) {
      $("#gameText").text("You Lose!");
      setResultDescription(opponentOption, playerOption);
    } else {
      $("#gameText").text("It's a Draw!");
    }
  }

  function startGame() {
    let timer = TIMER_DURATION;
    const playerOption = options.find(
      (option) => option.name === $(this).attr("data-option")
    );
    const opponentOption = getOpponentOption();
    $("#gameOptions").addClass("hide");
    $("#gameResults").removeClass("hide");
    $("#gameText").removeClass("hide");
    let timerInterval = setInterval(() => {
      $("#gameText").text(--timer);
    }, 1000);
    setTimeout(() => {
      clearInterval(timerInterval);
      showResults(playerOption, opponentOption);
      $("#playAgainBtn").removeClass("hide");
    }, 3000);
  }

  function resetGame() {
    $("#gameOptions").removeClass("hide");
    $("#gameText").addClass("hide");
    $("#gameResults").addClass("hide");
    $("#playAgainBtn").addClass("hide");
    $("#gameText").text(TIMER_DURATION);
    $("[data-hand]").removeClass("clear-rotate").text("👊");
    $("#resultDescription").text("");
  }
});
