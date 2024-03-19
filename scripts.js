$(document).ready(function(){

    // Load tasks from local storage when the page loads
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    var completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];

    // Load active tasks
    tasks.forEach(function(task) {
        if (typeof task === 'object' && task.hasOwnProperty('text') && task.hasOwnProperty('id')) {
            addTaskToUI(task.text, task.id, $('.active-tasks'));
            addTaskToUI(task.text, task.id, $('#taskList')); // Add tasks to manage.html
        } else {
            console.error('Invalid task:', task);
        }
    });

    // Load completed tasks
    completedTasks.forEach(function(task) {
        //this is what I had to do to ensure tasks load with an id and text properly
        if (typeof task === 'object' && task.hasOwnProperty('text') && task.hasOwnProperty('id')) {
            addTaskToUI(task.text, task.id, $('.completed-tasks'));
        } else {
            console.error('Invalid task:', task);
        }
    });

    // Function to add a new task
    $("#addTaskBtn").click(function(){

        var taskInput = $("#taskInput").val().trim();
        if(taskInput !== ""){
            // Generate a unique ID for the task
            var taskId = 'task-' + Date.now();

            // Add task to local storage
            tasks.push({ text: taskInput, id: taskId });
            localStorage.setItem('tasks', JSON.stringify(tasks));

            // Add task to the UI
            addTaskToUI(taskInput, taskId, $('.active-tasks'));
            addTaskToUI(taskInput, taskId, $('#taskList')); // Add task to manage.html (i barely know why this works)

            $("#taskInput").val(""); // Clear the input field
        } else {
            alert("Please enter a task!");
        }
    });

    // Function to mark a task as complete
    $(document).on("click", ".complete-btn", function(){

        //get the data
        var taskItem = $(this).closest('li'); //this.closest is the only way i can properly grab this data
        var taskId = taskItem.data('task-id');
        var taskText = taskItem.find('.task-text').text();

        // Move task to completed tasks array
        tasks = tasks.filter(function(task) {
            return task.id !== taskId;
        });
        completedTasks.push({ text: taskText, id: taskId });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        localStorage.setItem('completedTasks', JSON.stringify(completedTasks));

        // Update UI to show task as completed
        taskItem.remove();
        addTaskToUI(taskText, taskId, $('.completed-tasks'));
    });

    // Function to move a completed task back to active tasks
    $(document).on("click", ".undo-btn", function () {
        var taskItem = $(this).closest('li');
        var taskId = taskItem.data('task-id');
        var taskText = taskItem.find('.task-text').text();

        // Find the completed task to be undone
        var completedTaskIndex = completedTasks.findIndex(function (task) {
            return task.id === taskId;
        });

        if (completedTaskIndex !== -1) {
            // Remove the task from the completed tasks array
            var undoneTask = completedTasks.splice(completedTaskIndex, 1)[0];

            // Add the task back to the active tasks array
            tasks.push({ text: undoneTask.text, id: undoneTask.id });

            // Update local storage with the modified tasks arrays
            localStorage.setItem('tasks', JSON.stringify(tasks));
            localStorage.setItem('completedTasks', JSON.stringify(completedTasks));

            // Remove the task from the UI
            taskItem.remove();

            // Add the task to the active tasks UI
            addTaskToUI(undoneTask.text, undoneTask.id, $('.active-tasks'));
        }
    });

    // Function to delete a task
    $(document).on("click", ".delete-btn", function(){
        // Get the task ID to be deleted
        var taskId = $(this).closest('li').data('task-id');

        // Remove the task from the tasks array
        tasks = tasks.filter(function(task) {
            return task.id !== taskId;
        });

        // Update local storage with the modified tasks array
        localStorage.setItem('tasks', JSON.stringify(tasks));

        // Remove the task from the UI
        $(this).closest('li').remove();
    });

    // Function to clear all CompletedTasks
    $("#clearCompAllBtn").click(function(){

        // Clear all tasks from the UI
        $(".completed-tasks").empty();

        // Clear tasks array and update local storage
        completedTasks = [];
        localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
    });

    //TO_DO: add figure out why this won't work
    // //can't seem to figure out why this won't work. Issue with ID of active tasks and clearing it from UI. Local Storage clears just fine
    // // Function to clear all tasks
    // $("#clearAllBtn").click(function(){
    //
    //     // Clear all tasks from the UI
    //     $(".taskList").empty();
    //
    //     // Clear tasks array and update local storage
    //     tasks = [];
    //     localStorage.setItem('tasks', JSON.stringify(tasks));
    // });

    // Function to edit a task
    $(document).on("click", ".edit-btn", function(){
        var taskItem = $(this).closest('li'); // Get the parent list item of the clicked button

        // Prompt the user to enter the new task text
        var newTaskText = prompt("Enter the new task:", taskItem.find('.task-text').text());

        // If the user entered a new task and didn't cancel the prompt
        if (newTaskText !== null) {
            // Update the task text in the UI
            taskItem.find('.task-text').text(newTaskText);

            // Update the task in the tasks array
            var taskId = taskItem.data('task-id');
            var taskToUpdate = tasks.find(function(task) {
                return task.id === taskId;
            });

            // Update the task text in the tasks array
            if (taskToUpdate) {
                taskToUpdate.text = newTaskText;

                // Update local storage with the modified tasks array
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }
        }
    });

// Function to add task to the UI
    function addTaskToUI(task, taskId, $targetList) {
        var completeButton = $targetList.hasClass('active-tasks') ? '<button class="btn btn-primary btn-sm float-right complete-btn">Complete Task</button>' : '';
        var editDeleteButtons = '';

        var actionButtons = $targetList.hasClass('completed-tasks') ? '<button class="btn btn-warning btn-sm float-right undo-btn">Undo</button>' : '';

        // i dont know why but if this is here the manage page will actually work as intended
        if ($targetList.attr('id') === 'taskList') {
            editDeleteButtons = '<button class="btn btn-warning btn-sm float-right edit-btn">Edit</button><button class="btn btn-danger btn-sm float-right delete-btn">Delete</button>';
        }

        $targetList.append('<li class="list-group-item" data-task-id="' + taskId + '">' +
            '<span class="task-text">' + task + '</span>' +
            completeButton +
            editDeleteButtons +
            actionButtons +
            '</li>');
    }

});
