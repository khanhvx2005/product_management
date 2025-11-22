const tablePermissions = document.querySelector("[table-permissions]"); // lấy ra bảng
if (tablePermissions) { // check nếu có bảng thì làm gì
    const buttonSubmit = document.querySelector("[button-submit]"); // lấy ra nút bấm để bắt sự kiện
    buttonSubmit.addEventListener("click", () => {
        const permissions = []; // khai báo mảng rỗng để push dữ liệu id vs permissions

        const rows = tablePermissions.querySelectorAll("[data-name]");  // lấy ra các hàng trong bảng

        rows.forEach(row => { // lặp qua từng hàng một
            const name = row.getAttribute("data-name");
            const input = row.querySelectorAll("input"); // lấy ra các ô input trong 1 hàng
            // console.log(input);
            if (name == "id") { // nếu là hàng chứa id
                input.forEach((input) => { // lặp qua từng ô input một để lấy id của từng nhóm quyền
                    const id = input.value;
                    permissions.push({ id: id, permissions: [] })
                })
            } else { // nếu trong trường hợp các hàng còn lại
                input.forEach((input, index) => { // lặp qua từng ô input trong 1 hàng để kiểm tra ô input được tích chưa nếu tích rồi thì mới thêm hành động vào mảng ban đầu
                    const checked = input.checked;
                    if (checked) {
                        permissions[index].permissions.push(name);
                    }
                })

            }
        })
        if (permissions.length > 0) {
            const formChangePermissions = document.querySelector("#form-change-permissions");
            const inputPermissions = formChangePermissions.querySelector("input[name='permissions']");
            inputPermissions.value = JSON.stringify(permissions);
            formChangePermissions.submit();
        }
    })
}
const records = document.querySelector("[data-records]");
if (records) {
    const dataRecords = JSON.parse(records.getAttribute("data-records"));
    const tablePermissions = document.querySelector("[table-permissions]"); // lấy ra bảng

    dataRecords.forEach((item, index) => {
        const permissions = (item.permissions);
        permissions.forEach((element) => {
            console.log(element);
            const rows = tablePermissions.querySelector(`[data-name='${element}']`);  // lấy ra các hàng trong bảng


            const input = rows.querySelectorAll("input")[index];
            input.checked = true;



        })
    })
}

// [
//     {
//         id:"123",
//         permissions:["abc" , "bcd"]
//     }
// ]