'use strict';


let backlog = document.querySelector('.backlog');
let inProgress = document.querySelector('.in-progress');
let done = document.querySelector('.div-done');
let numberOfBacklogTasks = document.querySelector('.number-of-backlog-tasks');
let numberOfInProgressTasks = document.querySelector('.number-of-in-progress-tasks');
let numberOfDoneTasks = document.querySelector('.number-done-tasks');
let taskNumber = +backlog.children[1].firstElementChild.firstElementChild.firstElementChild.innerHTML;
let main = document.querySelector('.main');

let buttonAddNewTask = document.querySelector('.new-task-button');

function addNewNote() {
  let input = document.querySelector('.new-task-field');
  let textOfTask = input.value;

  if (!textOfTask) return;

  let li = document.createElement('li');
  li.innerHTML = `<h3>Задача #<span>${ ++taskNumber }</span></h3><p>${ textOfTask }</p><img class="action-img delete" src="img/delete.png" alt="Удалить"><img class="action-img edit" src="img/edit.png" alt="Изменить">`;
  let ul = document.querySelector('.backlog ul');
  ul.insertBefore(li, ul.firstChild);
  input.value = '';

  numberOfBacklogTasks.innerHTML++;
}

buttonAddNewTask.addEventListener('click', addNewNote);

function deleteTask(event) {
  let target = event.target;

  if (!target.hasAttribute('class')) return;
  let className = target.getAttribute('class');
  if (className.indexOf('action-img') == -1) return;
  if (className.indexOf('edit') != -1) return;

  let li = target.parentElement;
  let ul = li.parentElement;
  let textOfDeleteTask = li.innerHTML;
  let mainItem = ul.parentElement;
  let nameMainItem = '';

  switch(mainItem.firstElementChild.firstElementChild) {
    case numberOfBacklogTasks:
      numberOfBacklogTasks.innerHTML--;
      nameMainItem = numberOfBacklogTasks;
      li.innerHTML = '<div class="delete-task">Задача удалена</div><div class="cansel-delete-task">Отменить</div>';
      break;
    case numberOfInProgressTasks:
      numberOfInProgressTasks.innerHTML--;
      nameMainItem = numberOfInProgressTasks;
      li.innerHTML = '<div class="delete-task">Задача выполнена</div><div class="cansel-delete-task">Отменить</div>';
      break;
    case numberOfDoneTasks:
      numberOfDoneTasks.innerHTML--;
      nameMainItem = numberOfDoneTasks;
      li.innerHTML = '<div class="delete-task">Задача удалена</div><div class="cansel-delete-task">Отменить</div>';
  }

  let timeDeleteTask = setTimeout(function() {
      ul.removeChild(li);
      if (nameMainItem == numberOfInProgressTasks) {
        done.children[1].insertBefore(li, done.children[1].firstChild);
        li.innerHTML = textOfDeleteTask;
        numberOfDoneTasks.innerHTML++;
        li.removeChild(li.children[2]);
        li.children[2].insertAdjacentHTML('beforeBegin', '<img class="action-img delete" src="img/delete.png" alt="Удалить">')
      }
  }, 1500);

  function cancelDeleteTask() {
    li.innerHTML = textOfDeleteTask;
    clearTimeout(timeDeleteTask);
    nameMainItem.innerHTML++;
  }

  let buttonCancelDeleteTask = document.querySelectorAll('.cansel-delete-task');
  buttonCancelDeleteTask[buttonCancelDeleteTask.length - 1].addEventListener('click', cancelDeleteTask);

}


