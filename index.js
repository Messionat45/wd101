let userform = document.getElementById("user-form");

const retrieveEntries = () => {
  let entries = localStorage.getItem("user-entries");
  if (entries) {
    entries = JSON.parse(entries);
  } else {
    entries = [];
  }
  return entries;
};

let userEntries = retrieveEntries();

const displayEntries = () => {
  const entries = retrieveEntries();
  /*
  <table>
  <tr>
    <th>Name</th>
    <th>Email</th>
    ...
  </tr>
  <tr>
    <td>John Doe</td>
    <td>john@doe.com</td>
    ...
  </tr>
</table>
  */

  const tableEntries = entries
    .map((entry) => {
      const nameCell = `<td class='border px-4 py-2'>${entry.name}</td>`;
      const emailCell = `<td class='border px-4 py-2'>${entry.email}</td>`;
      const passwordCell = `<td class='border px-4 py-2'>${entry.password}</td>`;
      const dobCell = `<td class='border px-4 py-2'>${entry.dob}</td>`;
      const acceptTermsCell = `<td class='border px-4 py-2'>${entry.acceptTermsAndConditions}</td>`;

      const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`;
      return row;
    })
    .join("\n");

  const table = `<table class="table-auto w-full"><tr>
<th class="px-4 py-2">Name</th>
  <th class="px-4 py-2">Email</th>
  <th class="px-4 py-2">Password</th>
  <th class="px-4 py-2">dob</th>
  <th class="px-4 py-2">accepted terms?</th>
</tr>${tableEntries} </table>`;
  let details = document.getElementById("user-entries");
  details.innerHTML = table;
};

const saveUserForm = (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;

  const acceptTermsAndConditions = document.getElementById("acceptTerms").value;

  const entry = {
    name,
    email,
    password,
    dob,
    acceptTermsAndConditions,
  };
  userEntries.push(entry);

  localStorage.setItem("user-entries", JSON.stringify(userEntries));
  displayEntries();
};

const dobInput = document.getElementById("dob");

dobInput.addEventListener("input", function () {
  const dobValue = dobInput.value;

  if (isNaN(Date.parse(dobValue))) {
    dobInput.setCustomValidity("Please enter a valid date");
    return;
  }

  const age = Math.floor(
    (new Date() - new Date(dobValue)) / (365 * 24 * 60 * 60 * 1000)
  );

  if (age < 18 || age > 55) {
    if (age < 18) {
      dobInput.setCustomValidity("You are minor, your age is below 18  ");
    }
    if (age > 55) {
      dobInput.setCustomValidity(
        "You are older than 55 years, you cant submit"
      );
    }
  } else {
    dobInput.setCustomValidity("");
  }
});

userform.addEventListener("submit", saveUserForm);
displayEntries();
