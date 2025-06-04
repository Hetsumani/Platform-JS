export const states = {
    PARADO_IZQ: 0,
    PARADO_DER: 1,
}

class State {
    constructor(state) {
        this.state = state;
    }
}

export class ParadoIzq extends State {
    constructor(jugador) {
        super('PARADO IZQ');
        this.jugador = jugador;
    }

    enter(){
        this.jugador.spriteSheet = document.getElementById("paradoIzquierda");
    }

    handleInput(input){
        if (input === "PRESS right") this.jugador.setState(states.PARADO_DER);
    }
}

export class ParadoDer extends State {
    constructor(jugador) {
        super('PARADO DER');
        this.jugador = jugador;
    }

    enter(){
        this.jugador.spriteSheet = document.getElementById("paradoDerecha");

    }

    handleInput(input){
        if (input === "PRESS left") this.jugador.setState(states.PARADO_IZQ);
    }
}