function editTask(event) {
  let target = event.target;

  if (!target.hasAttribute('class')) return;
  let className = target.getAttribute('class');
  if (className.indexOf('action-img') == -1) return;
  if (className.indexOf('edit') == -1) return;

  let li = target.parentElement;
  let ul = li.parentElement;
  let h3 = li.firstElementChild;
  let p = li.children[1];
  let textFromP = p.innerHTML;
  let textFromH3 = h3.textContent;
  let actionImgDelete = li.children[2];
  let actionImgEdit = li.lastElementChild;
  let textFromStartLi = li.innerHTML;

  li.removeChild(actionImgDelete);
  li.removeChild(actionImgEdit);

  let imgCancelEdit = document.createElement('img');
  imgCancelEdit.classList.add('edit-img');
  imgCancelEdit.setAttribute('src', 'img/delete.png');
  li.appendChild(imgCancelEdit);

  let imgSaveEdit = document.createElement('img');
  imgSaveEdit.classList.add('edit-img');
  imgSaveEdit.setAttribute('src', 'img/done.png');
  li.appendChild(imgSaveEdit);

  h3.innerHTML = `<input class="edit-input-field" type="text" value="${ textFromH3 }">`

  p.innerHTML = `<textarea class="edit-textarea">${ textFromP }</textarea>`

  let select = document.createElement('select');
  select.classList.add('select-name-main-item');

  let mainItem = li.parentElement.parentElement;
  let nameMainItem = '';

  switch(mainItem.firstElementChild.firstElementChild) {
    case numberOfBacklogTasks:
      select.innerHTML = `<option selected>Невыполнено</option><option>В процессе</option><option>Выполнено</option>`;
      nameMainItem = 'backlog';
      break;
    case numberOfInProgressTasks:
      select.innerHTML = `<option>Невыполнено</option><option selected>В процессе</option><option>Выполнено</option>`;
      nameMainItem = 'inProgress';
      break;
    case numberOfDoneTasks:
      select.innerHTML = `<option>Невыполнено</option><option>В процессе</option><option selected>Выполнено</option>`;
      nameMainItem = 'done';
  }

  li.appendChild(select);
  let startIndex = select.selectedIndex;

  function saveEdit() {
    let textFromInput = h3.firstElementChild.value;
    let textFromTextarea = p.firstElementChild.value;
    let index = select.selectedIndex;

    if (index == startIndex) {
      switch(nameMainItem) {
        case 'backlog':
          li.innerHTML = `<h3>${ textFromInput }</h3><p>${ textFromTextarea }</p><img class="action-img delete" src="img/delete.png" alt="Удалить"><img class="action-img edit" src="img/edit.png" alt="Изменить">`;
          break;
        case 'inProgress':
          li.innerHTML = `<h3>${ textFromInput }</h3><p>${ textFromTextarea }</p><img class="action-img done" src="img/done.png" alt="Выполнено"><img class="action-img edit" src="img/edit.png" alt="Изменить">`;
          break;
        case 'done':
          li.innerHTML = `<h3>${ textFromInput }</h3><p>${ textFromTextarea }</p><img class="action-img delete" src="img/delete.png" alt="Удалить"><img class="action-img edit" src="img/edit.png" alt="Изменить">`;
      }
    } else {
      ul.removeChild(li);
      let newUl = '';
      switch(index) {
        case 0:
          li.innerHTML = `<h3>${ textFromInput }</h3><p>${ textFromTextarea }</p><img class="action-img delete" src="img/delete.png" alt="Удалить"><img class="action-img edit" src="img/edit.png" alt="Изменить">`;
          newUl = backlog.children[1];
          newUl.insertBefore(li, newUl.firstChild);
          numberOfBacklogTasks.innerHTML++;
          break;
        case 1:
          li.innerHTML = `<h3>${ textFromInput }</h3><p>${ textFromTextarea }</p><img class="action-img done" src="img/done.png" alt="Выполнено"><img class="action-img edit" src="img/edit.png" alt="Изменить">`;
          newUl = inProgress.children[1];
          newUl.insertBefore(li, newUl.firstChild);
          numberOfInProgressTasks.innerHTML++;
          break;
        case 2:
          li.innerHTML = `<h3>${ textFromInput }</h3><p>${ textFromTextarea }</p><img class="action-img delete" src="img/delete.png" alt="Удалить"><img class="action-img edit" src="img/edit.png" alt="Изменить">`;
          newUl = done.children[1];
          newUl.insertBefore(li, newUl.firstChild);
          numberOfDoneTasks.innerHTML++;
      }
      switch(startIndex) {
        case 0:
          numberOfBacklogTasks.innerHTML--;
          break;
        case 1:
          numberOfInProgressTasks.innerHTML--;
          break;
        case 2:
          numberOfDoneTasks.innerHTML--;
      }
    }
  }

  function cancelEdit() {
    li.innerHTML = textFromStartLi;
  }

  imgSaveEdit.addEventListener('click', saveEdit);
  imgCancelEdit.addEventListener('click', cancelEdit);
}

main.addEventListener('click', deleteTask);
main.addEventListener('click', editTask);



/*
  * при нажатии enter в поле ввода новой заметки она должна вызывать срабатывание кнопки "добавить"
  * сделать анимацию изображения "информация" при нажатии на него
*/