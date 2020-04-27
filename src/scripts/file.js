"use strict";
exports.__esModule = true;
var studentList_1 = require("./studentList");
var buttons_1 = require("~scripts/buttons");
// type BUTTON_LABEL = "Refresh" | "Load Data";
// let previousButtonValue: BUTTON_LABEL = "Refresh";
var studentTableRows = [];
function bootstrap() {
    var buttonElement = document.getElementById("totalButton");
    buttonElement.addEventListener("click", switchButtonLabel);
}
function switchButtonLabel() {
    if (this.innerText === 'Refresh') {
        while (studentTableRows.length)
            studentTableRows.shift().handleDelete();
    }
    else {
        this.innerText = 'Refresh';
    }
    showData();
}
function showData() {
    var table = document.getElementById("dataList");
    var tbody = table.tBodies[0];
    var template = document.getElementById("rowTmpl");
    studentList_1["default"].forEach(function (student, i) {
        var rowTemplate = template.content.cloneNode(true).querySelector('tr');
        rowTemplate.querySelectorAll("input")
            .forEach(function (input) {
            input.style.display = "none";
        });
        rowTemplate.dataset.index = i.toString();
        rowTemplate.cells[0].querySelector('label').innerText = tbody.rows.length.toString();
        rowTemplate.cells[1].querySelector('label').innerText = student.firstName;
        rowTemplate.cells[2].querySelector('label').innerText = student.lastName;
        studentTableRows.push(new buttons_1.RowEventHandler(rowTemplate));
        tbody.appendChild(rowTemplate);
    });
}
document.addEventListener("DOMContentLoaded", bootstrap);
