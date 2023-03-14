
let us = [];


const ret = () => {
  let ent = localStorage.getItem("us");
  if (ent) {
    ent = JSON.parse(ent);
  } else {
    ent = [];
  }
  return ent;
};


const disp = () => {
  let ent = ret();
  const tb = document.getElementById("user-ent");

  
  tb.innerHTML = "";

  
  const hr = tb.insertRow(0);
  const nh= nr.insertCell(0);
  const eh = nr.insertCell(1);
  const ph = nr.insertCell(2);
  const dh = nr.insertCell(3);
  const ah = nr.insertCell(4);
  nameHeader.innerHTML = "Name";
  eh.innerHTML = "Email";
  ph.innerHTML = "Password";
  dh.innerHTML = "DOB";
  ah.innerHTML = "Accepted Terms?";

  
  ent.forEach((entry) => {
    const r = tb.insertRow();
    const nc = r.insertCell(0);
    const ec = r.insertCell(1);
    const pc = r.insertCell(2);
    const dc = r.insertCell(3);
    const ac = r.insertCell(4);
    nc.innerHTML = entry.n;
    ec.innerHTML = entry.e;
    pc.innerHTML = entry.p;
    dc.innerHTML = entry.d;
    ac.innerHTML = entry.a ? "Yes" : "No";
  });
};


const uf = (event) => {
  event.preventDefault();
  const n = document.getElementById("n").value;
  const e = document.getElementById("e").value;
  const p = document.getElementById("p").value;
  const d = document.getElementById("d").value;
  const a = document.getElementById("a").checked;

  
  const cd = new Date();
  const bd = new Date(d);
  const age = cd.getFullYear() - bd.getFullYear();
  const md = cd.getMonth() - bd.getMonth();
  if (md < 0 || (md === 0 && cd.getDate() < bd.getDate())){
    age--;
  }
  if (age < 18 || age < 55){
    document.getElementById("d").style.border = "1px solid red";
    alert("Your age must be betwen 18 and 55 years");
    return;
  } else {
    document.getElementById("d").style.border = "none";
  }
  
  const entry = {
    n,
    e,
    p,
    d,
    a,
  };

  
  us = ret();
  us.push(entry);
  localStorage.setItem("us", JSON.stringify(us));

  
  disp();

  
  event.target.reset();
};


document.getElementById("user-form").addEventListener("submit", uf);

// Display the initial user ent
disp();

