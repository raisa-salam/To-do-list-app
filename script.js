document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const addBtn = document.getElementById("add-btn");
  const todoList = document.getElementById("todo-list");
  const filterBtns = document.querySelectorAll(".filter-btn");

  let todos = JSON.parse(localStorage.getItem("todos")) || [];

  function saveToLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  function renderTodos(filter = "all") {
    todoList.innerHTML = "";
    todos.forEach((todo, index) => {
      if (filter === "done" && !todo.completed) return;
      if (filter === "not-done" && todo.completed) return;

      const li = document.createElement("li");
      li.draggable = true;
      li.dataset.index = index;
      li.innerHTML = `
        <span class="task-text" ${todo.completed ? 'style="text-decoration: line-through;"' : ""}>${todo.text}</span>
        <div>
          <button class="edit-btn">✏️</button>
          <button class="toggle-btn">${todo.completed ? "✅" : "⬜"}</button>
          <button class="remove-btn">❌</button>
        </div>`;
      todoList.appendChild(li);
    });
  }

  function addTask() {
    if (todoInput.value.trim() !== "") {
      todos.push({ text: todoInput.value, completed: false });
      todoInput.value = "";
      saveToLocalStorage();
      renderTodos();
    }
  }

  addBtn.addEventListener("click", addTask);

  todoInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  });

  todoList.addEventListener("click", (e) => {
    const index = e.target.closest("li").dataset.index;
    if (e.target.classList.contains("remove-btn")) {
      todos.splice(index, 1);
    } else if (e.target.classList.contains("toggle-btn")) {
      todos[index].completed = !todos[index].completed;
    } else if (e.target.classList.contains("edit-btn")) {
      const newText = prompt("Edit task:", todos[index].text);
      if (newText) todos[index].text = newText;
    }
    saveToLocalStorage();
    renderTodos();
  });

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      renderTodos(btn.dataset.filter);
    });
  });

  let draggedItem;
  todoList.addEventListener("dragstart", (e) => {
    draggedItem = e.target;
    setTimeout(() => e.target.classList.add("dragging"), 0);
  });

  todoList.addEventListener("dragend", (e) => {
    e.target.classList.remove("dragging");
    saveToLocalStorage();
  });

  todoList.addEventListener("dragover", (e) => {
    e.preventDefault();
    const draggingElement = document.querySelector(".dragging");
    const afterElement = [...todoList.children].find(
      (child) => e.clientY < child.offsetTop + child.offsetHeight / 2
    );
    todoList.insertBefore(draggingElement, afterElement);
    todos = [...todoList.children].map(li => ({ text: li.querySelector(".task-text").textContent, completed: li.querySelector(".toggle-btn").textContent === "✅" }));
  });

  renderTodos();
});
