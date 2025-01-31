// Select elements
const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const dayInput = document.getElementById('day-input');
const notesInput = document.getElementById('notes-input');

// Function to add a new task
function addTask() {
  const taskText = todoInput.value.trim();

  // Check if the input is not empty
  if (taskText === '') {
    alert('Please enter a task!');
    return;
  }

  // Create a new list item
  const listItem = document.createElement('li');
  listItem.textContent = taskText;

  // Create a remove button
  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';
  removeButton.classList.add('remove-btn');

  // Add event listener to the remove button
  removeButton.addEventListener('click', () => {
    todoList.removeChild(listItem);
  });

  // Append the button to the list item
  listItem.appendChild(removeButton);

  // Append the list item to the todo list
  todoList.appendChild(listItem);

  // Clear the input field
  todoInput.value = '';
}

// Add event listener to the Add button
addButton.addEventListener('click', addTask);

// Add task when pressing Enter
todoInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    addTask();
  }
});

// Handle Day of the Week (optional logic can be added)
dayInput.addEventListener('blur', () => {
  if (dayInput.value.trim() === '') {
    alert('Please enter the day of the week!');
  }
});


