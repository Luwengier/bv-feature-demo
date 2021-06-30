var describeArray = [
  { name: '左' },
  { name: '右' },
  { name: '前' },
  { name: '後' },
  { name: '上' },
  { name: '下' },
  { name: '急性' },
  { name: '慢性' },
  { name: '輕微' },
  { name: '重度' },
];

var organArray = [
  { name: '眼' },
  { name: '耳' },
  { name: '鼻' },
  { name: '嘴' },
  { name: '牙' },
  { name: '頭' },
  { name: '胸' },
  { name: '腰' },
  { name: '背' },
  { name: '肢' },
  { name: '心' },
  { name: '肝' },
  { name: '腎' },
  { name: '肺' },
  { name: '脾' },
  { name: '膽' },
  { name: '腸' },
  { name: '血' },
  { name: '屎' },
  { name: '尿' },
  { name: '道' },
  { name: '氣管' },
  { name: '黏膜' },
  { name: '患者' },
  { name: '有' },
];

var symptomArray = [
  { name: '腹瀉' },
  { name: '嘔吐' },
  { name: '倦怠' },
  { name: '嗜睡' },
  { name: '食慾差' },
  { name: '打噴嚏' },
  { name: '咳嗽' },
  { name: '發燒' },
  { name: '發炎' },
  { name: '感染' },
  { name: '衰竭' },
  { name: '黃疸' },
  { name: '出血' },
  { name: '脫臼' },
  { name: '骨折' },
  { name: '潰瘍' },
  { name: '狂犬病' },
  { name: '心絲蟲' },
  { name: '毛囊蟲' },
  { name: '寄生蟲' },
  { name: '病毒' },
  { name: '細菌' },
];

var notationArray = [
  { name: '，' },
  { name: '。' },
  { name: '(' },
  { name: ')' },
  { name: '-' },
  { name: '~' },
  { name: '1' },
  { name: '2' },
  { name: '3' },
  { name: '4' },
  { name: '5' },
  { name: '6' },
  { name: '7' },
  { name: '8' },
  { name: '9' },
  { name: '0' },
  { name: '支' },
  { name: '劑' },
  { name: '根' },
  { name: '天' },
  { name: '有' },
  { name: '到' },
];

var verbArray = [
  { name: '如果' },
  { name: '觀察' },
  { name: '注意' },
  { name: '需要' },
  { name: '住院' },
  { name: '手術' },
  { name: '持續' },
  { name: '等待' },
  { name: '處理' },
  { name: '建議' },
];

var tagBoard = document.querySelector(".tag-board");
var tagPool = document.querySelector(".tag-pool");
var describePool = document.querySelector(".describe-pool");
var symptomPool = document.querySelector(".symptom-pool");
var organPool = document.querySelector(".organ-pool");
var notationPool = document.querySelector(".notation-pool");
var verbPool = document.querySelector(".verb-pool");

renderButtons(describePool, describeArray);
renderButtons(symptomPool, symptomArray);
renderButtons(organPool, organArray);
renderButtons(notationPool, notationArray);
renderButtons(verbPool, verbArray);

document.querySelectorAll(".tag-button").forEach(function(tagButton) {
  tagButton.addEventListener('click', function(event) {
    tagBoard.value += event.target.innerText;
  });
});

function renderButtons(targetNode, listArray) {
  listArray.forEach(function(item) {
    targetNode.appendChild(createButton(item));
  });
};

function createButton(item) {
  var newButton = document.createElement('span');
  newButton.classList.add("tag-button");
  newButton.innerText = item.name;
  return newButton;
};

function clearTextArea() {
  tagBoard.value = '';
};

function deleteLastText() {
  tagBoard.value = tagBoard.value.slice(0, tagBoard.value.length - 1);
};

