import { ParadoIzq, ParadoDer, AgachadoDer, AgachadoIzq, CaminarDer, CaminarIzq, SaltarIzq, SaltarDer, CaerIzq, CaerDer } from "./stateMachine/state.js";

export default class Jugador {
    constructor(anchoJuego, altojuego) {
        this.anchoJuego = anchoJuego;
        this.altojuego = altojuego;

        this.estados = [new ParadoIzq(this),
        new ParadoDer(this),
        new AgachadoIzq(this),
        new AgachadoDer(this),
        new CaminarIzq(this),
        new CaminarDer(this),
        new SaltarIzq(this),
        new SaltarDer(this),
        new CaerIzq(this),
        new CaerDer(this)
        ];
        this.estadoActual = this.estados[1];

        this.spriteSheet = document.getElementById("paradoDerecha");
        this.anchoSprite = 42;
        this.altoSprite = 64;
        this.columna = 0;
        this.fila = 0;

        this.maxFrames = 4; // Número máximo de frames en la animación
        this.FPS = 8; // Frames por segundo
        this.frameTimer = 0; // Temporizador para controlar la animación
        this.ajusteTiempo = 1000 / this.FPS; // Ajuste de tiempo para la animación

        this.x = anchoJuego / 2 - this.anchoSprite / 2;
        this.y = altojuego - this.altoSprite;
        this.velocidad = 0;
        this.maxVelocidad = 200;
        this.maxVelocidadSalto = -300; // Velocidad máxima de salto
        this.velocidadSalto = 0; // Velocidad de salto
        this.gravedad = 750; // Gravedad para la caída
        this.saltando = false; // Indica si el jugador está saltando

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

    update(input, dt) {
        // Actualiza la animación del sprite
        if (this.frameTimer > this.ajusteTiempo) {
            // Actualiza la columna del sprite para la animación
            if (this.columna < this.maxFrames - 1) {
                this.columna += 1; // Avanza al siguiente frame
            } else {
                this.columna = 0; // Resetea al primer frame
            }
            this.frameTimer = 0; // Resetea el temporizador
        } else {
            this.frameTimer += dt * 1000; // Incrementa el temporizador en milisegundos
        }

        this.estadoActual.handleInput(input);
        this.x += this.velocidad * dt;
        if (this.x < 0) {
            this.x = 0; // Limita el jugador al borde izquierdo
        } else if (this.x + this.anchoSprite > this.anchoJuego) {
            this.x = this.anchoJuego - this.anchoSprite; // Limita el jugador al borde derecho
        }

        this.y += this.velocidadSalto * dt;

        // Aplica gravedad si el jugador no está en el suelo
        if (!this.enSuelo()) {
            this.velocidadSalto += this.gravedad * dt; // Aplica gravedad
        } else {
            this.y = this.altojuego - this.altoSprite - 32; // Asegura que el jugador no salga del sueloa
            this.velocidadSalto = 0; // Resetea la velocidad de salto al tocar el suelo
        }
    }

    // Cambia el estado del jugador
    setState(estado) {
        this.columna = 0; // Reinicia la columna para la animación de caída
        // Si el estado actual tiene una función de salida, la ejecuta
        if (this.estadoActual.exit) {
            this.estadoActual.exit();
        }
        // Cambia al nuevo estado y ejecuta su función de entrada
        this.estadoActual = this.estados[estado];
        this.estadoActual.enter();
    }

    enSuelo() {
        return this.y >= this.altojuego - this.altoSprite - 32; // Verifica si el jugador está en el suelo
    }
}

