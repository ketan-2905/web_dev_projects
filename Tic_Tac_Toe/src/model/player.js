export const numbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

export default class Player {
    constructor(name, symbol) {
        this.name = name;
        this.symbol = symbol;
    }

    getName() {
        return this.name;
    }

    getSymbol() {
        return this.symbol;
    }
}