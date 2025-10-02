// homework of fetch

let divWraper = document.getElementById("divWraper");
let divInfo = document.getElementById("div-info");
let divdesc = document.getElementById("divInfoDesc");
let divXmark = document.getElementById("divX");
let fragment = document.createDocumentFragment();
let addButton = document.getElementById("add-post-icon");
let addTyping = document.getElementById("add-post-tittle");
let formSubmit = document.getElementById("form-add-post");

let divDescP = document.createElement("p");

fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "GET",
})
  .then(function (responseNew) {
    if (!responseNew.ok) {
      throw new error();
    }
    return responseNew.json();
  })
  .then(function (result) {
    result.forEach((element) => {
      creatingDiv(element);
    });
  })
  .catch(function (error) {
    console.log(error);
    let errorp = document.createElement("p");
    errorp.textContent = "theres error on server";

    divWraper.appendChild(errorp);
  });
function creatingDiv(item) {
  let divPost = document.createElement("div");
  divPost.classList.add("div-Post");
  divPost.setAttribute("data-id", item.id);

  let divTitle = document.createElement("h2");
  divTitle.textContent = item.id;

  let divParg = document.createElement("p");
  divParg.textContent = item.title;

  let divDelete = document.createElement("button");
  divDelete.textContent = "delete post";
  divDelete.setAttribute("data-delete-id", item.id);

  divPost.appendChild(divTitle);
  divPost.appendChild(divParg);
  divPost.appendChild(divDelete);
  fragment.appendChild(divPost);

  divDelete.addEventListener("click", function (eventi) {
    eventi.stopPropagation();
    let divremove = eventi.target.getAttribute("data-delete-id");
    let urlDelete = `https://jsonplaceholder.typicode.com/posts/${divremove}`;
    fetch(urlDelete, {
      method: "DELETE",
    }).then(() => {
      divPost.remove();
    });
  });

  divPost.addEventListener("click", function () {
    divInfo.classList.add("active");
    divDescP.textContent = item.body;
    divInfo.appendChild(divDescP);
  });
  divXmark.addEventListener("click", function () {
    divInfo.classList.remove("active");
    divDescP.innerHTML = "";
  });

  divWraper.appendChild(fragment);

  //adding post
  addButton.addEventListener("click", function () {
    addTyping.classList.add("activeUser");
  });

  formSubmit
    .addEventListener("submit", function (sub) {
      sub.preventDefault();
      const inputElement = this[0];

      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify({
          title: inputElement,
          userId: 11,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    })
    .then((response) => response.json())
    .then((contentNew) => {
      addTyping.classList.remove("activeUser");
      this[0].value = " ";
      createPostDiv(contentNew);
    });
}
