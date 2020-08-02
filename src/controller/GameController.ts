import { Field } from "../model/Field";
import { Map } from '../model/Map';

export class GameController {
    private gameRunning = false;
    private numberOfMines = 5;

    constructor(private readonly map: Map) {
    }

    public start() {
        this.generateRandomMines();
        this.gameRunning = true;
    }

    public fieldSelected(field: Field) {
        if(!this.gameRunning) return;

        if (field.hasMine) {
            field.explode();
            this.explode();
            return;
        }

        field.reveal();

        if (this.map.isEveryNonMineFieldRevealed()) {
            alert('You won!!');
            this.finalize();
        }
    }

    private explode() {
        alert('Boooooom!!');
        this.finalize();
    }

    private finalize() {
        this.gameRunning = false;
        this.map.revealEveryField();
    }

    private generateRandomMines() {
        let remainingMineCount = this.numberOfMines;

        while (remainingMineCount > 0) {
            let x = Math.floor(Math.random() * this.map.getWidth());
            let y = Math.floor(Math.random() * this.map.getHeight());

            if (!this.map.hasMineAt(x, y)) {
                this.map.putMine(x, y);
                remainingMineCount--;
            }
        }
    }
}