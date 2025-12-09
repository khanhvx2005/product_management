//  tăng-giảm số lượng sp
const buttonMinus = document.querySelectorAll(".btn-minus");
const buttonPlus = document.querySelectorAll(".btn-plus");
const inputQuantity = document.querySelectorAll("input[name='quantity']");

if (inputQuantity.length > 0) {

    // NÚT TRỪ (-)
    buttonMinus.forEach((button, index) => {
        button.addEventListener("click", () => {
            const input = inputQuantity[index];
            const currentValue = parseInt(input.value);
            const minValue = parseInt(input.getAttribute("min")) || 1;

            if (currentValue > minValue) {
                const newValue = currentValue - 1;
                // Lấy product-id từ attribute đã thêm ở HTML
                const productId = input.getAttribute("product-id");

                // Chuyển hướng
                window.location.href = `/cart/update/${productId}/${newValue}`;
            }
        })
    })

    // NÚT CỘNG (+)
    buttonPlus.forEach((button, index) => {
        button.addEventListener("click", () => {
            const input = inputQuantity[index];
            const currentValue = parseInt(input.value);
            const maxValue = parseInt(input.getAttribute("max")) || 100;

            if (currentValue < maxValue) {
                const newValue = currentValue + 1;
                const productId = input.getAttribute("product-id");

                // Chuyển hướng
                window.location.href = `/cart/update/${productId}/${newValue}`;
            }
        })
    })

    // XỬ LÝ KHI NGƯỜI DÙNG TỰ NHẬP SỐ VÀO Ô INPUT
    inputQuantity.forEach((input) => {
        input.addEventListener("change", () => {
            const currentValue = parseInt(input.value);
            const minValue = parseInt(input.getAttribute("min")) || 1;
            const maxValue = parseInt(input.getAttribute("max")) || 100;
            const productId = input.getAttribute("product-id");

            // Validate dữ liệu nhập vào
            let newValue = currentValue;
            if (newValue < minValue) newValue = minValue;
            if (newValue > maxValue) newValue = maxValue;

            // Chuyển hướng
            if (productId && newValue) {
                window.location.href = `/cart/update/${productId}/${newValue}`;
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
