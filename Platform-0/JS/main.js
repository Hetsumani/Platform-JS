import Jugador from "./Clases/jugador.js";
import InputHandler from "./Clases/stateMachine/input.js";

window.onload = function () {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    const gameWidth = canvas.width;
    const gameHeight = canvas.height;

    console.log("Canvas dimensions:", gameWidth, gameHeight);

    let tiempoInicio = 0; // Variable utilizada para calcular el Delta Time

    const jugador = new Jugador(gameWidth, gameHeight);

    const input = new InputHandler();

    const mapa = mapa1; // Asumiendo que tienes un mapa definido en otro archivo


    function update(dt) {
        jugador.update(input.lastKey, dt);
    }

    function draw() {
        context.clearRect(0, 0, gameWidth, gameHeight); // Limpiar el canvas
        context.drawImage(mapa, 0, -8, gameWidth, 368); // Dibujar el mapa
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

