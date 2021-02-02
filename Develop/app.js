// adding classes and node packages

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

// for the creation of the new HTML page inside the new output folder

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// a constant variable to define the htmlRenderer

const render = require("./lib/htmlRenderer");

// create empty employee data array

const Employees = [];

// create initial questions for all employee prompts with input validation

function createManager(){
    console.log("Welcome to the employee directory generator")
}

inquirer.prompt([{
    type: "input",
    message: "Enter manager name: ",
    name: "name",
    validate: nameCheck => {
        if(nameCheck){
            return true
        } else {
            console.log("No, a real name, please.")
        }
    }
},
{
    type: "input",
    message: "Enter Employee ID: ",
    name: "id",
    validate: idCheck => {
        if (!isNaN(idCheck)) {
            if (!(idCheck === "")) {
                return true
            }
        } else {
            console.log("We need a valid number for your ID.")
        }
    }
},
{
    type: "input",
    message: "Enter employee email address: ",
    name: "email",
    validate: (email) => {
        if(validator.validate(email === true)){
            return true
        } else {
            console.log("Employee email required.")
        }    
    }
},
{
    type: "input",
    message: "Enter the office number: ",
    name: "officeNumber",
    validate: numberCheck => {
        if (!isNaN(numberCheck)) {
            if (!(numberCheck === "")) {
                return true 
            }
            console.log("We require a valid phone number for all managers.")
        } else {
            console.log("This field is required, please include a valid contact number.")
        }
    }
}
])
.then(function(answers) {
    const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber)
    Employees.push(manager)
    createEmployees()
})

function createEmployees() {
    inquirer.prompt([{
        type: "list",
        message: "Are you adding more members to your team today?",
        choices: ["Engineer", "Intern", "No more team members"],
        name: "newteam"
    }])
    .then(function(answers) {
        switch(answers.newteam) {
            case "Engineer":
                createEngineer()
                break
            case "Intern":
                createIntern()
                break
            case "No more team members":
                renderEmployees()
                break
            default: renderEmployees()
        }
    })
}

function createEngineer() {
    console.log("We require some information on this engineer to proceed.")
    inquirer.prompt([{
        type: "input",
        message: "What is this engineer's name?",
        name: "name",
    }])
}

// create questions only for manager with input validation

const managerQ = [{
    type: "input",
    message: "Enter the office number: ",
    name: "officeNumber",
    validate: numberCheck => {
        if (!isNaN(numberCheck)) {
            if (!(numberCheck === "")) {
                return true 
            }
            console.log("We require a valid phone number for all managers.")
        } else {
            console.log("This field is required, please include a valid contact number.")
        }
    }
}]

// create questions only for intern with input validation

const internQ = [{
    type: "input",
    message: "What school do you attend?",
    name: "school",
    validate: schoolCheck => {
        if (schoolCheck) {
            return true
        } else {
            console.log("All interns are required to input their current school.")
        }
    }
}]

// create questions only for engineer with input validation

const engineerQ = [{
    type: "input",
    message: "What is your GitHub name?",
    name: "github",
    validate: gitCheck => {
        if (gitCheck) {
            return true
        } else {
            console.log("All engineers are required to input their github username.")
        }
    }
}]

// pre-determine the length of the Employee array based on user input, with input validation

// const teamSizeQ = [{
//     type: "input",
//     message: "How many employees in your business?",
//     name: "teamLength",
//     validate: sizeCheck => {
//         if(!isNaN(sizeCheck)) {
//             if(!(teamCheck === "")) {
//                 return true
//             }
//             console.log("Number of employees is required to start.")
//         } else {
//             console.log("The number of employees is required to run this program.")
//         }
//     }
// }]

// create a new role for each member of the team

const newRole = [{
    type: "list",
    message: "What role does this team member play? ",
    choices: ["Intern", "Engineer", "Manager"],
    name: "role",
}]

// variable for a render function using the Employees array

let pageRendered = render(Employees)

// asynchronus function to include question rounds for each in order depending on user choices

async function init(){
    console.log("Please provide Team Manager information")
    roleType = "Manager"
    let firstQ = await inquirer.prompt(initQ)
    let secondQ = await inquirer.prompt(managerQ)

    var newManager = new Manager(firstQ.name, firstQ.id, firstQ.email, secondQ.officeNumber)
    Employees.push(newManager)

    // let teamSize = await inquirer.prompt(teamSizeQ)

// my application stops at this point! I am missing my error!!

    console.log("Tell us about your team members: ")

// loop through team size and determine which role was inputted by the user

    for (let i = 0; i < Employees; i++) {
        let role = await inquirer.prompt(newRole)
        var initialQ = await inquirer.prompt(initQ)

        if (role.role === "Engineer") {
            let engine = await inquierer.prompt(engineerQ)
            var newEngineer = new Engineer(initQ.name, initQ.id, initQ.email, engineerQ.github)
            Employees.push(newEngineer)
        } else {
            console.log("You must be an intern. That's great, we only need a bit more information.")
            let intern = await inquirer.prompt(internQ)
            let newIntern = new Intern(initQ.name, initQ.id, initQ.email, internQ.school)
            Employees.push(newIntern)
        }
    }

    // pageRendered
    writeFile()
}

// function to write the file and / or create the OUTPUT_DIR if it does not already exist

function writeFile() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFile(outputPath, render(Employees), (error) =>
        error ? console.error(error) : console.log("You did it! Page rendered!"))
}

init();