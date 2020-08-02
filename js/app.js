//Select the Element
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// classes
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// variable
let LIST, id;

//get item from localeStorage
let data = localStorage.getItem("ToDo");

//Check if data is not empty
if (data) {
  LIST = JSON.parse(data);
  id = LIST.length; //set the id to the last element. this will set the id of next array element.
  loadLIST(LIST); // load the list to the users screen.
} else {
  //if the data is not empty
  LIST = [];
  id = 0;
}

//LOAD the item to the user's interface
function loadLIST(array) {
  array.forEach(function (item) {
    addToDo(item.name, item.id, item.done, item.thrash);
  });
}

//clear local storage
clear.addEventListener("click", function () {
  localStorage.clear();
  //reload the page
  location.reload();
});

//Show todays date
// const option = { weekday: "long", month: "short", day = "numeric" };
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

//add todo function
function addToDo(toDo, id, done, thrash) {
  if (thrash) {
    return;
  }
  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";
  const item = `<li class="item">
    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
    <p class="text ${LINE}">${toDo}</p>
    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
    </li>`;
  const position = "beforeend";
  list.insertAdjacentHTML(position, item);
}

// add an item to the list, user enter key
document.addEventListener("keyup", function (event) {
  if (event.keyCode == 13) {
    const toDo = input.value;
    console.log(toDo);
    //if the input is not empty
    if (toDo) {
      addToDo(toDo, id, false, false);
      LIST.push({
        name: toDo,
        id: id,
        done: false,
        done: false,
      });
      //add item to the local storage (this code must be added where the list array is updated)
      localStorage.setItem("ToDo", JSON.stringify(LIST));
      id++;
    }
    input.value = "";
  }
});

//complete todo
function completeToDo(element) {
  console.log(element);
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  //the element that is selected here is button so we neet to select the text
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
  LIST[element.id].done = LIST[element.id].done ? false : true;
}

// removetodo
function removeToDo(element) {
  //element selected here is thrash button, but the parent that is list item needs to selected here n removed.
  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST[element.id].trash = true;
}

//target the item created dynamically
list.addEventListener("click", function (event) {
  //returns the clicked element inside the list i.e is the complete or thrash button.
  const element = event.target;
  console.log(element);
  //complete or delete
  const elementJob = element.attributes.job.value;
  if (elementJob == "complete") {
    completeToDo(element);
  } else if (elementJob == "delete") {
    removeToDo(element);
  }
  //add item to localStorage (this code must be added every where the LIST array is updated )
  localStorage.setItem("ToDo", JSON.stringify(LIST));
});
