let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

//-------------------------------------------------
// Own code

class CashRegister {

  static amount = {
    "PENNY": 0.01,
    "NICKEL": 0.05,
    "DIME": 0.1,
    "QUARTER": 0.25,
    "ONE": 1,
    "FIVE": 5,
    "TEN": 10,
    "TWENTY": 20,
    "ONE HUNDRED": 100
  };

  static currencyUnits = [
    "ONE HUNDRED",
    "TWENTY",
    "TEN",
    "FIVE",
    "ONE",
    "QUARTER",
    "DIME",
    "NICKEL",
    "PENNY"  
  ];

  constructor() {
    this.cashInDrawer = cid.reduce(
      (acc, el) => {
         acc[el[0]] = el[1];
         return acc;
      },
      {}
    );
  }
  
  getChange(price, cash) {
    let change = {};
    let remainder = Math.round((cash - price) * 100) / 100; // Avoid floating point issues
    let status, changeNeeded, changeGiven;

    if (remainder > 0) {
      for (const cu of CashRegister.currencyUnits) {
        changeNeeded = Math.floor(remainder / CashRegister.amount[cu]) * CashRegister.amount[cu];
        if (changeNeeded > 0) {
          if (this.cashInDrawer[cu] - changeNeeded > 0) { // Excess money
            changeGiven = changeNeeded; // Ideal case: give the "right" amount of bills/coins of the highest denomination
          } else {
            changeGiven = this.cashInDrawer[cu]; // Give what you have
          }
          change[cu] = changeGiven;
          this.cashInDrawer[cu] -= changeGiven;
          remainder = Math.round((remainder - changeGiven) * 100) / 100;
        }
      }
      if (remainder > 0) {
        status = "INSUFFICIENT_FUNDS";
      } else {
        console.log(this.cashInDrawer);
        if (Object.values(this.cashInDrawer).every(val => val === 0)) {
          status = "CLOSED";
        } else {
          status = "OPEN";
        }
      }
    } else if (remainder === 0) {
      status = "EXACT";
    } else {
      status = "INSUFFICIENT_CASH";
    }

    return [status, change];
  }
}
const cashRegister = new CashRegister();
const priceInput = document.querySelector("#price");
const cashInput = document.querySelector("#cash");
const purchaseBtn = document.querySelector("#purchase-btn");
const changeDue = document.querySelector("#change-due");

purchaseBtn.addEventListener("click", () => {
  
  const [status, change] = cashRegister.getChange(priceInput.value, cashInput.value);
  console.log(cashRegister.cashInDrawer);
  switch (status) {
    case "INSUFFICIENT_CASH":
      alert("Customer does not have enough money to purchase the item");
      break;
    case "EXACT":
      changeDue.innerText = "No change due - customer paid with exact cash";
      break;
    case "INSUFFICIENT_FUNDS":
      changeDue.innerText = `Status: ${status}`;
      break;
    case "CLOSED":
    case "OPEN":
      changeDue.innerText = `Status: ${status}`;
      for (const cu of CashRegister.currencyUnits) {
        if (change[cu] > 0) {
          changeDue.innerText += ` ${cu}: \$${change[cu]}`;
        }
      }
      break;
  } 
});
