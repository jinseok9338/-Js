// main.js

var toDoApp = new (function () {
  // Array of To-Do list data
  this.myList = [
    { ID: "1", Checked: true, To_Do: "할일입력1", Importance: "1순위" },
    { ID: "2", Checked: false, To_Do: "할일입력2", Importance: "3순위" },
  ];

  // Importance data
  this.Category = ["1순위", "2순위", "3순위", "4순위"];

  // Table Header Data
  this.col = [];

  // Table maker
  this.createTable = () => {
    // Table header maker
    for (var i = 0; i < this.myList.length; i++) {
      for (var key in this.myList[i]) {
        if (this.col.indexOf(key) === -1) this.col.push(key);
      }
    }

    var table = document.createElement("table");
    table.setAttribute("id", "listTable");

    // Add new row to the end of the table
    var tr = table.insertRow(-1);

    // Write th
    for (var h = 0; h < this.col.length; h++) {
      var th = document.createElement("th");
      th.innerHTML = this.col[h];
      tr.appendChild(th);
    }

    // Write td
    for (var i = 0; i < this.myList.length; i++) {
      tr = table.insertRow(-1); // Make row
      for (var j = 0; j < this.col.length; j++) {
        var tabCell = tr.insertCell(-1); // Make cell
        if (this.myList[i][this.col[j]] === false) {
          var noCheck = '<input type="checkbox">';
          tabCell.innerHTML = noCheck;
        } else if (this.myList[i][this.col[j]] === true) {
          var yesCheck = '<input type="checkbox" checked>';
          tabCell.innerHTML = yesCheck;
        } else {
          tabCell.innerHTML = this.myList[i][this.col[j]];
        }
      }

      // Make Buttons
      // 1. Update Button
      this.td = document.createElement("td");
      tr.appendChild(this.td);
      var btnUpdate = document.createElement("input");
      btnUpdate.setAttribute("type", "button");
      btnUpdate.setAttribute("value", "Update");
      btnUpdate.setAttribute("id", "Edit" + i);
      btnUpdate.setAttribute("style", "background-color:#44CCEB");
      // Onclick method
      btnUpdate.setAttribute("onclick", "toDoApp.Update(this)");
      this.td.appendChild(btnUpdate);

      // 2. Save Button
      tr.appendChild(this.td);
      var btnSave = document.createElement("input");
      btnSave.setAttribute("type", "button");
      btnSave.setAttribute("value", "Save");
      btnSave.setAttribute("id", "Save" + i);
      btnSave.setAttribute("style", "display: none");
      // Onclick method
      btnSave.setAttribute("onclick", "toDoApp.Save(this)");
      this.td.appendChild(btnSave);

      // 3. Delete Button
      this.td = document.createElement("td");
      tr.appendChild(this.td);
      var btnDelete = document.createElement("input");
      btnDelete.setAttribute("type", "button");
      btnDelete.setAttribute("value", "Delete");
      btnDelete.setAttribute("id", "Delete" + i);
      btnDelete.setAttribute("style", "background-color:#ED5650");
      // Onclick method
      btnDelete.setAttribute("onclick", "toDoApp.Delete(this)");
      this.td.appendChild(btnDelete);
    }

    // Add input row
    tr = table.insertRow(-1);
    for (var j = 0; j < this.col.length; j++) {
      var newCell = tr.insertCell(-1);
      if (j >= 1) {
        if (j == 1) {
          // Make checkbox
          var check = document.createElement("input");
          check.setAttribute("type", "checkbox");
          newCell.appendChild(check);
        } else if (j == 3) {
          // Make dropdown
          var select = document.createElement("select");
          select.innerHTML = '<option value=""></option>';
          // Make dropdown menu
          for (var k = 0; k < this.Category.length; k++) {
            select.innerHTML += `<option value="${this.Category[k]}">${this.Category[k]}</option>`;
          }
          newCell.appendChild(select);
        } else {
          var tBox = document.createElement("input");
          tBox.setAttribute("type", "text");
          tBox.setAttribute("value", "");
          newCell.appendChild(tBox);
        }
      }
    }

    // 4. Create Button
    this.td = document.createElement("td");
    tr.appendChild(this.td);
    var btnCreate = document.createElement("input");
    btnCreate.setAttribute("type", "button");
    btnCreate.setAttribute("value", "Create");
    btnCreate.setAttribute("id", "New");
    btnCreate.setAttribute("style", "background-color:#207DD1");
    // Onclick method
    btnCreate.setAttribute("onclick", "toDoApp.CreateNew(this)");
    this.td.appendChild(btnCreate);

    // Append table into the div tag
    var div = document.getElementById("container");
    var originalTable = document.getElementById("listTable");
    if (originalTable) {
      div.removeChild(originalTable);
    }

    div.appendChild(table);
  };

  // Delete Method
  this.Delete = (oButton) => {
    var targetIdx = oButton.parentNode.parentNode.rowIndex;
    // Delete the clicked row using splice
    this.myList.splice(targetIdx - 1, 1);
    this.createTable();
  };

  // Create Method
  this.CreateNew = (oButton) => {
    var writtenIdx = oButton.parentNode.parentNode.rowIndex;
    var trData = document.getElementById("listTable").rows[writtenIdx];

    var obj = {};
    var canCreate = true;
    for (var i = 1; i < this.col.length; i++) {
      var td = trData.getElementsByTagName("td")[i];
      if (
        td.childNodes[0].getAttribute("type") === "text" ||
        td.childNodes[0].tagName === "SELECT"
      ) {
        // txtVal is the value for each input
        var txtVal = td.childNodes[0].value;

        if (txtVal != "") {
          obj[this.col[i]] = txtVal;
        } else {
          obj = "";
          alert("모든 항목을 입력하세요.");
          canCreate = false;
          break;
        }
      } else if (td.childNodes[0].getAttribute("type") === "checkbox") {
        var chkVal = td.childNodes[0].checked ? true : false;
        obj[this.col[i]] = chkVal;
      }
    }
    if (canCreate) {
      // ID value auto-generated
      obj[this.col[0]] = this.myList.length + 1;
      this.myList.push(obj);
      this.createTable();
    }
  };

  // Update Method
  this.Update = (oButton) => {
    var writtenIdx = oButton.parentNode.parentNode.rowIndex;
    var trData = document.getElementById("listTable").rows[writtenIdx];

    // load existing data
    for (var i = 1; i < this.col.length; i++) {
      if (i === 1) {
        var td = trData.getElementsByTagName("td")[i];
        // var input = document.createElement("input");
        // input.setAttribute("type", "checkbox");
        // input.setAttribute("value", td.childNodes[0].checked);
        if (td.childNodes[0].checked) {
          var yesCheck = '<input type="checkbox" checked>';
          td.innerHTML = yesCheck;
        } else {
          var noCheck = '<input type="checkbox">';
          td.innerHTML = noCheck;
        }
        //td.appendChild(input);
      } else if (i === 3) {
        var td = trData.getElementsByTagName("td")[i];
        var select = document.createElement("select");
        select.innerHTML = `<option value=${td.innerText}">${td.innerText}</option>`;
        for (var k = 0; k < this.Category.length; k++) {
          select.innerHTML += `<option value=${this.Category[k]}>${this.Category[k]}</option>`;
        }
        td.innerText = "";
        td.appendChild(select);
      } else {
        var td = trData.getElementsByTagName("td")[i];
        var input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("value", td.innerText);
        td.innerText = "";
        td.appendChild(input);
      }
    }

    var btnSave = document.getElementById("Save" + (writtenIdx - 1));
    btnSave.setAttribute("style", "display: block; background-color: #2DBF64;");
    oButton.setAttribute("style", "display: none;");
  };

  // Save Method
  this.Save = (oButton) => {
    var writtenIdx = oButton.parentNode.parentNode.rowIndex;
    var trData = document.getElementById("listTable").rows[writtenIdx];

    // Update myList array with new data
    for (var i = 1; i < this.col.length; i++) {
      var td = trData.getElementsByTagName("td")[i];
      if (
        td.childNodes[0].getAttribute("type") === "text" ||
        td.childNodes[0].tagName === "SELECT"
      ) {
        this.myList[writtenIdx - 1][this.col[i]] = td.childNodes[0].value;
      } else if (td.childNodes[0].getAttribute("type") === "checkbox") {
        var chkVal = td.childNodes[0].checked ? true : false;
        this.myList[writtenIdx - 1][this.col[i]] = chkVal;
      }
    }
    this.createTable();
  };
})();

toDoApp.createTable();
