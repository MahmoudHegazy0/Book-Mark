var nameBookInput = document.getElementById("nameBook");
var nameSiteURLInput = document.getElementById("SiteURL");

var newBook = "";
if (localStorage.getItem("books") == null) {
  newBook = [];
} else {
  newBook = JSON.parse(localStorage.getItem("books"));
  displayBook();
}

function addBook() {
  var Book = {
    nameOfBook: nameBookInput.value,
    URL: nameSiteURLInput.value,
  };
  newBook.push(Book);
  localStorage.setItem("Books", JSON.stringify(newBook));
  displayBook();
  clearInput();
}
function displayBook() {
  var box = "";
  for (var i = 0; i < newBook.length; i++) {
    box += `
<tr>
        <td>${i + 1}</td>
        <td>${newBook[i].nameOfBook}</td>
        <td><button type="button" id="btn-visit" class="btn btn-visit btn-visit" onclick="visitBook()"><a href="${i}"><i class="fa-solid fa-eye pe-2"></i>Visit</span></button>  </td>
        <td><button type="button"  class="btn btn-Delete btn-delete" onclick="deleteBook(${i})"><span href="" class="text-decoration-none"><i class="fa-solid fa-trash-can pe-2"></i>Delete</span></button>
        </td>

    </tr>

`;
  }
  document.getElementById("Tbody").innerHTML = box;

  visitBtns = document.querySelectorAll(".btn-visit");
  if (visitBtns) {
    for (var l = 0; l < visitBtns.length; l++) {
      visitBtns[l].addEventListener("click", function (e) {
        visitWebsite(e);
      });
    }
  }
}

function clearInput() {
  nameBookInput.value = "";
  nameSiteURLInput.value = "";
}
function deleteBook(index) {
  newBook.splice(index, 1);
  localStorage.setItem("Books", JSON.stringify(newBook));
  displayBook();
}

var nameRegex = /^\w{3,}(\s+\w+)*$/;
var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;

nameBookInput.addEventListener("input", function () {
  validate(nameBookInput, nameRegex);
});

nameSiteURLInput.addEventListener("input", function () {
  validate(nameSiteURLInput, urlRegex);
});

function visitWebsite(e) {
  var Index = e.target.dataset.index;
  var httpsRegex = /^https?:\/\//;
  if (httpsRegex.test(addBook[Index].nameSiteURLInput)) {
    open(newBook[Index].nameSiteURLInput);
  } else {
    open("https://${addBook[Index].nameSiteURLInput}");
  }
}

function validate(ele1, ele2) {
  var testRegex = ele2;
  if (testRegex.test(ele1.value)) {
    ele1.classList.add("is-valid");
    ele1.classList.remove("is-invalid");
  } else {
    ele1.classList.add("is-invalid");
    ele1.classList.remove("is-valid");
  }
}
