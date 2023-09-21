// Model

// If localstorage has a todos array, then use it

// Otherwise use the default array.

let todos;

// Retrieve localStorage

const savedTodos = JSON.parse(localStorage.getItem('todos'));

// Check if it's an array

if (Array.isArray(savedTodos)) {
  newTodos = []
  savedTodos.forEach((item) => {
    newTodos.push({
      title: item.title,
      dueDate: new Date(item.dueDate),
      daysLeft: item.daysLeft,
      id: item.id
    });
  })
  todos = newTodos;

} else {

  todos = [{

    title: 'Get groceries',

    dueDate: new Date('2021-10-04T22:30'),

    daysLeft: ('5 days left'),

    // correctTime: '10:30 pm',

    id: 'id1'

  }, {

    title: 'Wash car',

    dueDate: new Date('2021-02-03T11:00'),

    daysLeft: daysLeft,



    // correctTime: '11:00 am',

    id: 'id2'


  }, {

    title: 'Make dinner',

    dueDate: new Date('2021-03-04T23:59'),

    // correctTime: '11:59 pm',

    id: 'id3'

  }];

}

// Creates a todo

const createTodo = (title, dueDate, daysLeft) => {

  const id = '' + new Date().getTime();


  // console.log(correctTime)

  todos.push({

    title: title,

    dueDate: dueDate,

    daysLeft: daysLeft,

    // time: correctTime,

    id: id

  });

  saveTodos();

}

//todos.sort((a,b)=> new Date (a.correctTime) - new Date (b.correctTime));

// Deletes a todo

const removeTodo = idToDelete => {

  todos = todos.filter(todo => {

    // If the id of this todo matches idToDelete, return false

    // For everything else, return true

    if (todo.id === idToDelete) {

      return false;

    } else {

      return true;

    }

  });

  saveTodos();

}



const saveTodos = () => {

  localStorage.setItem('todos', JSON.stringify(todos));

}



// Controller

const addTodo = () => {

  const textbox = document.getElementById('todo-title');

  const title = textbox.value;


  const datePicker = document.getElementById('date-picker');

  const dueDate = new Date(datePicker.value);



  // var timePicker = document.getElementById('time-picker');

  // var time = timePicker.value;

  // function timeChange(time) {
  //   var timeSplit = timePicker.value.split(':'),
  //     hours,
  //     minutes,
  //     meridian;
  //   hours = timeSplit[0];
  //   minutes = timeSplit[1];
  //   if (hours > 12) {
  //     meridian = 'PM';
  //     hours -= 12;
  //   } else if (hours < 12) {
  //     meridian = 'AM';
  //     if (hours == 0) {
  //       hours = 12;
  //     }
  //   } else {
  //     meridian = 'PM';
  //   }
  //   return(hours + ':' + minutes + ' ' + meridian);
  // }

  // let correctTime = timeChange(time);
  // console.log(correctTime);

  createTodo(title, dueDate);


}



const deleteTodo = event => {

  const deleteButton = event.target;

  const idToDelete = deleteButton.id;



  removeTodo(idToDelete);

}

// View

const render = () => {
  setTimeout(render, 1000);
  // reset our list

  todos.sort((a, b) => a.dueDate - b.dueDate);

  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = '';

  todos.forEach(todo => {

    const element = document.createElement('div');


    const dueDate = todo.dueDate;

    let timeDiff = (dueDate.getTime() - new Date().getTime())/1000;
    if (timeDiff<=0) {
      element.innerText = todo.title + ' ' + dueDate.toLocaleString('en-US') + '      PAST DUE!';
    } else {
      let daysLeft = Math.floor(timeDiff/86400);
      timeDiff -= daysLeft * 86400;
      let hoursLeft = Math.floor(timeDiff/3600)%24;
      timeDiff -= hoursLeft*3600;
      let minsLeft = Math.floor (timeDiff/60)%60;
      timeDiff -= minsLeft*60;
      let secsLeft = Math.floor(timeDiff%60);
      element.innerText = todo.title + ' ' + dueDate.toLocaleString('en-US') + ' '  + daysLeft + 'days, ' + hoursLeft + ' hours, ' + minsLeft + ' minutes, ' + secsLeft + ' seconds left ';
      if (daysLeft === 0 && hoursLeft === 0 && minsLeft === 5 && secsLeft === 0) {
        const audio = $("#player");
        audio.attr("src", "alarm.mp3");
        audio[0].pause();
        audio[0].load();
        audio[0].oncanplay = audio[0].play(); 
      }
    }

    //element.innerText = '${todo.title} (due in ${daysLeft} days)';
    const deleteButton = document.createElement('button');

    deleteButton.innerText = 'Delete';

    deleteButton.style = 'margin-left: 12px';

    deleteButton.onclick = deleteTodo;

    deleteButton.id = todo.id;
    overdue.style = 'margin-left:20px';

    element.appendChild(deleteButton);
    if (todo.dueDate < new Date()) {
      element.classList.add("overdue");
    }
    todoList.appendChild(element);



  });

}
render();


