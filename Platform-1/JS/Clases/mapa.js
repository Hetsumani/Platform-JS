export default class Mapa {
    constructor(anchoJuego, altoJuego, jugador) {
        this.anchoJuego = anchoJuego;
        this.altoJuego = altoJuego;
        this.jugador = jugador;

        this.fondo = document.getElementById("mapa1");

        this.x = 0;          // Offset horizontal del fondo
        this.y = 0;
    }

    /*  Actualiza el desplazamiento del mapa.
        - Centramos la “cámara” en el jugador
        - Con % mantenemos x en (-ancho, 0]  */
    update() {
        if (this.jugador.x > this.anchoJuego / 2) {
            const offset = this.anchoJuego / 2 - this.jugador.x;
            this.x = ((offset % this.anchoJuego) + this.anchoJuego) % this.anchoJuego - this.anchoJuego;
        }
        // equivalente: this.x = ((offset % w) + w) % w - w;
    }

    /*  Pintamos dos copias consecutivas:
        una en x y otra justo detrás    */
    draw(ctx) {
        ctx.drawImage(this.fondo, this.x, this.y,
            this.anchoJuego, this.altoJuego);
        ctx.drawImage(this.fondo, this.x + this.anchoJuego - 1, this.y,
            this.anchoJuego, this.altoJuego);
    }
}
