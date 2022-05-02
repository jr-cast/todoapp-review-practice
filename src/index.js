import './style.css';
import TodosList from './modules/todosListClass.js';
import Item from './modules/itemClass.js';

const todos = new TodosList();
todos.UpdateList();

// add items to localstorage
const input = document.getElementById('input');
let stringData = JSON.stringify(todos.List);
let listedItem;
input.addEventListener('keydown', (evt) => {
  if (evt.code === 'Enter' && input.value !== '') {
    listedItem = new Item();
    listedItem.description = input.value;
    listedItem.index = `${todos.List.length + 1}`;
    todos.List.push(listedItem);
    stringData = JSON.stringify(todos.List);
    localStorage.setItem('todoList', stringData);
    todos.UpdateList();
  }
});

// implement todos listItems method to display HTML
todos.listItems();

// display remove icon to item on mouseover
todos.displayRemoveIcon();

// hide remove icon from item on mouseout
todos.hideRemoveIcon();

// Remove items when clicking X icon
todos.removeItem();

// update task
todos.updateTask();

// remove items from localstorage and update index number
todos.removeItemFromLocalStorage();

// clear checked items
todos.clearList();