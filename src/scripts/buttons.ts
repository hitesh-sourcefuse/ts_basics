export class RowEventHandler {
    private row: HTMLTableRowElement;
    private _editHandler: EventListener;
    private _deleteHandler: EventListener;
    private _saveHandler: EventListener;
    private _cancelHandler: EventListener;

    constructor(row: HTMLTableRowElement) {
        this.row = row;
        const actions = (row.querySelector('.actions') as HTMLTableRowElement);
        const editAction = (row.querySelector('.editAction') as HTMLTableRowElement);
        actions.querySelector<HTMLButtonElement>('.edit')!.addEventListener('click', (this._editHandler = this.handleEdit.bind<EventListener>(this)));
        actions.querySelector<HTMLButtonElement>('.delete')!.addEventListener('click', (this._deleteHandler = this.handleDelete.bind<EventListener>(this)));
        editAction.querySelector<HTMLButtonElement>('.save')!.addEventListener('click', (this._saveHandler = this.handleSave.bind<EventListener>(this)));
        editAction.querySelector<HTMLButtonElement>('.cancel')!.addEventListener('click', (this._cancelHandler = this.handleCancel.bind<EventListener>(this)));
    }

    public handleEdit(): void {
        this.row
            .querySelectorAll<HTMLLabelElement>("label.editable")
            .forEach((label) => label.style.display = "none");
        this.row
            .querySelectorAll<HTMLInputElement>("input")
            .forEach((input) => {
                input.style.display = "block";
                input.value = (input.previousElementSibling as HTMLLabelElement).innerText;
            });

        (this.row.querySelector<HTMLTableRowElement>(".actions"))!.style.display = 'none';
        (this.row.querySelector<HTMLTableRowElement>(".editAction"))!.style.display = 'block';
    }

    public handleDelete(): void {
        const actions = (this.row.querySelector('.actions') as HTMLTableRowElement);
        const editAction = (this.row.querySelector('.editAction') as HTMLTableRowElement);

        actions.querySelector<HTMLButtonElement>('.edit')!.removeEventListener("click", this._editHandler);
        actions.querySelector<HTMLButtonElement>('.delete')!.removeEventListener('click', this._deleteHandler);
        editAction.querySelector<HTMLButtonElement>('.save')!.removeEventListener('click', this._saveHandler);
        editAction.querySelector<HTMLButtonElement>('.cancel')!.removeEventListener('click', this._cancelHandler);

        const parent = this.row.parentElement as HTMLTableSectionElement;
        parent.removeChild(this.row);
        parent.querySelectorAll<HTMLLabelElement>('.serial')
            .forEach((label, i) => label.innerText = i.toString());

        delete this.row;
        delete this._editHandler;
        delete this._deleteHandler;
        delete this._saveHandler;
        delete this._cancelHandler;
    }

    public handleSave(): void {
        (this.row.querySelector<HTMLTableRowElement>(".actions"))!.style.display = 'block';
        (this.row.querySelector<HTMLTableRowElement>(".editAction"))!.style.display = 'none';
        this.row
            .querySelectorAll<HTMLInputElement>("input")
            .forEach((input) => {
                input.style.display = "none";
                (input.previousElementSibling as HTMLLabelElement).innerText = input.value;
            });
        this.row
            .querySelectorAll<HTMLLabelElement>("label.editable")
            .forEach((label) => label.style.display = "block");
    }

    public handleCancel(): void {
        (this.row.querySelector<HTMLTableRowElement>(".actions"))!.style.display = 'block';
        (this.row.querySelector<HTMLTableRowElement>(".editAction"))!.style.display = 'none';

        this.row
            .querySelectorAll<HTMLInputElement>("input")
            .forEach((input) => input.style.display = "none");
        this.row
            .querySelectorAll<HTMLLabelElement>("label.editable")
            .forEach((label) => label.style.display = "block");
    }
}
