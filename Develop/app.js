const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const validator = require("email-validator")

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { create } = require("domain");

const Employees = [];

createManager()

function createManager(){
    console.log("Welcome to the employee directory generator")
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
                if(validator.validate(email) === true){
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
   ]).then(function(answers) {
    const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber)
    Employees.push(manager)
    createEmployees()
})
}

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
                break;
            case "Intern":
                createIntern()
                break;
            case "No more team members":
                renderEmployees()
                break;
            default: renderEmployees()
        }
    })
}

function createEngineer() {
    console.log("We require some information on this engineer to proceed.")
    inquirer.prompt([{
        type: "input",
        message: "Enter engineer name: ",
        name: "name",
        validate: engineerCheck => {
            if(engineerCheck){
                return true
            } else {
                console.log("No, a real name, please.")
            }
        }
    },
    {
        type: "input",
        message: "Please provide engineer employee ID number: ",
        name: "id",
        validate: idCheck => {
            if (!isNaN(idCheck)) {
                if (!(idCheck === "")) {
                    return true 
                }
                console.log("We require a valid ID number for all engineers.")
            } else {
                console.log("This field is required, please include a ID number.")
            }
        } 
    },
    {
        type: "input",
        message: "Please provide engineer employee email address: ",
        name: "email",
        validate: (email) => {
            if(validator.validate(email) === true){
                return true
            } else {
                console.log("Employee email required.")
            }    
        }
    },
    {
        type: "input",
        message: "Please provide engineer employee GitHub username: ",
        name: "github",
        validate: gitCheck => {
            if(gitCheck){
                return true
            } else {
                console.log("No, a real GitHub username please.")
            }
        }
    }
])
.then(function(answers) {
    const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github)
    Employees.push(engineer)
    createEmployees()
})
}

function createIntern() {
    console.log("We require further information on the intern before proceeding.")
    inquirer.prompt([{
        type: "input",
        message: "Please provide the full name of the intern: ",
        name: "name",
        validate: internCheck => {
            if(internCheck){
                return true
            } else {
                console.log("Full name must be provided to proceed.")
            }
        }

    },
    {
        type: "input",
        message: "Please provide intern employee ID number: ",
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
        message: "Please provide intern employee email address: ",
        name: "email",
        validate: (email) => {
            if(validator.validate(email) === true){
                return true
            } else {
                console.log("Employee email required.")
            }    
        }
    },
    {
        type: "input",
        message: "What school does the intern attend?",
        name: "school",
        validate: schoolCheck => {
            if(schoolCheck){
                return true
            } else {
                console.log("You must provide a school for this intern entry.")
            }
        }
    }
])
.then(function(answers) {
    const intern = new Intern(answers.name, answers.id, answers.email, answers.school)
    Employees.push(intern)
    createEmployees()
})
}

function renderEmployees() {
    if(!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFile(outputPath, render(Employees), function(err) {
        if (err) throw err
        console.log("You generated your roster.")
    })
}