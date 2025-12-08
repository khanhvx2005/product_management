//  tăng-giảm số lượng sp
const buttonMinus = document.querySelector(".btn-minus");
const buttonPlus = document.querySelector(".btn-plus");
const inputQuantity = document.querySelector("input[name='quantity']");
if (inputQuantity) {

    buttonMinus.addEventListener("click", () => {
        const currentValue = parseInt(inputQuantity.value);
        const minValue = parseInt(inputQuantity.getAttribute("min")) || 1;
        if (currentValue > minValue) {
            inputQuantity.value = currentValue - 1;

        }
    })
    buttonPlus.addEventListener("click", () => {
        const currentValue = parseInt(inputQuantity.value);
        const maxValue = parseInt(inputQuantity.getAttribute("max")) || 100;
        if (currentValue < maxValue) {
            inputQuantity.value = currentValue + 1;

        }

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