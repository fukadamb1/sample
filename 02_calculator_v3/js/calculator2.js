'use strict';

// ページ本体が読み込まれたタイミングで実行するコード
var wkTotal = 0; //合計
var wkInput = ""; //現在クリックされたボタン
var wkCalc = "+";
var wkBefore = "1"; //１つ前の入力は？  0:数値、小数点  1:演算子 

// ページ上の要素（Element)を参照
const elementcalcLog = document.getElementById("calcLog");
const elementResult = document.getElementById("result");
const num1 = document.getElementById("num1");
const num2 = document.getElementById("num2");
const num3 = document.getElementById("num3");
const num4 = document.getElementById("num4");
const num5 = document.getElementById("num5");
const num6 = document.getElementById("num6");
const num7 = document.getElementById("num7");
const num8 = document.getElementById("num8");
const num9 = document.getElementById("num9");
const num0 = document.getElementById("num0");
const elementAdd = document.getElementById("add");
const elementSub = document.getElementById("sub");
const elementMult = document.getElementById("mult");
const elementDiv = document.getElementById("div");
const elementDecPoint = document.getElementById("decPoint");
const elementEqual = document.getElementById("equal");
const elementCancel = document.getElementById("cancel");

// イベントを登録
num1.addEventListener("click", function() {edit(1)});
num2.addEventListener("click", function() {edit(2)});
num3.addEventListener("click", function() {edit(3)});
num4.addEventListener("click", function() {edit(4)});
num5.addEventListener("click", function() {edit(5)});
num6.addEventListener("click", function() {edit(6)});
num7.addEventListener("click", function() {edit(7)});
num8.addEventListener("click", function() {edit(8)});
num9.addEventListener("click", function() {edit(9)});
num0.addEventListener("click", function() {edit(0)});
elementDecPoint.addEventListener("click", function() {edit(".")});

elementAdd.addEventListener("click", function() {update("+")});
elementSub.addEventListener("click", function() {update("-")});
elementMult.addEventListener("click", function() {update("*")});
elementDiv.addEventListener("click", function() {update("/")});

elementEqual.addEventListener("click", dspResult);

elementCancel.addEventListener("click", clear);


/** 数字、小数点がクリックされたときの処理 */
function edit(wkInput) {
  calcLogCreate(wkInput); //計算ログ
  // １つ前の入力が、数値、小数点
  if (wkBefore == "0") {
    elementResult.innerHTML = Number(elementResult.innerHTML + wkInput); //入力値の結合
  } 
  // １つ前の演算子
  if (wkBefore == "1") {
    elementResult.innerHTML = wkInput;
    wkBefore = "0"
  }
}

/** 演算子がクリックされたときの処理 */
function update(calcType) {
  // １つ前の入力が、数値、小数点
  if (wkBefore == "0") {
    calcLogCreate(calcType); //計算ログ
    calculator();
  } 
  // １つ前の入力が、演算子（演算子 入力しなおし）
  else {
    elementcalcLog.innerHTML = elementcalcLog.innerHTML.slice(0, -1); //末尾1文字（前回の演算子）を削除
    calcLogCreate(calcType); //計算ログ
  }
  wkCalc = calcType;  //演算子save
  wkBefore = "1";
}

/** =がクリックされたときの処理 */
function dspResult() {
  calculator();
  wkCalc = "+";
}

/** 計算結果をクリアします。(clear Result) */
function clear() {
  elementResult.innerHTML = 0; // クリアする
  elementcalcLog.innerHTML = ""; // クリアする
  wkTotal = 0;
  wkCalc = "+";
  wkBefore = "1";
}

// 計算
function calculator() {
  switch (wkCalc) {
    case "+":
      wkTotal = Number(wkTotal) + Number(elementResult.innerHTML);
      break;
    case "-":
      wkTotal = Number(wkTotal) - Number(elementResult.innerHTML);
      break;
    case "*":
      wkTotal = Number(wkTotal) * Number(elementResult.innerHTML);
      break;
    case "/":
      wkTotal = Number(wkTotal) / Number(elementResult.innerHTML);
      break;
  }
  elementResult.innerHTML = wkTotal;
}

// 計算ログ
function calcLogCreate(wkLog){
  elementcalcLog.innerHTML = elementcalcLog.innerHTML + wkLog;
}