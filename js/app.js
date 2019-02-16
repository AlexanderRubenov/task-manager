"use strict";
let
  containerOfAllSections = document.querySelector('main'),
  [sectionBacklog, sectionInProgress, sectionDone] = document.querySelectorAll('.main-item'),
  [textInputFieldForNewTask, buttonToAddNewTask] = document.querySelectorAll('input'),
  taskNumber = document.querySelector('.task-number').textContent,
  [listOfBacklogTasks, listOfInProgressTasks, listOfDoneTasks] = document.querySelectorAll('ul'),
  [numberOfBacklogTasks, numberOfInProgressTasks, numberOfDoneTasks] = document.querySelectorAll('.number-of-tasks');

function addNewTaskInSectionBacklog() {
  if (!textInputFieldForNewTask.value) return;
  let li = document.createElement('li');
  li.innerHTML = `<h3>Задача #<span>${ ++taskNumber }</span></h3><p>${ textInputFieldForNewTask.value }</p><img class="action-img delete" src="img/delete.png" alt="Удалить" title="Удалить"><img class="action-img edit" src="img/edit.png" alt="Изменить" title="Изменить">`;
  listOfBacklogTasks.insertBefore(li, listOfBacklogTasks.firstChild);
  textInputFieldForNewTask.value = '';
  changeNumberOfTasks();
};

buttonToAddNewTask.addEventListener('click', addNewTaskInSectionBacklog);

function deleteTask(event) {
  let target = event.target;

  if (!target.hasAttribute('class') || !(target.getAttribute('class').includes('delete') && (target.tagName === 'IMG'))) return;

  let 
    li = target.parentElement,
    ul = li.parentElement,
    textOfTask = li.innerHTML;

  li.innerHTML = `<div class="delete-task">Задача удалена</div><div class="cansel-delete-task">Отменить</div>`;

  let
    timerDeleteTask = setTimeout(() => {
      ul.removeChild(li);
      changeNumberOfTasks();
  }, 1500),
    buttonToCancelDeleteTask = document.querySelectorAll('.cansel-delete-task');

  function cancelDeleteTask() {
    li.innerHTML = textOfTask;
    clearTimeout(timerDeleteTask);
  };

  buttonToCancelDeleteTask[buttonToCancelDeleteTask.length - 1].addEventListener('click', cancelDeleteTask);
};

containerOfAllSections.addEventListener('click', deleteTask);

function performTask(event) {
  let target = event.target;

  if (!target.hasAttribute('class') || !(target.getAttribute('class').includes('done') && (target.tagName === 'IMG'))) return;

  let 
    li = target.parentElement,
    ul = li.parentElement,
    textOfTask = li.innerHTML;

  li.innerHTML = `<div class="delete-task">Задача выполнена</div><div class="cansel-delete-task">Отменить</div>`;

  let
    timerDeleteTask = setTimeout(() => {
      ul.removeChild(li);
      listOfDoneTasks.insertBefore(li, listOfDoneTasks.firstChild);
      li.innerHTML = textOfTask;
      li.removeChild(li.children[2]);
      li.children[2].insertAdjacentHTML(`beforeBegin`, `<img class="action-img delete" src="img/delete.png" alt="Удалить" title="Удалить">`);
      changeNumberOfTasks();
  }, 1500),
    buttonToCancelDeleteTask = document.querySelectorAll('.cansel-delete-task');

  function cancelDeleteTask() {
    li.innerHTML = textOfTask;
    clearTimeout(timerDeleteTask);
  };

  buttonToCancelDeleteTask[buttonToCancelDeleteTask.length - 1].addEventListener('click', cancelDeleteTask);
};

containerOfAllSections.addEventListener('click', performTask);

function editTask(event) {
  let target = event.target;

  if (!target.hasAttribute('class') || !(target.getAttribute('class').includes('edit') && (target.tagName === 'IMG'))) return;

  let
    li = target.parentElement,
    headerOfLi = li.firstElementChild,
    contentOfLi = li.children[1],
    initialImgOne = li.lastElementChild,
    initialImgTwo = li.children[2],
    textOfTask = li.innerHTML;

  headerOfLi.innerHTML = `<input class="edit-input-field" type="text" value="${ headerOfLi.textContent }">`;
  contentOfLi.innerHTML = `<textarea class="edit-textarea">${ contentOfLi.innerHTML }</textarea>`;

  li.removeChild(initialImgOne);
  li.removeChild(initialImgTwo);

  contentOfLi.insertAdjacentHTML(`afterEnd`, `<img class="change-img" src="img/delete.png"><img class="change-img" src="img/done.png"><select class="select-name-main-item"><option>Невыполнено</option><option>В процессе</option><option>Выполнено</option></select>`);

  let
    selectSection = document.querySelector('.select-name-main-item'),
    [imgToCancelEdit, imgToSaveEdit] = document.querySelectorAll('.change-img');

  selectSection.selectedIndex = li.parentElement.dataset.select;

  function saveEdit() {
    if (li.parentElement.dataset.select == selectSection.selectedIndex) {
      li.innerHTML = `<h3>${ headerOfLi.firstElementChild.value }</h3><p>${ contentOfLi.firstElementChild.value }</p>`;
      li.appendChild(initialImgTwo);
      li.appendChild(initialImgOne);
    } else {
      li.parentElement.removeChild(li);

      switch(selectSection.selectedIndex) {
        case 0:
          li.innerHTML = `<h3>${ headerOfLi.firstElementChild.value }</h3><p>${ contentOfLi.firstElementChild.value }</p><img class="action-img delete" src="img/delete.png" alt="Удалить" title="Удалить"><img class="action-img edit" src="img/edit.png" alt="Изменить" title="Изменить">`;
          listOfBacklogTasks.insertBefore(li, listOfBacklogTasks.firstChild);
        break;
        case 1:
          li.innerHTML = `<h3>${ headerOfLi.firstElementChild.value }</h3><p>${ contentOfLi.firstElementChild.value }</p><img class="action-img done" src="img/done.png" alt="Выполнено" title="Выполнено"><img class="action-img edit" src="img/edit.png" alt="Изменить" title="Изменить">`;
          listOfInProgressTasks.insertBefore(li, listOfInProgressTasks.firstChild);
        break;
        case 2:
          li.innerHTML = `<h3>${ headerOfLi.firstElementChild.value }</h3><p>${ contentOfLi.firstElementChild.value }</p><img class="action-img delete" src="img/delete.png" alt="Удалить" title="Удалить"><img class="action-img edit" src="img/edit.png" alt="Изменить" title="Изменить">`;
          listOfDoneTasks.insertBefore(li, listOfDoneTasks.firstChild);
      };
      changeNumberOfTasks();
    };
  };

  function cancelEdit() {
    li.innerHTML = textOfTask;
  };

  imgToSaveEdit.addEventListener('click', saveEdit);
  imgToCancelEdit.addEventListener('click', cancelEdit);
};

containerOfAllSections.addEventListener('click', editTask);

function changeNumberOfTasks() {
  numberOfBacklogTasks.textContent = listOfBacklogTasks.children.length;
  numberOfInProgressTasks.textContent = listOfInProgressTasks.children.length;
  numberOfDoneTasks.textContent = listOfDoneTasks.children.length;
};