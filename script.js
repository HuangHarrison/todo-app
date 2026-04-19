const THEME_KEY = 'theme';
const root = document.documentElement;

function applyTheme(theme) {
  if (theme === 'dark') {
    root.setAttribute('data-theme', 'dark');
  } else {
    root.removeAttribute('data-theme');
  }
  const toggle = document.getElementById('theme-toggle');
  if (toggle) toggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

const savedTheme = localStorage.getItem(THEME_KEY) || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
applyTheme(savedTheme);

document.addEventListener('click', (e) => {
  if (e.target && e.target.id === 'theme-toggle') {
    const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
  }
});

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
  deleteButton.textContent = '🗑️';
  deleteButton.type = 'button';
  deleteButton.title = 'Delete';

  textParagraph.addEventListener('click', () => {
    textParagraph.classList.toggle('completed');
  });

  deleteButton.addEventListener('click', () => {
    listItem.classList.add('removing');
    listItem.addEventListener('transitionend', () => {
      todoList.removeChild(listItem);
    }, { once: true });
  });

  listItem.appendChild(textParagraph);
  listItem.appendChild(deleteButton);
  todoList.appendChild(listItem);

  todoInput.value = '';
  todoInput.focus();
});
