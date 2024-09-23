const textInput = document.querySelector("#text-input");
const checkButton = document.querySelector("#check-btn");
const result = document.querySelector("#result");

function preprocessText(rawText) {
  const regex = /[\W_áéíóúÁÉÍÓÚñÑ]/g;
  return rawText.replace(regex, '').toLowerCase();
}

function isPalindrome(rawText) {
  const cleanText = preprocessText(rawText);
  const reversedCleanText = cleanText.split("").reverse().join("");
  return cleanText === reversedCleanText;
}

function displayResult() {
  if (textInput.value.length === 0) {
    alert("Please input a value");
  } else {
    if (isPalindrome(textInput.value)) {
      result.innerHTML = `<p class = "palindrome"><i>${textInput.value}</i> is a palindrome<p>`;
    } else {
      result.innerHTML = `<p class = "notPalindrome"><i>${textInput.value}</i> is not a palindrome<p>`;
    }
  }
  
}

checkButton.addEventListener("click", displayResult);