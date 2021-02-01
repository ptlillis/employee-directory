const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");


const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const Employees = [];
let pageRendered = render(Employees)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

const initQ = [{
    type: "input",
    message: "Enter name: ",
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
    validate: emailCheck => {
        if(emailCheck){
            return true
        } else {
            console.log("Employee email required.")
        }    
    }
}
]

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

const teamSizeQ = [{
    type: "input",
    message: "How many employees in your business?",
    name: "teamLength",
    validate: sizeCheck => {
        if(!isNaN(sizeCheck)) {
            if(!(teamCheck === "")) {
                return true
            }
            console.log("Number of employees is required to start.")
        } else {
            console.log("The number of employees is required to run this program.")
        }
    }
}]

const newRole = [{
    type: "list",
    message: "What role does this team member play? ",
    choices: ["Intern", "Engineer", "Manager"],
    name: "role"
}]

async function init(){
    console.log("Please provide Team Manager information")
    roleType = "Manager"
    let firstQ = await inquirer.prompt(initQ)
    let secondQ = await inquirer.prompt(managerQ)

    let newManager = new Manager(firstQ.name, firstQ.id, firstQ.email, secondQ.officeNumber)
    Employees.push(newManager)

    let teamSize = await inquirer.prompt(teamSizeQ)

    console.log("Tell us about your team members: ")

    for (let i = 0; i < teamSize.teamLength; i++) {
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

    pageRendered
    writeFile()
}

function writeFile() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFile(outputPath, pageRendered, (error) =>
        error ? console.error(error) : console.log("You did it! Page rendered!"))
}

init();

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
