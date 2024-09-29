function isValidPhoneFormat(str) {
    const regex = /^1?\s*(\d{3}|\(\d{3}\))\s*\-?\s*\d{3}\s*\-?\s*\d{4}?$/;
    return regex.test(str);
  }
  // const phoneNumbers = ["1 555-555-5555", "1 (555) 555-5555", "1(555)555-5555", "1 555 555 5555", "5555555555", "555-555-5555", "(555)555-5555"];
  // phoneNumbers.forEach((pn) => console.log(`${pn}: ${isValidPhoneFormat(pn)}`));
  
  const userInput = document.querySelector("#user-input");
  const checkButton = document.querySelector("#check-btn");
  const clearButton = document.querySelector("#clear-btn");
  const results = document.querySelector("#results-div");
  
  const telephoneBody = document.querySelector("#telephone-body");
  const telephoneMicrophone = document.querySelector("#telephone-microphone");
  const telephoneSpeaker = document.querySelector("#telephone-speaker");
  
  // style: "neutral", "valid", "invalid"
  const changeTelephoneStyle = (style) => {
    telephoneBody.classList.remove(telephoneBody.classList[1]);
    telephoneMicrophone.classList.remove(telephoneMicrophone.classList[1]);
    telephoneSpeaker.classList.remove(telephoneSpeaker.classList[1]);
    
    telephoneBody.classList.add(`${style}-phone`);
    telephoneMicrophone.classList.add(`${style}-phone`);
    telephoneSpeaker.classList.add(`${style}-phone`);
  }
  
  checkButton.addEventListener("click", () => {
    if (userInput.value === "") {
      alert("Please provide a phone number");
    } else {
        if (isValidPhoneFormat(userInput.value)) {
          results.innerText = `Valid US number: ${userInput.value}`;
          changeTelephoneStyle("valid");
        } else {
          results.innerText = `Invalid US number: ${userInput.value}`;
          changeTelephoneStyle("invalid");
        }
    }
  });
  
  clearButton.addEventListener("click", () => {
    results.innerText = "";
    userInput.value = "";
    changeTelephoneStyle("neutral");
  });