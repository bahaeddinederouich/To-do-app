let input = document.querySelector(".text");
let submit = document.querySelector(".submit");
let tasks = document.querySelector(".tasks");
// console.log(tasks);
// submit.onclick = function () {
//   if (input.value === "") {
//     return;
//   } else {
//     // creat a div
//     let task = document.createElement("div");
//     //   add the input value to the div
//     inputValue = document.createTextNode(input.value);
//     task.appendChild(inputValue);
//     //   append the classname
//     task.className = "task";
//     //   append child to the task element
//     tasks.appendChild(task);
//   }
// };
let emptyArray = [];
if (window.localStorage.getItem("tasks")) {
  emptyArray = JSON.parse(window.localStorage.getItem("tasks"));
}
getDatafromlocalstorage();

submit.onclick = function () {
  if (input.value !== "") {
    addTaskToarray(input.value);
    input.value = "";
  }
};

function addTaskToarray(taskText) {
  // task data
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  emptyArray.push(task);
  // add elemnt to the page
  addElementTothepage(emptyArray);
  addtasktolocalstorage(emptyArray);
  // console.log(emptyArray);
  // console.log(JSON.stringify(emptyArray));
}
//click on delete button
tasks.addEventListener("click", function (e) {
  if (e.target.classList.contains("dlt")) {
    // remove task from local storage
    deletetaskwith(e.target.parentElement.getAttribute("data-id"));
    // remove task from the page
    e.target.parentElement.remove();
  }
  // task element
  if (e.target.classList.contains("task")) {
    // toggle completed task
    toggelStatuswith(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");
  }
});

function addElementTothepage(emptyArray) {
  tasks.innerHTML = "";
  emptyArray.forEach(function (task) {
    let div = document.createElement("div");
    div.className = "task";
    if (task.completed) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    let span = document.createElement("span");
    span.appendChild(document.createTextNode("delete"));
    span.className = "dlt";
    div.appendChild(span);
    tasks.appendChild(div);
    // console.log(div);
  });
}
function addtasktolocalstorage(emptyArray) {
  window.localStorage.setItem("tasks", JSON.stringify(emptyArray));
}
function getDatafromlocalstorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let datatask = JSON.parse(data);
    addElementTothepage(datatask);
  }
}
function deletetaskwith(taskid) {
  emptyArray = emptyArray.filter(function (ele) {
    return ele.id != taskid;
  });
  addtasktolocalstorage(emptyArray);
}
function toggelStatuswith(taskid) {
  for (let i = 0; i < emptyArray.length; i++) {
    if (emptyArray[i].id == taskid) {
      emptyArray[i].completed == false
        ? (emptyArray[i].completed = true)
        : (emptyArray[i].completed = false);
    }
  }
  addtasktolocalstorage(emptyArray);
}
