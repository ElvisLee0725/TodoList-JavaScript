let todoList = {
	todos: [],
	addTodo: function(todoText) {
		let todo = {
			todoText,
			completed: false
		}
		this.todos.push(todo);
	},
	changeTodo: function(index, todoText) {
		if(index < 0 || index >= this.todos.length) {
			console.log('There is no item on this index');
			return ;
		}
		this.todos[index].todoText = todoText;
	},
	deleteTodo: function(index) {
		if(index < 0 || index >= this.todos.length) {
			console.log('There is no item on this index');
			return ;
		}
		this.todos.splice(index, 1);
	},
	toggleCompleted: function(index) {
		if(index < 0 || index >= this.todos.length) {
			console.log('There is no item on this index');
			return ;
		}
		this.todos[index].completed = !this.todos[index].completed;
	},
	toggleAll: function() {
		let countCompleted = 0;
		this.todos.forEach((todo) => {
			if(todo.completed) {
				countCompleted++;
			}
			else {
				todo.completed = true;
			}
		});
		// Cancel all completed when every todo is initially completed
		if(countCompleted === this.todos.length) {
			this.todos.forEach((todo) => {
				todo.completed = false;
			});
		}
	}
};


// Write functions inside this handlers object
let handlers = {
	addTodo: function() {
		let todoText = document.getElementById('addTodoTextInput').value;
		todoList.addTodo(todoText);
		document.getElementById('addTodoTextInput').value = '';
		view.displayTodos();
	},
	changeTodo: function() {
		let indexToChange = document.getElementById('changeTodoPositionInput');
		let todoTextToChange = document.getElementById('changeTodoTextInput');
		todoList.changeTodo(indexToChange.valueAsNumber, todoTextToChange.value);
		indexToChange.value = '';
		todoTextToChange.value = '';
		view.displayTodos();
	},
	deleteTodo: function(index) {
		todoList.deleteTodo(index);
		view.displayTodos();
	},
	toggleCompleted: function() {
		let indexToToggle = document.getElementById('toggleTodoPositionInput');
		todoList.toggleCompleted(indexToToggle.valueAsNumber);
		indexToToggle.value = '';
		view.displayTodos();
	},
	toggleAll: function() {
		todoList.toggleAll();
		view.displayTodos();
	}
};

// This view's only purpose is to display todos
let view = {
	displayTodos: function() {
		let todoUl = document.querySelector('ul');
		todoUl.innerHTML = '';

		todoList.todos.forEach((todo, index) => {
			let todoLi = document.createElement('li');
			let todoTextWithCompletion = '';
			if(todo.completed) {
				todoTextWithCompletion = `(x) ${todo.todoText}`;
			}
			else {
				todoTextWithCompletion = `( ) ${todo.todoText}`;
			}

			todoLi.id = index;
			todoLi.textContent = todoTextWithCompletion;
			todoLi.appendChild(this.createDeleteBtn());
			todoUl.appendChild(todoLi);
		});
	}, 
	createDeleteBtn: function() {
		let deleteBtn = document.createElement('button');
		deleteBtn.textContent = 'Delete';
		deleteBtn.className = 'deleteBtn';
		return deleteBtn;
	},
	setupEventListeners: function() {
		const todoUl = document.querySelector('ul');

		todoUl.addEventListener('click', function(e){
			const eleClicked = e.target;
			// Check if the clicked element is delete button
			if(eleClicked.className === 'deleteBtn') {
				// The parent node is <li id="">. Convert id string to integer
				handlers.deleteTodo(parseInt(eleClicked.parentNode.id));	
			}
		});
	}
}

view.setupEventListeners();