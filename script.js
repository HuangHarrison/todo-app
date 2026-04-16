const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

todoForm.addEventListener('submit', event => {
  event.preventDefault();
  const todoText = todoInput.value.trim();

  if (!todoText) {
    return;
  }

  const listItem = document.createElement('li');
  listItem.className = 'todo-item';

  const textParagraph = document.createElement('p');
  textParagraph.className = 'todo-text';
  textParagraph.textContent = todoText;

  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete-button';
  deleteButton.textContent = 'Delete';
  deleteButton.type = 'button';

  textParagraph.addEventListener('click', () => {
    textParagraph.classList.toggle('completed');
  });

  deleteButton.addEventListener('click', () => {
    todoList.removeChild(listItem);
  });

  listItem.appendChild(textParagraph);
  listItem.appendChild(deleteButton);
  todoList.appendChild(listItem);

  todoInput.value = '';
  todoInput.focus();
});
