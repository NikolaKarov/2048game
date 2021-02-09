(() => {
  const startBtn = document.getElementById("start");
  const gameOverDiv = document.getElementById("gameOver");
  const tryAgainBtn = document.getElementById("tryAgain");
  const nameField = document.getElementById("name");
  const submitBtn = document.getElementById("button");
  const top10List = Array.from(document.getElementsByClassName("top10"));
  const lastScore = document.getElementById("last");
  const url =
    "https://project-4923839674567845526-default-rtdb.firebaseio.com/-MRZT23lZKAvRCccFpcZ/.json";
  startBtn.addEventListener("click", start);
  tryAgainBtn.addEventListener("click", start);
  submitBtn.addEventListener("click", register);
  let boxes = Array.from(document.querySelectorAll(".box"));
  let totalSum = 0;
  let totalSumNew = 0;
  let counter = 0;
  let hallOfFame = [];
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      hallOfFame = data.slice();
    });
  let colorScheme = {
    0: "rgb(243, 189, 189)",
    2: "rgb(243, 202, 189)",
    4: "rgb(243, 222, 189)",
    8: "rgb(243, 242, 189)",
    16: "rgb(224, 243, 189)",
    32: "rgb(189, 243, 194)",
    64: "rgb(189, 243, 230)",
    128: "rgb(189, 221, 243)",
    256: "rgb(190, 189, 243)",
    512: "rgb(226, 189, 243)",
    1024: "rgb(243, 189, 216)",
    2048: "rgb(243, 189, 198)",
    4096: "rgb(197, 197, 197)",
  };
  function checkForZeros(boxes) {
    boxes.forEach((x) => {
      if (x.textContent == 0) {
        return (x.style.display = "none");
      } else {
        return (x.style.display = "block");
      }
    });
  }

  function checkForDoubles(arr) {
    // flagForCombine = false;
    let current = arr;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        if (current[i][j].textContent != "0") {
          if (current[i][j].textContent === current[i][j + 1].textContent) {
            current[i][j].textContent *= 2;
            current[i][j + 1].textContent = 0;
            // flagForCombine = true;
          } else if (
            current[i][j + 2] !== undefined &&
            current[i][j].textContent === current[i][j + 2].textContent &&
            current[i][j + 1].textContent == "0"
          ) {
            current[i][j].textContent *= 2;
            current[i][j + 2].textContent = 0;
            // flagForCombine = true;
          } else if (
            current[i][j + 3] !== undefined &&
            current[i][j].textContent === current[i][j + 3].textContent &&
            current[i][j + 1].textContent == "0" &&
            current[i][j + 2].textContent == "0"
          ) {
            current[i][j].textContent *= 2;
            current[i][j + 3].textContent = 0;
            // flagForCombine = true;
          }
        }
      }
    }
    return current;
  }

  function checkForGaps(arr) {
    let output = arr;
    let current = output.map((x) => {
      return x.reduce((acc, curr, i, a) => {
        if (curr.textContent != "0") {
          acc.push(curr.textContent);
        }
        return acc;
      }, []);
    });
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        output[i][j].textContent = current[i][j] || "0";
      }
    }
    return output;
  }

  function generateNumbers(arr) {
    let output = arr.forEach((el) => {
      let box = el.textContent;
      if (box == "0") {
        let randomDigit = Math.random();
        let digit = 0;
        if (randomDigit > 0.6 && randomDigit <= 0.8) {
          digit = 2;
        } else if (randomDigit > 0.8) {
          digit = 4;
        }
        el.textContent = digit;
      }
    });
    return output;
  }

  function pressedKey(e) {
    totalSum = boxes
      .map((x) => x.textContent)
      .reduce((acc, curr) => acc + Number(curr), 0);
    switch (e.key) {
      case "ArrowUp":
        arrowUp();
        break;
      case "ArrowDown":
        arrowDown();
        break;
      case "ArrowRight":
        arrowRight();
        break;
      case "ArrowLeft":
        arrowLeft();
        break;
      default:
        break;
    }
    totalSumNew = boxes
      .map((x) => x.textContent)
      .reduce((acc, curr) => acc + Number(curr), 0);
    if (totalSum === totalSumNew) {
      counter++;
    } else {
      counter = 0;
    }
    if (counter === 10) {
      gameOver();
    }
  }

  function arrowUp() {
    let rowMatrix = [
      [boxes[12], boxes[8], boxes[4], boxes[0]],
      [boxes[13], boxes[9], boxes[5], boxes[1]],
      [boxes[14], boxes[10], boxes[6], boxes[2]],
      [boxes[15], boxes[11], boxes[7], boxes[3]],
    ];
    rowMatrix = checkForDoubles(rowMatrix);
    checkForZeros(boxes);
    rowMatrix = checkForGaps(rowMatrix);
    checkForZeros(boxes);
    // if (flagForCombine) {
    rowMatrix = generateNumbers([boxes[0], boxes[1], boxes[2], boxes[3]]);
    checkForZeros(boxes);
    // }
    adaptiveColor(boxes);
  }

  function arrowRight() {
    let rowMatrix = [
      [boxes[15], boxes[14], boxes[13], boxes[12]],
      [boxes[11], boxes[10], boxes[9], boxes[8]],
      [boxes[7], boxes[6], boxes[5], boxes[4]],
      [boxes[3], boxes[2], boxes[1], boxes[0]],
    ];
    rowMatrix = checkForDoubles(rowMatrix);
    checkForZeros(boxes);
    rowMatrix = checkForGaps(rowMatrix);
    checkForZeros(boxes);
    // if (flagForCombine) {
    rowMatrix = generateNumbers([boxes[12], boxes[8], boxes[4], boxes[0]]);
    checkForZeros(boxes);
    // }
    adaptiveColor(boxes);
  }

  function arrowDown() {
    let rowMatrix = [
      [boxes[3], boxes[7], boxes[11], boxes[15]],
      [boxes[2], boxes[6], boxes[10], boxes[14]],
      [boxes[1], boxes[5], boxes[9], boxes[13]],
      [boxes[0], boxes[4], boxes[8], boxes[12]],
    ];
    rowMatrix = checkForDoubles(rowMatrix);
    checkForZeros(boxes);
    rowMatrix = checkForGaps(rowMatrix);
    checkForZeros(boxes);
    // if (flagForCombine) {
    rowMatrix = generateNumbers([boxes[15], boxes[14], boxes[13], boxes[12]]);
    checkForZeros(boxes);
    // }
    adaptiveColor(boxes);
  }

  function arrowLeft() {
    let rowMatrix = [
      [boxes[0], boxes[1], boxes[2], boxes[3]],
      [boxes[4], boxes[5], boxes[6], boxes[7]],
      [boxes[8], boxes[9], boxes[10], boxes[11]],
      [boxes[12], boxes[13], boxes[14], boxes[15]],
    ];
    rowMatrix = checkForDoubles(rowMatrix);
    checkForZeros(boxes);
    rowMatrix = checkForGaps(rowMatrix);
    checkForZeros(boxes);
    // if (flagForCombine) {
    rowMatrix = generateNumbers([boxes[3], boxes[7], boxes[11], boxes[15]]);
    checkForZeros(boxes);
    // }
    adaptiveColor(boxes);
  }

  function adaptiveColor(boxes) {
    boxes.forEach((el) => {
      // el.style.filter = `brightness(${colorScheme[el.textContent]})`;
      el.style.backgroundColor = `${colorScheme[el.textContent]}`;
    });
  }

  function start() {
    populateHallOfFame();
    window.addEventListener("keydown", pressedKey);
    lastScore.textContent = "Last score:";
    startBtn.style.display = "none";
    tryAgainBtn.style.display = "none";
    gameOverDiv.style.display = "none";
    nameField.style.display = "none";
    submitBtn.style.display = "none";
    nameField.value = "";
    boxes.forEach((el) => {
      let randomDigit = Math.random();
      let digit = 0;
      if (randomDigit > 0.6 && randomDigit <= 0.8) {
        digit = 2;
      } else if (randomDigit > 0.8) {
        digit = 4;
      }
      el.textContent = digit;
    });
    checkForZeros(boxes);
  }

  function gameOver() {
    window.removeEventListener("keydown", pressedKey);
    gameOverDiv.style.display = "block";
    tryAgainBtn.style.display = "block";
    if (totalSumNew > hallOfFame[9][1]) {
      nameField.style.display = "block";
      submitBtn.style.display = "block";
    }
    lastScore.textContent += `${totalSumNew}`;
  }

  function register() {
    let winnerName = nameField.value;
    hallOfFame.push([winnerName, totalSumNew]);
    hallOfFame.sort((a, b) => b[1] - a[1]);
    hallOfFame = hallOfFame.slice(0, 10);
    fetch(url, { method: "PUT", body: JSON.stringify(hallOfFame) });
    nameField.style.display = "none";
    submitBtn.style.display = "none";
    populateHallOfFame();
  }

  function populateHallOfFame() {
    for (let i = 0; i < hallOfFame.length; i++) {
      if (hallOfFame[i][1] > 0) {
        top10List[i].textContent = `${hallOfFame[i][0]} : ${hallOfFame[i][1]}`;
      }
    }
  }
})();
