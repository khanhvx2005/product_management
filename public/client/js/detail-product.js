const buttonMinusDetail = document.querySelector(".btn-minus-detail");
const buttonPlusDetail = document.querySelector(".btn-plus-detail");
const inputQuantityDetail = document.querySelector("input[name='quantity']");
if (inputQuantityDetail) {
    buttonMinusDetail.addEventListener("click", () => {
        const currentValue = parseInt(inputQuantityDetail.value);
        const minValue = parseInt(inputQuantityDetail.getAttribute("min")) || 1;


        if (currentValue > minValue) {

            inputQuantityDetail.value = currentValue - 1;
        }
    })
    buttonPlusDetail.addEventListener("click", () => {
        const currentValue = parseInt(inputQuantityDetail.value);
        const maxValue = parseInt(inputQuantityDetail.getAttribute("max")) || 100;

        if (currentValue < maxValue) {

            inputQuantityDetail.value = currentValue + 1;
        }
    })

}