const startOrder = [
  [1, 7, 4],
  [2, 5, 3],
  [8, 6, 0],
];
const tagsWrapper = document.querySelector(".tags");
const startBtn = document.querySelector(".startBnt");
const overlay = document.querySelector(".overlay");
const winMessage = document.querySelector(".congratulation");
const restartBtns = document.querySelectorAll(".restart");

const winPattern = "123456780";

let currentOrder = JSON.parse(JSON.stringify(startOrder));

const addEvents = () => {
  const tags = document.querySelectorAll(".tag");
  tags.forEach((tag) => {
    tag.addEventListener("click", clickHandler);
  });
};

const isNextTo = ([elPosX, elPosY], [spacePosX, spacePosY]) => {
  return (
    (spacePosX === elPosX - 1 && spacePosY === elPosY) ||
    (spacePosX === elPosX + 1 && spacePosY === elPosY) ||
    (spacePosX === elPosX && spacePosY === elPosY - 1) ||
    (spacePosX === elPosX && spacePosY === elPosY + 1)
  );
};

const findPosition = (element) => {
  const coords = [];
  currentOrder.forEach((row, idx) => {
    const spaceIdx = row.findIndex((el) => el === element);
    if (spaceIdx !== -1) {
      coords[0] = spaceIdx;
      coords[1] = idx;
    }
  });
  return coords;
};

const isWinner = (currentResult) => winPattern === currentResult;

const renderTags = () => {
  currentOrder.flat().forEach((el) => {
    const classes = el === 0 ? "tag space" : "tag number";
    tagsWrapper.insertAdjacentHTML(
      "beforeend",
      `<div class="${classes}">${el}</div>`
    );
  });
};

const removeTags = () => {
  const tags = document.querySelectorAll(".tag");
  tags.forEach((tag) => {
    tagsWrapper.removeChild(tag);
  });
};

startBtn.addEventListener("click", () => {
  renderTags();
  addEvents();
  overlay.style.display = "none";
});

const clickHandler = (e) => {
  const [spaceX, spaceY] = findPosition(0);
  const [elPositionX, elPositionY] = findPosition(+e.target.textContent);
  if (isNextTo([elPositionX, elPositionY], [spaceX, spaceY])) {
    removeTags();
    currentOrder[spaceY][spaceX] = +e.target.textContent;
    currentOrder[elPositionY][elPositionX] = 0;
    renderTags();
    addEvents();
  }
  if (isWinner(currentOrder.join(""))) {
    winMessage.style.display = "flex";
  }
};

restartBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    removeTags();
    currentOrder = JSON.parse(JSON.stringify(startOrder));
    renderTags();
    addEvents();
    winMessage.style.display = "none";
  });
});
