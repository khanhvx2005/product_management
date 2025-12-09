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
// Hàm đếm ngược đơn giản
function startTimer(duration, displayHours, displayMinutes, displaySeconds) {
    var timer = duration, hours, minutes, seconds;
    setInterval(function () {
        hours = parseInt(timer / 3600, 10);
        minutes = parseInt((timer % 3600) / 60, 10);
        seconds = parseInt(timer % 60, 10);

        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        displayHours.textContent = hours;
        displayMinutes.textContent = minutes;
        displaySeconds.textContent = seconds;

        if (--timer < 0) {
            timer = duration; // Reset lại khi hết giờ
        }
    }, 1000);
}

window.onload = function () {
    // Đếm ngược 2 tiếng (2 * 60 * 60 = 7200 giây)
    var twoHours = 60 * 60 * 2;
    var displayHours = document.querySelector('#hours');
    var displayMinutes = document.querySelector('#minutes');
    var displaySeconds = document.querySelector('#seconds');
    startTimer(twoHours, displayHours, displayMinutes, displaySeconds);
};