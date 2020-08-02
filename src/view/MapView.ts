import { FieldView, View } from "./FieldView";
import { Map } from '../model/Map';
import { GameController } from "../controller/GameController";

export class MapView implements View {
    private readonly container: HTMLElement;

    constructor(private readonly map: Map,
                private readonly controller: GameController) {
        this.container = document.createElement('table');
    }

    render(): HTMLElement {
        this.map.forEachRow((fields) => {
            let tr = document.createElement('tr');

            fields.forEach(field => {
                let td = document.createElement('td');
                let fieldView = new FieldView(field);
                td.append(fieldView.render());
                td.addEventListener('click', e => this.controller.fieldSelected(field));
                tr.append(td);
            })

            this.container.append(tr);
        });

        return this.container;
    }

}