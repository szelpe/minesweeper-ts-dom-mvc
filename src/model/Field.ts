export interface changeHandlerFn {
    (field: Field): void;
}

export class Field {
    constructor(private i: number, private j: number) {
    }

    public hasMine = false;
    private neighbors: Field[] = [];
    private revealed = false;
    private watchers: changeHandlerFn[] = [];
    public exploded = false;

    public addNeighbor(neighbor?: Field) {
        if (neighbor == null) {
            return;
        }

        this.neighbors.push(neighbor);
    }

    public putMine() {
        this.hasMine = true;
    }

    public isRevealed = () => this.revealed;

    public reveal() {
        if (this.revealed) {
            return;
        }

        this.revealed = true;
        this.notifyWatchers();

        if (this.getMineCount() === 0) {
            for (const neighbor of this.neighbors) {
                neighbor.reveal();
            }
        }
    }

    public onChange(changeHandler: changeHandlerFn) {
        this.watchers.push(changeHandler);
    }

    private notifyWatchers() {
        this.watchers.forEach(watcher => watcher(this));
    }

    getMineCount() {
        return this.neighbors.filter(f => f.hasMine).length;
    }

    public toString() {
        return `Field(${this.i}, ${this.j})`;
    }

    explode() {
        this.exploded = true;
    }
}