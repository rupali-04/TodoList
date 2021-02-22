//Sectors

const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const filterTodos = document.querySelector('.filter-todos')

console.log(todoButton)
//Event Listner
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addtodo)
todoList.addEventListener('click',deleteCheck)
filterTodos.addEventListener('click',filtertodo)

//function

function addtodo(event){
    event.preventDefault();
    //console.log(event)
    const tododiv = document.createElement('div');
    tododiv.classList.add("todo");
    const newtodo = document.createElement('li');
    newtodo.innerText = todoInput.value; 
    newtodo.classList.add('todo-item');
    tododiv.appendChild(newtodo);
    //Save to Local storage
    saveLocalTodos(todoInput.value)
//Check Button
const completedButton = document.createElement('button');
completedButton.innerHTML = '<i class="fas fa-check"></i>'
completedButton.classList.add('complete-btn');
tododiv.appendChild(completedButton);
//Trash Button
const Trash = document.createElement('button');
Trash.innerHTML = ""; 
Trash.classList.add('trash-btn');
tododiv.appendChild(Trash);
//Append to list
todoList.appendChild(tododiv);
todoInput.value = "";
}
function deleteCheck(e){
    //console.log(e.target);
    //const i = document.getElementsByClassName('li')
    const item = e.target;
   console.log(item.classList[0])
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        todo.classList.add('fall');
       removeLocalTodo(todo)
        todo.addEventListener('transitionend',function () {
            
            todo.remove();
            
        });
        
       // todo.remove();
    }
    
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}


function filtertodo(e){
   // const todos = document.querySelectorall('.todo-list');
   const todos = todoList.childNodes;
   console.log(todos)
   for(var i=1;i<todos.length;i++){
     todo = todos[i];
         switch(e.target.value){
            case 'all':
                todo.style.display = 'flex';
                break;
                case 'completed':
                    if(todo.classList.contains('completed')){
                        todo.style.display = 'flex';

                    }else{
                        todo.style.display = "none";
                    }
                break;
                case 'uncompleted':
                    if(!todo.classList.contains('completed')){
                        todo.style.display = 'flex';
                    }
                    else{
                        todo.style.display = 'none';
                    }
                    break;
        }
    }
    }

    function saveLocalTodos(todo){
        //check that do you have any local todo...
        let todos;
        if(localStorage.getItem('todos') === null){
            todos = [];
        }else{
            todos = JSON.parse(localStorage.getItem('todos'));
        }
        todos.push(todo);
        localStorage.setItem('todos',JSON.stringify(todos))
    }
    function getTodos(){
        let todos;
          if(localStorage.getItem('todos') === null){
            todos = [];
        }else{
            todos = JSON.parse(localStorage.getItem('todos'));
        }
        todos.forEach(todo =>{
            const tododiv = document.createElement('div');
    tododiv.classList.add("todo");
    const newtodo = document.createElement('li');
    newtodo.innerText = todo; 
    newtodo.classList.add('todo-item');
    tododiv.appendChild(newtodo);
    
//Check Button
const completedButton = document.createElement('button');
completedButton.innerHTML = '<i class="fas fa-check"></i>'
completedButton.classList.add('complete-btn');
tododiv.appendChild(completedButton);
//Trash Button
const Trash = document.createElement('button');
Trash.innerHTML = "<i class='fas fa-trash'></i>"; 
Trash.classList.add('trash-btn');
tododiv.appendChild(Trash);
//Append to list
todoList.appendChild(tododiv);
        })
    }

    function removeLocalTodo(todo){
         let todos;
          if(localStorage.getItem('todos') === null){
            todos = [];
        }else{
            todos = JSON.parse(localStorage.getItem('todos'));
        }
        const todoIndex = todo.children[0].innerText;
        todos.splice(todos.indexOf(todoIndex), 1);
          localStorage.setItem('todos',JSON.stringify(todos))
    }


