document
  .getElementById("mortgage-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const form = event.target;

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    const loanAmount = parseFloat(document.getElementById("loanAmount").value);
    const loanTerm = parseInt(document.getElementById("loanTerm").value);
    const interestRate =
      parseFloat(document.getElementById("interestRate").value) / 100;
    const mortgageType = document.querySelector(
      'input[name="mortgageType"]:checked'
    ).value;
    const monthlyInterestRate = interestRate / 12;
    const numberOfPayments = loanTerm * 12;

    let monthlyRepayment, totalRepayment;

    if (mortgageType === "repayment") {
      monthlyRepayment =
        (loanAmount * monthlyInterestRate) /
        (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
      totalRepayment = monthlyRepayment * numberOfPayments;
    } else {
      monthlyRepayment = loanAmount * monthlyInterestRate;
      totalRepayment = monthlyRepayment * numberOfPayments;
    }

    document.getElementById(
      "monthlyRepayment"
    ).textContent = `£${monthlyRepayment.toFixed(2)}`;
    document.getElementById(
      "totalRepayment"
    ).textContent = `£${totalRepayment.toFixed(2)}`;
    document.getElementById("additionalInfo").textContent =
      mortgageType === "interest-only"
        ? "Note: This is an Interest-Only mortgage."
        : "";
  });

document.getElementById("clearAll").addEventListener("click", function (event) {
  event.preventDefault();
  document.getElementById("mortgage-form").reset();
  document.getElementById("monthlyRepayment").textContent = "--";
  document.getElementById("totalRepayment").textContent = "--";
  document.getElementById("additionalInfo").textContent = "";
});
