import { ParadoIzq, ParadoDer } from "./stateMachine/state.js";

export default class Jugador {
    constructor(anchoJuego, altojuego) {
        this.anchoJuego = anchoJuego;
        this.altojuego = altojuego;

        this.estados = [new ParadoIzq(this),
                        new ParadoDer(this)];
        this.estadoActual = this.estados[1];

        this.spriteSheet = document.getElementById("paradoDerecha");
        this.anchoSprite = 100;
        this.altoSprite = 64;
        this.columna = 0;
        this.fila = 0;

        this.x = anchoJuego / 2 - this.anchoSprite / 2;
        this.y = altojuego - this.altoSprite;
    }

    draw(context) {
        context.drawImage(
            this.spriteSheet,
            this.columna * this.anchoSprite,
            this.fila * this.altoSprite,
            this.anchoSprite,
            this.altoSprite,
            this.x,
            this.y,
            this.anchoSprite,
            this.altoSprite
        );
    }

    update(input) {
        this.estadoActual.handleInput(input);
    }

    setState(estado) {
        this.estadoActual = this.estados[estado];
        this.estadoActual.enter();
    }
}