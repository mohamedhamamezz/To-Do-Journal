const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-button');
const todoList = document.getElementById('todo-list');
const notification = document.getElementById('notification');

const showNotification = (message, type) => {
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
};

const saveToLocalStorage = () => {
    const tasks = [];
    document.querySelectorAll('.todo-item').forEach(item => {
        tasks.push({
            text: item.querySelector('.task-text').textContent,
            completed: item.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const loadFromLocalStorage = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTask(task.text, task.completed));
};

const addTask = (taskText, completed = false) => {
    if (taskText.trim() === '') {
        showNotification('Task cannot be empty.', 'error');
        return;
    }

    const listItem = document.createElement('li');
    listItem.className = 'todo-item';
    if (completed) listItem.classList.add('completed');

    const taskTextElement = document.createElement('span');
    taskTextElement.className = 'task-text';
    taskTextElement.textContent = taskText;
    listItem.appendChild(taskTextElement);

    const actionsContainer = document.createElement('div');
    actionsContainer.className = 'todo-actions';

    // إنشاء عنصر img
const img = document.createElement('img');

// تحديد مصدر الصورة
img.src = 'images/check-solid.svg';

// تعيين العرض والارتفاع
img.style.width = '22px';
img.style.height = '17px';
// img.style.border-radius =='66%';
// img.style.backgroundColor  = 'red'


    const completeButton = document.createElement('button');
    img.textContent = 'Complete';
    img.className = 'complete-button';
    img.onclick = () => {
        listItem.classList.toggle('completed');
        saveToLocalStorage();
        showNotification('Task updated.', 'success');
    };
    actionsContainer.appendChild(img);

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'edit-button';
    editButton.onclick = () => {
        const newText = prompt('Edit task:', taskTextElement.textContent);
        if (newText !== null && newText.trim() !== '') {
            taskTextElement.textContent = newText;
            saveToLocalStorage();
            showNotification('Task edited.', 'success');
        }
    };
    actionsContainer.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-button';
    deleteButton.onclick = () => {
        const isConfirmed = confirm(`Are you sure you want to delete this task: ${taskTextElement.textContent}?`);
if (isConfirmed) {
    taskTextElement.textContent = ''; // حذف النص
}

        listItem.remove();
        saveToLocalStorage();
        showNotification('Task deleted.', 'success');
        
    };
    actionsContainer.appendChild(deleteButton);

    listItem.appendChild(actionsContainer);
    todoList.appendChild(listItem);
    saveToLocalStorage();
    showNotification('Task added.', 'success');
};

addButton.onclick = () => {
    addTask(todoInput.value);
    todoInput.value = '';
};

todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask(todoInput.value);
        todoInput.value = '';
    }
});

loadFromLocalStorage();