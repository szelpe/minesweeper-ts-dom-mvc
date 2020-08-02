import { Field } from "../model/Field";

export interface View {
    render(): HTMLElement;
}

export class FieldView implements View {
    private readonly container: HTMLElement;

    constructor(private field: Field) {
        field.onChange(this.handleFieldChange);
        this.container = document.createElement('div');
    }

    private handleFieldChange = () => {
        this.updateView();
    };

    render(): HTMLElement {
        this.container.classList.add('field');
        this.updateView();

        return this.container;
    }

    private updateView() {
        if (!this.field.isRevealed()) {
            this.container.classList.add('unrevealed');
        } else {
            if (this.field.hasMine) {
                if (this.field.exploded) {
                    this.container.classList.add('exploded');
                } else {
                    this.container.classList.add('mine');
                }
            } else {
                let mineCount = this.field.getMineCount();
                this.container.textContent = String(mineCount);
            }
        }
    }
}