let uE = [];

if (localStorage.getItem("userEntries") === null) {
  uE = [];
} else {
  uE = JSON.parse(localStorage.getItem("userEntries"));
}

const dEs = () => {
  const uen = document.getElementById("user-entries");
  uE.forEach((entry) => {
    const rows = uen.insertRow();
    const nC = rows.insertCell(0);
    const eC = rows.insertCell(1);
    const pC = rows.insertCell(2);
    const dC = rows.insertCell(3);
    const aTC = rows.insertCell(4);
    nC.innerHTML = entry.name;
    eC.innerHTML = entry.email;
    pC.innerHTML = entry.password;
    dC.innerHTML = entry.dob;
    aTC.innerHTML = entry.acceptTerms;
  });
};

const sub = document.getElementById("user-form");

sub.addEventListener("click", (event) => {
  const nEl = document.getElementById("name");
  const eEl = document.getElementById("email");
  const pEl = document.getElementById("password");
  const dEl = document.getElementById("dob");
  const aTEl = document.getElementById("acceptTerms");

  let age =
    new Date().setHours(0, 0, 0, 0) - new Date(dEl.value).setHours(0, 0, 0, 0);
  age = Math.ceil(age / 1000 / 60 / 60 / 24 / 365);
  if (age < 18 || age > 55) {
    dEl.setCustomValidity("Age 18 to 55 only");
  } else {
    dEl.setCustomValidity("");
  }

  if (sub.checkValidity() === true) {
    const userEntry = {
      name: nEl.value,
      email: eEl.value,
      password: pEl.value,
      dob: dEl.value,
      acceptTerms: aTEl.checked,
    };
    uE.push(userEntry);
    localStorage.setItem("userEntries", JSON.stringify(uE));
    dEs();
  }
});

dEs();
