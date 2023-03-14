// Define an array to store user entries
let userEntries = [];

// Function to retrieve user entries from local storage
const retrieveEntries = () => {
  let entries = localStorage.getItem("userEntries");
  if (entries) {
    entries = JSON.parse(entries);
  } else {
    entries = [];
  }
  return entries;
};

// Function to display user entries in a table
const displayEntries = () => {
  const entries = retrieveEntries();
  const table = document.getElementById("user-entries");

  // Clear table body
  table.innerHTML = "";

  // Add table header
  const headerRow = table.insertRow(0);
  const nameHeader = headerRow.insertCell(0);
  const emailHeader = headerRow.insertCell(1);
  const passwordHeader = headerRow.insertCell(2);
  const dobHeader = headerRow.insertCell(3);
  const acceptTermsHeader = headerRow.insertCell(4);
  nameHeader.innerHTML = "Name";
  emailHeader.innerHTML = "Email";
  passwordHeader.innerHTML = "Password";
  dobHeader.innerHTML = "DOB";
  acceptTermsHeader.innerHTML = "Accepted Terms?";

  // Add table rows
  entries.forEach((entry) => {
    const row = table.insertRow();
    const nameCell = row.insertCell(0);
    const emailCell = row.insertCell(1);
    const passwordCell = row.insertCell(2);
    const dobCell = row.insertCell(3);
    const acceptTermsCell = row.insertCell(4);
    nameCell.innerHTML = entry.name;
    emailCell.innerHTML = entry.email;
    passwordCell.innerHTML = entry.password;
    dobCell.innerHTML = entry.dob;
    acceptTermsCell.innerHTML = entry.acceptTerms ? "Yes" : "No";
  });
};

// Function to save user form data to local storage
const saveUserForm = (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptTerms = document.getElementById("acceptTerms").checked;

  // Validate user's age
  const currentYear = new Date().getFullYear();
  const birthYear = dob.split("-")[0];
  const age = currentYear - birthYear;
  if (age < 18 || age > 55) {
    document.getElementById("dob").style.border = "1px solid red";
    alert("Your age must be between 18 and 55 years");
    return;
  } else {
    document.getElementById("dob").style.border = "none";
  }

  // Create an object with user's form data
  const entry = {
    name,
    email,
    password,
    dob,
    acceptTerms,
  };

  // Add the entry to the userEntries array and save it to local storage
  userEntries = retrieveEntries();
  userEntries.push(entry);
  localStorage.setItem("userEntries", JSON.stringify(userEntries));

  // Display the updated user entries
  displayEntries();

  // Reset the form
  event.target.reset();
};

// Add an event listener to the user form submit button
document.getElementById("user-form").addEventListener("submit", saveUserForm);

// Display the initial user entries
displayEntries();
