import { Field } from "./Field";

export class Map {
    private fields: Field[][] = [];

    constructor(private width: number, private height: number) {
        for (let i = 0; i < height; i++) {
            this.fields[i] = [];
            for (let j = 0; j < width; j++) {
                this.fields[i][j] = new Field(i, j);
            }
        }

        this.setNeighbors();
    }

    forEachRow(fn: (row: Field[], y: number) => void) {
        for (let i = 0; i < this.height; i++) {
            fn(this.fields[i], i);
        }
    }

    forEachField(fn: (field: Field, x: number, y: number) => void) {
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                fn(this.fields[i][j], j, i);
            }
        }
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    hasMineAt(x: number, y: number) {
        return this.fields[y][x].hasMine;
    }

    putMine(x: number, y: number) {
        this.fields[y][x].putMine();
    }

    private setNeighbors() {
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                for (let k = -1; k <= 1; k++) {
                    for (let l = -1; l <= 1; l++) {
                        if (k == 0 && l == 0) {
                            continue;
                        }

                        this.fields[i][j].addNeighbor(this.getField(i - k, j - l));
                    }
                }
            }
        }
    }

    private getField(i: number, j: number) {
        if (i >= this.height || j >= this.width) {
            return undefined;
        }
        if (i < 0 || j < 0) {
            return undefined;
        }

        return this.fields[i][j];
    }

    isEveryNonMineFieldRevealed() {
        let result = true;

        this.forEachField(field => {
            if(!field.hasMine && !field.isRevealed()) {
                result = false;
            }
        })

        return result;
    }

    revealEveryField() {
        this.forEachField(field => field.reveal());
    }
}