// CHALLENGE 1
let students = [
    { name: 'Remy', cohort: 'Jan' },
    { name: 'Genevieve', cohort: 'March' },
    { name: 'Chuck', cohort: 'Jan' },
    { name: 'Osmund', cohort: 'June' },
    { name: 'Nikki', cohort: 'June' },
    { name: 'Boris', cohort: 'June' }
];

function printStudents(arr) {
    for (var i = 0; i < arr.length; i++) {
        console.log("Name: " + arr[i].name + ", Cohort: " + arr[i].cohort);
    }
}

printStudents(students)

// CHALLENGE 2
let users = {
    employees: [
        { 'first_name': 'Miguel', 'last_name': 'Jones' },
        { 'first_name': 'Ernie', 'last_name': 'Bertson' },
        { 'first_name': 'Nora', 'last_name': 'Lu' },
        { 'first_name': 'Sally', 'last_name': 'Barkyoumb' }
    ],
    managers: [
        { 'first_name': 'Lillian', 'last_name': 'Chambers' },
        { 'first_name': 'Gordon', 'last_name': 'Poe' }
    ]
};

function printUsers(arr) {
    for (user in arr) {
        console.log(user.toUpperCase());
        for (var i = 0; i < arr[user].length; i++) {
            console.log((i + 1) + " - " + arr[user][i].last_name + ", " +
             arr[user][i].first_name + " - " + (arr[user][i].last_name.length
                 + arr[user][i].first_name.length));
        }
    }
}

printUsers(users);