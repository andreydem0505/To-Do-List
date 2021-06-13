class Task {
    constructor(text, isCrossed) {
        this.text = text;
        this.isCrossed = isCrossed;
    }
}

function crossTask(checkbox) {
    let span = checkbox.parentElement.querySelector("span");
    if (checkbox.checked) {
        span.style.textDecoration = "line-through";
    } else {
        span.style.textDecoration = "none";
    }
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        if (task.text === span.innerHTML) {
            task.isCrossed = !task.isCrossed;
        }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(button) {
    let parent = button.parentElement;
    parent.style.animationPlayState = "running";
    parent.addEventListener('animationend', function () {
        let text = parent.querySelector("span").innerHTML;
        parent.remove();
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => {
            if (task.text === text) {
                tasks.splice(tasks.indexOf(task), 1);
            }
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    });
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask(task) {
    let li = document.createElement("li");
    let input = document.createElement("input");
    input.className = "checkbox";
    input.type = "checkbox";
    let span = document.createElement("span");
    span.className = "task";
    span.innerHTML = task.text;
    if (task.isCrossed) {
        input.checked = true;
        span.style.textDecoration = "line-through";
    }
    input.onchange = () => {
        crossTask(input);
    };
    let button = document.createElement("button");
    button.className = "delete-btn";
    button.onclick = () => {
        removeTask(button);
    };
    li.appendChild(input);
    li.appendChild(span);
    li.appendChild(button);
    document.getElementById("task-list").appendChild(li);
}

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
tasks.forEach(task => addTask(task));

document.getElementById("add-task-button").onclick = () => {
    let inputField = document.getElementById("input-task");
    let text = inputField.value;
    let result = true;
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        if (task.text === text) {
            result = false;
        }
    });
    if (result) {
        if (text !== "") {
            inputField.value = "";
            let task = new Task(text, false);
            addTask(task);
            saveTask(task);
        }
    } else {
        inputField.value = "";
        inputField.placeholder = "Such task already exist";
    }
};