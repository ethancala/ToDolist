Application Overview / Summary 

This To-do-List application allows users to view, add, delete, edit, complete, and clear tasks (using a web browser like Firefox or Chrome). There are no accounts, no service logins and no software to download. The data entered lives only on the device from which it is created (local storage).

There are only 3 pages to the entire site (index.html, about.html, and manage.html) and one main JavaScript file to control app functions script.js. The site makes use of Bootstrap for all styling.

The site features 6 buttons:
•	Complete Task
•	Undo 
•	Clear All Completed Tasks
•	Add Task
•	Edit Task
•	Delete Task
The quantity (total number) of tasks that can be created, and the length of each task created is limited by the storage capacity of the browser’s implementation of the HTML-5 localStorage standard. This means that some users will have larger storage areas than others, and the exact size of storage is subject to change over time. Typical local storage area is from 2 – 10 MB with 5 MB being average. 



Privacy of Data Stored by the Application

This application does not save any information onto the cloud (or online), but instead uses your local browser (like Firefox or Chrome) via HTML5 localStorage to save tasks for later retrieval.
	
The benefit is that your information remains private to your device, and is never harvested, collected, shared or sold with any party anywhere in person or virtually.

Application Limitations

This application is free to use but absolutely no warranty or guarantee is made about its performance, reliability or security.

While a user might copy the code and run the app locally, online users must be notified that the application has no maintenance schedule and may without explanation one day disappear, change, be modified/updated or otherwise suddenly fail. 





Detailed Description of Site Pages


Quick Summary of Site Pages

index.html 		Main or home page which lists all saved tasks, either completed or active. 
Users can mark tasks as complete, clear completed tasks, and undo the mark if needed.

manage.html 	This page allows users to add tasks, edit tasks, and delete tasks. Also shows active tasks.

about.html		Description and details page for the application.

script.js	JavaScript document with all functionalities of the application written with jQuery.

Home Page (index.html)
This serves as the primary landing page for users, presenting a welcome message alongside their active tasks and completed tasks. Users have the ability to mark tasks as completed or undo these actions if needed. It serves as a convenient page for users to easily view their tasks or promptly mark them as completed. They also can clear their completed tasks.

Manage Tasks Page (manage.html) 
On this page, users have the capability to add, modify, or remove active tasks. It's important to note that once a task is marked as complete, users lose the ability to edit or delete it directly. However, users can revert a task to active status (using the undo button on the home page) to regain these functionalities as needed.

About (about.html)
This simple page provides the user with details on what the application can do.





API of functions in JavaScript Document (script.js)

loadTasks: Loads tasks from local storage when the page loads.
addTask: Adds a new task to the list of tasks.
markTaskAsComplete: Marks a task as complete when the corresponding button is clicked.
undoMarkAsComplete: Moves a completed task back to the list of active tasks when the undo button is clicked.
deleteTask: Deletes a task from the list when the corresponding delete button is clicked.
clearAllCompletedTasks: Clears all completed tasks from the UI and local storage when the "Clear All Completed Tasks" button is clicked.
editTask: Allows the user to edit a task when the corresponding edit button is clicked.
addTaskToUI: Adds a task to the user interface based on its status (active or completed) and the target list specified.




Technical (Code) Discussion


Technology Stack
	HTML, CSS, JavaScript (jQuery), and Bootstrap
	Browsers supporting Local Storage (Chrome, Firefox, Safari, Mobile)
	HTML-5: LocalStorage and Session Storage (see description below)
	Recommended Web Server: built-in PHPStorm webserver.

 

Navigation Bar: Home, About, Manage.



Project File Hierarchy


	/ToDoList/
		index.html 
		manage.html 
		about.html 
	  	script.js 
		readme.txt

 
