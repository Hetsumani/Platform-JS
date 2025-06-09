import Jugador from "./Clases/jugador.js";
import InputHandler from "./Clases/stateMachine/input.js";
import Mapa from "./Clases/mapa.js";

window.onload = function () {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    const gameWidth = canvas.width;
    const gameHeight = canvas.height;

    console.log("Canvas dimensions:", gameWidth, gameHeight);

    let tiempoInicio = 0; // Variable utilizada para calcular el Delta Time

    const jugador = new Jugador(gameWidth, gameHeight);

    const input = new InputHandler();

    const mapa1 = new Mapa(gameWidth, gameHeight, jugador);

    function update(dt) {        
        jugador.update(input.lastKey, dt);
        mapa1.update();
    }

    function draw() {
        context.clearRect(0, 0, gameWidth, gameHeight); // Limpiar el canvas
        mapa1.draw(context);
        jugador.draw(context);
    }

    function gameLoop() {
        const tiempoActual = Date.now();
        const deltaTime = (tiempoActual - tiempoInicio) / 1000; // Convertir a segundos
        tiempoInicio = tiempoActual;

        update(deltaTime);
        draw();

        requestAnimationFrame(gameLoop);
    }
    requestAnimationFrame(gameLoop);
}

