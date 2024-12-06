var payroll=[];

document.getElementById("btnsubmit").addEventListener("click", () => {
    let name = document.getElementById("name").value;
    let daysworked = parseFloat(document.getElementById("daysworked").value);
    let dailyrate = parseFloat(document.getElementById('dailyrate').value);

    let grosspay = (daysworked * dailyrate).toFixed(2);
    let deduction = parseFloat(document.getElementById("deduction").value);
    let netpay = (grosspay - deduction).toFixed(2);

    let emp = {
        name,
        daysworked,
        dailyrate,
        grosspay,
        deduction,
        netpay,
    };

    payroll.push(emp)

    showEmployees();
});


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
    ++lno;
  }
  document.getElementById("tablebody").innerHTML = tb;
  document.getElementById("tGrossPay").innerHTML = tgpay.toFixed(2);
}

document.addEventListener("DOMContentLoaded", () => {
  addEmployees();
  showEmployees();
  dlgConfirmCancel = document.getElementById("dlgConfirmCancel");
  document.getElementById("btndelete").addEventListener("click",()=>{
    let x = document.getElementById("delemployee").value *1 - 1;
    if ((x >= 0) && (x<payroll.length)) {
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