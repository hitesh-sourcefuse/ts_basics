import studentJSON from "./studentList";
import {Student} from "~scripts/interfaces/studentInterface";
import {RowEventHandler} from "~scripts/buttons";

// type BUTTON_LABEL = "Refresh" | "Load Data";
// let previousButtonValue: BUTTON_LABEL = "Refresh";
const studentTableRows: RowEventHandler[] = [];

function bootstrap() {
    const buttonElement: HTMLButtonElement = <HTMLButtonElement>document.getElementById("totalButton");
    buttonElement.addEventListener("click", switchButtonLabel);
}

function switchButtonLabel(this: HTMLButtonElement) {
    if (this.innerText === 'Refresh') {
        while (studentTableRows.length)
            studentTableRows.shift()!.handleDelete();
    } else {
        this.innerText = 'Refresh';
    }
    showData();
}

function showData() {
    const table: HTMLTableElement = <HTMLTableElement>document.getElementById("dataList");
    const tbody: HTMLTableSectionElement = table.tBodies[0];
    const template = <HTMLTemplateElement>document.getElementById("rowTmpl");


    studentJSON.forEach((student: Student, i: number) => {
        const rowTemplate = <HTMLTableRowElement>(
            <DocumentFragment>template.content.cloneNode(true)
        ).querySelector('tr');

        rowTemplate.querySelectorAll("input")
            .forEach((input) => {
                input.style.display = "none";
            });

        rowTemplate.dataset.index = i.toString();

        rowTemplate.cells[0].querySelector('label')!.innerText= tbody.rows.length.toString();
        rowTemplate.cells[1].querySelector('label')!.innerText = student.firstName;
        rowTemplate.cells[2].querySelector('label')!.innerText = student.lastName;

        studentTableRows.push(new RowEventHandler(rowTemplate));

        tbody.appendChild(rowTemplate);
    });
}


document.addEventListener("DOMContentLoaded", bootstrap);
