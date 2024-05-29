var bookmarkNameInput = document.getElementById('bookmarkName');
var bookmarkUrlInput = document.getElementById('bookmarkUrl');

var searchInput = document.getElementById('search');
var matchingSearch = [];

if (localStorage.getItem("bookmarks") == null) {
    var bookmarksList = [];
}
else {
    var bookmarksList = JSON.parse(localStorage.getItem("bookmarks"));
    displayBookmarks(bookmarksList);
}

function saveBookmark() {
    var bookmark = {
        bookmarkName: bookmarkNameInput.value,
        bookmarkUrl: bookmarkUrlInput.value
    };
    bookmarksList.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarksList));
    displayBookmarks(bookmarksList);
    clearInputs();
}

function deleteBookmark(index) {
    bookmarksList.splice(index, 1);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarksList));
    displayBookmarks(bookmarksList)
}

function displayBookmarks(usedList) {
    htmlCode = ``;
    for (var i = 0; i < usedList.length; i++) {
        htmlCode += `<tr class="py-2">
                        <td class="text-center align-middle">${i + 1}</td>
                        <td class="text-center align-middle">${usedList[i].bookmarkName}</td>
                        <td class="text-center"><a href="https://www.${usedList[i].bookmarkUrl}" target="_blank"
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

function searchBookmarks() {
    matchingSearch.splice(0)
    var search = searchInput.value;
    for (var i = 0; i < bookmarksList.length; i++) {
        if (search == bookmarksList[i].bookmarkName) {
            matchingSearch.push(bookmarksList[i]);
            displayBookmarks(matchingSearch)
        }
        else if (search == bookmarksList[i].bookmarkUrl) {
            matchingSearch.push(bookmarksList[i]);
            displayBookmarks(matchingSearch)
        }
    }
    if (matchingSearch.length == 0) {
        htmlCode = `<tr class="py-2">
                        <td class="text-center align-middle" colspan="4" ><h2 class="text-black text-center">None</h2></td>
                    </tr>`;
        document.getElementById('bookmarkContainer').innerHTML = htmlCode;
    }
}