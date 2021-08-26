$(document).ready(function () {
  const options = [
    {
      name: "rock",
      symbol: "✊",
      defeats: ["lizard", "scissors"],
    },
    {
      name: "paper",
      symbol: "✋",
      defeats: ["rock", "spock"],
    },
    {
      name: "scissors",
      symbol: "✌️",
      defeats: ["paper", "lizard"],
    },
    {
      name: "lizard",
      symbol: "🦎",
      defeats: ["paper", "spock"],
    },
    {
      name: "spock",
      symbol: "🖖",
      defeats: ["scissors", "rock"],
    },
  ];

  const TIMER_DURATION = 3;

  $("[data-option]").mouseup(startGame);

  $("#playAgainBtn").mouseup(resetGame);

  function checkWin(option1, option2) {
    return option1.defeats.includes(option2.name);
  }

  function getOpponentOption() {
    const optionIndex = Math.floor(Math.random() * 5);
    return options[optionIndex];
  }

  function showResults(playerOption, opponentOption) {
    $("#playerHand").addClass("clear-rotate").text(playerOption.symbol);
    $("#opponentHand").addClass("clear-rotate").text(opponentOption.symbol);
    if (checkWin(playerOption, opponentOption)) {
      $("#gameText").text("You Win!");
    } else if (checkWin(opponentOption, playerOption)) {
      $("#gameText").text("You Lose!");
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
    $("[data-option]").hide();
    $("#optionText").hide();
    $("#gameResults").removeClass("hide");
    $("[data-hand]").effect(
      "shake",
      { direction: "up", times: 10, distance: 20 },
      3000
    );
    let timerInterval = setInterval(() => {
      $("#gameText").text(--timer);
    }, 1000);
    setTimeout(() => {
      clearInterval(timerInterval);
      showResults(playerOption, opponentOption);
    }, 3000);
    $("#playAgainBtn").removeClass("hide");
  }

  function resetGame() {
    $("[data-option]").show();
    $("#optionText").show();
    $("#gameResults").addClass("hide");
    $("#playAgainBtn").addClass("hide");
    $("#gameText").text(TIMER_DURATION);
    $("[data-hand]").removeClass("clear-rotate").text("👊");
  }
});
