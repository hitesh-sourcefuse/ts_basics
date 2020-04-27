"use strict";
exports.__esModule = true;
var RowEventHandler = /** @class */ (function () {
    function RowEventHandler(row) {
        this.row = row;
        var actions = row.querySelector('.actions');
        var editAction = row.querySelector('.editAction');
        actions.querySelector('.edit').addEventListener('click', (this._editHandler = this.handleEdit.bind(this)));
        actions.querySelector('.delete').addEventListener('click', (this._deleteHandler = this.handleDelete.bind(this)));
        editAction.querySelector('.save').addEventListener('click', (this._saveHandler = this.handleSave.bind(this)));
        editAction.querySelector('.cancel').addEventListener('click', (this._cancelHandler = this.handleCancel.bind(this)));
    }
    RowEventHandler.prototype.handleEdit = function () {
        this.row
            .querySelectorAll("label.editable")
            .forEach(function (label) { return label.style.display = "none"; });
        this.row
            .querySelectorAll("input")
            .forEach(function (input) {
            input.style.display = "block";
            input.value = input.previousElementSibling.innerText;
        });
        (this.row.querySelector(".actions")).style.display = 'none';
        (this.row.querySelector(".editAction")).style.display = 'block';
    };
    RowEventHandler.prototype.handleDelete = function () {
        var actions = this.row.querySelector('.actions');
        var editAction = this.row.querySelector('.editAction');
        actions.querySelector('.edit').removeEventListener("click", this._editHandler);
        actions.querySelector('.delete').removeEventListener('click', this._deleteHandler);
        editAction.querySelector('.save').removeEventListener('click', this._saveHandler);
        editAction.querySelector('.cancel').removeEventListener('click', this._cancelHandler);
        var parent = this.row.parentElement;
        parent.removeChild(this.row);
        parent.querySelectorAll('.serial')
            .forEach(function (label, i) { return label.innerText = i.toString(); });
        delete this.row;
        delete this._editHandler;
        delete this._deleteHandler;
        delete this._saveHandler;
        delete this._cancelHandler;
    };
    RowEventHandler.prototype.handleSave = function () {
        (this.row.querySelector(".actions")).style.display = 'block';
        (this.row.querySelector(".editAction")).style.display = 'none';
        this.row
            .querySelectorAll("input")
            .forEach(function (input) {
            input.style.display = "none";
            input.previousElementSibling.innerText = input.value;
        });
        this.row
            .querySelectorAll("label.editable")
            .forEach(function (label) { return label.style.display = "block"; });
    };
    RowEventHandler.prototype.handleCancel = function () {
        (this.row.querySelector(".actions")).style.display = 'block';
        (this.row.querySelector(".editAction")).style.display = 'none';
        this.row
            .querySelectorAll("input")
            .forEach(function (input) { return input.style.display = "none"; });
        this.row
            .querySelectorAll("label.editable")
            .forEach(function (label) { return label.style.display = "block"; });
    };
    return RowEventHandler;
}());
exports.RowEventHandler = RowEventHandler;
