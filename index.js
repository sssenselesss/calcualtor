

var FormatNumberWithDot = (str) => {
  var parts = (str + "").split("."),
    main = parts[0],
    len = main.length,
    output = "",
    i = len - 1;
    console.log(parts,main,len,i);

  while (i >= 0) {
    output = main.charAt(i) + output;
    if ((len - i) % 3 === 0 && i > 0) {
      output = " " + output;
    }
    --i;
  }

  if (parts.length > 1) {
    output += "." + parts[1];
  }
  return output;
};

let fNum = "";
let sNum = "";
let operator = "";
let equals = false;

let NUMBERS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
let OPERATORS = ["-", "+", "/", "*"];

const SYMBOL_KEYCODES = {
    '48': '0',
    '49': '1',
    '50': '2',
    '51': '3',
    '52': '4',
    '53': '5',
    '54': '6',
    '55': '7',
    '56': '8',
    '57': '9',
    '109': '-',
    '107': '+',
    '106': '*',
    '111': '/',
    '110': '.'
  };
  

const output = document.querySelector(".output_field");

const btns = document.querySelectorAll(".calc_btn");

const ClearBtn = document.querySelector(".clearAll");
const ClearLastChar = document.querySelector(".ClearLastChar");

ClearBtn.addEventListener("click", () => {
  ClearAll();
});


const ClearAll = () => {
  fNum = "";
  sNum = "";
  operator = "";
  output.innerHTML = 0;
};

document.addEventListener('keydown',(e)=>{
  console.log(e.keyCode);

})

btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (e.target.classList.contains("clearAll")) return;

    const clickNumber = e.target.textContent;

    if (NUMBERS.includes(clickNumber)) {
      if (sNum === "" && operator === "") {
        fNum += clickNumber;

        output.innerHTML = FormatNumberWithDot(fNum);
      } else {
        if (fNum !== "" && sNum !== "" && equals) {
          sNum = clickNumber;
          equals = false;
          output.innerHTML = FormatNumberWithDot(sNum);
        } else {
          sNum += clickNumber;
          output.innerHTML = FormatNumberWithDot(sNum);
        }
      }
      console.log(fNum, sNum, operator);
    }

    if (OPERATORS.includes(clickNumber)) {
      operator = clickNumber;
      output.innerHTML = operator;
    }

    if (clickNumber === "=") {
      switch (operator) {
        case "+":
          fNum = +fNum + +sNum;
          break;
        case "-":
          fNum = fNum - sNum;
          break;
        case "*":
          fNum = fNum * sNum;
          break;
        case "/":
          if (sNum == "0") {
            output.innerHTML = "Ошибка";
            fNum = "";
            sNum = "";
            operator = "";
            return;
          } else {
            fNum = fNum / sNum;
          }
          break;
      }
      equals = true;
      output.innerHTML = FormatNumberWithDot(fNum);
    }
  });
});
