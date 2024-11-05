// Client data: name, ID, password, balance
let users = [
    {id: '1', name: 'John-117', password: '117', balance: '500000'},
    {id: '2', name: 'Ellen Ripley', password: 'nostromo', balance: '1500000'},
    {id: '3', name: 'Newt Scamander', password: 'niffler', balance: '80000'}
]

// Welcome Message
function welcome(){
    alert('Welcome to Simple Bank Simulator');
    validation();
}


// ID and password validation
function validation(){
    var userId = prompt('Enter your user ID');
    var password = prompt('Enter your password');

    // Fetch user data
    var user = users.find(user => user.id === userId && user.password === password);

    // Validation success message: Welcome {name}
    if (user){
        alert(`Welcome ${user.name}`);
        menu(user);
    } else {
        alert('Incorrect ID or password, please try again');
        welcome();
    }
}


// Menu options: check balance, withdraw, deposit, exit
// Error message if an invalid option is chosen
function menu(user) {
    let options;
    while (true) {
        options = prompt('Enter your option \n1 Check Balance \n2 Withdraw \n3 Deposit \n4 Exit');

        // Exit the menu if the user clicks "Cancel" in the prompt
        if (options === null) {
            alert("Operation canceled. Thank you for using our service.");
            return; // Exit the function entirely
        }

        switch (options) {
            case "1":
                checkBalance(user);
                break;
            case "2":
                withdraw(user);
                break;
            case "3":
                deposit(user);
                break;
            case "4":
                exit();
                return; // Exit the function entirely
            default:
                alert("Invalid option, please try again.");
                break;
        }
    }
}

// Menu functions
function checkBalance(user){
    alert(`Your balance is: $${user.balance}`);
}

// Withdraw
function withdraw(user){
    var withdrawAmount = parseFloat(prompt(`Your current balance is: $${user.balance} \nEnter the amount to withdraw`)); // Testing parseFloat to avoid errors

    // Extra checks to verify valid data
    if (!isNaN(withdrawAmount) && withdrawAmount > 0 && withdrawAmount <= user.balance) {
        user.balance -= withdrawAmount;
        alert(`Withdrawal successful. Your new balance is $${user.balance}`);
    } else if (withdrawAmount <= 0) {
        alert('The amount must be greater than 0');
        withdraw(user); // Returns to the same withdrawal prompt, no exit mode was specified in evaluation
    } else {
        alert('Invalid or insufficient amount');
        withdraw(user); // Ditto
    }
}

// Deposit
function deposit(user){
    var depositAmount = parseFloat(prompt(`Your current balance is: $${user.balance} \nEnter the amount to deposit:`));

    // Extra checks to verify valid data, fewer checks than Withdraw since it doesn’t compare to balance
    if (!isNaN(depositAmount) && depositAmount > 0) {
        user.balance += depositAmount;
        alert(`Deposit successful. Your new balance is $${user.balance}`);
    } else {
        alert('Invalid amount. Must be a number greater than 0.');
        deposit(user); // Re-prompt for valid input
    }
}

function exit(){
    alert('Thank you for choosing us');
}


// Start functions
welcome();