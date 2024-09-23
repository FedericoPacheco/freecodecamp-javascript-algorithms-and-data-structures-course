function arabicToRoman(input) {
    const conversionMatrix = [
    //  0    1,    2,    3,     4,   5,    6,     7,      8,   9     
      ["", "M", "MM", "MMM",   "",  "",   "",    "",     "",  "" ],
      ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"],
      ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"],
      ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"]
    ];
  
    let remainder = input;
    let result = "";
    for (let i = 3; i >= 0; i--) {
      result += conversionMatrix[conversionMatrix.length - 1 - i][Math.floor(remainder / (10 ** i))];
      remainder = remainder % (10 ** i);
    }
    return result;
  }
  //const inputs = [9, 16, 649, 1023, 3999];
  //inputs.forEach(input => console.log(`${input} -> ${arabicToRoman(input)}`));
  
  const convertButton = document.querySelector("#convert-btn");
  const input = document.querySelector("#number");
  const output = document.querySelector("#output");
  
  convertButton.addEventListener("click", () => {
    if (input.value === "") {
      output.innerText = "Please enter a valid number";
    } else if (input.value < 1) {
      output.innerText = "Please enter a number greater than or equal to 1";
    } else if (input.value > 3999) {
      output.innerText = "Please enter a number less than or equal to 3999";
    } else {
      output.innerText = arabicToRoman(input.value);
    }
  });