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
  event.preventDefault(); // Prevent default input values being submitted

  const confirmationDialog = document.getElementById("dlgConfirmSubmit");
  confirmationDialog.showModal(); // presents confirmation dialog

  // Event handler for when the confirmation dialog is closed
  confirmationDialog.addEventListener("close", () => { 
    if (confirmationDialog.returnValue === "confirm") {
      const name = document.getElementById("name").value.trim(); // initializes variables based on user input
      const daysworkedInput = document.getElementById("daysworked").value.trim(); //value.trim() removes any whitespace before and after user input
      const dailyrateInput = document.getElementById("dailyrate").value.trim();
      const deductionInput = document.getElementById("deduction").value.trim();

      if (!name || !daysworkedInput || !dailyrateInput || !deductionInput) { // alert if any of the fields are empty.
        alert("All fields are required.");
        return;
      }

      const daysworked = parseFloat(daysworkedInput); // converts the string input to a floating point number
      const dailyrate = parseFloat(dailyrateInput);
      const deduction = parseFloat(deductionInput);

      if (isNaN(daysworked) || isNaN(dailyrate) || isNaN(deduction)) { // alert if any of the number inputs are non numeric values.
        alert("Please enter valid numeric values for Days Worked, Daily Rate, and Deduction.");
        return;
      }

      const grosspay = (daysworked * dailyrate).toFixed(2); // calculations for grosspay and netpay
      const netpay = (grosspay - deduction).toFixed(2);

      const emp = { // because the initialized variables are already the same name as the values of the object, only enter as is.
        name,
        daysworked,
        dailyrate,
        grosspay,
        deduction,
        netpay,
      };

      payroll.push(emp); // adds new object to the end of the array.
      showEmployees(); // refreshes table
      this.reset(); // input fields and such are empty again
    }
  });
});

document.getElementById("btnedit").addEventListener("click", () => { // event handler when edit button is clicked.
  const empNumberInput = document.getElementById("delemployee").value.trim(); // retrieves employee number to edit from the input

  const empNumber = parseInt(empNumberInput, 10); // converts string input to a base 10 integer
  if (isNaN(empNumber) || empNumber < 1 || empNumber > payroll.length) { // alerts if the input is invalid
    alert("Invalid Employee Number. Please enter a number between 1 and " + payroll.length);
    return false;
  }

  // Fill the form with the existing employee data for editing
  const empIndex = empNumber - 1; // converts value of employee to be appropriate with array index
  const employee = payroll[empIndex]; // assigns that value to employee, meaning we can now directly access the object with the employee variable

  // Show the confirmation dialog for editing
  const confirmationDialog = document.getElementById("dlgConfirmEdit");
  document.getElementById("edtmsg").textContent = `Are you sure you want to edit the details of Employee No. ${empNumber}?`;
  confirmationDialog.showModal();

  confirmationDialog.addEventListener("close", () => {
    if (confirmationDialog.returnValue === 'confirm') {
      const name = document.getElementById("name").value.trim();
      const daysworkedInput = document.getElementById("daysworked").value.trim();
      const dailyrateInput = document.getElementById("dailyrate").value.trim();
      const deductionInput = document.getElementById("deduction").value.trim();

      if (!name || !daysworkedInput || !dailyrateInput || !deductionInput) {
        alert("All fields are required.");
        return;
      }

      // Update the employee details
      employee.name = name; // syntax for updating value of property = objectName.property
      employee.daysworked = parseFloat(daysworkedInput);
      employee.dailyrate = parseFloat(dailyrateInput);
      employee.deduction = parseFloat(deductionInput);
      employee.grosspay = (employee.daysworked * employee.dailyrate).toFixed(2);
      employee.netpay = (employee.grosspay - employee.deduction).toFixed(2);

      showEmployees();  // Update the table with the modified data
      document.getElementById("delemployee").value = ''; // Reset the employee number field
    }
  });
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