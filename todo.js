const addTaskBtn = document.getElementById('add-task-btn');
const deskTaskInput = document.getElementById('desription-task');
const todosWrapper = document.querySelector('.todos-wrapper');
const footerBtnWrap = document.querySelector('.footer-wrap')
const taskCompleteBtn = document.getElementById('btn-complete')
const itemsLeftNumber = document.querySelector('.items-left')
const allTasksBtn = document.getElementById('all-tasks');
const activeTasksBtn = document.getElementById('active-tasks');
const completedTasksBtn = document.getElementById('completed-tasks');
const clearCompletedTasksBtn = document.getElementById('clear-completed-tasks');


let tasks;
let todoItemsElems = [];


!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

function Task(description) {
	this.description = description;
	this.completed = false;
}

const createTemplateTasks = (task, index) => {
	return `
		<div class="todo-item ${task.completed ? 'checked' : ''}">
			<div class="description">${task.description}</div>
			<div class="buttons">
				<input onclick='completeTask(${index})' class="btn-complete" type="checkbox" ${task.completed ? 'checked' : ''}>
				<button onclick='deleteTask(${index})' class="btn-delete">Delete</button>
			</div>        
		</div>	
	`
}

const fillHtmlList = () => {
	todosWrapper.innerHTML = "";
	if (tasks.length > 0) {
		tasks.forEach((item, index) => {
			todosWrapper.innerHTML += createTemplateTasks(item, index);
						
		});
		todoItemsElems = document.querySelectorAll('.todo-item');
	}
} 

fillHtmlList();

const updateLocal = () => {
	localStorage.setItem('tasks', JSON.stringify(tasks));	
}

const completeTask = index => {
	// console.log(index);
	tasks[index].completed = !tasks[index].completed;
	if (tasks[index].completed) {
		todoItemsElems[index].classList.add('checked');
	} else {
		todoItemsElems[index].classList.remove('checked');
	}
	updateLocal();
	fillHtmlList();
}

function addTask() {
	tasks.push(new Task(deskTaskInput.value));	
	updateLocal();
	fillHtmlList();
	deskTaskInput.value = '';	
}

const deleteTask = index => {
	todoItemsElems[index].classList.add('delition')
	
	setTimeout(() => {
		tasks.splice(index, 1);
	updateLocal();
	fillHtmlList();
		
	}, 500)
}

function showItemsLeftQty() {
	updateLocal()
	return tasks.filter(item => item.completed === false).length;
}

itemsLeftNumber.insertAdjacentHTML("afterbegin", showItemsLeftQty());

function showActiveTasks() {
	
}



addTaskBtn.addEventListener('click', addTask)
allTasksBtn.addEventListener('click', fillHtmlList)
// activeTasksBtn.addEventListener('click', showActiveTasks)
// completedTasksBtn.addEventListener('click', showCompletetedTasks)
// clearCompletedTasksBtn.addEventListener('click', clearCompletedTasks)
