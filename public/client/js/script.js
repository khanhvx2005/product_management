//  tăng-giảm số lượng sp
const buttonMinus = document.querySelectorAll(".btn-minus");
const buttonPlus = document.querySelectorAll(".btn-plus");
const inputQuantity = document.querySelectorAll("input[name='quantity']");
console.log(inputQuantity);
if (inputQuantity.length > 0) {
    buttonMinus.forEach((button, index) => {
        button.addEventListener("click", () => {
            const input = inputQuantity[index];
            const currentValue = parseInt(input.value)
            const minValue = parseInt(input.getAttribute("min")) || 1;

            if (currentValue > minValue) {
                input.value = currentValue - 1;

            }
        })
    })

    buttonPlus.forEach((button, index) => {
        button.addEventListener("click", () => {
            const input = inputQuantity[index];

            const currentValue = parseInt(input.value)
            const maxValue = parseInt(input.getAttribute("max")) || 100;
            if (currentValue < maxValue) {
                input.value = currentValue + 1;

            }
        })
    })


}
// end tăng-giảm số lượng sp
// thoong bao
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
    const time = parseInt(showAlert.getAttribute("data-time"));

    setTimeout(() => {
        showAlert.classList.add("alert-hidden");
    }, time)
    const closeAlert = showAlert.querySelector("[close-alert]");
    closeAlert.addEventListener("click", () => {
        showAlert.classList.add("alert-hidden");

    })
}
// end thong bao