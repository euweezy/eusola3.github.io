var payroll=[];

function addEmployees() {
  let emp1 = {
    name: "John Von Nuemann",
    daysworked: 10.00,
    dailyrate: 500.00,
    grosspay: (10.00 * 500.00).toFixed(2),
    deduction: 100.00,
    netpay: ((10.00 * 500.00) - 100.00).toFixed(2),
  };
  payroll.push(emp1);
  let emp2 = {
    name: "Charles W. Babbage",
    daysworked: 12.00,
    dailyrate: 600.00,
    grosspay: (12.00 * 600.00).toFixed(2),
    deduction: 200.00,
    netpay: ((12.00 * 600.00) - 200.00).toFixed(2),
  };
  payroll.push(emp2);
  let emp3 = {
    name: "Vint E. Cerf",
    daysworked: 15.00,
    dailyrate: 550.00,
    grosspay: (15.00 * 550.00).toFixed(2),
    deduction: 200.00,
    netpay: ((15.00 * 550.00) - 200.00).toFixed(2),
  };
  payroll.push(emp3);
}

document.getElementById("employeeForm").addEventListener("submit", function (event) {
  event.preventDefault(); 

  const name = document.getElementById("name").value.trim();
  const daysworkedInput = document.getElementById("daysworked").value.trim();
  const dailyrateInput = document.getElementById("dailyrate").value.trim();
  const deductionInput = document.getElementById("deduction").value.trim();

  if (!name || !daysworkedInput || !dailyrateInput || !deductionInput) {
    console.log("Alert about to show!");
    alert("All fields are required.");
    return; 
  }

  const daysworked = parseFloat(daysworkedInput);
  const dailyrate = parseFloat(dailyrateInput);
  const deduction = parseFloat(deductionInput);

  if (isNaN(daysworked) || isNaN(dailyrate) || isNaN(deduction)) {
    alert("Please enter valid numeric values for Days Worked, Daily Rate, and Deduction.");
    return; 
  }

  const grosspay = (daysworked * dailyrate).toFixed(2);
  const netpay = (grosspay - deduction).toFixed(2);

  const emp = {
    name,
    daysworked,
    dailyrate,
    grosspay,
    deduction,
    netpay,
  };

  payroll.push(emp);
  showEmployees();
  this.reset(); 
});

function showEmployees() {
  let tb = "";
  let tgpay = 0.0, tded = 0.0, tnetpay = 0.0;
  let lno = 1;

  payroll.forEach((emp) => {
    tb += `<tr>
      <td style="text-align:right">${lno}</td>
      <td>${emp.name}</td>
      <td class="ndata">${emp.daysworked.toFixed(2)}</td>
      <td class="ndata">${emp.dailyrate.toFixed(2)}</td>
      <td class="ndata">${emp.grosspay}</td>
      <td class="ndata">${emp.deduction.toFixed(2)}</td>
      <td class="ndata">${emp.netpay}</td>
    </tr>`;
    tgpay += parseFloat(emp.grosspay);
    tded += parseFloat(emp.deduction);
    tnetpay += parseFloat(emp.netpay);
    lno++;
  });

  document.getElementById("tablebody").innerHTML = tb;
  document.getElementById("tGrossPay").textContent = tgpay.toFixed(2);
  document.getElementById("tDeduction").textContent = tded.toFixed(2);
  document.getElementById("tNetPay").textContent = tnetpay.toFixed(2);
}


function showEmployees() {
  let tb = "", trec = "", tgpay = 0.00, tded = 0.00, tnetpay = 0.00
  let lno = 1;
  for (emp of payroll) {
    trec = "<tr>"
      + '<td style="text-align:right">' + lno.toFixed(0) + "</td>"
      + "<td>" + emp.name + "</td>"
      + '<td class="ndata">' + emp.daysworked.toFixed(2) + "</td>"
      + '<td class="ndata">' + emp.dailyrate.toFixed(2) + "</td>"
      + '<td class="ndata">' + emp.grosspay + "</td>"
      + '<td class="ndata">' + emp.deduction.toFixed(2) + "</td>"
      + '<td class="ndata">' + emp.netpay + "</td>"
      + "</tr>";
    tb += trec;
    tgpay += emp.grosspay*1;
    tded += emp.deduction*1;
    tnetpay += emp.netpay*1;
    ++lno;
  }
  document.getElementById("tablebody").innerHTML = tb;
  document.getElementById("tGrossPay").innerHTML = tgpay.toFixed(2);
  document.getElementById("tDeduction").innerHTML = tded.toFixed(2);
  document.getElementById("tNetPay").innerHTML = tnetpay.toFixed(2);
}

document.addEventListener("DOMContentLoaded", () => {
  // initial setup when page loads 
  addEmployees(); 
  showEmployees();

  // delete single employee button handler
  dlgConfirmCancel = document.getElementById("dlgConfirmCancel");
  document.getElementById("btndelete").addEventListener("click",()=>{
    let x = document.getElementById("delemployee").value *1 - 1;
    if ((x >= 0) && (x<payroll.length)) {
      // confirm deletion of employee number
      document.getElementById("dlgmsg").innerHTML = "Delete the employee " + (x + 1)+" " + payroll[x].name+"?";
      dlgConfirmCancel.showModal();
    }   
  });
  document.getElementById("btndeleteall").addEventListener("click",()=>{
    document.getElementById("dlgmsg").innerHTML = "Delete all records?";
    dlgConfirmCancel.showModal();
  });
  dlgConfirmCancel.addEventListener("close", (e) => {
    var rst = e.target.returnValue;
    if (rst === "confirm") {
      dlgmsg=document.getElementById("dlgmsg").innerHTML;
      if (dlgmsg=="Delete all records?"){
        dlgAreYouSure=document.getElementById("dlgAreYouSure");
        document.getElementById("dlgmsg2").innerHTML ="Are you sure?";
        dlgAreYouSure.showModal();
      } else { 
        var x = document.getElementById("delemployee").value * 1 - 1;
        payroll.splice(x, 1);
        showEmployees();
        document.getElementById("delemployee").value = '';
      }
    }
  });
  dlgAreYouSure=document.getElementById("dlgAreYouSure");
  dlgAreYouSure.addEventListener("close", (e) => {
    var rst = e.target.returnValue;
    if (rst === "yes") {
      payroll=[];
      showEmployees();
    }
  });
});