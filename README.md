# homework-week-10-employee-directory

This is a tool to develop an employee directory. The application receives user data, and saves it for later display.

//

# dependencies

To run this program, be sure to install dependencies on your local machine. Here is the complete list or required dependencies, available via terminal:

    "email-validator": "^2.0.4",
    "express": "^4.17.1",
    "inquirer": "^6.5.2",
    "path": "^0.12.7",
    "render": "^0.1.4",
    "validator": "^13.5.2"

# how to use

open the app.js file using node "node app.js" to review the back end application. Follow the prompts to view the application in your browser. Within the terminal, you will provide information on the employees, and they will push to the employee array. The user data is sent to the HTML file using the render method.

# models

There are three models in place within our original file structure: Manager, Engineer, and Intern. Each of these models requires distinct information, and the CLI follows each step of the process prior to pushing the user response data to the HTML.

# future versions

A future version of this application would allow for further database management and database queries, using MySQL. Rather than running via CLI, we can also update the application to take user data on the client side.

//

classmate Jenner Garcia provided insight on how to organize my inquirer prompts on this assignment
