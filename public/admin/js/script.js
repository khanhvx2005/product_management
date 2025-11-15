// Lọc trạng thái
const buttonStatus = document.querySelectorAll("[status]");
if (buttonStatus.length > 0) {
    const url = new URL(window.location.href);
    buttonStatus.forEach((button) => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("status");
            if (status) {
                url.searchParams.set("status", status);

            } else {
                url.searchParams.delete("status");
            }
            window.location.href = url.href;

        })
    })
}
// end lọc trạng thái
// tìm kiếm
const formSearch = document.querySelector("#form-search");
if (formSearch) {
    const url = new URL(window.location.href);
    formSearch.addEventListener("submit", (e) => {
        e.preventDefault();
        const keyword = e.target.elements.keyword.value;
        if (keyword) {
            url.searchParams.set("keyword", keyword);
        }
        else {
            url.searchParams.delete("keyword");
        }
        window.location.href = url.href;
    })
}
// end tìm kiếm
// phân trang
const buttonPage = document.querySelectorAll("[page]");
if (buttonPage.length > 0) {
    const url = new URL(window.location.href);
    buttonPage.forEach((button) => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("page");
            if (page) {
                url.searchParams.set("page", page);
            }
            else {
                url.searchParams.delete("page");
            }
            window.location.href = url.href;
        })
    })
}
// end phân trang
// chuyển đổi trạng thái 1 sản phẩm
const buttonChangeStatus = document.querySelectorAll("[button-status]");
const formChangeStatus = document.querySelector("[form-change-status]");
if (formChangeStatus) {
    const path = formChangeStatus.getAttribute("path");

    if (buttonChangeStatus.length > 0) {
        buttonChangeStatus.forEach((button) => {
            button.addEventListener("click", () => {
                const id = button.getAttribute("data-id");
                const status = button.getAttribute("data-status");

                let statusNew = "";
                if (status == "active") {
                    statusNew = "inactive";
                } else {
                    statusNew = "active";
                }
                const action = `${path}/${id}/${statusNew}?_method=PATCH`;
                formChangeStatus.action = action;
                // console.log(action);
                formChangeStatus.submit();
            })
        })
    }
}

// end chuyển đổi trạng thái 1 sản phẩm
// chuyển đổi trạng thái nhiều sản phẩm
const tableCheckBox = document.querySelector("[check-box]");
if (tableCheckBox) {
    const inputCheckAll = tableCheckBox.querySelector("input[name='checkall']");
    const inputCheckIds = tableCheckBox.querySelectorAll("input[name='id']");
    inputCheckAll.addEventListener("click", (e) => {
        if (inputCheckAll.checked == true) {
            inputCheckIds.forEach((input) => {
                input.checked = true;
            })
        } else {
            inputCheckIds.forEach((input) => {
                input.checked = false;
            })
        }
    })
    inputCheckIds.forEach((input) => {
        input.addEventListener("click", () => {
            const countInputChecked = (tableCheckBox.querySelectorAll("input[name='id']:checked")).length;
            if (countInputChecked == inputCheckIds.length) {
                inputCheckAll.checked = true;
            } else {
                inputCheckAll.checked = false;
            }
        })
    })
}
const formChangeMulti = document.querySelector("#form-change-multi");
if (formChangeMulti) {
    formChangeMulti.addEventListener("submit", (e) => {
        e.preventDefault();
        const inputIds = formChangeMulti.querySelector("input[name='ids']");
        const inputChecked = tableCheckBox.querySelectorAll("input[name='id']:checked");
        const typeChange = e.target.elements.type.value;
        if (typeChange == "delete-all") {
            const isConfirm = confirm("Bạn có chắc chắn muốn xóa những sản phẩm này !");
            if (!isConfirm) {
                return;
            }
        }



        if (inputChecked.length > 0) {
            let ids = [];

            inputChecked.forEach((input) => {
                if (typeChange == "change-position") {
                    const id = input.value;
                    const position = input.closest("tr").querySelector("input[name='position']").value;
                    console.log(position);
                    console.log(id);
                    ids.push(`${id}-${position}`);
                } else {
                    const id = input.value;
                    ids.push(id);
                }


            })
            inputIds.value = ids.join(",");
            formChangeMulti.submit();
        } else {
            alert("Vui lòng chọn ít nhất 1 sản phẩm !");
        }

    })
}
// end chuyển đổi trạng thái nhiều sản phẩm
// Xóa 1 sản phẩm
const buttonDeleteItem = document.querySelectorAll("[button-delete-item]");
const formDeleteItem = document.querySelector("[form-delete-item]");
if (formDeleteItem) {
    const path = formDeleteItem.getAttribute("path");
    // console.log(path);
    if (buttonDeleteItem.length > 0) {
        buttonDeleteItem.forEach((button) => {
            button.addEventListener("click", () => {
                const isConfirm = confirm("Bạn chắc chắn muốn xóa sản phẩm này ?");
                if (!isConfirm) {
                    return;
                } else {
                    const id = button.getAttribute("data-id");
                    const action = `${path}/${id}?_method=DELETE`;
                    formDeleteItem.action = action;
                    formDeleteItem.submit();
                }

            })
        })
    }
}

// end xóa 1 sản phẩm
// khôi phục sản phẩm
const tableStorage = document.querySelector("[table-storage]");
const formStorage = document.querySelector("[form-storage]");
if (formStorage) {
    const path = formStorage.getAttribute("path");
    if (tableStorage) {
        const buttonStorageResTore = tableStorage.querySelectorAll("button[storage-restore]");
        const buttonStorageDelete = tableStorage.querySelectorAll("button[storage-delete]");
        buttonStorageResTore.forEach((button) => {
            button.addEventListener("click", () => {
                const id = button.getAttribute("data-id");
                const type = button.getAttribute("storage-restore")
                const action = `${path}/${type}/${id}?_method=PATCH`;
                formStorage.action = action;
                // console.log(action);
                formStorage.submit();
            })
        })
        buttonStorageDelete.forEach((button) => {
            button.addEventListener("click", () => {
                const isConfirm = confirm("Bạn có chắc chắn muốn xóa không ?");
                if(!isConfirm) {
                    return;
                }
                const id = button.getAttribute("data-id");
                const type = button.getAttribute("storage-delete")
                const action = `${path}/${type}/${id}?_method=PATCH`;
                formStorage.action = action;
                // console.log(action);
                formStorage.submit();
            })
        })
    }
}

// khôi phục sản phẩm
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
// upload ảnh
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage) {
    const uploadImageInput = uploadImage.querySelector("input[upload-image-input]");
    const uploadImagePreview = uploadImage.querySelector("img[upload-image-priview]");
    const buttonClose = uploadImage.querySelector("button");
    
    uploadImageInput.addEventListener("change" , (e)=> {
        const file = e.target.files[0];
        if(file) {
            uploadImagePreview.src = URL.createObjectURL(file);
            buttonClose.classList.add("show");
        }
    })
    buttonClose.addEventListener("click" , ()=> {
        uploadImagePreview.src = "";
        uploadImageInput.value = "";
        buttonClose.classList.remove("show");
    })
}
// end upload ảnh
// edit product

// end edit product
