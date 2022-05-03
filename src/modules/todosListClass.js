export default class TodosList {
  constructor() {
    this.List = [];
  }

  UpdateList() {
    if (localStorage.todoList) {
      this.List = JSON.parse(localStorage.todoList);
    }
  }

  updateIndex() {
    for (let i = 0; i < this.List.length; i += 1) {
      this.List[i].index = i + 1;
      const stringData = JSON.stringify(this.List);
      localStorage.setItem('todoList', stringData);
      this.UpdateList();
    }
  }

  listItems() {
    for (let i = 0; i < this.List.length; i += 1) {
      const checkBox = document.createElement('input');
      checkBox.type = 'checkbox';
      checkBox.id = `check${i}`;
      const item = document.createElement('div');
      item.id = `item${i}`;
      const task = document.createElement('input');
      task.className = 'task';
      task.id = `task${i}`;
      task.value = this.List[i].description;
      item.classList.toggle('item');
      item.append(checkBox);
      item.append(task);
      const str = '<i class="fa-solid fa-ellipsis-vertical"></i>';
      const icon = document.createElement('i');
      icon.id = `icon${i}`;
      icon.innerHTML = str;
      item.append(icon);
      const str2 = '<i class="fa-light fa-x"></i>';
      const trashCan = document.createElement('i');
      trashCan.className = 'delete';
      trashCan.id = `trash${i}`;
      trashCan.innerHTML = str2;
      trashCan.classList.add('hidden');
      item.append(trashCan);
      const todo = document.getElementById('todolist');
      todo.append(item);
    }
  }

  displayRemoveIcon() {
    const removeItem = document.getElementsByClassName('item');
    for (let i = 0; i < this.List.length; i += 1) {
      removeItem[i].addEventListener('mouseover', () => {
        document.getElementById(`trash${i}`).classList.remove('hidden');
        document.getElementById(`icon${i}`).classList.add('hidden');
      });
    }
  }

  hideRemoveIcon() {
    const removedX = document.getElementsByClassName('item');
    for (let i = 0; i < this.List.length; i += 1) {
      removedX[i].addEventListener('mouseout', () => {
        document.getElementById(`trash${i}`).classList.add('hidden');
        document.getElementById(`icon${i}`).classList.remove('hidden');
      });
    }
  }

  removeItem() {
    const xBtns = document.getElementsByClassName('delete');
    for (let i = 0; i < this.List.length; i += 1) {
      const [description] = [this.List[i].description];
      const deletedItem = document.getElementById(`item${i}`);
      xBtns[i].addEventListener('click', () => {
        const filtered = this.List.filter((items) => items.description !== description);
        const stringData = JSON.stringify(filtered);
        localStorage.setItem('todoList', stringData);
        this.UpdateList();
        deletedItem.remove();
        this.updateIndex();
      });
    }
  }

  updateTask() {
    const tasks = document.getElementsByClassName('task');
    for (let i = 0; i < tasks.length; i += 1) {
      tasks[i].addEventListener('change', () => {
        this.List[i].description = tasks[i].value;
        const stringData = JSON.stringify(this.List);
        localStorage.setItem('todoList', stringData);
        this.UpdateList();
      });
    }
  }

  isTrueOrFalse() {
    for (let i = 0; i < this.List.length; i += 1) {
      document.getElementById(`check${i}`).addEventListener('change', () => {
        if (this.List[i].completed === false) {
          this.List[i].completed = true;
          const stringData = JSON.stringify(this.List);
          localStorage.setItem('todoList', stringData);
          this.UpdateList();
          const task = document.getElementById(`task${i}`);
          task.style.textDecoration = 'line-through';
        } else if (this.List[i].completed === true) {
          this.List[i].completed = false;
          const stringData = JSON.stringify(this.List);
          localStorage.setItem('todoList', stringData);
          this.UpdateList();
          const task = document.getElementById(`task${i}`);
          task.style.textDecoration = 'none';
        }
      });
    }
  }

  clearCompleted() {
    document.getElementById('clearAllButton').addEventListener('click', () => {
      const filtered = this.List.filter((items) => items.completed === false);
      const stringData = JSON.stringify(filtered);
      for (let i = 0; i < this.List.length; i += 1) {
        const listedItem = document.getElementById(`item${i}`);
        listedItem.remove();
      }
      localStorage.setItem('todoList', stringData);
      this.UpdateList();
      this.updateIndex();
      this.listItems();
    });
  }
}
