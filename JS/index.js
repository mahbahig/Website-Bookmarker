var bookmarkNameInput = document.getElementById('bookmarkName');
var bookmarkUrlInput = document.getElementById('bookmarkUrl');


if (localStorage.getItem("bookmarks") == null) {
    var bookmarksList = [];
}
else {
    var bookmarksList = JSON.parse(localStorage.getItem("bookmarks"));
    displayBookmarks();
}

function saveBookmark() {
    var bookmark = {
        bookmarkName: bookmarkNameInput.value,
        bookmarkUrl: bookmarkUrlInput.value
    };
    bookmarksList.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarksList));
    displayBookmarks();
    clearInputs();
}

function deleteBookmark(index) {
    bookmarksList.splice(index, 1);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarksList));
    displayBookmarks()
}

function displayBookmarks() {
    htmlCode = ``;
    for (var i = 0; i < bookmarksList.length; i++) {
        htmlCode += `<tr class="py-2">
                        <td class="text-center align-middle">${i + 1}</td>
                        <td class="text-center align-middle">${bookmarksList[i].bookmarkName}</td>
                        <td class="text-center"><a href="https://www.${bookmarksList[i].bookmarkUrl}" target="_blank"
                                class="btn btn-visit"><i class="fa-solid fa-eye me-2"></i>Visit</a></td>
                        <td class="text-center"><button onclick="deleteBookmark(${i})" class="btn btn-delete"><i
                                    class="fa-solid fa-trash-can me-2"></i></i>Delete</button></td>
                    </tr>`;
    }
    document.getElementById('bookmarkContainer').innerHTML = htmlCode;
}

function clearInputs() {
    bookmarkNameInput.value = '';
    bookmarkUrlInput.value = '';
}

